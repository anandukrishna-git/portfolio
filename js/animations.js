/* ==========================================================================
   animations.js — GSAP + ScrollTrigger orchestration
   ========================================================================== */
(function () {
  document.addEventListener('DOMContentLoaded', () => {
    if (typeof gsap === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      gsap.set('.reveal', { opacity: 1, y: 0 });
      return;
    }

    // Hero name line reveal — runs once loader finishes (triggered from main.js via event)
    document.addEventListener('portfolio:loaded', () => {
      gsap.set('.hero-name .line span', { yPercent: 110 });
      gsap.timeline({ delay: 0.15 })
        .to('.hero-name .line span', {
          yPercent: 0, duration: 1.1, stagger: 0.12, ease: 'power4.out'
        })
        .from('.hero-status', { opacity: 0, y: 10, duration: 0.6, ease: 'power2.out' }, '-=0.7')
        .from('.hero-role, .hero-desc', { opacity: 0, y: 14, duration: 0.7, stagger: 0.1, ease: 'power2.out' }, '-=0.6')
        .from('.hero-cta .btn', { opacity: 0, y: 14, duration: 0.6, stagger: 0.08, ease: 'power2.out' }, '-=0.5')
        .from('.hero-socials a', { opacity: 0, duration: 0.5, stagger: 0.06 }, '-=0.4')
        .from('.hero-meta > div', { opacity: 0, x: 14, duration: 0.6, stagger: 0.08, ease: 'power2.out' }, '-=0.6');
    });

    // Generic reveal-on-scroll for elements with .reveal
    gsap.utils.toArray('.reveal').forEach((el, i) => {
      gsap.fromTo(el, { opacity: 0, y: 28 }, {
        opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true }
      });
    });

    // Timeline progress line
    const timeline = document.querySelector('.timeline');
    const timelineProgress = document.getElementById('timeline-progress');
    if (timeline && timelineProgress) {
      gsap.to(timelineProgress, {
        height: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: timeline,
          start: 'top 65%',
          end: 'bottom 75%',
          scrub: 0.6
        }
      });
    }

    // Orbit nodes gentle stagger-in
    gsap.from('.orbit-node', {
      opacity: 0, scale: 0.6, duration: 0.6, stagger: 0.06, ease: 'back.out(1.7)',
      scrollTrigger: { trigger: '#skill-orbit', start: 'top 80%', once: true }
    });

    // Section eyebrow subtle parallax
    gsap.utils.toArray('.section-title').forEach(title => {
      gsap.fromTo(title, { backgroundPositionX: '0%' }, {
        backgroundPositionX: '0%',
        scrollTrigger: { trigger: title, start: 'top 90%' }
      });
    });
  });
})();
