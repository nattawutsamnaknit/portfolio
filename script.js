/* ═══════════════════════════════════════════
   script.js — Portfolio v5 (Thai / Swipe)
═══════════════════════════════════════════ */
(function () {
  'use strict';

  /* ── 1. CURSOR (desktop only) ──────────── */
  const cur  = document.getElementById('cursor');
  const ctxt = document.getElementById('ctxt');
  if (cur && window.matchMedia('(pointer:fine)').matches) {
    let cX = innerWidth/2, cY = innerHeight/2, rX = cX, rY = cY;
    document.addEventListener('mousemove', e => { cX = e.clientX; cY = e.clientY; });
    (function loop() {
      rX += (cX-rX)*.12; rY += (cY-rY)*.12;
      cur.style.left = rX+'px'; cur.style.top = rY+'px';
      requestAnimationFrame(loop);
    })();
    document.querySelectorAll('a,button,.sk-card,.proj-card').forEach(el => {
      el.addEventListener('mouseenter', () => { ctxt.textContent = el.dataset.cursor||''; cur.classList.add('big'); });
      el.addEventListener('mouseleave', () => cur.classList.remove('big'));
    });
  } else {
    if (cur) cur.style.display = 'none';
  }

  /* ── 2. NAV SCROLL ──────────────────────── */
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 10);
  }, { passive:true });

  // Active nav link
  const nls    = document.querySelectorAll('.nl');
  const secIds = ['home','about','skills','projects','contact'];
  const sObs   = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting)
        nls.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#'+e.target.id));
    });
  }, { rootMargin:'-40% 0px -55% 0px' });
  secIds.forEach(id => { const el = document.getElementById(id); if(el) sObs.observe(el); });

  /* ── 3. MOBILE MENU ─────────────────────── */
  const burger  = document.getElementById('burger');
  const mobMenu = document.getElementById('mobMenu');
  const mobX    = document.getElementById('mobX');

  function openMob()  { burger.classList.add('open');    mobMenu.classList.add('open');    document.body.style.overflow='hidden'; }
  function closeMob() { burger.classList.remove('open'); mobMenu.classList.remove('open'); document.body.style.overflow=''; }

  if (burger) burger.addEventListener('click', () => burger.classList.contains('open') ? closeMob() : openMob());
  if (mobX)   mobX.addEventListener('click', closeMob);
  if (mobMenu) mobMenu.querySelectorAll('.mob-a').forEach(a => a.addEventListener('click', closeMob));

  /* ── 4. SCROLL REVEAL ───────────────────── */
  const revObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      setTimeout(() => e.target.classList.add('in'), parseInt(e.target.dataset.delay||0));
      revObs.unobserve(e.target);
    });
  }, { threshold:0.08 });
  document.querySelectorAll('[data-reveal]').forEach(el => revObs.observe(el));
  // Hero immediate
  document.querySelectorAll('#home [data-reveal]').forEach(el => {
    setTimeout(() => el.classList.add('in'), parseInt(el.dataset.delay||0)+200);
  });

  /* ── 5. PHOTO ERROR ─────────────────────── */
  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', () => img.classList.add('err'));
  });

  /* ── 6. COUNTER ─────────────────────────── */
  const cntObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const target = parseInt(e.target.dataset.count);
      const dur = 1400, start = performance.now();
      (function step(now) {
        const p = Math.min((now-start)/dur, 1);
        e.target.textContent = Math.round((1-Math.pow(1-p,3))*target);
        if (p<1) requestAnimationFrame(step);
      })(start);
      cntObs.unobserve(e.target);
    });
  }, { threshold:0.5 });
  document.querySelectorAll('[data-count]').forEach(el => cntObs.observe(el));

  /* ── 7. HERO PARALLAX ───────────────────── */
  const heroWords = document.querySelectorAll('.hero-word');
  const badge     = document.getElementById('heroBadge');
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    heroWords.forEach((w,i) => { w.style.transform = `translateY(${y*(i%2===0?.14:-.14)}px)`; });
    if (badge) badge.style.transform = `translateY(${y*.08}px)`;
  }, { passive:true });

  /* ── 8. SMOOTH SCROLL ───────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const t = document.querySelector(a.getAttribute('href'));
      if (!t) return;
      e.preventDefault();
      t.scrollIntoView({ behavior:'smooth' });
    });
  });

  /* ════════════════════════════════════════
     9. PROJECT CAROUSEL
  ════════════════════════════════════════ */
  const track    = document.getElementById('projTrack');
  const dots     = document.querySelectorAll('.proj-dot');
  const btnPrev  = document.getElementById('projPrev');
  const btnNext  = document.getElementById('projNext');

  if (!track) return;

  // Project data for modal
  const projects = [
    {
      num: '01',
      title: 'ระบบติดตามอุปกรณ์เครือข่าย',
      tags: ['Figma','Netwatch','Telegram API','Script'],
      desc: 'ออกแบบ UI/UX ของระบบติดตามสถานะอุปกรณ์เครือข่ายด้วย Figma พัฒนาสคริปต์ใน Winbox เพื่อตรวจจับสถานะอุปกรณ์ และสร้างระบบแจ้งเตือนผ่าน Telegram รองรับการแจ้งเตือนแบบ Real-time รายวัน และรายเดือน ทำงานร่วมกับทีม 2 คน',
      img: 'proj1.jpg',
      link: '#',
      ph: 'pc-ph1'
    },
    {
      num: '02',
      title: 'UX/UI Design Portfolio',
      tags: ['Figma','Wireframing','Prototyping','User Flow'],
      desc: 'ออกแบบ Interface สำหรับโปรเจ็คต่างๆ ด้วย Figma ครอบคลุมตั้งแต่การทำ Wireframe, User Flow, Interactive Prototype จนถึง Handoff ให้ทีม Developer โดยเน้นหลักการ User-Centered Design',
      img: 'proj2.jpg',
      link: '#',
      ph: 'pc-ph2'
    },
    {
      num: '03',
      title: 'เว็บไซต์ Responsive',
      tags: ['HTML5','CSS3','JavaScript','Responsive'],
      desc: 'พัฒนาเว็บไซต์ด้วย HTML5, CSS3 และ JavaScript รองรับการแสดงผลบนทุกอุปกรณ์ทั้ง Desktop, Tablet และ Mobile โดยใช้หลักการ Responsive Web Design และ Mobile-First approach',
      img: 'proj3.jpg',
      link: '#',
      ph: 'pc-ph3'
    },
    {
      num: '04',
      title: 'ระบบฐานข้อมูล',
      tags: ['MySQL','SQL','Database Design'],
      desc: 'ออกแบบและพัฒนาระบบจัดการฐานข้อมูลด้วย MySQL ครอบคลุมการออกแบบ Entity Relationship Diagram (ERD), การเขียน SQL Queries และการ Optimize ประสิทธิภาพการเรียกข้อมูล',
      img: 'proj4.jpg',
      link: '#',
      ph: 'pc-ph4'
    },
    {
      num: '05',
      title: 'Telegram Notification Bot',
      tags: ['Telegram API','Winbox Script','Automation'],
      desc: 'พัฒนาระบบแจ้งเตือนอัตโนมัติผ่าน Telegram สำหรับระบบ Monitoring โดยใช้ Scheduler ให้รันสคริปต์ตามเวลาที่กำหนด รองรับการแจ้งเตือน 3 รูปแบบ: แบบ Real-time เมื่ออุปกรณ์มีปัญหา, สรุปรายวัน และสรุปรายเดือน',
      img: 'proj5.jpg',
      link: '#',
      ph: 'pc-ph5'
    },
    {
      num: '06',
      title: 'ออกแบบภาพโปรโมชั่น',
      tags: ['Graphic Design','Marketing','Visual Design'],
      desc: 'สร้างสรรค์ภาพสินค้าและภาพโปรโมชั่นเพื่อใช้ในแคมเปญการขายระหว่างทำงานที่ Mini Big C จังหวัดชลบุรี ออกแบบให้ดึงดูดสายตาลูกค้าและสื่อสารโปรโมชั่นได้ชัดเจน',
      img: 'proj6.jpg',
      link: '#',
      ph: 'pc-ph6'
    }
  ];

  /* ── Drag-to-scroll ── */
  let isDown = false, startX = 0, scrollLeft = 0;
  track.addEventListener('pointerdown', e => {
    isDown = true; startX = e.pageX - track.offsetLeft; scrollLeft = track.scrollLeft;
    track.classList.add('grabbing'); track.setPointerCapture(e.pointerId);
  });
  track.addEventListener('pointerup',    () => { isDown = false; track.classList.remove('grabbing'); });
  track.addEventListener('pointerleave', () => { isDown = false; track.classList.remove('grabbing'); });
  track.addEventListener('pointermove',  e => {
    if (!isDown) return;
    e.preventDefault();
    const x    = e.pageX - track.offsetLeft;
    const walk = (x - startX) * 1.3;
    track.scrollLeft = scrollLeft - walk;
  });

  /* ── Dot update on scroll ── */
  function getCardWidth() {
    const card = track.querySelector('.proj-card');
    if (!card) return 280;
    return card.offsetWidth + parseInt(getComputedStyle(track).gap||24);
  }

  function updateDots() {
    const idx = Math.round(track.scrollLeft / getCardWidth());
    dots.forEach((d,i) => d.classList.toggle('active', i === idx));
  }
  track.addEventListener('scroll', updateDots, { passive:true });

  /* ── Arrow buttons ── */
  function scrollTo(dir) {
    track.scrollBy({ left: dir * getCardWidth(), behavior:'smooth' });
  }
  if (btnPrev) btnPrev.addEventListener('click', () => scrollTo(-1));
  if (btnNext) btnNext.addEventListener('click', () => scrollTo(1));

  /* ── Dot click ── */
  dots.forEach(d => {
    d.addEventListener('click', () => {
      track.scrollTo({ left: parseInt(d.dataset.i) * getCardWidth(), behavior:'smooth' });
    });
  });

  /* ════════════════════════════════════════
     10. PROJECT MODAL
  ════════════════════════════════════════ */
  const modal         = document.getElementById('projModal');
  const modalBackdrop = document.getElementById('modalBackdrop');
  const modalClose    = document.getElementById('modalClose');
  const modalImg      = document.getElementById('modalImg');
  const modalPh       = document.getElementById('modalPh');
  const modalNum      = document.getElementById('modalNum');
  const modalTitle    = document.getElementById('modalTitle');
  const modalTags     = document.getElementById('modalTags');
  const modalDesc     = document.getElementById('modalDesc');
  const modalLink     = document.getElementById('modalLink');

  function openModal(idx) {
    const p = projects[idx];
    if (!p || !modal) return;

    // Populate
    modalNum.textContent   = p.num;
    modalTitle.textContent = p.title;
    modalDesc.textContent  = p.desc;
    modalLink.href         = p.link;
    modalTags.innerHTML    = p.tags.map(t => `<span>${t}</span>`).join('');

    // Image
    modalImg.src = p.img;
    modalImg.alt = p.title;
    modalImg.classList.remove('err');
    modalPh.className = 'modal-img-ph ' + p.ph;
    modalImg.onerror = () => {
      modalImg.classList.add('err');
      modalPh.style.display = 'flex';
    };

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  // Card click — only if not dragging
  let dragDist = 0;
  track.addEventListener('pointerdown', e => { dragDist = e.pageX; });
  track.addEventListener('pointerup',   e => { dragDist = Math.abs(e.pageX - dragDist); });

  document.querySelectorAll('.proj-card').forEach(card => {
    card.addEventListener('click', () => {
      if (dragDist > 8) return; // was a drag, not a tap
      openModal(parseInt(card.dataset.idx));
    });
  });

  if (modalClose)    modalClose.addEventListener('click', closeModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

})();