import { getPublishedPosts, getAllTags } from '@/lib/posts';
import BlogList from '@/components/BlogList';

export const metadata = { title: 'Blog' };

export default function BlogPage() {
    const posts = getPublishedPosts();
    const tags = getAllTags();

    return (
        <div>
            <div className="section-header">
                <span className="eyebrow">the archive</span>
                <h1 className="section-heading">My <span className="accent-word">Blog</span></h1>
                <p className="section-description">
                    Notes on AI, data governance, and building things that actually work. All free, all practical.
                </p>
            </div>
            <BlogList posts={posts} tags={tags} />
        </div>
    );
}
