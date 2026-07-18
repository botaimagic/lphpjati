import { NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { getPost, deletePost } from '@/lib/adminPosts';

export async function DELETE(request, { params }) {
    if (!(await isAuthenticated())) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { slug } = await params;

    try {
        const existing = await getPost(slug);
        if (!existing) {
            return NextResponse.json({ error: 'Post not found.' }, { status: 404 });
        }
        await deletePost(slug, `Delete blog post: ${existing.title}`);
        return NextResponse.json({ ok: true });
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
