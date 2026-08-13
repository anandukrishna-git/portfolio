# Anandu Krishna VP — Developer Portfolio

A static, dependency-free developer portfolio built with plain HTML5, CSS3
and vanilla JavaScript. No external JS libraries — no CDN dependency, no
build step.

## What changed in this cleanup pass

**Removed (per request — reduce complexity, drop light mode):**
- Dark/light theme toggle and all light-theme CSS — the site is dark-only now.
- Three.js hero 3D wireframe (`three-scene.js`) and its `<canvas>`.
- Custom cursor (`cursor.js`).
- Skill "orbit" diagram — it duplicated the skill-tag lists right below it.
- ⌘K command palette (`command-palette.js`).
- "sudo" terminal easter egg.
- GSAP + ScrollTrigger — scroll reveals and the hero entrance are now done
  with a small IntersectionObserver script (`js/animations.js`), so the
  page no longer depends on a CDN library to become visible.

**Bugs fixed:**
- `.reveal` elements could stay permanently invisible if the GSAP CDN
  script failed to load — fixed by removing the dependency entirely.
- A global "type sudo" keydown listener could fire while typing anywhere
  on the page — removed along with the easter egg.
- Case-study modal was showing literal `"Placeholder — ... to be added"`
  text to visitors. Unfilled fields are now simply omitted instead of
  rendered.
- Dead social links (Instagram / WhatsApp / Telegram, all `href="#"`)
  removed from the contact section — only real, working links remain
  (GitHub, LinkedIn, Email).
- Custom cursor's touch/desktop check ran once at page load instead of
  responding to viewport changes — moot now that it's removed.
- Redundant, duplicate CSS breakpoint rules cleaned up.

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
├── index.html          Main page
├── 404.html             Custom not-found page
├── robots.txt
├── sitemap.xml
├── site.webmanifest
├── css/
│   ├── style.css        Design tokens, layout, components (dark-only)
│   ├── responsive.css   Breakpoints + reduced-motion overrides
│   └── animations.css   Hero entrance keyframe transitions
├── js/
│   ├── navigation.js     Navbar state, mobile menu, smooth scroll
│   ├── animations.js     Scroll-reveal (IntersectionObserver) + hero entrance
│   ├── projects.js       Project + certification data and rendering
│   └── main.js           Loader, scroll progress bar, footer year
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
| Project GitHub repo URLs | `js/projects.js` → each project's `github` field (currently all point to your profile, not per-project repos) |
| Project live demo URLs | `js/projects.js` → each project's `liveDemo` field (leave `''` to hide the button) |
| Project screenshots | `js/projects.js` → each project's `image` field (path under `assets/projects/`) |
| Case study details (problem, solution, contribution, challenges, result) | `js/projects.js` → each project's `case` object. These fields are currently empty and simply won't show in the modal until filled — no placeholder text ships to visitors. |
| "Currently Exploring" technologies | `index.html` → `#learning-tags` in the Skills section |
| Canonical domain, OG image, sitemap URL | `index.html` `<head>`, `sitemap.xml`, `robots.txt` |
| Profile photo (optional) | `assets/profile/` and reference it in the About section markup |

## Performance notes

- No external JS libraries — everything is vanilla, so there's nothing to
  fail-to-load and leave the page broken.
- `prefers-reduced-motion` disables all reveal/entrance animations.

## Deployment

This is a fully static site — host it on GitHub Pages, Netlify, Vercel, or
any static file host. No backend, database, or build step required.

© 2026 Anandu Krishna. Built with HTML, CSS & JavaScript.
