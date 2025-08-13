import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  const cookieStore = await cookies()
  const locale = cookieStore.get('locale')?.value || 'en'
  return NextResponse.json({ locale })
}

export async function POST(req: NextRequest) {
  const { locale } = (await req.json()) as { locale?: string }

  const nextLocale = locale === 'es' ? 'es' : 'en'

  const res = NextResponse.json({ ok: true, locale: nextLocale })
  // Persist cookie for 1 year
  res.cookies.set('locale', nextLocale, {
    path: '/',
    httpOnly: false,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 365
  })
  return res
}