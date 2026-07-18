import { NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { readCurrentContent, saveContent } from '@/lib/siteContent';

export async function POST(request) {
    if (!(await isAuthenticated())) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json().catch(() => ({}));

    try {
        const content = await readCurrentContent();
        content.about = {
            intro: body.intro || '',
            education: (body.education || []).filter((r) => r.title || r.subtitle),
            speeches: (body.speeches || []).filter((r) => r.title || r.subtitle),
            books: (body.books || []).filter((r) => r.title || r.subtitle || r.link),
        };
        await saveContent(content, 'Update about page content');
        return NextResponse.json({ ok: true });
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
