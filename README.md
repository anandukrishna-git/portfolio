# Anandukrishna — Developer Portfolio

A static, dependency-free developer portfolio built with plain HTML5, CSS3
and vanilla JavaScript. No external JS libraries, no CDN dependency beyond
Google Fonts, no build step.

## Latest refinement pass — what changed

This pass was a **targeted refinement**, not a redesign. The existing
visual identity, colors, typography, layout and working functionality
were preserved; only the specific issues below were addressed.

**Project cards**
- Preview media is now a natural **16:9** frame instead of the previous
  wide 16:7 banner.
- The frame is contained with real padding around it (`.project-media-wrap`
  → `.project-media-frame`) and capped at `max-width:460px` /
  `max-height:240px`, so it reads as a moderately sized project
  screen/video with breathing room — not a full-bleed banner.
- Real video/image supplied later will fill the same frame with
  `object-fit:cover`, no distortion.
- Dummy placeholder previews were re-exported at a 16:9 canvas to match.

**Project popup / case-study modal**
- No demo video, no preview image, no logo, no large media header —
  removed completely. The preview lives on the card only.
- Opens directly into project information: number, name, tagline, tech
  tags, then Overview / Key Features / My Role / Problem / Solution /
  Challenges / Result — only fields that actually have content render.
- Modal is compact (max-width `640px`), with tightened block spacing so
  it fits its content naturally instead of growing tall.
- No forced/visible internal scrollbar: the body can still scroll if a
  particular case study is genuinely long, but the scrollbar track itself
  is hidden (same treatment as the page scrollbar below) so it never
  looks like an awkward inner scroll box.
- Certification modal is untouched and still shows its certificate image
  + logo — the "no media" rule applies only to the project modal.

**Contact section**
- The oversized standalone Email card was removed.
- Contact now shows four equally-sized pills, in order: **WhatsApp →
  Email → GitHub → LinkedIn**. Email still uses `mailto:` and opens the
  visitor's default mail client; nothing else about its behavior changed.

**Page scrollbar**
- The browser's visual scrollbar is hidden (WebKit: `::-webkit-scrollbar`
  zeroed on `html`; Firefox: `scrollbar-width:none`; legacy Edge/IE:
  `-ms-overflow-style:none`).
- The page remains fully scrollable — wheel, trackpad, touch and keyboard
  scrolling are untouched, and `body { overflow:hidden }` was never used
  for this. The top scroll-progress bar is unaffected.
- Other internal scroll areas (e.g. the mobile dropdown menu) keep their
  normal thin scrollbar — only the page-level scrollbar is hidden.

**Navbar name → profile popover**
- "ANANDU · KRISHNA" in the navbar is now a button that opens a small
  glass popover: dummy avatar (`assets/profile/dummy-profile.svg`), name,
  role, and location with a subtle location icon.
- Opens on click, closes on a second click, outside click, or Escape.
  Doesn't block page scroll and doesn't interfere with the mobile menu
  (opening one closes the other).
- Styled with the existing glass/border/radius/typography system — no new
  colors introduced.

**Resume**
- "View Resume" and "Download Resume" both point at the same file:
  `assets/resume/Anandukrishna_Python_Developer_Resume.pdf`.
- `js/resume.js` does a quick existence check (`HEAD` request) before
  opening the PDF in a new tab. Once the real PDF is placed at that exact
  path, the check passes and the file opens normally — no false "not
  added yet" message, no blank tab.

**Overall responsiveness**
- Re-checked at 320–1920px, including 375/390/430/768/820/1024/1280.
  No horizontal scrolling, no cropped or overlapping content. Every JS
  file passes a syntax check, every HTML/CSS file is tag/brace-balanced,
  and every asset referenced by the page resolves locally.

## Things to fill in before shipping

Everything below is intentionally left as a clearly marked placeholder —
nothing was invented as fact. Update these in one place each:

| What | Where |
|---|---|
| Resume PDF | Drop the file into `assets/resume/` with the exact filename `Anandukrishna_Python_Developer_Resume.pdf` |
| Project GitHub repo URLs | `js/projects.js` → each project's `github` field (currently all point to your profile, not per-project repos) |
| Project live demo URLs | `js/projects.js` → each project's `liveDemo` field (leave `''` to hide the button) |
| Project preview video (optional) | `js/projects.js` → each project's `video` field (path under `assets/projects/`, short muted looping clip, 16:9). Takes priority over `image`. |
| Project preview image | `js/projects.js` → each project's `image` field. Ships with a dummy 16:9 SVG placeholder (`assets/projects/*-preview.svg`) — swap the path for a real screenshot whenever ready. |
| Case study details (features, role, problem, solution, challenges, result) | `js/projects.js` → each project's `case` object. Empty fields simply don't render — no placeholder text ships to visitors. The project popup never shows media or a logo by design. |
| Certificate image | `js/projects.js` → each certification's `image` field. Ships pointed at the shared dummy `assets/certs/dummy-certificate.svg` — swap in a real scan/screenshot per certification whenever ready. |
| Certificate logo (optional) | `js/projects.js` → each certification's `logo` field |
| Certificate date (optional) | `js/projects.js` → each certification's `date` field |
| Certificate URL (optional) | `js/projects.js` → each certification's `certUrl` field — shows a "View Certificate" button when set |
| Profile photo | `assets/profile/dummy-profile.svg` is the placeholder shown in the navbar popover — replace the `src` in `index.html` (`#profile-popover`) with your real photo path whenever ready |
| "Currently exploring" tags | `index.html` → `.learning-tags` in the Skills section |
| Canonical domain, OG image, sitemap URL | `index.html` `<head>`, `sitemap.xml`, `robots.txt` |

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
│   ├── navigation.js       Navbar state, compact mobile dropdown, profile popover, smooth scroll
│   ├── animations.js       Scroll-reveal (IntersectionObserver) + hero entrance
│   ├── projects.js         Project + certification data, rendering, and the shared modal
│   ├── resume.js            "View Resume" existence check + fallback notice
│   └── main.js             Loader, scroll progress bar, footer year
└── assets/
    ├── images/              General site imagery (add your own)
    ├── projects/             Project screenshots/videos — ships with
    │                         dummy 16:9 SVG preview placeholders per project
    ├── certs/                Certificate images — ships with one shared
    │                         dummy SVG placeholder
    ├── profile/              Profile photo — ships with a dummy avatar SVG
    │                         used in the navbar profile popover
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
