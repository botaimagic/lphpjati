'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import RepeatableRows from './RepeatableRows';

export default function AboutForm({ initialAbout }) {
    const router = useRouter();
    const [form, setForm] = useState({
        intro: initialAbout.intro || '',
        education: initialAbout.education || [],
        speeches: initialAbout.speeches || [],
        books: initialAbout.books || [],
    });
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    function set(key, value) {
        setForm((f) => ({ ...f, [key]: value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setSaving(true);
        setMessage('');
        setError('');

        const res = await fetch('/api/admin/about', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
        });

        setSaving(false);
        if (res.ok) {
            setMessage('Saved! Changes will go live once the new deploy finishes (usually under a minute).');
            router.refresh();
        } else {
            const data = await res.json().catch(() => ({}));
            setError(data.error || 'Something went wrong.');
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            {message && <div className="admin-success">{message}</div>}
            {error && <div className="admin-alert">{error}</div>}

            <div className="admin-card">
                <h3>Intro / Bio</h3>
                <div className="admin-field">
                    <textarea value={form.intro} onChange={(e) => set('intro', e.target.value)} rows={4} />
                </div>
            </div>

            <div className="admin-card">
                <h3>Selected Speech</h3>
                <RepeatableRows
                    rows={form.speeches}
                    onChange={(rows) => set('speeches', rows)}
                    fields={[{ key: 'title', label: 'Title' }, { key: 'subtitle', label: 'Subtitle' }]}
                    addLabel="+ Add Speech"
                />
            </div>

            <div className="admin-card">
                <h3>Education</h3>
                <RepeatableRows
                    rows={form.education}
                    onChange={(rows) => set('education', rows)}
                    fields={[{ key: 'title', label: 'Title' }, { key: 'subtitle', label: 'Subtitle' }]}
                    addLabel="+ Add Education"
                />
            </div>

            <div className="admin-card">
                <h3>Books</h3>
                <RepeatableRows
                    rows={form.books}
                    onChange={(rows) => set('books', rows)}
                    fields={[{ key: 'title', label: 'Title' }, { key: 'subtitle', label: 'Subtitle' }, { key: 'link', label: 'Link' }]}
                    addLabel="+ Add Book"
                />
            </div>

            <button type="submit" className="admin-btn-primary" disabled={saving}>
                {saving ? 'Saving…' : 'Save About Page'}
            </button>
        </form>
    );
}
