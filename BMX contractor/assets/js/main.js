/* BMX Contractors Limited: navigation, scroll motion, quote form. */
(() => {
  "use strict";

  const root = document.documentElement;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("site-nav");

  /* ---------------- mobile menu ---------------- */

  const isOpen = () => nav && nav.classList.contains("is-open");

  const openNav = () => {
    nav.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
  };

  const closeNav = (returnFocus) => {
    if (!isOpen()) return;
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    if (returnFocus) toggle.focus();
  };

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      if (isOpen()) {
        closeNav(false);
      } else {
        openNav();
      }
    });

    nav.addEventListener("click", (event) => {
      if (event.target.closest("a")) closeNav(false);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && isOpen()) closeNav(true);
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth >= 980 && isOpen()) closeNav(false);
    });
  }

  /* ---------------- in-page anchors ---------------- */

  // Smooth jumps belong to anchor links only. Leaving scroll-behavior: smooth
  // on <html> also animated keyboard and space-bar scrolling, which felt laggy.
  document.addEventListener("click", (event) => {
    const link = event.target.closest && event.target.closest('a[href^="#"]');
    if (!link) return;
    const id = link.getAttribute("href").slice(1);
    if (!id) return;
    const target = document.getElementById(id);
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: reduced.matches ? "auto" : "smooth", block: "start" });
    if (link.classList.contains("skip-link")) {
      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    }
    if (window.history && window.history.pushState) {
      window.history.pushState(null, "", "#" + id);
    }
  });

  /* ---------------- header: hide on scroll down ---------------- */

  if (header) {
    let lastY = Math.max(0, window.scrollY);
    let openAt = 0;
    let queued = false;
    let travel = 0;
    let direction = 0;

    // Distances are accumulated so the header only moves for a deliberate
    // gesture. Reacting to a few pixels made it flip on trackpad jitter.
    const HIDE_AFTER = 96;
    const SHOW_AFTER = 56;

    const setHidden = (hidden) => {
      if (hidden === header.classList.contains("is-hidden")) return;
      header.classList.toggle("is-hidden", hidden);
      travel = 0;
    };

    const updateHeader = () => {
      queued = false;
      const y = Math.max(0, window.scrollY);
      // a fling or a scrollbar drag can move hundreds of pixels in one frame;
      // clamp it so one jolt is never read as a deliberate gesture
      const delta = Math.max(-60, Math.min(60, y - lastY));
      lastY = y;

      if (isOpen()) {
        setHidden(false);
        travel = 0;
        if (Math.abs(y - openAt) > 48) closeNav(false);
        return;
      }

      if (delta !== 0) {
        const next = delta > 0 ? 1 : -1;
        if (next !== direction) {
          direction = next;
          travel = 0;
        }
        travel += delta;
      }

      if (y < 120) {
        setHidden(false);
        travel = 0;
        return;
      }

      if (direction === 1 && travel > HIDE_AFTER) setHidden(true);
      else if (direction === -1 && travel < -SHOW_AFTER) setHidden(false);
    };

    if (toggle) {
      toggle.addEventListener("click", () => {
        openAt = window.scrollY;
      });
    }

    window.addEventListener(
      "scroll",
      () => {
        if (queued) return;
        queued = true;
        window.requestAnimationFrame(updateHeader);
      },
      { passive: true }
    );
  }

  /* ---------------- scroll reveals ---------------- */

  const revealItems = Array.from(document.querySelectorAll(".reveal"));
  const showItem = (item) => item.classList.add("is-in");

  if (revealItems.length) {
    if (reduced.matches || !("IntersectionObserver" in window)) {
      revealItems.forEach(showItem);
    } else {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            showItem(entry.target);
            observer.unobserve(entry.target);
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
      );

      revealItems.forEach((item) => observer.observe(item));

      // Safety net: anything already on screen is shown even if the observer misses it.
      window.setTimeout(() => {
        revealItems.forEach((item) => {
          const rect = item.getBoundingClientRect();
          if (rect.top < window.innerHeight && rect.bottom > 0) showItem(item);
        });
      }, 1600);
    }
  }

  /* ---------------- step counters ---------------- */

  const counters = Array.from(document.querySelectorAll("[data-count]"));

  const finishCounter = (el) => {
    el.textContent = String(el.dataset.count).padStart(2, "0");
  };

  const runCounter = (el) => {
    const target = Number(el.dataset.count);
    const duration = 900;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = String(Math.round(target * eased)).padStart(2, "0");
      if (progress < 1) window.requestAnimationFrame(tick);
      else finishCounter(el);
    };

    window.requestAnimationFrame(tick);
  };

  if (counters.length) {
    if (reduced.matches || !("IntersectionObserver" in window)) {
      counters.forEach(finishCounter);
    } else {
      const counterObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            runCounter(entry.target);
            counterObserver.unobserve(entry.target);
          });
        },
        { threshold: 0.6 }
      );

      counters.forEach((el) => counterObserver.observe(el));
    }
  }

  /* ---------------- FAQ: press to close, one open at a time ---------------- */

  document.querySelectorAll(".faq").forEach((group) => {
    const items = Array.from(group.querySelectorAll("details"));

    items.forEach((item) => {
      item.addEventListener("toggle", () => {
        if (!item.open) return;
        items.forEach((other) => {
          if (other !== item) other.open = false;
        });
      });

      item.addEventListener("click", (event) => {
        if (event.target.closest("summary, a")) return;
        if (item.open) item.open = false;
      });
    });
  });

  /* ---------------- quote form ---------------- */

  const form = document.getElementById("quote-form");

  if (form) {
    const success = document.getElementById("quote-success");
    const status = document.getElementById("quote-status");
    const service = form.querySelector("#service");
    const serviceOptions = service ? Array.from(service.options) : [];

    serviceOptions.forEach((option) => {
      if (option.value) option.dataset.full = option.textContent;
    });

    const shortenOptions = () => {
      const narrow = window.matchMedia("(max-width: 560px)").matches;
      serviceOptions.forEach((option) => {
        const full = option.dataset.full;
        if (!full) return;
        option.textContent = narrow && option.dataset.short ? option.dataset.short : full;
      });
    };

    shortenOptions();
    window.addEventListener("resize", shortenOptions);

    const requested = new URLSearchParams(window.location.search).get("service");
    if (requested && service) {
      const match = serviceOptions.find(
        (option) => option.value.toLowerCase() === requested.toLowerCase()
      );
      if (match) service.value = match.value;
    }

    const fields = [
      { el: form.querySelector("#name"), message: "Enter your name." },
      { el: form.querySelector("#phone"), message: "Enter a phone number we can reach you on." },
      { el: form.querySelector("#service"), message: "Choose the work you need priced." },
      { el: form.querySelector("#details"), message: "Describe the site and the scope." }
    ];

    const clearError = (field) => {
      const wrapper = field.el.closest(".field");
      wrapper.classList.remove("is-invalid");
      field.el.removeAttribute("aria-invalid");
    };

    const setError = (field, message) => {
      const wrapper = field.el.closest(".field");
      wrapper.classList.add("is-invalid");
      field.el.setAttribute("aria-invalid", "true");
      const hint = wrapper.querySelector(".field__error");
      if (hint) hint.textContent = message;
    };

    fields.forEach((field) => {
      if (!field.el) return;
      field.el.addEventListener("input", () => clearError(field));
      field.el.addEventListener("change", () => clearError(field));
    });

    const email = form.querySelector("#email");

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (status) status.textContent = "";

      let firstInvalid = null;

      fields.forEach((field) => {
        if (!field.el) return;
        const value = field.el.value.trim();
        if (!value) {
          setError(field, field.message);
          if (!firstInvalid) firstInvalid = field.el;
        } else {
          clearError(field);
        }
      });

      if (email && email.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value.trim())) {
        const wrapper = email.closest(".field");
        wrapper.classList.add("is-invalid");
        email.setAttribute("aria-invalid", "true");
        const hint = wrapper.querySelector(".field__error");
        if (hint) hint.textContent = "Check the email address, or leave it blank.";
        if (!firstInvalid) firstInvalid = email;
      } else if (email) {
        email.closest(".field").classList.remove("is-invalid");
        email.removeAttribute("aria-invalid");
      }

      if (firstInvalid) {
        if (status) status.textContent = "Complete the highlighted fields to continue.";
        firstInvalid.focus();
        return;
      }

      const value = (selector) => {
        const input = form.querySelector(selector);
        return input ? input.value.trim() : "";
      };

      const chosen = serviceOptions.find((option) => option.value === value("#service"));
      const serviceLabel = chosen ? chosen.dataset.full || chosen.value : value("#service");

      const lines = [
        `Name: ${value("#name")}`,
        `Phone: ${value("#phone")}`,
        `Email: ${value("#email") || "Not supplied"}`,
        `Work required: ${serviceLabel}`,
        `Site location: ${value("#location") || "To be confirmed"}`,
        "",
        "Scope",
        value("#details")
      ];

      const subject = `Site enquiry: ${serviceLabel}`;
      const href =
        "mailto:edwardolomi303@gmail.com" +
        `?subject=${encodeURIComponent(subject)}` +
        `&body=${encodeURIComponent(lines.join("\n"))}`;

      window.location.href = href;

      if (status) status.textContent = "";

      if (success) {
        const message = success.querySelector("[data-summary]");
        if (message) {
          message.textContent = `${serviceLabel} enquiry prepared for ${value("#name")}. Send it from your email app, or call +255 712 544 631 and our office will take the details directly.`;
        }
        success.classList.add("is-shown");
        form.hidden = true;
        success.setAttribute("tabindex", "-1");
        success.focus({ preventScroll: true });
      }
    });

    const again = document.getElementById("quote-again");
    if (again) {
      again.addEventListener("click", () => {
        form.reset();
        form.hidden = false;
        if (success) success.classList.remove("is-shown");
        if (status) status.textContent = "";
        const name = form.querySelector("#name");
        if (name) name.focus();
      });
    }
  }

  /* ---------------- pause while tab is hidden ---------------- */

  document.addEventListener("visibilitychange", () => {
    root.classList.toggle("is-paused", document.hidden);
  });

  /* ---------------- year ---------------- */

  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = String(new Date().getFullYear());
  });
})();
