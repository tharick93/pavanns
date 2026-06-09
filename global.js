/* ============================================================
   DOMAINVERSE — Global JS
   Cursor, Particles, Scroll-Reveal, Navbar, Counters
   ============================================================ */

(function () {
  'use strict';

  /* ── Custom Cursor ── */
  const glow = document.querySelector('.cursor-glow');
  const ring = document.querySelector('.cursor-ring');
  if (glow && ring) {
    let mx = 0, my = 0, rx = 0, ry = 0;
    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      glow.style.left = mx + 'px'; glow.style.top = my + 'px';
    });
    (function animRing() {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
      requestAnimationFrame(animRing);
    })();
    document.querySelectorAll('a,button,.btn,.card').forEach(el => {
      el.addEventListener('mouseenter', () => {
        glow.style.width = '36px'; glow.style.height = '36px'; glow.style.opacity = '0.9';
        ring.style.width = '64px'; ring.style.height = '64px'; ring.style.opacity = '0.2';
      });
      el.addEventListener('mouseleave', () => {
        glow.style.width = '20px'; glow.style.height = '20px'; glow.style.opacity = '0.6';
        ring.style.width = '44px'; ring.style.height = '44px'; ring.style.opacity = '0.4';
      });
    });
    // Hide on mobile
    if ('ontouchstart' in window) {
      glow.style.display = 'none'; ring.style.display = 'none';
    }
  }

  /* ── Particle Canvas ── */
  const canvas = document.getElementById('particles-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    const W = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    W(); window.addEventListener('resize', W);

    class Particle {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.r = Math.random() * 1.6 + 0.4;
        this.alpha = Math.random() * 0.5 + 0.1;
        this.color = Math.random() > 0.6 ? '0,229,255' : '255,107,43';
      }
      update() {
        this.x += this.vx; this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color},${this.alpha})`;
        ctx.fill();
      }
    }

    for (let i = 0; i < 120; i++) particles.push(new Particle());

    function connectParticles() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0,229,255,${0.06 * (1 - d / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    }

    function loop() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => { p.update(); p.draw(); });
      connectParticles();
      requestAnimationFrame(loop);
    }
    loop();
  }

  /* ── Navbar scroll ── */
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    });
  }

  /* ── Active nav link ── */
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === path) a.classList.add('active');
  });

  /* ── Mobile menu ── */
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open');
      document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
    });
    mobileNav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ── Scroll Reveal ── */
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  if (revealEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => observer.observe(el));
  }

  /* ── Counter Animation ── */
  function animateCounter(el, target, duration = 2000) {
    let start = 0, step = target / (duration / 16);
    const isFloat = target % 1 !== 0;
    const timer = setInterval(() => {
      start = Math.min(start + step, target);
      el.textContent = isFloat ? start.toFixed(1) : Math.floor(start).toLocaleString();
      if (start >= target) clearInterval(timer);
    }, 16);
  }

  const counterEls = document.querySelectorAll('[data-counter]');
  if (counterEls.length) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting && !e.target.dataset.done) {
          e.target.dataset.done = '1';
          animateCounter(e.target, parseFloat(e.target.dataset.counter));
        }
      });
    }, { threshold: 0.5 });
    counterEls.forEach(el => obs.observe(el));
  }

  /* ── Typed text effect ── */
  const typedEl = document.querySelector('.typed-text');
  if (typedEl) {
    const words = typedEl.dataset.words ? JSON.parse(typedEl.dataset.words) : [];
    let wi = 0, ci = 0, deleting = false;
    function type() {
      const word = words[wi];
      typedEl.textContent = deleting ? word.slice(0, ci--) : word.slice(0, ci++);
      if (!deleting && ci > word.length) { setTimeout(() => { deleting = true; type(); }, 1800); return; }
      if (deleting && ci < 0) { deleting = false; wi = (wi + 1) % words.length; ci = 0; }
      setTimeout(type, deleting ? 60 : 110);
    }
    if (words.length) type();
  }

  /* ── Ripple effect on buttons ── */
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
      const r = document.createElement('span');
      r.style.cssText = `position:absolute;border-radius:50%;background:rgba(255,255,255,0.25);
        width:10px;height:10px;animation:ripple 0.6s ease-out;
        left:${e.offsetX}px;top:${e.offsetY}px;transform:translate(-50%,-50%);pointer-events:none;`;
      this.appendChild(r);
      setTimeout(() => r.remove(), 600);
    });
  });

  /* ── Smooth anchor ── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const t = document.querySelector(a.getAttribute('href'));
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });

  /* ── Toast notification ── */
  window.showToast = function (msg, type = 'success') {
    const t = document.createElement('div');
    t.className = `toast toast-${type}`;
    t.innerHTML = `<span>${type === 'success' ? '✓' : '✕'}</span> ${msg}`;
    t.style.cssText = `position:fixed;bottom:24px;right:24px;z-index:10000;
      padding:14px 22px;border-radius:12px;display:flex;align-items:center;gap:10px;
      font-family:'DM Sans',sans-serif;font-size:0.92rem;font-weight:500;
      background:${type === 'success' ? 'rgba(0,229,255,0.15)' : 'rgba(255,107,43,0.15)'};
      border:1px solid ${type === 'success' ? 'rgba(0,229,255,0.35)' : 'rgba(255,107,43,0.35)'};
      color:#f0f6ff;backdrop-filter:blur(12px);
      animation:fadeUp 0.4s ease,fadeIn 0.4s ease;`;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 3500);
  };

  /* ── Tab system ── */
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const group = btn.closest('[data-tab-group]');
      const target = btn.dataset.tab;
      group.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      group.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const panel = group.querySelector(`.tab-panel[data-panel="${target}"]`);
      if (panel) panel.classList.add('active');
    });
  });

})();