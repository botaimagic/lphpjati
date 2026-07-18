import { redirect } from 'next/navigation';
import { isAuthenticated } from '@/lib/auth';
import AdminShell from '@/components/AdminShell';
import '../admin.css';

export default async function ProtectedAdminLayout({ children }) {
    const authed = await isAuthenticated();
    if (!authed) {
        redirect('/admin/login');
    }

    return (
        <div className="admin-body">
            <AdminShell>{children}</AdminShell>
        </div>
    );
}
