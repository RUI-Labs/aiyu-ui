if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,r)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let a={};const o=e=>i(e,t),c={module:{uri:t},exports:a,require:o};s[t]=Promise.all(n.map((e=>c[e]||o(e)))).then((e=>(r(...e),a)))}}define(["./workbox-7369c0e1"],(function(e){"use strict";importScripts("sw-next-message.js"),self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"assets/index-6a808904.css",revision:null},{url:"assets/index-6d90d6c5.js",revision:null},{url:"firebase-messaging-sw.js",revision:"150a8ef166a811fe8c90c60c8ef0309a"},{url:"index.html",revision:"ca52787dc2f87951f4331da3dfe0ee33"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"aiyu.png",revision:"7fb902b0e87adcdcc861e8693067021f"},{url:"aiyu-192.png",revision:"58c824c6678a7580b2388ef60a5247bd"},{url:"aiyu-512.png",revision:"af8d7be256a6380a7b7e0ba10113e979"},{url:"manifest.webmanifest",revision:"5949112e5aa4e8e5aa0977cc1322826f"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html"))),e.registerRoute("/share",(({event:e})=>{const s=e.request.formData();return e.waitUntil(async function(){await nextMessage("share-ready");const i=await self.clients.get(e.resultingClientId),n=await s;i.postMessage({images:n.getAll("images")||[],uri:"/share"})}()),Response.redirect("/share")}),"POST")}));
