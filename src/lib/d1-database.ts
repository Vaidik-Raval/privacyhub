/**
 * Cloudflare D1 Database Helper Functions
 * Optimized for Cloudflare Workers environment
 */

import crypto from 'crypto';

export interface D1Database {
  prepare(query: string): D1PreparedStatement;
  batch<T = unknown>(statements: D1PreparedStatement[]): Promise<D1Result<T>[]>;
  exec(query: string): Promise<D1ExecResult>;
}

export interface D1PreparedStatement {
  bind(...values: unknown[]): D1PreparedStatement;
  first<T = unknown>(colName?: string): Promise<T | null>;
  run<T = unknown>(): Promise<D1Result<T>>;
  all<T = unknown>(): Promise<D1Result<T>>;
}

export interface D1Result<T = unknown> {
  results?: T[];
  success: boolean;
  meta: {
    duration: number;
    size_after: number;
    rows_read: number;
    rows_written: number;
  };
}

export interface D1ExecResult {
  count: number;
  duration: number;
}

export interface StoredAnalysis {
  id: number;
  url: string;
  domain: string;
  hostname: string;
  content_hash: string;
  overall_score: number;
  privacy_grade: string;
  risk_level: string;
  gdpr_compliance: string;
  ccpa_compliance: string;
  dpdp_act_compliance: string | null;
  analysis_data: string; // JSON string
  homepage_screenshot: string | null;
  scraper_used: string | null;
  content_length: number | null;
  created_at: string;
  updated_at: string;
  last_checked_at: string;
}

export interface AnalysisData {
  overall_score: number;
  privacy_grade: string;
  risk_level: string;
  regulatory_compliance: {
    gdpr_compliance: string;
    ccpa_compliance: string;
    dpdp_act_compliance?: string;
    major_violations?: string[];
  };
  categories: Record<string, unknown>;
  critical_findings?: Record<string, unknown>;
  positive_practices?: string[];
  actionable_recommendations?: Record<string, unknown>;
  executive_summary?: string;
}

/**
 * Generate SHA-256 hash of content for cache key
 */
export function generateContentHash(content: string): string {
  return crypto.createHash('sha256').update(content).digest('hex');
}

/**
 * Extract domain from URL
 */
export function extractDomain(url: string): string {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}

/**
 * Check if cached analysis exists and is still valid
 * Returns cached analysis if found and not expired (30 days)
 */
export async function getCachedAnalysis(
  db: D1Database,
  domain: string,
  contentHash: string
): Promise<StoredAnalysis | null> {
  try {
    const stmt = db.prepare(`
      SELECT * FROM analyses
      WHERE domain = ? AND content_hash = ?
      AND last_checked_at > datetime('now', '-30 days')
      ORDER BY last_checked_at DESC
      LIMIT 1
    `).bind(domain, contentHash);

    const result = await stmt.first<StoredAnalysis>();
    return result || null;
  } catch (error) {
    console.error('Error fetching cached analysis:', error);
    return null;
  }
}

/**
 * Get most recent analysis for a domain (regardless of content hash)
 * Used to check if policy has changed
 */
export async function getLatestAnalysisByDomain(
  db: D1Database,
  domain: string
): Promise<StoredAnalysis | null> {
  try {
    const stmt = db.prepare(`
      SELECT * FROM analyses
      WHERE domain = ?
      ORDER BY last_checked_at DESC
      LIMIT 1
    `).bind(domain);

    const result = await stmt.first<StoredAnalysis>();
    return result || null;
  } catch (error) {
    console.error('Error fetching latest analysis:', error);
    return null;
  }
}

/**
 * Save analysis to D1 database
 */
export async function saveAnalysis(
  db: D1Database,
  url: string,
  content: string,
  analysisData: AnalysisData,
  metadata: {
    scraperUsed?: string;
    homepageScreenshot?: string | null;
  } = {}
): Promise<number> {
  try {
    const domain = extractDomain(url);
    const hostname = new URL(url).hostname;
    const contentHash = generateContentHash(content);

    // Insert or update analysis
    const stmt = db.prepare(`
      INSERT INTO analyses (
        url, domain, hostname, content_hash,
        overall_score, privacy_grade, risk_level,
        gdpr_compliance, ccpa_compliance, dpdp_act_compliance,
        analysis_data, homepage_screenshot, scraper_used, content_length,
        created_at, updated_at, last_checked_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'), datetime('now'))
      ON CONFLICT(domain, content_hash) DO UPDATE SET
        last_checked_at = datetime('now'),
        updated_at = datetime('now')
      RETURNING id
    `).bind(
      url,
      domain,
      hostname,
      contentHash,
      analysisData.overall_score,
      analysisData.privacy_grade,
      analysisData.risk_level,
      analysisData.regulatory_compliance.gdpr_compliance,
      analysisData.regulatory_compliance.ccpa_compliance,
      analysisData.regulatory_compliance.dpdp_act_compliance || null,
      JSON.stringify(analysisData),
      metadata.homepageScreenshot || null,
      metadata.scraperUsed || null,
      content.length
    );

    const result = await stmt.first<{ id: number }>();

    if (result?.id) {
      // Update statistics
      await updateStatistics(db, analysisData.privacy_grade, analysisData.risk_level);
      return result.id;
    }

    throw new Error('Failed to save analysis');
  } catch (error) {
    console.error('Error saving analysis to D1:', error);
    throw error;
  }
}

