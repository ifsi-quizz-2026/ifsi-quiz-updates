// Read-only compatibility check for legacy manifest; never installs content.
export function parseLegacyManifest(raw) {
 if(typeof raw!=="string"||raw.length>10000)throw Error("Manifest size");
 const m=JSON.parse(raw);
 if(!m||Array.isArray(m)||!Number.isSafeInteger(m.version)||m.version<1||
 typeof m.file!=="string"||!/^library-v([0-9]+)\.json$/.test(m.file)||
 Number(m.file.match(/^library-v([0-9]+)\.json$/)[1])!==m.version||
 !/^[a-f0-9]{64}$/i.test(m.sha256||""))throw Error("Manifest format");
 return {version:m.version,file:m.file,sha256:m.sha256};
}
export async function checkLegacyUpdate({localVersion,fetchImpl=fetch,timeoutMs=10000}={}) {
 if(!Number.isSafeInteger(localVersion)||localVersion<1)throw Error("Local version");
 const controller=new AbortController(),timeout=setTimeout(()=>controller.abort(),timeoutMs);
 try {
 const response=await fetchImpl("https://raw.githubusercontent.com/ifsi-quizz-2026/ifsi-quiz-updates/main/manifest.json",{cache:"no-store",redirect:"error",signal:controller.signal});
 if(!response.ok)throw Error("HTTP "+response.status);
 const m=parseLegacyManifest(await response.text());
 return {available:m.version>localVersion,remoteVersion:m.version,installationAllowed:false};
 }finally{clearTimeout(timeout);}
}
