import { auth } from "@/lib/auth"
import type { Locale } from "@/i18n/config"

export const runtime = "edge"

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale: localeFromParams } = await params
  
  let authError = null;
  let hasSession = false;
  try {
    const session = await auth()
    hasSession = !!session
  } catch (e: any) {
    authError = e.message || e.toString()
  }

  const envVars = {
    hasAuthSecret: !!process.env.AUTH_SECRET,
    hasGithubId: !!process.env.AUTH_GITHUB_ID,
    locale: localeFromParams as Locale,
    hasSession,
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Debug Info</h1>
      <pre>{JSON.stringify({ authError, envVars }, null, 2)}</pre>
    </div>
  )
}
