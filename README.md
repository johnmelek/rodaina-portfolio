# Rodaina — Portfolio

A bold, experimental graphic-designer portfolio. Built free, deployed free on GitHub Pages.

- **Zero runtime cost** — static site, no servers, no subscriptions.
- **Zero external dependencies** — GSAP, ScrollTrigger and Lenis are vendored in `vendor/`. Only Google Fonts loads over the network (graceful fallback to system fonts if offline).
- **Grows every day** — add a project by editing one file (`js/projects.js`). No build step.

## Add a project (no coding needed)

Open `js/projects.js`. Copy any block between `{ ... }`, paste it at the end of the list
(before the closing `]`), and edit the text:

| Field     | What to put                                                                 |
|-----------|-----------------------------------------------------------------------------|
| `id`      | unique short name, no spaces — e.g. `"aurora"`                               |
| `title`   | project name                                                                 |
| `category`| one of: `Branding` `Editorial` `Illustration` `Motion` `Packaging` `Art Direction` |
| `year`    | e.g. `"2026"`                                                               |
| `client`  | client name or `"Personal"`                                                  |
| `role`    | what Rodaina did                                                            |
| `desc`    | one or two sentences                                                        |
| `size`    | `"lg"` (big card), `"sm"` (small), or omit                                  |
| `art`     | cover style: `waves` `orbs` `grid` `type` `blob` `shards`                  |
| `seed`    | any number — changes the generated pattern                                  |
| `palette` | `lime` `magenta` `blue` `sunset` `mono` `candy`                            |
| `url`     | link to live project, or `"#"`                                              |
| `gallery` | extra images: `[ { art, seed, palette }, ... ]` (optional)                  |

Save. The site updates itself — layout, filter buttons, animations all adapt.

## Replace generated covers with real images

The covers are generated SVG art (so the site never looks empty). To use real work:

1. Put image files in `assets/` (e.g. `assets/neonharvest.jpg`).
2. In `projects.js`, replace `art/seed/palette` with `image: "assets/neonharvest.jpg"`.
3. The card and modal will show the image instead.

## Local preview

```bash
cd rodaina-portfolio
python3 -m http.server 8000
# open http://localhost:8000
```

## Deploy (already done — GitHub Pages)

Pushed to `johnmelek-bmc/rodaina-portfolio`, served at:
`https://johnmelek-bmc.github.io/rodaina-portfolio/`

To update: edit files, `git add -A`, `git commit -m "add projects"`, `git push`.
GitHub Pages rebuilds automatically.

## Custom domain (optional, still free)

In the repo **Settings → Pages**, add a custom domain (e.g. `rodaina.studio`) and
point your DNS at GitHub. No cost beyond the domain itself.
