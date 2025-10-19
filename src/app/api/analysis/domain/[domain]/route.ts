import { NextRequest, NextResponse } from 'next/server';
import { getAnalysisByDomain } from '@/lib/d1-database';
import type { CloudflareRequest } from '@/types/cloudflare';

export async function GET(
  request: NextRequest,
  { params }: { params: { domain: string } }
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

    const domain = decodeURIComponent(params.domain);
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
