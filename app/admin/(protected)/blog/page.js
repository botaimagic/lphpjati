import Link from 'next/link';
import { listAllPosts } from '@/lib/adminPosts';
import BlogTable from '@/components/admin/BlogTable';

export default async function AdminBlogPage() {
    const posts = await listAllPosts();
    return (
        <>
            <h1>Blog Posts</h1>
            <Link
                href="/admin/blog/new"
                className="admin-btn-primary"
                style={{ textDecoration: 'none', display: 'inline-block', marginBottom: 20 }}
            >
                + New Post
            </Link>
            <BlogTable posts={posts} />
        </>
    );
}
