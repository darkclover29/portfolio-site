import { useState, useRef, useEffect } from 'react';

const SUGGESTIONS = [
  'Tech stack', 'Work at TCS', 'Projects', 'Spring Boot',
  'Android apps', 'AEM experience', 'Education', 'Contact info',
];

const RESPONSES = {
  'tech':      `I work primarily with Java, Python, and Kotlin. My backend stack is Spring Boot, Spring MVC, REST APIs, Hibernate/JPA, and AEM. On mobile I use Jetpack Compose and Android SDK. Databases: PostgreSQL, MySQL, Firebase. Tools: Git, Docker, Postman.`,
  'stack':     `Core: Java • Kotlin • Python • SQL. Backend: Spring Boot • REST APIs • Hibernate/JPA • AEM. Mobile: Jetpack Compose • Android SDK. Databases: PostgreSQL • MySQL • Firebase. Tools: Git • Docker • Postman.`,
  'tcs':       `I joined Tata Consultancy Services as a Software Engineer in January 2026. I work on AEM-based web architecture — building core components and OSGi services in Java and Spring. We follow an agile process with cross-functional teams.`,
  'project':   `I've built: (1) Appointment Scheduling System — Spring Boot + PostgreSQL + Docker. (2) Student Performance ML — Python + Scikit-Learn. (3) StudyHub Android App — Kotlin + Firebase + Jetpack Compose. (4) PlayLog game tracker — Kotlin Coroutines + Flow API + MVVM.`,
  'spring':    `Spring Boot is my primary backend framework. I use Spring MVC for REST controllers, Spring Data JPA with Hibernate for the data layer, and Spring Security for auth. I've configured it with Docker and PostgreSQL in personal projects, and use it daily at TCS.`,
  'android':   `I have two production-quality Android apps. StudyHub (scheduling, Firebase sync, WorkManager reminders) and PlayLog (MVVM, Coroutines, custom Compose charts). Both use Kotlin, Room DB, and Jetpack Compose.`,
  'aem':       `At TCS I work with Adobe Experience Manager — creating Sling Models, HTL templates, OSGi services, and core components. It's a Java-based enterprise CMS with a steep learning curve but very powerful for large-scale web platforms.`,
  'education': `B.Tech in Information Technology (2021–2025) from SVVV Indore — CGPA 8.33/10. Class XII from Saraswati Gyan Peeth, Dewas — 83.60%. Class X from Gujrati Samaj School, Ratlam — 82.20%.`,
  'contact':   `Email: harshtiwari493@gmail.com\nLinkedIn: linkedin.com/in/harshtiwari29\nGitHub: github.com/harshtiwari29\nLocation: Indore / Dewas, India\nPhone: +91-7805841898`,
};

function botReply(msg) {
  const lc = msg.toLowerCase();
  for (const [key, val] of Object.entries(RESPONSES)) {
    if (lc.includes(key)) return val;
  }
  return `I'm Harsh's portfolio assistant. Ask me about his skills, projects, experience at TCS, education, or contact info. Try one of the suggestions above!`;
}

export default function AIChatTab() {
  const [messages, setMessages] = useState([
    { from: 'bot', text: "Hi! I'm Harsh's portfolio assistant. Ask me anything about his skills, experience, or projects." }
  ]);
  const [input, setInput] = useState('');
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const send = (text) => {
    const msg = (text || input).trim();
    if (!msg) return;
    setMessages(prev => [
      ...prev,
      { from: 'user', text: msg },
      { from: 'bot',  text: botReply(msg) },
    ]);
    setInput('');
  };

  return (
    <div>
      <div className="section-header">
        <div className="section-icon"><i className="fas fa-comment-dots" /></div>
        <h2 className="section-title">Ask Me Anything</h2>
      </div>

      <div className="chat-panel">
        <div className="chat-header-note">
          <i className="fas fa-circle-info" />
          This is a local FAQ assistant — answers are pre-written responses about Harsh.
        </div>

        <div className="chat-suggestions">
          {SUGGESTIONS.map(s => (
            <button key={s} className="chat-suggestion" onClick={() => send(s)}>{s}</button>
          ))}
        </div>

        <div className="chat-messages">
          {messages.map((m, i) => (
            <div key={i} className={`chat-message chat-message--${m.from}`}>
              <div className="chat-avatar-icon">
                {m.from === 'bot' ? <i className="fas fa-robot" /> : <i className="fas fa-user" />}
              </div>
              <div className="chat-bubble" style={{ whiteSpace: 'pre-line' }}>{m.text}</div>
            </div>
          ))}
          <div ref={endRef} />
        </div>

        <div className="chat-input-row">
          <input
            className="chat-input"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && send()}
            placeholder="Ask about skills, projects, experience…"
            autoComplete="off"
          />
          <button className="chat-send" onClick={() => send()}>
            <i className="fas fa-paper-plane" /> Send
          </button>
        </div>
      </div>
    </div>
  );
}
