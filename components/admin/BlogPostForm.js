'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import MarkdownEditor from './MarkdownEditor';

export default function BlogPostForm({ initialPost }) {
    const router = useRouter();
    const [form, setForm] = useState({
        originalSlug: initialPost?.slug || '',
        title: initialPost?.title || '',
        slug: initialPost?.slug || '',
        date: initialPost?.date || new Date().toISOString().slice(0, 10),
        status: initialPost?.status || 'published',
        thumbnail: initialPost?.thumbnail || '',
        excerpt: initialPost?.excerpt || '',
        content: initialPost?.content || '',
        tagsText: (initialPost?.tags || []).join(', '),
    });
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    function set(key, value) {
        setForm((f) => ({ ...f, [key]: value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setSaving(true);
        setError('');

        const res = await fetch('/api/admin/blog', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ...form,
                tags: form.tagsText.split(',').map((t) => t.trim()).filter(Boolean),
            }),
        });

        setSaving(false);
        if (res.ok) {
            router.push('/admin/blog');
            router.refresh();
        } else {
            const data = await res.json().catch(() => ({}));
            setError(data.error || 'Something went wrong.');
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            {error && <div className="admin-alert">{error}</div>}

            <div className="admin-card">
                <div className="admin-field">
                    <label>Title</label>
                    <input value={form.title} onChange={(e) => set('title', e.target.value)} required />
                </div>
                <div className="admin-field">
                    <label>URL Slug (optional — auto-generated from title if left blank)</label>
                    <input value={form.slug} onChange={(e) => set('slug', e.target.value)} placeholder="e.g. my-first-post" />
                </div>
                <div className="admin-field-row">
                    <div className="admin-field">
                        <label>Date</label>
                        <input type="date" value={form.date} onChange={(e) => set('date', e.target.value)} />
                    </div>
                    <div className="admin-field">
                        <label>Status</label>
                        <select value={form.status} onChange={(e) => set('status', e.target.value)}>
                            <option value="published">Published</option>
                            <option value="draft">Draft</option>
                        </select>
                    </div>
                </div>
                <div className="admin-field">
                    <label>Thumbnail Image URL</label>
                    <input value={form.thumbnail} onChange={(e) => set('thumbnail', e.target.value)} placeholder="https://..." />
                    <span className="admin-field-hint">Shown on cards and at the top of the post. Paste a hosted image URL.</span>
                </div>
                <div className="admin-field">
                    <label>Tags (comma-separated)</label>
                    <input value={form.tagsText} onChange={(e) => set('tagsText', e.target.value)} placeholder="AI, Claude, Career" />
                </div>
                <div className="admin-field">
                    <label>Excerpt (short summary shown on the homepage preview)</label>
                    <textarea value={form.excerpt} onChange={(e) => set('excerpt', e.target.value)} rows={2} />
                </div>
                <div className="admin-field">
                    <label>Content</label>
                    <MarkdownEditor value={form.content} onChange={(md) => set('content', md)} />
                </div>
            </div>

            <button type="submit" className="admin-btn-primary" disabled={saving}>
                {saving ? 'Saving…' : 'Save Post'}
            </button>{' '}
            <a href="/admin/blog" className="admin-btn-secondary">Cancel</a>
        </form>
    );
}
