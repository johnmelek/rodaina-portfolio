/* ============================================================
   RODAINA — Generative cover-art engine
   Produces deterministic SVG abstract compositions from a seed.
   No external assets, no network. Each (style, seed, palette)
   combo always renders the same image.
   ============================================================ */

(function () {
  // ---- seeded PRNG (mulberry32) ----
  function rng(seed) {
    let a = seed >>> 0;
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  // ---- palettes ----
  const PALETTES = {
    lime:    ["#d6ff3f", "#0a0a0c", "#ff2e93", "#3a5bff", "#f4f3ef"],
    magenta: ["#ff2e93", "#150016", "#d6ff3f", "#ff7ac0", "#f4f3ef"],
    blue:    ["#3a5bff", "#060b2e", "#d6ff3f", "#7aa0ff", "#f4f3ef"],
    sunset:  ["#ff7a3d", "#ff2e93", "#ffd23f", "#7a2eff", "#1a0a12"],
    mono:    ["#f4f3ef", "#0a0a0c", "#5b5a56", "#a7a6a1", "#d6ff3f"],
    candy:   ["#ff2e93", "#3a5bff", "#d6ff3f", "#ff7a3d", "#f4f3ef"]
  };

  function pick(palette) { return PALETTES[palette] || PALETTES.lime; }

  function rnd(r, min, max) { return min + r() * (max - min); }
  function ri(r, min, max) { return Math.floor(rnd(r, min, max + 1)); }

  // ---- individual styles ----
  function waves(r, colors, W, H) {
    let s = `<rect width="${W}" height="${H}" fill="${colors[1]}"/>`;
    const n = ri(r, 5, 9);
    for (let i = 0; i < n; i++) {
      const y = (H / n) * i + rnd(r, -10, 10);
      const amp = rnd(r, 12, 40);
      const c = colors[i % colors.length];
      let d = `M0 ${y}`;
      for (let x = 0; x <= W; x += 20) {
        d += ` Q ${x + 10} ${y + (r() - .5) * amp * 2} ${x + 20} ${y + (r() - .5) * amp}`;
      }
      d += ` L${W} ${H} L0 ${H} Z`;
      s += `<path d="${d}" fill="${c}" opacity="${rnd(r,.55,.92).toFixed(2)}"/>`;
    }
    return s;
  }

  function orbs(r, colors, W, H) {
    let s = `<rect width="${W}" height="${H}" fill="${colors[1]}"/>`;
    const n = ri(r, 6, 12);
    const defs = `<defs>${colors.map((c, i) =>
      `<radialGradient id="g${i}" cx="35%" cy="35%"><stop offset="0%" stop-color="${c}"/><stop offset="100%" stop-color="${c}" stop-opacity="0"/></radialGradient>`
    ).join("")}</defs>`;
    s += defs;
    for (let i = 0; i < n; i++) {
      const cx = rnd(r, 0, W), cy = rnd(r, 0, H), rad = rnd(r, 40, 160);
      s += `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${rad.toFixed(1)}" fill="url(#g${i % colors.length})"/>`;
    }
    return s;
  }

  function grid(r, colors, W, H) {
    let s = `<rect width="${W}" height="${H}" fill="${colors[1]}"/>`;
    const cols = ri(r, 5, 9), rows = ri(r, 4, 7);
    const cw = W / cols, ch = H / rows;
    for (let x = 0; x < cols; x++) for (let y = 0; y < rows; y++) {
      if (r() > .42) {
        const c = colors[ri(r, 0, colors.length - 1)];
        const pad = rnd(r, 3, 10);
        s += `<rect x="${(x * cw + pad).toFixed(1)}" y="${(y * ch + pad).toFixed(1)}" width="${(cw - pad * 2).toFixed(1)}" height="${(ch - pad * 2).toFixed(1)}" fill="${c}" opacity="${rnd(r, .35, 1).toFixed(2)}" rx="${rnd(r, 0, 8).toFixed(1)}"/>`;
      }
    }
    return s;
  }

  function blob(r, colors, W, H) {
    let s = `<rect width="${W}" height="${H}" fill="${colors[1]}"/>`;
    const n = ri(r, 3, 6);
    for (let i = 0; i < n; i++) {
      const cx = rnd(r, 0, W), cy = rnd(r, 0, H), rad = rnd(r, 80, 200);
      let d = "";
      const pts = ri(r, 8, 14);
      for (let p = 0; p <= pts; p++) {
        const ang = (p / pts) * Math.PI * 2;
        const rr = rad * rnd(r, .55, 1);
        const x = cx + Math.cos(ang) * rr, y = cy + Math.sin(ang) * rr;
        d += (p === 0 ? "M" : "L") + x.toFixed(1) + " " + y.toFixed(1) + " ";
      }
      d += "Z";
      s += `<path d="${d}" fill="${colors[i % colors.length]}" opacity="${rnd(r, .5, .9).toFixed(2)}" style="mix-blend-mode:screen"/>`;
    }
    return s;
  }

  function shards(r, colors, W, H) {
    let s = `<rect width="${W}" height="${H}" fill="${colors[1]}"/>`;
    const n = ri(r, 7, 14);
    for (let i = 0; i < n; i++) {
      const x = rnd(r, 0, W), y = rnd(r, 0, H);
      const w = rnd(r, 30, 140), h = rnd(r, 30, 140);
      const rot = rnd(r, 0, 90);
      s += `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${w.toFixed(1)}" height="${(h * .18).toFixed(1)}" fill="${colors[i % colors.length]}" opacity="${rnd(r, .4, 1).toFixed(2)}" transform="rotate(${rot.toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)})"/>`;
    }
    return s;
  }

  function type_(r, colors, W, H) {
    let s = `<rect width="${W}" height="${H}" fill="${colors[1]}"/>`;
    const word = "Aa";
    const n = ri(r, 3, 6);
    for (let i = 0; i < n; i++) {
      const sz = rnd(r, 60, 260);
      const c = colors[ri(r, 0, colors.length - 1)];
      const x = rnd(r, -20, W), y = rnd(r, 40, H + 40);
      s += `<text x="${x.toFixed(1)}" y="${y.toFixed(1)}" font-family="Anton, sans-serif" font-size="${sz.toFixed(0)}" fill="${c}" opacity="${rnd(r, .4, 1).toFixed(2)}" style="mix-blend-mode:screen">${word}</text>`;
    }
    return s;
  }

  const RENDER = { waves, orbs, grid, blob, shards, type: type_ };

  function makeArt(style, seed, palette, W, H) {
    W = W || 400; H = H || 300;
    const r = rng((seed || 1) * 2654435761 % 2147483647);
    const colors = pick(palette);
    const fn = RENDER[style] || RENDER.blob;
    const body = fn(r, colors, W, H);
    return `<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" role="img">${body}</svg>`;
  }

  window.makeArt = makeArt;
})();
