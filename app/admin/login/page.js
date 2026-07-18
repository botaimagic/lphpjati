'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import '../admin.css';

export default function LoginPage() {
    const router = useRouter();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setError('');
        setLoading(true);

        const form = new FormData(e.target);
        const res = await fetch('/api/admin/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: form.get('username'),
                password: form.get('password'),
            }),
        });

        setLoading(false);
        if (res.ok) {
            router.push('/admin/home');
            router.refresh();
        } else {
            const data = await res.json().catch(() => ({}));
            setError(data.error || 'Login failed.');
        }
    }

    return (
        <div className="admin-body admin-login-body">
            <div className="admin-login-card">
                <h1>CMS Login</h1>
                <p className="admin-muted">Hadi Purnama Jati</p>
                {error && <div className="admin-alert">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <label>
                        Username
                        <input type="text" name="username" required autoFocus />
                    </label>
                    <label>
                        Password
                        <input type="password" name="password" required />
                    </label>
                    <button type="submit" className="admin-btn-primary" disabled={loading}>
                        {loading ? 'Signing in…' : 'Masuk'}
                    </button>
                </form>
            </div>
        </div>
    );
}
