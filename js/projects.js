/* ============================================================
   RODAINA — PROJECTS DATA (shared across all pages)
   ------------------------------------------------------------
   HOW TO ADD A PROJECT (no coding needed):
   1. Copy any block between { ... } below.
   2. Paste it at the END of the list, before the closing ].
   3. Edit the fields (see README for the full table).
   4. Save + git push → the site (home, Library, detail page)
      updates itself. No build step.

   FIELDS:
     id        unique short name, no spaces  -> "aurora"
     title     project name
     category  Branding | Editorial | Illustration | Motion | Packaging | Art Direction
     year      "2026"
     client    client name or "Personal"
     role      what Rodaina did
     featured  true => shows on the home page (keep ~4)
     summary   one-line hook (Library + detail header)
     desc      longer paragraph for the detail page
     services  [array] of disciplines shown as chips
     size      "lg" | "sm" | omit  (card span on grids)
     art/seed/palette  -> generated cover style
        art:     waves | orbs | grid | type | blob | shards
        palette: lime | magenta | blue | sunset | mono | candy
        seed:    any number (changes the pattern)
     url       live link or "#"
     gallery   [ {art,seed,palette} ... ]  extra visuals
   ============================================================ */

const projects = [
  {
    id: "neonharvest",
    title: "Neon Harvest",
    category: "Branding",
    year: "2026",
    client: "Harvest Co.",
    role: "Identity · Packaging",
    featured: true,
    summary: "A loud produce brand with a flexible mark that scales from crate to billboard.",
    desc: "Neon Harvest needed an identity that felt as fresh as the produce it ships. We built a punchy lime-and-ink system, custom display lettering, and a flexible mark that scales from a crate label to a roadside billboard without losing its bite. The result is a brand that reads instantly on a crowded shelf.",
    services: ["Brand Strategy", "Logo Design", "Packaging", "Type Design"],
    size: "lg",
    art: "waves", seed: 12, palette: "lime",
    url: "#",
    gallery: [
      { art: "type", seed: 31, palette: "lime" },
      { art: "shards", seed: 7, palette: "mono" },
      { art: "orbs", seed: 22, palette: "lime" },
      { art: "grid", seed: 5, palette: "lime" }
    ]
  },
  {
    id: "pulsefm",
    title: "Pulse FM",
    category: "Art Direction",
    year: "2026",
    client: "Pulse Radio",
    role: "Art Direction · Motion",
    featured: true,
    summary: "A night-time station identity that breathes with the music.",
    desc: "Pulse FM is a night-time radio station. The visual language is kinetic — type that moves, gradients that pulse, and a logo that breathes in time with the music. We delivered a full art-direction system plus a set of motion templates the in-house team can extend.",
    services: ["Art Direction", "Motion", "Brand System"],
    size: "sm",
    art: "orbs", seed: 44, palette: "magenta",
    url: "#",
    gallery: [
      { art: "blob", seed: 9, palette: "magenta" },
      { art: "waves", seed: 33, palette: "magenta" },
      { art: "type", seed: 14, palette: "magenta" }
    ]
  },
  {
    id: "paperriot",
    title: "Paper Riot",
    category: "Editorial",
    year: "2025",
    client: "Riot Quarterly",
    role: "Editorial Design",
    featured: true,
    summary: "An independent magazine where every spread breaks the grid on purpose.",
    desc: "Riot Quarterly is an independent print magazine. Every spread breaks the grid on purpose — expressive typography meets raw photographic tension. We art-directed three issues, building a flexible layout kit that stays coherent while feeling different every time.",
    services: ["Editorial Design", "Art Direction", "Typesetting"],
    size: "sm",
    art: "grid", seed: 3, palette: "blue",
    url: "#",
    gallery: [
      { art: "type", seed: 21, palette: "blue" },
      { art: "shards", seed: 18, palette: "blue" },
      { art: "grid", seed: 11, palette: "mono" }
    ]
  },
  {
    id: "solarbloom",
    title: "Solar Bloom",
    category: "Illustration",
    year: "2025",
    client: "Personal",
    role: "Illustration",
    featured: true,
    summary: "Generative botanical illustrations exploring warm light and organic geometry.",
    desc: "A personal series of generative botanical illustrations. Each piece explores warm light and organic geometry — studies in how a single system can produce endless variations that still feel like one coherent world. Shown in two small exhibitions in 2025.",
    services: ["Illustration", "Generative Art", "Print"],
    size: "lg",
    art: "blob", seed: 88, palette: "sunset",
    url: "#",
    gallery: [
      { art: "orbs", seed: 14, palette: "sunset" },
      { art: "waves", seed: 19, palette: "candy" },
      { art: "blob", seed: 61, palette: "sunset" },
      { art: "type", seed: 40, palette: "sunset" }
    ]
  },
  {
    id: "momentum",
    title: "Momentum",
    category: "Motion",
    year: "2026",
    client: "Kinetic Labs",
    role: "Motion Design",
    featured: false,
    summary: "Title sequence and UI motion system for a fitness platform.",
    desc: "Momentum is the title sequence and UI motion system for a fitness platform. The brief: energy you can feel in the easing. We built a library of motion primitives — entrances, transitions, reactions — that the product team drops into Framer and ships.",
    services: ["Motion Design", "UI Animation", "Title Sequence"],
    size: "sm",
    art: "shards", seed: 56, palette: "lime",
    url: "#",
    gallery: [
      { art: "orbs", seed: 5, palette: "lime" },
      { art: "shards", seed: 70, palette: "lime" }
    ]
  },
  {
    id: "cassette",
    title: "Cassette Culture",
    category: "Packaging",
    year: "2025",
    client: "Loop Records",
    role: "Packaging · Illustration",
    featured: false,
    summary: "Vinyl and cassette packaging for an indie label — tactile and collectible.",
    desc: "Cassette Culture is the vinyl and cassette packaging for Loop Records, an indie label. Tactile, collectible, unapologetically colorful — every release gets its own cover illustration while staying inside one recognisable world.",
    services: ["Packaging", "Illustration", "Print Production"],
    size: "sm",
    art: "type", seed: 70, palette: "candy",
    url: "#",
    gallery: [
      { art: "blob", seed: 2, palette: "magenta" },
      { art: "grid", seed: 28, palette: "candy" },
      { art: "waves", seed: 47, palette: "candy" }
    ]
  },
  {
    id: "vertex",
    title: "Vertex",
    category: "Art Direction",
    year: "2024",
    client: "Vertex Studio",
    role: "Art Direction",
    featured: false,
    summary: "A spatial identity for an architecture practice — precise, quiet, confident.",
    desc: "Vertex is a spatial identity for an architecture practice. Precise, quiet, confident — a monochrome system built on a strict baseline grid and one restrained accent. The mark is a single rotated square that becomes a wayfinding device across print and signage.",
    services: ["Art Direction", "Identity", "Signage"],
    size: "sm",
    art: "grid", seed: 91, palette: "mono",
    url: "#",
    gallery: [
      { art: "shards", seed: 12, palette: "mono" },
      { art: "type", seed: 8, palette: "mono" }
    ]
  },
  {
    id: "lumen",
    title: "Lumen",
    category: "Illustration",
    year: "2024",
    client: "Lumen Press",
    role: "Illustration · Editorial",
    featured: false,
    summary: "A long-form illustrated essay series on light and cities.",
    desc: "Lumen is a long-form illustrated essay series on light and cities, made for Lumen Press. Each chapter pairs a written meditation with a full-bleed illustration built from the same generative vocabulary, so the whole series feels like one continuous night walk.",
    services: ["Illustration", "Editorial", "Generative Art"],
    size: "sm",
    art: "orbs", seed: 63, palette: "blue",
    url: "#",
    gallery: [
      { art: "waves", seed: 51, palette: "blue" },
      { art: "blob", seed: 37, palette: "blue" },
      { art: "orbs", seed: 82, palette: "blue" }
    ]
  }

  /* ============================================================
     FAKE / SAMPLE PROJECTS (filler) — delete these when real
     work arrives. Same schema as above; generated for volume so
     the home reel + Library feel full. Rodaina can remove any
     block freely.
     ============================================================ */
  ,
  {
    id: "aurora-type",
    title: "Aurora Type",
    category: "Branding",
    year: "2026",
    client: "Aurora Labs",
    role: "Identity · Type",
    featured: false,
    summary: "A variable display family for a northern-lights tech startup.",
    desc: "Aurora Labs needed a typeface that felt electric and calm at once. We drew a variable display family with a glowing weight axis, shipped as a full brand kit with motion-ready lettering.",
    services: ["Type Design", "Branding", "Motion"],
    size: "sm",
    art: "type", seed: 104, palette: "lime",
    url: "#",
    gallery: [ { art: "type", seed: 104, palette: "lime" }, { art: "waves", seed: 9, palette: "lime" } ]
  },
  {
    id: "tidal",
    title: "Tidal",
    category: "Editorial",
    year: "2025",
    client: "Tidal Magazine",
    role: "Editorial Design",
    featured: false,
    summary: "An ocean-lit quarterly built on fluid, wave-driven grids.",
    desc: "Tidal is an ocean-lit quarterly. The grid breathes like water — columns drift, images bleed, and every issue feels like a different tide while staying one system.",
    services: ["Editorial Design", "Art Direction"],
    size: "sm",
    art: "waves", seed: 27, palette: "blue",
    url: "#",
    gallery: [ { art: "waves", seed: 27, palette: "blue" }, { art: "orbs", seed: 13, palette: "blue" } ]
  },
  {
    id: "concrete-pop",
    title: "Concrete Pop",
    category: "Illustration",
    year: "2026",
    client: "Pop Civic",
    role: "Illustration",
    featured: false,
    summary: "Bright civic illustrations that make bureaucracy feel human.",
    desc: "Concrete Pop is a series of civic illustrations for public spaces — bold, friendly, unapologetically colorful. Murals, posters and wayfinding that turn grey corners into landmarks.",
    services: ["Illustration", "Public Art"],
    size: "sm",
    art: "blob", seed: 58, palette: "candy",
    url: "#",
    gallery: [ { art: "blob", seed: 58, palette: "candy" }, { art: "shards", seed: 33, palette: "magenta" } ]
  },
  {
    id: "neon-nights",
    title: "Neon Nights",
    category: "Motion",
    year: "2024",
    client: "Night Market",
    role: "Motion Design",
    featured: false,
    summary: "A looping title system for a city-after-dark festival.",
    desc: "Neon Nights is the looping motion language for a night festival — titles that flicker on like signs, gradients that hum, a kit the producers re-cut every week.",
    services: ["Motion", "Title Sequence"],
    size: "sm",
    art: "shards", seed: 71, palette: "magenta",
    url: "#",
    gallery: [ { art: "shards", seed: 71, palette: "magenta" }, { art: "orbs", seed: 22, palette: "magenta" } ]
  },
  {
    id: "form-function",
    title: "Form & Function",
    category: "Packaging",
    year: "2025",
    client: "Studio Mono",
    role: "Packaging",
    featured: false,
    summary: "Quietly confident packaging for a design-led object brand.",
    desc: "Form & Function is packaging for a design-led object brand. Monochrome, precise, tactile — one rotated square does the work of a whole identity across box, wrap and insert.",
    services: ["Packaging", "Print"],
    size: "sm",
    art: "grid", seed: 64, palette: "mono",
    url: "#",
    gallery: [ { art: "grid", seed: 64, palette: "mono" }, { art: "type", seed: 8, palette: "mono" } ]
  },
  {
    id: "echo-chamber",
    title: "Echo Chamber",
    category: "Art Direction",
    year: "2026",
    client: "Echo Audio",
    role: "Art Direction",
    featured: false,
    summary: "A sound-driven identity that visualises resonance.",
    desc: "Echo Chamber is an art-direction system for an audio brand. Every visual is a resonance — concentric rings, soft distortion, a palette that shifts with the mix.",
    services: ["Art Direction", "Generative Art"],
    size: "sm",
    art: "orbs", seed: 39, palette: "sunset",
    url: "#",
    gallery: [ { art: "orbs", seed: 39, palette: "sunset" }, { art: "waves", seed: 19, palette: "candy" } ]
  },
  {
    id: "prism",
    title: "Prism",
    category: "Branding",
    year: "2024",
    client: "Prism Health",
    role: "Identity",
    featured: false,
    summary: "A calm, spectrum-based identity for a wellness clinic.",
    desc: "Prism is a spectrum-based identity for a wellness clinic. Soft gradients, generous space, one disciplined accent — warmth without noise.",
    services: ["Branding", "Signage"],
    size: "sm",
    art: "orbs", seed: 17, palette: "lime",
    url: "#",
    gallery: [ { art: "orbs", seed: 17, palette: "lime" }, { art: "blob", seed: 61, palette: "sunset" } ]
  },
  {
    id: "wildcard",
    title: "Wildcard",
    category: "Illustration",
    year: "2025",
    client: "Wildcard Games",
    role: "Illustration · Brand",
    featured: false,
    summary: "A playful character world for an indie game launch.",
    desc: "Wildcard is a character world for an indie game launch — mascots, key art and a sticker kit that travels from store page to streetwear.",
    services: ["Illustration", "Branding"],
    size: "sm",
    art: "blob", seed: 95, palette: "candy",
    url: "#",
    gallery: [ { art: "blob", seed: 95, palette: "candy" }, { art: "shards", seed: 18, palette: "blue" } ]
  },
  {
    id: "signal",
    title: "Signal",
    category: "Motion",
    year: "2026",
    client: "Signal News",
    role: "Motion · Broadcast",
    featured: false,
    summary: "A broadcast motion kit for a breaking-news brand.",
    desc: "Signal is a broadcast motion kit for a news brand — lower-thirds, bumpers and a ticker system built to be cut live, fast, and still look designed.",
    services: ["Motion", "Broadcast"],
    size: "sm",
    art: "shards", seed: 42, palette: "lime",
    url: "#",
    gallery: [ { art: "shards", seed: 42, palette: "lime" }, { art: "grid", seed: 5, palette: "lime" } ]
  },
  {
    id: "paper-trails",
    title: "Paper Trails",
    category: "Editorial",
    year: "2024",
    client: "Trails Journal",
    role: "Editorial Design",
    featured: false,
    summary: "A long-form journal where typography does the storytelling.",
    desc: "Paper Trails is a long-form journal. Typography carries the story — a strict measure, expressive drop caps, and a monochrome system that lets the words breathe.",
    services: ["Editorial Design", "Typesetting"],
    size: "sm",
    art: "type", seed: 77, palette: "mono",
    url: "#",
    gallery: [ { art: "type", seed: 77, palette: "mono" }, { art: "grid", seed: 11, palette: "mono" } ]
  }
];

window.PROJECTS = projects;
