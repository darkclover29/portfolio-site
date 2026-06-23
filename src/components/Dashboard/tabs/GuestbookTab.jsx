import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function fireConfetti() {
  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:99999;width:100%;height:100%';
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth; canvas.height = window.innerHeight;
  const accent = getComputedStyle(document.body).getPropertyValue('--accent').trim() || '#fff';
  const particles = Array.from({ length: 50 }, () => ({
    x: Math.random() * canvas.width, y: -10,
    vx: (Math.random() - 0.5) * 6, vy: Math.random() * 4 + 2,
    color: [accent, '#4ade80', '#38bdf8', '#f472b6', '#facc15'][Math.floor(Math.random() * 5)],
    size: Math.random() * 8 + 4,
    rot: Math.random() * 360, rotV: (Math.random() - 0.5) * 8,
    life: 1,
  }));
  let raf;
  const tick = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy; p.vy += 0.12;
      p.rot += p.rotV; p.life -= 0.012;
      if (p.life <= 0 || p.y > canvas.height) return;
      alive = true;
      ctx.save();
      ctx.globalAlpha = p.life;
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot * Math.PI / 180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
      ctx.restore();
    });
    if (alive) raf = requestAnimationFrame(tick);
    else { cancelAnimationFrame(raf); canvas.remove(); }
  };
  raf = requestAnimationFrame(tick);
}

export default function GuestbookTab({ vfs }) {
  const [messages, setMessages] = useState([]);
  const [name, setName] = useState('');
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');

  const loadMessages = () => {
    const res = vfs.cmdCat('guestbook/messages.txt');
    if (res.error) {
      setMessages([]);
    } else {
      const lines = res.text.split('\n').filter(Boolean);
      const parsed = lines.map(line => {
        const match = line.match(/^(.+?)\s*\[(.+?)\]:\s*(.+)$/);
        if (match) {
          return { name: match[1], date: match[2], text: match[3] };
        }
        const simpleMatch = line.match(/^(.+?):\s*(.+)$/);
        if (simpleMatch) {
          return { name: simpleMatch[1], date: '', text: simpleMatch[2] };
        }
        return { name: 'Anonymous', date: '', text: line };
      });
      setMessages(parsed.reverse());
    }
  };

  useEffect(() => {
    loadMessages();
  }, [vfs]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !msg.trim()) return;

    const dateStr = new Date().toISOString().split('T')[0];
    const newEntry = `${name.trim()} [${dateStr}]: ${msg.trim()}`;

    const res = vfs.openNano('guestbook/messages.txt');
    if (res.error) {
      setError(res.error);
    } else {
      const currentContent = res.fileNode.content;
      const updatedContent = currentContent ? (currentContent + '\n' + newEntry) : newEntry;
      vfs.saveNano(res.fileNode, updatedContent);
      setName('');
      setMsg('');
      setError('');
      loadMessages();
      fireConfetti();
    }
  };

  return (
    <div>
      <div className="section-header">
        <div className="section-icon"><i className="fas fa-book-open" /></div>
        <h2 className="section-title">Guestbook</h2>
        <span className="section-badge">{messages.length} messages</span>
      </div>

      <p className="contact-intro">
        Leave a message below! Messages are stored directly in the Virtual File System (VFS) and are synced in real-time between this GUI tab and the CLI terminal.
      </p>

      <div className="guestbook-layout" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', marginTop: '24px' }}>
        {/* Form Column */}
        <motion.form
          className="contact-form"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          style={{ height: 'fit-content' }}
        >
          <h3 className="contact-form-title">
            <i className="fas fa-pen" /> Sign the Guestbook
          </h3>
          
          <div className="contact-form-field">
            <label>Name</label>
            <input
              required
              placeholder="Your name"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>

          <div className="contact-form-field">
            <label>Message</label>
            <textarea
              required
              rows={4}
              placeholder="Write something cool..."
              value={msg}
              onChange={e => setMsg(e.target.value)}
            />
          </div>

          {error && <p className="contact-form-error"><i className="fas fa-triangle-exclamation" /> {error}</p>}

          <button type="submit" className="contact-form-send">
            <i className="fas fa-signature" /> Sign guestbook
          </button>

          <p className="guestbook-cli-hint" style={{ marginTop: '16px', fontSize: '11px', color: 'var(--text-muted)', lineHeight: '1.4' }}>
            <i className="fas fa-terminal" /> You can also sign this guestbook from the CLI by typing:<br/>
            <code style={{ display: 'block', background: 'rgba(0,0,0,0.2)', padding: '6px', borderRadius: '4px', marginTop: '4px', fontFamily: 'monospace' }}>
              echo "[Name]: [Message]" &gt;&gt; guestbook/messages.txt
            </code>
          </p>
        </motion.form>

        {/* Messages Column */}
        <div className="guestbook-messages-column" style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxHeight: '500px', overflowY: 'auto', paddingRight: '8px' }}>
          {messages.length === 0 ? (
            <div className="contact-form-success" style={{ background: 'var(--surface-sub)', border: '1px dashed var(--border)' }}>
              <i className="fas fa-book-open" style={{ opacity: 0.5 }} />
              <p>No messages yet. Be the first to sign!</p>
            </div>
          ) : (
            messages.map((m, i) => (
              <motion.div
                key={i}
                className="contact-card"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25, delay: Math.min(i * 0.05, 0.3) }}
                style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="contact-card-label" style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-bright)' }}>
                    <i className="fas fa-user-circle" style={{ marginRight: '6px', color: 'var(--accent)' }} />
                    {m.name}
                  </span>
                  {m.date && (
                    <span className="section-badge" style={{ fontSize: '10px', background: 'rgba(var(--accent-rgb), 0.1)', color: 'var(--accent)' }}>
                      {m.date}
                    </span>
                  )}
                </div>
                <p style={{ fontSize: '13px', color: 'var(--text)', lineHeight: '1.5', margin: 0, whiteSpace: 'pre-wrap' }}>
                  {m.text}
                </p>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
