import { useRef, useCallback } from 'react';

/**
 * MagneticButton — shifts slightly toward the cursor on hover.
 * Wrap any button or anchor with this.
 */
export default function MagneticButton({ children, className = '', strength = 0.35, tag: Tag = 'button', ...props }) {
  const ref = useRef(null);
  const frameRef = useRef(null);

  const onMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * strength;
    const dy = (e.clientY - cy) * strength;
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      if (el) el.style.transform = `translate(${dx}px, ${dy}px)`;
    });
  }, [strength]);

  const onLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    el.style.transition = 'transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94)';
    el.style.transform = 'translate(0,0)';
    setTimeout(() => { if (el) el.style.transition = ''; }, 400);
  }, []);

  return (
    <Tag
      ref={ref}
      className={className}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      {...props}
    >
      {children}
    </Tag>
  );
}
