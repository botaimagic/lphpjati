import BlogPostForm from '@/components/admin/BlogPostForm';

export default function NewPostPage() {
    return (
        <>
            <h1>New Post</h1>
            <BlogPostForm initialPost={null} />
        </>
    );
}
