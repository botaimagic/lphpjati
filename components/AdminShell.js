'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function AdminShell({ children }) {
    const pathname = usePathname();
    const router = useRouter();

    async function handleLogout() {
        await fetch('/api/admin/logout', { method: 'POST' });
        router.push('/admin/login');
        router.refresh();
    }

    const isActive = (href) => pathname.startsWith(href);

    return (
        <div className="admin-shell">
            <aside className="admin-sidebar">
                <h2>HPJati CMS</h2>
                <Link href="/admin/home" className={isActive('/admin/home') ? 'active' : ''}>Home</Link>
                <Link href="/admin/about" className={isActive('/admin/about') ? 'active' : ''}>About</Link>
                <Link href="/admin/blog" className={isActive('/admin/blog') ? 'active' : ''}>Blog</Link>
                <div className="admin-view-link">
                    <Link href="/" target="_blank">View Site ↗</Link>
                    <button type="button" className="admin-nav-link admin-logout" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </aside>
            <main className="admin-main">{children}</main>
        </div>
    );
}
