'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Nav({ home }) {
    const pathname = usePathname();
    const isActive = (href) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

    return (
        <header className="jp-topnav">
            <Link href="/" className="jp-logo">{home.name}</Link>
            <nav className="jp-topnav-links">
                <Link href="/" className={isActive('/') ? 'active' : ''}>Home</Link>
                <Link href="/about" className={isActive('/about') ? 'active' : ''}>About</Link>
                <Link href="/blog" className={isActive('/blog') ? 'active' : ''}>Blog</Link>
                {home.whatsapp_link && (
                    <a href={home.whatsapp_link} target="_blank" rel="noopener noreferrer" className="pill-btn">
                        {home.whatsapp_text || 'Contact'}
                    </a>
                )}
            </nav>
        </header>
    );
}
