import { NextRequest, NextResponse } from 'next/server';
import { getRecentAnalyses, getAnalysisStats } from '@/lib/database';
import { historyRateLimiter, getClientIp, createRateLimitHeaders } from '@/lib/rate-limiter';
import { validatePaginationParams } from '@/lib/input-validation';
import { withCache, CacheKeys } from '@/lib/cache';

export async function GET(request: NextRequest) {
  try {
    // Rate limiting check
    const clientIp = getClientIp(request);
    const rateLimitCheck = historyRateLimiter.check(clientIp);

    if (!rateLimitCheck.allowed) {
      const headers = createRateLimitHeaders(
        rateLimitCheck.remaining,
        rateLimitCheck.resetTime,
        30
      );

      return NextResponse.json(
        {
          error: 'Too many requests. Please try again later.',
          resetTime: new Date(rateLimitCheck.resetTime).toISOString()
        },
        { status: 429, headers }
      );
    }

    const { searchParams } = new URL(request.url);
    const rawLimit = searchParams.get('limit') || '24';
    const rawOffset = searchParams.get('offset') || '0';
    const includeStats = searchParams.get('stats') === 'true';

    // Validate and sanitize pagination parameters
    const { limit, offset } = validatePaginationParams(rawLimit, rawOffset);

    // Try cache first, then SQLite
    const cacheKey = CacheKeys.history(limit, offset);
    const analyses = await withCache(
      cacheKey,
      60, // 1 minute cache
      async () => {
        const sqliteAnalyses = getRecentAnalyses(limit, offset);

        // Parse analysis_data back to JSON for each result
        return sqliteAnalyses.map(analysis => ({
          ...analysis,
          analysis_data: JSON.parse(analysis.analysis_data as unknown as string)
        }));
      }
    );

    const response: {
      analyses: typeof analyses;
      total: number;
      stats?: ReturnType<typeof getAnalysisStats>;
    } = {
      analyses,
      total: analyses.length
    };

    if (includeStats) {
      response.stats = getAnalysisStats();
    }

    return NextResponse.json(response);

  } catch (error) {
    console.error('History API error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve analysis history' },
      { status: 500 }
    );
  }
}