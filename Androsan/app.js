const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(open));
  });
}
const form = document.querySelector('#project-form');
const status = document.querySelector('.form-status');
if (form && status) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    status.style.display = 'block';
    status.textContent = 'Thank you. Your project details are ready for the Androsan team.';
    form.reset();
  });
}
