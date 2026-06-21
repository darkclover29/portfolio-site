// Portfolio Data Store
const PortfolioData = {
    summary: `Information Technology graduate with strong skills in Java, Python, and Spring Boot backend development. Experienced in building full-stack and Android applications, REST APIs, and database-driven systems. Passionate about designing scalable backend systems, microservices, and real-world problem-solving. Currently working as a Software Engineer at Tata Consultancy Services (TCS).`,
    
    skills: {
        languages: ['Java', 'Python', 'SQL', 'Kotlin'],
        backend: ['Spring Boot', 'Spring MVC', 'REST APIs', 'Hibernate/JPA', 'Adobe Experience Manager (AEM)'],
        frontendMobile: ['Jetpack Compose', 'HTML', 'CSS', 'Android SDK'],
        databases: ['PostgreSQL', 'MySQL', 'Room Database', 'Firebase'],
        tools: ['Git', 'GitHub', 'Docker (Basics)', 'Postman', 'Android Studio'],
        concepts: ['Data Structures & Algorithms (DSA)', 'Object-Oriented Programming (OOP)', 'Database Management Systems (DBMS)', 'Operating Systems (OS)', 'Computer Networks']
    },
    
    experience: [
        {
            role: "Software Engineer",
            company: "Tata Consultancy Services (TCS)",
            duration: "Jan 2026 - Present",
            details: [
                "Developing web architecture using Adobe Experience Manager (AEM), creating modular core components and stable OSGi services.",
                "Writing robust backend integrations and business logic in Java and Spring frameworks.",
                "Collaborating with cross-functional agile teams to deliver clean, scalable enterprise-level features.",
                "Optimizing server response cycles, database scripts, and API integration flows."
            ],
            tech: "AEM, Java, Spring Frameworks, Agile"
        },
        {
            role: "Associate Software Engineer Intern",
            company: "Ignitive Software Labs, Indore",
            duration: "Jan 2025 - April 2025",
            details: [
                "Developed Android appointment scheduling app using Kotlin & Jetpack Compose.",
                "Implemented booking, rescheduling, cancellation, and slot management algorithms.",
                "Used Room database for offline data persistence and state synchronization.",
                "Worked with REST APIs and backend services for real-time updates."
            ],
            tech: "Android SDK, Kotlin, Jetpack Compose, Room Database, REST APIs"
        }
    ],
    
    projects: [
        {
            name: "Versatile Appointment Scheduling System",
            tech: "Spring Boot, PostgreSQL, Docker, Spring Data JPA, REST APIs",
            overview: "A full-stack, enterprise-grade appointment booking and scheduling application designed to streamline booking operations for service providers across multiple industries.",
            details: [
                "Engineered modular controllers, validation frameworks, and secure endpoints for appointment handling, registration, and status checking.",
                "Implemented role-based access controls and request-validation rules to prevent overlapping slot bookings and secure client records.",
                "Configured a PostgreSQL database backend using Hibernate/JPA to manage complex relational structures.",
                "Configured Docker setup for the backend services and databases, ensuring seamless deployment configurations."
            ]
        },
        {
            name: "Student Performance Prediction System",
            tech: "Python, Machine Learning, Scikit-Learn, Pandas, Data Processing",
            overview: "An intelligent data-driven machine learning system aimed at predicting academic performance indicators and identifying at-risk students before final assessments.",
            details: [
                "Managed missing value imputations, outlier removal, and categorical transformations on academic datasets containing student history.",
                "Constructed and optimized behavioral and score-based features to maximize model classification accuracy.",
                "Evaluated and deployed classification algorithms (such as Random Forest and Logistic Regression) using Scikit-Learn.",
                "Adjusted hyperparameters using Grid Search cross-validation to prevent model overfitting."
            ]
        },
        {
            name: "StudyHub - Android Application",
            tech: "Kotlin, Firebase, Jetpack Compose, Room Database, Android SDK, WorkManager",
            overview: "A native academic helper app built for students to organize tasks, track lectures, take quizzes, and set dynamic reminders.",
            details: [
                "Crafted an interactive, responsive Android interface using Jetpack Compose with custom themes and smooth layout transitions.",
                "Integrated Room Database to store schedules, reminders, and flashcard content locally, allowing offline capabilities.",
                "Leveraged Firebase authentication and Firestore databases to sync study progress and tasks across user devices.",
                "Configured Android WorkManager and AlarmManager components for accurate reminder delivery."
            ]
        },
        {
            name: "PlayLog Game Session Tracker",
            tech: "Kotlin, Jetpack Compose, Coroutines, Flow APIs, ViewModel, Room Database",
            overview: "A lightweight, native Android application that helps gamers record game play times, set session limits, and analyze play histories.",
            details: [
                "Implemented MVVM architecture pattern utilizing Android ViewModels to keep presentation layers decoupled from business logic.",
                "Leveraged Kotlin Coroutines and Flow APIs to fetch local DB records without blocking main thread interactions.",
                "Rendered custom time-spent charts directly in Compose by drawing vectors dynamically based on historical records."
            ]
        }
    ],
    
    education: [
        {
            level: "B.Tech - Information Technology (2021 - 2025)",
            institute: "Shri Vaishnav Vidyapeeth Vishwavidyalaya, Indore",
            grade: "CGPA: 8.33 / 10"
        },
        {
            level: "Class XII - Higher Secondary (2020 - 2021)",
            institute: "Saraswati Gyan Peeth Higher Secondary School, Dewas",
            grade: "Marks: 83.60%"
        },
        {
            level: "Class X - Secondary (2018 - 2019)",
            institute: "Gujrati Samaj Higher Secondary School, Ratlam",
            grade: "Marks: 82.20%"
        }
    ]
};

// ASCII Art Header
const ASCII_ART = `
 ██████╗  ██████╗ ██████╗ ████████╗███████╗ ██████╗ ██╗     ██╗ ██████╗ 
 ██╔══██╗██╔═══██╗██╔══██╗╚══██╔══╝██╔════╝██╔═══██╗██║     ██║██╔═══██╗
 ██████╔╝██║   ██║██████╔╝   ██║   █████╗  ██║   ██║██║     ██║██║   ██║
 ██╔═══╝ ██║   ██║██╔══██╗   ██║   ██╔══╝  ██║   ██║██║     ██║██║   ██║
 ██║     ╚██████╔╝██║  ██║   ██║   ██║     ╚██████╔╝███████╗██║╚██████╔╝
 ╚═╝      ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝      ╚═════╝ ╚══════╝╚═╝ ╚═════╝ 
`;

// Virtual Filesystem (VFS) Tree structure
const vfsRoot = {
    type: 'dir',
    children: {
        about: {
            type: 'dir',
            children: {
                'summary.txt': { type: 'file', content: PortfolioData.summary },
                'contacts.txt': { type: 'file', content: `Email: harshtiwari493@gmail.com\nPhone: +91-7805841898\nLinkedIn: linkedin.com/in/harshtiwari29\nGitHub: github.com/harshtiwari29` }
            }
        },
        skills: {
            type: 'dir',
            children: {
                'languages.txt': { type: 'file', content: `Primary programming languages:\n1. Java - Advanced\n2. Kotlin - Mobile Architecture\n3. Python - Machine Learning & SciKit\n4. SQL - Complex Relational Queries` },
                'backend.txt': { type: 'file', content: `Enterprise Backend Stacks:\n1. Spring Boot & Spring MVC\n2. REST APIs (OAuth2, Validators)\n3. JPA & Hibernate ORM\n4. Adobe Experience Manager (AEM OSGi)` }
            }
        },
        projects: {
            type: 'dir',
            children: {
                'scheduling_system.txt': { type: 'file', content: `Name: Versatile Appointment Scheduling System\nOverview: Fullstack, Dockerized relational booking backend with Docker-compose, JPA, and custom verification guards.\nStack: Spring Boot, PostgreSQL, Docker, Relational mapping.` },
                'studyhub.txt': { type: 'file', content: `Name: StudyHub Android App\nOverview: Jetpack Compose mobile system integrated with Firebase Firestore online storage and WorkManager reminders.\nStack: Kotlin, Jetpack Compose, Firebase, Room DB.` }
            }
        },
        secrets: {
            type: 'dir',
            children: {
                'cyber_easter.txt': { type: 'file', content: `SYS_ALERT: Congratulations, hacker! You found the secret terminal configuration.\nRun command 'matrix' to witness full rain visualization, or type 'theme cyberpunk' to trigger neon layouts.` }
            }
        }
    }
};

// DOM Elements
const terminalInput = document.getElementById('terminal-input');
const terminalOutput = document.getElementById('terminal-output');
const terminalBody = document.getElementById('terminal-body');
const ghostText = document.getElementById('ghost-text');
const flipper = document.getElementById('flipper');
const muteBtn = document.getElementById('mute-btn');
const matrixCanvas = document.getElementById('matrix-canvas');
const promptDirPrefix = document.getElementById('prompt-dir-prefix');

// Nano Editor DOM Elements
const nanoEditor = document.getElementById('nano-editor');
const nanoTextarea = document.getElementById('nano-textarea');
const nanoFilenameLabel = document.getElementById('nano-filename');
const terminalOutputContainer = document.getElementById('terminal-output-container');
const nanoSaveStatus = document.getElementById('nano-save-status');

// Snake Game DOM Elements
const snakeContainer = document.getElementById('snake-container');
const snakeCanvas = document.getElementById('snake-canvas');
const snakeScoreEl = document.getElementById('snake-score');
const snakeHighScoreEl = document.getElementById('snake-highscore');
const snakeGameOverOverlay = document.getElementById('snake-game-over-overlay');

// Synth Board DOM Elements
const synthContainer = document.getElementById('synth-container');

// File Viewer Modal DOM Elements
const fileViewerModal = document.getElementById('file-viewer-modal');
const modalTitle = document.getElementById('modal-title');
const modalFileContent = document.getElementById('modal-file-content');

// Diagnostics & BGM DOM Elements
const bgmSelect = document.getElementById('bgm-select');
const diagnosticsLogStream = document.getElementById('diagnostics-log-stream');

// IoT & AI DOM Elements
const iotTempDisplay = document.getElementById('iot-temp-display');
const iotHumidityDisplay = document.getElementById('iot-humidity-display');
const iotTempSlider = document.getElementById('iot-temp-slider');
const iotLightingStatus = document.getElementById('iot-lighting-status');
const iotBrightnessSlider = document.getElementById('iot-brightness-slider');
const iotBrightnessDisplay = document.getElementById('iot-brightness-display');
const iotLockBtn = document.getElementById('iot-lock-btn');
const iotLockText = document.getElementById('iot-lock-text');
const iotLockGlow = document.getElementById('iot-lock-glow');
const iotCoolingStatus = document.getElementById('iot-cooling-status');
const iotFanSvg = document.getElementById('iot-fan-svg');
const iotPumpRpm = document.getElementById('iot-pump-rpm');
const iotTelemetryRate = document.getElementById('iot-telemetry-rate');
const aiGuiChatMessages = document.getElementById('ai-gui-chat-messages');
const aiGuiChatInput = document.getElementById('ai-gui-chat-input');
const aiVoiceToggle = document.getElementById('ai-voice-toggle');

// Safe storage wrapper to prevent crashes in sandboxed/file:// environments
const safeStorage = {
    getItem(key) {
        try {
            return localStorage.getItem(key);
        } catch (e) {
            console.warn(`localStorage.getItem failed for key: ${key}`, e);
            return null;
        }
    },
    setItem(key, value) {
        try {
            localStorage.setItem(key, value);
        } catch (e) {
            console.warn(`localStorage.setItem failed for key: ${key}`, e);
        }
    }
};

// State Variables
let inputHistory = [];
let historyIndex = -1;
let currentTheme = 'matrix';
let isSoundMuted = true;
let audioCtx = null;
let currentView = 'cli'; // cli or gui
let isMatrixScreensaver = false;
let isBooting = true;
let bootTimeouts = [];

// Virtual Filesystem State
let currentPath = []; // Array of directory names representing pwd, empty is root (/)
let activeEditingFile = null; // Node reference when nano is active

// Synth State
let isSynthActive = false;

// Upgraded Canvas Snake Game Variables
let snakeGameActive = false;
let snake = [];
let snakeDirection = { x: 1, y: 0 };
let snakeFood = { x: 0, y: 0 };
let snakeScore = 0;
let snakeHighScore = 0;
let snakeGameInterval = null;
const snakeCellSize = 16; // Pixels per cell on canvas
const snakeGridCols = 32;
const snakeGridRows = 16;
let snakeParticles = []; // For eating sparks
let snakeShakeIntensity = 0;
let snakeAnimFrameId = null;

// Simulated IoT Devices State
let iotDevices = {
    thermostat: { name: "Thermostat", status: true, temp: 22.5, humidity: 45 },
    lighting: { name: "RGB Ambient Light", status: true, brightness: 80, color: "green" },
    security: { name: "VFS Access Lock", status: true }, // true = LOCKED
    cooling: { name: "Cooling Fan Pump", status: false, rpm: 0 }
};

// IoT Telemetry variables
let iotTelemetryFrameId = null;
let iotTelemetryHistory = Array(30).fill(120);

// Voice output options
let isVoiceEnabled = false;

// Dashboard Charts variables
let cpuChartInterval = null;
let ramChartInterval = null;
let simulatedLogInterval = null;

// Chat Bot Mode State
let isChatModeActive = false;

// Dashboard Todo List state
let todoTasks = [
    { text: "Optimize Spring relational database queries", completed: false },
    { text: "Implement AEM OSGi core components", completed: true },
    { text: "Write Jetpack Compose dark-theme updates", completed: false },
    { text: "Configure Docker backend environment variables", completed: false }
];

// Available Commands
const COMMANDS = [
    'help', 'about', 'skills', 'experience', 'projects', 
    'education', 'contact', 'neofetch', 'matrix', 'theme', 
    'gui', 'dashboard', 'clear', 'socials',
    'ls', 'cd', 'cat', 'pwd', 'touch', 'rm', 'nano',
    'snake', 'synth', 'bgm', 'chat', 'history', 'grep', 'iot'
];

// Animation loops trackers (for requestAnimationFrame)
let matrixAnimFrameId = null;

// BGM Music state variables
let currentBgmTrack = 'classic'; // classic, synthwave, ambient, off
let bgmSequencerTimeout = null;

// Initialize Website
window.addEventListener('DOMContentLoaded', () => {
    loadSavedConfigurations();
    setupEventListeners();
    setupMatrixRain();
    printBootSequence();
    renderTodoList();
    renderVfsTree();
    
    logSystemEvent("VFS storage mounted on RAM disk.", "SYS");
    logSystemEvent("Console arpeggiator engine online.", "SYS");
});

