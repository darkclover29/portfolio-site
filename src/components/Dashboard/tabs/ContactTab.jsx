import { useState } from 'react';
import { motion } from 'framer-motion';
import { PortfolioData } from '../../../data/portfolioData.js';

const c = PortfolioData.contact;

function CopyBtn({ value, label }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard?.writeText(value).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <button className="contact-copy-btn" onClick={copy} title={`Copy ${label}`}>
      <i className={`fas ${copied ? 'fa-check' : 'fa-copy'}`} />
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
}

const CHANNELS = [
  {
    icon: 'fa-envelope',
    label: 'Email',
    value: c.email,
    actions: [
      { label: 'Open Gmail', icon: 'fa-arrow-up-right-from-square',
        href: `https://mail.google.com/mail/?view=cm&to=${c.email}` },
    ],
    copy: c.email,
  },
  {
    icon: 'fab fa-linkedin',
    label: 'LinkedIn',
    value: c.linkedin,
    actions: [
      { label: 'View Profile', icon: 'fa-arrow-up-right-from-square',
        href: c.linkedinUrl },
    ],
    copy: c.linkedin,
  },
  {
    icon: 'fab fa-github',
    label: 'GitHub',
    value: c.github,
    actions: [
      { label: 'View Profile', icon: 'fa-arrow-up-right-from-square',
        href: c.githubUrl },
    ],
    copy: c.github,
  },
  {
    icon: 'fa-phone',
    label: 'Phone',
    value: c.phone,
    actions: [],
    copy: c.phone,
  },
  {
    icon: 'fa-location-dot',
    label: 'Location',
    value: c.location,
    actions: [],
    copy: c.location,
  },
];

const cardList = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const cardItem = {
  hidden:  { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0,   transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function ContactTab() {
  return (
    <div>
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="section-icon"><i className="fas fa-paper-plane" /></div>
        <h2 className="section-title">Get In Touch</h2>
        <span className="section-badge avail-badge">
          <span className="avail-dot" />Available
        </span>
      </motion.div>

      <motion.p
        className="contact-intro"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        Open to new roles, collaborations, and side projects.
        Reach out directly — I respond fastest on email and LinkedIn.
      </motion.p>

      <motion.div
        className="contact-cards"
        variants={cardList}
        initial="hidden"
        animate="visible"
      >
        {CHANNELS.map(({ icon, label, value, actions, copy }) => (
          <motion.div
            key={label}
            className="contact-card"
            variants={cardItem}
            whileHover={{ x: 4, transition: { duration: 0.18 } }}
          >
            <div className="contact-card-icon">
              <i className={icon.startsWith('fab') ? icon : `fas ${icon}`} />
            </div>
            <div className="contact-card-body">
              <span className="contact-card-label">{label}</span>
              <span className="contact-card-value">{value}</span>
            </div>
            <div className="contact-card-actions">
              {actions.map(a => (
                <a
                  key={a.label}
                  href={a.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-action-btn"
                  title={a.label}
                >
                  <i className={`fas ${a.icon}`} />
                  <span>{a.label}</span>
                </a>
              ))}
              <CopyBtn value={copy} label={label} />
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="contact-note"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.5 }}
      >
        <i className="fas fa-circle-info" />
        Prefer email or LinkedIn for professional enquiries — response within 24 hours.
      </motion.div>
    </div>
  );
}
