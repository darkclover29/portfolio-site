import { useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function ComingSoon({ open, onClose, projectName }) {
  useEffect(() => {
    if (!open) return;
    const h = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div className="cs-overlay" onClick={onClose}>
      <div className="cs-card" onClick={e => e.stopPropagation()}>
        <div className="cs-glyph">
          <i className="fas fa-code-branch" />
        </div>
        <h2 className="cs-title">Repository Coming Soon</h2>
        {projectName && <p className="cs-project">{projectName}</p>}
        <p className="cs-body">
          This project's source is being cleaned up and documented before going public.
          Follow on <strong>GitHub</strong> to get notified when it drops.
        </p>
        <div className="cs-actions">
          <a
            href="https://github.com/harshtiwari29"
            target="_blank"
            rel="noopener noreferrer"
            className="cs-btn cs-btn--primary"
          >
            <i className="fab fa-github" /> Follow on GitHub
          </a>
          <button className="cs-btn cs-btn--ghost" onClick={onClose}>
            Close
          </button>
        </div>
        <p className="cs-footnote">
          In the meantime, check out the projects that <em>are</em> live on my profile.
        </p>
      </div>
    </div>,
    document.body
  );
}
