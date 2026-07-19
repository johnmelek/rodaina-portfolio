/* ============================================================
   RODAINA — PROJECTS DATA
   ------------------------------------------------------------
   HOW TO ADD A PROJECT (no coding experience needed):
   1. Copy one of the blocks below (between { and }).
   2. Paste it at the END of the list, before the closing ].
   3. Change the text:
        id      -> unique short name, no spaces (e.g. "aurora")
        title   -> project name
        category-> one of: Branding | Editorial | Illustration |
                   Motion | Packaging | Art Direction
        year    -> year
        client  -> client name (or "Personal")
        role    -> what Rodaina did
        desc    -> one or two sentences
        size    -> "lg" (big), "sm" (small), or omit (normal)
        art     -> style of generated cover: see STYLES below
        seed    -> any number — changes the generated pattern
        palette -> one of: lime | magenta | blue | sunset | mono | candy
        url     -> link to live project (or "#")
        gallery -> list of {art,seed,palette} for extra images
   4. Save the file. The site updates itself. Done.
   ============================================================ */

const STYLES = ["waves", "orbs", "grid", "type", "blob", "shards"];

const projects = [
  {
    id: "neonharvest",
    title: "Neon Harvest",
    category: "Branding",
    year: "2026",
    client: "Harvest Co.",
    role: "Identity · Packaging",
    desc: "A punchy produce brand built on a loud lime-and-ink system, custom display lettering and a flexible mark that scales from crate to billboard.",
    size: "lg",
    art: "waves", seed: 12, palette: "lime",
    url: "#",
    gallery: [
      { art: "type", seed: 31, palette: "lime" },
      { art: "shards", seed: 7, palette: "mono" }
    ]
  },
  {
    id: "pulsefm",
    title: "Pulse FM",
    category: "Art Direction",
    year: "2026",
    client: "Pulse Radio",
    role: "Art Direction · Motion",
    desc: "Visual language for a night-time station: kinetic type, saturated gradients and a logo that breathes with the music.",
    size: "sm",
    art: "orbs", seed: 44, palette: "magenta",
    url: "#",
    gallery: [ { art: "blob", seed: 9, palette: "magenta" } ]
  },
  {
    id: "paperriot",
    title: "Paper Riot",
    category: "Editorial",
    year: "2025",
    client: "Riot Quarterly",
    role: "Editorial Design",
    desc: "An independent magazine where every spread breaks the grid on purpose — expressive typography meets raw photographic tension.",
    size: "sm",
    art: "grid", seed: 3, palette: "blue",
    url: "#",
    gallery: [ { art: "type", seed: 21, palette: "blue" } ]
  },
  {
    id: "solarbloom",
    title: "Solar Bloom",
    category: "Illustration",
    year: "2025",
    client: "Personal",
    role: "Illustration",
    desc: "A series of generative botanical illustrations exploring warm light and organic geometry.",
    size: "lg",
    art: "blob", seed: 88, palette: "sunset",
    url: "#",
    gallery: [
      { art: "orbs", seed: 14, palette: "sunset" },
      { art: "waves", seed: 19, palette: "candy" }
    ]
  },
  {
    id: "momentum",
    title: "Momentum",
    category: "Motion",
    year: "2026",
    client: "Kinetic Labs",
    role: "Motion Design",
    desc: "Title sequence and UI motion system for a fitness platform — energy you can feel in the easing.",
    size: "sm",
    art: "shards", seed: 56, palette: "lime",
    url: "#",
    gallery: [ { art: "orbs", seed: 5, palette: "lime" } ]
  },
  {
    id: "cassette",
    title: "Cassette Culture",
    category: "Packaging",
    year: "2025",
    client: "Loop Records",
    role: "Packaging · Illustration",
    desc: "Vinyl and cassette packaging for an indie label — tactile, collectible, unapologetically colorful.",
    size: "sm",
    art: "type", seed: 70, palette: "candy",
    url: "#",
    gallery: [ { art: "blob", seed: 2, palette: "magenta" } ]
  }
];

/* expose for other scripts */
window.PROJECTS = projects;
window.ART_STYLES = STYLES;
