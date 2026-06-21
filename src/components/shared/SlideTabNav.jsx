import { useEffect, useRef, useCallback } from 'react';

/**
 * SlideTabNav — clean sliding-pill tab navigation.
 * Props:
 *   items       [{label, icon}]   icon = FA class e.g. 'fa-user'
 *   activeIndex number
 *   onItemClick (index) => void
 */
export default function SlideTabNav({ items = [], activeIndex = 0, onItemClick }) {
  const listRef = useRef(null);
  const pillRef = useRef(null);

  const movePill = useCallback((idx, animate = true) => {
    const list = listRef.current;
    const pill = pillRef.current;
    if (!list || !pill) return;
    const li = list.children[idx];
    if (!li) return;

    if (!animate) pill.style.transitionDuration = '0ms';
    pill.style.left  = `${li.offsetLeft}px`;
    pill.style.width = `${li.offsetWidth}px`;
    if (!animate) {
      pill.getBoundingClientRect(); // force reflow
      pill.style.transitionDuration = '';
    }
  }, []);

  // Animate when controlled prop changes
  useEffect(() => {
    movePill(activeIndex, true);
  }, [activeIndex, movePill]);

  // Instant on mount + track resize
  useEffect(() => {
    const frame = requestAnimationFrame(() => movePill(activeIndex, false));
    const ro = new ResizeObserver(() => movePill(activeIndex, false));
    if (listRef.current) ro.observe(listRef.current);
    return () => { cancelAnimationFrame(frame); ro.disconnect(); };
  }, []); // eslint-disable-line

  return (
    <nav className="stnav" aria-label="Dashboard tabs">
      <div className="stnav-track">
        <span className="stnav-pill" ref={pillRef} aria-hidden="true" />
        <ul ref={listRef} role="tablist">
          {items.map((item, i) => (
            <li key={i} role="presentation">
              <button
                type="button"
                role="tab"
                aria-selected={i === activeIndex}
                className={`stnav-btn${i === activeIndex ? ' active' : ''}`}
                onClick={() => onItemClick?.(i)}
              >
                {item.icon && <i className={`fas ${item.icon}`} aria-hidden="true" />}
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
