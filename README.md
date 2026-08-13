# Anandu Krishna VP — Developer Portfolio

A static, dependency-free (beyond CDN libraries) developer portfolio built
with HTML5, CSS3 and vanilla JavaScript, plus Three.js and GSAP for motion.

## Run locally

No build step is required. Serve the folder with any static server, e.g.:

```bash
npx serve .
# or
python3 -m http.server 8080
```

Then open `http://localhost:8080` (or whatever port your server prints).
Opening `index.html` directly via `file://` also works, but a local server
avoids any potential CORS quirks with fonts/CDN assets.

## Structure

```
portfolio/
├── index.html          Main page
├── 404.html             Custom not-found page
├── robots.txt
├── sitemap.xml
├── site.webmanifest
├── css/
│   ├── style.css        Design tokens, layout, components
│   ├── responsive.css   Breakpoints + reduced-motion + touch overrides
│   └── animations.css   Keyframes and small motion utilities
├── js/
│   ├── theme.js          Dark/light theme + localStorage persistence
│   ├── navigation.js     Navbar state, mobile menu, smooth scroll
│   ├── animations.js     GSAP / ScrollTrigger orchestration
│   ├── three-scene.js    Hero 3D wireframe object
│   ├── cursor.js         Custom cursor (desktop only)
│   ├── projects.js       Project + certification data and rendering
│   ├── command-palette.js  Ctrl/Cmd+K palette
│   └── main.js           Loader, scroll progress, magnetic buttons, orbit, easter egg
└── assets/
    ├── images/            General site imagery (add your own)
    ├── projects/           Project screenshots/mockups (add your own)
    ├── profile/            Profile photo, if used
    ├── icons/              favicon.svg
    └── resume/              Anandu_Krishna_VP_Python_Developer_Resume.pdf goes here
```

## Things to fill in before shipping

Everything below is intentionally left as a clearly marked placeholder —
nothing was invented. Update these in one place each:

| What | Where |
|---|---|
| Resume PDF | Drop the file into `assets/resume/` with the exact filename referenced in `index.html` |
| Project GitHub repo URLs | `js/projects.js` → each project's `github` field |
| Project live demo URLs | `js/projects.js` → each project's `liveDemo` field (leave `''` to hide the button) |
| Project screenshots | `js/projects.js` → each project's `image` field (path under `assets/projects/`) |
| Case study details (problem, solution, contribution, challenges, result) | `js/projects.js` → each project's `case` object |
| Instagram / WhatsApp / Telegram URLs | `index.html` → contact section, replace the `data-placeholder-link` anchors' `href` |
| "Currently Exploring" technologies | `index.html` → `#learning-tags` in the Skills section |
| Canonical domain, OG/Twitter image, sitemap URL | `index.html` `<head>`, `sitemap.xml`, `robots.txt` |
| Profile photo (optional) | `assets/profile/` and reference it in the About section markup |

## Theme system

Dark is the default. Theme choice is stored in `localStorage` under
`anandu-portfolio-theme` and respects `prefers-color-scheme` on first visit.
All colors are CSS variables defined in `css/style.css` under `:root` and
`[data-theme="light"]` — never hex values hardcoded in components.

## Performance notes

- Three.js scene reduces geometry detail and point count on screens ≤860px,
  pauses rendering when the hero is scrolled out of view or the tab is hidden.
- Custom cursor and magnetic buttons are skipped entirely on touch devices.
- `prefers-reduced-motion` disables GSAP scroll reveals and CSS keyframes.

## Deployment

This is a fully static site — host it on GitHub Pages, Netlify, Vercel, or
any static file host. No backend, database, or build step required.

© 2026 Anandu Krishna. Built with HTML, CSS & JavaScript.
