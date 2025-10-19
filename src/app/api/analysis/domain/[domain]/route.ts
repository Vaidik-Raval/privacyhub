import { NextRequest, NextResponse } from 'next/server';
import { initializeDatabase, getAnalysisByDomain } from '@/lib/d1-database';
import type { CloudflareRequest } from '@/types/cloudflare';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ domain: string }> }
) {
  try {
    // Get D1 database binding from Cloudflare Workers environment
    const cfRequest = request as CloudflareRequest;
    const db = cfRequest.env?.["an-db"];

    if (!db) {
      return NextResponse.json(
        { error: 'Database not available' },
        { status: 503 }
      );
    }

    // Initialize D1 database schema on first access (idempotent, non-blocking)
    initializeDatabase(db).catch(err => {
      console.warn('[D1 Init] Database initialization failed (non-critical):', err);
    });

    // Await params (Next.js 15 async params)
    const resolvedParams = await params;
    const domain = decodeURIComponent(resolvedParams.domain);
    const analysis = await getAnalysisByDomain(db, domain);

    if (!analysis) {
      return NextResponse.json(
        { error: 'Analysis not found for this domain' },
        { status: 404 }
      );
    }

    // Parse the analysis_data JSON and return
    return NextResponse.json({
      ...analysis,
      analysis_data: JSON.parse(analysis.analysis_data)
    });

  } catch (error) {
    console.error('Analysis fetch error:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);

    return NextResponse.json(
      {
        error: 'Failed to fetch analysis',
        details: errorMessage
      },
      { status: 500 }
    );
  }
}
