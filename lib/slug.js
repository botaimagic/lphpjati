export function slugify(text) {
    const slug = String(text)
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
    return slug || 'post';
}

export function uniqueSlug(base, posts, excludeSlug) {
    const original = slugify(base);
    const taken = new Set(posts.filter((p) => p.slug !== excludeSlug).map((p) => p.slug));
    let slug = original;
    let i = 2;
    while (taken.has(slug)) {
        slug = `${original}-${i}`;
        i++;
    }
    return slug;
}
