import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();

function isGitHubConfigured() {
    return Boolean(process.env.GITHUB_TOKEN && process.env.GITHUB_REPO);
}

function ghHeaders() {
    return {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        Accept: 'application/vnd.github+json',
    };
}

function branch() {
    return process.env.GITHUB_BRANCH || 'main';
}

/**
 * File-level read/write/delete abstraction shared by every admin save path.
 * In production (GITHUB_TOKEN set) it commits directly to GitHub via the
 * Contents API, which triggers a new Vercel deploy. Locally it reads/writes
 * the filesystem so `npm run dev` reflects changes immediately.
 */

export async function listDirectory(dirPath) {
    if (isGitHubConfigured()) {
        const res = await fetch(
            `https://api.github.com/repos/${process.env.GITHUB_REPO}/contents/${dirPath}?ref=${branch()}`,
            { headers: ghHeaders(), cache: 'no-store' }
        );
        if (res.status === 404) return [];
        if (!res.ok) {
            throw new Error(`GitHub list failed (${res.status}): ${await res.text()}`);
        }
        const data = await res.json();
        return data.map((item) => ({ name: item.name, path: item.path }));
    }

    const abs = path.join(ROOT, dirPath);
    if (!fs.existsSync(abs)) return [];
    return fs.readdirSync(abs).map((name) => ({ name, path: `${dirPath}/${name}` }));
}

export async function readFile(filePath) {
    if (isGitHubConfigured()) {
        const res = await fetch(
            `https://api.github.com/repos/${process.env.GITHUB_REPO}/contents/${filePath}?ref=${branch()}`,
            { headers: ghHeaders(), cache: 'no-store' }
        );
        if (res.status === 404) return null;
        if (!res.ok) {
            throw new Error(`GitHub read failed (${res.status}): ${await res.text()}`);
        }
        const data = await res.json();
        return { content: Buffer.from(data.content, 'base64').toString('utf-8'), sha: data.sha };
    }

    const abs = path.join(ROOT, filePath);
    if (!fs.existsSync(abs)) return null;
    return { content: fs.readFileSync(abs, 'utf-8'), sha: null };
}

export async function writeFile(filePath, content, message) {
    if (isGitHubConfigured()) {
        const existing = await readFile(filePath);
        const res = await fetch(
            `https://api.github.com/repos/${process.env.GITHUB_REPO}/contents/${filePath}`,
            {
                method: 'PUT',
                headers: { ...ghHeaders(), 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: message || `Update ${filePath}`,
                    content: Buffer.from(content, 'utf-8').toString('base64'),
                    sha: existing?.sha,
                    branch: branch(),
                }),
            }
        );
        if (!res.ok) {
            throw new Error(`GitHub write failed (${res.status}): ${await res.text()}`);
        }
        return;
    }

    const abs = path.join(ROOT, filePath);
    fs.mkdirSync(path.dirname(abs), { recursive: true });
    fs.writeFileSync(abs, content);
}

export async function deleteFile(filePath, message) {
    if (isGitHubConfigured()) {
        const existing = await readFile(filePath);
        if (!existing) return;
        const res = await fetch(
            `https://api.github.com/repos/${process.env.GITHUB_REPO}/contents/${filePath}`,
            {
                method: 'DELETE',
                headers: { ...ghHeaders(), 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: message || `Delete ${filePath}`, sha: existing.sha, branch: branch() }),
            }
        );
        if (!res.ok) {
            throw new Error(`GitHub delete failed (${res.status}): ${await res.text()}`);
        }
        return;
    }

    const abs = path.join(ROOT, filePath);
    if (fs.existsSync(abs)) fs.unlinkSync(abs);
}
