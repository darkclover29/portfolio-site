import { useState } from 'react';

/**
 * Reusable copy-to-clipboard button.
 * Props:
 *   value  — text to copy
 *   label  — human-readable label for the title tooltip
 *   className — optional extra class on the <button>
 */
export default function CopyButton({ value, label = 'value', className = 'contact-copy-btn', hideText = false }) {
  const [copied, setCopied] = useState(false);
  const copy = () =>
    navigator.clipboard?.writeText(value).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  return (
    <button className={className} onClick={copy} title={copied ? 'Copied!' : `Copy ${label}`} aria-label={copied ? 'Copied!' : `Copy ${label}`}>
      <i className={`fas ${copied ? 'fa-check' : 'fa-copy'}`} aria-hidden="true" />
      {!hideText && (copied ? 'Copied!' : 'Copy')}
    </button>
  );
}