// Load configuration state from browser localStorage
function loadSavedConfigurations() {
    const savedTheme = safeStorage.getItem('harsh_portfolio_theme');
    if (savedTheme) {
        currentTheme = savedTheme;
        document.body.className = `theme-${savedTheme}`;
        document.getElementById('terminal-status-theme').textContent = `Theme: ${capitalize(savedTheme)}`;
        document.getElementById('dashboard-status-theme').textContent = `Theme: ${capitalize(savedTheme)}`;
    }
    
    // Set initial dropdown values
    document.querySelectorAll('.theme-select-dropdown').forEach(dropdown => {
        dropdown.value = currentTheme;
    });
    
    const savedBgm = safeStorage.getItem('harsh_portfolio_bgm');
    if (savedBgm) {
        currentBgmTrack = savedBgm;
        bgmSelect.value = savedBgm;
    }

    // Restore VFS state from localStorage
    const savedVfs = safeStorage.getItem('harsh_portfolio_vfs');
    if (savedVfs) {
        try {
            const parsed = JSON.parse(savedVfs);
            vfsRoot.children = parsed;
        } catch (e) {
            console.error("VFS Restore failed:", e);
        }
    }
}

function saveVfsToLocalStorage() {
    try {
        safeStorage.setItem('harsh_portfolio_vfs', JSON.stringify(vfsRoot.children));
        renderVfsTree();
    } catch (e) {
        console.error("VFS Save failed:", e);
    }
}

// Event Listeners Configuration
function setupEventListeners() {
    // Focus terminal input on body click in CLI mode
    document.body.addEventListener('click', (e) => {
        if (isBooting) {
            skipBootSequence();
            return;
        }
        if (currentView === 'cli' && 
            !e.target.closest('.audio-controls') && 
            !e.target.closest('.theme-overlay-menu') && 
            !e.target.closest('.modal-container') &&
            !e.target.closest('.theme-select-dropdown') &&
            nanoEditor.style.display === 'none' &&
            snakeContainer.style.display === 'none' &&
            synthContainer.style.display === 'none') {
            terminalInput.focus();
        }
    });

    // Mouse movement spotlight tracking
    document.addEventListener('mousemove', (e) => {
        const xPercent = (e.clientX / window.innerWidth) * 100;
        const yPercent = (e.clientY / window.innerHeight) * 100;
        document.documentElement.style.setProperty('--mouse-x', `${xPercent}%`);
        document.documentElement.style.setProperty('--mouse-y', `${yPercent}%`);
    });

    // Handle input keydown events (commands execution, history lookup, tab autocomplete)
    terminalInput.addEventListener('keydown', handleKeydown);
    terminalInput.addEventListener('input', handleInput);

    // Audio status toggle click handler
    muteBtn.addEventListener('click', toggleMute);

    // BGM Track Selector select element listener
    bgmSelect.addEventListener('change', (e) => {
        currentBgmTrack = e.target.value;
        safeStorage.setItem('harsh_portfolio_bgm', currentBgmTrack);
        logSystemEvent(`Background music track changed to: ${capitalize(currentBgmTrack)}`, "SYS");
        initAudio();
        
        if (currentBgmTrack === 'off') {
            logSystemEvent("Soundtrack loop stopped.", "SYS");
        } else {
            playChimeSFX();
        }
    });

    // Nano key listeners inside editing area
    nanoTextarea.addEventListener('keydown', handleNanoKeydown);

    // Setup Graphical Dashboard tabs
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            tabButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const targetTab = btn.getAttribute('data-tab');
            document.querySelectorAll('.tab-panel').forEach(panel => {
                panel.classList.remove('active');
            });
            
            const activePanel = document.getElementById(targetTab);
            activePanel.classList.add('active');
            
            playChimeSFX();
            logSystemEvent(`Dashboard tab switched to: ${targetTab.replace('-tab', '')}`, "INFO");

            // Stop system monitors animations if leaving tab
            if (targetTab === 'sysmon-tab') {
                startSystemMonitorCharts();
            } else {
                stopSystemMonitorCharts();
            }

            // Start/Stop IoT telemetry graph
            if (targetTab === 'iot-tab') {
                startIotTelemetryChart();
                updateIotGuiControls();
            } else {
                stopIotTelemetryChart();
            }

            // If skills tab is opened, animate progress bars
            if (targetTab === 'skills-tab') {
                animateSkills();
            }
        });
    });

    // Todo Board Event listeners
    document.getElementById('add-todo-btn').addEventListener('click', addTodo);
    document.getElementById('todo-input').addEventListener('keydown', (e) => {
        if (e.key === 'Enter') addTodo();
    });

    // GUI Chat Enter submission
    const aiGuiInput = document.getElementById('ai-gui-chat-input');
    if (aiGuiInput) {
        aiGuiInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') sendGuiChatMessage();
        });
    }

    // Snake On-screen D-Pad listeners
    const bindDpad = (id, x, y) => {
        const btn = document.getElementById(id);
        if (btn) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                if (!snakeGameActive) return;
                if (x !== 0 && snakeDirection.x === 0) snakeDirection = { x, y };
                if (y !== 0 && snakeDirection.y === 0) snakeDirection = { x, y };
                playKeypressSound();
            });
            btn.addEventListener('touchstart', (e) => {
                e.preventDefault();
                if (!snakeGameActive) return;
                if (x !== 0 && snakeDirection.x === 0) snakeDirection = { x, y };
                if (y !== 0 && snakeDirection.y === 0) snakeDirection = { x, y };
                playKeypressSound();
            });
        }
    };
    bindDpad('dpad-up', 0, -1);
    bindDpad('dpad-down', 0, 1);
    bindDpad('dpad-left', -1, 0);
    bindDpad('dpad-right', 1, 0);

    // Keyboard controls for retro games and synths
    window.addEventListener('keydown', handleGlobalKeydown);
    setupAudioDelegation();
}

function setupAudioDelegation() {
    document.body.addEventListener('mouseenter', (e) => {
        const target = e.target.closest('button, a, .tab-btn, .theme-option, .tree-file, .color-dot, select, input, .todo-item-check');
        if (target) {
            playHoverSFX();
        }
    }, true);
    
    document.body.addEventListener('click', (e) => {
        const target = e.target.closest('button, a, .tab-btn, .theme-option, .tree-file, .color-dot, select, input, .todo-item-check');
        if (target) {
            if (target.closest('.view-toggle-btn') || 
                target.closest('.audio-controls') || 
                target.closest('.lock-btn') || 
                target.closest('#ai-gui-chat-send-btn') || 
                target.closest('.dpad-btn')) {
                return;
            }
            playClickSFX();
        }
    });
}

// Interactive Dashboard Logging Engine
function logSystemEvent(msg, type = 'INFO') {
    if (!diagnosticsLogStream) return;
    
    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0];
    
    let tagHtml = '';
    if (type === 'INFO') {
        tagHtml = `<span class="log-tag-info">[INFO]</span>`;
    } else if (type === 'SYS') {
        tagHtml = `<span class="log-tag-sys">[SYSTEM]</span>`;
    } else if (type === 'PROCESS') {
        tagHtml = `<span class="log-tag-proc">[PROCESS]</span>`;
    }
    
    const logLine = document.createElement('div');
    logLine.innerHTML = `<span class="log-timestamp">[${timeStr}]</span> ${tagHtml} ${msg}`;
    diagnosticsLogStream.appendChild(logLine);
    
    // Cap lines history at 40 entries
    while (diagnosticsLogStream.children.length > 40) {
        diagnosticsLogStream.removeChild(diagnosticsLogStream.firstChild);
    }
    
    const wrapper = diagnosticsLogStream.parentElement;
    wrapper.scrollTop = wrapper.scrollHeight;
}

// Global Key Down listener for games/synths/nano overrides
function handleGlobalKeydown(e) {
    // Synth Key hooks
    if (isSynthActive) {
        const keyMap = {
            '1': 261.63, // C4
            '2': 293.66, // D4
            '3': 329.63, // E4
            '4': 349.23, // F4
            '5': 392.00, // G4
            '6': 440.00, // A4
            '7': 493.88, // B4
            '8': 523.25  // C5
        };
        
        if (keyMap[e.key]) {
            e.preventDefault();
            playSynthKey(keyMap[e.key], e.key);
        } else if (e.key.toLowerCase() === 'q' || e.key === 'Escape') {
            exitSynthMode();
        }
    }

    // Snake Game Keyboard hooks
    if (snakeGameActive) {
        if (e.key === 'ArrowUp' || e.key.toLowerCase() === 'w') {
            e.preventDefault();
            if (snakeDirection.y === 0) snakeDirection = { x: 0, y: -1 };
        } else if (e.key === 'ArrowDown' || e.key.toLowerCase() === 's') {
            e.preventDefault();
            if (snakeDirection.y === 0) snakeDirection = { x: 0, y: 1 };
        } else if (e.key === 'ArrowLeft' || e.key.toLowerCase() === 'a') {
            e.preventDefault();
            if (snakeDirection.x === 0) snakeDirection = { x: -1, y: 0 };
        } else if (e.key === 'ArrowRight' || e.key.toLowerCase() === 'd') {
            e.preventDefault();
            if (snakeDirection.x === 0) snakeDirection = { x: 1, y: 0 };
        } else if (e.key.toLowerCase() === 'q') {
            exitSnakeGame();
        } else if (e.key === 'Enter' && snakeGameOverOverlay.style.display !== 'none') {
            startSnakeGame();
        }
    }
}

// Web Audio API Synthesis
function initAudio() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        startAmbientHum();
        startAmbientArpeggiator();
    }
}

function toggleMute() {
    isSoundMuted = !isSoundMuted;
    if (isSoundMuted) {
        muteBtn.innerHTML = '<i class="fas fa-volume-mute"></i> Sound Off';
        logSystemEvent("Audio output muted.", "SYS");
        if (audioCtx && audioCtx.state !== 'suspended') {
            audioCtx.suspend();
        }
    } else {
        muteBtn.innerHTML = '<i class="fas fa-volume-up"></i> Sound On';
        logSystemEvent("Audio output enabled.", "SYS");
        initAudio();
        if (audioCtx && audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        playChimeSFX();
    }
}

function playAudioTone(frequency, type = 'sine', duration = 0.1, volumeValue = 0.1) {
    if (isSoundMuted || !audioCtx) return;
    
    try {
        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        
        osc.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        
        osc.type = type;
        osc.frequency.setValueAtTime(frequency, audioCtx.currentTime);
        
        gainNode.gain.setValueAtTime(volumeValue, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
        
        osc.start(audioCtx.currentTime);
        osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
        console.error("Audio Synthesis error: ", e);
    }
}

// UNIQUE MECHANICAL KEYBOARD Switch Click audio generator
function playKeypressSound() {
    if (isSoundMuted || !audioCtx) return;
    
    try {
        const now = audioCtx.currentTime;
        
        // 1. High frequency mechanical switch click rebound (Triangle oscillator)
        const clickOsc = audioCtx.createOscillator();
        const clickGain = audioCtx.createGain();
        clickOsc.type = 'triangle';
        clickOsc.frequency.setValueAtTime(1600, now);
        clickOsc.frequency.exponentialRampToValueAtTime(600, now + 0.012);
        
        clickGain.gain.setValueAtTime(0.08, now);
        clickGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.015);
        
        clickOsc.connect(clickGain);
        clickGain.connect(audioCtx.destination);
        clickOsc.start(now);
        clickOsc.stop(now + 0.02);
        
        // 2. Low frequency plastic key thud contact (Sine oscillator)
        const thudOsc = audioCtx.createOscillator();
        const thudGain = audioCtx.createGain();
        thudOsc.type = 'sine';
        thudOsc.frequency.setValueAtTime(130, now);
        thudOsc.frequency.linearRampToValueAtTime(50, now + 0.02);
        
        thudGain.gain.setValueAtTime(0.12, now);
        thudGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.025);
        
        thudOsc.connect(thudGain);
        thudGain.connect(audioCtx.destination);
        thudOsc.start(now);
        thudOsc.stop(now + 0.03);
    } catch (e) {}
}

// Retro computer command execute click (Laser frequency sweep down)
function playEnterSFX() {
    if (isSoundMuted || !audioCtx) return;
    try {
        const now = audioCtx.currentTime;
        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        
        osc.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(120, now + 0.12);
        
        gainNode.gain.setValueAtTime(0.1, now);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.15);
        
        osc.start(now);
        osc.stop(now + 0.18);
    } catch(e) {}
}

// Detuned Error Buzzer SFX (Sawtooth wave overlap)
function playErrorSFX() {
    if (isSoundMuted || !audioCtx) return;
    try {
        const now = audioCtx.currentTime;
        const osc1 = audioCtx.createOscillator();
        const osc2 = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        
        osc1.connect(gainNode);
        osc2.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        
        osc1.type = 'sawtooth';
        osc1.frequency.setValueAtTime(110, now);
        
        osc2.type = 'sawtooth';
        osc2.frequency.setValueAtTime(113, now); // Detuned for buzz friction
        
        gainNode.gain.setValueAtTime(0.18, now);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.3);
        
        osc1.start(now);
        osc2.start(now);
        
        osc1.stop(now + 0.32);
        osc2.stop(now + 0.32);
    } catch (e) {}
}

// 3D Card flip sliding frequency sweep
function playFlipSFX(isToGui) {
    if (isSoundMuted || !audioCtx) return;
    try {
        const now = audioCtx.currentTime;
        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        
        osc.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        
        osc.type = 'sine';
        if (isToGui) {
            osc.frequency.setValueAtTime(180, now);
            osc.frequency.linearRampToValueAtTime(440, now + 0.3);
        } else {
            osc.frequency.setValueAtTime(440, now);
            osc.frequency.linearRampToValueAtTime(180, now + 0.3);
        }
        
        gainNode.gain.setValueAtTime(0.08, now);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);
        
        osc.start(now);
        osc.stop(now + 0.4);
    } catch (e) {}
}

// Clean retro chimes (Detuned sine wave)
function playChimeSFX() {
    if (isSoundMuted || !audioCtx) return;
    try {
        const now = audioCtx.currentTime;
        const osc1 = audioCtx.createOscillator();
        const osc2 = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        
        osc1.connect(gainNode);
        osc2.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(880, now); // A5 note
        
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(883, now); //Detuned chime
        
        gainNode.gain.setValueAtTime(0.12, now);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.15);
        
        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + 0.18);
        osc2.stop(now + 0.18);
    } catch(e) {}
}

function playHoverSFX() {
    if (isSoundMuted || !audioCtx) return;
    try {
        playAudioTone(1200, 'sine', 0.02, 0.015);
    } catch (e) {}
}

function playClickSFX() {
    if (isSoundMuted || !audioCtx) return;
    try {
        playAudioTone(380, 'triangle', 0.06, 0.05);
    } catch (e) {}
}

