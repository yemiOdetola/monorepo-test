import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  const userMarket = request.cookies.get('market')?.value;
  const username = request.cookies.get('username')?.value;

  if (!userMarket || !username) {
    if (pathname.startsWith('/en/') || pathname.startsWith('/ca/')) {
      const loginUrl = new URL('/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  const urlMarket = pathname.split('/')[1];

  if (urlMarket && ['en', 'ca'].includes(urlMarket) && urlMarket !== userMarket) {
    const newUrl = request.nextUrl.clone();
    newUrl.pathname = pathname.replace(`/${urlMarket}`, `/${userMarket}`);
    return NextResponse.redirect(newUrl);
  }

  return NextResponse.next();
}


export const config = {
  matcher: [
    '/(en|ca)/:path*',
    '/login',
  ],
}