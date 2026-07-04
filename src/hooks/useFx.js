import { useSyncExternalStore } from 'react';

/**
 * FX mode — easter-egg toggle for the decorative effects layer
 * (custom cursor, trail, card tilt, scramble text, border glow, tab burst).
 *
 * Off by default so the standard experience stays clean and fast.
 * Toggle via the terminal command `fx` or `window.__ht_fx()` in the console.
 * Session-scoped: resets on a new visit.
 */
const STORAGE_KEY = 'harsh_portfolio_fx';

let fxOn = (() => {
  try { return sessionStorage.getItem(STORAGE_KEY) === '1'; }
  catch { return false; }
})();

const listeners = new Set();

function emit() {
  for (const fn of listeners) fn();
}

export function isFxOn() {
  return fxOn;
}

export function setFx(on) {
  fxOn = !!on;
  try { sessionStorage.setItem(STORAGE_KEY, fxOn ? '1' : '0'); } catch { /* private mode */ }
  document.body.classList.toggle('fx-on', fxOn);
  emit();
  return fxOn;
}

export function toggleFx() {
  return setFx(!fxOn);
}

function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function useFx() {
  return useSyncExternalStore(subscribe, isFxOn);
}

// Console easter egg + initial body class
if (typeof window !== 'undefined') {
  window.__ht_fx = toggleFx;
  if (fxOn) document.body.classList.add('fx-on');
}
