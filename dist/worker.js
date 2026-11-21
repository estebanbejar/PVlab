import {moduleAnalysis,fieldAnalysis} from './physics.js';
import {validateField} from './data.js';
self.onmessage=({data:d})=>{try{const result=d.kind==='module'?moduleAnalysis(d.module,d.params):fieldAnalysis(d.module,validateField(d.config));self.postMessage({id:d.id,kind:d.kind,result});}catch(e){self.postMessage({id:d.id,kind:d.kind,error:e.message});}};
