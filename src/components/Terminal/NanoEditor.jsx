import { useState, useEffect, useRef } from 'react';

export default function NanoEditor({ open, fileName, fileNode, onSave, onClose }) {
  const [content, setContent] = useState('');
  const taRef = useRef(null);

  useEffect(() => {
    if (open && fileNode) { setContent(fileNode.content || ''); setTimeout(() => taRef.current?.focus(), 50); }
  }, [open, fileNode]);

  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (e.ctrlKey && e.key === 's') { e.preventDefault(); onSave(fileNode, content); onClose(); }
      if (e.ctrlKey && e.key === 'x') { e.preventDefault(); onClose(); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, content, fileNode, onSave, onClose]);

  if (!open) return null;
  return (
    <div className="nano-overlay">
      <div className="nano-header">
        <span>GNU nano 5.x  —  {fileName}</span>
        <span className="nano-hint">^S Save  ^X Exit</span>
      </div>
      <textarea
        ref={taRef}
        className="nano-editor"
        value={content}
        onChange={e => setContent(e.target.value)}
        spellCheck={false}
        autoCorrect="off"
        autoCapitalize="off"
      />
      <div className="nano-footer">
        <span>^G Help</span><span>^S Save File</span><span>^X Exit</span>
        <span>^K Cut</span><span>^U Paste</span><span>^W Search</span>
      </div>
    </div>
  );
}
