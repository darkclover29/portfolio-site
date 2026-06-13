import { useState, useEffect, useCallback } from 'react';

const THEMES = ['matrix', 'cyberpunk', 'dracula', 'nord', 'retro-light'];
const STORAGE_KEY = 'harsh_portfolio_theme';

export function useTheme() {
  const [theme, setThemeState] = useState(() => {
    try { return localStorage.getItem(STORAGE_KEY) || 'matrix'; }
    catch { return 'matrix'; }
  });

  useEffect(() => {
    document.body.className = `theme-${theme}`;
  }, [theme]);

  const setTheme = useCallback((name) => {
    if (!THEMES.includes(name)) return;
    setThemeState(name);
    try { localStorage.setItem(STORAGE_KEY, name); } catch {}
  }, []);

  const getAccentColor = useCallback(() => {
    try { return getComputedStyle(document.body).getPropertyValue('--accent-color').trim() || '#3bf13b'; }
    catch { return '#3bf13b'; }
  }, []);

  const getAccentRgb = useCallback(() => {
    try { return getComputedStyle(document.body).getPropertyValue('--accent-rgb').trim() || '92,247,92'; }
    catch { return '92,247,92'; }
  }, []);

  return { theme, setTheme, themes: THEMES, getAccentColor, getAccentRgb };
}
