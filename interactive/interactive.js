/* ============================================================
   RODAINA — INTERACTIVE EXPERIMENT (v2)  —  engine
   Cursor-reactive everything + a folder that opens.
   Guarded by prefers-reduced-motion: reduce (then native cursor
   is restored and motion is skipped).
   ============================================================ */
(function () {
  "use strict";
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const supportsHover = window.matchMedia("(hover: hover)").matches;

  /* ---------------- custom cursor + glow ---------------- */
  const cur = document.getElementById("cur");
  const curRing = document.getElementById("curRing");
  const curLabel = document.getElementById("curLabel");
  const glow = document.getElementById("glow");

  const pointer = { x: innerWidth / 2, y: innerHeight / 2 };
  const ring = { x: pointer.x, y: pointer.y };
  const dot = { x: pointer.x, y: pointer.y };

  if (!reduce && supportsHover && cur) {
    document.addEventListener("mousemove", (e) => {
      pointer.x = e.clientX; pointer.y = e.clientY;
      dot.x = e.clientX; dot.y = e.clientY;
      if (glow) {
        glow.style.opacity = "1";
        glow.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    }, { passive: true });

    document.addEventListener("mousedown", () => cur.classList.add("is-down"));
    document.addEventListener("mouseup", () => cur.classList.remove("is-down"));

    // hover targets get a label + enlarge ring
    const labels = {
      open: "Open", view: "View", mail: "Mail", close: "Close",
      back: "Back", link: "Go"
    };
    document.querySelectorAll("[data-cursor]").forEach((el) => {
      el.addEventListener("mouseenter", () => {
        cur.classList.add("is-hover");
        curLabel.textContent = labels[el.dataset.cursor] || "";
      });
      el.addEventListener("mouseleave", () => {
        cur.classList.remove("is-hover");
        curLabel.textContent = "";
      });
    });

    // animation loop (lerp follow)
    function loop() {
      ring.x += (pointer.x - ring.x) * 0.18;
      ring.y += (pointer.y - ring.y) * 0.18;
      dot.x += (pointer.x - dot.x) * 0.35;
      dot.y += (pointer.y - dot.y) * 0.35;
      if (cur) cur.style.transform = `translate(${dot.x}px, ${dot.y}px)`;
      if (curRing) curRing.style.transform = `translate(${ring.x - dot.x}px, ${ring.y - dot.y}px)`;
      requestAnimationFrame(loop);
    }
    loop();
  } else if (cur) {
    cur.style.display = "none";
  }

  /* ---------------- hero 3D tilt ---------------- */
  const stage = document.getElementById("heroStage");
  if (stage && !reduce && supportsHover) {
    const name = stage.querySelector(".hero__name .ln");
    stage.addEventListener("mousemove", (e) => {
      const r = stage.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      stage.style.transform = `rotateY(${px * 12}deg) rotateX(${-py * 12}deg)`;
      if (name) name.style.backgroundPosition = `${50 + px * 40}% 0`;
    });
    stage.addEventListener("mouseleave", () => {
      stage.style.transform = "rotateY(0) rotateX(0)";
      if (name) name.style.backgroundPosition = "0% 0";
    });
  }

  /* ---------------- spotlight text ---------------- */
  if (supportsHover && !reduce) {
    document.querySelectorAll("[data-spotlight]").forEach((el) => {
      el.addEventListener("mousemove", (e) => {
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - r.left}px`);
        el.style.setProperty("--my", `${e.clientY - r.top}px`);
      });
    });
  }

  /* ---------------- magnetic buttons ---------------- */
  if (supportsHover && !reduce) {
    document.querySelectorAll(".btn-magnetic").forEach((btn) => {
      btn.addEventListener("mousemove", (e) => {
        const r = btn.getBoundingClientRect();
        const mx = e.clientX - r.left - r.width / 2;
        const my = e.clientY - r.top - r.height / 2;
        btn.style.transform = `translate(${mx * 0.3}px, ${my * 0.4}px)`;
      });
      btn.addEventListener("mouseleave", () => { btn.style.transform = ""; });
    });
  }

  /* ---------------- build the folder cards ---------------- */
  const wrap = document.getElementById("folderWrap");
  const cardsEl = document.getElementById("folderCards");
  const flap = document.getElementById("folderFlap");
  const projects = (window.PROJECTS || []).slice(0, 8);

  if (cardsEl && window.makeArt) {
    projects.forEach((p, i) => {
      const card = document.createElement("a");
      card.className = "pcard";
      card.href = "#";
      card.dataset.cursor = "view";
      card.dataset.id = p.id;
      card.style.transitionDelay = `${i * 45}ms`;
      const media = document.createElement("div");
      media.className = "pcard__media";
      media.innerHTML = window.makeArt(p.art, p.seed, p.palette, 400, 320);
      const num = document.createElement("span");
      num.className = "pcard__num";
      num.textContent = String(i + 1).padStart(2, "0");
      const meta = document.createElement("div");
      meta.className = "pcard__meta";
      meta.innerHTML = `<div class="pcard__title">${p.title}</div><div class="pcard__cat">${p.category}</div>`;
      card.append(media, num, meta);
      card.addEventListener("click", (e) => { e.preventDefault(); openModal(p); });
      card.addEventListener("mouseenter", () => cur && cur.classList.add("is-hover"));
      card.addEventListener("mouseleave", () => cur && cur.classList.remove("is-hover"));
      cardsEl.appendChild(card);
    });
  }

  /* open the folder on hover (and on click for touch) */
  if (wrap && flap) {
    let opened = false;
    const open = () => { if (!opened) { opened = true; wrap.classList.add("is-open"); flap.setAttribute("aria-expanded", "true"); } };
    const close = () => { opened = false; wrap.classList.remove("is-open"); flap.setAttribute("aria-expanded", "false"); };
    if (supportsHover && !reduce) {
      wrap.addEventListener("mouseenter", open);
      // keep open while interacting; close when pointer leaves the whole section
      document.getElementById("folder").addEventListener("mouseleave", close);
    }
    flap.addEventListener("click", (e) => { e.stopPropagation(); opened ? close() : open(); });
  }

  /* ---------------- project modal ---------------- */
  const modal = document.getElementById("modal");
  const modalMedia = document.getElementById("modalMedia");
  const modalBody = document.getElementById("modalBody");
  const modalClose = document.getElementById("modalClose");
  const modalBackdrop = document.getElementById("modalBackdrop");

  function openModal(p) {
    if (!modal || !window.makeArt) return;
    modalMedia.innerHTML = window.makeArt(p.art, p.seed, p.palette, 900, 600);
    modalBody.innerHTML =
      `<div class="m-cat">${p.category} · ${p.year}</div>` +
      `<h3>${p.title}</h3>` +
      `<p>${p.summary}</p>` +
      `<p>${p.desc}</p>` +
      `<div class="modal__chips">${(p.services || []).map((s) => `<span>${s}</span>`).join("")}</div>` +
      `<p style="color:var(--ink-faint);font-size:13px">Client: ${p.client} · Role: ${p.role}</p>`;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    if (cur) cur.classList.add("is-hover");
  }
  function closeModal() {
    if (!modal) return;
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    if (cur) cur.classList.remove("is-hover");
  }
  if (modalClose) modalClose.addEventListener("click", closeModal);
  if (modalBackdrop) modalBackdrop.addEventListener("click", closeModal);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });
})();
