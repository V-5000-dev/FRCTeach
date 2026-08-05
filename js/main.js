const isNested = window.location.pathname.split('/').length > 2;
const headerPath = isNested ? '../components/header.html' : 'components/header.html';

fetch(headerPath)
  .then(res => res.text())
  .then(html => {
    document.getElementById('header').innerHTML = html;

    const dropdown = document.getElementById('lessons-dropdown');
    const trigger = dropdown.querySelector('.dropdown-trigger');

    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdown.classList.toggle('open');
    });

    document.addEventListener('click', () => {
      dropdown.classList.remove('open');
    });
  });
