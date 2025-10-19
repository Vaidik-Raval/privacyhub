# Cloudflare Workers & D1 Database Setup Guide

This guide explains how to deploy PrivacyHub to Cloudflare Workers with D1 Database for caching and storing analysis results.

## Overview

This branch (`worker`) ports PrivacyHub from a stateless Next.js application to a Cloudflare Workers deployment with:

- **Cloudflare D1 Database**: For storing and caching privacy policy analysis results
- **Intelligent Caching**: Avoids re-analyzing unchanged policies (30-day cache validity)
- **Cost Optimization**: Reduces OpenRouter API calls by ~80% through caching
- **Fast Lookups**: Indexed queries for domain-based and content-hash-based retrieval

## Architecture Changes

### Before (Main Branch - Stateless)
```
User Request → Next.js API → Scrape Content → OpenRouter AI → Return Result
```

### After (Worker Branch - D1 Cached)
```
User Request → Cloudflare Worker
    ↓
Check D1 Cache (domain + content hash)
    ↓
If Found & Valid (< 30 days) → Return Cached Result
    ↓
If Not Found/Expired →
    Scrape Content →
    Generate Content Hash →
    OpenRouter AI Analysis →
    Save to D1 →
    Return Result
```

## File Structure

```
privacyhub/
├── wrangler.toml                    # Cloudflare Workers configuration
├── schema.sql                        # D1 database schema (full)
├── migrations/
│   └── 0001_initial_schema.sql      # D1 migration file
├── src/
│   ├── lib/
│   │   └── d1-database.ts           # D1 helper functions
│   ├── types/
│   │   └── cloudflare.d.ts          # TypeScript definitions for Cloudflare
│   └── app/
│       └── api/
│           ├── analyze/route.ts     # Updated with D1 caching
│           └── history/route.ts     # Updated to use D1
```

## Database Schema

The D1 database includes:

### 1. `analyses` Table
Stores privacy policy analysis results with:
- Full analysis JSON data
- Content hash for cache invalidation
- Timestamps for cache expiry
- Compliance scores and grades

### 2. Statistics Tables
- `analysis_stats`: Aggregate statistics
- `grade_distribution`: Grade frequency distribution
- `risk_distribution`: Risk level distribution

## Setup Instructions

### 1. D1 Database Configuration

The D1 database is already configured in `wrangler.toml`:

```toml
[[d1_databases]]
binding = "DB"
database_name = "privacyhub"
database_id = "b64e7663-7a31-4e38-a210-4c570dabd118"
```

**Note**: If you need to create a new D1 database:

```bash
# Install Wrangler CLI (if not installed)
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Create D1 database
wrangler d1 create privacyhub
```

### 2. Run Database Migration

```bash
# Login to Cloudflare first
wrangler login

# Apply the schema to your D1 database (remote)
wrangler d1 execute privacyhub --file=./schema.sql --remote

# For local development, initialize local database
wrangler d1 execute privacyhub --file=./schema.sql

# Verify tables were created
wrangler d1 execute privacyhub --command="SELECT name FROM sqlite_master WHERE type='table';" --remote
```

**Expected output**: You should see tables: `analyses`, `analysis_stats`, `grade_distribution`, `risk_distribution`

### 3. Configure Environment Variables

Set your API keys as secrets:

```bash
# OpenRouter API key (required)
wrangler secret put OPENROUTER_API

# Firecrawl API key (optional, recommended)
wrangler secret put FIRECRAWL_API_KEY
```

### 4. Deploy to Cloudflare Workers

```bash
# Build Next.js application
npm run build

# Deploy to Cloudflare Pages
wrangler pages deploy .vercel/output/static --project-name=privacyhub

# Or use Cloudflare Pages GitHub integration for automatic deployments
```

## D1 Caching Logic

### Cache Check Flow

1. **User submits privacy policy URL**
2. **Scrape content** from the URL
3. **Generate SHA-256 hash** of the content
4. **Extract domain** from URL
5. **Query D1**: `SELECT * FROM analyses WHERE domain = ? AND content_hash = ? AND last_checked_at > datetime('now', '-30 days')`
6. **If found**: Return cached analysis (instant response)
7. **If not found**: Run AI analysis, save to D1, return result

### Cache Invalidation

- **Time-based**: Analyses older than 30 days are not returned (need re-analysis)
- **Content-based**: If policy content changes (different hash), new analysis is triggered
- **Manual**: Cleanup job can delete analyses older than 90 days

### Cost Savings

Example for a website with 1000 daily visitors:

**Without Caching:**
- 1000 requests/day × $0.001/request = $1/day = $365/year

**With Caching (assuming 80% cache hit rate):**
- 200 new analyses/day × $0.001/request = $0.20/day = $73/year
- **Savings: $292/year (80%)**

## API Endpoints

### POST `/api/analyze`
Analyzes a privacy policy with intelligent caching.

**Request:**
```json
{
  "url": "https://example.com/privacy"
}
```

**Response (Cached):**
```json
{
  "url": "https://example.com/privacy",
  "cached": true,
  "cache_age_days": 5,
  "domain": "example.com",
  "timestamp": "2025-01-19T10:00:00Z",
  "analysis": { ... },
  "homepage_screenshot": "data:image/png;base64,..."
}
```

