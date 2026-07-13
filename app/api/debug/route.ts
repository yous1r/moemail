import { NextResponse } from 'next/server'
import { getRequestContext } from '@cloudflare/next-on-pages'

export const runtime = 'edge'

export async function GET() {
  const env = getRequestContext().env
  return NextResponse.json({
    db: !!env?.DB,
    siteConfig: !!env?.SITE_CONFIG,
    authSecret: !!process.env.AUTH_SECRET,
    authGithubId: !!process.env.AUTH_GITHUB_ID,
    keys: Object.keys(env || {}),
    processKeys: Object.keys(process.env)
  })
}
