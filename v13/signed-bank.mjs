// Experimental verification only. Never activates or persists a bank.
const HEX=/^[0-9a-f]{64}$/i;
const ALLOWED_HOST='raw.githubusercontent.com';
function decodeBase64(s){if(typeof s!=='string'||!/^[A-Za-z0-9+/]+={0,2}$/.test(s))throw Error('Invalid signature');return Uint8Array.from(atob(s),c=>c.charCodeAt(0));}
export function inspectBankDescriptor(d,localVersion=164,appVersion=13){
 if(!d||!Number.isSafeInteger(d.version)||d.version<=localVersion)throw Error('No newer version');
 if(!Number.isSafeInteger(d.minimum_app_version_code)||d.minimum_app_version_code>appVersion)throw Error('App update required');
 if(!Number.isSafeInteger(d.question_count)||d.question_count<1||d.question_count>10000)throw Error('Invalid count');
 if(!Number.isSafeInteger(d.byte_length)||d.byte_length<1||d.byte_length>20_000_000)throw Error('Invalid size');
 if(!HEX.test(d.sha256||''))throw Error('Invalid digest');
 const url=new URL(d.file);if(url.protocol!=='https:'||url.hostname!==ALLOWED_HOST||url.username||url.password||url.port||url.search||url.hash)throw Error('Untrusted URL');
 return d;
}
export async function verifyDetachedP256(payload,signatureBase64,publicKeyJwk){
 if(!publicKeyJwk||publicKeyJwk.kty!=='EC'||publicKeyJwk.crv!=='P-256'||publicKeyJwk.alg!=='ES256'||publicKeyJwk.key_ops?.includes('sign'))throw Error('Invalid public key');
 const key=await crypto.subtle.importKey('jwk',publicKeyJwk,{name:'ECDSA',namedCurve:'P-256'},false,['verify']);
 return crypto.subtle.verify({name:'ECDSA',hash:'SHA-256'},key,decodeBase64(signatureBase64),payload);
}
export async function verifyBankBytes(bytes,d){
 if(bytes.byteLength!==d.byte_length)throw Error('Size mismatch');
 const hash=new Uint8Array(await crypto.subtle.digest('SHA-256',bytes));
 const hex=Array.from(hash,b=>b.toString(16).padStart(2,'0')).join('');
 if(hex!==d.sha256.toLowerCase())throw Error('Digest mismatch');
 const bank=JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(bytes));
 if(bank.version!==d.version||!Array.isArray(bank.questions)||bank.questions.length!==d.question_count)throw Error('Bank metadata mismatch');
 const ids=new Set();for(const q of bank.questions){if(!q||typeof q.id!=='string'||!q.id.trim()||ids.has(q.id)||typeof q.q!=='string'||!q.q.trim()||!Array.isArray(q.a)||q.a.length!==4||q.a.some(a=>typeof a!=='string'||!a.trim())||!Number.isInteger(q.ok)||q.ok<0||q.ok>3)throw Error('Invalid question');ids.add(q.id);}
 return {version:bank.version,questionCount:ids.size};
}
