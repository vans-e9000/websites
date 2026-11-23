(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  /* --------------------------------------------------------- Mobile drawer */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("primary-nav");
  var scrim = null;

  if (toggle && nav) {
    scrim = document.createElement("div");
    scrim.className = "nav-scrim";
    document.body.appendChild(scrim);

    var drawerContact = document.createElement("div");
    drawerContact.className = "nav-contact";
    drawerContact.innerHTML =
      '<span>Site office</span>' +
      '<a href="tel:+255763440355">+255 763 440 355</a>' +
      '<a href="mailto:kawengaj@gmail.com">kawengaj@gmail.com</a>' +
      '<a href="contact.html">Izia Street, Sumbawanga</a>';
    nav.appendChild(drawerContact);

    var setNav = function (open) {
      nav.classList.toggle("is-open", open);
      scrim.classList.toggle("is-open", open);
      document.body.classList.toggle("nav-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    };

    toggle.addEventListener("click", function () {
      setNav(!nav.classList.contains("is-open"));
    });

    scrim.addEventListener("click", function () {
      setNav(false);
      toggle.focus();
    });

    nav.addEventListener("click", function (event) {
      if (event.target.closest("a") && nav.classList.contains("is-open")) {
        setNav(false);
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && nav.classList.contains("is-open")) {
        setNav(false);
        toggle.focus();
      }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 960 && nav.classList.contains("is-open")) {
        setNav(false);
      }
    });
  }

  /* --------------------------------------------------- Header on scroll */
  var header = document.querySelector(".site-header");

  if (header) {
    var lastY = window.pageYOffset;
    var hideAfter = 120;
    var threshold = 6;

    var onScroll = function () {
      var y = window.pageYOffset;
      var diff = y - lastY;

      if (y < hideAfter || document.body.classList.contains("nav-open")) {
        header.classList.remove("is-hidden");
      } else if (diff > threshold) {
        header.classList.add("is-hidden");
      } else if (diff < -threshold) {
        header.classList.remove("is-hidden");
      }

      if (Math.abs(diff) > threshold) {
        lastY = y;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ------------------------------------------------------- Year stamp */
  document.querySelectorAll("[data-year]").forEach(function (node) {
    node.textContent = String(new Date().getFullYear());
  });

  /* ------------------------------------------------------ Scroll reveals */
  var revealSelectors = [
    ".section-head",
    ".stats",
    ".service-card",
    ".project-card",
    ".card",
    ".detail-copy",
    ".detail-figure",
    ".process-step",
    ".cta-band",
    ".split > *",
    ".footer-grid > *",
    ".region-list",
    ".spec-table"
  ].join(", ");

  var revealItems = Array.prototype.slice.call(document.querySelectorAll(revealSelectors));

  if (reduceMotion.matches) {
    revealItems.forEach(function (item) {
      item.setAttribute("data-reveal", "");
      item.classList.add("is-revealed");
    });
  } else {
    revealItems.forEach(function (item) {
      item.setAttribute("data-reveal", "");

      var parent = item.parentElement;
      if (!parent) return;

      var siblings = Array.prototype.filter.call(parent.children, function (child) {
        return child.hasAttribute("data-reveal");
      });

      if (siblings.length > 1) {
        var index = siblings.indexOf(item);
        item.style.setProperty("--reveal-delay", Math.min(index, 4) * 70 + "ms");
      }
    });

    var pending = revealItems.slice();

    var revealInView = function () {
      if (!pending.length) return;
      var limit = window.innerHeight * 0.94;
      pending = pending.filter(function (item) {
        var rect = item.getBoundingClientRect();
        if (rect.top < limit && rect.bottom > 0) {
          item.classList.add("is-revealed");
          return false;
        }
        return true;
      });
    };

    var onScroll = function () {
      revealInView();
    };

    revealInView();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("load", revealInView);
    window.setTimeout(revealInView, 350);

    /* Fail safe: never leave content hidden if a scroll event is missed. */
    window.setTimeout(function () {
      pending.forEach(function (item) {
        if (item.getBoundingClientRect().top < window.innerHeight * 1.5) {
          item.classList.add("is-revealed");
        }
      });
    }, 1600);
  }

  /* ------------------------------------------------------- Stat counters */
  var statValues = Array.prototype.slice.call(document.querySelectorAll(".stat-value"));

  if (statValues.length && !reduceMotion.matches) {
    var formatCount = function (value, decimals, grouped) {
      var fixed = value.toFixed(decimals);
      if (!grouped) return fixed;
      var parts = fixed.split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return parts.join(".");
    };

    var runCounter = function (el, delay) {
      var original = el.textContent;
      var parts = /^([^\d]*)([\d.,]+)(.*)$/.exec(original);
      if (!parts) return;

      var prefix = parts[1];
      var numberText = parts[2];
      var suffix = parts[3];
      var target = Number(numberText.replace(/,/g, ""));
      if (!isFinite(target)) return;

      var decimals = (numberText.split(".")[1] || "").length;
      var grouped = numberText.indexOf(",") > -1;
      var duration = 1250;
      var startTime = null;

      el.setAttribute("aria-label", original);
      el.textContent = prefix + formatCount(0, decimals, grouped) + suffix;

      /* If frames are delayed (hidden tab, throttled device), land on the
         real figure rather than leaving a zero on screen. */
      window.setTimeout(function () {
        if (el.textContent !== original) {
          el.textContent = original;
          el.classList.add("is-counted");
        }
      }, delay + duration + 600);

      var tick = function (timestamp) {
        if (startTime === null) startTime = timestamp;
        var progress = Math.min((timestamp - startTime) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);

        if (progress < 1) {
          el.textContent = prefix + formatCount(target * eased, decimals, grouped) + suffix;
          window.requestAnimationFrame(tick);
        } else {
          el.textContent = original;
          el.classList.remove("is-counted");
          void el.offsetWidth;
          el.classList.add("is-counted");
        }
      };

      window.setTimeout(function () {
        window.requestAnimationFrame(tick);
      }, delay);
    };

    document.querySelectorAll(".stats").forEach(function (block) {
      var values = Array.prototype.slice.call(block.querySelectorAll(".stat-value"));
      var played = false;

      var inView = function () {
        return block.getBoundingClientRect().top < window.innerHeight * 0.9;
      };

      var play = function () {
        if (played || document.hidden || !inView()) return;
        played = true;
        values.forEach(function (value, index) {
          runCounter(value, index * 120);
        });
      };

      document.addEventListener("visibilitychange", function () {
        if (!document.hidden) play();
      });

      if ("IntersectionObserver" in window) {
        var observer = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              play();
              observer.disconnect();
            }
          });
        }, { threshold: 0.3 });
        observer.observe(block);
      } else {
        window.addEventListener("scroll", function () {
          if (block.getBoundingClientRect().top < window.innerHeight * 0.85) play();
        }, { passive: true });
      }

      window.setTimeout(play, 700);
    });
  }

  /* ---------------------------------------------------------- Form engine */
  var EMAIL = "kawengaj@gmail.com";

  function labelFor(field) {
    var label = field.closest(".field") ? field.closest(".field").querySelector("label") : null;
    return label ? label.textContent.replace(/\s*\*$/, "").trim() : field.name;
  }

  function setError(field, message) {
    var wrap = field.closest(".field");
    if (!wrap) return;
    var existing = wrap.querySelector(".field-error");
    if (message) {
      field.setAttribute("aria-invalid", "true");
      if (!existing) {
        existing = document.createElement("span");
        existing.className = "field-error";
        existing.id = field.id + "-error";
        wrap.appendChild(existing);
      }
      existing.textContent = message;
      field.setAttribute("aria-describedby", existing.id);
    } else {
      field.removeAttribute("aria-invalid");
      if (existing) existing.remove();
      field.removeAttribute("aria-describedby");
    }
  }

  function validate(form) {
    var errors = [];
    form.querySelectorAll("input, select, textarea").forEach(function (field) {
      setError(field, "");
      if (field.type === "hidden") return;

      var value = (field.value || "").trim();
      var required = field.hasAttribute("required");

      if (required && !value) {
        setError(field, "Enter " + labelFor(field).toLowerCase() + ".");
        errors.push(field);
        return;
      }

      if (field.type === "email" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
        setError(field, "Enter an email address in the format name@example.com.");
        errors.push(field);
        return;
      }

      if (field.type === "tel" && value && !/^[+()\d\s-]{9,20}$/.test(value)) {
        setError(field, "Enter a phone number using digits, spaces or a leading plus sign.");
        errors.push(field);
      }
    });
    return errors;
  }

  function buildMessage(form) {
    var lines = [];
    form.querySelectorAll("input, select, textarea").forEach(function (field) {
      if (field.type === "hidden" || !field.name) return;
      var value = (field.value || "").trim();
      if (!value) return;
      lines.push(labelFor(field) + ": " + value);
    });
    return lines.join("\n");
  }

  document.querySelectorAll("form[data-enquiry]").forEach(function (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var status = form.querySelector(".form-status");
      var errors = validate(form);

      if (errors.length) {
        errors[0].focus();
        if (status) status.hidden = true;
        return;
      }

      var enquiry = form.getAttribute("data-enquiry") || "Website enquiry";
      var body = buildMessage(form);
      var subject = enquiry + " | " + (form.querySelector("[name='name']") || {}).value;
      var mailto = "mailto:" + EMAIL + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);

      if (status) {
        status.hidden = false;
        status.innerHTML =
          "Your request is ready to send. Your email application opens with every detail filled in. " +
          "If it does not open, send the same details to " +
          '<a href="mailto:' + EMAIL + '">' + EMAIL + "</a> or call " +
          '<a href="tel:+255763440355">+255 763 440 355</a>.';
      }

      window.location.href = mailto;
    });
  });
})();
