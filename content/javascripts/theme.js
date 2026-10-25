/* Apply the saved/system palette before CSS loads, then wire up the header toggle. */
(() => {
  const root = document.documentElement;
  const media = window.matchMedia('(prefers-color-scheme: dark)');
  const key = 'tom-olsen-theme';
  const modes = ['system', 'light', 'dark'];
  let preference = 'system';
  try {
    const saved = localStorage.getItem(key);
    if (modes.includes(saved)) preference = saved;
  } catch { /* The system preference also works when storage is unavailable. */ }

  function apply() {
    const dark = preference === 'dark' || (preference === 'system' && media.matches);
    root.dataset.theme = dark ? 'dark' : 'light';
    root.dataset.themePreference = preference;
    const button = document.querySelector('.theme-toggle');
    if (!button) return;
    const next = modes[(modes.indexOf(preference) + 1) % modes.length];
    const label = next === 'system' ? 'Switch to system preference' : `Switch to ${next} mode`;
    button.setAttribute('aria-label', label);
    button.title = label;
    button.querySelectorAll('[data-theme-icon]').forEach(icon => {
      icon.hidden = icon.dataset.themeIcon !== preference;
    });
    button.hidden = false;
  }

  apply();
  media.addEventListener('change', apply);
  window.addEventListener('storage', event => {
    if (event.key === key || event.key === null) {
      preference = modes.includes(event.newValue) ? event.newValue : 'system';
      apply();
    }
  });
  document.addEventListener('DOMContentLoaded', () => {
    apply();
    document.querySelector('.theme-toggle').addEventListener('click', () => {
      preference = modes[(modes.indexOf(preference) + 1) % modes.length];
      try { localStorage.setItem(key, preference); } catch { /* Keep the in-page choice. */ }
      apply();
    });
  });
})();
