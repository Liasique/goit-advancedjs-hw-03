import{a as s}from"./assets/vendor-b325e1ef.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&i(c)}).observe(document,{childList:!0,subtree:!0});function n(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerpolicy&&(r.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?r.credentials="include":t.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(t){if(t.ep)return;t.ep=!0;const r=n(t);fetch(t.href,r)}})();s.defaults.headers.common["x-api-key"]="live_Px7dvVo2xBtlGgvAfuYlwNWpTa0l5UHIWvbfgFeFbc9DLduE10gl8sCkxxlY3C0l";const f=()=>s.get("https://api.thecatapi.com/v1/breeds").then(o=>o.data).catch(o=>{throw o}),p=o=>s.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${o}`).then(e=>e.data[0]).catch(e=>{throw e}),d=document.querySelector(".breed-select"),l=document.querySelector(".loader"),m=document.querySelector(".cat-info"),a=()=>{l.style.display="block"},u=()=>{l.style.display="none"},h=()=>{a(),f().then(o=>{u(),o.forEach(e=>{const n=document.createElement("option");n.value=e.id,n.textContent=e.name,d.appendChild(n)})}).catch(o=>{console.error("Error fetching breeds:",o)})},g=o=>{a(),p(o).then(e=>{u(),m.innerHTML=`
        <img src="${e.url}" alt="${e.breeds[0].name}">
        <div>
          <h1> <strong>${e.breeds[0].name}</strong></h1>
          <p>${e.breeds[0].description}</p>
          <p><strong>Temperament:
          </strong>${e.breeds[0].temperament}</p>
        </div>
      `}).catch(e=>{console.error("Error fetching cat information:",e)})};d.addEventListener("change",o=>{const e=o.target.value;g(e)});h();
//# sourceMappingURL=commonHelpers.js.map
