import crypto from 'node:crypto';
import { cookies } from 'next/headers';

const COOKIE_NAME = 'hpjati_admin_session';
const MAX_AGE = 60 * 60 * 24 * 7; // 7 days
const SESSION_VALUE = 'admin-authenticated';

function sign(value) {
    const secret = process.env.SESSION_SECRET || 'dev-secret-change-me';
    return crypto.createHmac('sha256', secret).update(value).digest('hex');
}

function verify(token) {
    if (!token) return false;
    const [value, mac] = token.split('.');
    if (!value || !mac || value !== SESSION_VALUE) return false;
    const expected = sign(value);
    try {
        return crypto.timingSafeEqual(Buffer.from(mac), Buffer.from(expected));
    } catch {
        return false;
    }
}

export function checkCredentials(username, password) {
    return (
        username === (process.env.ADMIN_USERNAME || 'admin') &&
        password === (process.env.ADMIN_PASSWORD || 'changeme123')
    );
}

export async function createSession() {
    const store = await cookies();
    store.set(COOKIE_NAME, `${SESSION_VALUE}.${sign(SESSION_VALUE)}`, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: MAX_AGE,
    });
}

export async function destroySession() {
    const store = await cookies();
    store.delete(COOKIE_NAME);
}

export async function isAuthenticated() {
    const store = await cookies();
    return verify(store.get(COOKIE_NAME)?.value);
}
