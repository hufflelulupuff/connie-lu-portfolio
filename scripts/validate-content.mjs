import fs from 'node:fs';
import assert from 'node:assert/strict';
export const config=JSON.parse(fs.readFileSync('.pages.yml','utf8'));
function validateFields(value,fields,where){
  assert(value && typeof value==='object'&&!Array.isArray(value),`${where}: 需要物件`);
  for(const f of fields){
    const v=value[f.name], name=`${where}.${f.name}`;
    if(v==null||v===''){assert(!f.required,`${name}: 必填`);continue;}
    const values=f.list?(assert(Array.isArray(v),`${name}: 需要清單`),v):[v];
    if(f.list?.min)assert(values.length>=f.list.min,`${name}: 清單項目不足`);
    for(const item of values){
      if(f.type==='boolean')assert.equal(typeof item,'boolean',name);
      else if(f.type==='number')assert(Number.isFinite(item),name);
      else {assert.equal(typeof item,'string',name);if(f.required)assert(item.trim(),name);if(f.pattern)assert(new RegExp(f.pattern).test(item),`${name}: 格式不正確`);}
      if(f.type==='select')assert(f.options.values.some(x=>(typeof x==='string'?x:x.name)===item),`${name}: 選項不正確`);
    }
  }
}
export function validate(){
 const all=[];const slugs=new Set();
 for(const entry of config.content){
   const files=entry.type==='collection'?fs.readdirSync(entry.path).filter(f=>f.endsWith('.json')).map(f=>`${entry.path}/${f}`):[entry.path];
   for(const file of files){const data=JSON.parse(fs.readFileSync(file,'utf8'));const items=entry.list?(assert(Array.isArray(data),file),data):[data];for(const item of items)validateFields(item,entry.fields,file);
     if(entry.name==='projects'){
       assert(!slugs.has(data.slug),'案例網址不可重複');slugs.add(data.slug);
       if(data.originalUrl){const u=new URL(data.originalUrl);assert(u.protocol==='https:'&&!['docs.google.com','drive.google.com'].includes(u.hostname),'請填可公開的 HTTPS 原文網址');}
       assert(!data.excerpt||data.excerptApproved===true,'節錄尚未確認授權；請先移除節錄文字');
       if(data.coverImage){assert(/^\/media\/[^?#]+\.(png|jpe?g|webp)$/i.test(data.coverImage)&&!data.coverImage.includes('..'),'封面必須是媒體庫圖片');assert(fs.existsSync(`public${data.coverImage}`),'封面檔案不存在');assert(data.coverAlt?.trim(),'封面需填圖片說明');}
       all.push(data);
     }
   }
 }
 return all;
}
export const projectData=validate();
console.log(`Content valid: ${config.content.length} editor sections, ${projectData.length} cases.`);
