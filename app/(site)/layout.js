import { getHome } from '@/lib/content';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export default function SiteLayout({ children }) {
    const home = getHome();
    return (
        <div className="jp-page">
            <Nav home={home} />
            {children}
            <Footer name={home.name} />
        </div>
    );
}