// Chiptune background arpeggiator engine (Upgraded with DETUNING & SUB-BASS chorus settings)
function startAmbientArpeggiator() {
    if (isSoundMuted || !audioCtx) return;

    const tracks = {
        classic: {
            chords: [
                [220.00, 261.63, 329.63, 440.00], // Am
                [174.61, 220.00, 261.63, 349.23], // F
                [130.81, 164.81, 196.00, 261.63], // C
                [196.00, 246.94, 293.66, 392.00]  // G
            ],
            type: 'triangle',
            speed: 180,
            volume: 0.035, // LOUDER
            decay: 0.15
        },
        synthwave: {
            chords: [
                [146.83, 174.61, 220.00, 293.66], // Dm arpeggios
                [116.54, 146.83, 174.61, 233.08], // Bb
                [130.81, 164.81, 196.00, 261.63], // C
                [110.00, 130.81, 164.81, 220.00]  // Am
            ],
            type: 'sawtooth',
            speed: 130, // Faster cyberpunk beat
            volume: 0.02, // LOUDER
            decay: 0.11
        },
        ambient: {
            chords: [
                [110.00, 164.81, 220.00, 329.63], // Am9 Slow sweep pads
                [87.31, 130.81, 174.61, 261.63],  // Fmaj7
                [130.81, 196.00, 261.63, 392.00], // Cmaj7
                [98.00, 146.83, 196.00, 293.66]   // G6
            ],
            type: 'sine',
            speed: 1500, // Slowly modulating pad sweeps
            volume: 0.045, // LOUDER
            decay: 1.8
        }
    };

    let chordIndex = 0;
    let noteIndex = 0;

    function runSequencer() {
        if (isSoundMuted || !audioCtx || currentView !== 'cli' || currentBgmTrack === 'off' || snakeGameActive || isSynthActive) {
            bgmSequencerTimeout = setTimeout(runSequencer, 200);
            return;
        }

        const track = tracks[currentBgmTrack] || tracks.classic;
        const now = audioCtx.currentTime;
        
        try {
            if (currentBgmTrack === 'ambient') {
                // Play overlapping chord notes simultaneously (sine drone sweeps)
                const chord = track.chords[chordIndex];
                chord.forEach(freq => {
                    // Detuned sine sweep 1
                    const osc1 = audioCtx.createOscillator();
                    const osc2 = audioCtx.createOscillator();
                    const gainNode = audioCtx.createGain();
                    
                    osc1.connect(gainNode);
                    osc2.connect(gainNode);
                    gainNode.connect(audioCtx.destination);
                    
                    osc1.type = 'sine';
                    osc1.frequency.setValueAtTime(freq, now);
                    
                    osc2.type = 'sine';
                    osc2.frequency.setValueAtTime(freq + 1.5, now); // Detune
                    
                    gainNode.gain.setValueAtTime(0.001, now);
                    gainNode.gain.linearRampToValueAtTime(track.volume, now + 0.6); // Slow swell
                    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + track.decay);
                    
                    osc1.start(now);
                    osc2.start(now);
                    osc1.stop(now + track.decay + 0.2);
                    osc2.stop(now + track.decay + 0.2);
                });
                chordIndex = (chordIndex + 1) % track.chords.length;
            } else if (currentBgmTrack === 'synthwave') {
                // Sawtooth lead + Sub-Bass division (heavy retro synthwave arpeggio)
                const chord = track.chords[chordIndex];
                const freq = chord[noteIndex];
                
                const leadOsc = audioCtx.createOscillator();
                const subOsc = audioCtx.createOscillator();
                const gainNode = audioCtx.createGain();
                
                leadOsc.connect(gainNode);
                subOsc.connect(gainNode);
                gainNode.connect(audioCtx.destination);
                
                leadOsc.type = 'sawtooth';
                leadOsc.frequency.setValueAtTime(freq, now);
                
                subOsc.type = 'triangle';
                subOsc.frequency.setValueAtTime(freq / 2, now); // Sub-bass octave division
                
                gainNode.gain.setValueAtTime(track.volume, now);
                gainNode.gain.exponentialRampToValueAtTime(0.0001, now + track.decay);
                
                leadOsc.start(now);
                subOsc.start(now);
                leadOsc.stop(now + track.decay + 0.05);
                subOsc.stop(now + track.decay + 0.05);
                
                noteIndex = (noteIndex + 1) % 4;
                if (noteIndex === 0) {
                    chordIndex = (chordIndex + 1) % track.chords.length;
                }
            } else {
                // Classic Chiptune arpeggio - Detuned dual oscillators (rich chorus)
                const chord = track.chords[chordIndex];
                const freq = chord[noteIndex];
                
                const osc1 = audioCtx.createOscillator();
                const osc2 = audioCtx.createOscillator();
                const gainNode = audioCtx.createGain();
                
                osc1.connect(gainNode);
                osc2.connect(gainNode);
                gainNode.connect(audioCtx.destination);
                
                osc1.type = 'triangle';
                osc1.frequency.setValueAtTime(freq, now);
                
                osc2.type = 'triangle';
                osc2.frequency.setValueAtTime(freq + 3.5, now); // Chorus detune pitch drift
                
                gainNode.gain.setValueAtTime(track.volume, now);
                gainNode.gain.exponentialRampToValueAtTime(0.0001, now + track.decay);
                
                osc1.start(now);
                osc2.start(now);
                osc1.stop(now + track.decay + 0.05);
                osc2.stop(now + track.decay + 0.05);
                
                noteIndex = (noteIndex + 1) % 4;
                if (noteIndex === 0) {
                    chordIndex = (chordIndex + 1) % track.chords.length;
                }
            }
        } catch (e) {}

        bgmSequencerTimeout = setTimeout(runSequencer, track.speed);
    }

    runSequencer();
}

// Matrix Digital Rain Logic optimized with requestAnimationFrame for smooth 60 FPS
function setupMatrixRain() {
    const ctx = matrixCanvas.getContext('2d');
    
    let width = matrixCanvas.width = window.innerWidth;
    let height = matrixCanvas.height = window.innerHeight;
    
    window.addEventListener('resize', () => {
        width = matrixCanvas.width = window.innerWidth;
        height = matrixCanvas.height = window.innerHeight;
    });
    
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$#@%&*+=/\\';
    const fontSize = 16;
    const columns = Math.floor(width / fontSize);
    
    const rainDrops = [];
    for (let x = 0; x < columns; x++) {
        rainDrops[x] = Math.random() * -100; // Start at randomized offsets for organic look
    }
    
    let lastTime = 0;
    const fpsInterval = 1000 / 30; // Limit rendering update to 30FPS for classic terminal rain pace, but run animation loop at 60Hz
    
    function draw(timestamp) {
        matrixAnimFrameId = requestAnimationFrame(draw);
        
        // Throttling step rendering to fit matrix rate
        const elapsed = timestamp - lastTime;
        if (elapsed < fpsInterval) return;
        lastTime = timestamp - (elapsed % fpsInterval);
        
        // Semi-transparent trailing background
        ctx.fillStyle = 'rgba(5, 8, 5, 0.06)';
        ctx.fillRect(0, 0, width, height);
        
        ctx.font = fontSize + 'px monospace';
        
        const activeThemeColor = getThemeColor();
        
        for (let i = 0; i < rainDrops.length; i++) {
            const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
            
            // Random white highlight for leading drop
            if (Math.random() > 0.98) {
                ctx.fillStyle = '#ffffff';
                ctx.shadowBlur = 10;
                ctx.shadowColor = '#ffffff';
            } else {
                ctx.fillStyle = activeThemeColor;
                ctx.shadowBlur = 5;
                ctx.shadowColor = activeThemeColor;
            }
            
            const x = i * fontSize;
            const y = rainDrops[i] * fontSize;
            
            if (y > 0) {
                ctx.fillText(text, x, y);
            }
            
            if (y > height && Math.random() > 0.975) {
                rainDrops[i] = 0;
            }
            rainDrops[i]++;
        }
        ctx.shadowBlur = 0; // Reset shadow for canvas performance
    }
    
    matrixAnimFrameId = requestAnimationFrame(draw);
}

// Booting / Welcome Sequence
function printBootSequence() {
    isBooting = true;
    const bootLines = [
        "Initializing HARSH-CLI Bootloader v2.5...",
        "Loading system VFS dependencies: CPU [OK] | RAM [OK] | VFS_DRIVERS [OK]",
        "Configuring memory filesystem mounting vectors...",
        "Virtual Filesystem loaded mounted at /",
        "Configuring requestAnimationFrame rendering engines... [60 FPS OK]",
        "Done. Running dynamic console terminal interface."
    ];
    
    let delay = 0;
    bootLines.forEach((line, index) => {
        let t1 = setTimeout(() => {
            printLine(line, 'ansi-white');
            if (index === bootLines.length - 1) {
                let t2 = setTimeout(() => {
                    completeBoot();
                }, 300);
                bootTimeouts.push(t2);
            }
        }, delay);
        bootTimeouts.push(t1);
        delay += 70;
    });
}

function completeBoot() {
    if (!isBooting) return;
    printLine(ASCII_ART, 'ansi-green');
    printLine("=========================================================================", 'ansi-green');
    printLine("Welcome! You have loaded Harsh Tiwari's Advanced Terminal Portfolio.", 'ansi-white');
    printLine("Featuring a Virtual Filesystem (VFS), nano Editor, and interactive Retro Games.", 'ansi-white');
    printLine("Type 'help' to review commands, 'ls' to list folders, 'snake' to play.", 'ansi-white');
    printLine("=========================================================================", 'ansi-green');
    playChimeSFX();
    isBooting = false;
    bootTimeouts = [];
}

function skipBootSequence() {
    if (!isBooting) return;
    
    // Clear all timeouts
    bootTimeouts.forEach(t => clearTimeout(t));
    bootTimeouts = [];
    
    // Clear output to prevent duplicate boot text
    terminalOutput.innerHTML = '';
    
    const bootLines = [
        "Initializing HARSH-CLI Bootloader v2.5...",
        "Loading system VFS dependencies: CPU [OK] | RAM [OK] | VFS_DRIVERS [OK]",
        "Configuring memory filesystem mounting vectors...",
        "Virtual Filesystem loaded mounted at /",
        "Configuring requestAnimationFrame rendering engines... [60 FPS OK]",
        "Done. Running dynamic console terminal interface."
    ];
    
    bootLines.forEach(line => printLine(line, 'ansi-white'));
    completeBoot();
}

// CLI Print helper
function printLine(text, cssClass = '') {
    const div = document.createElement('div');
    if (cssClass) {
        div.className = cssClass;
    }
    
    if (text.includes('\n') && !text.includes('<div') && !text.includes('<span')) {
        div.textContent = text;
    } else {
        div.innerHTML = text;
    }
    
    terminalOutput.appendChild(div);
    terminalBody.scrollTop = terminalBody.scrollHeight;
}

// VFS Helper: Traverse and retrieve node by path array
function getVfsNode(pathArr) {
    let current = vfsRoot;
    for (let name of pathArr) {
        if (current.type !== 'dir' || !current.children[name]) {
            return null;
        }
        current = current.children[name];
    }
    return current;
}

function resolvePath(pathStr) {
    if (!pathStr) return { node: getVfsNode(currentPath), path: [...currentPath] };
    
    let parts = pathStr.split('/').filter(p => p !== '' && p !== '.');
    let workingPath = pathStr.startsWith('/') ? [] : [...currentPath];
    
    for (let part of parts) {
        if (part === '..') {
            if (workingPath.length > 0) workingPath.pop();
        } else {
            workingPath.push(part);
        }
    }
    
    let targetNode = getVfsNode(workingPath);
    return { node: targetNode, path: workingPath };
}

// Advanced File path resolution supporting folder/file paths anywhere in VFS
function resolveFilePath(filePathStr) {
    if (!filePathStr) {
        return { parentNode: null, targetName: '', node: null, path: [] };
    }
    
    let parts = filePathStr.split('/').filter(p => p !== '' && p !== '.');
    let workingPath = filePathStr.startsWith('/') ? [] : [...currentPath];
    
    for (let part of parts) {
        if (part === '..') {
            if (workingPath.length > 0) workingPath.pop();
        } else {
            workingPath.push(part);
        }
    }
    
    if (workingPath.length === 0) {
        return { parentNode: null, targetName: '', node: null, path: [] };
    }
    
    let parentPath = workingPath.slice(0, -1);
    let targetName = workingPath[workingPath.length - 1];
    let parentNode = getVfsNode(parentPath);
    let node = (parentNode && parentNode.type === 'dir' && parentNode.children) ? parentNode.children[targetName] : null;
    
    return { parentNode, targetName, node, path: workingPath };
}

// Dynamically render VFS Explorer Tree
function renderVfsTree() {
    const container = document.querySelector('.vfs-tree');
    if (!container) return;
    
    function buildTreeHtml(node, pathArr) {
        let html = '';
        const entries = Object.keys(node.children || {}).sort();
        
        entries.forEach(name => {
            const child = node.children[name];
            const currentPath = [...pathArr, name];
            const fullPathStr = '/' + currentPath.join('/');
            
            if (child.type === 'dir') {
                let isLockedDir = (name === 'secrets' && iotDevices.security.status);
                let dirIcon = isLockedDir ? 'fa-lock' : 'fa-folder';
                let dirClass = 'tree-dir' + (isLockedDir ? ' locked' : '');
                
                html += `<li>
                    <span class="${dirClass}"><i class="fas ${dirIcon}"></i> ${name}</span>
                    <ul>
                        ${buildTreeHtml(child, currentPath)}
                    </ul>
                </li>`;
            } else {
                let isLockedFile = (pathArr[0] === 'secrets' && iotDevices.security.status);
                let fileIcon = isLockedFile ? 'fa-lock' : 'fa-file-alt';
                let fileClass = isLockedFile ? 'tree-file-locked' : 'tree-file';
                
                html += `<li onclick="exploreVfsFile('${fullPathStr}')">
                    <span class="${fileClass}"><i class="fas ${fileIcon}"></i> ${name}</span>
                </li>`;
            }
        });
        
        return html;
    }
    
    container.innerHTML = buildTreeHtml(vfsRoot, []);
}

// Input Handlers (CLI Autocomplete and Execution)
function handleInput(e) {
    const value = e.target.value.toLowerCase().trim();
    if (!value) {
        ghostText.textContent = '';
        return;
    }
    
    // Autocomplete command matching (Disabled in chatbot mode to avoid ghost overlays)
    if (isChatModeActive) return;
    
    const match = COMMANDS.find(cmd => cmd.startsWith(value));
    if (match && match !== value) {
        ghostText.textContent = e.target.value + match.slice(value.length);
    } else {
        ghostText.textContent = '';
    }
}

