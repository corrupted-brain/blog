(function () {
  'use strict';

  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const themeToggle = document.getElementById('themeToggle');
  const filterButtons = document.querySelectorAll('.filter-btn');
  const activityCards = document.querySelectorAll('.activity-card');

  function closeMenu() {
    if (hamburger) hamburger.classList.remove('open');
    if (mobileMenu) mobileMenu.classList.remove('open');
  }

  window.closeMenu = closeMenu;

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    });

    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
        closeMenu();
      }
    });
  }

  document.querySelectorAll('.mobile-menu a[href^="#"]').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('kb-theme', theme);
    } catch (_) {}
  }

  function initTheme() {
    let theme = 'dark';
    try {
      const saved = localStorage.getItem('kb-theme');
      if (saved === 'light' || saved === 'dark') theme = saved;
      else if (window.matchMedia('(prefers-color-scheme: light)').matches) theme = 'light';
    } catch (_) {}
    applyTheme(theme);
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      applyTheme(current === 'dark' ? 'light' : 'dark');
    });
  }

  initTheme();

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;
      filterButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      activityCards.forEach((card) => {
        const type = card.dataset.type || 'other';
        const show = filter === 'all' || type === filter;
        card.classList.toggle('hidden', !show);
      });
    });
  });

  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('visible'));
  }

  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  if (sections.length && navLinks.length) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach((link) => {
              link.style.color = link.getAttribute('href') === '#' + id ? 'var(--accent)' : '';
            });
          }
        });
      },
      { threshold: 0.35, rootMargin: '-30% 0px -55% 0px' }
    );
    sections.forEach((section) => sectionObserver.observe(section));
  }
})();
