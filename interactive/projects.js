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
];

window.PROJECTS = projects;
