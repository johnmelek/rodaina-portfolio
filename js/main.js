/* ============================================================
   RODAINA — main.js
   Lenis smooth scroll · GSAP reveals · kinetic hero ·
   custom cursor · marquee · filtering · project modal
   ============================================================ */
(function () {
  "use strict";
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $ = (s, c) => (c || document).querySelector(s);
  const $$ = (s, c) => Array.from((c || document).querySelectorAll(s));

  /* ---------- year + clock ---------- */
  const y = new Date().getFullYear();
  ["year1", "year2"].forEach(id => { const el = document.getElementById(id); if (el) el.textContent = y; });
  const clock = $("#clock");
  if (clock) setInterval(() => {
    clock.textContent = new Date().toLocaleTimeString("en-GB");
  }, 1000);

  /* ---------- custom cursor ---------- */
  const cursor = $("#cursor");
  const cursorLabel = $("#cursorLabel");
  if (cursor && !reduce && window.matchMedia("(hover: hover)").matches) {
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

  /* ---------- preloader ---------- */
  const pre = $("#preloader"), preCount = $("#preCount"), preBar = $("#preBar");
  const nameSpans = $$(".preloader__name span");
  function runPreloader(done) {
    if (reduce) { if (pre) pre.style.display = "none"; done(); return; }
    let p = 0;
    const iv = setInterval(() => {
      p += Math.random() * 16 + 6;
      if (p >= 100) p = 100;
      if (preCount) preCount.textContent = Math.floor(p);
      if (preBar) preBar.style.width = p + "%";
      if (p === 100) {
        clearInterval(iv);
        gsap.to(nameSpans, { y: 0, opacity: 1, duration: .6, stagger: .05, ease: "power3.out" });
        gsap.to(pre, {
          yPercent: -100, duration: 1, delay: .5, ease: "power4.inOut",
          onComplete: () => { pre.style.display = "none"; done(); }
        });
      }
    }, 180);
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
    // anchor links
    $$('a[href^="#"]').forEach(a => a.addEventListener("click", e => {
      const id = a.getAttribute("href");
      if (id.length > 1) { e.preventDefault(); const t = $(id); if (t) lenis.scrollTo(t, { offset: 0 }); }
    }));
  }

  /* ---------- hero kinetic name ---------- */
  function animateHero() {
    if (reduce) { $$(".hero__name .ch").forEach(c => { c.style.opacity = 1; c.style.transform = "none"; }); return; }
    gsap.to(".hero__name .ch", {
      y: 0, rotate: 0, opacity: 1, duration: 1.1, stagger: .06, ease: "power4.out", delay: .2
    });
  }

  /* ---------- reveal on scroll ---------- */
  function initReveals() {
    if (reduce || !window.gsap) { $$("[data-reveal]").forEach(e => { e.style.opacity = 1; e.style.transform = "none"; }); return; }
    gsap.registerPlugin(ScrollTrigger);
    $$("[data-reveal]").forEach(el => {
      gsap.to(el, {
        opacity: 1, y: 0, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 88%" }
      });
    });
  }

  /* ---------- blobs ---------- */
  function initBlobs() {
    if (reduce || !window.gsap) return;
    gsap.to(".blob--lime", { x: 60, y: 40, duration: 9, repeat: -1, yoyo: true, ease: "sine.inOut" });
    gsap.to(".blob--magenta", { x: -50, y: -30, duration: 11, repeat: -1, yoyo: true, ease: "sine.inOut" });
    gsap.to(".blob--blue", { x: 70, y: -50, duration: 13, repeat: -1, yoyo: true, ease: "sine.inOut" });
  }

  /* ---------- marquee ---------- */
  function initMarquee() {
    const track = $("#marqueeTrack");
    if (!track || reduce || !window.gsap) return;
    // duplicate content for seamless loop
    track.innerHTML += track.innerHTML;
    const half = track.scrollWidth / 2;
    gsap.to(track, {
      x: -half, duration: 22, ease: "none", repeat: -1,
      modifiers: { x: gsap.utils.unitize(x => parseFloat(x) % half) }
    });
  }

  /* ---------- build work grid ---------- */
  function buildFilters(list) {
    const cats = ["All", ...Array.from(new Set(list.map(p => p.category)))];
    const wrap = $("#filters");
    wrap.innerHTML = cats.map((c, i) =>
      `<button class="filter ${i === 0 ? "is-active" : ""}" data-cat="${c}">${c}</button>`
    ).join("");
    $$(".filter", wrap).forEach(btn => btn.addEventListener("click", () => {
      $$(".filter", wrap).forEach(b => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      renderGrid(btn.dataset.cat);
    }));
  }

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
            <span class="card__view">View project</span>
          </div>
        </div>
      </article>`;
  }

  function renderGrid(cat) {
    const grid = $("#grid");
    const list = window.PROJECTS || [];
    const filtered = cat && cat !== "All" ? list.filter(p => p.category === cat) : list;
    $("#workCount").textContent = `${filtered.length} ${filtered.length === 1 ? "project" : "projects"} · updated regularly`;
    if (!filtered.length) {
      grid.innerHTML = `<div class="empty">No projects in this category yet — <strong>new work drops weekly.</strong></div>`;
      return;
    }
    grid.innerHTML = filtered.map((p, i) => cardHTML(p, i)).join("");
    // animate cards in
    if (!reduce && window.gsap) {
      gsap.to($$(".card", grid), {
        opacity: 1, y: 0, duration: .9, stagger: .07, ease: "power3.out",
        scrollTrigger: { trigger: grid, start: "top 85%" }
      });
    } else {
      $$(".card", grid).forEach(c => { c.style.opacity = 1; c.style.transform = "none"; });
    }
    // open modal on click
    $$(".card", grid).forEach(c => c.addEventListener("click", () => openModal(c.dataset.id)));
  }

  /* ---------- modal ---------- */
  const modal = $("#modal");
  function openModal(id) {
    const p = (window.PROJECTS || []).find(x => x.id === id);
    if (!p) return;
    $("#modalMedia").innerHTML = window.makeArt(p.art, p.seed, p.palette, 800, 800);
    $("#modalCat").textContent = `${p.category} · ${p.year}`;
    $("#modalTitle").textContent = p.title;
    $("#modalMeta").innerHTML = [p.client, p.role].filter(Boolean).map(m => `<span>${m}</span>`).join("");
    $("#modalDesc").textContent = p.desc;
    const gal = (p.gallery || []).map(g => window.makeArt(g.art, g.seed, g.palette, 400, 400)).join("");
    $("#modalGallery").innerHTML = gal;
    const cta = $("#modalCta");
    cta.href = p.url && p.url !== "#" ? p.url : "#";
    cta.style.display = p.url && p.url !== "#" ? "inline-block" : "none";
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    if (lenis) lenis.stop();
    if (!reduce && window.gsap) {
      gsap.fromTo(".modal__backdrop", { opacity: 0 }, { opacity: 1, duration: .4 });
      gsap.fromTo(".modal__panel", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: .5, ease: "power3.out" });
    } else { $(".modal__backdrop").style.opacity = 1; $(".modal__panel").style.opacity = 1; }
  }
  function closeModal() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    if (lenis) lenis.start();
  }
  $("#modalClose").addEventListener("click", closeModal);
  $("#modalBackdrop").addEventListener("click", closeModal);
  addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });

  /* ---------- nav background on scroll ---------- */
  function initNav() {
    const nav = $("#nav");
    if (!nav) return;
    const onScroll = () => nav.classList.toggle("nav--solid", window.scrollY > 60);
    onScroll(); addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- boot ---------- */
  function boot() {
    initLenis();
    buildFilters(window.PROJECTS || []);
    renderGrid("All");
    initReveals();
    initBlobs();
    initMarquee();
    initNav();
    animateHero();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => runPreloader(boot));
  } else {
    runPreloader(boot);
  }
})();
