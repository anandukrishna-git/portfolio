/* ==========================================================================
   cursor.js — custom cursor, desktop-only
   Two-layer cursor (dot + trailing ring) with hover/view states.
   Disabled entirely on touch devices.
   ========================================================================== */
(function () {
  const isTouch = window.matchMedia('(hover:none) and (pointer:coarse)').matches;
  const isNarrow = window.matchMedia('(max-width:860px)').matches;
  if (isTouch || isNarrow) return;

  document.addEventListener('DOMContentLoaded', () => {
    const dot = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');
    if (!dot || !ring) return;

    document.body.classList.add('has-custom-cursor');

    let dotX = 0, dotY = 0, ringX = 0, ringY = 0;
    let mouseX = 0, mouseY = 0;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    }, { passive: true });

    function raf() {
      dotX += (mouseX - dotX) * 0.9;
      dotY += (mouseY - dotY) * 0.9;
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;

      dot.style.transform = `translate(${dotX}px, ${dotY}px) translate(-50%,-50%)`;
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%,-50%)`;

      requestAnimationFrame(raf);
    }
    raf();

    const hoverSelector = 'a, button, .magnetic, [data-cursor], .project-card, .skill-tag, .orbit-node';

    document.addEventListener('mouseover', (e) => {
      const target = e.target.closest(hoverSelector);
      if (target) {
        ring.classList.add('hover');
        if (target.dataset.cursor === 'view' || target.classList.contains('project-card')) {
          ring.classList.add('view');
        }
      }
    });

    document.addEventListener('mouseout', (e) => {
      const target = e.target.closest(hoverSelector);
      if (target) {
        ring.classList.remove('hover');
        ring.classList.remove('view');
      }
    });

    document.addEventListener('mouseleave', () => {
      dot.style.opacity = '0';
      ring.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
      dot.style.opacity = '1';
      ring.style.opacity = '1';
    });
  });
})();
