import { PortfolioData } from './portfolioData.js';

export function buildInitialVfs() {
  return {
    type: 'dir',
    children: {
      about: {
        type: 'dir',
        children: {
          'summary.txt':  { type: 'file', content: PortfolioData.summary },
          'contacts.txt': { type: 'file', content: `Email: ${PortfolioData.contact.email}\nPhone: ${PortfolioData.contact.phone}\nLinkedIn: ${PortfolioData.contact.linkedin}\nGitHub: ${PortfolioData.contact.github}` },
        },
      },
      skills: {
        type: 'dir',
        children: {
          'languages.txt': { type: 'file', content: `Primary programming languages:\n${PortfolioData.skills.languages.map((l, i) => `${i + 1}. ${l}`).join('\n')}` },
          'backend.txt':   { type: 'file', content: `Enterprise Backend Stacks:\n${PortfolioData.skills.backend.map((b, i) => `${i + 1}. ${b}`).join('\n')}` },
        },
      },
      projects: {
        type: 'dir',
        children: {
          'scheduling_system.txt': { type: 'file', content: `Name: ${PortfolioData.projects[0].name}\nStack: ${PortfolioData.projects[0].tech}\n${PortfolioData.projects[0].overview}` },
          'studyhub.txt':          { type: 'file', content: `Name: ${PortfolioData.projects[2].name}\nStack: ${PortfolioData.projects[2].tech}\n${PortfolioData.projects[2].overview}` },
        },
      },
      guestbook: {
        type: 'dir',
        children: {
          'readme.txt': { type: 'file', content: `Welcome to the Guestbook!\n\nYou can sign this guestbook by running:\n  echo "[Your Name]: [Your Message]" >> guestbook/messages.txt\n\nOr submit a message from the GUI Guestbook tab!` },
          'messages.txt': { type: 'file', content: `Visitor [2026-06-20]: Awesome portfolio, Harsh!\nVisitor [2026-06-21]: Love the terminal interface. The virtual filesystem is amazing.` },
        },
      },
    },
  };
}
