import type { APIRoute } from 'astro';
export const GET: APIRoute = ({site}) => new Response(`User-agent: *\n${import.meta.env.SITE_CONFIGURED ? 'Allow: /' : 'Disallow: /'}\nSitemap: ${new URL(`${import.meta.env.BASE_URL.replace(/\/$/,'')}/sitemap-index.xml`,site)}\n`,{headers:{'Content-Type':'text/plain; charset=utf-8'}});
