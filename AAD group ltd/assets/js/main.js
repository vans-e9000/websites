(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var gsap = window.gsap;
  var ScrollTrigger = window.ScrollTrigger;
  var Lenis = window.Lenis;
  var hasGSAP = !!(gsap && ScrollTrigger);

  /* Mobile navigation */
  var toggle = document.querySelector(".menu-toggle");
  var mobileNav = document.getElementById("mobile-nav");
  var header = document.querySelector(".site-header");

  /* Nested scrolling inside the open menu stays native, not captured by Lenis */
  if (mobileNav) {
    mobileNav.setAttribute("data-lenis-prevent", "");
  }

  function closeMenu() {
    if (!mobileNav) {
      return;
    }
    mobileNav.classList.remove("is-open");
    if (toggle) {
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open menu");
    }
  }

  /* Header: retreats while the page is read downwards, returns on the way up */
  var headerHidden = false;

  function setHeaderHidden(hidden) {
    if (!header || hidden === headerHidden) {
      return;
    }
    headerHidden = hidden;
    header.classList.toggle("is-hidden", hidden);
    if (hidden) {
      closeMenu();
    }
  }

  if (header) {
    var hideAfter = 120;
    var lastHeaderScroll = window.scrollY;

    window.addEventListener(
      "scroll",
      function () {
        var y = window.scrollY;
        var delta = y - lastHeaderScroll;

        if (y <= hideAfter) {
          lastHeaderScroll = y;
          setHeaderHidden(false);
          return;
        }

        /* The 8px dead zone stops small jitters from flickering the bar */
        if (delta > 8) {
          lastHeaderScroll = y;
          setHeaderHidden(true);
        } else if (delta < -8) {
          lastHeaderScroll = y;
          setHeaderHidden(false);
        }
      },
      { passive: true }
    );

    /* Keyboard focus always brings the bar back into view */
    header.addEventListener("focusin", function () {
      setHeaderHidden(false);
    });
  }

  if (toggle && mobileNav) {
    toggle.addEventListener("click", function () {
      setHeaderHidden(false);
      var open = mobileNav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });

    mobileNav.addEventListener("click", function (event) {
      if (event.target.closest("a")) {
        closeMenu();
      }
    });

    /* Leaving the collapsed layout closes the menu, so its state never leaks into the desktop bar */
    window.addEventListener(
      "resize",
      function () {
        if (window.innerWidth >= 992) {
          closeMenu();
        }
      },
      { passive: true }
    );

    /* The menu closes as soon as the page scrolls, at any width */
    var lastScroll = window.scrollY;

    window.addEventListener(
      "scroll",
      function () {
        var y = window.scrollY;
        var moved = Math.abs(y - lastScroll);
        lastScroll = y;

        if (moved > 8 && mobileNav.classList.contains("is-open")) {
          closeMenu();
        }
      },
      { passive: true }
    );
  }

  /* Lenis smooth scrolling, driven from the GSAP ticker so the two never drift apart */
  if (Lenis && !reduceMotion) {
    var lenis = new Lenis({
      lerp: 0.09,
      smoothWheel: true,
      syncTouch: false
    });

    document.documentElement.classList.add("lenis-active");

    if (hasGSAP) {
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(function (time) {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    } else {
      window.requestAnimationFrame(function raf(time) {
        lenis.raf(time);
        window.requestAnimationFrame(raf);
      });
    }
  }

  /* Reveal fallback: plain CSS transition, used when GSAP is unavailable or motion is reduced */
  var revealTargets = document.querySelectorAll("[data-reveal]");

  function observeReveals() {
    if (reduceMotion || !("IntersectionObserver" in window)) {
      Array.prototype.forEach.call(revealTargets, function (el) {
        el.classList.add("is-visible");
      });
      return;
    }

    var observerRunning = false;

    var observer = new IntersectionObserver(
      function (entries) {
        observerRunning = true;
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );

    Array.prototype.forEach.call(revealTargets, function (el) {
      el.classList.add("reveal");
      observer.observe(el);
    });

    /* If the observer never reports, show everything rather than hide content */
    window.setTimeout(function () {
      if (observerRunning) {
        return;
      }
      Array.prototype.forEach.call(revealTargets, function (el) {
        el.classList.add("is-visible");
        observer.unobserve(el);
      });
    }, 1200);
  }

  /* GSAP motion: skipped in background tabs, so nothing is ever left mid-animation */
  var motionStarted = false;

  function startMotion() {
    if (motionStarted || !hasGSAP || reduceMotion) {
      return;
    }
    motionStarted = true;

    if (revealTargets.length) {
      gsap.set(revealTargets, { y: 30, autoAlpha: 0 });

      ScrollTrigger.batch(revealTargets, {
        start: "top 88%",
        once: true,
        onEnter: function (batch) {
          gsap.to(batch, {
            y: 0,
            autoAlpha: 1,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.08,
            overwrite: true
          });
        }
      });

      /* Anything already in view must never stay blank if a trigger is missed */
      window.setTimeout(function () {
        Array.prototype.forEach.call(revealTargets, function (el) {
          if (
            el.getBoundingClientRect().top < window.innerHeight &&
            gsap.getProperty(el, "opacity") < 1
          ) {
            gsap.set(el, { y: 0, autoAlpha: 1 });
          }
        });
      }, 2200);
    }

    /* Opening sequence: hero copy settles, banner panel eases in behind it */
    var heroCopy = document.querySelectorAll(
      ".hero .eyebrow, .hero h1, .hero .lead, .hero .btn-row, .hero .hero-note, .page-hero .eyebrow, .page-hero h1, .page-hero .lead, .page-hero .tag-row"
    );

    if (heroCopy.length) {
      gsap.from(heroCopy, {
        y: 28,
        autoAlpha: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.09,
        delay: 0.08
      });

      /* Safety: if the opening frame never renders, the copy is still readable */
      window.setTimeout(function () {
        Array.prototype.forEach.call(heroCopy, function (el) {
          if (gsap.getProperty(el, "opacity") < 1) {
            gsap.set(el, { clearProps: "all" });
          }
        });
      }, 2600);
    }

    var heroMedia = document.querySelectorAll(
      ".hero .hero-media, main > .container > .media"
    );

    if (heroMedia.length) {
      gsap.from(heroMedia, {
        autoAlpha: 0,
        y: 24,
        duration: 1.15,
        ease: "power3.out",
        delay: 0.24
      });
    }

    /* Slow image drift on the large editorial frames; project cards keep their hover zoom */
    gsap.utils
      .toArray(".hero-media .media img, .split-media .media img, main > .container > .media img")
      .forEach(function (img) {
        gsap.fromTo(
          img,
          { yPercent: -3.5, scale: 1.08 },
          {
            yPercent: 3.5,
            scale: 1.08,
            ease: "none",
            scrollTrigger: {
              trigger: img.parentElement,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.6
            }
          }
        );
      });

    /* Integers: the step numbers count up when they reach the viewport */
    gsap.utils.toArray(".step-num").forEach(function (el) {
      var raw = (el.textContent || "").trim();
      var target = parseInt(raw, 10);

      if (!raw || isNaN(target)) {
        return;
      }

      var pad = raw.length;

      ScrollTrigger.create({
        trigger: el,
        start: "top 92%",
        once: true,
        onEnter: function () {
          var counter = { value: 0 };
          el.textContent = String(0).padStart(pad, "0");

          gsap.to(counter, {
            value: target,
            duration: 0.85,
            ease: "power2.out",
            snap: { value: 1 },
            onUpdate: function () {
              el.textContent = String(Math.round(counter.value)).padStart(pad, "0");
            }
          });
        }
      });
    });

    /* Icons: feature-list ticks draw themselves in as each list is reached */
    var checkPaths = gsap.utils.toArray(".feature-list svg path");

    if (checkPaths.length) {
      ScrollTrigger.batch(checkPaths, {
        start: "top 92%",
        once: true,
        onEnter: function (batch) {
          batch.forEach(function (path) {
            var len = path.getTotalLength ? path.getTotalLength() : 0;

            if (!len) {
              return;
            }

            gsap.set(path, {
              strokeDasharray: len + " " + len,
              strokeDashoffset: len
            });
          });

          gsap.to(batch, {
            strokeDashoffset: 0,
            duration: 0.5,
            ease: "power2.out",
            stagger: 0.06,
            overwrite: true
          });
        }
      });
    }

    /* Fonts and images settle late on these pages; re-measure once they are in */
    window.addEventListener("load", function () {
      ScrollTrigger.refresh();
    });
  }

  if (revealTargets.length) {
    if (!hasGSAP || reduceMotion) {
      observeReveals();
    }
  }

  if (hasGSAP && !reduceMotion) {
    if (document.hidden) {
      document.addEventListener("visibilitychange", function () {
        if (!document.hidden) {
          startMotion();
        }
      });
    } else {
      startMotion();
    }
  }

  /* Current year in footer */
  var yearEls = document.querySelectorAll("[data-year]");
  yearEls.forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  /* Forms: validate, then hand the enquiry to the team's mailbox */
  document.querySelectorAll("form[data-enquiry]").forEach(function (form) {
    var status = form.querySelector(".form-status");
    var submit = form.querySelector('[type="submit"]');

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      if (!form.reportValidity()) {
        return;
      }

      var data = new FormData(form);
      var lines = [];
      var subjectParts = [];

      data.forEach(function (value, key) {
        var label = form.querySelector('[name="' + key + '"]');
        var fieldLabel = label && label.dataset.label ? label.dataset.label : key;
        var text = String(value).trim();

        if (!text) {
          return;
        }

        if (key === "name" || key === "project_type") {
          subjectParts.push(text);
        }

        lines.push(fieldLabel + ": " + text);
      });

      var subject =
        form.dataset.subject +
        (subjectParts.length ? " - " + subjectParts.join(", ") : "");
      var body = lines.join("\n") + "\n\nSent from the AAD Group (T) Limited website.";

      if (status) {
        status.textContent =
          "Your email app opens with the enquiry filled in. Send it to reach our estimating team, or call +255 756 565 623.";
        status.classList.add("is-visible");
        status.classList.remove("is-error");
      }

      if (submit) {
        submit.disabled = false;
      }

      window.location.href =
        "mailto:aadgroup24@gmail.com?subject=" +
        encodeURIComponent(subject) +
        "&body=" +
        encodeURIComponent(body);
    });
  });
})();
