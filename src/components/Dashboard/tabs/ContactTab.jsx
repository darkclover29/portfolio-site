import { useState } from 'react';
import { motion } from 'framer-motion';
import { PortfolioData } from '../../../data/portfolioData.js';
import CopyButton from '../../shared/CopyButton.jsx';
import { fireConfetti } from '../../../utils/confetti.js';

const c = PortfolioData.contact;

// EmailJS keys — set VITE_EMAILJS_SERVICE, VITE_EMAILJS_TEMPLATE, VITE_EMAILJS_KEY in .env
const EMAILJS_SERVICE  = import.meta.env.VITE_EMAILJS_SERVICE  ?? 'service_jlcyi0i';
const EMAILJS_TEMPLATE = import.meta.env.VITE_EMAILJS_TEMPLATE ?? 'template_350qlpr';
const EMAILJS_KEY      = import.meta.env.VITE_EMAILJS_KEY      ?? 'OEPbC_woi70xrZ-U8';

function ShareBtn() {
  const [copied, setCopied] = useState(false);
  const share = async () => {
    const url  = 'https://harshtiwari29.github.io/harsh-portfolio-react/';
    const data = { title: 'Harsh Tiwari — Portfolio', url };
    if (navigator.share) {
      try { await navigator.share(data); return; } catch {}
    }
    navigator.clipboard?.writeText(url).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  };
  return (
    <button className="contact-share-btn" onClick={share}>
      <i className={`fas ${copied ? 'fa-check' : 'fa-share-nodes'}`} aria-hidden="true" />
      {copied ? 'Link copied!' : 'Share portfolio'}
    </button>
  );
}

const CHANNELS = [
  { icon: 'fa-envelope',     label: 'Email',    value: c.email,    copy: c.email,
    actions: [
      { label: 'Send email', icon: 'fa-arrow-up-right-from-square', href: `mailto:${c.email}` },
      { label: 'Open Gmail', icon: 'fa-arrow-up-right-from-square', href: `https://mail.google.com/mail/?view=cm&to=${c.email}` },
    ] },
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
    <motion.div className="contact-form-success" role="status" aria-live="polite" initial={{ opacity:0, scale:0.95 }} animate={{ opacity:1, scale:1 }}>
      <i className="fas fa-circle-check" aria-hidden="true" />
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
      <h3 className="contact-form-title"><i className="fas fa-paper-plane" aria-hidden="true" /> Send a message</h3>
      <div className="contact-form-row">
        <div className="contact-form-field">
          <label htmlFor="cf-name">Name</label>
          <input id="cf-name" name="from_name" required placeholder="Your name"
            value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
        </div>
        <div className="contact-form-field">
          <label htmlFor="cf-email">Email</label>
          <input id="cf-email" name="reply_to" type="email" required placeholder="your@email.com"
            value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
        </div>
      </div>
      <div className="contact-form-field">
        <label htmlFor="cf-msg">Message</label>
        <textarea id="cf-msg" name="message" required rows={4} placeholder="What's on your mind?"
          value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} />
      </div>
      <button type="submit" className="contact-form-send" disabled={status === 'sending'}>
        {status === 'sending'
          ? <><i className="fas fa-spinner fa-spin" aria-hidden="true" /> Sending&hellip;</>
          : <><i className="fas fa-paper-plane" aria-hidden="true" /> Send message</>}
      </button>
      <p className="contact-form-error" role="alert" aria-live="assertive"
        style={{ display: status === 'error' ? undefined : 'none' }}>
        <i className="fas fa-triangle-exclamation" aria-hidden="true" /> Failed to send. Try emailing directly.
      </p>
    </motion.form>
  );
}

export default function ContactTab() {
  return (
    <div>
      <motion.div className="section-header" initial={{ opacity:0, y:-10 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.3 }}>
        <div className="section-icon"><i className="fas fa-paper-plane" aria-hidden="true" /></div>
        <h2 className="section-title">Get In Touch</h2>
        <span className="section-badge contact-reply-badge">
          <i className="fas fa-clock" aria-hidden="true" /> Replies within 24 h
        </span>
      </motion.div>

      <motion.p className="contact-intro" initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.3, delay:0.08 }}>
        Open to freelance contracts, collaborations, and side projects. Reach out — I respond fastest on email and LinkedIn.
      </motion.p>

      {/* ── Low-friction CTAs ── */}
      <motion.div className="contact-quick-actions" initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.3, delay:0.14 }}>
        <a
          href={c.calendlyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="contact-quick-btn contact-quick-btn--primary"
        >
          <i className="fas fa-calendar-check" aria-hidden="true" />
          Book a 15-min call
        </a>
        <a
          href={c.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="contact-quick-btn contact-quick-btn--whatsapp"
        >
          <i className="fab fa-whatsapp" aria-hidden="true" />
          WhatsApp
        </a>
        <a
          href={`mailto:${c.email}`}
          className="contact-quick-btn contact-quick-btn--ghost"
        >
          <i className="fas fa-envelope" aria-hidden="true" />
          Email directly
        </a>
      </motion.div>

      {/* ── Channel cards ── */}
      <motion.div className="contact-cards" variants={cardList} initial="hidden" animate="visible">
        {CHANNELS.map(({ icon, label, value, actions, copy }) => (
          <motion.div key={label} className="contact-card" variants={cardItem} whileHover={{ x:4, transition:{ duration:0.18 } }}>
            <div className="contact-card-icon">
              <i className={icon.startsWith('fab') ? icon : `fas ${icon}`} aria-hidden="true" />
            </div>
            <div className="contact-card-body">
              <span className="contact-card-label">{label}</span>
              <span className="contact-card-value">{value}</span>
            </div>
            <div className="contact-card-actions">
              {actions.map(a => (
                <a key={a.label} href={a.href} target="_blank" rel="noopener noreferrer" className="contact-action-btn" title={a.label}>
                  <i className={`fas ${a.icon}`} aria-hidden="true" /><span>{a.label}</span>
                </a>
              ))}
              <CopyButton value={copy} label={label} />
            </div>
          </motion.div>
        ))}
      </motion.div>

      <ContactForm />

      <motion.div className="contact-bottom-row" initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.5 }}>
        <ShareBtn />
        <p className="contact-note">
          <i className="fas fa-circle-info" aria-hidden="true" /> IST (UTC+5:30) · remote-friendly
        </p>
      </motion.div>
    </div>
  );
}
