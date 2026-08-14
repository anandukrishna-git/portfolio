# Anandukrishna — Developer Portfolio

A static, dependency-free developer portfolio built with plain HTML5, CSS3
and vanilla JavaScript. No external JS libraries, no CDN dependency beyond
Google Fonts, no build step.

## What this redesign pass changed

**Name & identity**
- Corrected the name to **Anandukrishna** everywhere (title, meta tags,
  Open Graph, structured data, navbar, hero, loader, footer, manifest,
  resume filename). The navbar logo keeps a stylised "ANANDU · KRISHNA"
  mark purely as a visual treatment.
- Loader now reads `anandukrishna.init`.

**Resume — single, non-duplicated hierarchy**
- Header button: **View Resume** → opens the PDF in a new tab (does not
  force a download).
- Mobile/tablet menu: **Download Resume ↓** → downloads the PDF directly.
- No other resume buttons exist anywhere else on the site (previously the
  hero and footer each had their own, duplicate, resume link).

**Header & mobile navigation**
- Mobile/tablet header is now an intentional composition: logo → flexible
  space → compact "Resume" button → menu toggle. The toggle never gets
  pushed off-screen and the resume button shortens its label at narrow
  widths instead of colliding with anything.
- The mobile menu was rebuilt from scratch: section links, a divider,
  compact GitHub / LinkedIn / WhatsApp links, another divider, then the
  Download Resume action — sized and spaced intentionally rather than
  a vertically-stretched desktop nav.
- Hamburger ↔ close icon morph is animated; Escape, outside interaction,
  and link taps all close the menu and restore body scroll.

**Projects & certifications — compact, information-only modals**
- Removed every fake "Preview coming soon" image placeholder from both
  the project list cards and both modals. Cards use a small initials
  mark instead of a large empty visual block.
- The project modal now shows only fields that actually contain content
  (Overview, Key Features, and — only if supplied — My Role, Problem,
  Solution, Challenges, Result) plus tech tags and real links. Nothing is
  invented.
- The certificate modal shows the real certificate image only if one is
  supplied in `js/projects.js`; otherwise no image area renders at all.
- Both modals are sized to fit their content without an internal
  scrollbar in the common case; a safety `overflow-y:auto` remains only
  as a fallback for unusually long custom content, it is not used to hide
  an oversized modal.
- Same visual language (surface, border, radius, close button, motion)
  is shared by both modal types.

**Social links**
- Added a monochrome, same-height/border/radius WhatsApp link alongside
  GitHub and LinkedIn (in the contact section and the mobile menu),
  linking straight to `https://wa.me/918921303751`. No oversized green
  WhatsApp button.

**Spacing & density**
- Reduced section padding, hero internal spacing, card padding, and
  panel row padding throughout — the page is noticeably more compact
  without feeling cramped.
- Introduced a single `--card-gap` token (≈10–12px, scales slightly on
  mobile) used consistently to separate independently-stacked cards
  (whoami ↔ stats, project cards, cert cards, education cards) instead of
  ad-hoc margins.
- The `whoami.sh` terminal panel is noticeably shorter (tighter row and
  padding rhythm) while keeping the terminal concept.

**Background**
- Kept the layered gradient + faint grid approach (no canvas/WebGL cost)
  but tuned opacity so it reads as premium ambience rather than "basic."

**Dead files removed**
- `js/cursor.js`, `js/theme.js`, `js/command-palette.js` and
  `js/three-scene.js` were never linked from `index.html` in the first
  place (the site is dark-only and has no command palette or 3D hero
  object in the shipped page) — the "floating circle" some screenshots
  showed was this disconnected cursor script. They are not part of this
  package; only the four scripts actually referenced by `index.html`
  ship (`projects.js`, `navigation.js`, `animations.js`, `main.js`).

**Responsiveness & accessibility**
- Explicit breakpoints audited at 320 / 340 / 375 / 390 / 414 / 480 /
  768 / 860 / 1024 / 1200 / 1440 / 1920px — header, mobile menu, hero,
  stats, project/cert cards, contact cards, and modals all reflow
  without overflow, clipping, or awkward wrapping at every size.
- Contact email/phone use controlled `text-overflow:ellipsis` instead of
  `word-break:break-all`, so the address never breaks mid-word.
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
    ├── projects/            Project screenshots (optional — add a project's
    │                        `image` field in js/projects.js to use one; if
    │                        left blank, no image area renders at all)
    ├── profile/              Profile photo, if used
    ├── icons/                favicon.svg
    └── resume/               Anandukrishna_Python_Developer_Resume.pdf goes here
```

## Things to fill in before shipping

Everything below is intentionally left as a clearly marked placeholder —
nothing was invented as fact. Update these in one place each:

| What | Where |
|---|---|
| Resume PDF | Drop the file into `assets/resume/` with the exact filename `Anandukrishna_Python_Developer_Resume.pdf` |
| Project GitHub repo URLs | `js/projects.js` → each project's `github` field (currently all point to your profile, not per-project repos) |
| Project live demo URLs | `js/projects.js` → each project's `liveDemo` field (leave `''` to hide the button) |
| Project screenshots (optional) | `js/projects.js` → each project's `image` field (path under `assets/projects/`). Leave blank to keep the card image-free. |
| Case study details (features, role, problem, solution, challenges, result) | `js/projects.js` → each project's `case` object. Empty fields simply don't render — no placeholder text ships to visitors. |
| Certificate images (optional) | `js/projects.js` → each certification's `image` field; add a `date` field and render it in `openCertModal` if you'd like it shown |
| "Currently exploring" tags | `index.html` → `.learning-tags` in the Skills section |
| Canonical domain, OG image, sitemap URL | `index.html` `<head>`, `sitemap.xml`, `robots.txt` |
| Profile photo (optional) | `assets/profile/` and reference it in the About section markup |

## Performance notes

- No external JS libraries — everything is vanilla, so there's nothing to
  fail-to-load and leave the page broken.
- Only the four scripts referenced by `index.html` ship in this package.
- The hero background is CSS gradients + one small inline SVG — no canvas,
  no WebGL, negligible cost on low-end mobile devices.
- `prefers-reduced-motion` disables all reveal/entrance/background motion.

## Deployment

This is a fully static site — host it on GitHub Pages, Netlify, Vercel, or
any static file host. No backend, database, or build step required.

© 2026 Anandukrishna. Built with HTML, CSS & JavaScript.
