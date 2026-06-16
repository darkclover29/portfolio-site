import { useState, useEffect, useCallback } from 'react';

// Public swatches — shown in sidebar
export const SWATCH_THEMES = ['minimal', 'matrix', 'cyberpunk', 'dracula', 'nord', 'light', 'mono', 'solarized', 'tokyo-night', 'catppuccin'];
// All valid themes including secrets
const ALL_THEMES = [...SWATCH_THEMES, 'anti-magic'];
const STORAGE_KEY = 'harsh_portfolio_theme';

export function useTheme() {
  const [theme, setThemeState] = useState(() => {
    try { return localStorage.getItem(STORAGE_KEY) || 'minimal'; }
    catch { return 'minimal'; }
  });

  useEffect(() => {
    document.body.className = 'theme-' + theme;
  }, [theme]);

  const setTheme = useCallback((name) => {
    if (!ALL_THEMES.includes(name)) return;
    setThemeState(name);
    try { localStorage.setItem(STORAGE_KEY, name); } catch {}
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
