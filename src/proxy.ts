import { NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: '/api/:function*',
};

export async function proxy(request: NextRequest) {
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
