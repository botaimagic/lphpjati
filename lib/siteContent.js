import { readFile, writeFile } from './repo';

const CONTENT_PATH = 'content/content.json';

/** Reads the current home/about content (used by admin routes before merging an edit). */
export async function readCurrentContent() {
    const file = await readFile(CONTENT_PATH);
    if (!file) throw new Error('content/content.json not found');
    return JSON.parse(file.content);
}

export async function saveContent(newContent, message) {
    const json = JSON.stringify(newContent, null, 4) + '\n';
    await writeFile(CONTENT_PATH, json, message);
}
