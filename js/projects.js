/* ==========================================================================
   projects.js — single source of truth for project content
   Edit the `projects` array below to update cards, links and case studies.
   ========================================================================== */

const projects = [
  {
    id: 'skillhub',
    number: '01',
    name: 'SkillHub',
    tagline: 'Multi-role Django platform for students, companies and staff.',
    description: 'Built a multi-role Django platform for students, companies and staff with project listings, shortlisting and feedback workflows, modelling 10+ interlinked entities using Django ORM. Unified the front-end with a reusable CSS-based system spanning responsive tables and form components across 15+ templates.',
    tech: ['Django', 'Python', 'SQLite', 'HTML5', 'CSS3', 'JavaScript'],
    github: 'https://github.com/anandukrishna-git', // placeholder — replace with exact repo URL
    liveDemo: '', // placeholder — leave empty until a live URL is provided
    image: '',
    case: {
      overview: 'A multi-role platform connecting students, companies and internal staff around project listings, applications and feedback.',
      problem: '',
      solution: '',
      technologies: 'Django, Python, SQLite, HTML5, CSS3, JavaScript.',
      features: 'Project listings, shortlisting workflow, feedback system, 10+ interlinked Django ORM models.',
      contribution: '',
      challenges: '',
      result: ''
    }
  },
  {
    id: 'food-waste-reducer',
    number: '02',
    name: 'Food Waste Reducer',
    tagline: 'Full-stack food donation platform connecting donors and recipients.',
    description: 'A full-stack food donation platform connecting donors and recipients, with role-based authentication and CRUD operations built using Django.',
    tech: ['Django', 'Python', 'SQLite', 'Bootstrap', 'HTML', 'CSS'],
    github: 'https://github.com/anandukrishna-git', // placeholder — replace with exact repo URL
    liveDemo: '',
    image: '',
    case: {
      overview: 'A donation platform matching food donors with recipients in need.',
      problem: '',
      solution: '',
      technologies: 'Django, Python, SQLite, Bootstrap, HTML/CSS.',
      features: 'Role-based authentication, donor/recipient CRUD workflows.',
      contribution: '',
      challenges: '',
      result: ''
    }
  },
  {
    id: 'signbridge',
    number: '03',
    name: 'SignBridge',
    tagline: 'Accessibility-focused communication platform.',
    description: 'An accessibility-focused communication platform with a responsive, mobile-first CSS interface and dynamic form handling, built using Django MVT architecture.',
    tech: ['Django', 'JavaScript', 'HTML5', 'CSS3', 'Bootstrap'],
    github: 'https://github.com/anandukrishna-git', // placeholder — replace with exact repo URL
    liveDemo: '',
    image: '',
    case: {
      overview: 'A communication platform designed with accessibility as the central constraint.',
      problem: '',
      solution: '',
      technologies: 'Django, JavaScript, HTML5, CSS3, Bootstrap.',
      features: 'Mobile-first responsive UI, dynamic form handling, MVT architecture.',
      contribution: '',
      challenges: '',
      result: ''
    }
  }
];

const certifications = [
  { issuer: 'Infosys Springboard', title: 'Python Fundamentals' },
  { issuer: 'Udemy', title: 'Python Certification' },
  { issuer: 'AWS Aspire', title: 'Generative AI Revolution' },
  { issuer: 'NPTEL', title: 'Introduction to IoT 4.0' }
];

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function renderProjects() {
  const list = document.getElementById('project-list');
  if (!list) return;
  list.innerHTML = projects.map(p => `
    <article class="project-card reveal" data-project="${p.id}" tabindex="0" role="button" aria-label="View case study for ${escapeHtml(p.name)}">
      <div class="project-visual">
        ${p.image ? `<img src="${p.image}" alt="${escapeHtml(p.name)} preview" loading="lazy">` : `<span class="ph">PREVIEW IMAGE — PLACEHOLDER</span>`}
      </div>
      <div class="project-info">
        <span class="project-num mono">${p.number}</span>
        <h3 class="project-name">${escapeHtml(p.name)}</h3>
        <p class="project-desc">${escapeHtml(p.description)}</p>
        <div class="project-tags">${p.tech.map(t => `<span>${escapeHtml(t)}</span>`).join('')}</div>
        <div class="project-actions">
          <a href="${p.github}" target="_blank" rel="noopener" class="btn btn-outline" data-stop>GitHub ↗</a>
          ${p.liveDemo ? `<a href="${p.liveDemo}" target="_blank" rel="noopener" class="btn btn-outline" data-stop>Live Demo ↗</a>` : ''}
          <button class="btn btn-ghost" data-open-case="${p.id}">View Case Study →</button>
        </div>
      </div>
    </article>
  `).join('');

  // Stop propagation on external links so the card click handler doesn't also fire
  list.querySelectorAll('[data-stop]').forEach(el => {
    el.addEventListener('click', e => e.stopPropagation());
  });

  list.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => openCaseStudy(card.dataset.project));
    card.addEventListener('keypress', e => {
      if (e.key === 'Enter') openCaseStudy(card.dataset.project);
    });
  });
}

function renderCertifications() {
  const grid = document.getElementById('cert-grid');
  if (!grid) return;
  grid.innerHTML = certifications.map(c => `
    <div class="glass cert-card reveal">
      <span class="cert-issuer mono">${escapeHtml(c.issuer)}</span>
      <h5>${escapeHtml(c.title)}</h5>
    </div>
  `).join('');
}

function openCaseStudy(id) {
  const p = projects.find(pr => pr.id === id);
  if (!p) return;
  const overlay = document.getElementById('case-study');
  document.getElementById('case-eyebrow').textContent = `PROJECT ${p.number}`;
  document.getElementById('case-title').textContent = p.name;

  const blocks = [
    ['01 — Overview', p.case.overview],
    ['02 — Problem', p.case.problem],
    ['03 — Solution', p.case.solution],
    ['04 — Technologies', p.case.technologies],
    ['05 — Features', p.case.features],
    ['06 — My Contribution', p.case.contribution],
    ['07 — Challenges', p.case.challenges],
    ['08 — Result', p.case.result]
  ];

  // Only render blocks that actually have content — an unfilled field is
  // simply omitted rather than shown to visitors as "Placeholder" text.
  const filledBlocks = blocks.filter(([, text]) => text && text.trim().length > 0);

  document.getElementById('case-body').innerHTML = filledBlocks.map(([label, text]) => `
    <div class="case-block">
      <h5>${label}</h5>
      <p>${escapeHtml(text)}</p>
    </div>
  `).join('') + `
    <div class="case-block" style="border-bottom:1px solid var(--border);display:flex;gap:1rem;flex-wrap:wrap;">
      <a href="${p.github}" target="_blank" rel="noopener" class="btn btn-outline">GitHub Repository ↗</a>
      ${p.liveDemo ? `<a href="${p.liveDemo}" target="_blank" rel="noopener" class="btn btn-outline">Live Demo ↗</a>` : ''}
    </div>
  `;

  overlay.classList.add('open');
  overlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  document.getElementById('case-close').focus();
}

function closeCaseStudy() {
  const overlay = document.getElementById('case-study');
  overlay.classList.remove('open');
  overlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

document.addEventListener('DOMContentLoaded', () => {
  renderProjects();
  renderCertifications();
  document.getElementById('case-close')?.addEventListener('click', closeCaseStudy);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeCaseStudy();
  });
});
