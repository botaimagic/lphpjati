import Link from 'next/link';
import { getHome, getAbout } from '@/lib/content';
import { getPublishedPosts } from '@/lib/posts';
import SocialLinks from '@/components/SocialLinks';

export default function HomePage() {
    const home = getHome();
    const about = getAbout();
    const latestPosts = getPublishedPosts().slice(0, 3);
    const nameParts = (home.name || '').split(' ');
    const lastWord = nameParts.pop();
    const restOfName = nameParts.join(' ');

    return (
        <>
            <section className="hero">
                <div>
                    <span className="eyebrow">{home.greeting || "hi, I'm"}</span>
                    <h1 className="hero-name">
                        {restOfName ? `${restOfName} ` : ''}
                        <span className="accent-word">{lastWord}</span>
                    </h1>
                    {home.badge && <span className="hero-badge">{home.badge}</span>}
                    {home.description && <p className="hero-description">{home.description}</p>}
                    <div className="hero-actions">
                        {home.whatsapp_link && (
                            <a href={home.whatsapp_link} target="_blank" rel="noopener noreferrer" className="pill-btn">
                                {home.whatsapp_text || 'Contact Me'}
                            </a>
                        )}
                        <Link href="/blog" className="pill-btn pill-btn-outline">Browse Blog</Link>
                        <Link href="/about" className="pill-btn pill-btn-outline">About Me</Link>
                    </div>
                    {home.stats && home.stats.length > 0 && (
                        <div className="stats-row">
                            {home.stats.map((stat, i) => (
                                <span key={i} className="stat-pill"><span>{stat.value}</span>{stat.label}</span>
                            ))}
                        </div>
                    )}
                    <div style={{ marginTop: 20 }}>
                        <SocialLinks social={home.social} />
                    </div>
                </div>
                <div className="polaroid-wrap">
                    <div className="polaroid">
                        <div className="polaroid-tape" />
                        {home.profile_img && <img src={home.profile_img} alt={home.name} />}
                        <div className="polaroid-caption">hi there 👋</div>
                    </div>
                </div>
            </section>

            {home.logos && home.logos.length > 0 && (
                <section className="section">
                    <div className="section-header">
                        <span className="eyebrow">trusted by</span>
                        <h2 className="section-heading">Speaker At</h2>
                    </div>
                    <div className="marquee-container">
                        <div className="marquee-track">
                            {[...home.logos, ...home.logos].map((logo, i) => (
                                <img key={i} src={logo.img} alt={logo.name} className="logo-img" />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <section className="section">
                <div className="section-header">
                    <span className="eyebrow">fresh reads</span>
                    <h2 className="section-heading">From the <span className="accent-word">Blog</span></h2>
                    <p className="section-description">Notes on AI, data governance, and building things that actually work.</p>
                </div>
                {latestPosts.length > 0 ? (
                    <>
                        <div className="preview-grid">
                            {latestPosts.map((post) => (
                                <Link key={post.slug} href={`/blog/${post.slug}`} className="preview-card">
                                    <div className="preview-card-icon">
                                        {post.thumbnail ? <img src={post.thumbnail} alt="" /> : '📝'}
                                    </div>
                                    <h3>{post.title}</h3>
                                    {post.excerpt && <p>{post.excerpt}</p>}
                                    <span className="read-link">Read post →</span>
                                </Link>
                            ))}
                        </div>
                        <div className="section-cta">
                            <Link href="/blog" className="pill-btn">See all posts</Link>
                        </div>
                    </>
                ) : (
                    <div className="empty-state">No posts yet — check back soon.</div>
                )}
            </section>

            {about?.intro && (
                <section className="section">
                    <div className="about-preview">
                        <div className="polaroid" style={{ transform: 'rotate(-2deg)' }}>
                            <div className="polaroid-tape" />
                            {home.profile_img && <img src={home.profile_img} alt={home.name} />}
                        </div>
                        <div>
                            <span className="eyebrow">about me</span>
                            <h2 className="section-heading">A bit about me</h2>
                            <p className="hero-description">{about.intro}</p>
                            <Link href="/about" className="pill-btn pill-btn-outline">Read Full Bio</Link>
                        </div>
                    </div>
                </section>
            )}

            {home.products && home.products.length > 0 && (
                <section className="section">
                    <div className="section-header">
                        <span className="eyebrow">most loved</span>
                        <h2 className="section-heading">Digital Products</h2>
                    </div>
                    <div className="product-grid">
                        {home.products.map((product, i) => (
                            <a key={i} href={product.link} target="_blank" rel="noopener noreferrer" className="product-card">
                                <img src={product.img} alt={product.name} className="product-image" />
                                <div className="product-info">
                                    <h3 className="product-name">{product.name}</h3>
                                    <span className="product-price">{product.price}</span>
                                    <div className="product-btn">Beli Sekarang</div>
                                </div>
                            </a>
                        ))}
                    </div>
                </section>
            )}

            <section className="section" style={{ borderTop: 'none' }}>
                <div className="cta-band">
                    <span className="eyebrow">come say hi</span>
                    <h2 className="section-heading">Let&apos;s build something with AI.</h2>
                    <p className="section-description">Follow along for daily AI you can actually use, or reach out about a collaboration.</p>
                    <div className="cta-actions">
                        {home.whatsapp_link && (
                            <a href={home.whatsapp_link} target="_blank" rel="noopener noreferrer" className="pill-btn">
                                {home.whatsapp_text || 'Contact Me'}
                            </a>
                        )}
                        {home.social?.instagram && (
                            <a href={home.social.instagram} target="_blank" rel="noopener noreferrer" className="pill-btn pill-btn-outline">
                                Follow on Instagram
                            </a>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}
