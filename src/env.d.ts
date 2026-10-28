/// <reference types="astro/client" />
interface ImportMetaEnv { readonly SITE_CONFIGURED: boolean; }
interface ImportMeta { readonly env: ImportMetaEnv; }
