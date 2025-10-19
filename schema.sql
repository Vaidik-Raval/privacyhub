-- Cloudflare D1 Database Schema for PrivacyHub
-- This schema stores privacy policy analyses and enables caching

-- Analyses table - stores privacy policy analysis results
CREATE TABLE IF NOT EXISTS analyses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    url TEXT NOT NULL,
    domain TEXT NOT NULL,
    hostname TEXT NOT NULL,
    content_hash TEXT NOT NULL, -- SHA256 hash of policy content
    overall_score REAL NOT NULL,
    privacy_grade TEXT NOT NULL,
    risk_level TEXT NOT NULL,

    -- Compliance scores
    gdpr_compliance TEXT NOT NULL,
    ccpa_compliance TEXT NOT NULL,
    dpdp_act_compliance TEXT,

    -- Full analysis data as JSON
    analysis_data TEXT NOT NULL,

    -- Metadata
    homepage_screenshot TEXT, -- Base64 or URL
    scraper_used TEXT,
    content_length INTEGER,

    -- Timestamps
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_checked_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    -- Indexes will be created separately
    UNIQUE(domain, content_hash)
);

-- Index for fast domain lookups
CREATE INDEX IF NOT EXISTS idx_analyses_domain ON analyses(domain);

-- Index for recent analyses
CREATE INDEX IF NOT EXISTS idx_analyses_created_at ON analyses(created_at DESC);

-- Index for last checked (for cache invalidation)
CREATE INDEX IF NOT EXISTS idx_analyses_last_checked ON analyses(last_checked_at DESC);

-- Index for content hash lookups
CREATE INDEX IF NOT EXISTS idx_analyses_content_hash ON analyses(content_hash);

-- Composite index for domain + last_checked
CREATE INDEX IF NOT EXISTS idx_analyses_domain_checked ON analyses(domain, last_checked_at DESC);

-- Stats table - for analytics and dashboard
CREATE TABLE IF NOT EXISTS analysis_stats (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    total_analyses INTEGER DEFAULT 0,
    unique_domains INTEGER DEFAULT 0,
    avg_score REAL DEFAULT 0,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Insert initial stats row
INSERT INTO analysis_stats (total_analyses, unique_domains, avg_score)
VALUES (0, 0, 0.0)
ON CONFLICT DO NOTHING;

-- Grade distribution table for analytics
CREATE TABLE IF NOT EXISTS grade_distribution (
    grade TEXT PRIMARY KEY,
    count INTEGER DEFAULT 0
);

-- Initialize grade distribution
INSERT INTO grade_distribution (grade, count) VALUES
    ('A+', 0), ('A', 0), ('A-', 0),
    ('B+', 0), ('B', 0), ('B-', 0),
    ('C+', 0), ('C', 0), ('C-', 0),
    ('D+', 0), ('D', 0), ('D-', 0),
    ('F', 0)
ON CONFLICT DO NOTHING;

-- Risk distribution table
CREATE TABLE IF NOT EXISTS risk_distribution (
    risk_level TEXT PRIMARY KEY,
    count INTEGER DEFAULT 0
);

-- Initialize risk distribution
INSERT INTO risk_distribution (risk_level, count) VALUES
    ('EXEMPLARY', 0),
    ('LOW', 0),
    ('MODERATE', 0),
    ('MODERATE-HIGH', 0),
    ('HIGH', 0)
ON CONFLICT DO NOTHING;
