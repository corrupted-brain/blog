// about-responsive.js: Navigation and mobile menu for about page
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });
  function closeMenu() {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  }
  window.closeMenu = closeMenu;
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) closeMenu();
  });
}
