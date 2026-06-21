import { useEffect, useRef, useCallback } from 'react';

/**
 * SlideTabNav — frictionless sliding-pill tab bar.
 * No mix-blend-mode. No z-index wars. No overflow bleed.
 *
 * Props:
 *   items       [{label, icon}]   icon = FA class, e.g. 'fa-user'
 *   activeIndex number
 *   onItemClick (index) => void
 */
export default function SlideTabNav({ items = [], activeIndex = 0, onItemClick }) {
  const trackRef = useRef(null);
  const listRef  = useRef(null);
  const pillRef  = useRef(null);

  /**
   * Move the pill to item[idx].
   * Uses getBoundingClientRect so padding/gap/border offsets never throw it off.
   */
  const movePill = useCallback((idx, animate = true) => {
    const track = trackRef.current;
    const list  = listRef.current;
    const pill  = pillRef.current;
    if (!track || !list || !pill) return;
    const li = list.children[idx];
    if (!li) return;

    const tr = track.getBoundingClientRect();
    const lr = li.getBoundingClientRect();

    if (!animate) pill.style.transitionDuration = '0ms';
    pill.style.left  = `${lr.left - tr.left}px`;
    pill.style.width = `${lr.width}px`;
    if (!animate) {
      pill.getBoundingClientRect(); // force reflow before re-enabling transition
      pill.style.transitionDuration = '';
    }
  }, []);

  // Animate when controlled activeIndex changes
  useEffect(() => { movePill(activeIndex, true); }, [activeIndex, movePill]);

  // Instant placement on mount + keep synced on resize
  useEffect(() => {
    const raf = requestAnimationFrame(() => movePill(activeIndex, false));
    const ro = new ResizeObserver(() => movePill(activeIndex, false));
    if (trackRef.current) ro.observe(trackRef.current);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []); // eslint-disable-line

  return (
    <nav className="stnav" aria-label="Dashboard tabs">
      <div className="stnav-track" ref={trackRef}>
        {/* Pill lives inside the track so overflow:hidden clips it cleanly */}
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
