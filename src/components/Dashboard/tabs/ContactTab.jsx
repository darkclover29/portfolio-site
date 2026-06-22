import { useState } from 'react';
import { motion } from 'framer-motion';
import { PortfolioData } from '../../../data/portfolioData.js';

const c = PortfolioData.contact;

const EMAILJS_SERVICE  = 'service_f7cwww7';
const EMAILJS_TEMPLATE = 'template_350qlpr';
const EMAILJS_KEY      = 'O8ei-Yhu5mABSMnxWIb4C';

function copyToClipboard(text) {
  return navigator.clipboard?.writeText(text) ?? Promise.reject();
}

function CopyBtn({ value, label }) {
  const [copied, setCopied] = useState(false);
  return (
    <button className="contact-copy-btn" onClick={() =>
      copyToClipboard(value).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); })
    } title={`Copy ${label}`}>
      <i className={`fas ${copied ? 'fa-check' : 'fa-copy'}`} />
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
}

function fireConfetti() {
  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:99999;width:100%;height:100%';
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth; canvas.height = window.innerHeight;
  const accent = getComputedStyle(document.body).getPropertyValue('--accent').trim() || '#fff';
  const particles = Array.from({ length: 90 }, () => ({
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

function ShareBtn() {
  const [copied, setCopied] = useState(false);
  const share = async () => {
    const url  = 'https://darkclover29.github.io/portfolio-site/';
    const data = { title: 'Harsh Tiwari — Portfolio', url };
    if (navigator.share) {
      try { await navigator.share(data); return; } catch {}
    }
    copyToClipboard(url).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  };
  return (
    <button className="contact-share-btn" onClick={share}>
      <i className={`fas ${copied ? 'fa-check' : 'fa-share-nodes'}`} />
      {copied ? 'Link copied!' : 'Share portfolio'}
    </button>
  );
}

const CHANNELS = [
  { icon: 'fa-envelope',     label: 'Email',    value: c.email,    copy: c.email,
    actions: [{ label: 'Open Gmail', icon: 'fa-arrow-up-right-from-square', href: `https://mail.google.com/mail/?view=cm&to=${c.email}` }] },
  { icon: 'fab fa-linkedin', label: 'LinkedIn', value: c.linkedin, copy: c.linkedin,
    actions: [{ label: 'View Profile', icon: 'fa-arrow-up-right-from-square', href: c.linkedinUrl }] },
  { icon: 'fab fa-github',   label: 'GitHub',   value: c.github,   copy: c.github,
    actions: [{ label: 'View Profile', icon: 'fa-arrow-up-right-from-square', href: c.githubUrl }] },
  { icon: 'fa-phone',        label: 'Phone',    value: c.phone,    copy: c.phone,    actions: [] },
  { icon: 'fa-location-dot', label: 'Location', value: c.location, copy: c.location, actions: [] },
];

const cardList = { hidden:{}, visible:{ transition:{ staggerChildren:0.08, delayChildren:0.1 } } };
const cardItem = { hidden:{ opacity:0, y:18 }, visible:{ opacity:1, y:0, transition:{ duration:0.3, ease:[.25,.46,.45,.94] } } };

function ContactForm() {
  const [form, setForm]     = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');

  const send = async (e) => {
    e.preventDefault();
    if (status === 'sending') return;
    setStatus('sending');
    try {
      const { default: emailjs } = await import('@emailjs/browser');
      await emailjs.send(
        EMAILJS_SERVICE,
        EMAILJS_TEMPLATE,
        { from_name: form.name, reply_to: form.email, message: form.message },
        { publicKey: EMAILJS_KEY },
      );
      setStatus('sent');
      setForm({ name: '', email: '', message: '' });
      fireConfetti();
    } catch (err) {
      console.error('EmailJS error:', err);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  if (status === 'sent') return (
    <motion.div className="contact-form-success" initial={{ opacity:0, scale:0.95 }} animate={{ opacity:1, scale:1 }}>
      <i className="fas fa-circle-check" />
      <p>Message sent! I&apos;ll get back to you within 24 hours.</p>
      <button className="filter-btn active" onClick={() => setStatus('idle')}>Send another</button>
    </motion.div>
  );

  return (
    <motion.form
      className="contact-form"
      onSubmit={send}
      initial={{ opacity:0, y:12 }}
      animate={{ opacity:1, y:0 }}
      transition={{ duration:0.3, delay:0.35 }}
    >
      <h3 className="contact-form-title"><i className="fas fa-paper-plane" /> Send a message</h3>
      <div className="contact-form-row">
        <div className="contact-form-field">
          <label>Name</label>
          <input name="from_name" required placeholder="Your name"
            value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
        </div>
        <div className="contact-form-field">
          <label>Email</label>
          <input name="reply_to" type="email" required placeholder="your@email.com"
            value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
        </div>
      </div>
      <div className="contact-form-field">
        <label>Message</label>
        <textarea name="message" required rows={4} placeholder="What's on your mind?"
          value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} />
      </div>
      <button type="submit" className="contact-form-send" disabled={status === 'sending'}>
        {status === 'sending'
          ? <><i className="fas fa-spinner fa-spin" /> Sending&hellip;</>
          : <><i className="fas fa-paper-plane" /> Send message</>}
      </button>
      {status === 'error' && (
        <p className="contact-form-error">
          <i className="fas fa-triangle-exclamation" /> Failed to send. Try emailing directly.
        </p>
      )}
    </motion.form>
  );
}

export default function ContactTab() {
  return (
    <div>
      <motion.div className="section-header" initial={{ opacity:0, y:-10 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.3 }}>
        <div className="section-icon"><i className="fas fa-paper-plane" /></div>
        <h2 className="section-title">Get In Touch</h2>
        <span className="section-badge avail-badge"><span className="avail-dot" />Available</span>
      </motion.div>

      <motion.p className="contact-intro" initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.3, delay:0.1 }}>
        Open to new roles, collaborations, and side projects. Reach out directly &mdash; I respond fastest on email and LinkedIn.
      </motion.p>

      <motion.div className="contact-cards" variants={cardList} initial="hidden" animate="visible">
        {CHANNELS.map(({ icon, label, value, actions, copy }) => (
          <motion.div key={label} className="contact-card" variants={cardItem} whileHover={{ x:4, transition:{ duration:0.18 } }}>
            <div className="contact-card-icon">
              <i className={icon.startsWith('fab') ? icon : `fas ${icon}`} />
            </div>
            <div className="contact-card-body">
              <span className="contact-card-label">{label}</span>
              <span className="contact-card-value">{value}</span>
            </div>
            <div className="contact-card-actions">
              {actions.map(a => (
                <a key={a.label} href={a.href} target="_blank" rel="noopener noreferrer" className="contact-action-btn" title={a.label}>
                  <i className={`fas ${a.icon}`} /><span>{a.label}</span>
                </a>
              ))}
              <CopyBtn value={copy} label={label} />
            </div>
          </motion.div>
        ))}
      </motion.div>

      <ContactForm />

      <motion.div className="contact-bottom-row" initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.5 }}>
        <ShareBtn />
        <p className="contact-note">
          <i className="fas fa-circle-info" /> Prefer email or LinkedIn &mdash; response within 24 hours.
        </p>
      </motion.div>
    </div>
  );
}
