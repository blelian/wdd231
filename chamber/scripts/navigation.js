document.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.getElementById('menu-toggle');
  const navList = document.querySelector('#primary-nav ul');

  toggleButton.addEventListener('click', () => {
    navList.classList.toggle('show');
  });
});
