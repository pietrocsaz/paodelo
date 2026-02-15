document.addEventListener('DOMContentLoaded', () => {
  // Year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Smooth internal links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) target.scrollIntoView({behavior: 'smooth', block: 'start'});
      }
    });
  });

  // Mobile menu toggle
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');
  if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
      nav.classList.toggle('open');
      hamburger.classList.toggle('open');
    });
  }

  // Reveal on scroll (IntersectionObserver)
  const reveals = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        obs.unobserve(entry.target);
      }
    });
  }, {threshold: 0.12});
  reveals.forEach(r => io.observe(r));

  // Parallax hero background (subtle)
  const parallax = document.querySelector('[data-parallax]');
  if (parallax) {
    window.addEventListener('scroll', () => {
      const sc = window.scrollY * 0.18;
      parallax.style.transform = `translateY(${sc}px)`;
    }, {passive: true});
  }

  // Ensure external instagram links open safely
  document.querySelectorAll('a[href*="instagram.com"], a[href*="wa.me"]').forEach(a => {
    a.setAttribute('target', '_blank');
    a.setAttribute('rel', 'noopener noreferrer');
  });

  // Hover micro animation for buttons (keyboard accessible)
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') btn.classList.add('active');
    });
    btn.addEventListener('keyup', () => btn.classList.remove('active'));
  });
});

// Lightweight helper: update active nav based on scroll position
window.addEventListener('scroll', () => {
  const links = document.querySelectorAll('.nav a');
  const fromTop = window.scrollY + 120;
  links.forEach(link => {
    const hash = link.getAttribute('href');
    if (!hash || !hash.startsWith('#')) return;
    const section = document.querySelector(hash);
    if (!section) return;
    if (section.offsetTop <= fromTop && section.offsetTop + section.offsetHeight > fromTop) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}, {passive: true});
