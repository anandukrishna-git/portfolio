# Anandukrishna — Developer Portfolio

A static, dependency-free developer portfolio built with plain HTML5, CSS3
and vanilla JavaScript. No external JS libraries, no CDN dependency beyond
Google Fonts, no build step.

## Latest refinement pass — what changed

This pass was a **targeted refinement**, not a redesign. The existing
visual identity, colors, typography, layout and working functionality
were preserved; only the specific issues below were addressed.

**Resume**
- Navbar / mobile-menu **Download Resume** button — untouched, it already
  worked.
- Hero **View Resume** button now actually works: `js/resume.js` does a
  quick existence check before opening the PDF in a new tab. If the file
  hasn't been added yet, the visitor sees a small "not added yet" notice
  next to the button instead of a blank/broken tab.

**Mobile & tablet navigation**
- The hamburger menu is now a **compact dropdown panel** anchored under
  the navbar (fixed width, capped height) instead of a full-screen
  takeover. It still closes on Escape, outside click, any link click, and
  on viewport resize past the mobile breakpoint.

**Background**
- The animated diamond/dot/dashed-line network graphic in the hero has
  been removed entirely.
- Replaced with a **subtle, slowly drifting linear gradient** layered
  into the existing ambient background — lightweight (pure CSS, no
  canvas/WebGL), respects `prefers-reduced-motion`, and never crops or
  overflows on any screen size.

**Project cards**
- Preview media area is now noticeably smaller (`aspect-ratio:16/7`,
  capped `max-height`) and scales down further at each breakpoint instead
  of ballooning on mobile.
- Card padding, type sizes and tag/button sizing were tightened across
  the board so cards read as compact, not oversized.
- Dummy placeholder preview images now ship for all three projects
  (`assets/projects/*-preview.svg`) so the section looks complete before
  you add real screenshots or clips.

**Project logo**
- The small logo/mark icon on the card face has been removed.
- It's still shown inside the **case-study modal** next to the project
  name whenever a project supplies a `logo` in `js/projects.js` — nothing
  about the popup behavior changed.

**Education**
- The CGPA pill no longer stretches to the full width of its container
  (it was being flex-stretched by its parent) — it now hugs its own text
  with tight padding, same visual style as before.

**Certifications**
- Clicking a certification opens a compact modal showing a certificate
  image and minimal issuer info, sized to avoid unnecessary scrolling.
- A dummy certificate image now ships at
  `assets/certs/dummy-certificate.svg` and is wired into every
  certification so the section looks finished immediately — swap the
  `image` field per certification in `js/projects.js` with your real
  scan/screenshot whenever it's ready.

**Contact**
- The phone number card was removed.
- Social/contact links now read, in order: **WhatsApp → Email → GitHub →
  LinkedIn** (footer "Connect" column updated to match). The email link
  uses `mailto:` so it opens the visitor's default mail client.

**Hero buttons (mobile & tablet)**
- **View Projects**, **View Resume** and **Get In Touch** no longer stack
  into a tall single column. On tablet/mobile they arrange as a compact
  two-up row with the third button filling the row beneath — tappable,
  evenly spaced, not oversized. Desktop layout is unchanged.

**Social icons (mobile & tablet)**
- Hero social links (GitHub, LinkedIn, WhatsApp, Email) are centered as a
  group on mobile/tablet instead of hugging the left edge, with balanced
  gaps and no overflow.

**Overall responsiveness**
- Re-checked at 320–1920px. No horizontal scrolling, no cropped or
  overlapping content, no oversized/undersized elements introduced by
  this pass. Every JS file passes a syntax check, every HTML/CSS file is
  tag/brace-balanced, and every asset referenced by the page returns
  HTTP 200 when served locally.

## Things to fill in before shipping

Everything below is intentionally left as a clearly marked placeholder —
nothing was invented as fact. Update these in one place each:

| What | Where |
|---|---|
| Resume PDF | Drop the file into `assets/resume/` with the exact filename `Anandukrishna_Python_Developer_Resume.pdf` |
| Project GitHub repo URLs | `js/projects.js` → each project's `github` field (currently all point to your profile, not per-project repos) |
| Project live demo URLs | `js/projects.js` → each project's `liveDemo` field (leave `''` to hide the button) |
| Project preview video (optional) | `js/projects.js` → each project's `video` field (path under `assets/projects/`, short muted looping clip). Takes priority over `image`. |
| Project preview image | `js/projects.js` → each project's `image` field. Ships with a dummy SVG placeholder (`assets/projects/*-preview.svg`) — swap the path for a real screenshot whenever ready. |
| Project logo (optional, modal-only) | `js/projects.js` → each project's `logo` field (small square image, path under `assets/projects/`). Shown only inside the case-study modal. |
| Case study details (features, role, problem, solution, challenges, result) | `js/projects.js` → each project's `case` object. Empty fields simply don't render — no placeholder text ships to visitors. |
| Certificate image | `js/projects.js` → each certification's `image` field. Ships pointed at the shared dummy `assets/certs/dummy-certificate.svg` — swap in a real scan/screenshot per certification whenever ready. |
| Certificate logo (optional) | `js/projects.js` → each certification's `logo` field |
| Certificate date (optional) | `js/projects.js` → each certification's `date` field |
| Certificate URL (optional) | `js/projects.js` → each certification's `certUrl` field — shows a "View Certificate" button when set |
| "Currently exploring" tags | `index.html` → `.learning-tags` in the Skills section |
| Canonical domain, OG image, sitemap URL | `index.html` `<head>`, `sitemap.xml`, `robots.txt` |
| Profile photo (optional) | `assets/profile/` |

## Run locally

No build step is required. Serve the folder with any static server, e.g.:

```bash
npx serve .
# or
python3 -m http.server 8080
```

Then open `http://localhost:8080` (or whatever port your server prints).
A local server is required for the "View Resume" existence check (it uses
`fetch`, which is blocked by browsers under `file://`); if you open
`index.html` directly via `file://`, that one button falls back to simply
opening the PDF without the check.

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
│   ├── navigation.js       Navbar state, compact mobile dropdown, smooth scroll
│   ├── animations.js       Scroll-reveal (IntersectionObserver) + hero entrance
│   ├── projects.js         Project + certification data, rendering, and the shared modal
│   ├── resume.js            "View Resume" existence check + fallback notice
│   └── main.js             Loader, scroll progress bar, footer year
└── assets/
    ├── images/              General site imagery (add your own)
    ├── projects/             Project screenshots/videos/logos — ships with
    │                         dummy SVG preview placeholders per project
    ├── certs/                Certificate images — ships with one shared
    │                         dummy SVG placeholder
    ├── profile/              Profile photo, if used
    ├── icons/                favicon.svg
    └── resume/               Anandukrishna_Python_Developer_Resume.pdf goes here
```

## Performance notes

- No external JS libraries — everything is vanilla, so there's nothing to
  fail-to-load and leave the page broken.
- The ambient background is CSS gradients only (no canvas, no WebGL,
  negligible cost on low-end mobile devices) and pauses under
  `prefers-reduced-motion`.
- `prefers-reduced-motion` disables all reveal/entrance/background motion.

## Deployment

This is a fully static site — host it on GitHub Pages, Netlify, Vercel, or
any static file host. No backend, database, or build step required.

© 2026 Anandukrishna. Built with HTML, CSS & JavaScript.
