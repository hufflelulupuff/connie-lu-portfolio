import fs from 'node:fs';
import assert from 'node:assert/strict';
import {validate} from './validate-content.mjs';
const file='src/content/projects/cms-validation-fixture.json';
assert(!fs.existsSync(file),'Reserved test filename already exists');
const initialPublished=validate().filter(p=>p.published).length;
const project={slug:'cms-validation-fixture',published:true,order:999,issue:'TEST',brand:'Local validation fixture',title:'Local validation fixture',category:'banquet',label:'Test',intro:'Test',audience:'Test',intent:'Test',structure:['Test'],focus:['Test'],color:'sand',originalUrl:'',excerpt:'',excerptApproved:false};
try{
  for(const bad of [{originalUrl:'javascript:alert(1)'},{originalUrl:'https://drive.google.com/private'},{category:'invented'},{coverImage:'/media/missing.png',coverAlt:'test'},{excerpt:'unapproved text',excerptApproved:false}]){
    fs.writeFileSync(file,JSON.stringify({...project,...bad}));
    assert.throws(()=>validate(),`Reject invalid CMS change: ${JSON.stringify(bad)}`);
  }
  fs.writeFileSync(file,JSON.stringify({...project,published:false}));
  assert.equal(validate().filter(p=>p.published).length,initialPublished);
}finally{fs.rmSync(file,{force:true});}
console.log('PASS: CMS validation rejects unsafe links, invalid categories, missing images and unapproved excerpts; unpublish is supported.');
