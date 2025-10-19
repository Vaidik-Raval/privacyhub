import { NextResponse } from 'next/server';

/**
 * GET /api/analysis/domain/[domain]
 *
 * Note: Database caching is not available on Vercel.
 * This endpoint is disabled as D1 database is Cloudflare-specific.
 */
export async function GET() {
  return NextResponse.json(
    {
      error: 'Database caching not available',
      message: 'This endpoint requires Cloudflare D1 database which is not available on Vercel deployment'
    },
    { status: 503 }
  );
}
