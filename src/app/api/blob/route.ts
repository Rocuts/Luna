import { NextRequest, NextResponse } from 'next/server';
import { put } from '@vercel/blob';

/**
 * POST /api/blob
 *
 * Body opcional:
 * {
 *   "pathname": "articles/blob.txt",
 *   "content": "Hello World!",
 *   "access": "public"
 * }
 */
export async function POST(request: NextRequest) {
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
        return NextResponse.json(
            { error: 'Falta BLOB_READ_WRITE_TOKEN en variables de entorno.' },
            { status: 500 },
        );
    }

    let pathname = 'articles/blob.txt';
    let content = 'Hello World!';
    let access: 'public' = 'public';

    try {
        const body = await request.json().catch(() => ({}));

        if (typeof body.pathname === 'string' && body.pathname.trim()) {
            pathname = body.pathname.trim();
        }
        if (typeof body.content === 'string') {
            content = body.content;
        }
        if (typeof body.access === 'string' && body.access !== 'public') {
            return NextResponse.json(
                { error: 'Esta versión de @vercel/blob solo acepta access: "public" en put().' },
                { status: 400 },
            );
        }
    } catch {
        // Si no hay JSON válido, usamos defaults.
    }

    try {
        const { url } = await put(pathname, content, { access });
        return NextResponse.json({ url });
    } catch (error) {
        console.error('[LangLA /api/blob] Error subiendo blob:', error);
        return NextResponse.json(
            { error: 'No se pudo crear el blob.' },
            { status: 500 },
        );
    }
}
