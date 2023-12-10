var q=Object.defineProperty;var $=(e,t,o)=>t in e?q(e,t,{enumerable:!0,configurable:!0,writable:!0,value:o}):e[t]=o;var f=(e,t,o)=>($(e,typeof t!="symbol"?t+"":t,o),o),m=(e,t,o)=>{if(!t.has(e))throw TypeError("Cannot "+o)};var g=(e,t,o)=>(m(e,t,"read from private field"),o?o.call(e):t.get(e)),a=(e,t,o)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,o)};var y=(e,t,o)=>(m(e,t,"access private method"),o);import{a as H,S as R,i as h}from"./assets/vendor-0000e500.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const p of s.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&i(p)}).observe(document,{childList:!0,subtree:!0});function o(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=o(r);fetch(r.href,s)}})();var c,l,u,w;class O{constructor(){a(this,u);a(this,c,"41115082-57084d131d6361bf0a1460296");a(this,l,"https://pixabay.com/api/");f(this,"pageCount",1);f(this,"perPage",40)}async fetchImages(t){let o={key:g(this,c),q:t,image_type:"photo",orientation:"horizontal",safesearch:"true",page:this.pageCount,per_page:this.perPage},i=y(this,u,w).call(this,o);return await H.get(i).then(r=>(console.log(this.pageCount),r.data))}resetPageCount(){this.pageCount=1}incrementPageCount(){this.pageCount++}}c=new WeakMap,l=new WeakMap,u=new WeakSet,w=function(t){return g(this,l)+"?"+new URLSearchParams(t)};const b=document.querySelector(".search-form"),v=document.querySelector(".gallery"),M=b.elements.searchQuery,n=new O;let S="",d=!0;function U(e){h.show({title:"Error",message:`❌ Oops! ${e}`,position:"topRight",color:"red"})}function x(){const{height:e}=document.querySelector(".gallery").firstElementChild.getBoundingClientRect();window.scrollBy({top:e*2,behavior:"smooth"})}function I(){const e=document.querySelector("body");return window.innerHeight+window.scrollY>=e.offsetHeight}async function L(){I()&&(d?await P():z("We're sorry, but you've reached the end of search results."))}function z(e){h.show({title:"OK",message:`✅ Done! ${e}`,position:"topRight",color:"green"})}function A(e){h.success({title:"Success",message:e,position:"topRight",color:"green"})}async function P(){return await n.fetchImages(S).then(e=>{if(n.incrementPageCount(),d=!0,!e.hits.length)throw new Error("Sorry, there are no images matching your search query. Please try again.");(n.pageCount-1)*n.perPage>=e.totalHits&&(d=!1),!n.pageCount>1&&A(`Hooray! We found ${e.totalHits} totalHits images.`);let t=e.hits.map(D).join("");v.insertAdjacentHTML("beforeend",t),new R(".gallery a"),x()}).catch(e=>{C(),U(e)})}function D(e){return`<div class="photo-card">
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
            </div>`}function C(){n.resetPageCount(),v.innerHTML="",window.removeEventListener("scroll",L)}async function E(e){e.preventDefault(),C(),S=M.value,await P(),window.addEventListener("scroll",L)}b.addEventListener("submit",E);
//# sourceMappingURL=commonHelpers.js.map
