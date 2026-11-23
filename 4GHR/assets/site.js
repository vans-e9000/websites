(function () {
  "use strict";

  document.documentElement.classList.add("js");

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var header = document.querySelector("[data-header]");
  var nav = document.querySelector("[data-nav]");
  var navToggle = document.querySelector("[data-nav-toggle]");

  var lastScrollY = window.scrollY;

  function onScroll() {
    if (!header) return;
    var y = window.scrollY;

    header.classList.toggle("is-scrolled", y > 8);

    if (nav && nav.classList.contains("is-open")) {
      header.classList.remove("is-hidden");
    } else if (y > lastScrollY + 8 && y > 120) {
      header.classList.add("is-hidden");
    } else if (y < lastScrollY - 8 || y <= 80) {
      header.classList.remove("is-hidden");
    }

    lastScrollY = y;
  }

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  if (header) {
    header.addEventListener("focusin", function () {
      header.classList.remove("is-hidden");
    });
  }

  function setNav(open) {
    if (!nav || !navToggle) return;
    nav.classList.toggle("is-open", open);
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    navToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  }

  if (navToggle && nav) {
    navToggle.addEventListener("click", function () {
      setNav(!nav.classList.contains("is-open"));
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        setNav(false);
      });
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && nav.classList.contains("is-open")) {
        setNav(false);
        navToggle.focus();
      }
    });

    document.addEventListener("click", function (event) {
      if (!nav.classList.contains("is-open")) return;
      if (nav.contains(event.target) || navToggle.contains(event.target)) return;
      setNav(false);
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 900) setNav(false);
    });
  }

  document.querySelectorAll("[data-year]").forEach(function (node) {
    node.textContent = String(new Date().getFullYear());
  });

  var revealItems = Array.prototype.slice.call(document.querySelectorAll("[data-reveal]"));

  if (revealItems.length && "IntersectionObserver" in window && !reduceMotion) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var index = revealItems.indexOf(entry.target);
          entry.target.style.setProperty("--reveal-delay", Math.min(index * 35, 210) + "ms");
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );

    revealItems.forEach(function (item) {
      observer.observe(item);
    });
  } else {
    revealItems.forEach(function (item) {
      item.classList.add("is-visible");
    });
  }

  var filterButtons = Array.prototype.slice.call(document.querySelectorAll("[data-filter-value]"));
  var filterCards = Array.prototype.slice.call(document.querySelectorAll("[data-category]"));
  var filterStatus = document.querySelector("[data-filter-status]");

  function applyFilter(value) {
    var shown = 0;

    filterCards.forEach(function (card) {
      var categories = (card.getAttribute("data-category") || "").split(" ");
      var visible = value === "all" || categories.indexOf(value) !== -1;
      card.hidden = !visible;
      if (visible) shown += 1;
    });

    if (filterStatus) {
      filterStatus.textContent =
        shown + " of " + filterCards.length + " capability profiles shown";
    }
  }

  if (filterButtons.length && filterCards.length) {
    filterButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        filterButtons.forEach(function (item) {
          item.setAttribute("aria-pressed", item === button ? "true" : "false");
        });
        applyFilter(button.getAttribute("data-filter-value"));
      });
    });
  }

  var queryService = new URLSearchParams(window.location.search).get("service");
  if (queryService) {
    document.querySelectorAll('select[name="service"]').forEach(function (select) {
      for (var i = 0; i < select.options.length; i += 1) {
        if (select.options[i].value.toLowerCase() === queryService.toLowerCase()) {
          select.value = select.options[i].value;
          break;
        }
      }
    });
  }

  function humanize(key) {
    return key
      .replace(/[_-]+/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .replace(/^./, function (letter) {
        return letter.toUpperCase();
      });
  }

  function fieldLabel(input) {
    if (input.getAttribute("data-label")) return input.getAttribute("data-label");
    var label = input.id ? document.querySelector('label[for="' + input.id + '"]') : null;
    if (label && label.textContent.trim()) {
      return label.textContent.replace(/\s*\*\s*$/, "").trim();
    }
    return humanize(input.name || "detail");
  }

  function errorTarget(input) {
    if (input.type === "checkbox" || input.type === "radio") {
      return input.closest(".consent, .choice, .fieldset") || input.parentElement;
    }
    return input.closest(".field") || input.parentElement;
  }

  function clearErrors(form) {
    form.querySelectorAll(".field-error").forEach(function (wrap) {
      wrap.classList.remove("field-error");
    });
    form.querySelectorAll(".field-message[data-generated]").forEach(function (message) {
      message.remove();
    });
    form.querySelectorAll("[aria-invalid]").forEach(function (input) {
      input.removeAttribute("aria-invalid");
      input.removeAttribute("aria-describedby");
    });
  }

  function showError(input, text) {
    var wrap = errorTarget(input);
    if (!wrap) return;
    wrap.classList.add("field-error");
    var message = wrap.querySelector(".field-message[data-generated]");
    if (!message) {
      message = document.createElement("span");
      message.className = "field-message";
      message.setAttribute("data-generated", "true");
      var messageId = (input.name || "field") + "-error";
      message.id = messageId;
      wrap.appendChild(message);
      input.setAttribute("aria-describedby", messageId);
    }
    message.textContent = text;
    input.setAttribute("aria-invalid", "true");
  }

  function validateField(input) {
    var value = input.type === "checkbox" ? input.checked : input.value.trim();

    if (input.hasAttribute("required")) {
      if (input.type === "checkbox" && !value) {
        return "Please confirm this before sending.";
      }
      if (input.type !== "checkbox" && !value) {
        return "Please complete " + fieldLabel(input).toLowerCase() + ".";
      }
    }

    if (!value) return "";

    if (input.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(value))) {
      return "Please enter a valid email address.";
    }

    if (input.type === "tel" && !/^[+()\d\s.-]{7,}$/.test(String(value))) {
      return "Please enter a valid phone number.";
    }

    return "";
  }

  function collectBrief(form) {
    var data = new FormData(form);
    var lines = [];
    var subjects = [];

    form.querySelectorAll("input, select, textarea").forEach(function (input) {
      if (!input.name) return;
      if (input.type === "checkbox" || input.type === "radio") {
        if (!input.checked) return;
        if (input.name === "consent") return;
        if (input.name === "service") {
          subjects.push(input.value);
          return;
        }
        lines.push(fieldLabel(input) + ": " + input.value);
        return;
      }
      var value = String(data.get(input.name) || "").trim();
      if (!value) return;
      if (input.name === "service") subjects.push(value);
      lines.push(fieldLabel(input) + ": " + value);
    });

    return {
      lines: lines,
      service: subjects.join(", ") || "General enquiry",
    };
  }

  function buildMailto(email, subject, lines) {
    var body = ["Project brief from the 4GHR Investment Limited website.", ""].concat(lines);
    return (
      "mailto:" +
      email +
      "?subject=" +
      encodeURIComponent(subject) +
      "&body=" +
      encodeURIComponent(body.join("\r\n"))
    );
  }

  function copyText(text, button) {
    var done = function () {
      button.textContent = "Brief copied";
      window.setTimeout(function () {
        button.textContent = "Copy brief";
      }, 2400);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done, function () {
        button.textContent = "Copy unavailable";
      });
      return;
    }
    var area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    try {
      document.execCommand("copy");
      done();
    } catch (error) {
      button.textContent = "Copy unavailable";
    }
    document.body.removeChild(area);
  }

  function renderSummary(summary, lines, mailto) {
    summary.innerHTML = "";
    var heading = document.createElement("h3");
    heading.textContent = "Brief summary";
    summary.appendChild(heading);

    var list = document.createElement("dl");
    lines.forEach(function (line) {
      var split = line.indexOf(": ");
      var row = document.createElement("div");
      var term = document.createElement("dt");
      var detail = document.createElement("dd");
      term.textContent = split === -1 ? "Detail" : line.slice(0, split);
      detail.textContent = split === -1 ? line : line.slice(split + 2);
      row.appendChild(term);
      row.appendChild(detail);
      list.appendChild(row);
    });
    summary.appendChild(list);

    var actions = document.createElement("div");
    actions.className = "form-actions";
    actions.style.marginTop = "14px";

    var draft = document.createElement("a");
    draft.className = "btn btn--dark btn--small";
    draft.href = mailto;
    draft.textContent = "Open the email draft";
    actions.appendChild(draft);

    var copy = document.createElement("button");
    copy.type = "button";
    copy.className = "btn btn--ghost btn--small";
    copy.textContent = "Copy brief";
    copy.addEventListener("click", function () {
      copyText(lines.join("\n"), copy);
    });
    actions.appendChild(copy);

    summary.appendChild(actions);
  }

  document.querySelectorAll("[data-form]").forEach(function (form) {
    var status = form.querySelector("[data-form-status]");
    var summary = form.querySelector("[data-brief-summary]");
    var email = form.getAttribute("data-email") || "ceo_4ghri@outlook.com";
    var kind = form.getAttribute("data-form-kind") || "Enquiry";
    var submitting = false;

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      if (submitting) return;

      clearErrors(form);
      if (status) {
        status.className = "form-status";
        status.textContent = "";
      }

      var invalid = [];
      form.querySelectorAll("[required]").forEach(function (input) {
        var message = validateField(input);
        if (message) {
          showError(input, message);
          invalid.push(input);
        }
      });

      if (invalid.length) {
        if (status) {
          status.className = "form-status form-status--error";
          status.textContent = "Review the highlighted fields before sending.";
        }
        invalid[0].focus({ preventScroll: false });
        return;
      }

      var brief = collectBrief(form);
      var nameInput = form.querySelector('[name="name"]');
      var name = nameInput ? nameInput.value.trim() : "";
      var subject = kind + (name ? ": " + name : "") + " - " + brief.service;
      var mailto = buildMailto(email, subject, brief.lines);

      if (summary) {
        renderSummary(summary, brief.lines, mailto);
        summary.hidden = false;
      }

      if (status) {
        status.className = "form-status form-status--success";
        status.innerHTML =
          "Your email app is opening with the brief addressed to <a href=\"mailto:" +
          email +
          "\">" +
          email +
          "</a>. If it does not open, use the email draft link in the summary, or call <a href=\"tel:+255754711801\">+255 754 711 801</a>.";
      }

      submitting = true;
      window.setTimeout(function () {
        submitting = false;
      }, 1200);

      window.location.href = mailto;
    });

    form.querySelectorAll("input, select, textarea").forEach(function (input) {
      input.addEventListener("input", function () {
        if (!input.getAttribute("aria-invalid")) return;
        var wrap = errorTarget(input);
        if (wrap) wrap.classList.remove("field-error");
        var message = wrap ? wrap.querySelector(".field-message[data-generated]") : null;
        if (message) message.remove();
        input.removeAttribute("aria-invalid");
        input.removeAttribute("aria-describedby");
      });
    });
  });
})();