function handleKeydown(e) {
    if (isBooting) {
        e.preventDefault();
        skipBootSequence();
        return;
    }
    // Play satisfying physical keyboard switch clicks on keydowns
    if (e.key !== 'Enter' && e.key !== 'Shift' && e.key !== 'Control' && e.key !== 'Alt') {
        playKeypressSound();
    }
    
    // Tab Auto-Completion
    if (e.key === 'Tab') {
        e.preventDefault();
        if (isChatModeActive) return;
        
        const value = e.target.value.toLowerCase().trim();
        const match = COMMANDS.find(cmd => cmd.startsWith(value));
        if (match) {
            e.target.value = match;
            ghostText.textContent = '';
        }
    }
    
    // Command History Navigation (Arrow Up)
    else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (inputHistory.length > 0 && historyIndex < inputHistory.length - 1) {
            historyIndex++;
            terminalInput.value = inputHistory[inputHistory.length - 1 - historyIndex];
            ghostText.textContent = '';
        }
    }
    
    // Command History Navigation (Arrow Down)
    else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndex > 0) {
            historyIndex--;
            terminalInput.value = inputHistory[inputHistory.length - 1 - historyIndex];
            ghostText.textContent = '';
        } else if (historyIndex === 0) {
            historyIndex = -1;
            terminalInput.value = '';
            ghostText.textContent = '';
        }
    }
    
    // Enter key - Command submission
    else if (e.key === 'Enter') {
        const rawInput = terminalInput.value;
        const input = rawInput.trim();
        
        if (input) {
            inputHistory.push(input);
        }
        historyIndex = -1;
        
        // Custom sound for Enter process submission
        playEnterSFX();
        
        // Print command back
        if (isChatModeActive) {
            printLine(`chatbot@harsh-dev:~$ ${rawInput}`, 'ansi-white');
            handleChatBotQuery(input);
        } else {
            const currentPathStr = currentPath.length === 0 ? '/' : '/' + currentPath.join('/');
            printLine(`guest@harsh-dev:${currentPathStr}$ ${rawInput}`, 'ansi-white');
            executeCommand(input);
        }
        
        // Clear input
        terminalInput.value = '';
        ghostText.textContent = '';
    }
}

// Command execution hub
function executeCommand(cmdString) {
    const parts = cmdString.split(' ');
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);
    
    if (isMatrixScreensaver) {
        exitMatrixScreensaver();
        return;
    }
    
    // Log CLI executions in system log stream
    if (cmd) {
        logSystemEvent(`CLI Command executed: '${cmdString}'`, "INFO");
    }
    
    switch (cmd) {
        case 'help':
            cmdHelp();
            break;
        case 'about':
            cmdAbout();
            break;
        case 'skills':
            cmdSkills();
            break;
        case 'experience':
            cmdExperience();
            break;
        case 'projects':
            cmdProjects();
            break;
        case 'education':
            cmdEducation();
            break;
        case 'contact':
        case 'socials':
            cmdContact();
            break;
        case 'neofetch':
            cmdNeofetch();
            break;
        case 'matrix':
            cmdMatrix();
            break;
        case 'theme':
            cmdTheme(args[0]);
            break;
        case 'gui':
        case 'dashboard':
            toggleView('gui');
            break;
        case 'clear':
            terminalOutput.innerHTML = '';
            break;
            
        // FILESYSTEM COMMANDS
        case 'ls':
            cmdLs(args[0]);
            break;
        case 'cd':
            cmdCd(args[0]);
            break;
        case 'cat':
            cmdCat(args[0]);
            break;
        case 'pwd':
            cmdPwd();
            break;
        case 'touch':
            cmdTouch(args[0]);
            break;
        case 'rm':
            cmdRm(args[0]);
            break;
        case 'nano':
            cmdNano(args[0]);
            break;
            
        // RETRO INTERACTIONS
        case 'snake':
            cmdSnake();
            break;
        case 'synth':
            cmdSynth();
            break;
        case 'bgm':
            cmdBgm(args[0]);
            break;
            
        // NEW SHELL EXPANSION UTILS
        case 'chat':
            enterChatBotMode();
            break;
        case 'history':
            cmdHistory();
            break;
        case 'grep':
            cmdGrep(args[0], args[1]);
            break;
        case 'iot':
            cmdIot(args);
            break;
            
        case 'sudo':
            printLine("Error: guest user is not in the sudoers file. This incident will be reported.", "ansi-magenta");
            playErrorSFX();
            break;
        default:
            printLine(`Command not found: '${cmd}'. Type 'help' to show all valid inputs.`, "ansi-magenta");
            playErrorSFX();
    }
}

// BGM Music CLI Handler
function cmdBgm(trackName) {
    if (!trackName) {
        printLine(`Background music synthesizer status:`, "ansi-white");
        printLine(`  Active track: <span class="ansi-cyan">${currentBgmTrack}</span>`, "ansi-white");
        printLine(`  Muted status: <span class="ansi-cyan">${isSoundMuted ? 'Muted' : 'Unmuted'}</span>`, "ansi-white");
        printLine(`Available arpeggiators: classic | synthwave | ambient | off`, "ansi-white");
        return;
    }
    
    const validBgms = ['classic', 'synthwave', 'ambient', 'off'];
    if (validBgms.includes(trackName)) {
        currentBgmTrack = trackName;
        bgmSelect.value = trackName;
        safeStorage.setItem('harsh_portfolio_bgm', currentBgmTrack);
        
        logSystemEvent(`Background music track changed to: ${capitalize(trackName)}`, "SYS");
        initAudio();
        
        if (trackName === 'off') {
            printLine("BGM loops stopped.", "ansi-white");
        } else {
            printLine(`BGM track updated to: ${trackName}. (Make sure Sound is toggled ON).`, "ansi-green");
            playChimeSFX();
        }
    } else {
        printLine(`Unknown track '${trackName}'. Available tracks are: ${validBgms.join(', ')}`, "ansi-magenta");
    }
}

// History shell command
function cmdHistory() {
    printLine("COMMAND HISTORY LOG", "ansi-green");
    printLine("---------------------------------------", "ansi-green");
    if (inputHistory.length === 0) {
        printLine("(history empty)", "ansi-white");
        return;
    }
    inputHistory.forEach((cmd, idx) => {
        printLine(`  ${(idx + 1).toString().padStart(3)}  ${cmd}`, "ansi-white");
    });
}

// Grep file content search command
function cmdGrep(keyword, pathStr) {
    if (!keyword || !pathStr) {
        printLine("grep: Missing arguments. Usage: grep <keyword> <filepath>", "ansi-magenta");
        playErrorSFX();
        return;
    }
    
    let { node, path } = resolveFilePath(pathStr);
    if (isPathProtected(path)) {
        printLine("Permission Denied: File inside /secrets is locked by IoT security protocol.", "ansi-magenta");
        playErrorSFX();
        return;
    }
    if (!node) {
        printLine(`grep: File not found: ${pathStr}`, "ansi-magenta");
        playErrorSFX();
        return;
    }
    if (node.type === 'dir') {
        printLine(`grep: ${pathStr} is a directory. Cannot search directory contents.`, "ansi-magenta");
        playErrorSFX();
        return;
    }
    
    let lines = node.content.split('\n');
    let matchesCount = 0;
    
    lines.forEach((line, idx) => {
        if (line.toLowerCase().includes(keyword.toLowerCase())) {
            // Highlight matching keyword
            const regex = new RegExp(`(${keyword})`, 'gi');
            const highlightedLine = line.replace(regex, `<span class="ansi-magenta" style="font-weight:bold;">$1</span>`);
            printLine(`  Line ${idx + 1}: ${highlightedLine}`, "ansi-white");
            matchesCount++;
        }
    });
    
    if (matchesCount === 0) {
        printLine(`No matches found for keyword '${keyword}' in ${pathStr}`, "ansi-white");
    } else {
        printLine(`grep scan finished. Found ${matchesCount} matching instances.`, "ansi-green");
    }
}

// Chatbot CLI mode handler
function enterChatBotMode() {
    isChatModeActive = true;
    promptDirPrefix.textContent = "chatbot@harsh-dev:~$";
    printLine("=========================================================================", "ansi-cyan");
    printLine("AI HELPER CHAT MODE INITIALIZED", "ansi-cyan");
    printLine("Ask me questions about Harsh Tiwari (e.g. skills, experience, projects).", "ansi-white");
    printLine("Type 'exit' or 'quit' to close chat session.", "ansi-white");
    printLine("=========================================================================", "ansi-cyan");
    playChimeSFX();
}

function handleChatBotQuery(query) {
    const cleanQuery = query.toLowerCase().trim();
    
    if (cleanQuery === 'exit' || cleanQuery === 'quit') {
        isChatModeActive = false;
        updatePromptPrefix();
        printLine("Closed AI Helper session.", "ansi-cyan");
        playChimeSFX();
        return;
    }
    
    if (!cleanQuery) {
        printLine("Chatbot: Please ask a question!", "ansi-white");
        return;
    }
    
    logSystemEvent(`Chatbot processed query: "${query}"`, "INFO");
    
    // Core keyword scanning responses
    if (cleanQuery.includes("project") || cleanQuery.includes("portfolio")) {
        printLine("Chatbot: Harsh has engineered several key projects, including:", "ansi-cyan");
        PortfolioData.projects.forEach(p => {
            printLine(`  * ${p.name} (Stack: ${p.tech})`, "ansi-white");
        });
        printLine("Type 'cat projects/<filename>' or run CLI command 'projects' to review full details.", "ansi-white");
    } 
    else if (cleanQuery.includes("experience") || cleanQuery.includes("tcs") || cleanQuery.includes("job") || cleanQuery.includes("intern")) {
        printLine("Chatbot: Harsh has professional experience in backend and mobile architecture:", "ansi-cyan");
        PortfolioData.experience.forEach(j => {
            printLine(`  * ${j.role} at ${j.company} (${j.duration}). Core Stack: ${j.tech}`, "ansi-white");
        });
        printLine("Type 'cat about/contacts.txt' or check out the GUI Timeline for more details.", "ansi-white");
    } 
    else if (cleanQuery.includes("skill") || cleanQuery.includes("java") || cleanQuery.includes("kotlin") || cleanQuery.includes("spring") || cleanQuery.includes("python")) {
        printLine("Chatbot: Harsh's primary coding competencies include:", "ansi-cyan");
        printLine(`  * Languages: ${PortfolioData.skills.languages.join(', ')}`, "ansi-white");
        printLine(`  * Backend Stacks: ${PortfolioData.skills.backend.join(', ')}`, "ansi-white");
        printLine(`  * Mobile: ${PortfolioData.skills.frontendMobile.join(', ')}`, "ansi-white");
        printLine(`  * Databases: ${PortfolioData.skills.databases.join(', ')}`, "ansi-white");
    } 
    else if (cleanQuery.includes("study") || cleanQuery.includes("education") || cleanQuery.includes("cgpa") || cleanQuery.includes("college")) {
        printLine("Chatbot: Harsh Tiwari's academic credentials:", "ansi-cyan");
        PortfolioData.education.forEach(e => {
            printLine(`  * ${e.level} from ${e.institute} (${e.grade})`, "ansi-white");
        });
    } 
    else if (cleanQuery.includes("contact") || cleanQuery.includes("email") || cleanQuery.includes("phone") || cleanQuery.includes("linkedin") || cleanQuery.includes("github")) {
        printLine("Chatbot: Get in touch with Harsh:", "ansi-cyan");
        printLine("  * Email: harshtiwari493@gmail.com", "ansi-white");
        printLine("  * Phone: +91-7805841898", "ansi-white");
        printLine("  * LinkedIn: linkedin.com/in/harshtiwari29", "ansi-white");
        printLine("  * GitHub: github.com/harshtiwari29", "ansi-white");
    }
    else if (cleanQuery.includes("who") || cleanQuery.includes("about") || cleanQuery.includes("summary") || cleanQuery.includes("harsh")) {
        printLine(`Chatbot: ${PortfolioData.summary}`, "ansi-white");
    }
    else {
        // Fallback prompt replies
        const fallbacks = [
            "Chatbot: I'm not sure about that. I can provide details on Harsh's projects, experience, technical skills, contacts, or education. Try asking 'Tell me about projects' or 'What is his experience?'.",
            "Chatbot: Interesting question! Harsh is currently working as a Software Engineer at TCS with strong Spring Boot backend skills. Ask me about his 'skills' or 'TCS role'!",
            "Chatbot: If you want to check details, try query keywords like 'projects', 'contacts', 'experience', or 'skills'."
        ];
        printLine(fallbacks[Math.floor(Math.random() * fallbacks.length)], "ansi-white");
    }
}

// CLI Command Implementations
function cmdHelp() {
    printLine("-------------------------------------------------------------------------", "ansi-green");
    printLine("HARSH-CLI Shell Command Reference Guide", "ansi-white");
    printLine("-------------------------------------------------------------------------", "ansi-green");
    
    const cmds = [
        { c: 'about / skills', d: 'View profile summaries & technical stacks' },
        { c: 'experience / projects', d: 'Check portfolio history & engineered systems' },
        { c: 'ls / cd / pwd', d: 'Traverse and list virtual directories' },
        { c: 'cat <filename>', d: 'View file content (e.g., cat about/summary.txt)' },
        { c: 'touch / rm / nano', d: 'Manage and edit virtual filesystem files' },
        { c: 'grep <word> <file>', d: 'Search for text matches inside files' },
        { c: 'chat', d: 'Open interactive AI chatbot chat session mode' },
        { c: 'history', d: 'Print historical command entries log' },
        { c: 'snake / synth', d: 'Launch Snake game or synthesizer piano' },
        { c: 'bgm <track>', d: 'Select background track: classic | synthwave | ambient | off' },
        { c: 'neofetch / theme', d: 'View system card or change terminal layout skins' },
        { c: 'gui / clear', d: 'Toggle glass HUD dashboard or wipe logs' }
    ];
    
    cmds.forEach(item => {
        printLine(`  <span class="ansi-green">${item.c.padEnd(20)}</span> - ${item.d}`, "ansi-white");
    });
    printLine("-------------------------------------------------------------------------", "ansi-green");
}

function cmdAbout() {
    printLine("ABOUT ME", "ansi-green");
    printLine(PortfolioData.summary, "ansi-white");
    printLine("");
    printLine("<span class=\"ansi-green\">Core CS Strengths:</span> DSA, OOPs, DBMS, Operating Systems, Computer Networks.", "ansi-white");
}

function cmdSkills() {
    printLine("TECHNICAL SKILLS DIRECTORY", "ansi-green");
    printLine("---------------------------------------", "ansi-green");
    
    const categories = [
        { name: "Languages", data: PortfolioData.skills.languages },
        { name: "Backend Systems", data: PortfolioData.skills.backend },
        { name: "Mobile & Frontend", data: PortfolioData.skills.frontendMobile },
        { name: "Databases", data: PortfolioData.skills.databases },
        { name: "Tools", data: PortfolioData.skills.tools },
        { name: "Core Concepts", data: PortfolioData.skills.concepts }
    ];
    
    categories.forEach(cat => {
        printLine(`[+] ${cat.name}:`, "ansi-cyan");
        printLine(`    ${cat.data.join(', ')}`, "ansi-white");
    });
}

