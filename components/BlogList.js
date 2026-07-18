'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';

export default function BlogList({ posts, tags }) {
    const [active, setActive] = useState('All');

    const filtered = useMemo(() => {
        if (active === 'All') return posts;
        return posts.filter((p) => (p.tags || []).includes(active));
    }, [posts, active]);

    return (
        <>
            {tags.length > 0 && (
                <div className="filter-block">
                    <span className="filter-label">filter by topic</span>
                    <div className="filter-row">
                        <button
                            type="button"
                            className={`filter-pill ${active === 'All' ? 'active' : ''}`}
                            onClick={() => setActive('All')}
                        >
                            All
                        </button>
                        {tags.map((tag) => (
                            <button
                                type="button"
                                key={tag}
                                className={`filter-pill ${active === tag ? 'active' : ''}`}
                                onClick={() => setActive(tag)}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            <p className="result-count">
                Showing {filtered.length} of {posts.length} post{posts.length === 1 ? '' : 's'}
            </p>

            <div className="guide-grid">
                {filtered.length === 0 && <div className="empty-state">No posts match this filter yet.</div>}
                {filtered.map((post) => (
                    <Link key={post.slug} href={`/blog/${post.slug}`} className="guide-card">
                        <h3 className="guide-card-title">{post.title}</h3>
                        {post.tags && post.tags.length > 0 && (
                            <div className="tag-row">
                                {post.tags.map((t) => (
                                    <span key={t} className="tag-pill">{t}</span>
                                ))}
                            </div>
                        )}
                        <span className="read-link">Read post →</span>
                    </Link>
                ))}
            </div>
        </>
    );
}
