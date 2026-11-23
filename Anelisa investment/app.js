/* Anelisa Investment Ltd — progressive enhancement only */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Sticky header state */
  var header = document.querySelector("[data-header]");
  if (header) {
    var setHeaderState = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 24);
    };
    setHeaderState();
    window.addEventListener("scroll", setHeaderState, { passive: true });
  }

  /* Mobile navigation */
  var toggle = document.querySelector("[data-nav-toggle]");
  var nav = document.querySelector("[data-nav]");

  if (toggle && nav) {
    var closeNav = function () {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("nav-open");
    };

    var openNav = function () {
      nav.classList.add("is-open");
      toggle.setAttribute("aria-expanded", "true");
      document.body.classList.add("nav-open");
    };

    toggle.addEventListener("click", function () {
      if (nav.classList.contains("is-open")) {
        closeNav();
      } else {
        openNav();
      }
    });

    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) {
        closeNav();
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && nav.classList.contains("is-open")) {
        closeNav();
        toggle.focus();
      }
    });

    document.addEventListener("click", function (event) {
      if (!nav.classList.contains("is-open")) return;
      if (nav.contains(event.target) || toggle.contains(event.target)) return;
      closeNav();
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 991) closeNav();
    });
  }

  /* Scroll reveal, once */
  var revealItems = document.querySelectorAll(".reveal");

  if (revealItems.length) {
    if (reduceMotion || !("IntersectionObserver" in window)) {
      revealItems.forEach(function (item) {
        item.classList.add("is-visible");
      });
    } else {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          });
        },
        { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
      );

      revealItems.forEach(function (item) {
        observer.observe(item);
      });
    }
  }

  /* FAQ accordion, one panel open at a time */
  var faqItems = Array.prototype.slice.call(
    document.querySelectorAll(".faq-item")
  );

  faqItems.forEach(function (item) {
    var button = item.querySelector("button");
    var panel = item.querySelector(".faq-panel");
    if (!button || !panel) return;

    button.addEventListener("click", function () {
      var isOpen = item.classList.contains("is-open");

      faqItems.forEach(function (other) {
        other.classList.remove("is-open");
        var otherButton = other.querySelector("button");
        var otherPanel = other.querySelector(".faq-panel");
        if (otherButton) otherButton.setAttribute("aria-expanded", "false");
        if (otherPanel) otherPanel.hidden = true;
      });

      if (!isOpen) {
        item.classList.add("is-open");
        button.setAttribute("aria-expanded", "true");
        panel.hidden = false;
      }
    });
  });

  /* Footer year */
  var year = document.querySelector("[data-year]");
  if (year) year.textContent = String(new Date().getFullYear());

  /* Quote form: compose a message in the visitor's own email app */
  var form = document.querySelector("[data-enquiry-form]");
  if (form) {
    var status = document.querySelector("[data-form-status]");

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      var data = new FormData(form);
      var get = function (key) {
        return String(data.get(key) || "").trim();
      };

      var name = get("name");
      var phone = get("phone");
      var email = get("email");
      var type = get("work_type");
      var location = get("location");
      var scope = get("scope");
      var timing = get("timing");

      if (!name || !phone || !location || !scope) {
        if (status) {
          status.textContent =
            "Please add your name, phone number, site location, and a short scope.";
        }
        return;
      }

      var subject = "Project enquiry: " + type + " at " + location;
      var lines = [
        "Name: " + name,
        "Phone: " + phone,
        "Email: " + (email || "Not provided"),
        "Work type: " + type,
        "Site location: " + location,
        "Target date: " + (timing || "Not set"),
        "",
        "Scope:",
        scope,
        "",
        "Sent from the Anelisa Investment Ltd website.",
      ];

      var mailto =
        "mailto:anelisainvestment@gmail.com?subject=" +
        encodeURIComponent(subject) +
        "&body=" +
        encodeURIComponent(lines.join("\n"));

      if (status) {
        status.textContent =
          "Your email app should open with these details. If it does not, call +255 754 664 641 or email anelisainvestment@gmail.com.";
      }

      window.location.href = mailto;
    });
  }
})();