function cmdExperience() {
    printLine("WORK EXPERIENCE HISTORY", "ansi-green");
    let html = `<div class="cli-timeline">`;
    PortfolioData.experience.forEach(job => {
        html += `
            <div class="cli-timeline-item">
                <div class="cli-timeline-title">${job.role}</div>
                <div class="cli-timeline-company">${job.company} (${job.duration})</div>
                <div class="ansi-cyan" style="font-size:12px; margin-bottom:5px;"><i class="fas fa-tags"></i> Stack: ${job.tech}</div>
                <ul style="list-style-type:circle; padding-left:20px; font-size:13px; line-height:1.5;">
                    ${job.details.map(det => `<li>${det}</li>`).join('')}
                </ul>
            </div>
        `;
    });
    html += `</div>`;
    printLine(html);
}

function cmdProjects() {
    printLine("KEY SOFTWARE PROJECTS", "ansi-green");
    PortfolioData.projects.forEach((proj, idx) => {
        let detailsHtml = proj.details.map(det => `  * ${det}`).join('\n');
        let card = `
<div class="cli-project-card">
  <div class="cli-project-title">${idx + 1}. ${proj.name}</div>
  <div class="ansi-cyan">Stack: ${proj.tech}</div>
  <div style="margin: 5px 0; font-style:italic;">${proj.overview}</div>
  <pre style="font-family: inherit; font-size: 13px; line-height:1.4; color: var(--text-color); opacity: 0.9;">${detailsHtml}</pre>
</div>
        `;
        printLine(card);
    });
}

function cmdEducation() {
    printLine("ACADEMIC RECORDS", "ansi-green");
    printLine("-------------------------------------------------------", "ansi-green");
    PortfolioData.education.forEach(edu => {
        printLine(`[+] ${edu.level}`, "ansi-cyan");
        printLine(`    Institution: ${edu.institute}`, "ansi-white");
        printLine(`    Grade/Result: ${edu.grade}`, "ansi-white");
        printLine("");
    });
}

function cmdContact() {
    printLine("CONNECT WITH ME", "ansi-green");
    printLine("-------------------------------------------------------", "ansi-green");
    printLine(`Email:    <a class="terminal-link" href="mailto:harshtiwari493@gmail.com" target="_blank">harshtiwari493@gmail.com</a>`, "ansi-white");
    printLine(`Phone:    <a class="terminal-link" href="tel:+917805841898">+91-7805841898</a>`, "ansi-white");
    printLine(`LinkedIn: <a class="terminal-link" href="https://www.linkedin.com/in/harshtiwari29/" target="_blank">linkedin.com/in/harshtiwari29</a>`, "ansi-white");
    printLine(`GitHub:   <a class="terminal-link" href="https://github.com/harshtiwari29" target="_blank">github.com/harshtiwari29</a>`, "ansi-white");
}

function cmdNeofetch() {
    const lines = [
        "harsh@tiwari-portfolio",
        "---------------------",
        "OS: DevOS v2.5 (VFS-x86)",
        "Kernel: Browser-Engine-JS",
        "Uptime: 2h 45m",
        "Shell: harsh-sh v2.5",
        "Status: Software Engineer @ TCS",
        "Location: Indore, India",
        "Education: B.Tech (IT) @ SVVV",
        "CGPA: 8.33 / 10",
        "Main stack: Java / Spring / Kotlin",
        "Virtual FS: Mounted at / (RAM)",
        "Rendering: requestAnimationFrame (60Hz)"
    ];
    
    let asciiArt = `
  /\\_/\\  
 ( o.o ) 
  > ^ <  
 /     \\ 
(_/_/\\_) 
    `;
    
    let container = `
<div class="neofetch-container">
  <pre class="neofetch-ascii">${asciiArt}</pre>
  <div class="neofetch-info">
    <div class="neofetch-header">${lines[0]}</div>
    <div style="color:var(--text-muted); margin-bottom:5px;">${lines[1]}</div>
    ${lines.slice(2).map(l => {
        const parts = l.split(':');
        return `<div class="neofetch-row"><span class="neofetch-key">${parts[0]}:</span><span class="neofetch-val">${parts[1]}</span></div>`;
    }).join('')}
  </div>
</div>
    `;
    printLine(container);
}

// CLI Theme selection
function cmdTheme(themeName) {
    if (!themeName) {
        const overlay = document.getElementById('theme-overlay');
        overlay.classList.toggle('active');
        printLine("Opening Theme Selection Menu overlay on top right. Select theme directly or type 'theme <name>'", "ansi-white");
        return;
    }
    
    const sanitizedTheme = themeName.toLowerCase().trim();
    const validThemes = ['matrix', 'cyberpunk', 'dracula', 'nord', 'retro-light'];
    if (validThemes.includes(sanitizedTheme)) {
        selectTheme(sanitizedTheme);
    } else {
        printLine(`Unknown theme '${themeName}'. Valid themes are: ${validThemes.join(', ')}`, "ansi-magenta");
    }
}

function selectTheme(themeName) {
    document.body.className = `theme-${themeName}`;
    currentTheme = themeName;
    
    // Save to local storage
    safeStorage.setItem('harsh_portfolio_theme', currentTheme);
    
    document.getElementById('terminal-status-theme').textContent = `Theme: ${capitalize(themeName)}`;
    document.getElementById('dashboard-status-theme').textContent = `Theme: ${capitalize(themeName)}`;
    document.getElementById('theme-overlay').classList.remove('active');
    
    // Sync header dropdowns
    document.querySelectorAll('.theme-select-dropdown').forEach(dropdown => {
        dropdown.value = themeName;
    });
    
    printLine(`Theme updated to: ${themeName}`, "ansi-green");
    playChimeSFX();
    logSystemEvent(`Visual theme changed to: ${capitalize(themeName)}`, "SYS");
}

function getThemeColor() {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
        return '#3bf13b';
    }
    try {
        const color = getComputedStyle(document.body).getPropertyValue('--accent-color').trim();
        return color || '#3bf13b';
    } catch(e) {
        switch (currentTheme) {
            case 'matrix': return '#3bf13b';
            case 'cyberpunk': return '#ff0055';
            case 'dracula': return '#bd93f9';
            case 'nord': return '#88c0d0';
            case 'retro-light': return '#cb4b16';
            default: return '#3bf13b';
        }
    }
}

function getThemeRgb() {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
        return '92, 247, 92';
    }
    try {
        const rgb = getComputedStyle(document.body).getPropertyValue('--accent-rgb').trim();
        return rgb || '92, 247, 92';
    } catch(e) {
        switch (currentTheme) {
            case 'matrix': return '92, 247, 92';
            case 'cyberpunk': return '255, 0, 85';
            case 'dracula': return '255, 121, 198';
            case 'nord': return '136, 192, 208';
            case 'retro-light': return '203, 75, 22';
            default: return '92, 247, 92';
        }
    }
}

function cmdMatrix() {
    isMatrixScreensaver = true;
    printLine("Activating fullscreen Matrix digital rain. Press any key to exit.", "ansi-green");
    logSystemEvent("Fullscreen Matrix screensaver active.", "SYS");
    setTimeout(() => {
        if (!isMatrixScreensaver) return;
        matrixCanvas.style.opacity = '0.9';
        matrixCanvas.style.zIndex = '9998';
        document.querySelector('.app-container').style.opacity = '0';
        document.querySelector('.audio-controls').style.opacity = '0';
    }, 500);
}

function exitMatrixScreensaver() {
    isMatrixScreensaver = false;
    matrixCanvas.style.opacity = '0.15';
    matrixCanvas.style.zIndex = '-1';
    document.querySelector('.app-container').style.opacity = '1';
    document.querySelector('.audio-controls').style.opacity = '1';
    printLine("Returned from Matrix Digital Rain.", "ansi-green");
    playChimeSFX();
    logSystemEvent("Screensaver terminated.", "SYS");
}

function isPathProtected(pathParts) {
    if (iotDevices.security.status && pathParts && pathParts.length > 0 && pathParts[0] === 'secrets') {
        return true;
    }
    return false;
}

// VFS Commands Implementation
function cmdLs(pathStr) {
    let { node, path } = resolvePath(pathStr);
    if (isPathProtected(path)) {
        printLine("Permission Denied: Directory /secrets is locked by IoT security protocol.", "ansi-magenta");
        playErrorSFX();
        return;
    }
    if (!node) {
        printLine("ls: Directory not found.", "ansi-magenta");
        return;
    }
    if (node.type !== 'dir') {
        printLine("ls: Path is not a directory.", "ansi-magenta");
        return;
    }
    
    let entries = Object.keys(node.children);
    if (entries.length === 0) {
        printLine("(directory is empty)", "ansi-white");
        return;
    }
    
    let outputLines = [];
    entries.forEach(name => {
        let child = node.children[name];
        if (child.type === 'dir') {
            outputLines.push(`<span class="ansi-green"><i class="fas fa-folder"></i> ${name}/</span>`);
        } else {
            outputLines.push(`<span><i class="far fa-file-alt"></i> ${name}</span>`);
        }
    });
    
    printLine(outputLines.join('    '));
}

function cmdCd(pathStr) {
    if (!pathStr || pathStr === '~') {
        currentPath = [];
        updatePromptPrefix();
        return;
    }
    
    let { node, path } = resolvePath(pathStr);
    if (isPathProtected(path)) {
        printLine("Permission Denied: Directory /secrets is locked by IoT security protocol.", "ansi-magenta");
        playErrorSFX();
        return;
    }
    if (!node) {
        printLine(`cd: No such directory: ${pathStr}`, "ansi-magenta");
        return;
    }
    if (node.type !== 'dir') {
        printLine(`cd: Not a directory: ${pathStr}`, "ansi-magenta");
        return;
    }
    
    currentPath = path;
    updatePromptPrefix();
}

function cmdCat(pathStr) {
    if (!pathStr) {
        printLine("cat: Missing filename. Usage: cat <file>", "ansi-magenta");
        return;
    }
    
    let { node, path } = resolveFilePath(pathStr);
    if (isPathProtected(path)) {
        printLine("Permission Denied: File inside /secrets is locked by IoT security protocol.", "ansi-magenta");
        playErrorSFX();
        return;
    }
    if (!node) {
        printLine(`cat: File not found: ${pathStr}`, "ansi-magenta");
        return;
    }
    if (node.type === 'dir') {
        printLine(`cat: ${pathStr} is a directory. Use 'cd' to open directory, or 'ls' to view directory contents.`, "ansi-magenta");
        return;
    }
    
    printLine(node.content, "ansi-white");
    logSystemEvent(`Read VFS file content: ${pathStr}`, "INFO");
}

function cmdPwd() {
    if (currentPath.length === 0) {
        printLine("/", "ansi-white");
    } else {
        printLine("/" + currentPath.join("/"), "ansi-white");
    }
}

// touch path resolution bugfix
function cmdTouch(pathStr) {
    if (!pathStr) {
        printLine("touch: Missing filename. Usage: touch <filename>", "ansi-magenta");
        return;
    }
    
    let { parentNode, targetName, node, path } = resolveFilePath(pathStr);
    if (isPathProtected(path)) {
        printLine("Permission Denied: Cannot create files inside /secrets folder while locked.", "ansi-magenta");
        playErrorSFX();
        return;
    }
    if (!parentNode || parentNode.type !== 'dir') {
        printLine(`touch: Cannot create file. Directory path does not exist.`, "ansi-magenta");
        return;
    }
    
    if (node) {
        printLine(`touch: File already exists: ${pathStr}`, "ansi-white");
        return;
    }
    
    parentNode.children[targetName] = {
        type: 'file',
        content: ''
    };
    printLine(`Created virtual empty file: ${pathStr}`, "ansi-green");
    playChimeSFX();
    logSystemEvent(`Created VFS file node: ${pathStr}`, "INFO");
    saveVfsToLocalStorage();
}

// rm path resolution bugfix
function cmdRm(pathStr) {
    if (!pathStr) {
        printLine("rm: Missing filename. Usage: rm <filename>", "ansi-magenta");
        return;
    }
    
    let { parentNode, targetName, node, path } = resolveFilePath(pathStr);
    if (isPathProtected(path)) {
        printLine("Permission Denied: Cannot remove files inside /secrets folder while locked.", "ansi-magenta");
        playErrorSFX();
        return;
    }
    if (!node) {
        printLine(`rm: File not found: ${pathStr}`, "ansi-magenta");
        return;
    }
    
    if (node.type === 'dir') {
        printLine("rm: Cannot delete folders/directories. Filesystem node protection active.", "ansi-magenta");
        return;
    }
    
    delete parentNode.children[targetName];
    printLine(`Deleted file: ${pathStr}`, "ansi-white");
    playAudioTone(200, 'sawtooth', 0.08);
    logSystemEvent(`Removed VFS file node: ${pathStr}`, "INFO");
    saveVfsToLocalStorage();
}

// nano path resolution bugfix
function cmdNano(pathStr) {
    if (!pathStr) {
        printLine("nano: Missing filename. Usage: nano <filename>", "ansi-magenta");
        return;
    }
    
    let { parentNode, targetName, node, path } = resolveFilePath(pathStr);
    if (isPathProtected(path)) {
        printLine("Permission Denied: Cannot edit or create files inside /secrets folder while locked.", "ansi-magenta");
        playErrorSFX();
        return;
    }
    if (!parentNode || parentNode.type !== 'dir') {
        printLine(`nano: Directory path does not exist.`, "ansi-magenta");
        return;
    }
    
    if (node && node.type === 'dir') {
        printLine(`nano: ${pathStr} is a directory. Cannot edit folders.`, "ansi-magenta");
        return;
    }
    
    // Create new file if it doesn't exist
    if (!node) {
        parentNode.children[targetName] = {
            type: 'file',
            content: ''
        };
        node = parentNode.children[targetName];
        saveVfsToLocalStorage();
    }
    
    // Switch to Nano mode
    activeEditingFile = node;
    nanoFilenameLabel.textContent = targetName;
    nanoTextarea.value = node.content;
    
    terminalOutputContainer.style.display = 'none';
    nanoEditor.style.display = 'flex';
    nanoTextarea.focus();
    
    // Set status bar header title
    document.getElementById('terminal-window-title').innerHTML = `<i class="fas fa-edit"></i> harsh@tiwari-dev: nano - ${targetName}`;
    playChimeSFX();
    logSystemEvent(`Opened file in text editor nano: ${pathStr}`, "INFO");
}

