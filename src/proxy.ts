import { NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: '/((?!error/fatal|_next/static|_next/image|favicon.ico).*)',
};

export async function proxy(request: NextRequest) {
  // ponytail: global flag, simpler than connection pool state for startup failures
  if (process.env.DB_FATAL === 'true') {
    return NextResponse.redirect(new URL('/error/fatal', request.url));
  }

  // Solo aplicar a rutas de API que requieren autenticación
  if (request.nextUrl.pathname.startsWith('/api/activity')) {
    const apiKey = process.env.HOST_API_KEY;

    const xApiKey = request.headers.get('x-api-key');
    if (apiKey === xApiKey) {
      return NextResponse.next();
    }

    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return NextResponse.next();
}
