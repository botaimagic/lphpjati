'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import RepeatableRows from './RepeatableRows';

export default function HomeForm({ initialHome }) {
    const router = useRouter();
    const [form, setForm] = useState({
        greeting: initialHome.greeting || '',
        name: initialHome.name || '',
        badge: initialHome.badge || '',
        description: initialHome.description || '',
        profile_img: initialHome.profile_img || '',
        whatsapp_text: initialHome.whatsapp_text || '',
        whatsapp_link: initialHome.whatsapp_link || '',
        social: { ...initialHome.social },
        stats: initialHome.stats || [],
        logos: initialHome.logos || [],
        products: initialHome.products || [],
    });
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    function set(key, value) {
        setForm((f) => ({ ...f, [key]: value }));
    }

    function setSocial(key, value) {
        setForm((f) => ({ ...f, social: { ...f.social, [key]: value } }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setSaving(true);
        setMessage('');
        setError('');

        const res = await fetch('/api/admin/home', {
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
                <h3>Profile</h3>
                <div className="admin-field">
                    <label>Greeting (small script text)</label>
                    <input value={form.greeting} onChange={(e) => set('greeting', e.target.value)} />
                </div>
                <div className="admin-field">
                    <label>Name</label>
                    <input value={form.name} onChange={(e) => set('name', e.target.value)} required />
                </div>
                <div className="admin-field">
                    <label>Badge (short pill text under your name)</label>
                    <input value={form.badge} onChange={(e) => set('badge', e.target.value)} />
                </div>
                <div className="admin-field">
                    <label>Description</label>
                    <textarea value={form.description} onChange={(e) => set('description', e.target.value)} rows={4} />
                </div>
                <div className="admin-field">
                    <label>Profile Photo URL</label>
                    <input value={form.profile_img} onChange={(e) => set('profile_img', e.target.value)} placeholder="https://..." />
                    <span className="admin-field-hint">Paste a hosted image URL — this CMS doesn&apos;t upload files.</span>
                </div>
            </div>

            <div className="admin-card">
                <h3>Contact Button</h3>
                <div className="admin-field">
                    <label>Button Text</label>
                    <input value={form.whatsapp_text} onChange={(e) => set('whatsapp_text', e.target.value)} />
                </div>
                <div className="admin-field">
                    <label>Link</label>
                    <input value={form.whatsapp_link} onChange={(e) => set('whatsapp_link', e.target.value)} />
                </div>
            </div>

            <div className="admin-card">
                <h3>Social Links</h3>
                <div className="admin-field">
                    <label>Instagram URL</label>
                    <input value={form.social.instagram || ''} onChange={(e) => setSocial('instagram', e.target.value)} />
                </div>
                <div className="admin-field">
                    <label>LinkedIn URL</label>
                    <input value={form.social.linkedin || ''} onChange={(e) => setSocial('linkedin', e.target.value)} />
                </div>
                <div className="admin-field">
                    <label>Google Scholar URL</label>
                    <input value={form.social.scholar || ''} onChange={(e) => setSocial('scholar', e.target.value)} />
                </div>
                <div className="admin-field">
                    <label>Email</label>
                    <input value={form.social.email || ''} onChange={(e) => setSocial('email', e.target.value)} />
                </div>
            </div>

            <div className="admin-card">
                <h3>Stats (small pill badges in the hero)</h3>
                <RepeatableRows
                    rows={form.stats}
                    onChange={(rows) => set('stats', rows)}
                    fields={[{ key: 'value', label: 'Value (e.g. 50+)' }, { key: 'label', label: 'Label' }]}
                    addLabel="+ Add Stat"
                />
            </div>

            <div className="admin-card">
                <h3>&quot;Speaker At&quot; Logos</h3>
                <RepeatableRows
                    rows={form.logos}
                    onChange={(rows) => set('logos', rows)}
                    fields={[{ key: 'name', label: 'Name' }, { key: 'img', label: 'Logo Image URL' }]}
                    addLabel="+ Add Logo"
                />
            </div>

            <div className="admin-card">
                <h3>Digital Products</h3>
                <RepeatableRows
                    rows={form.products}
                    onChange={(rows) => set('products', rows)}
                    fields={[
                        { key: 'name', label: 'Name' },
                        { key: 'img', label: 'Image URL' },
                        { key: 'price', label: 'Price' },
                        { key: 'link', label: 'Buy Link' },
                    ]}
                    addLabel="+ Add Product"
                />
            </div>

            <button type="submit" className="admin-btn-primary" disabled={saving}>
                {saving ? 'Saving…' : 'Save Home Page'}
            </button>
        </form>
    );
}
