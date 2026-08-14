# Anandu Krishna VP — Developer Portfolio

A static, dependency-free developer portfolio built with plain HTML5, CSS3
and vanilla JavaScript. No external JS libraries, no CDN dependency beyond
Google Fonts, no build step.

## What this redesign pass changed

**Visual system**
- New spacing scale and tighter, more intentional section rhythm — less
  dead space between sections, consistent card padding/gaps throughout.
- Refined dark palette (indigo/teal duo + a sparing warm coral accent for
  "current/live" moments) with a layered ambient background: soft gradient
  glow + a very faint fixed grid, no canvas/WebGL cost.
- New signature visual: a lightweight inline-SVG "schema" graphic behind
  the hero terminal panel — nodes and edges echoing the interlinked Django
  ORM models this developer builds. Pure SVG/CSS, respects
  `prefers-reduced-motion`, and is hidden on small screens.
- Navigation redesigned as a pill-shaped segmented control on desktop and
  a full-screen, blurred mobile menu with clear active states.
- `whoami.sh` terminal panel redesigned with a real title bar, staggered
  "typed" rows and a blinking cursor.

**Structure / behavior**
- Stats are now a single horizontal row on desktop/tablet (compact grid on
  phones) instead of a 2×2 block with excess vertical space.
- Projects and Certifications both open in a shared, accessible **modal**
  (not a separate page) — smooth open/close, closes on the × button,
  outside click, or <kbd>Escape</kbd>, traps background scroll, and
  returns focus to the element that opened it.
- Experience is now in correct chronological order: Edu Tantr (Dec 2024 –
  Jan 2025) first, Trycode Innovations (Jan 2026 – present, marked
  "CURRENT") second.
- Only **one** resume button remains anywhere on the site — "Download
  Resume" — in the nav, hero, and footer, all pointing at the same file.
- Contact section rewritten as two interactive cards (icon + label +
  value) for email and phone, both using real `mailto:`/`tel:` links.
- Removed dead/duplicate content: the old two-line stats block, the
  duplicate view/download resume buttons, and unused legacy scripts that
  were already disconnected from the page (`three-scene.js`, `cursor.js`,
  `command-palette.js`, `theme.js` — the site has been dark-only and
  those were leftover, unreferenced files).

**Responsiveness & accessibility**
- Explicit breakpoints audited at 320 / 375 / 390 / 414 / 480 / 768 / 860 /
  1024 / 1200 / 1280 / 1440 / 1920px — stats row, skills grid, contact
  cards, certifications, and modals all reflow without overflow or
  clipping at every size.
- Modals and the mobile menu are keyboard-operable, labelled with
  `aria-modal`/`aria-label`, and close on <kbd>Escape</kbd>.
- Visible focus states (`:focus-visible`) throughout; `prefers-reduced-motion`
  disables all decorative motion, including the SVG schema animation.

## Run locally

No build step is required. Serve the folder with any static server, e.g.:

```bash
npx serve .
# or
python3 -m http.server 8080
```

Then open `http://localhost:8080` (or whatever port your server prints).
Opening `index.html` directly via `file://` also works, but a local server
avoids any potential CORS quirks with fonts.

## Structure

```
portfolio/
├── index.html            Main page
├── 404.html               Custom not-found page
├── robots.txt
├── sitemap.xml
├── site.webmanifest
├── css/
│   ├── style.css          Design tokens, layout, components
│   ├── responsive.css     Breakpoints + reduced-motion overrides
│   └── animations.css     Entrance + stagger transitions
├── js/
│   ├── navigation.js       Navbar state, mobile menu, smooth scroll
│   ├── animations.js       Scroll-reveal (IntersectionObserver) + hero entrance
│   ├── projects.js         Project + certification data, rendering, and the shared modal
│   └── main.js             Loader, scroll progress bar, footer year
└── assets/
    ├── images/              General site imagery (add your own)
    ├── projects/            Project screenshots/mockups (add your own)
    ├── profile/             Profile photo, if used
    ├── icons/               favicon.svg
    └── resume/              Anandu_Krishna_VP_Python_Developer_Resume.pdf goes here
```

## Things to fill in before shipping

Everything below is intentionally left as a clearly marked placeholder —
nothing was invented as fact. Update these in one place each:

| What | Where |
|---|---|
| Resume PDF | Drop the file into `assets/resume/` with the exact filename referenced in `index.html` |
| Project GitHub repo URLs | `js/projects.js` → each project's `github` field (currently all point to your profile, not per-project repos) |
| Project live demo URLs | `js/projects.js` → each project's `liveDemo` field (leave `''` to hide the button) |
| Project screenshots | `js/projects.js` → each project's `image` field (path under `assets/projects/`) |
| Case study details (problem, solution, contribution, challenges, result) | `js/projects.js` → each project's `case` object. Empty fields simply don't render — no placeholder text ships to visitors. |
| Certificate images / dates | `js/projects.js` → each certification's `image` field; add a `date` field and render it in the modal meta block if you'd like it shown |
| "Currently exploring" tags | `index.html` → `.learning-tags` in the Skills section. Pre-filled with a reasonable next-step stack (DRF, PostgreSQL, Docker, Pytest) based on your existing skills — edit freely |
| Canonical domain, OG image, sitemap URL | `index.html` `<head>`, `sitemap.xml`, `robots.txt` |
| Profile photo (optional) | `assets/profile/` and reference it in the About section markup |

## Performance notes

- No external JS libraries — everything is vanilla, so there's nothing to
  fail-to-load and leave the page broken.
- The hero background is CSS gradients + one small inline SVG — no canvas,
  no WebGL, negligible cost on low-end mobile devices.
- `prefers-reduced-motion` disables all reveal/entrance/background motion.

## Deployment

This is a fully static site — host it on GitHub Pages, Netlify, Vercel, or
any static file host. No backend, database, or build step required.

© 2026 Anandu Krishna. Built with HTML, CSS & JavaScript.
