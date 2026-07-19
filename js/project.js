/* ============================================================
   RODAINA — project.js  (project.html detail page)
   Reads ?id=, renders the full case-study layout.
   ============================================================ */
(function () {
  "use strict";
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $ = (s) => document.querySelector(s);
  const make = window.makeArt;

  function getParam(name) {
    return new URLSearchParams(location.search).get(name);
  }

  function render() {
    const id = getParam("id");
    const list = window.PROJECTS || [];
    const p = list.find(x => x.id === id) || list[0];
    if (!p) { location.href = "work.html"; return; }

    // hero
    $("#pCover").innerHTML = make(p.art, p.seed, p.palette, 900, 700);
    $("#pCat").textContent = `${p.category} · ${p.year}`;
    $("#pTitle").textContent = p.title;
    $("#pSummary").textContent = p.summary || "";
    $("#pMeta").innerHTML = [p.client, p.role, p.year].filter(Boolean).map(m => `<span>${m}</span>`).join("");
    $("#pDesc").textContent = p.desc || p.summary || "";
    $("#pServices").innerHTML = (p.services || []).map(s => `<li>${s}</li>`).join("");
    const cta = $("#pCta");
    if (p.url && p.url !== "#") { cta.href = p.url; cta.style.display = "inline-block"; }
    else cta.style.display = "none";

    // gallery — alternate wide/normal
    const gal = $("#pGallery");
    const items = p.gallery || [];
    gal.innerHTML = items.map((g, i) =>
      `<div class="gitem ${i % 3 === 0 && i > 0 ? "gitem--wide" : ""}">${make(g.art, g.seed, g.palette, 600, 600)}</div>`
    ).join("");

    // prev/next
    const idx = list.findIndex(x => x.id === p.id);
    const prev = list[(idx - 1 + list.length) % list.length];
    const next = list[(idx + 1) % list.length];
    $("#pPrev").href = `project.html?id=${prev.id}`;
    $("#pPrevLabel").textContent = "Previous";
    $("#pPrevTitle").textContent = prev.title;
    $("#pNext").href = `project.html?id=${next.id}`;
    $("#pNextLabel").textContent = "Next";
    $("#pNextTitle").textContent = next.title;

    document.title = `${p.title} — Rodaina`;

    // reveal
    if (!reduce && window.gsap) {
      gsap.registerPlugin(ScrollTrigger);
      $$("[data-reveal]").forEach(el => gsap.to(el, { opacity: 1, y: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 90%" } }));
    } else {
      $$("[data-reveal]").forEach(el => { el.style.opacity = 1; el.style.transform = "none"; });
    }
  }

  const $$ = (s) => document.querySelectorAll(s);
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", render);
  else render();
})();
