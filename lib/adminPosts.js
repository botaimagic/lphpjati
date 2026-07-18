import { listDirectory, readFile, writeFile, deleteFile } from './repo';
import { parsePost, serializePost } from './postFormat';

const DIR = 'content/posts';

/**
 * Admin-facing post operations. Unlike lib/posts.js (build-time, fs-only),
 * these run at request time in the deployed admin — so they always go
 * through lib/repo.js (GitHub Contents API in production, fs locally) to
 * see the true current state, not a stale build-time snapshot.
 */

export async function listAllPosts() {
    const files = await listDirectory(DIR);
    const mdFiles = files.filter((f) => f.name.endsWith('.md'));
    const posts = await Promise.all(
        mdFiles.map(async (f) => {
            const file = await readFile(f.path);
            if (!file) return null;
            return parsePost(f.name.replace(/\.md$/, ''), file.content);
        })
    );
    return posts.filter(Boolean);
}

export async function getPost(slug) {
    const file = await readFile(`${DIR}/${slug}.md`);
    if (!file) return null;
    return parsePost(slug, file.content);
}

export async function savePost(slug, post, message) {
    await writeFile(`${DIR}/${slug}.md`, serializePost({ ...post, slug }), message);
}

export async function deletePost(slug, message) {
    await deleteFile(`${DIR}/${slug}.md`, message);
}
