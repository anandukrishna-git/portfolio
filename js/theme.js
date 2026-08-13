/* ==========================================================================
   theme.js — dark/light theme with persistence
   Runs immediately (before paint-blocking styles apply) to avoid flash.
   ========================================================================== */
(function () {
  const STORAGE_KEY = 'anandu-portfolio-theme';
  const root = document.documentElement;

  function getPreferredTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'dark' || saved === 'light') return saved;
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    return prefersLight ? 'light' : 'dark';
  }

  function applyTheme(theme, animate) {
    if (animate) {
      root.style.setProperty('--transition-theme', '.6s cubic-bezier(.65,0,.35,1)');
    }
    root.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#08080c' : '#f7f5f0');
  }

  // Apply immediately on load (no animation, avoids flash of wrong theme)
  applyTheme(getPreferredTheme(), false);

  window.__portfolioTheme = {
    toggle() {
      const current = root.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next, true);
      return next;
    },
    current() {
      return root.getAttribute('data-theme');
    },
    set(theme) {
      applyTheme(theme, true);
    }
  };

  document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('theme-toggle');
    if (!btn) return;
    btn.addEventListener('click', () => {
      window.__portfolioTheme.toggle();
    });
  });
})();
