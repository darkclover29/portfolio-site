import { useState, useEffect, useCallback } from 'react';

// Public swatches — shown in sidebar. Deliberately small: mono (default,
// pure black & white), dark/light, matrix as the signature CLI option.
export const SWATCH_THEMES = ['mono', 'dark', 'light', 'matrix'];
// All valid themes including secrets
const ALL_THEMES = [...SWATCH_THEMES, 'anti-magic'];
const STORAGE_KEY = 'harsh_portfolio_theme';
const DEFAULT_THEME = 'mono';

export function useTheme() {
  const [theme, setThemeState] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      // Migrate visitors who had one of the retired themes
      return ALL_THEMES.includes(stored) ? stored : DEFAULT_THEME;
    } catch { return DEFAULT_THEME; }
  });

  useEffect(() => {
    document.body.className = 'theme-' + theme;
  }, [theme]);

  const setTheme = useCallback((name) => {
    if (!ALL_THEMES.includes(name)) return;
    setThemeState(name);
    try { localStorage.setItem(STORAGE_KEY, name); } catch { /* storage unavailable */ }
  }, []);

  const getAccentColor = useCallback(() => {
    try { return getComputedStyle(document.body).getPropertyValue('--accent').trim() || '#6366f1'; }
    catch { return '#6366f1'; }
  }, []);

  const getAccentRgb = useCallback(() => {
    try { return getComputedStyle(document.body).getPropertyValue('--accent-rgb').trim() || '99,102,241'; }
    catch { return '99,102,241'; }
  }, []);

  return { theme, setTheme, themes: SWATCH_THEMES, getAccentColor, getAccentRgb };
}
