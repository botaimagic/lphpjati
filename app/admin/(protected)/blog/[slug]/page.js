import { notFound } from 'next/navigation';
import { getPost } from '@/lib/adminPosts';
import BlogPostForm from '@/components/admin/BlogPostForm';

export default async function EditPostPage({ params }) {
    const { slug } = await params;
    const post = await getPost(slug);
    if (!post) notFound();

    return (
        <>
            <h1>Edit Post</h1>
            <BlogPostForm initialPost={post} />
        </>
    );
}
