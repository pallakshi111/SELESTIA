(function () {
  const key = 'selestiaTheme';
  const applyTheme = (theme) => {
    const isLight = theme === 'light';
    document.body.classList.toggle('light-theme', isLight);
    document.querySelectorAll('[data-theme-toggle]').forEach((button) => {
      button.setAttribute('aria-pressed', String(isLight));
      const icon = button.querySelector('.theme-icon');
      const text = button.querySelector('.theme-label');
      if (icon) icon.textContent = isLight ? '☀️' : '🌙';
      if (text) text.textContent = isLight ? 'Light' : 'Dark';
      button.setAttribute('aria-label', isLight ? 'Switch to dark mode' : 'Switch to light mode');
    });
  };
  const saved = localStorage.getItem(key) || 'dark';
  applyTheme(saved);
  document.addEventListener('click', (event) => {
    const button = event.target.closest('[data-theme-toggle]');
    if (!button) return;
    const next = document.body.classList.contains('light-theme') ? 'dark' : 'light';
    localStorage.setItem(key, next);
    applyTheme(next);
  });
})();
