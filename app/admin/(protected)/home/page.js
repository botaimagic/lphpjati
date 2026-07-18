import { getHome } from '@/lib/content';
import HomeForm from '@/components/admin/HomeForm';

export default function AdminHomePage() {
    const home = getHome();
    return (
        <>
            <h1>Edit Home Page</h1>
            <HomeForm initialHome={home} />
        </>
    );
}
