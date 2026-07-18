import { NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { readCurrentContent, saveContent } from '@/lib/siteContent';

export async function POST(request) {
    if (!(await isAuthenticated())) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json().catch(() => ({}));
    if (!body.name || !body.name.trim()) {
        return NextResponse.json({ error: 'Name is required.' }, { status: 400 });
    }

    try {
        const content = await readCurrentContent();
        content.home = {
            greeting: body.greeting || '',
            name: body.name.trim(),
            badge: body.badge || '',
            description: body.description || '',
            profile_img: body.profile_img || '',
            whatsapp_text: body.whatsapp_text || '',
            whatsapp_link: body.whatsapp_link || '',
            social: body.social || {},
            stats: (body.stats || []).filter((s) => s.value || s.label),
            logos: (body.logos || []).filter((l) => l.name || l.img),
            products: (body.products || []).filter((p) => p.name || p.img),
        };
        await saveContent(content, 'Update home page content');
        return NextResponse.json({ ok: true });
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
