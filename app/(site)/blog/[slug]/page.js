import { notFound } from 'next/navigation';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getPostBySlug, getPublishedPosts } from '@/lib/posts';

export function generateStaticParams() {
    return getPublishedPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const post = getPostBySlug(slug);
    return { title: post ? post.title : 'Post not found' };
}

export default async function PostPage({ params }) {
    const { slug } = await params;
    const post = getPostBySlug(slug);
    if (!post) notFound();

    const dateLabel = post.date
        ? new Date(post.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
        : '';

    return (
        <div className="post-wrap">
            <Link href="/blog" className="back-link">← Back to Blog</Link>
            <article className="note-card">
                {post.thumbnail && <img src={post.thumbnail} alt="" className="post-thumb" />}
                <div className="note-card-body">
                    <h1 className="post-title">{post.title}</h1>
                    {dateLabel && <div className="post-date">{dateLabel}</div>}
                    <div className="post-content">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
                    </div>
                </div>
            </article>
        </div>
    );
}
