import fs from 'node:fs';
import path from 'node:path';
import { parsePost } from './postFormat';

const POSTS_DIR = path.join(process.cwd(), 'content', 'posts');

/**
 * Reads every post directly off disk. Safe to call from public pages —
 * these are statically rendered at build time, when the full repo
 * checkout (including content/posts/*.md) is always present.
 */
export function getAllPosts() {
    if (!fs.existsSync(POSTS_DIR)) return [];
    return fs
        .readdirSync(POSTS_DIR)
        .filter((f) => f.endsWith('.md'))
        .map((f) => parsePost(f.replace(/\.md$/, ''), fs.readFileSync(path.join(POSTS_DIR, f), 'utf-8')));
}

export function getPublishedPosts() {
    return getAllPosts()
        .filter((p) => p.status === 'published')
        .sort((a, b) => (b.date || '').localeCompare(a.date || ''));
}

export function getPostBySlug(slug) {
    const file = path.join(POSTS_DIR, `${slug}.md`);
    if (!fs.existsSync(file)) return null;
    const post = parsePost(slug, fs.readFileSync(file, 'utf-8'));
    return post.status === 'published' ? post : null;
}

export function getAllTags() {
    const tags = new Set();
    getPublishedPosts().forEach((p) => (p.tags || []).forEach((t) => tags.add(t)));
    return Array.from(tags).sort();
}
