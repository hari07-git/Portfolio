// Editable content lives here.
// Update this file to customize the portfolio without touching layout/styling code.
window.PROFILE = {
  name: "Biyyani Hari Venkata Gopal",
  preferredName: "Hari Biyyani",
  location: "Hyderabad, Telangana, India",
  phone: "+91-8555080191",
  email: "biyyanihari7@gmail.com",
  linkedin: "https://www.linkedin.com/in/hari-biyyani-308335355/",
  github: "https://github.com/hari07-git",
  roleHeadline: "SDE • Full‑Stack Developer",
  heroKicker: "HEY",
  heroTitle: "I’m Hari Biyyani.",
  heroSubtitle: "SDE-focused full‑stack developer who ships clean APIs and pragmatic UX.",
  heroSummary:
    "I build reliable web apps end-to-end using Flask, Spring Boot, React, and SQL. I care about Git-first workflows, readable code, and strong fundamentals in DSA.",
  summary:
    "Undergraduate Computer Science & Engineering student at MLR Institute of Technology with hands‑on full‑stack experience. Proficient in Python, Java, JavaScript, React.js, and REST API design. Completed a virtual internship at Infosys Springboard focused on data structures, clean coding, and industry-oriented problem solving.",
  highlights: ["SDE", "Git & version control", "REST APIs", "Data structures & algorithms", "Clean coding", "Team delivery"],
  focusAreas: [
    "Designing clean, testable REST APIs",
    "Building full-stack apps (Flask, Spring Boot, React)",
    "Authentication and role-based access control (JWT)",
    "Debugging, unit testing, and code review habits",
    "Git workflows (branching, PRs) and collaboration",
  ],
  experience: [
    {
      company: "Infosys Springboard",
      title: "Full Stack Developer Intern (Virtual)",
      location: "India",
      start: "Feb 2026",
      end: "Apr 2026",
      summary:
        "Completed a virtual internship focused on full-stack development, data structures, and industry-oriented problem solving through structured, project-based learning.",
      bullets: [
        "Completed modules on object-oriented programming and core data structures in implementation-focused labs.",
        "Developed and tested algorithms in C++ and built REST APIs to practice clean coding and modular design.",
        "Strengthened debugging, unit testing, and code review skills by implementing data-structure–based features.",
        "Delivered milestones on schedule in a guided virtual team environment with defined tasks and deadlines.",
      ],
    },
  ],
  projects: [
    {
      name: "AgroSmart",
      tagline: "Smart Crop Advisory and Disease Detection System",
      description:
        "Flask web app that provides crop and fertilizer recommendations plus a leaf disease detection flow. Built for reliability with persistent history and fallback logic.",
      tech: ["Flask", "SQLite", "SQLAlchemy", "REST APIs", "RandomForest (hook)", "CNN/Keras (hook)"],
      links: [
        { label: "GitHub", href: "https://github.com/hari07-git/AgroSmart" },
      ],
      bullets: [
        "Implemented registration, authentication, and farmer profiles with persistent history.",
        "Added crop recommendation module with ML hook and robust fallback logic.",
        "Built fertilizer recommendation with history tracking and nutrient status charts.",
        "Integrated disease detection flow via CNN/Keras hook and REST endpoints.",
      ],
    },
    {
      name: "Librario",
      tagline: "Library Management System",
      description:
        "Full-stack library system with Spring Boot backend and React (Vite) frontend. Focused on secure auth, role-based access control, and real workflows.",
      tech: ["Spring Boot", "React", "Vite", "Axios", "React Router", "JWT", "MySQL"],
      links: [
        { label: "GitHub", href: "https://github.com/hari07-git/Librario" },
      ],
      bullets: [
        "Implemented JWT auth: registration, login, password reset tokens, and secure password change.",
        "Built role-based access control for admin, librarian, and member across APIs.",
        "Created MySQL modules for books, members, and membership plans with CRUD + expiry logic.",
        "Implemented issue/return APIs with penalty calculation and borrowing history; shipped React UI workflows.",
      ],
    },
  ],
  skills: [
    {
      label: "Languages",
      items: ["Python", "Java", "C++", "JavaScript", "HTML", "CSS"],
    },
    {
      label: "Frameworks & Libraries",
      items: ["React.js", "Flask", "Spring Boot"],
    },
    {
      label: "Core Competencies",
      items: ["Data Structures", "Algorithms", "OOP", "Problem Solving", "REST APIs"],
    },
    {
      label: "Tools & Platforms",
      items: ["Git", "SQLite", "MySQL", "ServiceNow (exposure)"],
    },
  ],
  education: [
    {
      school: "MLR Institute of Technology",
      degree: "B.Tech in Computer Science & Engineering",
      location: "Hyderabad, Telangana",
      start: "Sep 2023",
      end: "Present",
      notes: ["CPI: 7.5"],
    },
    {
      school: "Loyola Academy Junior College",
      degree: "Intermediate (MPC: Physics, Chemistry, Mathematics)",
      location: "",
      start: "Jun 2021",
      end: "Mar 2023",
      notes: ["GPA: 93.2%"],
    },
    {
      school: "Resonance Info School, Khammam",
      degree: "SSC (History, Biology, Maths, English, Hindi)",
      location: "",
      start: "Jun 2019",
      end: "Mar 2021",
      notes: ["GPA: 10.0"],
    },
  ],
  certifications: [
    "Creator Studio Delivery Accreditation",
    "Java Full Stack Developer Certification (6-month project-based training)",
  ],
};
