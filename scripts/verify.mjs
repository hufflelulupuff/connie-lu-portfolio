import {readdir,readFile,stat} from 'node:fs/promises';
import {join,resolve} from 'node:path';
import assert from 'node:assert/strict';
const root=resolve('dist');
const {projectData}=await import('./validate-content.mjs');
const published=projectData.filter(p=>p.published);

async function walk(dir){const files=[];for(const item of await readdir(dir,{withFileTypes:true})){const path=join(dir,item.name);files.push(...(item.isDirectory()?await walk(path):[path]));}return files;}
const all=await walk(root);const htmls=all.filter(p=>p.endsWith('.html'));
assert.equal(htmls.length,6+published.length,'Expected main pages plus published cases');
let checked=0;const titles=new Set();
for(const file of htmls){const html=await readFile(file,'utf8');const title=html.match(/<title>(.*?)<\/title>/)?.[1];assert(title);assert(!titles.has(title),'Unique title');titles.add(title);assert.equal((html.match(/<h1(?:\s|>)/g)||[]).length,1,`Single h1: ${file}`);assert(html.includes('lang="zh-Hant"'));assert(html.includes('name="description"'));assert(html.includes('property="og:image"'));assert(!/docs\.google\.com|drive\.google\.com|1PXCfSCL/.test(html),'Private source URL leaked');
const canonical=html.match(/rel="canonical" href="([^"]+)"/)?.[1];assert(canonical);new URL(canonical);
// Infer the shared base from the homepage link, independent of repo name.
const home=html.match(/class="wordmark" href="([^"]+)"/)?.[1];assert(home);const prefix=home.replace(/\/$/,'');
for(const m of html.matchAll(/(?:href|src)="([^"#]+)"/g)){let link=m[1].replace(/&amp;/g,'&');if(!link.startsWith('/'))continue;assert(link===prefix||link.startsWith(prefix+'/'),`Missing deployment base: ${link}`);let local=decodeURIComponent(link.slice(prefix.length)).split(/[?#]/)[0];let path=join(root,local);if(local.endsWith('/'))path=join(path,'index.html');assert((await stat(path).catch(()=>null))?.isFile(),`Broken local link ${link} in ${file}`);checked++;}
assert(!html.includes('app.pagescms.org'),'Public site must not expose CMS navigation');
for(const p of projectData){if(file.endsWith(join('work',p.slug,'index.html'))){assert(p.published);if(!p.excerptApproved)assert(html.includes('待確認公開授權'));}}
}
const sitemap=await readFile(join(root,'sitemap-0.xml'),'utf8');assert(!sitemap.includes('/404'));assert.equal((sitemap.match(/<loc>/g)||[]).length,5+published.length);assert((await stat(join(root,'og.png'))).size>1000);assert((await readFile(join(root,'robots.txt'),'utf8')).includes('Sitemap:'));
console.log(`PASS: ${htmls.length} pages, ${checked} internal links/assets, unique metadata, sitemap, OG and source privacy checks.`);

