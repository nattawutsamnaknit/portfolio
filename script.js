/* ═══════════════════════════════════════════
   script.js — Bold Editorial Portfolio v3
═══════════════════════════════════════════ */
(function () {
  'use strict';

  /* ── 1. CURSOR ──────────────────────────── */
  const cur  = document.getElementById('cursor');
  const ctxt = document.getElementById('ctxt');
  let cX = innerWidth / 2, cY = innerHeight / 2;
  let rX = cX, rY = cY;

  document.addEventListener('mousemove', e => { cX = e.clientX; cY = e.clientY; });
  (function loop() {
    rX += (cX - rX) * 0.12; rY += (cY - rY) * 0.12;
    cur.style.left = rX + 'px'; cur.style.top = rY + 'px';
    requestAnimationFrame(loop);
  })();

  document.querySelectorAll('a, button, .sk-card, .tech-pills span').forEach(el => {
    el.addEventListener('mouseenter', () => {
      ctxt.textContent = el.dataset.cursor || '';
      cur.classList.add('big');
    });
    el.addEventListener('mouseleave', () => cur.classList.remove('big'));
  });

  /* ── 2. NAV ─────────────────────────────── */
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 10);
  }, { passive: true });

  // Active link
  const nls = document.querySelectorAll('.nl');
  const secIds = ['home', 'about', 'services', 'projects', 'skills', 'experience', 'contact'];
  const sObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting)
        nls.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id));
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  secIds.forEach(id => { const el = document.getElementById(id); if (el) sObs.observe(el); });

  /* ── 3. MOBILE MENU ─────────────────────── */
  const burger  = document.getElementById('burger');
  const mobMenu = document.getElementById('mobMenu');
  const mobX    = document.getElementById('mobX');

  function openMob()  { burger.classList.add('open');    mobMenu.classList.add('open');    document.body.style.overflow = 'hidden'; }
  function closeMob() { burger.classList.remove('open'); mobMenu.classList.remove('open'); document.body.style.overflow = ''; }

  burger.addEventListener('click', () => burger.classList.contains('open') ? closeMob() : openMob());
  mobX.addEventListener('click', closeMob);
  mobMenu.querySelectorAll('.mob-a').forEach(a => a.addEventListener('click', closeMob));

  /* ── 4. SCROLL REVEAL ───────────────────── */
  const revObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const d = parseInt(e.target.dataset.delay || 0);
      setTimeout(() => e.target.classList.add('in'), d);
      revObs.unobserve(e.target);
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('[data-reveal]').forEach(el => revObs.observe(el));

  // Hero on load
  document.querySelectorAll('#home [data-reveal]').forEach(el => {
    const d = parseInt(el.dataset.delay || 0) + 300;
    setTimeout(() => el.classList.add('in'), d);
  });

  /* ── 5. PHOTO ERROR HANDLING ────────────── */
  ['navImg', 'heroImg'].forEach(id => {
    const img = document.getElementById(id);
    if (!img) return;
    img.addEventListener('error', () => img.classList.add('err'));
    const t = new Image(); t.onerror = () => img.classList.add('err'); t.src = img.src;
  });
  document.querySelectorAll('.about-photo-img, .services-photo-img, .tl-img').forEach(img => {
    img.addEventListener('error', () => img.classList.add('err'));
    const t = new Image(); t.onerror = () => img.classList.add('err'); t.src = img.getAttribute('src') || '';
  });

  /* ── 6. ACCORDION ───────────────────────── */
  document.querySelectorAll('.acc-head').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.parentElement;
      const isOpen = item.classList.contains('open');
      // Close all
      document.querySelectorAll('.acc-item.open').forEach(el => el.classList.remove('open'));
      // Open clicked unless it was open
      if (!isOpen) item.classList.add('open');
    });
  });

  /* ── 7. COUNTER ─────────────────────────── */
  const cntObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const target = parseInt(e.target.dataset.count);
      const dur = 1400, start = performance.now();
      (function step(now) {
        const p = Math.min((now - start) / dur, 1);
        e.target.textContent = Math.round((1 - Math.pow(1 - p, 3)) * target);
        if (p < 1) requestAnimationFrame(step);
      })(start);
      cntObs.unobserve(e.target);
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('[data-count]').forEach(el => cntObs.observe(el));

  /* ── 8. TIMELINE BALL (scroll-driven) ───── */
  const tlWrap = document.getElementById('tlWrap');
  const tlFill = document.getElementById('tlFill');
  const tlBall = document.getElementById('tlBall');

  if (tlWrap && tlBall) {
    function updateBall() {
      const rect   = tlWrap.getBoundingClientRect();
      const viewH  = window.innerHeight;
      const total  = tlWrap.offsetHeight - viewH;
      const passed = Math.max(0, -rect.top);
      const ratio  = Math.min(Math.max(passed / total, 0), 1);
      const h      = ratio * tlWrap.offsetHeight;
      tlBall.style.top = h + 'px';
      if (tlFill) tlFill.style.height = h + 'px';
    }
    window.addEventListener('scroll', updateBall, { passive: true });
    updateBall();
  }

  /* ── 9. HERO TITLE PARALLAX ─────────────── */
  const heroWords = document.querySelectorAll('.hero-word');
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    heroWords.forEach((w, i) => {
      w.style.transform = `translateY(${y * (i % 2 === 0 ? 0.14 : -0.14)}px)`;
    });
  }, { passive: true });

  /* ── 10. BADGE PARALLAX ─────────────────── */
  const badge = document.getElementById('heroBadge');
  window.addEventListener('scroll', () => {
    if (badge) badge.style.transform = `translateY(${window.scrollY * 0.08}px)`;
  }, { passive: true });

  /* ── 11. CARD TILT ──────────────────────── */
  document.querySelectorAll('.tl-card, .sg, .sk-card, .about-photo-card, .services-photo-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width  - .5) * 7;
      const y = ((e.clientY - r.top)  / r.height - .5) * 7;
      card.style.transform = `perspective(800px) rotateX(${-y}deg) rotateY(${x}deg) translateY(-5px) scale(1.01)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform .7s cubic-bezier(.16,1,.3,1)';
    });
    card.addEventListener('mouseenter', () => { card.style.transition = 'transform .08s linear'; });
  });

  /* ── 12. SMOOTH SCROLL ──────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const t = document.querySelector(a.getAttribute('href'));
      if (!t) return;
      e.preventDefault();
      t.scrollIntoView({ behavior: 'smooth' });
    });
  });

})();