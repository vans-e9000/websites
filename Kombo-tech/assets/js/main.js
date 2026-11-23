document.addEventListener('DOMContentLoaded', () => {
  const menuButton = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  const closeMenu = () => {
    if (!menuButton || !navLinks) return;
    navLinks.classList.remove('active');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.textContent = '☰';
    document.body.classList.remove('menu-open');
  };

  if (menuButton && navLinks) {
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('active');
      menuButton.setAttribute('aria-expanded', String(isOpen));
      menuButton.textContent = isOpen ? '✕' : '☰';
      document.body.classList.toggle('menu-open', isOpen);
    });
    navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
    document.addEventListener('click', event => {
      if (!navLinks.contains(event.target) && !menuButton.contains(event.target)) closeMenu();
    });
  }

  const revealElements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    revealElements.forEach(element => observer.observe(element));
  } else {
    revealElements.forEach(element => element.classList.add('visible'));
  }

  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    if (link.getAttribute('href') === currentPage) link.setAttribute('aria-current', 'page');
  });

  const nav = document.querySelector('nav');
  if (nav) {
    const updateNav = () => nav.classList.toggle('scrolled', window.scrollY > 24);
    updateNav();
    window.addEventListener('scroll', updateNav, { passive: true });
  }

  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', event => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const data = new FormData(form);
      const subject = encodeURIComponent(`Project enquiry from ${data.get('name')}`);
      const body = encodeURIComponent([
        `Name: ${data.get('name')}`,
        `Email: ${data.get('email')}`,
        `Phone: ${data.get('phone') || 'Not provided'}`,
        `Service: ${data.get('service')}`,
        `Budget: ${data.get('budget') || 'Not provided'}`,
        '',
        String(data.get('project-details'))
      ].join('\n'));
      window.location.href = `mailto:kombotech@yahoo.com?subject=${subject}&body=${body}`;
    });
  }
});
