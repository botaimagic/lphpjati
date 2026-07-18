import matter from 'gray-matter';

/** Parses a `<slug>.md` file's raw text (YAML frontmatter + Markdown body) into a post object. */
export function parsePost(slug, raw) {
    const { data, content } = matter(raw);
    return {
        slug,
        title: data.title || '',
        date: data.date || '',
        status: data.status || 'published',
        thumbnail: data.thumbnail || '',
        excerpt: data.excerpt || '',
        tags: Array.isArray(data.tags) ? data.tags : [],
        content: (content || '').trim(),
    };
}

/** Serializes a post object back into `<slug>.md` file text. */
export function serializePost(post) {
    const { content, slug, ...frontmatter } = post;
    return matter.stringify(`${content || ''}\n`, frontmatter);
}
