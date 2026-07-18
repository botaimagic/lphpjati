import content from '@/content/content.json';

/**
 * Statically imported at build time — reflects whatever was last
 * committed to content/content.json. New admin edits only appear
 * after the resulting GitHub commit triggers a fresh Vercel build.
 */
export function getHome() {
    return content.home;
}

export function getAbout() {
    return content.about;
}