function handleNanoKeydown(e) {
    // satisfying key clicks
    if (e.key !== 'Enter' && e.key !== 'Shift' && e.key !== 'Control' && e.key !== 'Alt') {
        playKeypressSound();
    }
    
    // Ctrl + S (Save)
    if (e.ctrlKey && e.key.toLowerCase() === 's') {
        e.preventDefault();
        if (activeEditingFile) {
            activeEditingFile.content = nanoTextarea.value;
            saveVfsToLocalStorage();
            nanoSaveStatus.textContent = "Saved";
            nanoSaveStatus.style.color = "var(--accent-color)";
            playChimeSFX();
            logSystemEvent(`Saved modifications to editing node.`, "INFO");
            
            setTimeout(() => {
                nanoSaveStatus.textContent = "Modified";
                nanoSaveStatus.style.color = "var(--text-muted)";
            }, 1500);
        }
    }
    
    // Ctrl + X (Exit)
    if (e.ctrlKey && e.key.toLowerCase() === 'x') {
        e.preventDefault();
        exitNanoEditor();
    }
}

function exitNanoEditor() {
    activeEditingFile = null;
    nanoEditor.style.display = 'none';
    terminalOutputContainer.style.display = 'block';
    
    const currentPathStr = currentPath.length === 0 ? '/' : '/' + currentPath.join('/');
    document.getElementById('terminal-window-title').innerHTML = `<i class="fas fa-terminal"></i> harsh@tiwari-dev: ~${currentPathStr}`;
    
    terminalInput.focus();
    printLine("Exited text editor nano. Changes compiled to virtual VFS.", "ansi-green");
    playChimeSFX();
    logSystemEvent(`Closed nano editor session.`, "INFO");
}

function updatePromptPrefix() {
    const currentPathStr = currentPath.length === 0 ? '/' : '/' + currentPath.join('/');
    promptDirPrefix.textContent = `guest@harsh-dev:${currentPathStr}$`;
    document.getElementById('terminal-window-title').innerHTML = `<i class="fas fa-terminal"></i> harsh@tiwari-dev: ~${currentPathStr}`;
}

// Synth Board Functions
function cmdSynth() {
    isSynthActive = true;
    terminalOutputContainer.style.display = 'none';
    synthContainer.style.display = 'flex';
    initAudio();
    playChimeSFX();
    logSystemEvent(`Synthesizer keys board launched.`, "SYS");
}

function playSynthKey(frequency, keyChar) {
    playAudioTone(frequency, 'sawtooth', 0.25, 0.08);
    
    const keys = document.querySelectorAll('.synth-key');
    keys.forEach(k => {
        const kbd = k.querySelector('kbd');
        if (kbd && kbd.textContent === keyChar) {
            k.classList.add('active');
            setTimeout(() => k.classList.remove('active'), 100);
        }
    });
}

function exitSynthMode() {
    isSynthActive = false;
    synthContainer.style.display = 'none';
    terminalOutputContainer.style.display = 'block';
    terminalInput.focus();
    printLine("Synthesizer board closed.", "ansi-white");
    playChimeSFX();
    logSystemEvent(`Synthesizer board closed.`, "SYS");
}

// Retro Canvas-based Snake Game Implementation
function cmdSnake() {
    initAudio();
    snakeContainer.style.display = 'flex';
    terminalOutputContainer.style.display = 'none';
    snakeGameActive = true;
    logSystemEvent(`Interactive Neon Canvas Snake Game launched.`, "SYS");
    
    // Set Canvas rendering dimensions
    snakeCanvas.width = snakeGridCols * snakeCellSize;
    snakeCanvas.height = snakeGridRows * snakeCellSize;
    
    startSnakeGame();
}

function startSnakeGame() {
    snake = [
        { x: 10, y: 8 },
        { x: 9, y: 8 },
        { x: 8, y: 8 }
    ];
    snakeDirection = { x: 1, y: 0 };
    snakeScore = 0;
    snakeScoreEl.textContent = snakeScore;
    snakeGameOverOverlay.style.display = 'none';
    snakeParticles = [];
    snakeShakeIntensity = 0;
    
    spawnSnakeFood();
    
    if (snakeGameInterval) clearInterval(snakeGameInterval);
    snakeGameInterval = setInterval(gameStep, 100);
    
    if (snakeAnimFrameId) cancelAnimationFrame(snakeAnimFrameId);
    snakeAnimFrameId = requestAnimationFrame(updateAndDrawSnakeGame);
    
    playAudioTone(500, 'square', 0.1);
}

function spawnSnakeFood() {
    let onSnake = true;
    while (onSnake) {
        snakeFood.x = Math.floor(Math.random() * (snakeGridCols - 2)) + 1;
        snakeFood.y = Math.floor(Math.random() * (snakeGridRows - 2)) + 1;
        onSnake = snake.some(segment => segment.x === snakeFood.x && segment.y === snakeFood.y);
    }
}

function spawnParticles(x, y) {
    const activeColor = getThemeColor();
    for (let i = 0; i < 12; i++) {
        snakeParticles.push({
            x: x * snakeCellSize + snakeCellSize / 2,
            y: y * snakeCellSize + snakeCellSize / 2,
            vx: (Math.random() - 0.5) * 6,
            vy: (Math.random() - 0.5) * 6,
            life: 1.0,
            decay: Math.random() * 0.05 + 0.03,
            color: activeColor
        });
    }
}

function triggerScreenShake(intensity) {
    snakeShakeIntensity = intensity;
}

function gameStep() {
    if (!snakeGameActive) return;
    
    const head = { 
        x: snake[0].x + snakeDirection.x, 
        y: snake[0].y + snakeDirection.y 
    };
    
    // Check bounds
    if (head.x < 0 || head.x >= snakeGridCols || head.y < 0 || head.y >= snakeGridRows) {
        gameOver();
        return;
    }
    
    // Check self-collision
    for (let body of snake) {
        if (body.x === head.x && body.y === head.y) {
            gameOver();
            return;
        }
    }
    
    snake.unshift(head);
    
    // Check eating food
    if (head.x === snakeFood.x && head.y === snakeFood.y) {
        snakeScore += 10;
        snakeScoreEl.textContent = snakeScore;
        
        // Satisfying chime
        playAudioTone(700, 'triangle', 0.08, 0.15); 
        
        // Spawn sparks
        spawnParticles(snakeFood.x, snakeFood.y);
        
        // Trigger small shake
        triggerScreenShake(4);
        
        spawnSnakeFood();
    } else {
        snake.pop();
    }
}

