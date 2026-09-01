// Nav scroll shadow
window.addEventListener('scroll', () => {
  document.querySelector('nav')?.classList.toggle('scrolled', window.scrollY > 20);
});

// Mobile menu toggle
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });
  // Close on link click
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => mobileMenu.classList.remove('open'));
  });
}

// Set active nav link
const currentPath = window.location.pathname;
document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(a => {
  const href = a.getAttribute('href');
  if (href === currentPath || (currentPath === '/' && href === 'index.html') ||
      (href !== 'index.html' && href !== '/' && currentPath.includes(href.replace('.html','')))) {
    a.classList.add('active');
  }
});

// Contact form (Formspree-ready)
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const success = document.getElementById('form-success');
    btn.textContent = 'Sending...';
    btn.disabled = true;

    const formspreeEndpoint = form.getAttribute('action');
    if (formspreeEndpoint && formspreeEndpoint.includes('formspree')) {
      try {
        const res = await fetch(formspreeEndpoint, {
          method: 'POST',
          body: new FormData(form),
          headers: { 'Accept': 'application/json' }
        });
        if (res.ok) {
          form.reset();
          if (success) { success.style.display = 'block'; }
          btn.textContent = 'Sent!';
        } else {
          btn.textContent = 'Error — try emailing directly';
          btn.disabled = false;
        }
      } catch {
        btn.textContent = 'Error — please email directly';
        btn.disabled = false;
      }
    } else {
      // Demo mode — just show success
      setTimeout(() => {
        form.reset();
        if (success) { success.style.display = 'block'; }
        btn.textContent = 'Sent!';
      }, 800);
    }
  });
}

// ─────────────────────────────────────────────
// Scroll reveal — sections fade up as you scroll
// ─────────────────────────────────────────────
(function () {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced || !('IntersectionObserver' in window)) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        io.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.1 });

  const blocks = document.querySelectorAll('main section, main .intro-band, main .page-hero, .footer-profiles');
  blocks.forEach((block) => {
    // The video hero has its own entrance animation
    if (block.classList.contains('video-hero')) return;

    const container = block.querySelector('.container');
    const items = container ? Array.from(container.children) : [block];
    items.forEach((el, i) => {
      el.classList.add('reveal-item');
      // Stagger: each child arrives ~90ms after the previous (capped)
      el.style.setProperty('--rd', Math.min(i * 90, 450) + 'ms');
      io.observe(el);
    });
  });
})();

// ─────────────────────────────────────────────
// Counting stats — numbers count up when the
// dark stats band scrolls into view
// ─────────────────────────────────────────────
(function () {
  const numbers = document.querySelectorAll('.intro-stat .number');
  if (!numbers.length) return;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced || !('IntersectionObserver' in window)) return;

  const animateCount = (el) => {
    const raw = el.textContent.trim();          // e.g. "4+", "2", "100%"
    const match = raw.match(/^([\d.]+)(.*)$/);
    if (!match) return;
    const target = parseFloat(match[1]);
    const decimals = (match[1].split('.')[1] || '').length;
    const suffix = match[2] || '';
    const duration = 1400;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out
      el.textContent = (target * eased).toFixed(decimals) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.6 });

  numbers.forEach((n) => io.observe(n));
})();
