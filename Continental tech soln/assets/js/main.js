(function () {
  "use strict";

  var doc = document;
  var root = doc.documentElement;

  function initHeaderScroll() {
    var header = doc.querySelector(".site-header");
    if (!header) return;

    var toggle = doc.querySelector("[data-nav-toggle]");
    var gsap = window.gsap;
    var hidden = false;
    var lastY = window.scrollY;

    function setCondensed(y) {
      header.classList.toggle("is-condensed", y > 24);
    }

    function showHeader() {
      if (!hidden) return;
      hidden = false;
      if (gsap) {
        gsap.to(header, { yPercent: 0, duration: 0.32, ease: "power2.out", overwrite: "auto" });
      } else {
        header.classList.remove("is-hidden");
      }
    }

    function hideHeader() {
      if (hidden) return;
      hidden = true;
      if (gsap) {
        gsap.to(header, { yPercent: -100, duration: 0.32, ease: "power2.in", overwrite: "auto" });
      } else {
        header.classList.add("is-hidden");
      }
    }

    function update(y) {
      y = (typeof y === "number") ? y : window.scrollY;
      var panelOpen = toggle && toggle.getAttribute("aria-expanded") === "true";

      setCondensed(y);

      if (panelOpen || y < 120) {
        showHeader();
      } else if (y > lastY + 6) {
        hideHeader();
      } else if (y < lastY - 6) {
        showHeader();
      }

      lastY = y;
    }

    // Prefer Lenis scroll events (smooth scroll swallows native ones).
    var lenis = window.lenis;
    if (lenis && typeof lenis.on === "function") {
      lenis.on("scroll", function () {
        update(window.lenis ? window.lenis.scroll : window.scrollY);
      });
    } else {
      var ticking = false;
      function onScroll() {
        if (ticking) return;
        ticking = true;
        window.requestAnimationFrame(function () { ticking = false; update(); });
      }
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    window.addEventListener("resize", function () { update(); });
    update();
  }

  function initFaq() {
    var groups = doc.querySelectorAll(".faq");
    if (!groups.length) return;

    groups.forEach(function (group) {
      var items = Array.prototype.slice.call(group.querySelectorAll("details"));
      items.forEach(function (item) {
        item.addEventListener("toggle", function () {
          if (!item.open) return;
          items.forEach(function (other) {
            if (other !== item && other.open) other.open = false;
          });
        });
      });
    });
  }

  function initCounters() {
    var values = doc.querySelectorAll("[data-count]");
    if (!values.length) return;

    var reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    function settle(element) {
      element.textContent = element.getAttribute("data-count");
    }

    if (reduced.matches || !("IntersectionObserver" in window)) {
      values.forEach(settle);
      return;
    }

    function run(element) {
      var target = parseFloat(element.getAttribute("data-count"));
      if (isNaN(target)) {
        settle(element);
        return;
      }

      var started = null;
      var duration = 900;

      function step(now) {
        if (started === null) started = now;
        var progress = Math.min((now - started) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        element.textContent = String(Math.round(target * eased));
        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          settle(element);
        }
      }

      window.requestAnimationFrame(step);
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          observer.unobserve(entry.target);
          run(entry.target);
        });
      },
      { threshold: 0.4 }
    );

    values.forEach(function (element) {
      element.textContent = "0";
      observer.observe(element);
    });
  }

  function initNav() {
    var toggle = doc.querySelector("[data-nav-toggle]");
    var panel = doc.querySelector("[data-nav-panel]");
    if (!toggle || !panel) return;

    function setOpen(open) {
      toggle.setAttribute("aria-expanded", String(open));
      panel.setAttribute("data-open", String(open));
      toggle.querySelector("[data-nav-label]").textContent = open ? "Close" : "Menu";
      var header = doc.querySelector(".site-header");
      if (open && header) header.classList.remove("is-hidden");
    }

    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });

    panel.addEventListener("click", function (event) {
      if (event.target.closest("a")) setOpen(false);
    });

    // Close the open menu on a tap anywhere outside the header/nav.
    doc.addEventListener("click", function (event) {
      if (toggle.getAttribute("aria-expanded") !== "true") return;
      if (event.target.closest("[data-nav-toggle], [data-nav-panel]")) return;
      setOpen(false);
    });

    // Close the open menu as soon as the page starts scrolling.
    // (Lenis smooth-scroll swallows native `scroll` events, so poll.)
    var scrollRaf = null;
    var scrollStartY = 0;
    function stopScrollWatch() {
      if (scrollRaf) {
        window.clearTimeout(scrollRaf);
        scrollRaf = null;
      }
    }
    function watchScroll() {
      stopScrollWatch();
      if (toggle.getAttribute("aria-expanded") !== "true") return;
      scrollStartY = window.scrollY;
      function tick() {
        if (toggle.getAttribute("aria-expanded") !== "true") { stopScrollWatch(); return; }
        if (Math.abs(window.scrollY - scrollStartY) > 2) {
          setOpen(false);
          stopScrollWatch();
          return;
        }
        scrollRaf = window.setTimeout(tick, 60);
      }
      scrollRaf = window.setTimeout(tick, 60);
    }

    // Hook into setOpen to start/stop the watcher.
    var originalSetOpen = setOpen;
    setOpen = function (open) {
      originalSetOpen(open);
      if (open) watchScroll();
      else stopScrollWatch();
    };

    doc.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setOpen(false);
        toggle.focus();
      }
    });

    var desktop = window.matchMedia("(min-width: 921px)");
    var onChange = function (event) {
      if (event.matches) setOpen(false);
    };
    if (desktop.addEventListener) {
      desktop.addEventListener("change", onChange);
    } else {
      desktop.addListener(onChange);
    }
  }

  function initReveals() {
    var reveals = doc.querySelectorAll(".reveal");
    if (!reveals.length) return;

    var reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches || !("IntersectionObserver" in window)) {
      for (var i = 0; i < reveals.length; i++) reveals[i].classList.add("is-visible");
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );

    reveals.forEach(function (element) {
      observer.observe(element);
    });
  }

  function initForms() {
    var forms = doc.querySelectorAll("[data-mail-form]");
    if (!forms.length) return;

    var labels = {};
    forms.forEach(function (form) {
      var fields = form.querySelectorAll("[name]");
      fields.forEach(function (field) {
        var label = form.querySelector('label[for="' + field.id + '"]');
        if (!label) return;
        labels[field.name] = label.textContent.replace(/\s*\*+\s*$/, "").trim();
      });
    });

    forms.forEach(function (form) {
      var status = form.querySelector("[data-form-status]");
      var submit = form.querySelector('button[type="submit"]');

      form.addEventListener("submit", function (event) {
        event.preventDefault();

        var trap = form.querySelector('[name="website"]');
        if (trap && trap.value !== "") return;

        var values = [];
        new FormData(form).forEach(function (value, key) {
          if (key === "website") return;
          var text = String(value).trim();
          if (!text) return;
          values.push((labels[key] || key) + ": " + text);
        });

        var name = form.querySelector('[name="name"]');
        var subject =
          (form.getAttribute("data-subject") || "Website enquiry") +
          (name && name.value.trim() ? " from " + name.value.trim() : "");

        var address = form.getAttribute("data-mailto");
        var href =
          "mailto:" +
          address +
          "?subject=" +
          encodeURIComponent(subject) +
          "&body=" +
          encodeURIComponent(values.join("\n"));

        window.location.href = href;

        if (status) {
          status.innerHTML =
            "Your email application is opening with these details. If nothing opens, send the same information to " +
            '<a href="mailto:' +
            address +
            '">' +
            address +
            "</a> or call +255 757 996 058.";
        }

        if (submit) {
          submit.disabled = true;
          submit.textContent = "Details ready to send";
          window.setTimeout(function () {
            submit.disabled = false;
            submit.textContent = submit.getAttribute("data-label") || "Send request";
          }, 6000);
        }
      });
    });
  }

  function initYear() {
    var slot = doc.querySelector("[data-year]");
    if (slot) slot.textContent = String(new Date().getFullYear());
  }

  root.classList.add("js");
  initNav();
  initHeaderScroll();
  initFaq();
  initReveals();
  initCounters();
  initForms();
  initYear();
})();
