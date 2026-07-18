import { NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { listAllPosts, savePost, deletePost } from '@/lib/adminPosts';
import { uniqueSlug } from '@/lib/slug';

export async function POST(request) {
    if (!(await isAuthenticated())) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json().catch(() => ({}));
    if (!body.title || !body.title.trim()) {
        return NextResponse.json({ error: 'Title is required.' }, { status: 400 });
    }

    try {
        const posts = await listAllPosts();
        const originalSlug = body.originalSlug || null;
        const slug = uniqueSlug(body.slug || body.title, posts, originalSlug);

        const post = {
            title: body.title.trim(),
            date: body.date || new Date().toISOString().slice(0, 10),
            thumbnail: body.thumbnail || '',
            excerpt: body.excerpt || '',
            content: body.content || '',
            tags: Array.isArray(body.tags) ? body.tags.map((t) => String(t).trim()).filter(Boolean) : [],
            status: body.status === 'draft' ? 'draft' : 'published',
        };

        const isRename = originalSlug && originalSlug !== slug;
        await savePost(slug, post, `${originalSlug ? 'Update' : 'Add'} blog post: ${post.title}`);

        if (isRename) {
            await deletePost(originalSlug, `Rename post ${originalSlug} -> ${slug}`);
        }

        return NextResponse.json({ ok: true, post: { ...post, slug } });
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
