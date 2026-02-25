import { NextRequest, NextResponse } from 'next/server';

/**
 * Rate limiter simple en memoria por IP.
 * En Vercel serverless cada instancia tiene su propio Map, así que
 * no es perfecto — pero evita abuso trivial (curl loops, bots).
 * Para producción real, usar Vercel KV o Upstash Redis.
 */

const WINDOW_MS = 60_000; // 1 minuto
const MAX_REQUESTS = 30;  // 30 peticiones por minuto por IP

const ipHits = new Map<string, { count: number; resetAt: number }>();

function getClientIp(request: NextRequest): string {
    return (
        request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
        request.headers.get('x-real-ip') ||
        'unknown'
    );
}

export function middleware(request: NextRequest) {
    // Solo aplicar a rutas API
    if (!request.nextUrl.pathname.startsWith('/api/')) {
        return NextResponse.next();
    }

    const ip = getClientIp(request);
    const now = Date.now();
    const entry = ipHits.get(ip);

    if (!entry || now > entry.resetAt) {
        ipHits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
        return NextResponse.next();
    }

    entry.count++;

    if (entry.count > MAX_REQUESTS) {
        return NextResponse.json(
            { error: 'Demasiadas peticiones. Espera un momento e intenta de nuevo.' },
            {
                status: 429,
                headers: {
                    'Retry-After': String(Math.ceil((entry.resetAt - now) / 1000)),
                },
            },
        );
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/api/:path*',
};
