const menu = document.querySelector('.menu');
const navlinks = document.querySelector('.navlinks');

if (menu && navlinks) {
  const setState = (open) => {
    navlinks.classList.toggle('open', open);
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  };

  setState(false);

  menu.addEventListener('click', () => {
    setState(!navlinks.classList.contains('open'));
  });

  navlinks.addEventListener('click', (event) => {
    if (event.target.closest('a')) setState(false);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && navlinks.classList.contains('open')) {
      setState(false);
      menu.focus();
    }
  });

  document.addEventListener('click', (event) => {
    if (!navlinks.classList.contains('open')) return;
    if (navlinks.contains(event.target) || menu.contains(event.target)) return;
    setState(false);
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 820) setState(false);
  });
}

document.querySelectorAll('[data-quote-form]').forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const notice = form.querySelector('.notice');
    const button = form.querySelector('button[type="submit"]');
    if (notice) {
      notice.textContent = 'Thank you. Your project enquiry has been received. We will contact you using the details provided.';
      notice.style.display = 'block';
    }
    if (button) {
      button.disabled = true;
      button.textContent = 'Enquiry received ✓';
    }
    form.reset();
  });
});

const revealItems = document.querySelectorAll('.section,.page-hero,.service-card,.project-card,.contact-card,.process-step,.quote-box');
revealItems.forEach((item, index) => {
  item.classList.add('reveal');
  if (index % 4 === 1) item.classList.add('reveal-delay-1');
  if (index % 4 === 2) item.classList.add('reveal-delay-2');
  if (index % 4 === 3) item.classList.add('reveal-delay-3');
});

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px' });

  document.querySelectorAll('.reveal').forEach((item) => observer.observe(item));
} else {
  document.querySelectorAll('.reveal').forEach((item) => item.classList.add('is-visible'));
}
