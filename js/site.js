/* ============================================================
   RODAINA — site.js  (shared: home + library + chrome)
   Preloader · cursor · Lenis · marquee · cards · filters ·
   list/grid toggle · sort · page transitions · reveals
   ============================================================ */
(function () {
  "use strict";
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const hoverOk = window.matchMedia("(hover: hover)").matches;
  const $ = (s, c) => (c || document).querySelector(s);
  const $$ = (s, c) => Array.from((c || document).querySelectorAll(s));

  /* ---------- util: year + clock ---------- */
  const y = new Date().getFullYear();
  ["year1", "year2"].forEach(id => { const el = document.getElementById(id); if (el) el.textContent = y; });
  const clock = $("#clock");
  if (clock) setInterval(() => { clock.textContent = new Date().toLocaleTimeString("en-GB"); }, 1000);

  /* ---------- custom cursor ---------- */
  const cursor = $("#cursor");
  const cursorLabel = $("#cursorLabel");
  if (cursor && !reduce && hoverOk) {
    let cx = innerWidth / 2, cy = innerHeight / 2, tx = cx, ty = cy;
    addEventListener("mousemove", e => { tx = e.clientX; ty = e.clientY; });
    (function loop() {
      cx += (tx - cx) * .18; cy += (ty - cy) * .18;
      cursor.style.transform = `translate(${cx}px, ${cy}px) translate(-50%,-50%)`;
      requestAnimationFrame(loop);
    })();
    const bind = (el) => {
      const label = el.getAttribute("data-cursor") || "";
      el.addEventListener("mouseenter", () => {
        cursor.classList.add(label === "view" ? "is-view" : "is-hover");
        cursorLabel.textContent = label;
      });
      el.addEventListener("mouseleave", () => {
        cursor.classList.remove("is-hover", "is-view");
        cursorLabel.textContent = "";
      });
    };
    $$("a, button, .card, [data-cursor]").forEach(bind);
  }

  /* ---------- Lenis smooth scroll ---------- */
  let lenis = null;
  function initLenis() {
    if (reduce || typeof Lenis === "undefined") return;
    lenis = new Lenis({ duration: 1.1, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
    function raf(t) { lenis.raf(t); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    if (window.gsap && window.ScrollTrigger) {
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add((t) => lenis.raf(t * 1000));
      gsap.ticker.lagSmoothing(0);
    }
  }

  /* ---------- reveal on scroll ---------- */
  function initReveals(scope) {
    const els = $$("[data-reveal]", scope || document);
    if (reduce || !window.gsap) { els.forEach(e => { e.style.opacity = 1; e.style.transform = "none"; }); return; }
    gsap.registerPlugin(ScrollTrigger);
    els.forEach(el => gsap.to(el, { opacity: 1, y: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 90%" } }));
  }

  /* ---------- marquee ---------- */
  function initMarquee() {
    const track = $("#marqueeTrack");
    if (!track || reduce || !window.gsap) return;
    track.innerHTML += track.innerHTML;
    const half = track.scrollWidth / 2;
    gsap.to(track, { x: -half, duration: 22, ease: "none", repeat: -1, modifiers: { x: gsap.utils.unitize(x => parseFloat(x) % half) } });
  }

  /* ---------- nav active state ---------- */
  function initNav() {
    const page = document.body.getAttribute("data-page");
    if (page) $$(".nav__links a").forEach(a => { if (a.getAttribute("data-page") === page) a.classList.add("is-active"); });
    const onScroll = () => $("#nav").classList.toggle("nav--solid", window.scrollY > 60);
    onScroll(); addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- card rendering ---------- */
  function cardHTML(p, i) {
    const sizeCls = p.size === "lg" ? "card--lg" : p.size === "sm" ? "card--sm" : "";
    const art = window.makeArt(p.art, p.seed, p.palette, 800, 600);
    const num = String(i + 1).padStart(2, "0");
    return `
      <article class="card ${sizeCls}" data-id="${p.id}" data-cursor="view">
        <span class="card__num">${num}</span>
        <div class="card__media">${art}
          <div class="card__overlay">
            <span class="card__cat">${p.category} · ${p.year}</span>
            <h3 class="card__title">${p.title}</h3>
            <p class="card__summary">${p.summary || ""}</p>
            <span class="card__view">View project</span>
          </div>
        </div>
      </article>`;
  }

  function renderCards(container, list, opts) {
    opts = opts || {};
    if (!list.length) {
      container.innerHTML = `<div class="empty">Nothing here yet — <strong>new work drops regularly.</strong></div>`;
      return;
    }
    container.innerHTML = list.map((p, i) => cardHTML(p, i)).join("");
    const cards = $$(".card", container);
    if (!reduce && window.gsap && !opts.instant) {
      gsap.to(cards, { opacity: 1, y: 0, duration: .8, stagger: .05, ease: "power3.out",
        scrollTrigger: opts.noScroll ? undefined : { trigger: container, start: "top 88%" } });
    } else {
      cards.forEach(c => { c.style.opacity = 1; c.style.transform = "none"; });
    }
    cards.forEach(c => c.addEventListener("click", () => navigateTo(`project.html?id=${c.dataset.id}`)));
    if (cursor && !reduce && hoverOk) {
      cards.forEach(el => {
        el.addEventListener("mouseenter", () => { cursor.classList.add("is-view"); cursorLabel.textContent = el.getAttribute("data-cursor") || "view"; });
        el.addEventListener("mouseleave", () => { cursor.classList.remove("is-view"); cursorLabel.textContent = ""; });
      });
    }
  }

  /* ---------- HOME: featured ---------- */
  function initFeatured() {
    const grid = $("#featuredGrid");
    if (!grid) return;
    const list = (window.PROJECTS || []).filter(p => p.featured).slice(0, 6);
    renderCards(grid, list);
  }

  /* ---------- LIBRARY: toolbar + filters + sort + toggle ---------- */
  function initLibrary() {
    const grid = $("#libraryGrid");
    if (!grid) return;
    let state = { cat: "All", sort: "recent", view: "grid" };
    const all = window.PROJECTS || [];

    // filters
    const cats = ["All", ...Array.from(new Set(all.map(p => p.category)))];
    const fWrap = $("#libFilters");
    fWrap.innerHTML = cats.map((c, i) => `<button class="filter ${i === 0 ? "is-active" : ""}" data-cat="${c}">${c}</button>`).join("");
    $$(".filter", fWrap).forEach(btn => btn.addEventListener("click", () => {
      $$(".filter", fWrap).forEach(b => b.classList.remove("is-active"));
      btn.classList.add("is-active"); state.cat = btn.dataset.cat; paint();
    }));

    // sort
    const sortEl = $("#libSort");
    if (sortEl) sortEl.addEventListener("change", () => { state.sort = sortEl.value; paint(); });

    // view toggle
    const tGrid = $("#viewGrid"), tList = $("#viewList");
    if (tGrid && tList) {
      tGrid.addEventListener("click", () => { state.view = "grid"; tGrid.classList.add("is-active"); tList.classList.remove("is-active"); paint(); });
      tList.addEventListener("click", () => { state.view = "list"; tList.classList.add("is-active"); tGrid.classList.remove("is-active"); paint(); });
    }

    function paint() {
      let list = state.cat === "All" ? all.slice() : all.filter(p => p.category === state.cat);
      if (state.sort === "recent") list.sort((a, b) => String(b.year).localeCompare(String(a.year)));
      else if (state.sort === "az") list.sort((a, b) => a.title.localeCompare(b.title));
      else if (state.sort === "za") list.sort((a, b) => b.title.localeCompare(a.title));
      grid.classList.toggle("is-list", state.view === "list");
      renderCards(grid, list, { instant: true });
      $("#libCount").textContent = `${list.length} ${list.length === 1 ? "project" : "projects"}`;
    }
    paint();
  }

  /* ---------- page transitions ---------- */
  function navigateTo(url) {
    if (reduce || url.startsWith("mailto:") || url.startsWith("#") || url === "#") { location.href = url; return; }
    const overlay = $("#transition"); const label = $("#transitionLabel");
    if (!overlay || !window.gsap) { location.href = url; return; }
    sessionStorage.setItem("rod_transition", "1");
    if (label) label.textContent = "Rodaina";
    gsap.set(overlay, { transformOrigin: "bottom", scaleY: 0 });
    gsap.to(label, { opacity: 1, duration: .25 });
    gsap.to(overlay, { scaleY: 1, duration: .5, ease: "power3.inOut", onComplete: () => { location.href = url; } });
  }
  function initTransitions() {
    $$('a[href]').forEach(a => {
      const href = a.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("mailto:") || a.target === "_blank" || a.hasAttribute("data-noroute")) return;
      a.addEventListener("click", e => {
        // allow modifier-clicks (new tab) to behave normally
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        e.preventDefault(); navigateTo(href);
      });
    });
    // entrance: if arriving via transition, reveal overlay out
    const overlay = $("#transition");
    if (overlay && sessionStorage.getItem("rod_transition") === "1") {
      sessionStorage.removeItem("rod_transition");
      if (!reduce && window.gsap) {
        gsap.set(overlay, { transformOrigin: "top", scaleY: 1 });
        gsap.set("#transitionLabel", { opacity: 1 });
        gsap.to("#transitionLabel", { opacity: 0, duration: .3 });
        gsap.to(overlay, { scaleY: 0, duration: .6, ease: "power3.inOut", delay: .05 });
      }
    }
  }

  /* ---------- preloader ---------- */
  function runPreloader(done) {
    const pre = $("#preloader"); const preCount = $("#preCount"); const preBar = $("#preBar");
    const nameSpans = $$(".preloader__name span");
    if (reduce || !pre) { if (pre) pre.style.display = "none"; done(); return; }
    if (sessionStorage.getItem("rod_visited")) { pre.style.display = "none"; done(); return; }
    sessionStorage.setItem("rod_visited", "1");
    let p = 0;
    const iv = setInterval(() => {
      p += Math.random() * 16 + 6; if (p >= 100) p = 100;
      if (preCount) preCount.textContent = Math.floor(p);
      if (preBar) preBar.style.width = p + "%";
      if (p === 100) {
        clearInterval(iv);
        gsap.to(nameSpans, { y: 0, opacity: 1, duration: .6, stagger: .05, ease: "power3.out" });
        gsap.to(pre, { yPercent: -100, duration: 1, delay: .5, ease: "power4.inOut", onComplete: () => { pre.style.display = "none"; done(); } });
      }
    }, 180);
  }

  /* ---------- hero kinetic name (home) ---------- */
  function animateHero() {
    if ($("#heroName") && !reduce && window.gsap) {
      gsap.to(".hero__name .ch", { y: 0, rotate: 0, opacity: 1, duration: 1.1, stagger: .06, ease: "power4.out", delay: .2 });
    }
  }
  function initBlobs() {
    if (reduce || !window.gsap) return;
    gsap.to(".blob--lime", { x: 60, y: 40, duration: 9, repeat: -1, yoyo: true, ease: "sine.inOut" });
    gsap.to(".blob--magenta", { x: -50, y: -30, duration: 11, repeat: -1, yoyo: true, ease: "sine.inOut" });
  }

  /* ---------- HERO generative canvas: drifting node-network (signature) ---------- */
  function initHeroCanvas() {
    const cv = $("#heroCanvas");
    if (!cv || reduce) return;
    const ctx = cv.getContext("2d");
    let w, h, dpr, pts = [], raf;
    const COL = ["#d6ff3f", "#ff2e93", "#3a5bff"];
    const mouse = { x: -9999, y: -9999 };
    function resize() {
      dpr = Math.min(devicePixelRatio || 1, 2);
      w = cv.clientWidth; h = cv.clientHeight;
      cv.width = w * dpr; cv.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.max(28, Math.min(70, Math.floor(w * h / 22000)));
      pts = Array.from({ length: count }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35,
        r: Math.random() * 1.8 + .8, c: COL[(Math.random() * COL.length) | 0]
      }));
    }
    function frame() {
      ctx.clearRect(0, 0, w, h);
      for (const p of pts) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        // gentle pull toward cursor
        const dx = mouse.x - p.x, dy = mouse.y - p.y, d2 = dx * dx + dy * dy;
        if (d2 < 26000) { p.x += dx * .0012; p.y += dy * .0012; }
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 7); ctx.fillStyle = p.c; ctx.fill();
      }
      for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) {
        const a = pts[i], b = pts[j], dx = a.x - b.x, dy = a.y - b.y, d = Math.hypot(dx, dy);
        if (d < 130) {
          ctx.globalAlpha = (1 - d / 130) * .5;
          ctx.strokeStyle = a.c; ctx.lineWidth = .6;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        }
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(frame);
    }
    addEventListener("resize", resize);
    addEventListener("mousemove", e => { const r = cv.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; });
    addEventListener("mouseleave", () => { mouse.x = mouse.y = -9999; });
    resize(); frame();
  }

  /* ---------- rotating tagline words ---------- */
  function initRotator() {
    const el = $("#rotator");
    if (!el || reduce || !window.gsap) return;
    const words = ["bold identities", "editorial stories", "motion that moves", "brands with nerve", "visual worlds"];
    let current = el.querySelector("span");
    let i = 0;
    setInterval(() => {
      i = (i + 1) % words.length;
      const prev = current;
      const next = document.createElement("span");
      next.textContent = words[i];
      el.appendChild(next);
      gsap.fromTo(prev, { yPercent: 0 }, { yPercent: -110, duration: .5, ease: "power3.in" });
      gsap.fromTo(next, { yPercent: 110 }, { yPercent: 0, duration: .5, ease: "power3.out", onComplete: () => { prev.remove(); } });
      current = next;
    }, 2600);
  }

  /* ---------- magnetic buttons ---------- */
  function initMagnetic() {
    if (reduce || !hoverOk) return;
    $$(".cta-link, .contact-cta__mail, .card, .filter, .toggle-view button, .contact-page__form button").forEach(el => {
      el.classList.add("magnetic");
      el.addEventListener("mousemove", e => {
        const r = el.getBoundingClientRect();
        const mx = e.clientX - (r.left + r.width / 2), my = e.clientY - (r.top + r.height / 2);
        const pull = el.classList.contains("card") ? .12 : .28;
        el.style.transform = `translate(${mx * pull}px, ${my * pull}px)`;
      });
      el.addEventListener("mouseleave", () => { el.style.transform = ""; });
    });
  }

  /* ---------- nav word scramble on hover ---------- */
  function initScramble() {
    if (reduce) return;
    const el = $(".nav__word");
    if (!el) return;
    const real = el.textContent;
    const chars = "RDANI#%&/0123456789";
    let t;
    el.addEventListener("mouseenter", () => {
      let frame = 0;
      clearInterval(t);
      t = setInterval(() => {
        frame++;
        el.textContent = real.split("").map((c, k) => k < frame / 2 ? c : chars[(Math.random() * chars.length) | 0]).join("");
        if (frame / 2 >= real.length) { clearInterval(t); el.textContent = real; }
      }, 28);
    });
  }

  /* ---------- boot ---------- */
  function boot() {
    initLenis();
    initNav();
    initTransitions();
    initFeatured();
    initLibrary();
    initMarquee();
    initReveals();
    initBlobs();
    initHeroCanvas();
    initRotator();
    initMagnetic();
    initScramble();
    animateHero();
  }

  window.Rodaina = { renderCards, navigateTo, cardHTML };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", () => runPreloader(boot));
  else runPreloader(boot);
})();
