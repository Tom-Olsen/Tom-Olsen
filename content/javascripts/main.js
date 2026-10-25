/* Plain links still work without JavaScript. With it, show one section at a time. */
(() => {
  const pages = [...document.querySelectorAll('.page-section')];
  const navigation = [...document.querySelectorAll('.section-nav a, .drawer-nav a')];
  const main = document.querySelector('main');
  const titles = { home: 'Portfolio', phd: 'PhD Research', ember: 'Ember', sparkive: 'Sparkive' };

  function sectionId() {
    // Keep the old About link useful after replacing the Dimension template.
    const hash = window.location.hash.slice(1).toLowerCase();
    return Object.hasOwn(titles, hash) ? hash : 'home';
  }

  function showSection(moveFocus = false) {
    const id = sectionId();
    pages.forEach(page => { page.hidden = page.id !== id; });
    navigation.forEach(link => {
      if (link.hash === `#${id}`) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
    document.title = `Tom Olsen | ${titles[id]}`;
    document.dispatchEvent(new Event('portfolio:sectionchange'));
    if (moveFocus) {
      main.focus({ preventScroll: true });
      // On phones, switching sections should lead directly to the selected content.
      window.scrollTo({ top: Math.max(0, main.offsetTop - document.querySelector('.site-header').offsetHeight), behavior: 'instant' });
    }
  }

  document.documentElement.classList.add('js-enabled');
  showSection(Boolean(window.location.hash));
  window.addEventListener('hashchange', () => {
    // The skip link moves focus without changing the selected portfolio section.
    if (window.location.hash !== '#main') showSection(true);
  });

  // Clicking the current section again also returns to the start of its content.
  document.addEventListener('click', event => {
    const link = event.target.closest('a[href^="#"]');
    if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (Object.hasOwn(titles, link.hash.slice(1)) && link.hash === window.location.hash) {
      event.preventDefault();
      showSection(true);
    }
  });
})();
