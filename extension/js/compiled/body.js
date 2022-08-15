Promise.all([import("/extension/js/modules/env.js"),import("/extension/js/modules/did.js"),import("/extension/js/modules/dom.js"),import("/extension/js/modules/uuid.js"),import("/extension/js/modules/browser.js"),import("/extension/js/modules/extension-messenger.js")]).then((async e=>{const i=e[0].Env,s=e[1].DID,t=(e[2].DOM,e[3].UUID,e[4].Browser),n=e[5].ExtensionMessenger;let r=document.createElement("script");r.type="module",r.src=i.baseUrl+"/page.js",r.async=!1,document.documentElement.prepend(r),n.addListener("resolveIdentifier",(async e=>{let i=e.data.identifier;if(!i||"string"!=typeof i||!i.startsWith("did:"))return{error:"The value passed was not a valid DID URI"};let t=i.split(":")[1];return s.supportedMethods.includes(t)?{result:await s.resolve(i)}:{error:"The identifier provided is not of a supported DID Method"}})),n.addListener("requestAccess",(async e=>{let n={},r=e.data,o=r.identifier;console.log(await indexedDB.databases());let d=await s.getConnection(e.origin);if(!o)return{error:"No identifier access was requested and no existing identifier connection was found. All requests for access must be connected to an identifier."};if("string"==typeof o){if(d.did!==o)return{error:"No connection was found for the identifier provided."}}else if(d){if(!o.challenge)return{error:"The `challenge` parameter was missing or malformed"};n.identifier={uri:d.did,signature:await s.sign(d.did,r.challenge)}}if(console.log(n.identifier||r.datastore),n.identifier&&!r.datastore)return n;t.openWindow({url:i.baseUrl+`/views/request-did/index.html?origin=${e.origin}`,width:500,height:650,focused:!0,closeOnBlur:!0,tabData:{message:e,response:n}})}))}));
import{DOM}from"/extension/js/modules/dom.js";