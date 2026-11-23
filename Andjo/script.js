document.documentElement.classList.add('js-ready');

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#primary-navigation');

function setNavigation(open) {
  if (!menuButton || !navigation) return;
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  navigation.classList.toggle('is-open', open);
}

if (menuButton && navigation) {
  menuButton.addEventListener('click', () => {
    setNavigation(menuButton.getAttribute('aria-expanded') !== 'true');
  });
  navigation.addEventListener('click', (event) => {
    if (event.target.closest('a')) setNavigation(false);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setNavigation(false);
  });
  document.addEventListener('click', (event) => {
    if (!navigation.contains(event.target) && !menuButton.contains(event.target)) setNavigation(false);
  });
  window.addEventListener('resize', () => {
    if (window.matchMedia('(min-width: 992px)').matches) setNavigation(false);
  });
}

const revealItems = document.querySelectorAll('[data-reveal]');
if ('IntersectionObserver' in window && revealItems.length) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -24px 0px' });
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

const quoteForm = document.querySelector('#quote-form');
if (quoteForm) {
  quoteForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!quoteForm.reportValidity()) return;
    const recipient = quoteForm.dataset.email;
    if (!recipient) return;
    const fields = new FormData(quoteForm);
    const message = [...fields.entries()]
      .map(([label, value]) => `${label}: ${String(value).trim()}`)
      .join('\n');
    const subject = encodeURIComponent('Project quotation request for Andjo Engineering');
    const body = encodeURIComponent(message);
    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
  });
}
