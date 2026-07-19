# Rodaina — Portfolio (multi-page, free)

A bold, experimental graphic-designer portfolio. Static site, zero runtime cost,
deployed free on GitHub Pages. GSAP / ScrollTrigger / Lenis are vendored (no CDN dependency).

## Pages
- `index.html` — Home (hero, featured work, services, about teaser, contact CTA)
- `work.html` — **The Library**: full archive, category filters, grid/list toggle, sort
- `about.html` — About + stats
- `contact.html` — Contact + form (front-end only)
- `project.html?id=ID` — per-project case-study page (auto-rendered from data)

## Add a project (no coding needed)
Open `js/projects.js`. Copy any block between `{ ... }`, paste it at the END of the list
(before the closing `]`), edit the fields:

| Field | Meaning |
|-------|---------|
| `id` | unique short name, no spaces — e.g. `"aurora"` |
| `title` | project name |
| `category` | `Branding` `Editorial` `Illustration` `Motion` `Packaging` `Art Direction` |
| `year` | `"2026"` |
| `client` | client name or `"Personal"` |
| `role` | what Rodaina did |
| `featured` | `true` to show on the home page (keep ~4–6) |
| `summary` | one-line hook |
| `desc` | longer paragraph for the detail page |
| `services` | `[ "Brand Strategy", "Logo Design" ]` |
| `size` | `"lg"` (big card) / `"sm"` (small) / omit |
| `art` | cover style: `waves` `orbs` `grid` `type` `blob` `shards` |
| `seed` | any number — changes the generated pattern |
| `palette` | `lime` `magenta` `blue` `sunset` `mono` `candy` |
| `url` | live link or `"#"` |
| `gallery` | extra visuals: `[ { art, seed, palette }, ... ]` |

Save + `git push` → every page (home, Library, detail) updates automatically.

## Replace generated covers with real images
Put files in `assets/`, then in `projects.js` replace `art/seed/palette` with
`image: "assets/neonharvest.jpg"`. Cards and detail pages will show the image.

## Local preview
```bash
cd rodaina-portfolio
python3 -m http.server 8000
# open http://localhost:8000
```

## Deploy (GitHub Pages, free, auto)
Push to `main` → GitHub Actions builds & deploys. Live at:
`https://johnmelek-bmc.github.io/rodaina-portfolio/`
Optional free custom domain in repo **Settings → Pages**.