function updateAndDrawSnakeGame() {
    if (!snakeGameActive) return;
    
    const ctx = snakeCanvas.getContext('2d');
    const w = snakeCanvas.width;
    const h = snakeCanvas.height;
    
    // Apply camera shake if active
    ctx.save();
    if (snakeShakeIntensity > 0.1) {
        const dx = (Math.random() - 0.5) * snakeShakeIntensity;
        const dy = (Math.random() - 0.5) * snakeShakeIntensity;
        ctx.translate(dx, dy);
        snakeShakeIntensity *= 0.85; // Decay
    }
    
    ctx.clearRect(0, 0, w, h);
    
    // Draw neon grid background
    ctx.strokeStyle = `rgba(${getThemeRgb()}, 0.03)`;
    ctx.lineWidth = 1;
    for (let c = 0; c <= snakeGridCols; c++) {
        ctx.beginPath();
        ctx.moveTo(c * snakeCellSize, 0);
        ctx.lineTo(c * snakeCellSize, h);
        ctx.stroke();
    }
    for (let r = 0; r <= snakeGridRows; r++) {
        ctx.beginPath();
        ctx.moveTo(0, r * snakeCellSize);
        ctx.lineTo(w, r * snakeCellSize);
        ctx.stroke();
    }
    
    const activeColor = getThemeColor();
    
    // Draw Snake with neon shadows
    ctx.shadowBlur = 10;
    ctx.shadowColor = activeColor;
    
    snake.forEach((segment, idx) => {
        if (idx === 0) {
            ctx.fillStyle = '#ffffff'; // White head
        } else {
            // Fade body colors
            const opacity = 1.0 - (idx / snake.length) * 0.5;
            ctx.fillStyle = `rgba(${getThemeRgb()}, ${opacity})`;
        }
        
        ctx.beginPath();
        ctx.arc(
            segment.x * snakeCellSize + snakeCellSize / 2,
            segment.y * snakeCellSize + snakeCellSize / 2,
            snakeCellSize / 2 - 1,
            0,
            Math.PI * 2
        );
        ctx.fill();
    });
    
    // Draw pulsing Cherry Food
    const pulse = 1.0 + Math.sin(Date.now() * 0.01) * 0.15;
    ctx.fillStyle = '#ff5f56'; // Cherry Red
    ctx.shadowColor = '#ff5f56';
    ctx.beginPath();
    ctx.arc(
        snakeFood.x * snakeCellSize + snakeCellSize / 2,
        snakeFood.y * snakeCellSize + snakeCellSize / 2,
        (snakeCellSize / 2.5) * pulse,
        0,
        Math.PI * 2
    );
    ctx.fill();
    
    // Draw leaf stem
    ctx.strokeStyle = '#3bf13b';
    ctx.lineWidth = 1.5;
    ctx.shadowBlur = 0;
    ctx.beginPath();
    ctx.moveTo(snakeFood.x * snakeCellSize + snakeCellSize / 2, snakeFood.y * snakeCellSize + 3);
    ctx.quadraticCurveTo(
        snakeFood.x * snakeCellSize + snakeCellSize / 2 + 4,
        snakeFood.y * snakeCellSize + 1,
        snakeFood.x * snakeCellSize + snakeCellSize / 2 + 6,
        snakeFood.y * snakeCellSize - 2
    );
    ctx.stroke();
    
    // Update and draw eating particles
    snakeParticles = snakeParticles.filter(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= p.decay;
        
        if (p.life > 0) {
            ctx.shadowBlur = 6;
            ctx.shadowColor = p.color;
            ctx.fillStyle = `rgba(${getThemeRgb()}, ${p.life})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
            ctx.fill();
            return true;
        }
        return false;
    });
    
    ctx.restore();
    
    // Next draw cycle
    snakeAnimFrameId = requestAnimationFrame(updateAndDrawSnakeGame);
}

function gameOver() {
    clearInterval(snakeGameInterval);
    triggerScreenShake(10);
    playErrorSFX();
    logSystemEvent(`Snake game ended. Score: ${snakeScore}`, "SYS");
    
    if (snakeScore > snakeHighScore) {
        snakeHighScore = snakeScore;
        snakeHighScoreEl.textContent = snakeHighScore;
    }
    snakeGameOverOverlay.style.display = 'flex';
}

function exitSnakeGame() {
    snakeGameActive = false;
    clearInterval(snakeGameInterval);
    if (snakeAnimFrameId) cancelAnimationFrame(snakeAnimFrameId);
    
    snakeContainer.style.display = 'none';
    terminalOutputContainer.style.display = 'block';
    terminalInput.focus();
    printLine(`Snake game exited. Final score: ${snakeScore}`, "ansi-white");
    playChimeSFX();
}

// Flip Transition CLI <--> GUI
function toggleView(view) {
    if (isBooting) {
        skipBootSequence();
    }
    if (view === currentView) return;
    
    initAudio(); 
    currentView = view;
    
    logSystemEvent(`Flipping view to: ${view.toUpperCase()}`, "SYS");
    
    // play sweep flip SFX
    playFlipSFX(view === 'gui');
    
    if (view === 'gui') {
        flipper.classList.add('flipped');
        document.getElementById('dashboard-status-mode').textContent = "GUI Dashboard Mode";
        
        setTimeout(() => {
            const activeTab = document.querySelector('.tab-btn.active').getAttribute('data-tab');
            if (activeTab === 'skills-tab') {
                animateSkills();
            }
            if (activeTab === 'sysmon-tab') {
                startSystemMonitorCharts();
            }
        }, 300);
    } else {
        flipper.classList.remove('flipped');
        document.getElementById('terminal-status-mode').textContent = "CLI Terminal Mode";
        
        stopSystemMonitorCharts();
        
        setTimeout(() => {
            terminalInput.focus();
        }, 400);
    }
}

// Animate Skill progress bars in GUI
function animateSkills() {
    const bars = document.querySelectorAll('.skill-progress');
    bars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0%';
        void bar.offsetWidth; // Reflow
        bar.style.width = width;
    });
}

// Real-Time System Monitors Canvas lines updated to support requestAnimationFrame glow and throttle
let sysmonFrameId = null;
function startSystemMonitorCharts() {
    const cpuCanvas = document.getElementById('cpu-chart');
    const ramCanvas = document.getElementById('ram-chart');
    if (!cpuCanvas || !ramCanvas) return;
    
    const cpuCtx = cpuCanvas.getContext('2d');
    const ramCtx = ramCanvas.getContext('2d');
    
    let cpuHistory = Array(20).fill(10);
    let ramHistory = Array(20).fill(1.5);
    
    let lastTime = 0;
    
    function drawChart(ctx, historyArr, textEl, maxVal, unit, fillStyleColor, strokeStyleColor) {
        let width = ctx.canvas.width = ctx.canvas.parentElement.clientWidth;
        let height = ctx.canvas.height = 90;
        
        ctx.clearRect(0, 0, width, height);
        
        // Grid lines
        ctx.strokeStyle = 'rgba(59, 241, 59, 0.04)';
        ctx.lineWidth = 1;
        for (let i = 0; i < height; i += 20) {
            ctx.beginPath();
            ctx.moveTo(0, i);
            ctx.lineTo(width, i);
            ctx.stroke();
        }
        
        // Oscilloscope Glowing Shadow
        ctx.shadowBlur = 8;
        ctx.shadowColor = strokeStyleColor;
        
        ctx.strokeStyle = strokeStyleColor;
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        
        const step = width / (historyArr.length - 1);
        for (let i = 0; i < historyArr.length; i++) {
            const x = i * step;
            const y = height - (historyArr[i] / maxVal) * (height - 10);
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.stroke();
        
        // Fill area
        ctx.shadowBlur = 0; 
        ctx.fillStyle = fillStyleColor;
        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();
        ctx.fill();
        
        let curVal = historyArr[historyArr.length - 1].toFixed(1);
        textEl.textContent = `${curVal}${unit}`;
    }
    
    function renderCharts(timestamp) {
        sysmonFrameId = requestAnimationFrame(renderCharts);
        
        const elapsed = timestamp - lastTime;
        if (elapsed < 50) return;
        lastTime = timestamp;
        
        let lastCpu = cpuHistory[cpuHistory.length - 1];
        let nextCpu = lastCpu + (Math.random() - 0.5) * 16;
        nextCpu = Math.max(2, Math.min(98, nextCpu));
        cpuHistory.shift();
        cpuHistory.push(nextCpu);
        
        let lastRam = ramHistory[ramHistory.length - 1];
        let nextRam = lastRam + (Math.random() - 0.5) * 0.25;
        nextRam = Math.max(1.8, Math.min(6.2, nextRam));
        ramHistory.shift();
        ramHistory.push(nextRam);
        
        let activeThemeColor = getThemeColor();
        
        drawChart(
            cpuCtx, 
            cpuHistory, 
            document.getElementById('cpu-load-text'), 
            100, 
            '%', 
            `rgba(${getThemeRgb()}, 0.04)`, 
            activeThemeColor
        );
        
        drawChart(
            ramCtx, 
            ramHistory, 
            document.getElementById('ram-load-text'), 
            16, 
            ' / 16 GB', 
            `rgba(${getThemeRgb()}, 0.04)`, 
            activeThemeColor
        );
    }
    
    sysmonFrameId = requestAnimationFrame(renderCharts);

    // Start simulated system operations logs interval inside System Monitor
    const simulatedLogOperations = [
        "Sweeping VFS mounted pages... OK",
        "GC garbage collection sweep: freed 4.2KB heap memory",
        "Checking database interface packets... 0% loss",
        "Syncing monitor canvas charts arpeggiator frequencies",
        "TCP handshake resolved with eth0 gateways: 12ms",
        "System diagnostics validation: CPU thermal 42°C",
        "Active sandbox tokens verify: PASS",
        "Garbage collection thread run complete",
        "VFS memory block synchronization verified"
    ];

    if (simulatedLogInterval) clearInterval(simulatedLogInterval);
    simulatedLogInterval = setInterval(() => {
        if (currentView === 'gui') {
            const randMsg = simulatedLogOperations[Math.floor(Math.random() * simulatedLogOperations.length)];
            logSystemEvent(randMsg, "PROCESS");
        }
    }, 3200);
}

function stopSystemMonitorCharts() {
    if (sysmonFrameId) {
        cancelAnimationFrame(sysmonFrameId);
        sysmonFrameId = null;
    }
    if (simulatedLogInterval) {
        clearInterval(simulatedLogInterval);
        simulatedLogInterval = null;
    }
}

// Sidebar VFS Explorer click hook - Upgraded to Custom glassmorphism modal
function exploreVfsFile(pathStr) {
    let { node, path } = resolvePath(pathStr);
    if (isPathProtected(path)) {
        playErrorSFX();
        modalTitle.innerHTML = `<i class="fas fa-shield-alt"></i> Permission Denied`;
        modalFileContent.innerHTML = `<span class="ansi-magenta" style="font-weight:bold;">Security Warning: Directory /secrets is locked by IoT security protocol.</span>\n\nTo access this file, unlock the system via the <span class="ansi-green">IoT Hub</span> dashboard tab or run <code class="ansi-cyan">iot toggle security</code> in CLI mode.`;
        fileViewerModal.style.display = 'flex';
        logSystemEvent(`VFS explorer blocked: ${pathStr} (Security Lock Active)`, "INFO");
        return;
    }
    if (node && node.type === 'file') {
        playChimeSFX();
        
        modalTitle.innerHTML = `<i class="far fa-file-alt"></i> File Viewer: ${pathStr}`;
        modalFileContent.textContent = node.content;
        
        fileViewerModal.style.display = 'flex';
        logSystemEvent(`VFS explorer clicked: ${pathStr}`, "INFO");
    } else {
        console.error(`VFS File not resolved correctly: ${pathStr}`);
    }
}

function closeFileViewer() {
    fileViewerModal.style.display = 'none';
    playChimeSFX();
}

// Close modal clicking on overlay background
function handleModalOverlayClick(e) {
    if (e.target === fileViewerModal) {
        closeFileViewer();
    }
}

// TODO List widget board logic
function renderTodoList() {
    const container = document.getElementById('todo-list-container');
    if (!container) return;
    container.innerHTML = '';
    
    todoTasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = `todo-item ${task.completed ? 'completed' : ''}`;
        li.innerHTML = `
            <div class="todo-text-wrap">
                <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTodo(${index})">
                <span>${task.text}</span>
            </div>
            <button class="delete-todo-btn" onclick="deleteTodo(${index})"><i class="fas fa-trash"></i></button>
        `;
        container.appendChild(li);
    });
}

function addTodo() {
    const input = document.getElementById('todo-input');
    const text = input.value.trim();
    if (!text) return;
    
    todoTasks.push({ text: text, completed: false });
    input.value = '';
    renderTodoList();
    playChimeSFX();
    logSystemEvent(`Task added: "${text}"`, "INFO");
}

function toggleTodo(index) {
    todoTasks[index].completed = !todoTasks[index].completed;
    renderTodoList();
    playChimeSFX();
    logSystemEvent(`Task state toggled: "${todoTasks[index].text}"`, "INFO");
}

function deleteTodo(index) {
    const text = todoTasks[index].text;
    todoTasks.splice(index, 1);
    renderTodoList();
    playChimeSFX();
    logSystemEvent(`Task deleted: "${text}"`, "INFO");
}

// Helpers
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).replace('-', ' ');
}

// ==========================================================================
// SIMULATED IoT HUB CLI & GUI CONTROLLER
// ==========================================================================
function cmdIot(args) {
    if (args.length === 0) {
        printLine("-------------------------------------------------------------------------", "ansi-green");
        printLine("Simulated IoT Hub CLI Controls", "ansi-white");
        printLine("-------------------------------------------------------------------------", "ansi-green");
        printLine("Usage: iot &lt;subcommand&gt; [args]", "ansi-white");
        printLine("  <span class=\"ansi-green\">iot list</span>                   - Lists all connected devices and statuses", "ansi-white");
        printLine("  <span class=\"ansi-green\">iot toggle &lt;device&gt;</span>         - Toggles device status (thermostat | lighting | security | cooling)", "ansi-white");
        printLine("  <span class=\"ansi-green\">iot set &lt;device&gt; &lt;prop&gt; &lt;val&gt;</span> - Sets device property values", "ansi-white");
        printLine("Examples:", "ansi-white");
        printLine("  iot set thermostat temp 24.5", "ansi-white");
        printLine("  iot set lighting brightness 90", "ansi-white");
        printLine("  iot set lighting color cyan", "ansi-white");
        printLine("-------------------------------------------------------------------------", "ansi-green");
        return;
    }

    const sub = args[0].toLowerCase();
    if (sub === 'list') {
        printLine("Connected IoT Devices:", "ansi-green");
        Object.keys(iotDevices).forEach(key => {
            const dev = iotDevices[key];
            let statusText = dev.status ? "<span class=\"ansi-green\">ON</span>" : "<span class=\"ansi-magenta\">OFF</span>";
            if (key === 'security') {
                statusText = dev.status ? "<span class=\"ansi-magenta\">LOCKED (Armed)</span>" : "<span class=\"ansi-cyan\">UNLOCKED (Disarmed)</span>";
            }
            let propsText = "";
            if (key === 'thermostat' && dev.status) {
                propsText = ` [Temp: ${dev.temp}°C, Humidity: ${dev.humidity}%]`;
            } else if (key === 'lighting' && dev.status) {
                propsText = ` [Color: ${dev.color}, Brightness: ${dev.brightness}%]`;
            } else if (key === 'cooling' && dev.status) {
                propsText = ` [Speed: ${dev.rpm} RPM]`;
            }
            printLine(`  * ${dev.name.padEnd(20)} : Status: ${statusText}${propsText}`, "ansi-white");
        });
    } else if (sub === 'toggle') {
        if (args.length < 2) {
            printLine("Error: Missing device name. Usage: iot toggle &lt;device&gt;", "ansi-magenta");
            playErrorSFX();
            return;
        }
        const devName = args[1].toLowerCase();
        if (iotDevices[devName] !== undefined) {
            toggleIotDevice(devName, true);
        } else {
            printLine(`Error: Unknown device '${devName}'. Available: thermostat, lighting, security, cooling`, "ansi-magenta");
            playErrorSFX();
        }
    } else if (sub === 'set') {
        if (args.length < 4) {
            printLine("Error: Missing arguments. Usage: iot set &lt;device&gt; &lt;property&gt; &lt;value&gt;", "ansi-magenta");
            playErrorSFX();
            return;
        }
        const devName = args[1].toLowerCase();
        const prop = args[2].toLowerCase();
        const val = args[3].toLowerCase();
        
        if (devName === 'thermostat') {
            if (prop === 'temp') {
                const tempNum = parseFloat(val);
                if (!isNaN(tempNum) && tempNum >= 16 && tempNum <= 30) {
                    iotDevices.thermostat.temp = tempNum;
                    updateIotGuiControls();
                    printLine(`Thermostat temperature set to ${tempNum}°C.`, "ansi-green");
                    playChimeSFX();
                    logSystemEvent(`Thermostat temp set via CLI: ${tempNum}°C`, "INFO");
                } else {
                    printLine("Error: Temperature must be a number between 16 and 30.", "ansi-magenta");
                    playErrorSFX();
                }
            } else {
                printLine(`Error: Unknown property '${prop}' for thermostat. Available: temp`, "ansi-magenta");
                playErrorSFX();
            }
        } else if (devName === 'lighting') {
            if (prop === 'brightness') {
                const bNum = parseInt(val);
                if (!isNaN(bNum) && bNum >= 10 && bNum <= 100) {
                    iotDevices.lighting.brightness = bNum;
                    updateIotGuiControls();
                    printLine(`Lighting brightness set to ${bNum}%.`, "ansi-green");
                    playChimeSFX();
                    logSystemEvent(`Lighting brightness set via CLI: ${bNum}%`, "INFO");
                } else {
                    printLine("Error: Brightness must be an integer between 10 and 100.", "ansi-magenta");
                    playErrorSFX();
                }
            } else if (prop === 'color') {
                const validColors = ['green', 'cyan', 'purple', 'blue', 'amber'];
                if (validColors.includes(val)) {
                    setIotLightingColor(val, true);
                } else {
                    printLine(`Error: Unknown color '${val}'. Available: green, cyan, purple, blue, amber`, "ansi-magenta");
                    playErrorSFX();
                }
            } else {
                printLine(`Error: Unknown property '${prop}' for lighting. Available: brightness, color`, "ansi-magenta");
                playErrorSFX();
            }
        } else {
            printLine(`Error: Device '${devName}' does not support 'set' controls or is read-only.`, "ansi-magenta");
            playErrorSFX();
        }
    } else {
        printLine(`Error: Unknown IoT subcommand '${sub}'. Type 'iot' to review valid commands.`, "ansi-magenta");
        playErrorSFX();
    }
}

function toggleIotDevice(device, isFromCli = false) {
    const dev = iotDevices[device];
    if (!dev) return;
    
    dev.status = !dev.status;
    
    // Custom mechanical switch chime
    if (!isSoundMuted && audioCtx) {
        if (device === 'security') {
            playAudioTone(dev.status ? 160 : 320, 'square', 0.12, 0.18);
        } else {
            playAudioTone(240, 'sine', 0.06, 0.1);
        }
    }
    
    if (device === 'security') {
        logSystemEvent(`VFS Security lock state changed: ${dev.status ? 'LOCKED' : 'UNLOCKED'}`, "SYS");
        if (isFromCli) {
            printLine(`Security Access Lock set to: ${dev.status ? 'LOCKED' : 'UNLOCKED'}.`, "ansi-green");
        }
    } else if (device === 'cooling') {
        if (!dev.status) dev.rpm = 0;
        logSystemEvent(`Cooling Fan Pump power toggled: ${dev.status ? 'ON' : 'OFF'}`, "SYS");
        if (isFromCli) {
            printLine(`Cooling Fan Pump set to: ${dev.status ? 'ON' : 'OFF'}.`, "ansi-green");
        }
    } else {
        logSystemEvent(`${dev.name} power state toggled: ${dev.status ? 'ON' : 'OFF'}`, "INFO");
        if (isFromCli) {
            printLine(`${dev.name} set to: ${dev.status ? 'ON' : 'OFF'}.`, "ansi-green");
        }
    }
    
    updateIotGuiControls();
    renderVfsTree();
}

function setIotThermostatTemp(val) {
    const tempNum = parseFloat(val);
    if (!isNaN(tempNum)) {
        iotDevices.thermostat.temp = tempNum;
        iotTempDisplay.textContent = `${tempNum.toFixed(1)}°C`;
        const tDial = document.querySelector('.temp-dial');
        if (tDial) {
            const percent = ((tempNum - 16) / (30 - 16)) * 100;
            tDial.style.setProperty('--temp-percent', `${percent}%`);
        }
        playKeypressSound();
    }
}

function setIotLightingColor(color, isFromCli = false) {
    iotDevices.lighting.color = color;
    
    const dots = document.querySelectorAll('.color-dot');
    dots.forEach(dot => {
        dot.classList.remove('active');
        if (dot.classList.contains(`color-${color}`)) {
            dot.classList.add('active');
        }
    });
    
    logSystemEvent(`Lighting RGB accent color set to: ${capitalize(color)}`, "INFO");
    if (isFromCli) {
        printLine(`Lighting RGB accent color set to: ${capitalize(color)}.`, "ansi-green");
    }
    
    playChimeSFX();
    updateIotGuiControls();
}

function setIotLightingBrightness(val) {
    const bNum = parseInt(val);
    if (!isNaN(bNum)) {
        iotDevices.lighting.brightness = bNum;
        iotBrightnessDisplay.textContent = `${bNum}%`;
        playKeypressSound();
    }
}

function updateIotGuiControls() {
    if (currentView !== 'gui') return;
    
    // 1. Thermostat Card
    const tCard = document.getElementById('iot-thermostat-card');
    const tCheck = document.getElementById('iot-temp-status');
    const tSlider = document.getElementById('iot-temp-slider');
    const tDial = document.querySelector('.temp-dial');
    if (tCard && tCheck && tSlider) {
        tCheck.checked = iotDevices.thermostat.status;
        tSlider.value = iotDevices.thermostat.temp;
        tSlider.disabled = !iotDevices.thermostat.status;
        iotTempDisplay.textContent = `${iotDevices.thermostat.temp.toFixed(1)}°C`;
        
        if (iotDevices.thermostat.status) {
            tCard.classList.remove('inactive');
            if (tDial) {
                const percent = ((iotDevices.thermostat.temp - 16) / (30 - 16)) * 100;
                tDial.style.setProperty('--temp-percent', `${percent}%`);
            }
        } else {
            tCard.classList.add('inactive');
            iotTempDisplay.textContent = "--°C";
            if (tDial) {
                tDial.style.setProperty('--temp-percent', '0%');
            }
        }
    }
    
    // 2. Lighting Card
    const lCard = document.getElementById('iot-lighting-card');
    const lCheck = document.getElementById('iot-lighting-status');
    const lSlider = document.getElementById('iot-brightness-slider');
    if (lCard && lCheck && lSlider) {
        lCheck.checked = iotDevices.lighting.status;
        lSlider.value = iotDevices.lighting.brightness;
        lSlider.disabled = !iotDevices.lighting.status;
        iotBrightnessDisplay.textContent = `${iotDevices.lighting.brightness}%`;
        
        const dots = document.querySelectorAll('.color-dot');
        dots.forEach(dot => {
            if (!iotDevices.lighting.status) {
                dot.style.pointerEvents = 'none';
                dot.style.opacity = '0.3';
            } else {
                dot.style.pointerEvents = 'auto';
                dot.style.opacity = '1.0';
                dot.classList.remove('active');
                if (dot.classList.contains(`color-${iotDevices.lighting.color}`)) {
                    dot.classList.add('active');
                }
            }
        });
        
        if (iotDevices.lighting.status) {
            lCard.classList.remove('inactive');
            let glowColorStr = '';
            if (iotDevices.lighting.color === 'green') glowColorStr = 'rgba(59, 241, 59, ';
            else if (iotDevices.lighting.color === 'cyan') glowColorStr = 'rgba(0, 240, 255, ';
            else if (iotDevices.lighting.color === 'purple') glowColorStr = 'rgba(189, 147, 249, ';
            else if (iotDevices.lighting.color === 'blue') glowColorStr = 'rgba(93, 138, 168, ';
            else if (iotDevices.lighting.color === 'amber') glowColorStr = 'rgba(255, 179, 0, ';
            lCard.style.boxShadow = `0 5px 15px ${glowColorStr} ${(iotDevices.lighting.brightness/300).toFixed(2)})`;
        } else {
            lCard.classList.add('inactive');
            lCard.style.boxShadow = 'none';
            iotBrightnessDisplay.textContent = "--%";
        }
    }
    
    // 3. Security Access Lock Card
    if (iotLockBtn && iotLockText && iotLockGlow) {
        if (iotDevices.security.status) {
            iotLockBtn.className = "lock-btn locked";
            iotLockBtn.innerHTML = '<i class="fas fa-lock"></i> <span id="iot-lock-text">LOCKED</span>';
            iotLockGlow.className = "lock-indicator-glow";
        } else {
            iotLockBtn.className = "lock-btn unlocked";
            iotLockBtn.innerHTML = '<i class="fas fa-lock-open"></i> <span id="iot-lock-text">UNLOCKED</span>';
            iotLockGlow.className = "lock-indicator-glow unlocked";
        }
    }
    
    // 4. Cooling Fan Pump Card
    const cCard = document.getElementById('iot-cooling-card');
    const cCheck = document.getElementById('iot-cooling-status');
    if (cCard && cCheck && iotFanSvg && iotPumpRpm) {
        cCheck.checked = iotDevices.cooling.status;
        if (iotDevices.cooling.status) {
            cCard.classList.remove('inactive');
            iotFanSvg.classList.add('fan-spin-active');
            if (iotDevices.cooling.rpm === 0) {
                let rpmVal = 0;
                let rampInterval = setInterval(() => {
                    if (!iotDevices.cooling.status) {
                        clearInterval(rampInterval);
                        return;
                    }
                    rpmVal += 320;
                    if (rpmVal >= 4800) {
                        rpmVal = 4800 + Math.floor(Math.random()*80);
                        clearInterval(rampInterval);
                    }
                    iotDevices.cooling.rpm = rpmVal;
                    iotPumpRpm.textContent = `${rpmVal} RPM`;
                    const speed = 60 / rpmVal;
                    iotFanSvg.style.setProperty('--fan-speed', `${speed}s`);
                }, 50);
            } else {
                iotPumpRpm.textContent = `${iotDevices.cooling.rpm} RPM`;
                const speed = 60 / iotDevices.cooling.rpm;
                iotFanSvg.style.setProperty('--fan-speed', `${speed}s`);
            }
        } else {
            cCard.classList.add('inactive');
            if (iotDevices.cooling.rpm > 0) {
                let rpmVal = iotDevices.cooling.rpm;
                let slowdownInterval = setInterval(() => {
                    if (iotDevices.cooling.status) {
                        clearInterval(slowdownInterval);
                        return;
                    }
                    rpmVal -= 400;
                    if (rpmVal <= 0) {
                        rpmVal = 0;
                        iotFanSvg.classList.remove('fan-spin-active');
                        clearInterval(slowdownInterval);
                    } else {
                        const speed = 60 / rpmVal;
                        iotFanSvg.style.setProperty('--fan-speed', `${speed}s`);
                    }
                    iotDevices.cooling.rpm = rpmVal;
                    iotPumpRpm.textContent = `${rpmVal} RPM`;
                }, 50);
            } else {
                iotFanSvg.classList.remove('fan-spin-active');
                iotDevices.cooling.rpm = 0;
                iotPumpRpm.textContent = "0 RPM";
            }
        }
    }
}

function startIotTelemetryChart() {
    const canvas = document.getElementById('iot-telemetry-chart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let lastTime = 0;
    
    function drawTelemetry(timestamp) {
        if (currentView !== 'gui') return;
        iotTelemetryFrameId = requestAnimationFrame(drawTelemetry);
        
        const elapsed = timestamp - lastTime;
        if (elapsed < 120) return;
        lastTime = timestamp;
        
        let baseRate = 80;
        if (iotDevices.cooling.status) baseRate += 115;
        if (iotDevices.thermostat.status) baseRate += 35;
        
        let noise = (Math.random() - 0.5) * 45;
        let finalRate = Math.max(10, Math.floor(baseRate + noise));
        
        iotTelemetryHistory.shift();
        iotTelemetryHistory.push(finalRate);
        
        iotTelemetryRate.textContent = `${finalRate} pkts/s`;
        
        let width = canvas.width = canvas.parentElement.clientWidth;
        let height = canvas.height = 100;
        
        ctx.clearRect(0, 0, width, height);
        
        ctx.strokeStyle = 'rgba(var(--accent-rgb), 0.03)';
        ctx.lineWidth = 1;
        for (let i = 0; i < height; i += 25) {
            ctx.beginPath();
            ctx.moveTo(0, i);
            ctx.lineTo(width, i);
            ctx.stroke();
        }
        
        ctx.shadowBlur = 8;
        ctx.shadowColor = getThemeColor();
        ctx.strokeStyle = getThemeColor();
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        const step = width / (iotTelemetryHistory.length - 1);
        for (let i = 0; i < iotTelemetryHistory.length; i++) {
            const x = i * step;
            const y = height - (iotTelemetryHistory[i] / 300) * (height - 10);
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.stroke();
        
        ctx.shadowBlur = 0;
        ctx.fillStyle = 'rgba(var(--accent-rgb), 0.03)';
        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();
        ctx.fill();
    }
    
    iotTelemetryFrameId = requestAnimationFrame(drawTelemetry);
}

function stopIotTelemetryChart() {
    if (iotTelemetryFrameId) {
        cancelAnimationFrame(iotTelemetryFrameId);
        iotTelemetryFrameId = null;
    }
}

// ==========================================================================
// GUI AI CHAT LOG LOGIC & SPEECH SYNTHESIS
// ==========================================================================
function sendGuiChatMessage() {
    if (!aiGuiChatInput) return;
    
    const query = aiGuiChatInput.value.trim();
    if (!query) return;
    
    aiGuiChatInput.value = '';
    
    appendGuiChatBubble(query, 'user');
    playEnterSFX();
    
    logSystemEvent(`Dashboard AI chat request: "${query}"`, "INFO");
    
    showTypingIndicator();
    
    setTimeout(() => {
        removeTypingIndicator();
        const reply = generateAiReply(query);
        appendGuiChatBubble(reply, 'bot');
        playChimeSFX();
        
        if (isVoiceEnabled) {
            speakText(reply);
        }
    }, 1000 + Math.random()*800);
}

function showTypingIndicator() {
    if (!aiGuiChatMessages) return;
    
    const div = document.createElement('div');
    div.className = 'ai-chat-message bot thinking';
    div.id = 'ai-typing-indicator';
    div.innerHTML = `<span class="message-sender">Consultant:</span>
    <div class="typing-dots">
        <span></span>
        <span></span>
        <span></span>
    </div>`;
    
    aiGuiChatMessages.appendChild(div);
    aiGuiChatMessages.scrollTop = aiGuiChatMessages.scrollHeight;
    
    // Play satisfying physical keyboard switch clicks
    let clicks = 0;
    const maxClicks = 8 + Math.floor(Math.random()*6);
    const clickTimer = setInterval(() => {
        if (!document.getElementById('ai-typing-indicator')) {
            clearInterval(clickTimer);
            return;
        }
        if (clicks < maxClicks) {
            playKeypressSound();
            clicks++;
        } else {
            clearInterval(clickTimer);
        }
    }, 110 + Math.random()*70);
}

function removeTypingIndicator() {
    const indicator = document.getElementById('ai-typing-indicator');
    if (indicator) {
        indicator.remove();
    }
}

function sendGuiChatSuggestion(text) {
    if (!aiGuiChatInput) return;
    aiGuiChatInput.value = text;
    sendGuiChatMessage();
}

function appendGuiChatBubble(text, sender) {
    if (!aiGuiChatMessages) return;
    
    const div = document.createElement('div');
    div.className = `ai-chat-message ${sender}`;
    
    const label = sender === 'user' ? 'Guest:' : 'Consultant:';
    div.innerHTML = `<span class="message-sender">${label}</span><span class="message-text">${text}</span>`;
    
    aiGuiChatMessages.appendChild(div);
    aiGuiChatMessages.scrollTop = aiGuiChatMessages.scrollHeight;
}

function generateAiReply(query) {
    const cleanQuery = query.toLowerCase().trim();
    
    if (cleanQuery.includes("project") || cleanQuery.includes("portfolio")) {
        let projs = PortfolioData.projects.map(p => `• <strong>${p.name}</strong> (${p.tech})`).join('<br>');
        return `Harsh has engineered several key software systems:<br>${projs}<br>Check out the 'Projects' tab for more descriptions!`;
    } 
    else if (cleanQuery.includes("experience") || cleanQuery.includes("tcs") || cleanQuery.includes("job") || cleanQuery.includes("intern")) {
        let jobs = PortfolioData.experience.map(j => `• <strong>${j.role}</strong> at ${j.company} (${j.duration})`).join('<br>');
        return `Harsh's professional roles include:<br>${jobs}<br>Check the 'Experience' tab for full timelines!`;
    } 
    else if (cleanQuery.includes("skill") || cleanQuery.includes("java") || cleanQuery.includes("kotlin") || cleanQuery.includes("spring") || cleanQuery.includes("python")) {
        return `Harsh is highly skilled in:<br>
        • <strong>Languages:</strong> ${PortfolioData.skills.languages.join(', ')}<br>
        • <strong>Backend:</strong> ${PortfolioData.skills.backend.join(', ')}<br>
        • <strong>Mobile:</strong> ${PortfolioData.skills.frontendMobile.join(', ')}<br>
        • <strong>Databases:</strong> ${PortfolioData.skills.databases.join(', ')}`;
    } 
    else if (cleanQuery.includes("contact") || cleanQuery.includes("email") || cleanQuery.includes("phone") || cleanQuery.includes("linkedin") || cleanQuery.includes("github")) {
        return `You can get in touch with Harsh here:<br>
        • <strong>Email:</strong> harshtiwari493@gmail.com<br>
        • <strong>Phone:</strong> +91-7805841898<br>
        • <strong>LinkedIn:</strong> linkedin.com/in/harshtiwari29<br>
        • <strong>GitHub:</strong> github.com/harshtiwari29`;
    } 
    else if (cleanQuery.includes("who") || cleanQuery.includes("about") || cleanQuery.includes("summary") || cleanQuery.includes("harsh")) {
        return PortfolioData.summary;
    }
    else if (cleanQuery.includes("cgpa") || cleanQuery.includes("education") || cleanQuery.includes("grade") || cleanQuery.includes("college") || cleanQuery.includes("university") || cleanQuery.includes("school") || cleanQuery.includes("marks")) {
        let edus = PortfolioData.education.map(e => `• <strong>${e.level}</strong> from ${e.institute} (${e.grade})`).join('<br>');
        return `Harsh's academic records:<br>${edus}`;
    }
    else if (cleanQuery.includes("location") || cleanQuery.includes("live") || cleanQuery.includes("indore") || cleanQuery.includes("dewas") || cleanQuery.includes("india")) {
        return "Harsh Tiwari is based in Indore/Dewas, Madhya Pradesh, India.";
    }
    else if (cleanQuery.includes("aem") || cleanQuery.includes("adobe")) {
        return "At TCS, Harsh develops enterprise web architecture utilizing Adobe Experience Manager (AEM). He is skilled in building OSGi backend services, core components, and integrations using Java and Spring Frameworks.";
    }
    else if (cleanQuery.includes("android") || cleanQuery.includes("kotlin") || cleanQuery.includes("compose")) {
        return "Harsh is an experienced native Android developer. His projects include <strong>StudyHub</strong> (academic organization app built with Compose & Room) and <strong>PlayLog</strong> (game time tracker using Flow & Coroutines).";
    }
    else if (cleanQuery.includes("resume") || cleanQuery.includes("cv")) {
        return "You can read the VFS files <code>about/summary.txt</code> or run <code>experience</code> and <code>skills</code> in the terminal for a full, copy-pasteable breakdown of Harsh's CV details.";
    }
    
    return "I can answer queries regarding Harsh's skills, projects, experience, education, locations, contact details, or summary. Try clicking one of the suggested tags below!";
}

