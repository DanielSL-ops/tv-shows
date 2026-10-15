(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=`2993`,t=`https://placehold.co/210x295`,n=async e=>{let n=`https://api.tvmaze.com/shows/${e}`,r=await fetch(n).then(e=>e.json());return{name:r.name,rating:r.rating,image:r.image?.medium??t}},r=async e=>{let t=`https://api.tvmaze.com/shows/${e}/episodes`,n=await fetch(t).then(e=>e.json()),r={};return n.forEach(e=>{let t=e.season;r[t]||(r[t]=[]),r[t].push({number:e.number,season:e.season,rating:e.rating?.average})}),r},i=document.querySelector(`header`),a=document.querySelector(`.episodes`),o=e=>{let t=e.rating==null?0:Math.max(0,Math.min(10,Math.round(e.rating)));return`
        <div class="episode episode-${e.number} rating-${t}">
            ${e.number??`-`}
        </div>
    `},s=(e,t)=>`
        <article class="season">

            <header class="season-header">
                T${t}
            </header>

            ${e.map(e=>o(e)).join(``)}

        </article>
    `;(async()=>{try{let t=await n(e),o=await r(e);i.innerHTML=`
            <img class="poster" src="${t.image}" alt="Poster">

            <div>
                <h1>${t.name}</h1>
                <p>Rating: ${t.rating?.average??`Sin valoración`}</p>
            </div>
        `,a.innerHTML=Object.values(o).map((e,t)=>s(e,t+1)).join(``)}catch(e){console.error(`Error al cargar la serie:`,e),i.textContent=`No se pudo cargar la serie.`}})();