const base = document.currentScript.src.slice(0, document.currentScript.src.lastIndexOf('/js/') + 1);

fetch(base + 'components/header.html')
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
