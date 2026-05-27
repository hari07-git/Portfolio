import {
  Code2,
  Database,
  Layout,
  Server,
  Smartphone,
  Terminal,
  Cpu,
  Globe,
  Layers,
  Box
} from "lucide-react";

export const PROFILE = {
  name: "Biyyani Hari Venkata Gopal",
  preferredName: "Hari Biyyani",
  location: "Hyderabad, Telangana, India",
  phone: "+91-8555080191",
  email: "biyyanihari7@gmail.com",
  linkedin: "https://www.linkedin.com/in/hari-biyyani-308335355/",
  github: "https://github.com/hari07-git",
  roleHeadline: "Full Stack Developer",
  roles: ["Full Stack Developer", "Software Engineer", "Problem Solver"],
  heroKicker: "HELLO WORLD, I'M",
  heroSubtitle: "I build high-performance web applications with a focus on seamless user experiences, scalable APIs, and futuristic design.",
  summary:
    "Undergraduate Computer Science & Engineering student at MLR Institute of Technology with hands‑on full‑stack experience. Proficient in Python, Java, JavaScript, React.js, and REST API design. I care about clean code, strong DSA fundamentals, and creating immersive digital experiences.",
  experience: [
    {
      company: "Infosys Springboard",
      title: "Full Stack Developer Intern (Virtual)",
      location: "India",
      start: "Feb 2026",
      end: "Apr 2026",
      summary:
        "Completed a virtual internship focused on full-stack development, data structures, and industry-oriented problem solving.",
      bullets: [
        "Developed and tested algorithms in C++ and built REST APIs.",
        "Strengthened debugging, unit testing, and code review skills.",
        "Delivered milestones in a guided virtual team environment."
      ],
    },
  ],
  projects: [
    {
      name: "ShareFare",
      tagline: "Futuristic Ride & Cost Sharing Platform",
      description:
        "A next-generation platform for sharing rides and splitting costs. Designed with a neon-cyberpunk aesthetic, real-time updates, and an intuitive floating UI.",
      tech: ["React", "Tailwind CSS", "Node.js", "MongoDB", "Socket.io"],
      links: [
        { label: "GitHub", href: "https://github.com/hari07-git" },
        { label: "Live Preview", href: "https://sharefare.online" }
      ],
      image: "/mockups/sharefare.png" // User's uploaded screenshot
    },
    {
      name: "AgroSmart",
      tagline: "Smart Crop Advisory System",
      description:
        "Flask web app providing crop and fertilizer recommendations plus a leaf disease detection flow via CNN/Keras hook. Built for reliability.",
      tech: ["Flask", "SQLite", "REST APIs", "RandomForest", "CNN/Keras"],
      links: [
        { label: "GitHub", href: "https://github.com/hari07-git/AgroSmart" },
      ],
      image: "/mockups/agrosmart_simple.png"
    },
    {
      name: "Librario",
      tagline: "Library Management System",
      description:
        "Full-stack library system with Spring Boot backend and React frontend. Focused on secure auth, role-based access control, and real workflows.",
      tech: ["Spring Boot", "React", "JWT", "MySQL"],
      links: [
        { label: "GitHub", href: "https://github.com/hari07-git/Librario" },
      ],
      image: "/mockups/librario_simple.png"
    },
  ],
  skills: [
    {
      category: "Frontend",
      icon: <Layout className="w-6 h-6" />,
      items: ["React.js", "JavaScript", "Tailwind CSS", "HTML5", "Framer Motion"],
    },
    {
      category: "Backend",
      icon: <Server className="w-6 h-6" />,
      items: ["Python", "Java", "Flask", "Spring Boot", "Node.js"],
    },
    {
      category: "Database",
      icon: <Database className="w-6 h-6" />,
      items: ["MySQL", "SQLite", "MongoDB", "PostgreSQL"],
    },
    {
      category: "Tools & Core",
      icon: <Terminal className="w-6 h-6" />,
      items: ["Git", "REST APIs", "Data Structures", "Algorithms", "OOP"],
    },
  ],
  education: [
    {
      school: "MLR Institute of Technology",
      degree: "B.Tech in Computer Science & Engineering",
      start: "2023",
      end: "Present",
      notes: "CPI: 7.5",
    },
  ],
  certifications: [
    {
      name: "ServiceNow Certified System Administrator (CSA)",
      issuer: "ServiceNow",
      date: "May 2026",
      id: "Certified",
      summary: "Validates technical skills in ServiceNow system configuration, user management, environment optimization, database administration, and basic scripting.",
      link: "https://www.credly.com/badges/31095e16-3605-44c5-b000-a6bf6fcbc415/public_url"
    },
    {
      name: "AI Fundamentals: Foundations for Understanding AI",
      issuer: "IBM SkillsBuild",
      date: "Dec 2025",
      id: "IBM Digital Credential",
      summary: "Covers foundational concepts of Artificial Intelligence, neural networks, machine learning models, and ethical generative AI frameworks.",
      link: "https://www.credly.com/badges/2b97ef93-f155-4c09-90aa-ce0df45579cb/public_url"
    },
    {
      name: "HackerRank Java (Basic) Certification",
      issuer: "HackerRank",
      date: "Dec 2024",
      id: "6265795AACF0",
      summary: "Cleared the HackerRank Java skill test covering basic algorithms, Core Java, object-oriented concepts, exception handling, and data structures.",
      link: "https://www.hackerrank.com/certificates/6265795aacf0"
    },
    {
      name: "Java Full Stack Developer Certification",
      issuer: "Achievers IT Institution",
      date: "Completed",
      id: "achieversit.com",
      summary: "Completed an intensive 6-month full-stack development training program focused on Core Java, Spring Boot, OOP, and REST API development."
    },
    {
      name: "Full Stack Developer Intern Certificate",
      issuer: "Infosys Springboard",
      date: "Completed",
      id: "Guided Virtual Lab",
      summary: "Completed structured labs and projects focused on Java-based full-stack development, database query optimization, and enterprise architecture principles."
    }
  ],
}; // end of profile archive data
