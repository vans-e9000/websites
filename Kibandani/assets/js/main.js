/* ============================================================
   Kibandani Civil & Building Contractors — site behaviour
   Nav toggle · sticky header · scroll reveal · project filter
   Contact form (mailto) · footer year
   ============================================================ */
(function () {
  "use strict";

  /* ---------- Mobile nav toggle ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      toggle.setAttribute("aria-label", !open ? "Close navigation menu" : "Open navigation menu");
      links.classList.toggle("is-open", !open);
    });
    links.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open navigation menu");
        links.classList.remove("is-open");
      }
    });
    document.addEventListener("click", function (e) {
      if (toggle.getAttribute("aria-expanded") === "true" && !e.target.closest(".navbar")) {
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open navigation menu");
        links.classList.remove("is-open");
      }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open navigation menu");
        links.classList.remove("is-open");
        toggle.focus();
      }
    });
  }

  /* ---------- Sticky header state ---------- */
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("is-stuck", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- Scroll reveal (fires once, unobserves) ---------- */
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length) {
    if (reduceMotion || !("IntersectionObserver" in window)) {
      revealEls.forEach(function (el) {
        el.classList.add("is-visible");
      });
    } else {
      var io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
      );
      revealEls.forEach(function (el) {
        io.observe(el);
      });
    }
  }

  /* ---------- Project filter pills ---------- */
  var filterBtns = document.querySelectorAll(".filter-btn");
  var projectCards = document.querySelectorAll(".project-card[data-category]");
  if (filterBtns.length && projectCards.length) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var cat = btn.getAttribute("data-filter");
        filterBtns.forEach(function (b) {
          b.classList.toggle("is-active", b === btn);
          b.setAttribute("aria-pressed", String(b === btn));
        });
        projectCards.forEach(function (card) {
          var match = cat === "all" || card.getAttribute("data-category") === cat;
          card.classList.toggle("is-hidden", !match);
        });
      });
    });
  }

  /* ---------- Contact form → mailto ---------- */
  var form = document.getElementById("quote-form");
  if (form) {
    var status = document.getElementById("form-status");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var data = new FormData(form);
      var name = (data.get("name") || "").toString().trim();
      var email = (data.get("email") || "").toString().trim();
      var phone = (data.get("phone") || "").toString().trim();
      var service = (data.get("service") || "").toString();
      var message = (data.get("message") || "").toString().trim();

      var show = function (kind, text) {
        if (!status) return;
        status.className = "form-status is-visible " + kind;
        status.textContent = text;
      };

      if (!name || !email || !message) {
        show("is-err", "Please fill in your name, email and project details.");
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        show("is-err", "Please enter a valid email address.");
        return;
      }

      var subject = "Website enquiry — " + service + " — " + name;
      var body =
        "Name: " + name +
        "\nEmail: " + email +
        "\nPhone: " + (phone || "not provided") +
        "\nService: " + service +
        "\n\nProject details:\n" + message;

      window.location.href =
        "mailto:info@kibandani.co.tz?subject=" +
        encodeURIComponent(subject) +
        "&body=" +
        encodeURIComponent(body);

      show("is-ok", "Thank you, " + name.split(" ")[0] + " — your email app is opening with the enquiry ready to send.");
      form.reset();
    });
  }

  /* ---------- Footer year ---------- */
  var yearEls = document.querySelectorAll("[data-year]");
  var year = String(new Date().getFullYear());
  yearEls.forEach(function (el) {
    el.textContent = year;
  });
})();
