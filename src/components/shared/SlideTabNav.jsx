import { useEffect, useRef } from 'react';

/**
 * SlideTabNav — pure-CSS active pill.
 * No JS positioning, no getBoundingClientRect, no pill element.
 * Active class drives everything; CSS handles the highlight + animation.
 */
export default function SlideTabNav({ items = [], activeIndex = 0, onItemClick }) {
  const listRef = useRef(null);

  // Scroll active item into view on narrow screens
  useEffect(() => {
    const li = listRef.current?.children[activeIndex];
    li?.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'smooth' });
  }, [activeIndex]);

  return (
    <nav className="stnav" aria-label="Dashboard tabs">
      <ul className="stnav-list" ref={listRef} role="tablist">
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
    </nav>
  );
}
