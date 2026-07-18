import { getAbout } from '@/lib/content';

export const metadata = { title: 'About' };

export default function AboutPage() {
    const about = getAbout();

    return (
        <div className="post-wrap">
            <div className="section-header" style={{ marginBottom: 40 }}>
                <span className="eyebrow">about</span>
                <h1 className="section-heading">My Story</h1>
                {about.intro && <p className="section-description">{about.intro}</p>}
            </div>

            {about.speeches?.length > 0 && (
                <section style={{ marginBottom: 40 }}>
                    <h2 className="guide-card-title" style={{ fontSize: 18, marginBottom: 16 }}>Selected Speech</h2>
                    <div className="links-group">
                        {about.speeches.map((item, i) => (
                            <div key={i} className="card-link">
                                <div className="card-icon-box">🎙️</div>
                                <div className="card-info">
                                    <h3>{item.title}</h3>
                                    <p>{item.subtitle}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {about.education?.length > 0 && (
                <section style={{ marginBottom: 40 }}>
                    <h2 className="guide-card-title" style={{ fontSize: 18, marginBottom: 16 }}>Education</h2>
                    <div className="links-group">
                        {about.education.map((item, i) => (
                            <div key={i} className="card-link">
                                <div className="card-icon-box">🎓</div>
                                <div className="card-info">
                                    <h3>{item.title}</h3>
                                    <p>{item.subtitle}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {about.books?.length > 0 && (
                <section>
                    <h2 className="guide-card-title" style={{ fontSize: 18, marginBottom: 16 }}>Books</h2>
                    <div className="links-group">
                        {about.books.map((item, i) => (
                            <a key={i} href={item.link} target="_blank" rel="noopener noreferrer" className="card-link">
                                <div className="card-icon-box green">📚</div>
                                <div className="card-info">
                                    <h3>{item.title}</h3>
                                    <p>{item.subtitle}</p>
                                </div>
                                <div className="card-arrow">→</div>
                            </a>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}
