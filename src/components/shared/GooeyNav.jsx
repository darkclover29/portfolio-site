import { useRef, useEffect, useState, useCallback } from 'react';

const GooeyNav = ({
  items,
  animationTime = 600,
  particleCount = 15,
  particleDistances = [90, 10],
  particleR = 100,
  timeVariance = 300,
  colors = [1, 2, 3, 1, 2, 3, 1, 4],
  initialActiveIndex = 0,
  activeIndex: controlledIndex,
  onItemClick,
}) => {
  const containerRef = useRef(null);
  const navRef       = useRef(null);
  const filterRef    = useRef(null);
  const textRef      = useRef(null);
  const [activeIndex, setActiveIndex] = useState(
    controlledIndex !== undefined ? controlledIndex : initialActiveIndex
  );

  const noise = (n = 1) => n / 2 - Math.random() * n;
  const getXY = (distance, pointIndex, totalPoints) => {
    const angle = ((360 + noise(8)) / totalPoints) * pointIndex * (Math.PI / 180);
    return [distance * Math.cos(angle), distance * Math.sin(angle)];
  };
  const createParticle = (i, t, d, r) => {
    const rotate = noise(r / 10);
    return {
      start: getXY(d[0], particleCount - i, particleCount),
      end:   getXY(d[1] + noise(7), particleCount - i, particleCount),
      time:  t,
      scale: 1 + noise(0.2),
      color: colors[Math.floor(Math.random() * colors.length)],
      rotate: rotate > 0 ? (rotate + r / 20) * 10 : (rotate - r / 20) * 10,
    };
  };

  const updateEffectPosition = useCallback((element) => {
    if (!containerRef.current || !filterRef.current || !textRef.current) return;
    const cr  = containerRef.current.getBoundingClientRect();
    const pos = element.getBoundingClientRect();
    const s   = {
      left:   `${pos.x - cr.x}px`,
      top:    `${pos.y - cr.y}px`,
      width:  `${pos.width}px`,
      height: `${pos.height}px`,
    };
    Object.assign(filterRef.current.style, s);
    Object.assign(textRef.current.style, s);
    textRef.current.innerText = element.innerText;
  }, []);

  const makeParticles = useCallback((element) => {
    const d = particleDistances;
    const r = particleR;
    element.style.setProperty('--time', `${animationTime * 2 + timeVariance}ms`);
    for (let i = 0; i < particleCount; i++) {
      const t = animationTime * 2 + noise(timeVariance * 2);
      const p = createParticle(i, t, d, r);
      element.classList.remove('active');
      setTimeout(() => {
        const particle = document.createElement('span');
        const point    = document.createElement('span');
        particle.classList.add('gn-particle');
        particle.style.setProperty('--start-x', `${p.start[0]}px`);
        particle.style.setProperty('--start-y', `${p.start[1]}px`);
        particle.style.setProperty('--end-x',   `${p.end[0]}px`);
        particle.style.setProperty('--end-y',   `${p.end[1]}px`);
        particle.style.setProperty('--time',    `${p.time}ms`);
        particle.style.setProperty('--scale',   `${p.scale}`);
        particle.style.setProperty('--color',   `var(--color-${p.color}, white)`);
        particle.style.setProperty('--rotate',  `${p.rotate}deg`);
        point.classList.add('gn-point');
        particle.appendChild(point);
        element.appendChild(particle);
        requestAnimationFrame(() => element.classList.add('active'));
        setTimeout(() => { try { element.removeChild(particle); } catch {} }, t);
      }, 30);
    }
  }, [animationTime, particleCount, particleDistances, particleR, timeVariance, colors]); // eslint-disable-line

  const handleClick = useCallback((e, index) => {
    e.preventDefault();
    const liEl = e.currentTarget;
    if (activeIndex === index) return;
    setActiveIndex(index);
    updateEffectPosition(liEl);
    if (filterRef.current) {
      filterRef.current.querySelectorAll('.gn-particle').forEach(p => filterRef.current.removeChild(p));
    }
    if (textRef.current) {
      textRef.current.classList.remove('active');
      void textRef.current.offsetWidth;
      textRef.current.classList.add('active');
    }
    if (filterRef.current) makeParticles(filterRef.current);
    onItemClick?.(index);
  }, [activeIndex, updateEffectPosition, makeParticles, onItemClick]);

  const handleKeyDown = (e, index) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const liEl = e.currentTarget.parentElement;
      if (liEl) handleClick({ currentTarget: liEl, preventDefault: () => {} }, index);
    }
  };

  // Sync when controlled prop changes (keyboard shortcuts, terminal command)
  useEffect(() => {
    if (controlledIndex === undefined || controlledIndex === activeIndex) return;
    setActiveIndex(controlledIndex);
    const liEl = navRef.current?.querySelectorAll('li')[controlledIndex];
    if (liEl) {
      updateEffectPosition(liEl);
      // Show pill instantly (no particle burst for external nav)
      if (filterRef.current) {
        filterRef.current.classList.remove('active');
        void filterRef.current.offsetWidth;
        filterRef.current.classList.add('active');
      }
      textRef.current?.classList.remove('active');
      void textRef.current?.offsetWidth;
      textRef.current?.classList.add('active');
    }
  }, [controlledIndex]); // eslint-disable-line

  // Initial position + pill on mount
  useEffect(() => {
    if (!navRef.current || !containerRef.current) return;
    const idx  = controlledIndex !== undefined ? controlledIndex : initialActiveIndex;
    const liEl = navRef.current.querySelectorAll('li')[idx];
    if (liEl) {
      updateEffectPosition(liEl);
      // Slight delay so layout is settled before measuring
      requestAnimationFrame(() => {
        updateEffectPosition(liEl);
        // Show pill without animation on load
        if (filterRef.current) {
          filterRef.current.style.setProperty('--skip-anim', '1');
          filterRef.current.classList.add('active');
        }
        textRef.current?.classList.add('active');
      });
    }
    const ro = new ResizeObserver(() => {
      const cur = navRef.current?.querySelectorAll('li')[activeIndex];
      if (cur) updateEffectPosition(cur);
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []); // eslint-disable-line

  return (
    <div className="gooey-nav-container" ref={containerRef}>
      <nav>
        <ul ref={navRef}>
          {items.map((item, index) => (
            <li key={index} className={activeIndex === index ? 'active' : ''}>
              <a
                href={item.href || '#'}
                onClick={e => handleClick(e, index)}
                onKeyDown={e => handleKeyDown(e, index)}
              >
                {item.icon && <i className={`fas ${item.icon}`} />}
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <span className="gn-effect gn-filter" ref={filterRef} />
      <span className="gn-effect gn-text"   ref={textRef} />
    </div>
  );
};

export default GooeyNav;