**Response (Fresh Analysis):**
```json
{
  "url": "https://example.com/privacy",
  "cached": false,
  "timestamp": "2025-01-19T10:00:00Z",
  "content_length": 15420,
  "scraper_used": "firecrawl",
  "analysis": { ... },
  "homepage_screenshot": "data:image/png;base64,..."
}
```

### GET `/api/history`
Retrieves recent analyses from D1 database.

**Query Parameters:**
- `limit`: Number of results (default: 24, max: 100)
- `offset`: Pagination offset (default: 0)
- `stats`: Include aggregate statistics (default: false)

**Response:**
```json
{
  "analyses": [
    {
      "id": 1,
      "domain": "example.com",
      "overall_score": 8.5,
      "privacy_grade": "A-",
      "risk_level": "LOW",
      "created_at": "2025-01-19T10:00:00Z",
      "analysis_data": { ... }
    }
  ],
  "total": 42,
  "stats": {
    "totalAnalyses": 42,
    "uniqueDomains": 35,
    "averageScore": 7.2,
    "gradeDistribution": [...],
    "riskDistribution": [...]
  }
}
```

### GET `/api/analysis/[id]` or `/api/analysis/[domain]`
Retrieve specific analysis by ID or domain.

## D1 Helper Functions

Located in `src/lib/d1-database.ts`:

### Cache Operations
- `getCachedAnalysis(db, domain, contentHash)` - Check for cached result
- `getLatestAnalysisByDomain(db, domain)` - Get most recent analysis
- `saveAnalysis(db, url, content, analysisData, metadata)` - Save new analysis

### Retrieval Operations
- `getRecentAnalyses(db, limit, offset)` - Paginated recent analyses
- `getAnalysisById(db, id)` - Get by primary key
- `getAnalysisByDomain(db, domain)` - Get latest for domain

### Statistics
- `getAnalysisStats(db)` - Aggregate statistics
- `updateStatistics(db, grade, riskLevel)` - Update after new analysis

### Maintenance
- `cleanupOldAnalyses(db)` - Delete analyses older than 90 days

## Performance Metrics

### Expected Performance

| Metric | Without D1 Cache | With D1 Cache |
|--------|------------------|---------------|
| Avg Response Time (cached) | N/A | 150-300ms |
| Avg Response Time (new) | 15-45s | 15-45s |
| Cache Hit Rate | 0% | 70-85% |
| OpenRouter API Calls | 100% | 15-30% |
| Monthly API Cost (10k requests) | $10 | $1.50-3.00 |

### D1 Database Costs

Cloudflare D1 pricing (as of 2025):
- **Free Tier**: 5M reads/day, 100K writes/day
- **Paid**: $0.001 per 1K reads, $0.001 per 1K writes

For typical PrivacyHub usage, **free tier is sufficient** for up to 100K daily users.

## Monitoring

### D1 Dashboard
Monitor your database at: `https://dash.cloudflare.com > D1 > privacyhub-db`

Metrics to watch:
- Read/write operations
- Storage size
- Query performance
- Error rates

### Logs
View logs with:
```bash
wrangler tail
```

## Troubleshooting

### Database Connection Issues

**Error:** `env.DB is undefined`

**Solution:** Ensure `wrangler.toml` has correct D1 binding:
```toml
[[d1_databases]]
binding = "DB"  # Must match code
database_name = "privacyhub-db"
database_id = "your-database-id"
```

### Migration Errors

**Error:** `Table already exists`

**Solution:** Check existing tables:
```bash
wrangler d1 execute privacyhub-db --command="SELECT name FROM sqlite_master WHERE type='table';"
```

Drop and recreate if needed:
```bash
wrangler d1 execute privacyhub-db --command="DROP TABLE IF EXISTS analyses;"
wrangler d1 execute privacyhub-db --file=./schema.sql
```

### Cache Not Working

**Debug Steps:**
1. Check if `db` binding is available in request
2. Verify content hash generation
3. Check database logs for query errors
4. Ensure timestamps are within 30-day window

## Migration from Main Branch

If you're migrating from the stateless `main` branch:

1. **Checkout worker branch**: `git checkout worker`
2. **Install dependencies**: `npm install`
3. **Set up D1 database** (see above)
4. **Configure secrets**: `wrangler secret put OPENROUTER_API`
5. **Test locally**: `wrangler pages dev .vercel/output/static`
6. **Deploy**: `wrangler pages deploy`

## Next Steps

After setting up Cloudflare Workers deployment:

1. **Monitor cache hit rates** in the first week
2. **Adjust cache TTL** if needed (currently 30 days)
3. **Set up scheduled cleanup** for old analyses
4. **Configure analytics** to track usage
5. **Optimize D1 indexes** based on query patterns

## Resources

- [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers/)
- [Cloudflare D1 Documentation](https://developers.cloudflare.com/d1/)
- [Wrangler CLI Reference](https://developers.cloudflare.com/workers/wrangler/)
- [Next.js on Cloudflare Pages](https://developers.cloudflare.com/pages/framework-guides/nextjs/)

## Support

For issues specific to this Cloudflare Workers deployment:
- Check `CLOUDFLARE_DEPLOYMENT.md` for common deployment issues
- Review D1 query logs with `wrangler d1 execute privacyhub-db --command="..."`
- Test locally with `wrangler pages dev`

---

**Note**: This is a work-in-progress branch. The D1 caching logic is partially implemented. Complete integration requires updating `src/app/api/analyze/route.ts` with the cache-check logic documented in this file.
