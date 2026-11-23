// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

function setNavOpen(open) {
  if (!navToggle || !navMenu) return;
  navToggle.classList.toggle('active', open);
  navMenu.classList.toggle('open', open);
  navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
}

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.contains('open');
    setNavOpen(!isOpen);
  });

  // Close menu when clicking a link
  const navLinks = navMenu.querySelectorAll('.nav-link, .nav-cta');
  navLinks.forEach(link => {
    link.addEventListener('click', () => setNavOpen(false));
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
      setNavOpen(false);
    }
  });

  // Close menu on Escape
  navToggle.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setNavOpen(false);
  });
}

// Navbar shadow (subtle, on scroll)
const navbar = document.getElementById('navbar');
if (navbar) {
  function applyNavShadow() {
    // minimal shadow per design spec; keep it quiet until scrolled
    navbar.style.boxShadow = window.scrollY > 20
      ? 'rgba(23, 23, 20, 0.08) 0px 3px 8px 0px'
      : 'none';
  }
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        applyNavShadow();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
  applyNavShadow();
}

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    const requiredFields = ['name', 'email', 'service', 'message'];
    let isValid = true;

    requiredFields.forEach(field => {
      const value = (data[field] || '').trim();
      const input = form.querySelector(`[name="${field}"]`);
      if (!value) {
        isValid = false;
        if (input) input.setAttribute('aria-invalid', 'true');
      } else {
        if (input) input.removeAttribute('aria-invalid');
      }
    });

    const emailInput = form.querySelector('[name="email"]');
    if (emailInput && data.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        isValid = false;
        emailInput.setAttribute('aria-invalid', 'true');
      }
    }

    if (!isValid) {
      // Focus the first invalid field for accessibility
      const firstInvalid = form.querySelector('[aria-invalid="true"]');
      if (firstInvalid) firstInvalid.focus();
      alert('Please complete all required fields correctly before submitting.');
      return;
    }

    // In a production build this would POST to a backend.
    alert('Thank you for your inquiry. Our team will respond within one business day.');
    form.reset();
  });
}

// Scroll reveal — IntersectionObserver, fires once, honors reduced motion
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion) {
  const observerOptions = {
    threshold: 0.12,
    rootMargin: '0px 0px -8% 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const animatedElements = document.querySelectorAll('.card, .project-card, .why-cell, .cert-card, .leader-card, .stat-item, .service-aside');
  animatedElements.forEach(el => {
    if (!el.classList.contains('is-visible')) {
      observer.observe(el);
    }
  });
} else {
  // Reduced motion: show everything immediately
  document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
}

// Console — production-only, no developer metadata
console.log('Angelique Construction Company Limited — live site');
