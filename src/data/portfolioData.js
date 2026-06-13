export const PortfolioData = {
  summary: `Information Technology graduate with strong skills in Java, Python, and Spring Boot backend development. Experienced in building full-stack and Android applications, REST APIs, and database-driven systems. Passionate about designing scalable backend systems, microservices, and real-world problem-solving. Currently working as a Software Engineer at Tata Consultancy Services (TCS).`,

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
    languages:     ['Java', 'Python', 'SQL', 'Kotlin'],
    backend:       ['Spring Boot', 'Spring MVC', 'REST APIs', 'Hibernate/JPA', 'Adobe Experience Manager (AEM)'],
    frontendMobile:['Jetpack Compose', 'HTML', 'CSS', 'Android SDK'],
    databases:     ['PostgreSQL', 'MySQL', 'Room Database', 'Firebase'],
    tools:         ['Git', 'GitHub', 'Docker', 'Postman', 'Android Studio'],
    concepts:      ['DSA', 'OOP', 'DBMS', 'Operating Systems', 'Computer Networks'],
  },

  skillBars: [
    { category: 'Languages',         icon: 'fa-code',         items: [
      { name: 'Java',    pct: 90 }, { name: 'Python', pct: 80 },
      { name: 'Kotlin',  pct: 85 }, { name: 'SQL',    pct: 80 },
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
      { name: 'PostgreSQL / MySQL',     pct: 82 }, { name: 'Git / GitHub',     pct: 88 },
      { name: 'Docker & Postman',       pct: 70 }, { name: 'CS Fundamentals', pct: 85 },
    ]},
  ],

  experience: [
    {
      role: 'Software Engineer',
      company: 'Tata Consultancy Services (TCS)',
      duration: 'Jan 2026 - Present',
      tech: 'AEM, Java, Spring Frameworks, Agile',
      details: [
        'Developing web architecture using Adobe Experience Manager (AEM), creating modular core components and stable OSGi services.',
        'Writing robust backend integrations and business logic in Java and Spring frameworks.',
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
      name: 'Versatile Appointment Scheduling System',
      icon: 'fa-calendar-check',
      tech: 'Spring Boot, PostgreSQL, Docker, Spring Data JPA, REST APIs',
      overview: 'A full-stack, enterprise-grade appointment booking and scheduling application designed to streamline booking operations for service providers.',
      details: [
        'Engineered modular controllers, validation frameworks, and secure endpoints for appointment handling.',
        'Implemented role-based access controls and request-validation rules to prevent overlapping slot bookings.',
        'Configured PostgreSQL database backend using Hibernate/JPA for complex relational structures.',
        'Configured Docker setup for backend services and databases.',
      ],
      tags: ['Spring Boot', 'PostgreSQL', 'Docker', 'JPA'],
    },
    {
      name: 'Student Performance Prediction System',
      icon: 'fa-chart-line',
      tech: 'Python, Machine Learning, Scikit-Learn, Pandas',
      overview: 'An intelligent data-driven ML system aimed at predicting academic performance indicators and identifying at-risk students.',
      details: [
        'Managed missing value imputations, outlier removal, and categorical transformations on academic datasets.',
        'Constructed and optimized behavioral and score-based features to maximize model accuracy.',
        'Evaluated classification algorithms (Random Forest, Logistic Regression) using Scikit-Learn.',
        'Adjusted hyperparameters using Grid Search cross-validation to prevent overfitting.',
      ],
      tags: ['Python', 'Scikit-Learn', 'Pandas', 'ML'],
    },
    {
      name: 'StudyHub Android App',
      icon: 'fa-graduation-cap',
      tech: 'Kotlin, Firebase, Jetpack Compose, Room Database, WorkManager',
      overview: 'A native academic helper app built for students to organize tasks, track lectures, take quizzes, and set dynamic reminders.',
      details: [
        'Crafted an interactive, responsive Android interface using Jetpack Compose with custom themes.',
        'Integrated Room Database to store schedules, reminders, and flashcard content locally.',
        'Leveraged Firebase authentication and Firestore to sync study progress across devices.',
        'Configured WorkManager and AlarmManager for accurate reminder delivery.',
      ],
      tags: ['Kotlin', 'Jetpack Compose', 'Room DB', 'Firebase'],
    },
    {
      name: 'PlayLog Game Session Tracker',
      icon: 'fa-gamepad',
      tech: 'Kotlin, Jetpack Compose, Coroutines, Flow APIs, ViewModel, Room Database',
      overview: 'A lightweight native Android application that helps gamers record play times, set session limits, and analyze histories.',
      details: [
        'Implemented MVVM architecture utilizing Android ViewModels to keep presentation decoupled from business logic.',
        'Leveraged Kotlin Coroutines and Flow APIs to fetch local DB records without blocking the main thread.',
        'Rendered custom time-spent charts directly in Compose by drawing vectors based on historical records.',
      ],
      tags: ['Kotlin', 'Coroutines', 'Flow API', 'Compose'],
    },
  ],

  education: [
    { level: 'B.Tech - Information Technology (2021 - 2025)', institute: 'Shri Vaishnav Vidyapeeth Vishwavidyalaya, Indore', grade: 'CGPA: 8.33 / 10' },
    { level: 'Class XII - Higher Secondary (2020 - 2021)', institute: 'Saraswati Gyan Peeth Higher Secondary School, Dewas', grade: 'Marks: 83.60%' },
    { level: 'Class X - Secondary (2018 - 2019)', institute: 'Gujrati Samaj Higher Secondary School, Ratlam', grade: 'Marks: 82.20%' },
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
