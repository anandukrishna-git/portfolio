/* ==========================================================================
   main.js — page loader, scroll progress, magnetic buttons,
   skill-orbit generation, easter egg, footer year.
   ========================================================================== */
(function () {
  document.addEventListener('DOMContentLoaded', () => {

    /* ---------------- Footer year ---------------- */
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    /* ---------------- Page loader ---------------- */
    const loader = document.getElementById('loader');
    const loaderFill = document.getElementById('loader-fill');
    let progress = 0;
    const loaderInterval = setInterval(() => {
      progress += Math.random() * 22;
      if (progress >= 100) progress = 100;
      loaderFill.style.width = progress + '%';
      if (progress >= 100) clearInterval(loaderInterval);
    }, 90);

    window.addEventListener('load', () => {
      setTimeout(() => {
        loaderFill.style.width = '100%';
        setTimeout(() => {
          loader.classList.add('hidden');
          document.dispatchEvent(new CustomEvent('portfolio:loaded'));
        }, 350);
      }, 400);
    });
    // Fallback in case 'load' fires very late or listeners error
    setTimeout(() => {
      if (!loader.classList.contains('hidden')) {
        loader.classList.add('hidden');
        document.dispatchEvent(new CustomEvent('portfolio:loaded'));
      }
    }, 2200);

    /* ---------------- Scroll progress bar ---------------- */
    const progressBar = document.getElementById('scroll-progress');
    function updateScrollProgress() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressBar.style.width = pct + '%';
    }
    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    updateScrollProgress();

    /* ---------------- Magnetic buttons (desktop only) ---------------- */
    const isCoarse = window.matchMedia('(hover:none) and (pointer:coarse)').matches;
    if (!isCoarse) {
      document.querySelectorAll('.magnetic').forEach(el => {
        let bounds;
        el.addEventListener('mouseenter', () => { bounds = el.getBoundingClientRect(); });
        el.addEventListener('mousemove', (e) => {
          if (!bounds) bounds = el.getBoundingClientRect();
          const relX = e.clientX - bounds.left - bounds.width / 2;
          const relY = e.clientY - bounds.top - bounds.height / 2;
          el.style.transform = `translate(${relX * 0.22}px, ${relY * 0.32}px)`;
        });
        el.addEventListener('mouseleave', () => {
          el.style.transform = 'translate(0,0)';
        });
      });
    }

    /* ---------------- Skill orbit node generation ---------------- */
    const orbitWrap = document.getElementById('skill-orbit');
    if (orbitWrap) {
      const nodes = [
        { label: 'Python', ring: 1 },
        { label: 'Django', ring: 1 },
        { label: 'JavaScript', ring: 1 },
        { label: 'SQL', ring: 2 },
        { label: 'HTML5 / CSS3', ring: 2 },
        { label: 'Django ORM', ring: 2 },
        { label: 'Git & GitHub', ring: 3 },
        { label: 'Bootstrap', ring: 3 },
        { label: 'REST (fundamentals)', ring: 3 },
        { label: 'SQLite', ring: 1 }
      ];
      const ringRatio = { 1: 0.28, 2: 0.40, 3: 0.50 }; // fraction of half-width

      const byRing = {};
      nodes.forEach(n => { (byRing[n.ring] = byRing[n.ring] || []).push(n); });

      // Create elements once
      const nodeEls = [];
      Object.keys(byRing).forEach(ringKey => {
        const items = byRing[ringKey];
        items.forEach((n, i) => {
          const angleDeg = (360 / items.length) * i + (ringKey * 18);
          const node = document.createElement('div');
          node.className = 'orbit-node';
          node.innerHTML = `<span class="orbit-dot"></span>${n.label}`;
          orbitWrap.appendChild(node);
          nodeEls.push({ el: node, ring: Number(ringKey), angleDeg });
        });
      });

      function positionNodes() {
        const half = orbitWrap.offsetWidth / 2;
        nodeEls.forEach(({ el, ring, angleDeg }) => {
          const radius = half * ringRatio[ring];
          const rad = (angleDeg * Math.PI) / 180;
          const x = Math.cos(rad) * radius;
          const y = Math.sin(rad) * radius;
          el.style.left = `calc(50% + ${x}px)`;
          el.style.top = `calc(50% + ${y}px)`;
        });
      }
      positionNodes();
      window.addEventListener('resize', positionNodes);
    }

    /* ---------------- Easter egg: type "sudo" ---------------- */
    let buffer = '';
    const eggEl = document.getElementById('egg');
    document.addEventListener('keydown', (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      buffer = (buffer + e.key).slice(-4).toLowerCase();
      if (buffer === 'sudo') {
        eggEl.classList.add('open');
      }
    });
    function closeEgg() {
      eggEl.classList.remove('open');
    }
    document.getElementById('egg-close')?.addEventListener('click', closeEgg);
    eggEl?.addEventListener('click', (e) => { if (e.target === eggEl) closeEgg(); });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && eggEl.classList.contains('open')) closeEgg();
    });

    /* ---------------- Placeholder social links: friendly notice ---------------- */
    document.querySelectorAll('[data-placeholder-link]').forEach(a => {
      a.addEventListener('click', (e) => {
        e.preventDefault();
        a.style.opacity = '0.55';
        const original = a.textContent;
        a.textContent = 'Link coming soon';
        setTimeout(() => { a.textContent = original; a.style.opacity = ''; }, 1400);
      });
    });
  });
})();
