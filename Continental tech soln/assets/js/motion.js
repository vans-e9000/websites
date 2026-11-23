(function () {
  "use strict";

  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (prefersReduced.matches) return;
  if (typeof window.gsap === "undefined") return;

  var gsap = window.gsap;
  var ScrollTrigger = window.ScrollTrigger;
  if (ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

  var lenis = null;
  if (typeof window.Lenis !== "undefined" && ScrollTrigger) {
    lenis = new window.Lenis({
      lerp: 0.09,
      smoothWheel: true,
      syncTouch: false
    });

    lenis.on("scroll", ScrollTrigger.update);
    window.lenis = lenis;
    gsap.ticker.add(function (time) {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    Array.prototype.forEach.call(document.querySelectorAll('a[href^="#"]'), function (link) {
      var hash = link.getAttribute("href");
      if (!hash || hash === "#") return;
      var target = document.querySelector(hash);
      if (!target) return;
      link.addEventListener("click", function (event) {
        event.preventDefault();
        lenis.scrollTo(target, { offset: -92 });
      });
    });
  }

  var introSelector = ".hero-body > *, .page-hero .eyebrow, .page-hero .display, .page-hero .lead";

  if (document.visibilityState === "visible") {
    var introItems = document.querySelectorAll(introSelector);
    if (introItems.length) {
      gsap.from(introItems, {
        opacity: 0,
        y: 26,
        duration: 0.85,
        ease: "power3.out",
        stagger: 0.07,
        delay: 0.12,
        clearProps: "transform"
      });
    }
  }

  window.setTimeout(function () {
    Array.prototype.forEach.call(document.querySelectorAll(introSelector), function (el) {
      if (parseFloat(window.getComputedStyle(el).opacity) < 0.98) {
        el.style.opacity = "";
        el.style.transform = "";
      }
    });
  }, 2600);

  if (!ScrollTrigger) return;

  Array.prototype.forEach.call(document.querySelectorAll(".hero-bg img"), function (img) {
    var section = img.closest(".hero, .page-hero--media");
    gsap.fromTo(
      img,
      { yPercent: -5, scale: 1.12 },
      {
        yPercent: 5,
        ease: "none",
        scrollTrigger: {
          trigger: section || img,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      }
    );
  });

  var stills = document.querySelectorAll(".split-media img, .wide-media img, .feature-band img");
  Array.prototype.forEach.call(stills, function (img) {
    gsap.from(img, {
      scale: 1.07,
      duration: 1.15,
      ease: "power2.out",
      scrollTrigger: {
        trigger: img,
        start: "top 90%",
        once: true
      }
    });
  });

  var footer = document.querySelector(".site-footer");
  if (footer) {
    var wordmark = footer.querySelector(".footer-wordmark");
    if (wordmark) {
      gsap.fromTo(
        wordmark,
        { yPercent: 16 },
        {
          yPercent: 0,
          ease: "none",
          scrollTrigger: {
            trigger: footer,
            start: "top bottom",
            end: "bottom bottom",
            scrub: true
          }
        }
      );
    }

    var blocks = footer.querySelectorAll(".footer-brand, .footer-panel");
    if (blocks.length) {
      gsap.from(blocks, {
        y: 26,
        duration: 0.7,
        ease: "power2.out",
        stagger: 0.07,
        clearProps: "transform",
        scrollTrigger: {
          trigger: footer,
          start: "top 92%",
          once: true
        }
      });
    }
  }

  window.addEventListener("load", function () {
    ScrollTrigger.refresh();
  });
})();
