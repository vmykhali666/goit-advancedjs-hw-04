var $=Object.defineProperty;var H=(e,t,r)=>t in e?$(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var f=(e,t,r)=>(H(e,typeof t!="symbol"?t+"":t,r),r),y=(e,t,r)=>{if(!t.has(e))throw TypeError("Cannot "+r)};var d=(e,t,r)=>(y(e,t,"read from private field"),r?r.call(e):t.get(e)),a=(e,t,r)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,r)};var w=(e,t,r)=>(y(e,t,"access private method"),r);import{a as O,i as m,S as M}from"./assets/vendor-0000e500.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const p of s.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&i(p)}).observe(document,{childList:!0,subtree:!0});function r(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(o){if(o.ep)return;o.ep=!0;const s=r(o);fetch(o.href,s)}})();var c,l,u,b;class U{constructor(){a(this,u);a(this,c,"41115082-57084d131d6361bf0a1460296");a(this,l,"https://pixabay.com/api/");f(this,"pageCount",1);f(this,"perPage",40)}async fetchImages(t){let r={key:d(this,c),q:t,image_type:"photo",orientation:"horizontal",safesearch:"true",page:this.pageCount,per_page:this.perPage},i=w(this,u,b).call(this,r);return await O.get(i).then(o=>(console.log(this.pageCount),o.data))}resetPageCount(){this.pageCount=1}incrementPageCount(){this.pageCount++}}c=new WeakMap,l=new WeakMap,u=new WeakSet,b=function(t){return d(this,l)+"?"+new URLSearchParams(t)};const S=document.querySelector(".search-form"),v=document.querySelector(".gallery"),x=S.elements.searchQuery,n=new U;let L="",g=!0,h=!1;function P(e){m.show({title:"Error",message:`❌ Oops! ${e}`,position:"topRight",color:"red"})}function I(){const{height:e}=document.querySelector(".gallery").firstElementChild.getBoundingClientRect();window.scrollBy({top:e*2,behavior:"smooth"})}function E(){const e=document.querySelector("body");return window.innerHeight+window.scrollY>=e.offsetHeight}async function C(){E()&&(g?h||(await q(),I()):z("We're sorry, but you've reached the end of search results."))}function z(e){m.show({title:"OK",message:`✅ Done! ${e}`,position:"topRight",color:"green"})}function A(e){m.success({title:"Success",message:e,position:"topRight",color:"green"})}async function q(){try{const e=await n.fetchImages(L);if(n.incrementPageCount(),h=!0,g=!0,!e.hits.length)throw new Error("Sorry, there are no images matching your search query. Please try again.");(n.pageCount-1)*n.perPage>=e.totalHits&&(g=!1),!n.pageCount>1&&A(`Hooray! We found ${e.totalHits} totalHits images.`);const t=e.hits.map(D).join("");v.insertAdjacentHTML("beforeend",t);const r=new M(".gallery a")}catch(e){R(),P(e)}finally{h=!1}}function D(e){return`<div class="photo-card">
                <a class="card-link" href="${e.largeImageURL}">
                    <img class="card-img" src="${e.webformatURL}" alt="${e.tags}" loading="lazy" />
                </a>
                <div class="info">
                    <p class="info-item">
                        <b>Likes</b>
                        <span>${e.likes}</span>
                    </p>
                    <p class="info-item">
                        <b>Views</b>
                        <span>${e.views}</span>
                    </p>
                    <p class="info-item">
                        <b>Comments</b>
                        <span>${e.comments}</span>
                    </p>
                    <p class="info-item">
                        <b>Downloads</b>
                        <span>${e.downloads}</span>
                    </p>
                </div>
            </div>`}function R(){n.resetPageCount(),v.innerHTML="",window.removeEventListener("scroll",C)}async function N(e){try{e.preventDefault(),R();const t=x.value.trim();if(t==="")throw new Error("Sorry, we can`t handle empty request, please enter the query");L=t,await q(),window.addEventListener("scroll",C)}catch(t){P(t)}}S.addEventListener("submit",N);
//# sourceMappingURL=commonHelpers.js.map
