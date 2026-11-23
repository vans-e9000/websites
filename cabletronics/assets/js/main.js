(function () {
  "use strict";

  var doc = document;
  var root = doc.documentElement;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  /* ---------- Footer year ---------- */
  var yearNode = doc.querySelector("[data-year]");
  if (yearNode) {
    yearNode.textContent = String(new Date().getFullYear());
  }

  /* ---------- Header state on scroll ---------- */
  var header = doc.querySelector("[data-header]");
  if (header) {
    var syncHeader = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 12);
    };
    window.addEventListener("scroll", syncHeader, { passive: true });
    syncHeader();
  }

  /* ---------- Mobile menu ---------- */
  var toggle = doc.querySelector("[data-menu-toggle]");
  var menu = doc.querySelector("[data-menu]");

  if (toggle && menu) {
    var setMenu = function (open) {
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      menu.setAttribute("data-open", open ? "true" : "false");
      doc.body.classList.toggle("menu-open", open);

      if (open) {
        var first = menu.querySelector("a, button");
        if (first) first.focus();
      }
    };

    toggle.addEventListener("click", function () {
      setMenu(toggle.getAttribute("aria-expanded") !== "true");
    });

    menu.addEventListener("click", function (event) {
      if (event.target.closest("a")) setMenu(false);
    });

    doc.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setMenu(false);
        toggle.focus();
      }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 1024 && toggle.getAttribute("aria-expanded") === "true") {
        setMenu(false);
      }
    });
  }

  /* ---------- Scroll reveal ---------- */
  var revealItems = doc.querySelectorAll(".reveal");

  if (revealItems.length) {
    var canObserve = "IntersectionObserver" in window;

    if (!canObserve || reduceMotion.matches) {
      Array.prototype.forEach.call(revealItems, function (item) {
        item.classList.add("is-in");
      });
    } else {
      root.classList.add("js-reveal");
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-in");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
      );

      Array.prototype.forEach.call(revealItems, function (item) {
        observer.observe(item);
      });

      /* Fast jumps (anchors, Home/End, scroll restoration) can skip an
         element without ever intersecting it. Reveal anything already at or
         above the viewport line so no section is left invisible. */
      var pending = Array.prototype.slice.call(revealItems);
      var lastCheck = 0;

      var revealPassed = function () {
        pending = pending.filter(function (item) {
          if (item.classList.contains("is-in")) return false;
          if (item.getBoundingClientRect().top < window.innerHeight * 0.94) {
            item.classList.add("is-in");
            observer.unobserve(item);
            return false;
          }
          return true;
        });
        if (!pending.length) {
          window.removeEventListener("scroll", onPassiveScroll);
        }
      };

      var onPassiveScroll = function () {
        var now = window.performance && performance.now ? performance.now() : Date.now();
        if (now - lastCheck < 120) return;
        lastCheck = now;
        revealPassed();
      };

      window.addEventListener("scroll", onPassiveScroll, { passive: true });
      revealPassed();
    }
  }

  /* ---------- Contact form: compose an email locally ---------- */
  var form = doc.querySelector("[data-contact-form]");

  if (form) {
    /* Preselect a scope when arriving from a project line link */
    var scopeFromUrl = new URLSearchParams(window.location.search).get("scope");
    var scopeMap = {
      generators: "Industrial generators",
      civil: "Roads and stormwater drainage",
      hvac: "Commercial HVAC",
      buildings: "Building works",
      telecom: "Telecom BTS power",
      maintenance: "Maintenance"
    };
    var scopeSelect = form.querySelector("#service");

    if (scopeFromUrl && scopeMap[scopeFromUrl] && scopeSelect) {
      scopeSelect.value = scopeMap[scopeFromUrl];
    }

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      if (!form.reportValidity()) return;

      var data = new FormData(form);
      var name = String(data.get("name") || "").trim();
      var company = String(data.get("company") || "").trim();
      var email = String(data.get("email") || "").trim();
      var phone = String(data.get("phone") || "").trim();
      var service = String(data.get("service") || "").trim();
      var message = String(data.get("message") || "").trim();

      var subject = "Project enquiry" + (service ? " — " + service : "");
      var lines = [
        "Name: " + name,
        company ? "Company: " + company : null,
        "Email: " + email,
        phone ? "Phone: " + phone : null,
        service ? "Service: " + service : null,
        "",
        message
      ].filter(function (line) {
        return line !== null;
      });

      var href =
        "mailto:cabletronics2005@gmail.com" +
        "?subject=" +
        encodeURIComponent(subject) +
        "&body=" +
        encodeURIComponent(lines.join("\n"));

      var status = form.querySelector("[data-form-status]");
      if (status) {
        status.textContent =
          "Opening your email app with these details. You can also call +255 784 647 732.";
      }

      window.location.href = href;
    });
  }
})();
