# Hadi Purnama Jati — Site + CMS

A Next.js site (Home / About / Blog) with a built-in admin CMS at `/admin`.

- Home and About content lives in [`content/content.json`](content/content.json).
- Each blog post is its own Markdown file in [`content/posts/`](content/posts)
  (`<slug>.md`, YAML frontmatter + Markdown body) — no database, easy to
  read/diff, one file per post.
- The admin's post editor is a **WYSIWYG** editor (bold looks bold, headings
  look like headings, images show inline as you write) built on Tiptap. It
  reads existing Markdown straight into that rich view when you open a post
  to edit, and saves back out as clean Markdown — you never have to type
  `**`/`#`/`![]()` syntax yourself, though it's still what ends up on disk.

Saving in the admin either writes files directly (local dev) or commits
them to this repo on GitHub (production on Vercel), which triggers a new
deploy.

The old PHP/MySQL-free version of this site (static HTML + PHP admin) is
kept for reference in [`legacy-php/`](legacy-php/) — it's no longer used.

## Local development

```bash
npm install
cp .env.example .env.local   # then edit ADMIN_USERNAME / ADMIN_PASSWORD
npm run dev
```

Visit `http://localhost:3000`, and `http://localhost:3000/admin` for the
CMS (default login: `admin` / `changeme123` unless you changed it in
`.env.local`). With no `GITHUB_TOKEN` set, admin saves write straight to
`content/content.json` on disk — changes are visible immediately.

## Deploying to Vercel

1. Push this repo to GitHub.
2. Import it in Vercel ([vercel.com/new](https://vercel.com/new)) — it
   auto-detects Next.js, no config needed.
3. In the Vercel project's **Settings → Environment Variables**, add:

   | Variable | Value |
   |---|---|
   | `ADMIN_USERNAME` | your admin login username |
   | `ADMIN_PASSWORD` | your admin login password |
   | `SESSION_SECRET` | a long random string (`openssl rand -hex 32`) |
   | `GITHUB_TOKEN` | a GitHub personal access token (see below) |
   | `GITHUB_REPO` | `your-username/your-repo` |
   | `GITHUB_BRANCH` | `main` (or whatever branch Vercel deploys from) |

4. Deploy.

### Creating the GitHub token

The admin panel needs permission to commit `content/content.json` and
`content/posts/*.md` back to your repo:

- **Fine-grained token** (recommended): GitHub → Settings → Developer
  settings → Personal access tokens → Fine-grained tokens → generate one
  scoped to just this repository, with **Contents: Read and write**
  permission.
- **Classic token**: same location, scope `repo`.

Paste it into Vercel's `GITHUB_TOKEN` env var. Never commit it to the repo.

### How saving works in production

When you save in `/admin`, the server reads the relevant file(s) from
GitHub, merges your edit, and commits the result back via the GitHub API
— either `content/content.json` (Home/About) or a single
`content/posts/<slug>.md` (one blog post). That commit triggers a new
Vercel deployment automatically. Changes go live once that build
finishes — usually under a minute. If you save twice in quick succession
before the first deploy finishes, the second save's starting point won't
include the first save yet; just wait for deploys to catch up between
edits.

Renaming a post's slug (or changing its title, which regenerates the
slug) deletes the old `.md` file and creates a new one in the same commit
cycle.

### Images

There's no file upload in this CMS — every image field (profile photo,
logos, product images, blog thumbnails, and images inserted inline in a
post body via the editor's "Image" button) takes a **URL** to an
already-hosted image. Paste links from wherever you already host images
(your existing CDN, an image host, etc.).

## Project structure

- `app/(site)/` — public pages: Home, About, Blog, Blog post
- `app/admin/` — CMS: `login/` (public) and `(protected)/` (auth-gated)
- `app/api/admin/` — route handlers the admin forms call to save data
- `lib/content.js` — reads `content/content.json` (Home/About) at build time
- `lib/posts.js` — reads `content/posts/*.md` at build time, for the
  public Home/Blog pages (always local fs — the full repo is present at
  build time regardless of environment)
- `lib/adminPosts.js` — reads/writes individual posts at *request* time
  in `/admin`, via `lib/repo.js`
- `lib/postFormat.js` — Markdown frontmatter parse/serialize (shared by
  `posts.js` and `adminPosts.js`)
- `lib/repo.js` — generic file read/write/delete/list: GitHub Contents
  API in production, local filesystem in dev
- `lib/siteContent.js` — same idea as `repo.js`, specialized for the
  single `content/content.json` file
- `lib/auth.js` — signed-cookie session for `/admin`
- `components/admin/MarkdownEditor.js` — the Tiptap WYSIWYG editor used
  for post content
- `content/content.json` — Home/About content
- `content/posts/*.md` — one Markdown file per blog post