/**
 * Update aggregate statistics
 */
async function updateStatistics(
  db: D1Database,
  grade: string,
  riskLevel: string
): Promise<void> {
  try {
    // Update grade distribution
    await db.prepare(`
      INSERT INTO grade_distribution (grade, count) VALUES (?, 1)
      ON CONFLICT(grade) DO UPDATE SET count = count + 1
    `).bind(grade).run();

    // Update risk distribution
    await db.prepare(`
      INSERT INTO risk_distribution (risk_level, count) VALUES (?, 1)
      ON CONFLICT(risk_level) DO UPDATE SET count = count + 1
    `).bind(riskLevel).run();

    // Update overall stats
    await db.prepare(`
      UPDATE analysis_stats SET
        total_analyses = (SELECT COUNT(*) FROM analyses),
        unique_domains = (SELECT COUNT(DISTINCT domain) FROM analyses),
        avg_score = (SELECT AVG(overall_score) FROM analyses),
        updated_at = datetime('now')
      WHERE id = 1
    `).run();
  } catch (error) {
    console.error('Error updating statistics:', error);
  }
}

/**
 * Get recent analyses (paginated)
 */
export async function getRecentAnalyses(
  db: D1Database,
  limit: number = 24,
  offset: number = 0
): Promise<StoredAnalysis[]> {
  try {
    const stmt = db.prepare(`
      SELECT * FROM analyses
      ORDER BY created_at DESC
      LIMIT ? OFFSET ?
    `).bind(limit, offset);

    const result = await stmt.all<StoredAnalysis>();
    return result.results || [];
  } catch (error) {
    console.error('Error fetching recent analyses:', error);
    return [];
  }
}

/**
 * Get analysis by ID
 */
export async function getAnalysisById(
  db: D1Database,
  id: number
): Promise<StoredAnalysis | null> {
  try {
    const stmt = db.prepare(`
      SELECT * FROM analyses WHERE id = ?
    `).bind(id);

    const result = await stmt.first<StoredAnalysis>();
    return result || null;
  } catch (error) {
    console.error('Error fetching analysis by ID:', error);
    return null;
  }
}

/**
 * Get analysis by domain (most recent)
 */
export async function getAnalysisByDomain(
  db: D1Database,
  domain: string
): Promise<StoredAnalysis | null> {
  try {
    const stmt = db.prepare(`
      SELECT * FROM analyses
      WHERE domain = ?
      ORDER BY last_checked_at DESC
      LIMIT 1
    `).bind(domain);

    const result = await stmt.first<StoredAnalysis>();
    return result || null;
  } catch (error) {
    console.error('Error fetching analysis by domain:', error);
    return null;
  }
}

/**
 * Get database statistics
 */
export async function getAnalysisStats(db: D1Database) {
  try {
    const stats = await db.prepare('SELECT * FROM analysis_stats WHERE id = 1').first();
    const gradeDistribution = await db.prepare('SELECT * FROM grade_distribution ORDER BY grade').all();
    const riskDistribution = await db.prepare(`
      SELECT * FROM risk_distribution
      ORDER BY CASE risk_level
        WHEN 'HIGH' THEN 1
        WHEN 'MODERATE-HIGH' THEN 2
        WHEN 'MODERATE' THEN 3
        WHEN 'LOW' THEN 4
        WHEN 'EXEMPLARY' THEN 5
      END
    `).all();

    return {
      totalAnalyses: (stats as { total_analyses: number })?.total_analyses || 0,
      uniqueDomains: (stats as { unique_domains: number })?.unique_domains || 0,
      averageScore: (stats as { avg_score: number })?.avg_score || 0,
      gradeDistribution: gradeDistribution.results || [],
      riskDistribution: riskDistribution.results || [],
      updatedAt: (stats as { updated_at: string })?.updated_at,
    };
  } catch (error) {
    console.error('Error fetching statistics:', error);
    return {
      totalAnalyses: 0,
      uniqueDomains: 0,
      averageScore: 0,
      gradeDistribution: [],
      riskDistribution: [],
    };
  }
}

/**
 * Delete old analyses (cleanup job)
 * Removes analyses older than 90 days
 */
export async function cleanupOldAnalyses(db: D1Database): Promise<number> {
  try {
    const result = await db.prepare(`
      DELETE FROM analyses
      WHERE created_at < datetime('now', '-90 days')
    `).run();

    return result.meta?.rows_written || 0;
  } catch (error) {
    console.error('Error cleaning up old analyses:', error);
    return 0;
  }
}
