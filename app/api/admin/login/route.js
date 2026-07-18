import { NextResponse } from 'next/server';
import { checkCredentials, createSession } from '@/lib/auth';

export async function POST(request) {
    const body = await request.json().catch(() => ({}));
    const { username, password } = body;

    if (!checkCredentials(username, password)) {
        return NextResponse.json({ error: 'Username atau password salah.' }, { status: 401 });
    }

    await createSession();
    return NextResponse.json({ ok: true });
}
