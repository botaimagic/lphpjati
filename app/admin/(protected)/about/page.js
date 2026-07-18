import { getAbout } from '@/lib/content';
import AboutForm from '@/components/admin/AboutForm';

export default function AdminAboutPage() {
    const about = getAbout();
    return (
        <>
            <h1>Edit About Page</h1>
            <AboutForm initialAbout={about} />
        </>
    );
}
