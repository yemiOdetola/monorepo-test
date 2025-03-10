import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { SUPPORTED_MARKETS } from '@repo/constants/market'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const marketFromPath = pathname.split('/')[1]

  if (pathname === '/') {
    return NextResponse.redirect(new URL('/en', request.url))
  }

  if (!marketFromPath || !SUPPORTED_MARKETS.includes(marketFromPath as typeof SUPPORTED_MARKETS[number])) {
    return NextResponse.redirect(new URL('/en', request.url))
  }

  const authCookie = request.cookies.get('auth')
  if (!authCookie?.value) {
    return NextResponse.next()
  }

  try {
    const userData = JSON.parse(atob(authCookie.value))
    const userMarket = userData.market

    if (userMarket && marketFromPath !== userMarket) {
      const correctPath = pathname.replace(`/${marketFromPath}`, `/${userMarket}`)
      return NextResponse.redirect(new URL(correctPath, request.url))
    }
  } catch (e) {
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|static|.*\\..*|favicon.ico).*)'],
}