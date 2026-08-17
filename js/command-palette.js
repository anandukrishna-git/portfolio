/* ==========================================================================
   command-palette.js — Ctrl/Cmd+K command palette
   ========================================================================== */
(function () {
  const commands = [
    { label: 'Go to Home', key: 'G H', action: () => scrollToId('#hero') },
    { label: 'Go to About', key: 'G A', action: () => scrollToId('#about') },
    { label: 'Go to Skills', key: 'G S', action: () => scrollToId('#skills') },
    { label: 'Go to Projects', key: 'G P', action: () => scrollToId('#projects') },
    { label: 'Go to Experience', key: 'G E', action: () => scrollToId('#experience') },
    { label: 'Go to Education', key: 'G D', action: () => scrollToId('#education') },
    { label: 'Go to Contact', key: 'G C', action: () => scrollToId('#contact') },
    { label: 'Open GitHub', key: '↗', action: () => window.open('https://github.com/anandukrishna-git', '_blank', 'noopener') },
    { label: 'Open LinkedIn', key: '↗', action: () => window.open('https://linkedin.com/in/anandukrishnavp88', '_blank', 'noopener') },
    { label: 'View Resume', key: '↗', action: () => window.open('assets/resume/Anandukrishna_Python_Developer_Resume.pdf', '_blank', 'noopener') },
    { label: 'Download Resume', key: '↓', action: () => triggerDownload('assets/resume/Anandukrishna_Python_Developer_Resume.pdf') },
    { label: 'Toggle Theme', key: 'T', action: () => window.__portfolioTheme?.toggle() }
  ];

  function scrollToId(id) {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function triggerDownload(href) {
    const a = document.createElement('a');
    a.href = href;
    a.download = '';
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  let activeIndex = 0;
  let filtered = commands;

  function render(list) {
    const el = document.getElementById('cmdk-list');
    if (!list.length) {
      el.innerHTML = `<div class="cmdk-empty">No commands found</div>`;
      return;
    }
    el.innerHTML = list.map((c, i) => `
      <div class="cmdk-item ${i === activeIndex ? 'active' : ''}" data-index="${i}" role="option" aria-selected="${i === activeIndex}">
        <span>${c.label}</span><span class="k">${c.key}</span>
      </div>
    `).join('');
  }

  function open() {
    const overlay = document.getElementById('cmdk-overlay');
    const input = document.getElementById('cmdk-input');
    overlay.classList.add('open');
    filtered = commands;
    activeIndex = 0;
    render(filtered);
    input.value = '';
    setTimeout(() => input.focus(), 60);
  }

  function close() {
    document.getElementById('cmdk-overlay').classList.remove('open');
  }

  document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.getElementById('cmdk-overlay');
    const input = document.getElementById('cmdk-input');
    const list = document.getElementById('cmdk-list');

    document.addEventListener('keydown', (e) => {
      const isK = e.key === 'k' || e.key === 'K';
      if ((e.metaKey || e.ctrlKey) && isK) {
        e.preventDefault();
        overlay.classList.contains('open') ? close() : open();
      }
      if (e.key === 'Escape' && overlay.classList.contains('open')) close();

      if (overlay.classList.contains('open')) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          activeIndex = Math.min(activeIndex + 1, filtered.length - 1);
          render(filtered);
          scrollActiveIntoView();
        }
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          activeIndex = Math.max(activeIndex - 1, 0);
          render(filtered);
          scrollActiveIntoView();
        }
        if (e.key === 'Enter') {
          e.preventDefault();
          filtered[activeIndex]?.action();
          close();
        }
      }
    });

    function scrollActiveIntoView() {
      list.querySelector('.cmdk-item.active')?.scrollIntoView({ block: 'nearest' });
    }

    input.addEventListener('input', () => {
      const q = input.value.trim().toLowerCase();
      filtered = commands.filter(c => c.label.toLowerCase().includes(q));
      activeIndex = 0;
      render(filtered);
    });

    list.addEventListener('click', (e) => {
      const item = e.target.closest('.cmdk-item');
      if (!item) return;
      filtered[Number(item.dataset.index)]?.action();
      close();
    });

    overlay.addEventListener('mousedown', (e) => {
      if (e.target === overlay) close();
    });
  });
})();
