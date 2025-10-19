# ⚠️ URGENT: Fix Cloudflare GitHub Integration Build Command

## Problem

Deployment is failing with:
```
✘ [ERROR] The entry-point file at ".open-next/worker.js" was not found.
```

## Root Cause

The GitHub integration is running the **wrong build command**:
- **Current**: `npm run build` (only runs Next.js build)
- **Required**: `npm run worker:build` (runs OpenNext to generate `.open-next/worker.js`)

## Solution: Update Cloudflare Dashboard Settings

### Step-by-Step Instructions

1. **Go to Cloudflare Dashboard**
   - Navigate to: https://dash.cloudflare.com/
   - Workers & Pages → privacyhub

2. **Open Build Settings**
   - Click "Settings" tab
   - Scroll to "Builds & deployments" section
   - Click "Edit configuration" or "Configure build"

3. **Update Build Command**
   - Find: "Build command" field
   - Change from: `npm run build`
   - Change to: `npm run worker:build`
   - Save changes

4. **Verify Deploy Command** (should already be correct)
   - Deploy command: `npx wrangler deploy` or `wrangler deploy`
   - (This should already be set correctly)

5. **Retry Deployment**
   - Go to "Deployments" tab
   - Click "Retry deployment" on the failed build
   - OR push a new commit to trigger automatic deployment

## Alternative: Deploy Manually First

If you need to deploy immediately while waiting to update settings:

```bash
# From your local machine:
npm run deploy
```

This will:
1. Run `npm run worker:build` (generates .open-next/worker.js)
2. Run `wrangler deploy` (deploys to Cloudflare Workers)

## Verification

After updating the build command and redeploying, you should see in the logs:

```
> privacyhub@0.1.0 worker:build
> opennextjs-cloudflare build

┌─────────────────────────────┐
│ OpenNext — Cloudflare build │
└─────────────────────────────┘

...
Worker saved in `.open-next/worker.js` 🚀
OpenNext build complete.
```

Then:

```
⛅️ wrangler 4.43.0
...
✔ Uploaded privacyhub (X.X MB)
✔ Published privacyhub
  https://privacyhub.workers.dev
```

## Why This Happened

The build scripts were recently refactored:
- `build`: Runs only `next build --turbopack` (used by OpenNext internally)
- `worker:build`: Runs `opennextjs-cloudflare build` (full build + transformation)

The Cloudflare GitHub integration still had the old `npm run build` command configured.

---

**Status**: Update the build command to `npm run worker:build` in Cloudflare Dashboard settings, then retry deployment.
