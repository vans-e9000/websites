/* ==========================================================================
   ANCEVY (PVT) LIMITED - site behaviour
   Navigation, scroll reveal, project filtering and form validation.
   ========================================================================== */
(function () {
  "use strict";

  document.documentElement.classList.add("js");

  /* ---------------------------------------------------------------------- *
   * Mobile navigation
   * ---------------------------------------------------------------------- */
  var header = document.querySelector(".site-header");
  var navToggle = document.querySelector(".nav-toggle");
  var primaryNav = document.querySelector(".primary-nav");

  /* Hide the sticky header while scrolling down; reveal it when scrolling up. */
  var lastScrollY = window.scrollY || 0;
  var scrollTicking = false;
  function updateHeaderVisibility() {
    var currentY = window.scrollY || 0;
    var headerHasFocus = header && header.contains(document.activeElement);
    if (header && !(header.classList.contains("is-open")) && !headerHasFocus) {
      if (currentY > 120 && currentY > lastScrollY + 4) {
        header.classList.add("is-hidden");
      } else if (currentY < lastScrollY - 4 || currentY <= 80) {
        header.classList.remove("is-hidden");
      }
    } else if (header) {
      header.classList.remove("is-hidden");
    }
    lastScrollY = currentY;
    scrollTicking = false;
  }
  window.addEventListener("scroll", function () {
    if (!scrollTicking) {
      window.requestAnimationFrame(updateHeaderVisibility);
      scrollTicking = true;
    }
  }, { passive: true });
  document.addEventListener("focusin", function () {
    if (header && header.contains(document.activeElement)) header.classList.remove("is-hidden");
  });

  function closeNav() {
    if (!header || !navToggle) return;
    header.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("nav-open");
    var label = navToggle.querySelector(".visually-hidden");
    if (label) label.textContent = "Open menu";
  }

  function openNav() {
    if (!header || !navToggle) return;
    header.classList.add("is-open");
    navToggle.setAttribute("aria-expanded", "true");
    document.body.classList.add("nav-open");
    var label = navToggle.querySelector(".visually-hidden");
    if (label) label.textContent = "Close menu";
  }

  if (header && navToggle) {
    navToggle.addEventListener("click", function () {
      if (header.classList.contains("is-open")) {
        closeNav();
      } else {
        openNav();
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeNav();
    });

    if (primaryNav) {
      primaryNav.addEventListener("click", function (event) {
        if (event.target.closest("a")) closeNav();
      });
    }

    window.addEventListener("resize", function () {
      if (window.innerWidth > 991) closeNav();
    });

    document.addEventListener("click", function (event) {
      if (
        header.classList.contains("is-open") &&
        !header.contains(event.target)
      ) {
        closeNav();
      }
    });
  }

  /* ---------------------------------------------------------------------- *
   * Scroll reveal
   * ---------------------------------------------------------------------- */
  var revealItems = document.querySelectorAll(".reveal");

  if (revealItems.length) {
    var reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      revealItems.forEach(function (item) {
        item.classList.add("is-visible");
      });
    } else {
      var revealObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              revealObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
      );

      revealItems.forEach(function (item) {
        revealObserver.observe(item);
      });
    }
  }

  /* ---------------------------------------------------------------------- *
   * Project filtering
   * ---------------------------------------------------------------------- */
  var filterBar = document.querySelector("[data-project-filters]");
  var projectCards = document.querySelectorAll("[data-sector]");

  if (filterBar && projectCards.length) {
    var filterButtons = filterBar.querySelectorAll(".filter-btn");
    var emptyState = document.querySelector("[data-project-empty]");
    var resultCount = document.querySelector("[data-project-count]");

    function applyFilter(filter) {
      var visible = 0;

      projectCards.forEach(function (card) {
        var sectors = (card.getAttribute("data-sector") || "").split(" ");
        var show = filter === "all" || sectors.indexOf(filter) !== -1;
        card.hidden = !show;
        if (show) visible += 1;
      });

      if (emptyState) emptyState.hidden = visible !== 0;

      if (resultCount) {
        resultCount.textContent =
          visible === 1
            ? "1 project shown"
            : visible + " projects shown";
      }
    }

    filterButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        filterButtons.forEach(function (item) {
          item.setAttribute("aria-pressed", "false");
        });
        button.setAttribute("aria-pressed", "true");
        applyFilter(button.getAttribute("data-filter") || "all");
      });
    });
  }

  /* ---------------------------------------------------------------------- *
   * Forms
   * Form validation runs in the browser. A valid submission opens the
   * visitor's email client with a structured, addressed message. The
   * success panel also offers a WhatsApp route for mobile visitors.
   * ---------------------------------------------------------------------- */
  var forms = document.querySelectorAll("[data-form]");

  function labelFor(control) {
    var field = control.closest(".field");
    var label = field ? field.querySelector("label") : null;
    return label ? label.textContent.replace(/\s*\*$/, "").trim() : control.name;
  }

  function clearError(control) {
    var field = control.closest(".field");
    if (!field) return;
    field.classList.remove("has-error");
    control.removeAttribute("aria-invalid");
    var error = field.querySelector(".field-error");
    if (error) error.remove();
  }

  function setError(control, message) {
    var field = control.closest(".field");
    if (!field) return;
    field.classList.add("has-error");
    control.setAttribute("aria-invalid", "true");

    var error = field.querySelector(".field-error");
    if (!error) {
      error = document.createElement("p");
      error.className = "field-error";
      var errorId = (control.id || control.name) + "-error";
      error.id = errorId;
      control.setAttribute("aria-describedby", errorId);
      field.appendChild(error);
    }
    error.textContent = message;
  }

  function validateForm(form) {
    var firstInvalid = null;
    var controls = form.querySelectorAll("input, select, textarea");

    controls.forEach(function (control) {
      if (control.type === "hidden" || control.closest(".hp-field")) return;

      clearError(control);

      var value = (control.value || "").trim();
      var message = "";

      if (control.required && !value) {
        message =
          control.tagName === "SELECT"
            ? "Choose an option to continue."
            : "This field is required.";
      } else if (
        value &&
        control.type === "email" &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)
      ) {
        message = "Enter a valid email address, for example name@company.co.tz.";
      } else if (
        value &&
        control.type === "tel" &&
        !/^[+0-9][0-9\s().-]{6,19}$/.test(value)
      ) {
        message = "Enter a phone number using digits, spaces or a leading plus.";
      }

      if (message) {
        setError(control, message);
        if (!firstInvalid) firstInvalid = control;
      }
    });

    if (firstInvalid) {
      firstInvalid.focus();
      return false;
    }
    return true;
  }

  function composeMessage(form) {
    var lines = [];
    var controls = form.querySelectorAll("input, select, textarea");

    controls.forEach(function (control) {
      if (
        control.type === "hidden" ||
        control.type === "submit" ||
        control.name === "_honey" ||
        control.closest(".hp-field")
      ) {
        return;
      }
      var value = (control.value || "").trim();
      if (!value) return;
      lines.push(labelFor(control) + ": " + value);
    });

    lines.push("");
    lines.push("Submitted from the ANCEVY (PVT) LIMITED website.");
    return lines.join("\n");
  }

  forms.forEach(function (form) {
    form.setAttribute("novalidate", "novalidate");

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      var status = form.querySelector("[data-form-status]");
      var panel = form.querySelector("[data-form-success]");

      if (!validateForm(form)) {
        if (status) {
          status.textContent =
            "Check the highlighted fields and submit the form again.";
        }
        return;
      }

      var kind = form.getAttribute("data-form") === "quote" ? "Quote request" : "Website enquiry";
      var nameField = form.querySelector('[name="name"]');
      var subject =
        kind + " from " + (nameField && nameField.value ? nameField.value : "website visitor");
      var body = composeMessage(form);
      var mailto =
        "mailto:daudi.mpocholwa@gmail.com" +
        "?subject=" +
        encodeURIComponent(subject) +
        "&body=" +
        encodeURIComponent(body);

      var whatsapp =
        "https://wa.me/255784670205?text=" + encodeURIComponent(body);

      if (panel) {
        panel.hidden = false;
        var whatsappLink = panel.querySelector("[data-whatsapp]");
        if (whatsappLink) whatsappLink.href = whatsapp;
        panel.focus({ preventScroll: true });
        panel.scrollIntoView({ behavior: "smooth", block: "center" });
      }

      if (status) {
        status.textContent =
          "Your details are valid. Your email app will open so you can send the message.";
      }

      window.location.href = mailto;
    });

    form.querySelectorAll("input, select, textarea").forEach(function (control) {
      control.addEventListener("input", function () {
        if (control.closest(".field") && control.closest(".field").classList.contains("has-error")) {
          clearError(control);
        }
      });
    });
  });

  /* Keep only one homepage FAQ answer open at a time. */
  document.querySelectorAll(".faq-list").forEach(function (list) {
    list.querySelectorAll("details").forEach(function (item) {
      item.addEventListener("toggle", function () {
        if (!item.open) return;
        list.querySelectorAll("details[open]").forEach(function (other) {
          if (other !== item) other.open = false;
        });
      });
    });
  });

  /* ---------------------------------------------------------------------- *
   * Current year
   * ---------------------------------------------------------------------- */
  document.querySelectorAll("[data-year]").forEach(function (node) {
    node.textContent = new Date().getFullYear();
  });
})();
