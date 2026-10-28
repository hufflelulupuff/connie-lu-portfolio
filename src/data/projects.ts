export type Project = { slug:string; title:string; brand:string; category:string; label:string; intro:string; audience:string; intent:string; structure:string[]; focus:string[]; color:string; issue:string; originalUrl?:string|null; excerpt?:string|null; excerptApproved:boolean; published:boolean; order:number; coverImage?:string; coverAlt?:string };
const files=import.meta.glob<Project>('../content/projects/*.json',{eager:true,import:'default'});
export const projects=Object.values(files).filter(p=>p.published===true).sort((a,b)=>a.order-b.order||a.slug.localeCompare(b.slug));
