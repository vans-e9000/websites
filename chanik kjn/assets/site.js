/* ============================================================
   Chanika Kijani — shared site chrome + GSAP / Lenis experience
   Include this script immediately after <body> on EVERY page.
   It injects the nav, footer, loader and cursor, then runs the
   animation system on DOMContentLoaded.
   ============================================================ */
(function () {
    'use strict';

    /* ---------- motion preferences / gsap availability ---------- */
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasGsap = typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined';
    if (!hasGsap) document.documentElement.classList.add('no-anim');

    const currentPage = document.body.dataset.page || 'weddings';

    /* ---------- navigation model ---------- */
    const NAV_LINKS = [
        { page: 'gardens', sw: 'Bustani', en: 'Gardens', href: 'gardens.html' },
        { page: 'park', sw: 'Burudani', en: 'Amusement Park', href: 'amusement-park.html' },
        { page: 'weddings', sw: 'Harusi', en: 'Weddings & Events', href: 'index.html' },
        { page: 'dining', sw: 'Milo', en: 'Dining', href: 'dining.html' },
    ];
    const isActive = (page) => (page === currentPage ? ' text-gold nav-link-active' : '');

    /* ---------- shared chrome markup ---------- */
    const loaderHTML =
        '<div id="loader">' +
        '  <div class="loader-script">Chanika Kijani</div>' +
        '  <div class="loader-bar"><div class="loader-bar-inner"></div></div>' +
        '  <p class="text-[11px] uppercase tracking-[0.5em] text-white/40 font-light">Karibu • Welcome</p>' +
        '</div>' +
        '<div id="progress-bar"></div>' +
        '<div id="cursor-dot"></div>' +
        '<div id="cursor-ring"></div>' +
        '<div id="page-fade"></div>';

    const navHTML = `
<nav id="nav" class="fixed w-full z-[70] bg-deep-emerald/70 backdrop-blur-xl border-b border-gold/15">
  <div class="max-w-7xl mx-auto px-6 lg:px-10">
    <div class="flex justify-between items-center h-20">
      <a href="index.html" class="flex items-center gap-3 group">
        <span class="material-symbols-outlined text-gold text-3xl transition-transform duration-500 group-hover:rotate-45">eco</span>
        <span class="font-script text-3xl text-gold-2">Chanika Kijani</span>
      </a>
      <div class="hidden lg:flex items-center gap-9">
        ${NAV_LINKS.map(l => `<a href="${l.href}" class="nav-link text-white/75 hover:text-gold transition-colors text-[11px] uppercase tracking-[0.25em]${isActive(l.page)}">${l.sw} — ${l.en}</a>`).join('')}
        <a href="index.html#wasiliana" class="magnetic emerald-gradient text-white px-7 py-3 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] hover:shadow-[0_12px_30px_rgba(217,164,65,.35)] transition-shadow">Hifadhi Nafasi</a>
      </div>
      <button id="menu-btn" class="lg:hidden text-gold-2" aria-label="Open menu">
        <span class="material-symbols-outlined text-4xl">menu_open</span>
      </button>
    </div>
  </div>
</nav>`;

    const mobileHTML = `
<div id="mobile-menu" class="fixed inset-0 z-[80] emerald-gradient flex-col items-center justify-center gap-7 hidden">
  <button id="menu-close" class="absolute top-7 right-7 text-gold-2"><span class="material-symbols-outlined text-4xl">close</span></button>
  <p class="font-script text-3xl text-gold-2 mb-3">Chanika Kijani</p>
  ${NAV_LINKS.map(l => `<a href="${l.href}" data-mlink class="font-display text-3xl text-white hover:text-gold-2 transition-colors">${l.sw} — ${l.en}</a>`).join('')}
  <a href="index.html#wasiliana" data-mlink class="font-display text-2xl text-gold-2 transition-colors mt-3">Hifadhi Nafasi</a>
</div>`;

    const footerHTML = `
<footer class="bg-deep-emerald text-white pt-24 pb-10 relative overflow-hidden">
  <div class="kanga-stripes absolute top-0 left-0 right-0 h-1.5"></div>
  <div class="max-w-7xl mx-auto px-6 lg:px-10">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-14 lg:gap-20">
      <div>
        <div class="flex items-center gap-3 mb-6">
          <span class="material-symbols-outlined text-gold text-4xl">spa</span>
          <span class="font-script text-4xl text-gold-2">Chanika Kijani</span>
        </div>
        <p class="text-white/40 text-sm leading-relaxed font-light">
          Tanzania's premier eco-tourism destination — botanical gardens, thrilling rides, coastal dining, and eternal memories.
        </p>
      </div>
      <div>
        <h4 class="font-display text-xl italic mb-6 text-gold-2">Viungo / Pages</h4>
        <ul class="space-y-3 text-xs uppercase tracking-widest text-white/50">
          <li><a class="hover:text-gold transition-colors" href="index.html">Harusi — Weddings</a></li>
          <li><a class="hover:text-gold transition-colors" href="gardens.html">Bustani — Gardens</a></li>
          <li><a class="hover:text-gold transition-colors" href="amusement-park.html">Burudani — Park</a></li>
          <li><a class="hover:text-gold transition-colors" href="dining.html">Milo — Dining</a></li>
        </ul>
      </div>
      <div>
        <h4 class="font-display text-xl italic mb-6 text-gold-2">Matukio / Events</h4>
        <ul class="space-y-3 text-xs uppercase tracking-widest text-white/50">
          <li><a class="hover:text-gold transition-colors" href="index.html#vifurushi">Harusi — Weddings</a></li>
          <li><a class="hover:text-gold transition-colors" href="index.html#kumbi">Kumbi — Venues</a></li>
          <li><a class="hover:text-gold transition-colors" href="index.html#wasiliana">Corporate Retreats</a></li>
          <li><a class="hover:text-gold transition-colors" href="index.html#wasiliana">School Trips</a></li>
        </ul>
      </div>
      <div>
        <h4 class="font-display text-xl italic mb-6 text-gold-2">Wasiliana</h4>
        <div class="flex space-x-4 mb-8">
          <a class="w-12 h-12 rounded-full bg-emerald/30 flex items-center justify-center hover:bg-gold hover:text-deep-emerald transition-all duration-500 font-display text-xs font-bold" href="#" aria-label="Facebook">FB</a>
          <a class="w-12 h-12 rounded-full bg-emerald/30 flex items-center justify-center hover:bg-gold hover:text-deep-emerald transition-all duration-500 font-display text-xs font-bold" href="#" aria-label="Instagram">IG</a>
          <a class="w-12 h-12 rounded-full bg-emerald/30 flex items-center justify-center hover:bg-gold hover:text-deep-emerald transition-all duration-500 font-display text-xs font-bold" href="#" aria-label="TikTok">TT</a>
          <a class="w-12 h-12 rounded-full bg-emerald/30 flex items-center justify-center hover:bg-gold hover:text-deep-emerald transition-all duration-500 font-display text-xs font-bold" href="https://wa.me/255754123456" aria-label="WhatsApp">WA</a>
        </div>
        <p class="text-white/25 text-[10px] uppercase tracking-widest leading-relaxed">
          © 2026 Chanika Kijani Botanical Gardens<br/>Dar es Salaam, Tanzania<br/>
          <span class="text-gold/60">Made with upendo in Tanzania 🇹🇿</span>
        </p>
      </div>
    </div>
  </div>
</footer>
<button id="back-to-top" class="fixed bottom-6 right-6 z-[60] w-14 h-14 rounded-full emerald-gradient text-gold-2 flex items-center justify-center shadow-2xl opacity-0 pointer-events-none transition-all duration-500 hover:scale-110" aria-label="Back to top"><span class="material-symbols-outlined">arrow_upward</span></button>`;

    /* inject immediately (script sits right after <body>, before content parses) */
    document.body.insertAdjacentHTML('afterbegin', loaderHTML + navHTML + mobileHTML);
    document.body.insertAdjacentHTML('beforeend', footerHTML);

    /* if GSAP never loaded, hide the loader now so the page is usable */
    if (!hasGsap) {
        const ld = document.getElementById('loader');
        if (ld) ld.style.display = 'none';
    }

    /* ---------- global goTo ---------- */
    window.goTo = function (id) {
        const el = document.getElementById(id);
        if (!el) return;
        if (window.lenis) window.lenis.scrollTo(el, { offset: -60, duration: 1.4 });
        else el.scrollIntoView({ behavior: 'smooth' });
    };

    /* ============================================================
       ANIMATION SYSTEM — runs once the DOM is ready
       ============================================================ */
    function init() {
        const loader = document.getElementById('loader');

        /* ---------- no-GSAP fallback: show final states, skip all animation setup ---------- */
        if (!hasGsap) {
            document.querySelectorAll('[data-count]').forEach(el => {
                el.textContent = el.dataset.count + (el.dataset.suffix || '');
            });
            loader.style.display = 'none';
            return; // html.no-anim CSS already reveals [data-reveal] / [data-clip] / split words
        }

        /* ---------- Lenis smooth scroll ---------- */
        if (window.Lenis && hasGsap && !prefersReduced) {
            window.lenis = new Lenis({
                duration: 1.15,
                easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                smoothWheel: true,
            });
            window.lenis.on('scroll', ScrollTrigger.update);
            gsap.ticker.add(time => window.lenis.raf(time * 1000));
            gsap.ticker.lagSmoothing(0);
        }

        /* ---------- text splitting ---------- */
        document.querySelectorAll('[data-split]').forEach(el => {
            const words = el.textContent.trim().split(/\s+/);
            el.textContent = '';
            words.forEach(w => {
                const mask = document.createElement('span');
                mask.className = 'split-mask';
                const inner = document.createElement('span');
                inner.className = 'split-word';
                inner.textContent = w;
                mask.appendChild(inner);
                el.appendChild(mask);
                el.appendChild(document.createTextNode(' '));
            });
        });

        /* ---------- custom cursor ---------- */
        if (window.matchMedia('(pointer: fine)').matches && hasGsap && !prefersReduced) {
            document.body.classList.add('cursor-hidden');
            const dot = document.getElementById('cursor-dot');
            const ring = document.getElementById('cursor-ring');
            dot.style.opacity = '1';
            ring.style.opacity = '1';
            let mx = -100, my = -100, rx = -100, ry = -100;
            window.addEventListener('mousemove', e => {
                mx = e.clientX; my = e.clientY;
                dot.style.transform = 'translate(' + mx + 'px,' + my + 'px) translate(-50%,-50%)';
            });
            gsap.ticker.add(() => {
                rx += (mx - rx) * 0.16; ry += (my - ry) * 0.16;
                ring.style.transform = 'translate(' + rx + 'px,' + ry + 'px) translate(-50%,-50%)';
            });
            document.querySelectorAll('a, button, input, select, textarea, .gallery-item').forEach(el => {
                el.addEventListener('mouseenter', () => document.body.classList.add('cursor-active'));
                el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-active'));
            });
        }

        /* ---------- magnetic buttons ---------- */
        if (window.matchMedia('(pointer: fine)').matches && hasGsap && !prefersReduced) {
            document.querySelectorAll('.magnetic').forEach(btn => {
                const xTo = gsap.quickTo(btn, 'x', { duration: 0.4, ease: 'power3.out' });
                const yTo = gsap.quickTo(btn, 'y', { duration: 0.4, ease: 'power3.out' });
                btn.addEventListener('mousemove', e => {
                    const r = btn.getBoundingClientRect();
                    xTo((e.clientX - r.left - r.width / 2) * 0.22);
                    yTo((e.clientY - r.top - r.height / 2) * 0.22);
                });
                btn.addEventListener('mouseleave', () => { xTo(0); yTo(0); });
            });
        }

        /* ---------- anchor smooth scroll (same-page #links) ---------- */
        document.querySelectorAll('a[href^="#"]').forEach(a => {
            a.addEventListener('click', e => {
                const id = a.getAttribute('href');
                if (id && id.length > 1 && document.querySelector(id)) {
                    e.preventDefault();
                    goTo(id.slice(1));
                    closeMobile();
                }
            });
        });

        /* ---------- page transition (internal .html links) ---------- */
        document.addEventListener('click', e => {
            const a = e.target.closest('a[href$=".html"], a[href$=".html#"], a[href*=".html#"]');
            if (!a || a.target === '_blank' || a.getAttribute('rel') === 'noopener') return;
            const href = a.getAttribute('href');
            if (a.host && window.location.host && a.host !== window.location.host) return;
            e.preventDefault();
            const fade = document.getElementById('page-fade');
            fade.classList.add('fade-in');
            setTimeout(() => { window.location.href = href; }, 450);
        });

        /* ---------- mobile menu ---------- */
        const mobileMenu = document.getElementById('mobile-menu');
        window.openMobile = function () {
            mobileMenu.classList.remove('hidden');
            mobileMenu.classList.add('flex');
            if (!hasGsap) return;
            gsap.fromTo(mobileMenu.querySelectorAll('[data-mlink]'),
                { y: 40, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power3.out' });
        };
        window.closeMobile = function () {
            if (mobileMenu.classList.contains('hidden')) return;
            if (!hasGsap) { mobileMenu.classList.add('hidden'); mobileMenu.classList.remove('flex'); return; }
            gsap.to(mobileMenu, { opacity: 0, duration: 0.25, onComplete: () => {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('flex');
                gsap.set(mobileMenu, { opacity: 1, clearProps: 'opacity' });
            }});
        };
        document.getElementById('menu-btn').addEventListener('click', openMobile);
        document.getElementById('menu-close').addEventListener('click', closeMobile);

        /* ---------- nav hide / progress / back-to-top ---------- */
        const nav = document.getElementById('nav');
        const progressBar = document.getElementById('progress-bar');
        const backToTop = document.getElementById('back-to-top');
        let lastY = 0;
        window.addEventListener('scroll', () => {
            const y = window.scrollY;
            if (y > lastY && y > 240) nav.classList.add('nav-hidden');
            else if (y < lastY) nav.classList.remove('nav-hidden');
            lastY = y;
            const max = document.documentElement.scrollHeight - window.innerHeight;
            progressBar.style.width = (max > 0 ? (y / max) * 100 : 0) + '%';
            backToTop.classList.toggle('opacity-0', y <= 700);
            backToTop.classList.toggle('pointer-events-none', y <= 700);
        }, { passive: true });
        backToTop.addEventListener('click', () => goTo('nyumbani'));

        /* ---------- reveal helpers ---------- */
        gsap.utils.toArray('[data-reveal]').forEach(el => {
            if (prefersReduced) {
                el.style.opacity = '1';
                el.style.transform = 'none';
                return;
            }
            const delay = parseFloat(el.dataset.delay || 0);
            gsap.fromTo(el, { y: 56, opacity: 0 }, {
                y: 0, opacity: 1, duration: 1.1, ease: 'power3.out', delay,
                scrollTrigger: { trigger: el, start: 'top 88%' }
            });
        });

        gsap.utils.toArray('[data-clip]').forEach(el => {
            const img = el.querySelector('img');
            if (img && !prefersReduced) {
                gsap.fromTo(img, { scale: 1.35 }, {
                    scale: 1, duration: 1.5, ease: 'power3.out',
                    scrollTrigger: { trigger: el, start: 'top 85%' }
                });
            }
            if (!prefersReduced) {
                gsap.fromTo(el, { clipPath: 'inset(0 0 100% 0)' }, {
                    clipPath: 'inset(0 0 0% 0)', duration: 1.25, ease: 'power4.inOut',
                    scrollTrigger: { trigger: el, start: 'top 85%' }
                });
            } else {
                el.style.clipPath = 'none';
            }
        });

        gsap.utils.toArray('[data-parallax]').forEach(img => {
            const speed = parseFloat(img.dataset.parallax || 14);
            gsap.fromTo(img, { yPercent: -speed }, {
                yPercent: speed, ease: 'none',
                scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: true }
            });
        });

        gsap.utils.toArray('[data-count]').forEach(el => {
            if (prefersReduced) {
                el.textContent = el.dataset.count + (el.dataset.suffix || '');
                return;
            }
            const target = parseFloat(el.dataset.count);
            const suffix = el.dataset.suffix || '';
            const obj = { val: 0 };
            gsap.to(obj, {
                val: target, duration: 2.2, ease: 'power2.out', snap: { val: 1 },
                onUpdate: () => { el.textContent = Math.round(obj.val) + suffix; },
                scrollTrigger: { trigger: el, start: 'top 88%' }
            });
        });

        /* ---------- hero parallax (scrub) ---------- */
        if (hasGsap && !prefersReduced && document.querySelector('.hero-bg')) {
            gsap.to('.hero-bg', {
                yPercent: 18, ease: 'none',
                scrollTrigger: { trigger: '#nyumbani', start: 'top top', end: 'bottom top', scrub: true }
            });
            gsap.to('[data-hero-content]', {
                yPercent: -14, opacity: 0.1, ease: 'none',
                scrollTrigger: { trigger: '#nyumbani', start: 'top top', end: 'bottom 30%', scrub: true }
            });
        }

        /* ---------- loader + hero intro ---------- */
        let booted = false;
        function boot() {
            if (booted) return;
            booted = true;

            if (!hasGsap || prefersReduced) {
                loader.style.display = 'none';
                if (hasGsap) gsap.set('.split-word, .line-inner', { yPercent: 0 });
                return;
            }

            gsap.to('.loader-script', { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' });
            gsap.to('.loader-bar-inner', { scaleX: 1, duration: 1.1, ease: 'power2.inOut' });
            gsap.to('#loader', {
                yPercent: -100, duration: 0.85, ease: 'power4.inOut', delay: 0.5,
                onComplete: () => { loader.style.display = 'none'; }
            });

            gsap.timeline({ delay: 1.15 })
                .fromTo('.hero-bg', { scale: 1.18 }, { scale: 1, duration: 1.8, ease: 'power2.out' })
                .fromTo('[data-hero-eyebrow]', { yPercent: 115 }, { yPercent: 0, duration: 0.8, ease: 'power3.out' }, '-=1.2')
                .fromTo('.split-word', { yPercent: 115 }, { yPercent: 0, duration: 1.05, ease: 'power4.out', stagger: 0.06 }, '-=0.55')
                .fromTo('[data-hero-sub]', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }, '-=0.6')
                .fromTo('[data-hero-cta]', { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.12, ease: 'power2.out' }, '-=0.5')
                .fromTo('[data-hero-meta]', { opacity: 0 }, { opacity: 1, duration: 0.6 }, '-=0.3')
                .fromTo('.scroll-hint', { opacity: 0 }, { opacity: 1, duration: 0.6, delay: 0.3 }, '-=0.2');
        }
        window.addEventListener('load', () => setTimeout(boot, 300));
        setTimeout(boot, 4500);

        /* ---------- scroll to hash once loaded ---------- */
        if (window.location.hash && document.querySelector(window.location.hash)) {
            setTimeout(() => goTo(window.location.hash.slice(1)), 2000);
        }

        /* ---------- quote form (home page) ---------- */
        const form = document.getElementById('quote-form');
        if (form) {
            const formWrap = document.getElementById('quote-form-wrap');
            const success = document.getElementById('quote-success');
            form.addEventListener('submit', e => {
                e.preventDefault();
                if (!hasGsap) { formWrap.classList.add('hidden'); success.classList.remove('hidden'); success.classList.add('flex'); return; }
                gsap.to(formWrap, {
                    opacity: 0, y: -20, duration: 0.4, ease: 'power2.in',
                    onComplete: () => {
                        formWrap.classList.add('hidden');
                        success.classList.remove('hidden');
                        success.classList.add('flex');
                        gsap.fromTo(success, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' });
                        if (window.lenis) window.lenis.scrollTo(success, { offset: -120 });
                    }
                });
            });
            window.resetForm = function () {
                form.reset();
                success.classList.add('hidden');
                success.classList.remove('flex');
                formWrap.classList.remove('hidden');
                if (hasGsap) gsap.fromTo(formWrap, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' });
            };
        }
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
})();
