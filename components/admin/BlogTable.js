'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function BlogTable({ posts }) {
    const router = useRouter();
    const [busySlug, setBusySlug] = useState(null);
    const [error, setError] = useState('');

    async function handleDelete(slug) {
        if (!confirm('Delete this post?')) return;
        setBusySlug(slug);
        setError('');
        const res = await fetch(`/api/admin/blog/${slug}`, { method: 'DELETE' });
        setBusySlug(null);
        if (res.ok) {
            router.refresh();
        } else {
            const data = await res.json().catch(() => ({}));
            setError(data.error || 'Failed to delete.');
        }
    }

    const sorted = [...posts].sort((a, b) => (b.date || '').localeCompare(a.date || ''));

    return (
        <div className="admin-card">
            {error && <div className="admin-alert">{error}</div>}
            {sorted.length === 0 ? (
                <p className="admin-muted">No posts yet.</p>
            ) : (
                <table className="admin-table">
                    <thead>
                        <tr><th></th><th>Title</th><th>Date</th><th>Status</th><th></th></tr>
                    </thead>
                    <tbody>
                        {sorted.map((post) => (
                            <tr key={post.slug}>
                                <td>{post.thumbnail && <img src={post.thumbnail} className="admin-thumb-preview" alt="" />}</td>
                                <td>{post.title}</td>
                                <td>{post.date}</td>
                                <td>
                                    <span className={`admin-status-badge admin-status-${post.status || 'published'}`}>
                                        {post.status || 'published'}
                                    </span>
                                </td>
                                <td className="admin-actions">
                                    <Link href={`/admin/blog/${post.slug}`} className="admin-btn-secondary">Edit</Link>
                                    <button
                                        type="button"
                                        className="admin-btn-danger"
                                        disabled={busySlug === post.slug}
                                        onClick={() => handleDelete(post.slug)}
                                    >
                                        {busySlug === post.slug ? 'Deleting…' : 'Delete'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
