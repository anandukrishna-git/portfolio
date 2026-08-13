/* ==========================================================================
   three-scene.js — hero 3D wireframe object
   A single intentional geometric form: an icosahedron wireframe wrapped in a
   faint point cloud, representing structured, interlinked systems (fitting
   for a backend/data-modelling developer). Rotates slowly, reacts to mouse
   position, and eases out as the visitor scrolls past the hero.
   ========================================================================== */
(function () {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const isMobile = window.matchMedia('(max-width:860px)').matches;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight || 1, 0.1, 100);
  camera.position.z = 9;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));

  function resize() {
    const w = canvas.clientWidth || canvas.parentElement.clientWidth;
    const h = canvas.clientHeight || canvas.parentElement.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }

  function getAccentColors() {
    const styles = getComputedStyle(document.documentElement);
    return {
      accent: styles.getPropertyValue('--accent').trim() || '#7c7fee',
      accent2: styles.getPropertyValue('--accent-2').trim() || '#3fd7d0'
    };
  }

  const colors = getAccentColors();

  // Core wireframe geometry — icosahedron: many equal interlinked faces,
  // echoing the interlinked-entity data models this developer builds.
  const detail = isMobile ? 0 : 1;
  const geometry = new THREE.IcosahedronGeometry(3.1, detail);
  const wireMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color(colors.accent),
    wireframe: true,
    transparent: true,
    opacity: 0.55
  });
  const wireMesh = new THREE.Mesh(geometry, wireMat);
  scene.add(wireMesh);

  // Inner subtle solid core for depth
  const coreGeo = new THREE.IcosahedronGeometry(1.5, 0);
  const coreMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color(colors.accent2),
    wireframe: true,
    transparent: true,
    opacity: 0.3
  });
  const coreMesh = new THREE.Mesh(coreGeo, coreMat);
  scene.add(coreMesh);

  // Point cloud scattered around the object
  const pointCount = isMobile ? 90 : 220;
  const positions = new Float32Array(pointCount * 3);
  for (let i = 0; i < pointCount; i++) {
    const r = 4.4 + Math.random() * 2.2;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos((Math.random() * 2) - 1);
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
  }
  const pointsGeo = new THREE.BufferGeometry();
  pointsGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const pointsMat = new THREE.PointsMaterial({
    color: new THREE.Color(colors.accent2),
    size: 0.035,
    transparent: true,
    opacity: 0.5
  });
  const points = new THREE.Points(pointsGeo, pointsMat);
  scene.add(points);

  let targetRotX = 0, targetRotY = 0;
  let mouseX = 0, mouseY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    mouseY = (e.clientY / window.innerHeight) * 2 - 1;
  }, { passive: true });

  let scrollFade = 1;
  function onScroll() {
    const heroHeight = document.getElementById('hero')?.offsetHeight || window.innerHeight;
    const progress = Math.min(window.scrollY / heroHeight, 1);
    scrollFade = 1 - progress;
    wireMesh.scale.setScalar(1 - progress * 0.35);
    coreMesh.scale.setScalar(1 - progress * 0.35);
    wireMesh.position.y = progress * -1.6;
    coreMesh.position.y = progress * -1.6;
    points.position.y = progress * -1.6;
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  let raf;
  function animate() {
    raf = requestAnimationFrame(animate);

    // Only render while hero is roughly in view (perf)
    const heroEl = document.getElementById('hero');
    if (heroEl) {
      const rect = heroEl.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
    }

    targetRotY += (mouseX * 0.4 - targetRotY) * 0.03;
    targetRotX += (mouseY * 0.25 - targetRotX) * 0.03;

    const baseSpeed = prefersReducedMotion ? 0.0008 : 0.0022;
    wireMesh.rotation.y += baseSpeed;
    wireMesh.rotation.x = targetRotX * 0.4 + Math.sin(Date.now() * 0.0002) * 0.05;
    wireMesh.rotation.y += targetRotY * 0.002;

    coreMesh.rotation.y -= baseSpeed * 0.6;
    coreMesh.rotation.x -= baseSpeed * 0.4;

    points.rotation.y += baseSpeed * 0.4;

    const material = wireMesh.material;
    material.opacity = 0.55 * scrollFade;
    coreMesh.material.opacity = 0.3 * scrollFade;
    points.material.opacity = 0.5 * scrollFade;

    renderer.render(scene, camera);
  }

  resize();
  onScroll();
  animate();

  window.addEventListener('resize', resize);

  // Update accent colors when theme toggles
  const observer = new MutationObserver(() => {
    const c = getAccentColors();
    wireMat.color.set(c.accent);
    coreMat.color.set(c.accent2);
    pointsMat.color.set(c.accent2);
  });
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) cancelAnimationFrame(raf);
    else animate();
  });
})();