function toggleVoiceOutput() {
    isVoiceEnabled = !isVoiceEnabled;
    if (isVoiceEnabled) {
        aiVoiceToggle.innerHTML = '<i class="fas fa-volume-up"></i> Speech On';
        aiVoiceToggle.style.borderColor = 'var(--accent-color)';
        aiVoiceToggle.style.boxShadow = '0 0 10px var(--glow-color)';
        logSystemEvent("Vocal AI synthesis active.", "SYS");
        playChimeSFX();
        speakText("Vocal engine online. Ready to read responses.");
    } else {
        aiVoiceToggle.innerHTML = '<i class="fas fa-volume-mute"></i> Speech Off';
        aiVoiceToggle.style.borderColor = 'var(--window-border)';
        aiVoiceToggle.style.boxShadow = 'none';
        logSystemEvent("Vocal AI synthesis disabled.", "SYS");
        if (window.speechSynthesis) {
            window.speechSynthesis.cancel();
        }
    }
}

function speakText(text) {
    if (!window.speechSynthesis) return;
    
    window.speechSynthesis.cancel();
    
    const cleanText = text.replace(/<[^>]*>/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    
    const voices = window.speechSynthesis.getVoices();
    const roboticVoice = voices.find(v => v.name.includes('Google US English') || v.lang.startsWith('en'));
    if (roboticVoice) {
        utterance.voice = roboticVoice;
    }
    
    utterance.pitch = 1.0;
    utterance.rate = 1.05;
    window.speechSynthesis.speak(utterance);
}
