# Cloudflare Workers Deployment Plan - PrivacyHub

**Project**: PrivacyHub - Privacy Policy Analyzer
**Migration**: Vercel → Cloudflare Workers (via OpenNext)
**Status**: ✅ Ready for Deployment
**Date**: 2025-10-19

---

## ✅ Migration Completed

### Changes Made

1. **OpenNext Cloudflare Adapter Configured**
   - Installed `@opennextjs/cloudflare@1.11.0`
   - Created `open-next.config.ts` configuration file
   - Updated `next.config.ts` with `initOpenNextCloudflareForDev()` for local development

2. **Cloudflare Workers Configuration**
   - Updated `wrangler.jsonc` with required compatibility flags:
     - `nodejs_compat`
     - `global_fetch_strictly_public` (required by OpenNext)
   - Set compatibility date to `2024-09-23` (minimum for OpenNext)
   - Configured assets binding for static files
   - Worker self-reference service binding configured

3. **Removed Vercel-Specific Code**
   - Removed `maxDuration` exports from:
     - `/src/app/api/analyze/route.ts`
     - `/src/app/api/v1/analyzer/route.ts`
   - Updated comments to reflect Cloudflare Workers environment
   - No edge runtime usage (OpenNext requires Node.js runtime)

4. **Build Process Fixed**
   - Prevented infinite loop in build scripts
   - Proper separation: `build` (Next.js) vs `worker:build` (OpenNext)
   - Verified `.open-next/worker.js` generation works correctly

5. **Local Development Setup**
   - Created `.dev.vars.example` template
   - Documented environment variables needed
   - OpenNext dev initialization configured for binding access

---

## 🚀 Deployment Instructions

### Option 1: GitHub Integration (Recommended)

Cloudflare will automatically deploy when you push to the `worker` branch.

**Current GitHub Integration Settings** (verify in Cloudflare Dashboard):
- **Branch**: `worker`
- **Build command**: `npm run worker:build` ⚠️ **IMPORTANT: Update this!**
- **Deploy command**: `wrangler deploy`

**Why the build command needs updating**:
- Current: `npm run build` (only runs Next.js build)
- Required: `npm run worker:build` (runs OpenNext transformation)

**To update GitHub integration**:
1. Go to Cloudflare Dashboard → Workers & Pages → privacyhub
2. Settings → Builds & deployments
3. Change "Build command" from `npm run build` to `npm run worker:build`
4. Save changes
5. Retry deployment

### Option 2: Manual Deployment

```bash
# From your local machine
npm run deploy

# This runs:
# 1. npm run worker:build (Next.js build + OpenNext transformation)
# 2. wrangler deploy (deploy to Cloudflare Workers)
```

---

## 📋 Pre-Deployment Checklist

### Environment Variables (Cloudflare Dashboard)

Verify these are configured in: **Dashboard → Workers → privacyhub → Settings → Variables**

- ✅ `FIRECRAWL_API_KEY` - Web scraping service
- ✅ `OPENROUTER_API` - Primary AI analysis key
- ✅ `OPENROUTER_API_1` - Backup key #1
- ✅ `OPENROUTER_API_2` - Backup key #2

### D1 Database Binding

Verify in: **Dashboard → Workers → privacyhub → Settings → Bindings**

- ✅ Binding name: `an-db`
- ✅ Database: `privacyhub`
- ✅ Database ID: `b64e7663-7a31-4e38-a210-4c570dabd118`

### Build Configuration

- ✅ package.json scripts configured correctly
- ✅ wrangler.jsonc has all required settings
- ✅ open-next.config.ts present
- ✅ .gitignore excludes `.open-next/` and `.wrangler/`

---

## 🧪 Post-Deployment Verification

After deployment succeeds, test these endpoints:

### 1. Main Application
```bash
# Visit the worker URL
https://privacyhub.workers.dev
# or your custom domain
https://privacyhub.in
```

### 2. API Endpoints

```bash
# Check API key health
curl https://privacyhub.in/api/credits

# Test privacy policy analysis
curl -X POST https://privacyhub.in/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"url":"https://example.com/privacy"}'

# Check analysis history
curl https://privacyhub.in/api/history
```

### 3. Database Verification

- Visit homepage and run an analysis
- Check that D1 database auto-initializes on first request
- Verify caching works (second analysis of same policy returns cached result)
- Check permalink sharing works: `/results/[domain]`

### 4. Monitor Logs

```bash
# Real-time logs (from local machine)
npx wrangler tail

# Or check in Cloudflare Dashboard
# Workers → privacyhub → Logs → Real-time logs
```

---

## 🔧 Local Development

### Setup

```bash
# 1. Copy environment variables template
cp .dev.vars.example .dev.vars

# 2. Fill in your API keys in .dev.vars
# OPENROUTER_API=your-key-here
# FIRECRAWL_API_KEY=your-key-here

# 3. Run Next.js dev server (traditional development)
npm run dev

# 4. Test Workers runtime locally (optional, for testing bindings)
npm run worker:dev
```

### Build Scripts Reference

```json
{
  "dev": "next dev --turbopack",              // Local Next.js development
  "build": "next build --turbopack",          // Next.js build (called by OpenNext)
  "worker:build": "opennextjs-cloudflare build",  // OpenNext transformation
  "worker:dev": "opennextjs-cloudflare dev",  // Local Workers runtime
  "deploy": "npm run worker:build && wrangler deploy"  // Full deployment
}
```

---

## ⚠️ Known Limitations

### Cloudflare Workers Constraints

- **CPU Time**: 30s on free plan, 30s/50s/unlimited on paid plans
- **Worker Size**: 3 MiB on free, 10 MiB on paid (compressed)
- **Runtime**: Node.js only (Edge Runtime not supported by OpenNext)

### Playwright/Crawlee Considerations

- Playwright browser automation works but may hit size limits
- Fallback scraping methods in place (Firecrawl → Playwright → Fetch)
- Most sites work with Firecrawl API

---

## 🎯 Next Steps

1. **Update Cloudflare GitHub Integration**
   - Change build command to `npm run worker:build`

2. **Trigger Deployment**
   - Push to `worker` branch (or manual deploy with `npm run deploy`)

3. **Verify Deployment**
   - Run all post-deployment verification tests
   - Check logs for errors
   - Test privacy policy analysis end-to-end

4. **Monitor Initial Traffic**
   - Watch Cloudflare Analytics
   - Check error rates in dashboard
   - Verify D1 database performance

5. **Optional: Custom Domain**
   - Already configured: `privacyhub.in`
   - Verify DNS settings pointing to Workers

---

## 📚 Additional Resources

- **OpenNext Cloudflare**: https://opennext.js.org/cloudflare
- **Wrangler CLI**: https://developers.cloudflare.com/workers/wrangler/
- **D1 Database**: https://developers.cloudflare.com/d1/
- **Next.js 15**: https://nextjs.org/docs

---

## ✅ Production Ready

The application is fully migrated and production-ready for Cloudflare Workers deployment:

- ✅ No Vercel-specific code remaining
- ✅ OpenNext adapter properly configured
- ✅ All compatibility flags set correctly
- ✅ Build process tested and working
- ✅ Local development setup documented
- ✅ Deployment plan created

**Status**: Ready to deploy to production! 🚀
