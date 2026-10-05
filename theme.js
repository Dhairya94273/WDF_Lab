(function () {
  'use strict';

  const THEME_KEY = 'studenthub-theme';

  function getStoredTheme() {
    try {
      const theme = localStorage.getItem(THEME_KEY);

      if (theme === 'light' || theme === 'dark') {
        return theme;
      }
    } catch (error) {
      console.warn('Unable to read saved theme:', error);
    }

    return null;
  }

  function getSystemTheme() {
    return window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }

  function getPreferredTheme() {
    return getStoredTheme() || getSystemTheme();
  }

  function saveTheme(theme) {
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch (error) {
      console.warn('Unable to save theme:', error);
    }
  }

  function updateThemeButtons(theme) {
    const isDark = theme === 'dark';

    document.querySelectorAll('.theme-toggle').forEach(function (button) {
      const icon = button.querySelector('i');

      if (icon) {
        // Bootstrap Icons
        icon.className = isDark
          ? 'bi bi-sun-fill'
          : 'bi bi-moon-stars-fill';
      }

      const label = isDark
        ? 'Switch to light mode'
        : 'Switch to dark mode';

      button.setAttribute('title', label);
      button.setAttribute('aria-label', label);
      button.setAttribute('aria-pressed', String(isDark));
    });
  }

  function applyTheme(theme, save = true) {
    const isDark = theme === 'dark';
    const palette = isDark ? {
      '--page-bg': '#0b1220',
      '--page-text': '#e5edf8',
      '--page-text-strong': '#f8fafc',
      '--page-text-soft': '#b9c7d9',
      '--panel': '#111b2d',
      '--panel-alt': '#172640',
      '--panel-soft': '#142033',
      '--border': '#26364d',
      '--border-strong': '#344863',
      '--shadow': 'rgba(0, 0, 0, 0.35)',
      '--sidebar-bg': '#0f172a',
      '--sidebar-text': '#eaf2ff',
      '--sidebar-hover': '#1e2d48',
      '--navbar-bg': '#172554',
      '--navbar-text': '#f8fafc',
      '--accent': '#60a5fa',
      '--accent-hover': '#93c5fd',
      '--accent-soft': '#172d4d',
      '--success-bg': 'rgba(34, 197, 94, 0.14)',
      '--success-text': '#86efac',
      '--warning-bg': 'rgba(234, 179, 8, 0.14)',
      '--warning-text': '#fde68a',
      '--danger-bg': 'rgba(239, 68, 68, 0.14)',
      '--danger-text': '#fca5a5',
      '--info-bg': 'rgba(59, 130, 246, 0.14)',
      '--info-text': '#93c5fd',
      '--input-bg': '#0d1728',
      '--input-text': '#f8fafc',
      '--input-placeholder': '#8fa1b8',
      '--muted': '#9fb0c5',
      '--icon-color': '#b9c7d9'
    } : {
      '--page-bg': '#f5f7fb',
      '--page-text': '#1f2937',
      '--page-text-strong': '#111827',
      '--page-text-soft': '#475467',
      '--panel': '#ffffff',
      '--panel-alt': '#eef3ff',
      '--panel-soft': '#f8fafc',
      '--border': '#e2e8f0',
      '--border-strong': '#cbd5e1',
      '--shadow': 'rgba(15, 23, 42, 0.10)',
      '--sidebar-bg': '#16213e',
      '--sidebar-text': '#ffffff',
      '--sidebar-hover': '#24365f',
      '--navbar-bg': '#1d4ed8',
      '--navbar-text': '#ffffff',
      '--accent': '#2563eb',
      '--accent-hover': '#1d4ed8',
      '--accent-soft': '#eff6ff',
      '--success-bg': '#e8f7ee',
      '--success-text': '#198754',
      '--warning-bg': '#fff7df',
      '--warning-text': '#a16207',
      '--danger-bg': '#feecec',
      '--danger-text': '#dc2626',
      '--info-bg': '#eaf4ff',
      '--info-text': '#2563eb',
      '--input-bg': '#ffffff',
      '--input-text': '#111827',
      '--input-placeholder': '#98a2b3',
      '--muted': '#667085',
      '--icon-color': '#475467'
    };

    Object.entries(palette).forEach(function ([property, value]) {
      document.documentElement.style.setProperty(property, value);
    });

    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.style.colorScheme = theme;
    document.body.classList.toggle('dark-mode', isDark);
    document.body.setAttribute('data-theme', theme);

    if (save) {
      saveTheme(theme);
    }

    updateThemeButtons(theme);
  }

  function createToggle() {
    if (document.querySelector('.theme-toggle')) {
      updateThemeButtons(getPreferredTheme());
      return;
    }

    const toggle = document.createElement('button');

    toggle.type = 'button';
    toggle.className = 'theme-toggle';

    toggle.innerHTML = `
      <i class="bi bi-moon-stars-fill" aria-hidden="true"></i>
    `;

    const target = document.querySelector('.navbar-right');

    if (target) {
      target.appendChild(toggle);
    } else {
      const navbar = document.querySelector('.navbar');

      if (navbar) {
        const container = document.createElement('div');

        container.className = 'navbar-right';
        container.appendChild(toggle);
        navbar.appendChild(container);
      }
    }

    toggle.addEventListener('click', function () {
      const currentTheme =
        document.body.classList.contains('dark-mode')
          ? 'dark'
          : 'light';

      const nextTheme =
        currentTheme === 'dark'
          ? 'light'
          : 'dark';

      applyTheme(nextTheme);
    });

    updateThemeButtons(getPreferredTheme());
  }

  function watchSystemTheme() {
    if (!window.matchMedia) {
      return;
    }

    const mediaQuery = window.matchMedia(
      '(prefers-color-scheme: dark)'
    );

    mediaQuery.addEventListener('change', function (event) {
      // Only follow system changes if the user
      // has not manually selected a theme.
      if (!getStoredTheme()) {
        applyTheme(event.matches ? 'dark' : 'light', false);
      }
    });
  }

  function init() {
    applyTheme(getPreferredTheme(), false);
    createToggle();
    watchSystemTheme();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();