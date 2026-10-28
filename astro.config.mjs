import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
const repo = process.env.GITHUB_REPOSITORY?.split('/');
const site = process.env.SITE_URL || (repo ? `https://${repo[0]}.github.io` : 'https://example.com');
const base = process.env.BASE_PATH || (repo && repo[1].toLowerCase() !== `${repo[0]}.github.io`.toLowerCase() ? `/${repo[1]}` : '/');
export default defineConfig({ site, base, output: 'static', trailingSlash: 'always', integrations: [sitemap()], vite: { define: { 'import.meta.env.SITE_CONFIGURED': JSON.stringify(site !== 'https://example.com') } } });
