# Anandukrishna — Developer Portfolio

A static, dependency-free developer portfolio built with plain HTML5, CSS3
and vanilla JavaScript. No external JS libraries, no CDN dependency beyond
Google Fonts, no build step.

## What this refinement pass changed

**Hero CTAs**
- Added a **View Resume** button (same outlined style as "Get In Touch")
  next to the existing **View Projects →** primary button. It opens the
  resume PDF in a new tab.

**Navbar resume button**
- Changed from "View Resume" to **Download Resume** and it now uses the
  `download` attribute so clicking it actually downloads the PDF instead
  of opening it. Same file, same path, same button styling as before —
  just a different label, icon and behaviour.

**Hero & contact social links**
- Hero socials (GitHub, LinkedIn, Email) are now icon + label pills
  instead of plain text, matching the site's existing pill/mono visual
  language. **WhatsApp** was added alongside them, linking to
  `https://wa.me/918921303751`, styled identically — no oversized green
  WhatsApp button.
- The same icons were added to the contact section's social pills for
  consistency.

**Skills section**
- Fixed the divider logic in `.skills-groups` so the **Concepts** card
  keeps the same border treatment as its row neighbours, rather than
  silently losing its bottom divider because of the 7-items-in-3-columns
  edge case. Only the true last cell in the grid (Tools) now drops its
  trailing borders.

**Project order**
- Reordered to **SignBridge → Food Waste Reducer → SkillHub**, as
  requested. Numbering (`01`/`02`/`03`) follows the new order.

**Project preview media (was: bare info cards)**
- Every project card now reserves a real preview area (`.project-media`,
  16:8 aspect ratio) above the card content.
  - If a project supplies a `video` (short, ~8–12s, muted/looping,
    intended to autoplay inline), it's used as the live preview, both on
    the card and in the modal.
  - Else if an `image` is supplied, that's used as a static preview.
  - Else a tasteful neutral placeholder renders (soft gradient + faint
    grid + a generic outline glyph) — **no more initials** like "SI",
    "FO", "SK" standing in for missing media, and no "preview coming
    soon" text.
- Add media by setting a project's `video` or `image` field in
  `js/projects.js` to a path under `assets/projects/`.

**Project logos**
- Each project can now supply a `logo` (small square image). When
  present it renders in the existing icon-mark slot on the card and next
  to the title in the modal, at the same size/position the initials mark
  used to occupy — no layout disruption. Falls back to the initials mark
  only when no logo is supplied.

**Project & certification modals**
- The project modal now shows the preview media (if any) at the top,
  followed by the logo + title row, tagline, tech tags, and only the
  case-study fields that actually contain content — unchanged principle
  from before, just extended to include media/logo.
- Certifications can now optionally carry a `logo`, a `date`, and a
  `certUrl`. When a `certUrl` is supplied, a **View Certificate** button
  appears in the modal. Nothing is invented — all of these default to
  empty and simply don't render.

**Education section balance**
- The B.E. card remains the visually primary item, but `.edu-grid` now
  stretches both columns to equal height and the HSC/SSLC cards share
  that height evenly (`flex:1`), instead of leaving a large empty gap
  next to a much taller B.E. card. No font or content changes.

**Hero stats**
- Removed the manual `<br>` in "Projects Shipped" so it reads as one
  phrase on one line wherever there's room, without shrinking the font
  size. Responsive stacking behaviour on narrow screens is unchanged.

**Background / hero schema**
- Left as-is: a lightweight inline SVG node/edge network (few nodes, thin
  low-contrast lines, subtle pulsing) rather than a Canvas/WebGL system —
  this already matches the "refined developer-style network background"
  direction without adding weight.

## Things to fill in before shipping

Everything below is intentionally left as a clearly marked placeholder —
nothing was invented as fact. Update these in one place each:

| What | Where |
|---|---|
| Resume PDF | Drop the file into `assets/resume/` with the exact filename `Anandukrishna_Python_Developer_Resume.pdf` |
| Project GitHub repo URLs | `js/projects.js` → each project's `github` field (currently all point to your profile, not per-project repos) |
| Project live demo URLs | `js/projects.js` → each project's `liveDemo` field (leave `''` to hide the button) |
| Project preview video (optional) | `js/projects.js` → each project's `video` field (path under `assets/projects/`, short muted looping clip). Takes priority over `image`. |
| Project preview image (optional) | `js/projects.js` → each project's `image` field (path under `assets/projects/`). Used only if `video` is empty. |
| Project logo (optional) | `js/projects.js` → each project's `logo` field (small square image, path under `assets/projects/`). Falls back to an initials mark if empty. |
| Case study details (features, role, problem, solution, challenges, result) | `js/projects.js` → each project's `case` object. Empty fields simply don't render — no placeholder text ships to visitors. |
| Certificate images (optional) | `js/projects.js` → each certification's `image` field |
| Certificate logo (optional) | `js/projects.js` → each certification's `logo` field |
| Certificate date (optional) | `js/projects.js` → each certification's `date` field |
| Certificate URL (optional) | `js/projects.js` → each certification's `certUrl` field — shows a "View Certificate" button when set |
| "Currently exploring" tags | `index.html` → `.learning-tags` in the Skills section |
| Canonical domain, OG image, sitemap URL | `index.html` `<head>`, `sitemap.xml`, `robots.txt` |
| Profile photo (optional) | `assets/profile/` and reference it in the About section markup |

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
    ├── projects/            Project screenshots/videos/logos (optional — set a
    │                        project's `video`/`image`/`logo` field in
    │                        js/projects.js to use one; if left blank, a
    │                        neutral placeholder renders instead)
    ├── profile/              Profile photo, if used
    ├── icons/                favicon.svg
    └── resume/               Anandukrishna_Python_Developer_Resume.pdf goes here
```

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
