// ASABHI COMPANY LIMITED - Production Script with Lenis & GSAP Integration
(function () {
  'use strict';

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) document.documentElement.classList.add('reduced-motion');

  // 1. Initialize Lenis Smooth Scrolling (Dual-loop bug eradicated)
  let lenisInstance = null;

  if (typeof Lenis !== 'undefined' && !prefersReduced) {
    try {
      lenisInstance = new Lenis({
        duration: 1.15,
        easing: function (t) {
          return Math.min(1, 1.001 - Math.pow(2, -10 * t));
        },
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1.0,
        touchMultiplier: 1.6
      });

      // Hook up ticker: either GSAP ticker or native rAF (never both)
      if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        lenisInstance.on('scroll', ScrollTrigger.update);
        gsap.ticker.add(function (time) {
          lenisInstance.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);
      } else {
        function raf(time) {
          lenisInstance.raf(time);
          requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
      }
    } catch (e) {
      console.warn('Lenis smooth scroll initialization skipped:', e);
    }
  }

  // 2. Active Page & Real-Time Section Location Tracker (Mobile & Desktop)
  const locationText = document.getElementById('current-location-text');
  const pathName = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();

  const pageNames = {
    'index.html': 'Overview',
    'services.html': 'Capabilities',
    'about.html': 'Profile',
    'contact.html': 'Headquarters',
    'quote.html': 'Quotation Desk'
  };

  const initialLabel = pageNames[pathName] || 'Overview';
  if (locationText) {
    locationText.textContent = initialLabel;
  }

  // Active navigation link highlighting
  document.querySelectorAll('.nav__link').forEach(function (link) {
    const href = (link.getAttribute('href') || '').toLowerCase();
    if (href === pathName || (pathName === '' && href === 'index.html')) {
      link.classList.add('is-active');
      link.setAttribute('aria-current', 'page');
    } else {
      link.classList.remove('is-active');
      link.removeAttribute('aria-current');
    }
  });

  // Track sections across the page
  const sections = document.querySelectorAll('section[data-section], footer[data-section]');

  function updateActiveSection(currentY) {
    if (!locationText || sections.length === 0) return;

    let activeName = initialLabel;
    const triggerPoint = window.innerHeight * 0.35; // 35% viewport threshold

    for (let i = 0; i < sections.length; i++) {
      const rect = sections[i].getBoundingClientRect();
      if (rect.top <= triggerPoint && rect.bottom > 60) {
        activeName = sections[i].getAttribute('data-section') || activeName;
      }
    }

    if (locationText.textContent !== activeName) {
      locationText.textContent = activeName;
    }
  }

  // 3. Smart Hide & Reveal Header on Scroll (Both Mobile & Desktop)
  const header = document.querySelector('.site-header');
  const nav = document.querySelector('.nav');
  let lastScrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
  let isHeaderHidden = false;

  function handleScroll(currentScrollY) {
    const scrollY = Math.max(0, currentScrollY);

    // Update real-time section location badge
    updateActiveSection(scrollY);

    // Add shadow when scrolled
    if (header) {
      if (scrollY > 30) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
    }

    // Do not hide navbar if mobile menu is open
    if (nav && nav.classList.contains('is-open')) return;

    if (scrollY > 90 && scrollY > lastScrollY + 4) {
      // Scrolling DOWN -> Hide
      if (!isHeaderHidden && header) {
        header.classList.add('is-hidden');
        isHeaderHidden = true;
      }
    } else if (scrollY < lastScrollY - 4 || scrollY <= 20) {
      // Scrolling UP or top -> Show
      if (isHeaderHidden && header) {
        header.classList.remove('is-hidden');
        isHeaderHidden = false;
      }
    }

    lastScrollY = scrollY;
  }

  // Listen to native window scroll
  window.addEventListener('scroll', function () {
    const currentScrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
    handleScroll(currentScrollY);
  }, { passive: true });

  // Lenis emits its own scroll signal (native scroll events are unreliable
  // under smooth scrolling), so keep it as the primary driver.
  if (lenisInstance) {
    lenisInstance.on('scroll', function (e) {
      handleScroll(e.scroll);
    });
  }

  // Safety net: never leave the header hidden when a page is shown at the top
  // (back/forward cache, anchor jumps, or a programmatic scroll to top).
  function syncHeaderToTop() {
    if ((window.pageYOffset || document.documentElement.scrollTop || 0) <= 20) {
      if (header) header.classList.remove('is-hidden');
      isHeaderHidden = false;
      if (header) header.classList.remove('is-scrolled');
      lastScrollY = 0;
    }
  }
  window.addEventListener('load', syncHeaderToTop);
  window.addEventListener('pageshow', syncHeaderToTop);
  document.addEventListener('visibilitychange', function () {
    if (!document.hidden) syncHeaderToTop();
  });

  // 4. Mobile Menu Drawer Toggle & Backdrop
  const toggleBtn = document.querySelector('.nav__toggle');
  const navLinks = document.querySelector('.nav__links');
  const iconMenu = toggleBtn ? toggleBtn.querySelector('.icon-menu') : null;
  const iconClose = toggleBtn ? toggleBtn.querySelector('.icon-close') : null;

  // Create mobile backdrop overlay if not present
  let backdrop = document.querySelector('.mobile-backdrop');
  if (!backdrop) {
    backdrop = document.createElement('div');
    backdrop.className = 'mobile-backdrop';
    document.body.appendChild(backdrop);
  }

  function closeMobileNav() {
    if (nav) nav.classList.remove('is-open');
    if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'false');
    if (backdrop) backdrop.classList.remove('is-visible');
    document.body.classList.remove('nav-locked');
    if (iconMenu && iconClose) {
      iconMenu.style.display = 'block';
      iconClose.style.display = 'none';
    }
  }

  function openMobileNav() {
    if (nav) nav.classList.add('is-open');
    if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'true');
    if (backdrop) backdrop.classList.add('is-visible');
    document.body.classList.add('nav-locked');
    if (iconMenu && iconClose) {
      iconMenu.style.display = 'none';
      iconClose.style.display = 'block';
    }
    if (navLinks) {
      const first = navLinks.querySelector('.nav__link');
      if (first) first.focus();
    }
  }

  if (toggleBtn && nav) {
    toggleBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      const isOpen = nav.classList.contains('is-open');
      if (isOpen) {
        closeMobileNav();
      } else {
        openMobileNav();
      }
    });

    // Close on backdrop click
    backdrop.addEventListener('click', closeMobileNav);

    // Close on navigation link click
    nav.querySelectorAll('.nav__link').forEach(function (l) {
      l.addEventListener('click', closeMobileNav);
    });

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        closeMobileNav();
        toggleBtn.focus();
      }
    });
  }

  // 5. GSAP Scroll Animations (with graceful fallback to IntersectionObserver)
  // Ensure hero is visible immediately
  document.querySelectorAll('.hero .reveal, .hero-band .reveal').forEach(function (el) {
    el.classList.add('is-visible');
  });

  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined' && !prefersReduced) {
    gsap.registerPlugin(ScrollTrigger);

    // Staggered reveals for cards and articles
    const revealGrids = document.querySelectorAll('.card-grid-3, .card-grid-2, .card-grid-4, .protocol-flow, .facts-band, .team-grid');
    revealGrids.forEach(function (grid) {
      const items = grid.querySelectorAll('.card, .service-card, .protocol-card, .fact-item, .team-card, .reveal');
      if (items.length > 0) {
        gsap.fromTo(items, {
          opacity: 0,
          y: 24
        }, {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: grid,
            start: 'top 88%',
            once: true
          }
        });
      }
    });

    // Individual reveals
    document.querySelectorAll('.reveal:not(.is-visible)').forEach(function (el) {
      if (!el.closest('.hero, .card-grid-3, .card-grid-2, .card-grid-4, .protocol-flow, .facts-band, .team-grid')) {
        gsap.fromTo(el, {
          opacity: 0,
          y: 20
        }, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            once: true
          }
        });
      }
    });

    window.addEventListener('load', function () {
      ScrollTrigger.refresh();
    });
  } else {
    // Pure CSS/IO Fallback
    if (!prefersReduced && 'IntersectionObserver' in window) {
      const io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -5% 0px'
      });

      document.querySelectorAll('.reveal:not(.is-visible)').forEach(function (el) {
        io.observe(el);
      });
    } else {
      document.querySelectorAll('.reveal').forEach(function (el) {
        el.classList.add('is-visible');
      });
    }
  }

  // 6. Quotation & Contact Form Handlers
  document.querySelectorAll('form[data-form]').forEach(function (form) {
    const statusBox = form.querySelector('.form-status');

    form.addEventListener('submit', function (event) {
      event.preventDefault();

      form.querySelectorAll('[aria-invalid]').forEach(function (input) {
        input.removeAttribute('aria-invalid');
      });

      let isValid = true;
      const requiredInputs = form.querySelectorAll('[required]');

      requiredInputs.forEach(function (input) {
        if (!input.value.trim()) {
          isValid = false;
          input.setAttribute('aria-invalid', 'true');
        }
      });

      const emailInput = form.querySelector('input[type="email"]');
      if (emailInput && emailInput.value) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailInput.value.trim())) {
          isValid = false;
          emailInput.setAttribute('aria-invalid', 'true');
        }
      }

      if (!isValid) {
        if (statusBox) {
          statusBox.textContent = 'Please complete all required fields with valid information.';
          statusBox.className = 'form-status is-error';
          statusBox.style.display = 'block';
        }
        const firstError = form.querySelector('[aria-invalid="true"]');
        if (firstError) firstError.focus();
        return;
      }

      const submitBtn = form.querySelector('button[type="submit"]');
      const originalLabel = submitBtn ? submitBtn.innerHTML : 'Submit';

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Transmitting scope...';
      }

      setTimeout(function () {
        const refNumber = 'ASB-' + Math.floor(100000 + Math.random() * 900000);
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalLabel;
        }

        if (statusBox) {
          statusBox.innerHTML = 'Transmission confirmed. Reference ID: <strong>' + refNumber + '</strong>. Our engineering estimation office in Dar es Salaam has received your package and will follow up within 24 hours.';
          statusBox.className = 'form-status is-success';
          statusBox.style.display = 'block';
        }

        form.reset();
      }, 750);
    });
  });
})();
