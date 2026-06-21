export const PortfolioData = {
  summary: `Information Technology graduate with strong skills in Java, Python, and Kotlin. Experienced in building compilers, full-stack systems, and Android applications. Passionate about systems programming, scalable backend design, and real-world problem-solving. Currently working as an Assistant Systems Engineer at Tata Consultancy Services (TCS).`,

  contact: {
    email: 'harshtiwari493@gmail.com',
    phone: '+91-7805841898',
    linkedin: 'linkedin.com/in/harshtiwari29',
    linkedinUrl: 'https://www.linkedin.com/in/harshtiwari29/',
    github: 'github.com/harshtiwari29',
    githubUrl: 'https://github.com/harshtiwari29',
    location: 'Indore/Dewas, India',
  },

  skills: {
    languages:     ['Java', 'Python', 'SQL', 'Kotlin', 'JavaScript'],
    backend:       ['Spring Boot', 'Spring MVC', 'REST APIs', 'Hibernate/JPA', 'Adobe Experience Manager (AEM)'],
    frontendMobile:['Jetpack Compose', 'HTML', 'CSS', 'Android SDK'],
    databases:     ['PostgreSQL', 'MySQL', 'Room Database', 'Firebase'],
    tools:         ['Git', 'GitHub', 'Docker', 'Postman', 'Android Studio'],
    concepts:      ['Compiler Design', 'DSA', 'OOP', 'DBMS', 'Operating Systems', 'Computer Networks'],
  },

  skillBars: [
    { category: 'Languages',         icon: 'fa-code',         items: [
      { name: 'Java',       pct: 90 }, { name: 'Python',     pct: 80 },
      { name: 'Kotlin',     pct: 85 }, { name: 'JavaScript', pct: 72 },
    ]},
    { category: 'Backend Systems',   icon: 'fa-server',       items: [
      { name: 'Spring Boot',   pct: 88 }, { name: 'REST APIs',     pct: 90 },
      { name: 'Hibernate/JPA', pct: 82 }, { name: 'AEM CMS',       pct: 75 },
    ]},
    { category: 'Mobile & Frontend', icon: 'fa-mobile-alt',   items: [
      { name: 'Jetpack Compose', pct: 85 }, { name: 'Android SDK', pct: 80 },
      { name: 'HTML & CSS',      pct: 75 },
    ]},
    { category: 'Databases & Tools', icon: 'fa-cogs',         items: [
      { name: 'PostgreSQL / MySQL',  pct: 82 }, { name: 'Git / GitHub',    pct: 88 },
      { name: 'Docker & Postman',    pct: 70 }, { name: 'CS Fundamentals', pct: 85 },
    ]},
  ],

  experience: [
    {
      role: 'Assistant Systems Engineer',
      company: 'Tata Consultancy Services (TCS)',
      duration: 'Jan 2026 - Present',
      tech: 'AEM, Java, Agile',
      details: [
        'Developing web architecture using Adobe Experience Manager (AEM), creating modular core components and stable OSGi services.',
        'Writing robust backend integrations and business logic in Java.',
        'Collaborating with cross-functional agile teams to deliver clean, scalable enterprise-level features.',
        'Optimizing server response cycles, database scripts, and API integration flows.',
      ],
    },
    {
      role: 'Associate Software Engineer Intern',
      company: 'Ignitive Software Labs, Indore',
      duration: 'Jan 2025 - April 2025',
      tech: 'Android SDK, Kotlin, Jetpack Compose, Room Database, REST APIs',
      details: [
        'Developed Android appointment scheduling app using Kotlin & Jetpack Compose.',
        'Implemented booking, rescheduling, cancellation, and slot management algorithms.',
        'Used Room database for offline data persistence and state synchronization.',
        'Worked with REST APIs and backend services for real-time updates.',
      ],
    },
  ],

  projects: [
    {
      name: 'Chronoscapes',
      icon: 'fa-clock-rotate-left',
      tech: 'Vanilla JS, Web Audio API, HTML5 Canvas, CSS3',
      overview: 'An immersive audio-visual ambient workspace for focus and relaxation — four distinct eras (Neo-Tokyo 2099, Cozy Hearth 1994, Deep Space 3050, Zen Garden 1480) each with procedural sound synthesis and interactive physics canvas, zero audio assets, 100% client-side.',
      details: [
        'All ambient sound (rain, fire crackle, wind, chimes, synth pads) synthesised in real-time via Web Audio API oscillators, noise buffers, and LFO modulators — saving 10+ MB of asset overhead.',
        'Interactive canvas physics: Zen garden raking, Tokyo rain-piano keypads, Deep Space constellation DFS loop detection that triggers synth chord swells.',
        'Productivity suite: Pomodoro timer, Box Breathing pacer, persistent Todo checklist and scratchpad (LocalStorage), retro CRT scanline overlay.',
        'Optimised canvas draw loops and dynamic particle counts to maintain 60 FPS on desktop, tablet, and mobile.',
      ],
      github: 'https://github.com/darkclover29/chronoscapes',
      liveUrl: 'https://chronoscapes.harshtiwari.dev',
      tags: ['JavaScript', 'Web Audio API', 'Canvas', 'CSS3'],
      featured: true,
    },
    {
      name: 'Mini Compiler & Web-Based IDE',
      icon: 'fa-microchip',
      tech: 'Java, JavaScript, HTML5, CSS, HTTP API',
      overview: 'A custom programming language interpreter and interactive Web IDE built from scratch — featuring a full compilation pipeline, real-time AST visualization, and an in-browser code editor with autocomplete.',
      details: [
        'Designed and built a custom language interpreter in Java — Lexer, Recursive Descent Parser, and Tree-Walking Interpreter — without any third-party parsing libraries.',
        'Engineered language features: recursive functions, lexical closures, nested block scoping, C-style loops via syntax desugaring, arrays, and float/integer arithmetic.',
        'Developed a Web IDE with a telemetry dashboard that visualizes scanner statistics, compiles code via a Java HTTP API, and renders the generated AST in real-time.',
        'Integrated a lightweight autocomplete engine in the editor with Tab-completion for control flow snippets (if, for) to boost developer productivity.',
      ],
      github: 'https://github.com/darkclover29/mini-compiler',
      tags: ['Java', 'Compiler', 'AST', 'Web IDE', 'JavaScript'],
    },
    {
      name: 'Versatile Appointment Scheduling System',
      icon: 'fa-calendar-check',
      tech: 'Spring Boot, PostgreSQL, Docker, Spring Data JPA, REST APIs',
      overview: 'A full-stack, enterprise-grade appointment booking system designed to streamline scheduling operations for service providers.',
      details: [
        'Engineered modular controllers, validation frameworks, and secure endpoints for appointment handling.',
        'Implemented role-based access controls and request-validation rules to prevent overlapping slot bookings.',
        'Configured PostgreSQL database backend using Hibernate/JPA for complex relational structures.',
        'Configured Docker setup for containerised backend services and databases.',
      ],
      github: null,
      tags: ['Spring Boot', 'PostgreSQL', 'Docker', 'JPA'],
    },
    {
      name: 'StudyHub Android App',
      icon: 'fa-graduation-cap',
      tech: 'Kotlin, Firebase, Jetpack Compose, Room Database, WorkManager',
      overview: 'A native academic helper app for students to organise tasks, track lectures, take quizzes, and set dynamic reminders.',
      details: [
        'Crafted an interactive Android interface using Jetpack Compose with custom themes.',
        'Integrated Room Database to store schedules, reminders, and flashcard content locally.',
        'Leveraged Firebase authentication and Firestore to sync study progress across devices.',
        'Configured WorkManager and AlarmManager for accurate reminder delivery.',
      ],
      github: null,
      tags: ['Kotlin', 'Jetpack Compose', 'Room DB', 'Firebase'],
    },
    {
      name: 'Student Performance Prediction System',
      icon: 'fa-chart-line',
      tech: 'Python, Machine Learning, Scikit-Learn, Pandas',
      overview: 'An intelligent data-driven ML system for predicting academic performance and identifying at-risk students.',
      details: [
        'Managed missing value imputations, outlier removal, and categorical transformations on academic datasets.',
        'Constructed and optimised behavioural and score-based features to maximise model accuracy.',
        'Evaluated classification algorithms (Random Forest, Logistic Regression) using Scikit-Learn.',
        'Tuned hyperparameters using Grid Search cross-validation to prevent overfitting.',
      ],
      github: null,
      tags: ['Python', 'Scikit-Learn', 'Pandas', 'ML'],
    },
    {
      name: 'PlayLog Game Session Tracker',
      icon: 'fa-gamepad',
      tech: 'Kotlin, Jetpack Compose, Coroutines, Flow APIs, ViewModel, Room Database',
      overview: 'A lightweight Android app that helps gamers record play times, set session limits, and analyse session histories.',
      details: [
        'Implemented MVVM architecture using Android ViewModels to keep presentation decoupled from business logic.',
        'Leveraged Kotlin Coroutines and Flow APIs to fetch local DB records without blocking the main thread.',
        'Rendered custom time-spent charts directly in Compose by drawing vectors based on historical records.',
      ],
      github: null,
      tags: ['Kotlin', 'Coroutines', 'Flow API', 'Compose'],
    },
    {
      name: 'Dev Portfolio Website',
      icon: 'fa-globe',
      tech: 'React, Vite, CSS, JavaScript',
      overview: 'A fully custom developer portfolio with a dual-mode interface — a polished GUI dashboard and a fully functional terminal emulator, complete with VFS, themes, games, and Easter eggs.',
      details: [
        'Built a Virtual File System (VFS) hook with ls, cd, cat, touch, rm, grep, and nano commands.',
        'Implemented 10 themes including a secret Anti-Magic theme, triggered by IGN-based terminal Easter eggs.',
        'Added terminal mini-games (snake with Mada Mada revival, synthesizer), Konami code Demon Form overlay, and a falling-clover Easter egg.',
        'Optimized for all screen sizes with a collapsible drawer sidebar, bottom navigation, and responsive grid layouts.',
      ],
      github: null,
      liveUrl: 'https://darkclover29.github.io/portfolio-site',
      tags: ['React', 'Vite', 'CSS', 'JavaScript'],
    },
    {
      name: 'URL Shortener API',
      icon: 'fa-link',
      tech: 'Spring Boot, H2 Database, REST API, Java',
      overview: 'A lightweight URL shortening service built with Spring Boot, exposing REST endpoints to shorten, redirect, and track click counts for URLs.',
      details: [
        'Designed RESTful endpoints: POST /shorten, GET /{code} (redirect), GET /stats/{code}.',
        'Used H2 in-memory database with Spring Data JPA for fast persistence during development.',
        'Implemented Base62 encoding for compact, collision-resistant short codes.',
        'Added click-count tracking and timestamp metadata for each shortened URL.',
      ],
      github: null,
      liveUrl: null,
      tags: ['Java', 'Spring Boot', 'REST API'],
    },
    {
      name: 'Image Batch Processor',
      icon: 'fa-image',
      tech: 'Python, Pillow, OpenCV, Argparse',
      overview: 'A CLI tool for batch image processing — resize, crop, watermark, and convert image formats in bulk from the terminal.',
      details: [
        'Built a command-line interface using Argparse supporting multiple operations in one run.',
        'Implemented resize-to-fit, center-crop, and aspect-ratio-preserving scale modes with Pillow.',
        'Added text and image watermarking with opacity control and positional anchors.',
        'Supported bulk format conversion (PNG, JPEG, WEBP) with quality tuning options.',
      ],
      github: null,
      liveUrl: null,
      tags: ['Python', 'OpenCV', 'Pillow', 'CLI'],
    },
  ],

  education: [
    { level: 'B.Tech - Information Technology (2021 - 2025)', institute: 'Shri Vaishnav Vidyapeeth Vishwavidyalaya, Indore', grade: 'CGPA: 8.33 / 10' },
    { level: 'Class XII - Higher Secondary (2020 - 2021)', institute: 'Saraswati Gyan Peeth Higher Secondary School, Dewas', grade: 'Marks: 83.60%' },
    { level: 'Class X - Secondary (2018 - 2019)', institute: 'Saraswati Gyan Peeth Higher Secondary School, Dewas', grade: 'Marks: 82.20%' },
  ],
};

export const ASCII_ART = `
 ██████╗  ██████╗ ██████╗ ████████╗███████╗ ██████╗ ██╗     ██╗ ██████╗
 ██╔══██╗██╔═══██╗██╔══██╗╚══██╔══╝██╔════╝██╔═══██╗██║     ██║██╔═══██╗
 ██████╔╝██║   ██║██████╔╝   ██║   █████╗  ██║   ██║██║     ██║██║   ██║
 ██╔═══╝ ██║   ██║██╔══██╗   ██║   ██╔══╝  ██║   ██║██║     ██║██║   ██║
 ██║     ╚██████╔╝██║  ██║   ██║   ██║     ╚██████╔╝███████╗██║╚██████╔╝
 ╚═╝      ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝      ╚═════╝ ╚══════╝╚═╝ ╚═════╝
`;
