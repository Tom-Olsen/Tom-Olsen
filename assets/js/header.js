/* Shared banner behavior, adapted from Ember/Sparkive's header controller. */
(() => {
  const root = document.documentElement;
  const layout = document.querySelector('.header-inner');
  const header = document.querySelector('.site-header');
  const phoneViewport = window.matchMedia('(max-width: 59.984375em)');
  let observer;
  let isCompact = false;

  function observeHeading() {
    observer?.disconnect();
    observer = null;
    layout.style.setProperty('--header-outer-space', `${Math.max(0, layout.getBoundingClientRect().left)}px`);
    if (phoneViewport.matches) {
      updateCompact(false);
      return;
    }
    const heading = document.querySelector('.page-section:not([hidden]) h1');
    if (!heading) return;
    // Match the reference sites' expanded-height boundary and 4px hysteresis.
    const unit = parseFloat(getComputedStyle(root).getPropertyValue('--header-unit'));
    const boundary = 4.8 * unit + (isCompact ? 4 : 0);
    const currentObserver = new IntersectionObserver(entries => {
      if (currentObserver !== observer) return;
      updateCompact(entries[entries.length - 1].boundingClientRect.bottom < boundary);
    }, { rootMargin: `-${boundary}px 0px 0px 0px`, threshold: 0 });
    observer = currentObserver;
    observer.observe(heading);
  }

  function updateCompact(compact) {
    if (compact === isCompact) return;
    isCompact = compact;
    layout.classList.toggle('header-inner--compact', compact);
    observeHeading();
  }

  // Keep the CV sidebar aligned with the banner throughout the animation.
  new ResizeObserver(() => {
    root.style.setProperty('--header-height', `${header.getBoundingClientRect().height}px`);
  }).observe(header);
  window.addEventListener('resize', observeHeading);
  document.fonts.ready.then(observeHeading);
  document.addEventListener('portfolio:sectionchange', () => {
    updateCompact(false);
    observeHeading();
  });
  observeHeading();

  const search = document.querySelector('.header-search');
  const panel = document.querySelector('.search-panel');
  const input = document.querySelector('#portfolio-search');
  const toggle = document.querySelector('.search-toggle');
  const backdrop = document.querySelector('.search-backdrop');
  const output = document.querySelector('.search-output');
  const summary = document.querySelector('.search-summary');
  const results = document.querySelector('.search-results');
  const clear = document.querySelector('.search-clear');
  let searchFocus;
  let suppressOpen = false;

  // Index the existing content directly, so search also works from a file preview.
  const records = [];
  document.querySelectorAll('.page-section').forEach(page => {
    const label = document.querySelector(`.section-nav a[href="#${page.id}"]`).textContent;
    page.querySelectorAll(':scope > .page-heading, :scope > section, :scope > aside').forEach(block => {
      const heading = block.querySelector('h1, h2, h3');
      if (!heading) return;
      const title = heading.textContent.trim();
      const text = [...block.querySelectorAll('p, li, dd')].map(element => element.textContent).join(' ').replace(/\s+/g, ' ').trim();
      records.push({ id: page.id, label, title, text, haystack: `${label} ${title} ${text}`.toLowerCase() });
    });
  });

  function highlight(element, text, tokens) {
    // Use text nodes throughout: a search query can never become executable HTML.
    const escaped = tokens.map(token => token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    const pattern = new RegExp(`(${escaped.join('|')})`, 'gi');
    text.split(pattern).forEach((part, index) => {
      if (index % 2) {
        const mark = document.createElement('mark');
        mark.textContent = part;
        element.append(mark);
      } else element.append(document.createTextNode(part));
    });
  }

  function renderResults() {
    const query = input.value.trim().toLowerCase();
    const tokens = [...new Set(query.split(/\s+/).filter(Boolean))];
    results.replaceChildren();
    clear.hidden = !input.value;
    if (!query) {
      summary.textContent = 'Type to start searching';
      return;
    }
    const matches = records.filter(record => tokens.every(token => record.haystack.includes(token)));
    matches.sort((a, b) => Number(b.title.toLowerCase().includes(query)) - Number(a.title.toLowerCase().includes(query)));
    summary.textContent = matches.length ? `${matches.length} matching ${matches.length === 1 ? 'section' : 'sections'}` : 'No matching documents';
    matches.forEach(record => {
      const item = document.createElement('li');
      const link = document.createElement('a');
      link.href = `#${record.id}`;
      const section = document.createElement('span');
      section.className = 'search-result-section';
      section.textContent = record.label;
      const title = document.createElement('span');
      title.className = 'search-result-title';
      highlight(title, record.title, tokens);
      const excerpt = document.createElement('span');
      excerpt.className = 'search-result-excerpt';
      const firstMatch = Math.min(...tokens.map(token => record.text.toLowerCase().indexOf(token)).filter(index => index >= 0));
      const start = Number.isFinite(firstMatch) ? Math.max(0, firstMatch - 65) : 0;
      const end = start + 190;
      highlight(excerpt, `${start ? '…' : ''}${record.text.slice(start, end)}${end < record.text.length ? '…' : ''}`, tokens);
      link.append(section, title, excerpt);
      item.append(link);
      results.append(item);
    });
  }

  function openSearch(previousFocus = document.activeElement) {
    if (search.classList.contains('is-open') || suppressOpen) return;
    closeDrawer(false);
    searchFocus = previousFocus;
    search.classList.add('is-open');
    root.classList.add('search-open');
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-modal', 'true');
    panel.setAttribute('aria-label', 'Search portfolio');
    backdrop.hidden = false;
    output.hidden = false;
    input.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-expanded', 'true');
    renderResults();
    input.focus({ preventScroll: true });
  }

  function closeSearch(restoreFocus = true) {
    if (!search.classList.contains('is-open')) return;
    search.classList.remove('is-open');
    root.classList.remove('search-open');
    panel.removeAttribute('role');
    panel.removeAttribute('aria-modal');
    panel.removeAttribute('aria-label');
    backdrop.hidden = true;
    output.hidden = true;
    input.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-expanded', 'false');
    if (restoreFocus && searchFocus?.isConnected) {
      suppressOpen = true;
      searchFocus.focus({ preventScroll: true });
      suppressOpen = false;
    }
  }

  search.hidden = false;
  toggle.hidden = false;
  toggle.addEventListener('click', () => openSearch(toggle));
  input.addEventListener('focus', event => openSearch(event.relatedTarget || input));
  input.addEventListener('input', renderResults);
  backdrop.addEventListener('click', () => closeSearch());
  document.querySelector('.search-back').addEventListener('click', () => closeSearch());
  document.querySelector('.search-form').addEventListener('reset', () => {
    input.value = '';
    renderResults();
    input.focus();
  });
  document.querySelector('.search-form').addEventListener('submit', event => {
    event.preventDefault();
    results.querySelector('a')?.click();
  });
  results.addEventListener('click', event => {
    if (event.target.closest('a')) closeSearch(false);
  });
  input.addEventListener('keydown', event => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      results.querySelector('a')?.focus();
    }
  });
  results.addEventListener('keydown', event => {
    if (!['ArrowDown', 'ArrowUp'].includes(event.key)) return;
    event.preventDefault();
    const links = [...results.querySelectorAll('a')];
    const index = links.indexOf(document.activeElement);
    if (event.key === 'ArrowUp' && index <= 0) input.focus();
    else links[(index + (event.key === 'ArrowDown' ? 1 : -1) + links.length) % links.length]?.focus();
  });

  const menu = document.querySelector('.menu-toggle');
  const drawerLayer = document.querySelector('.drawer-layer');
  const drawer = document.querySelector('.section-drawer');
  let drawerFocus;
  function closeDrawer(restoreFocus = true) {
    if (drawerLayer.hidden) return;
    drawerLayer.hidden = true;
    root.classList.remove('drawer-open');
    menu.setAttribute('aria-expanded', 'false');
    if (restoreFocus) drawerFocus?.focus({ preventScroll: true });
  }
  menu.hidden = false;
  menu.addEventListener('click', () => {
    closeSearch(false);
    drawerFocus = document.activeElement;
    drawerLayer.hidden = false;
    root.classList.add('drawer-open');
    menu.setAttribute('aria-expanded', 'true');
    drawer.querySelector('.drawer-close').focus();
  });
  document.querySelector('.drawer-close').addEventListener('click', () => closeDrawer());
  document.querySelector('.drawer-backdrop').addEventListener('click', () => closeDrawer());
  drawer.querySelector('.drawer-nav').addEventListener('click', event => {
    if (event.target.closest('a')) closeDrawer(false);
  });

  function trapFocus(event, container) {
    const controls = [...container.querySelectorAll('a[href], button:not([hidden]), input')].filter(element => element.getClientRects().length);
    const first = controls[0], last = controls[controls.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }
  document.addEventListener('keydown', event => {
    const searching = search.classList.contains('is-open');
    if (event.key === 'Escape') {
      if (searching) { event.preventDefault(); closeSearch(); }
      else if (!drawerLayer.hidden) { event.preventDefault(); closeDrawer(); }
      return;
    }
    if (event.key === 'Tab') {
      if (searching) trapFocus(event, panel);
      else if (!drawerLayer.hidden) trapFocus(event, drawer);
      return;
    }
    const typing = event.target.closest('input, textarea, [contenteditable="true"]');
    if (!typing && (event.key === '/' || ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k'))) {
      event.preventDefault();
      openSearch();
    }
  });
})();
