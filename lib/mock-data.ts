// ============================================================
// Connexode — Static Mock Data
// Replace with Prisma queries once the DB is connected
// ============================================================

export type Role = "STUDENT" | "MENTOR" | "ADMIN";
export type SubmissionStatus = "PENDING" | "REVIEWING" | "APPROVED" | "REJECTED";
export type TaskStatus = "LOCKED" | "IN_PROGRESS" | "SUBMITTED" | "APPROVED";

// ── Users ────────────────────────────────────────────────────
export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  role: Role;
  points: number;
  avatarInitials: string;
  enrolledTrackId: string;
  joinDate: string;
  streak: number;
  rank: string;
  currentWeek: number;
  currentDay: number;
}

export const MOCK_USERS: User[] = [
  {
    id: "usr_001",
    name: "Alex Johnson",
    username: "alex-johnson",
    email: "alex@example.com",
    role: "STUDENT",
    points: 2840,
    avatarInitials: "AJ",
    enrolledTrackId: "track_001",
    joinDate: "2026-04-01",
    streak: 12,
    rank: "Top 8%",
    currentWeek: 1,
    currentDay: 4,
  },
  {
    id: "usr_002",
    name: "Maya Patel",
    username: "maya-patel",
    email: "maya@example.com",
    role: "STUDENT",
    points: 1160,
    avatarInitials: "MP",
    enrolledTrackId: "track_007",
    joinDate: "2026-04-10",
    streak: 6,
    rank: "Top 18%",
    currentWeek: 1,
    currentDay: 2,
  },
  {
    id: "usr_003",
    name: "Omar Khan",
    username: "omar-khan",
    email: "omar@example.com",
    role: "STUDENT",
    points: 1320,
    avatarInitials: "OK",
    enrolledTrackId: "track_008",
    joinDate: "2026-04-14",
    streak: 7,
    rank: "Top 22%",
    currentWeek: 1,
    currentDay: 2,
  },
  {
    id: "usr_mentor1",
    name: "Dr. Sarah Connor",
    username: "sarah-connor",
    email: "sarah@connexode.com",
    role: "MENTOR",
    points: 0,
    avatarInitials: "SC",
    enrolledTrackId: "",
    joinDate: "2026-01-10",
    streak: 0,
    rank: "Expert Mentor",
    currentWeek: 0,
    currentDay: 0,
  },
  {
    id: "usr_mentor2",
    name: "Marcus Aurelius",
    username: "marcus-a",
    email: "marcus@connexode.com",
    role: "MENTOR",
    points: 0,
    avatarInitials: "MA",
    enrolledTrackId: "",
    joinDate: "2026-01-12",
    streak: 0,
    rank: "Architect Mentor",
    currentWeek: 0,
    currentDay: 0,
  },
  {
    id: "usr_admin",
    name: "Ahmad Khan (Admin)",
    username: "ahmad-admin",
    email: "admin@connexode.com",
    role: "ADMIN",
    points: 0,
    avatarInitials: "AK",
    enrolledTrackId: "",
    joinDate: "2026-01-01",
    streak: 0,
    rank: "Super Admin",
    currentWeek: 0,
    currentDay: 0,
  },
];

export interface MentorTrackAssignment {
  mentorId: string;
  mentorName: string;
  trackId: string;
  trackTitle: string;
}

export const MOCK_MENTOR_ASSIGNMENTS: MentorTrackAssignment[] = [
  { mentorId: "usr_mentor1", mentorName: "Dr. Sarah Connor", trackId: "track_001", trackTitle: "Full Stack Web Internship" },
  { mentorId: "usr_mentor2", mentorName: "Marcus Aurelius", trackId: "track_007", trackTitle: "Frontend Engineering" },
  { mentorId: "usr_mentor1", mentorName: "Dr. Sarah Connor", trackId: "track_008", trackTitle: "Backend Engineering" },
];

export interface Certificate {
  id: string;
  userId: string;
  userName: string;
  trackId: string;
  trackTitle: string;
  issueDate: string;
  grade: "Excellent" | "Very Good" | "Good";
  verificationHash: string;
}

export const MOCK_CERTIFICATES: Certificate[] = [
  {
    id: "CERT-FS-8A9F32",
    userId: "usr_001",
    userName: "Alex Johnson",
    trackId: "track_001",
    trackTitle: "Full Stack Web Internship",
    issueDate: "2026-05-30",
    grade: "Excellent",
    verificationHash: "sha256-8a9f32b7c4d5e6f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5",
  }
];

export const ACTIVE_USER_ID = "usr_001";
export const MOCK_USER = MOCK_USERS.find((user) => user.id === ACTIVE_USER_ID)!;

export const getActiveUser = (): User => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("connexode_active_user");
    if (saved) {
      // Find in dynamic users first
      const dynamicUsersRaw = localStorage.getItem("connexode_dynamic_users");
      if (dynamicUsersRaw) {
        try {
          const dynamicUsers = JSON.parse(dynamicUsersRaw);
          const foundDynamic = dynamicUsers.find((u: any) => u.id === saved);
          if (foundDynamic) {
            const trackSaved = localStorage.getItem(`connexode_user_track_${saved}`);
            if (trackSaved) {
              foundDynamic.enrolledTrackId = trackSaved;
            }
            return foundDynamic;
          }
        } catch (e) {
          console.error(e);
        }
      }

      // Find in static users
      const found = MOCK_USERS.find((u) => u.id === saved);
      if (found) {
        const trackSaved = localStorage.getItem(`connexode_user_track_${saved}`);
        if (trackSaved) {
          return { ...found, enrolledTrackId: trackSaved };
        }
        return found;
      }
    }
  }
  const defaultUser = MOCK_USERS.find((u) => u.id === ACTIVE_USER_ID)!;
  if (typeof window !== "undefined") {
    const trackSaved = localStorage.getItem(`connexode_user_track_${defaultUser.id}`);
    if (trackSaved) {
      return { ...defaultUser, enrolledTrackId: trackSaved };
    }
  }
  return defaultUser;
};

export const getPaymentStatus = (trackId: string, userId?: string): "PENDING" | "PENDING_VERIFICATION" | "PAID" => {
  if (typeof window !== "undefined") {
    const uid = userId || localStorage.getItem("connexode_active_user") || "default";
    const saved = localStorage.getItem(`connexode_payment_status_${uid}_${trackId}`) || localStorage.getItem(`connexode_payment_status_${trackId}`);
    if (saved === "PAID" || saved === "PENDING_VERIFICATION" || saved === "PENDING") {
      return saved as any;
    }
  }
  return "PENDING";
};

export const setPaymentStatus = (trackId: string, status: "PENDING" | "PENDING_VERIFICATION" | "PAID", userId?: string) => {
  if (typeof window !== "undefined") {
    const uid = userId || localStorage.getItem("connexode_active_user") || "default";
    localStorage.setItem(`connexode_payment_status_${uid}_${trackId}`, status);
    localStorage.setItem(`connexode_payment_status_${trackId}`, status);
  }
};

export const setActiveUser = (id: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("connexode_active_user", id);
    window.location.reload();
  }
};

export const enrollUserInTrack = (trackId: string) => {
  if (typeof window !== "undefined") {
    const activeUser = getActiveUser();
    localStorage.setItem(`connexode_user_track_${activeUser.id}`, trackId);
  }
};

// ── Tracks ───────────────────────────────────────────────────
export interface Track {
  id: string;
  title: string;
  slug: string;
  description: string;
  icon: string;
  durationWeeks: number;
  tags: string[];
  color: string;
  gradient: string;
}

export const TRACKS: Track[] = [
  {
    id: "track_001",
    title: "Full Stack Web Internship",
    slug: "full-stack-web-internship",
    description: "Ship end-to-end web apps with React, Next.js, Node.js, and PostgreSQL across 8 guided weeks.",
    icon: "Code2",
    durationWeeks: 8,
    tags: ["React", "Next.js", "Node.js", "PostgreSQL"],
    color: "#00F5FF",
    gradient: "from-cyan-500/20 to-blue-600/20",
  },
  {
    id: "track_007",
    title: "Frontend Engineering",
    slug: "frontend-engineering",
    description: "Master modern UI engineering with React, Next.js, animations, and accessibility-first design.",
    icon: "Layout",
    durationWeeks: 8,
    tags: ["HTML/CSS", "JavaScript", "React", "Next.js"],
    color: "#38BDF8",
    gradient: "from-sky-500/20 to-cyan-600/20",
  },
  {
    id: "track_008",
    title: "Backend Engineering",
    slug: "backend-engineering",
    description: "Build scalable APIs with Node.js, PostgreSQL, auth, and production-ready infrastructure.",
    icon: "Server",
    durationWeeks: 8,
    tags: ["Node.js", "APIs", "PostgreSQL", "Auth"],
    color: "#22C55E",
    gradient: "from-emerald-500/20 to-green-600/20",
  },
  {
    id: "track_002",
    title: "AI Engineering",
    slug: "ai-engineering",
    description: "Build LLM-powered apps, fine-tune models, and deploy AI pipelines with Python and LangChain.",
    icon: "Brain",
    durationWeeks: 8,
    tags: ["Python", "LangChain", "OpenAI", "FastAPI"],
    color: "#A855F7",
    gradient: "from-purple-500/20 to-pink-600/20",
  },
  {
    id: "track_003",
    title: "n8n Automation",
    slug: "n8n-automation",
    description: "Design, deploy, and monetize business automation workflows using n8n and third-party APIs.",
    icon: "Workflow",
    durationWeeks: 6,
    tags: ["n8n", "REST APIs", "Webhooks", "Zapier"],
    color: "#FF6B35",
    gradient: "from-orange-500/20 to-red-600/20",
  },
  {
    id: "track_004",
    title: "DevOps & Cloud",
    slug: "devops-cloud",
    description: "Learn Docker, Kubernetes, CI/CD pipelines, and cloud infrastructure on AWS & GCP.",
    icon: "Cloud",
    durationWeeks: 8,
    tags: ["Docker", "K8s", "AWS", "GitHub Actions"],
    color: "#00BFA5",
    gradient: "from-teal-500/20 to-emerald-600/20",
  },
  {
    id: "track_005",
    title: "Cybersecurity",
    slug: "cybersecurity",
    description: "Hands-on penetration testing, threat modelling, and building secure systems from scratch.",
    icon: "Shield",
    durationWeeks: 8,
    tags: ["Ethical Hacking", "OWASP", "Linux", "CTF"],
    color: "#F59E0B",
    gradient: "from-yellow-500/20 to-orange-600/20",
  },
  {
    id: "track_006",
    title: "Data Analytics",
    slug: "data-analytics",
    description: "Transform raw data into business intelligence using Python, SQL, and modern BI tools.",
    icon: "BarChart3",
    durationWeeks: 6,
    tags: ["Python", "SQL", "Pandas", "Tableau"],
    color: "#EC4899",
    gradient: "from-pink-500/20 to-rose-600/20",
  },
];

// ── 8-Week Track Roadmaps ──────────────────────────────────
export interface TrackWeekPlan {
  weekNo: number;
  title: string;
  focus: string;
  outcomes: string[];
  project: string;
}

export const TRACK_ROADMAPS: Record<string, TrackWeekPlan[]> = {
  track_001: [
    {
      weekNo: 1,
      title: "Front-end Foundations",
      focus: "HTML, CSS, React basics, Git workflow",
      outcomes: [
        "Build a responsive landing page",
        "Create reusable UI components",
        "Ship to GitHub",
      ],
      project: "Marketing site + navbar",
    },
    {
      weekNo: 2,
      title: "Backend + Data Foundations",
      focus: "Route handlers, Prisma, PostgreSQL, auth basics",
      outcomes: [
        "Build CRUD API",
        "Connect Postgres",
        "Secure access",
      ],
      project: "Blog API",
    },
    {
      weekNo: 3,
      title: "Feature Build Sprint",
      focus: "Full stack UI + API integration",
      outcomes: [
        "Build dashboard UI",
        "Ship CRUD flows",
        "Improve UX polish",
      ],
      project: "Project hub",
    },
    {
      weekNo: 4,
      title: "Security + Roles",
      focus: "RBAC, middleware, auditing",
      outcomes: [
        "Implement roles",
        "Protect routes",
        "Add audit logs",
      ],
      project: "Secure workspace",
    },
    {
      weekNo: 5,
      title: "Product Systems",
      focus: "Realtime, notifications, analytics",
      outcomes: [
        "Add realtime updates",
        "Create notification system",
        "Track analytics",
      ],
      project: "Product toolkit",
    },
    {
      weekNo: 6,
      title: "Quality + Performance",
      focus: "Testing, caching, optimization",
      outcomes: [
        "Add automated tests",
        "Improve performance",
        "Introduce caching",
      ],
      project: "Production hardening",
    },
    {
      weekNo: 7,
      title: "DevOps + Deployment",
      focus: "CI/CD, monitoring, release management",
      outcomes: [
        "Set up a CI pipeline",
        "Add monitoring and alerts",
        "Prepare release notes",
      ],
      project: "Release workflow",
    },
    {
      weekNo: 8,
      title: "Capstone Product",
      focus: "Scope, build, and ship an end-to-end app",
      outcomes: [
        "Define MVP scope",
        "Ship a full stack app",
        "Create demo and docs",
      ],
      project: "Full stack capstone",
    },
  ],
  track_007: [
    {
      weekNo: 1,
      title: "HTML + CSS Foundations",
      focus: "Layout, typography, responsive design",
      outcomes: [
        "Create a landing page",
        "Apply responsive grids",
        "Use design tokens",
      ],
      project: "Responsive marketing page",
    },
    {
      weekNo: 2,
      title: "JavaScript + DOM",
      focus: "Events, state, UI interactions",
      outcomes: [
        "Build interactive components",
        "Manage client-side state",
        "Handle form validation",
      ],
      project: "Interactive UI widgets",
    },
    {
      weekNo: 3,
      title: "React Fundamentals",
      focus: "Components, props, hooks",
      outcomes: [
        "Refactor UI into React",
        "Use hooks effectively",
        "Create reusable components",
      ],
      project: "Component-driven UI",
    },
    {
      weekNo: 4,
      title: "Data + State Management",
      focus: "APIs, async data, client state",
      outcomes: [
        "Fetch and render API data",
        "Handle loading and error states",
        "Use state patterns",
      ],
      project: "Data-driven dashboard",
    },
    {
      weekNo: 5,
      title: "Next.js + Routing",
      focus: "App Router, layouts, SEO",
      outcomes: [
        "Build multi-page UX",
        "Optimize SEO metadata",
        "Create reusable layouts",
      ],
      project: "Content-driven site",
    },
    {
      weekNo: 6,
      title: "UI Systems + Motion",
      focus: "Design systems, animation, performance",
      outcomes: [
        "Create a UI kit",
        "Add motion safely",
        "Optimize performance",
      ],
      project: "Product UI system",
    },
    {
      weekNo: 7,
      title: "Testing + Accessibility",
      focus: "Testing, a11y, QA",
      outcomes: [
        "Add UI tests",
        "Fix accessibility issues",
        "Prepare release QA",
      ],
      project: "Accessible app audit",
    },
    {
      weekNo: 8,
      title: "Frontend Capstone",
      focus: "Ship a polished frontend product",
      outcomes: [
        "Deliver a capstone UI",
        "Ship a public demo",
        "Write product docs",
      ],
      project: "Frontend capstone",
    },
  ],
  track_008: [
    {
      weekNo: 1,
      title: "HTTP + Node Basics",
      focus: "Servers, routing, JSON",
      outcomes: [
        "Create a basic API server",
        "Handle requests and responses",
        "Use environment config",
      ],
      project: "Starter API",
    },
    {
      weekNo: 2,
      title: "REST + Express",
      focus: "CRUD, middleware, validation",
      outcomes: [
        "Build REST endpoints",
        "Add validation",
        "Document API",
      ],
      project: "Task management API",
    },
    {
      weekNo: 3,
      title: "Databases + SQL",
      focus: "PostgreSQL, schema design",
      outcomes: [
        "Design relational schemas",
        "Write SQL queries",
        "Connect ORM",
      ],
      project: "Data-backed service",
    },
    {
      weekNo: 4,
      title: "Auth + Security",
      focus: "JWT, sessions, security",
      outcomes: [
        "Implement authentication",
        "Secure routes",
        "Apply OWASP basics",
      ],
      project: "Secure API",
    },
    {
      weekNo: 5,
      title: "Caching + Queues",
      focus: "Redis, background jobs",
      outcomes: [
        "Add caching",
        "Run async jobs",
        "Handle retries",
      ],
      project: "Job processing service",
    },
    {
      weekNo: 6,
      title: "Services + Messaging",
      focus: "Service boundaries, messaging",
      outcomes: [
        "Design service interfaces",
        "Use message queues",
        "Monitor throughput",
      ],
      project: "Event-driven API",
    },
    {
      weekNo: 7,
      title: "Observability + DevOps",
      focus: "Logging, metrics, deployment",
      outcomes: [
        "Add structured logs",
        "Ship metrics",
        "Deploy to cloud",
      ],
      project: "Production service",
    },
    {
      weekNo: 8,
      title: "Backend Capstone",
      focus: "Build and ship a production-ready API",
      outcomes: [
        "Deliver a capstone API",
        "Publish docs",
        "Run load tests",
      ],
      project: "Backend capstone",
    },
  ],
  track_002: [
    { weekNo: 1, title: "Python & AI Foundations", focus: "Python syntax, numpy, basic neural network concepts", outcomes: ["Write simple neural net scripts", "Clean data with Pandas"], project: "Data cleaning processor" },
    { weekNo: 2, title: "LLM Prompt Engineering & APIs", focus: "OpenAI, Claude API calls, system prompt design", outcomes: ["Build chatbot interface", "Handle raw token stream"], project: "Chatbot agent" },
    { weekNo: 3, title: "Vector Databases & Embeddings", focus: "Pinecone, ChromaDB, vector indexes", outcomes: ["Index documents", "Perform vector search"], project: "Doc Search engine" },
    { weekNo: 4, title: "Retrieval-Augmented Generation (RAG)", focus: "LangChain, RAG architecture, semantic search", outcomes: ["Build custom RAG agent", "Add source citation flows"], project: "Enterprise RAG search" },
    { weekNo: 5, title: "Agentic Workflows & LangGraph", focus: "LangGraph, decision trees, agent tool calls", outcomes: ["Design graph flow agents", "Add tool call callbacks"], project: "Autonomous task solver" },
    { weekNo: 6, title: "Model Fine-tuning & Optimization", focus: "LoRA, QLoRA, training pipelines", outcomes: ["Prepare training datasets", "Verify model responses"], project: "Custom model fine-tune" },
    { weekNo: 7, title: "AI Application Deployment", focus: "FastAPI, Docker, serverless GPUs", outcomes: ["Build FastAPI endpoint", "Deploy model container"], project: "High-throughput inference API" },
    { weekNo: 8, title: "AI Capstone Project", focus: "Design, build, and deploy custom AI MVP", outcomes: ["Build end-to-end AI SaaS", "Publish performance report"], project: "AI Agent Platform Capstone" },
  ],
  track_003: [
    { weekNo: 1, title: "n8n Basics & Node Workflows", focus: "Setup n8n, workflows, execution triggers", outcomes: ["Create starter node workflow", "Configure error nodes"], project: "Basic flow runner" },
    { weekNo: 2, title: "APIs & Webhook Integrations", focus: "HTTP Request nodes, webhook trigger setups", outcomes: ["Receive external payloads", "Trigger workflow conditionally"], project: "API webhook controller" },
    { weekNo: 3, title: "Data Transformation & Formatting", focus: "Code node, JSON processing, data maps", outcomes: ["Parse messy API arrays", "Format custom report summaries"], project: "Data cleanup node mapper" },
    { weekNo: 4, title: "Advanced Logic & Error Handling", focus: "Router logic, retry configurations, alerts", outcomes: ["Build error fallback streams", "Send Slack/Discord alerts"], project: "Fault-tolerant cron scheduler" },
    { weekNo: 5, title: "Database & Third-Party Sync", focus: "PostgreSQL nodes, Airtable/Google Sheets integrations", outcomes: ["Sync tables in realtime", "Store raw request history"], project: "CRM contact sync automation" },
    { weekNo: 6, title: "Automation Capstone Project", focus: "Design, build, and scale automated system", outcomes: ["Deliver high-throughput automation system", "Publish dashboard metrics"], project: "E-Commerce order workflow" },
  ],
  track_004: [
    { weekNo: 1, title: "Linux & Scripting Foundations", focus: "Bash scripting, system administration", outcomes: ["Automate log logfile rotate", "Setup user SSH credentials"], project: "Server health script" },
    { weekNo: 2, title: "Docker Containerization", focus: "Dockerfiles, compose files, container networks", outcomes: ["Containerize Node app", "Setup multi-tier network"], project: "App container suite" },
    { weekNo: 3, title: "Kubernetes Basics", focus: "Pods, services, deployments, configmaps", outcomes: ["Configure microservice cluster", "Run stateful set deployment"], project: "Local K8s cluster config" },
    { weekNo: 4, title: "CI/CD Pipelines", focus: "GitHub Actions, build steps, test workflows", outcomes: ["Create lint/test pipelines", "Automate image release push"], project: "Continuous integration build" },
    { weekNo: 5, title: "Infrastructure as Code (Terraform)", focus: "HCL, tfstate, resource definitions", outcomes: ["Provision VPC instances", "Manage modular state config"], project: "Terraform environment setup" },
    { weekNo: 6, title: "Cloud Services (AWS/GCP)", focus: "S3/Cloud Storage, EC2, IAM policies", outcomes: ["Setup IAM security rules", "Deploy dynamic serverless app"], project: "Multi-region cloud deploy" },
    { weekNo: 7, title: "Monitoring, Logging & Alerting", focus: "Prometheus, Grafana, ELK stack", outcomes: ["Build status dashboards", "Configure incident alert triggers"], project: "Operations alert center" },
    { weekNo: 8, title: "DevOps Capstone Project", focus: "Build complete automated deployment pipeline", outcomes: ["Deliver zero-downtime deploy system", "Write runbooks"], project: "DevOps Capstone Deployment" },
  ],
  track_005: [
    { weekNo: 1, title: "Security Fundamentals & Networking", focus: "TCP/IP models, port scanning, basic firewall rules", outcomes: ["Inspect packet streams", "Configure network ports"], project: "Network scanner utility" },
    { weekNo: 2, title: "Linux Security & Shell Scripting", focus: "File permissions, privilege escalation audits", outcomes: ["Build security configuration scripts", "Audit login logs"], project: "System auditor script" },
    { weekNo: 3, title: "Cryptography Basics", focus: "Symmetric/asymmetric algorithms, hashing, TLS/SSL", outcomes: ["Sign files with keys", "Configure certificate paths"], project: "Cryptographic vault wrapper" },
    { weekNo: 4, title: "Web Application Vulnerabilities (OWASP)", focus: "SQL Injection, XSS, CSRF checks", outcomes: ["Audit custom forms for XSS", "Sanitize SQL entrypoints"], project: "Vulnerability scan audit" },
    { weekNo: 5, title: "Penetration Testing & Metasploit", focus: "Vulnerability exploitation, reverse shells", outcomes: ["Conduct local penetration runs", "Identify software defects"], project: "Security analysis report" },
    { weekNo: 6, title: "Incident Response & Digital Forensics", focus: "Log analytics, memory dumps, intrusion tracking", outcomes: ["Trace mock attack vector paths", "Analyze harddrive sector flags"], project: "Forensic tracing report" },
    { weekNo: 7, title: "Network Defense & Firewalls", focus: "IDS/IPS setups, iptables, honeypots", outcomes: ["Install intrusion triggers", "Audit firewall rulesets"], project: "Network defense barrier" },
    { weekNo: 8, title: "Cybersecurity Capstone Audit", focus: "Audit real system architecture and secure it", outcomes: ["Deliver system security audit report", "Harden active workspace"], project: "Platform Security Audit" },
  ],
  track_006: [
    { weekNo: 1, title: "SQL Foundations", focus: "SELECT, JOIN, WHERE statements, queries", outcomes: ["Query relational tables", "Filter user activity datasets"], project: "SQL analytics query list" },
    { weekNo: 2, title: "Advanced SQL & Data Extraction", focus: "Window functions, CTEs, query plan profiling", outcomes: ["Write composite aggregations", "Tune slow database queries"], project: "Enterprise analytics schema" },
    { weekNo: 3, title: "Python for Data Analysis (Pandas/NumPy)", focus: "Dataframes, CSV parsing, data cleaners", outcomes: ["Clean raw spreadsheets", "Merge distinct data arrays"], project: "Python data pipeline" },
    { weekNo: 4, title: "Data Visualization (Matplotlib/Seaborn)", focus: "Charts, distribution plots, heatmaps", outcomes: ["Build multi-plot dashboards", "Plot customer churn cohorts"], project: "Data presentation deck" },
    { weekNo: 5, title: "Dashboarding & BI", focus: "Tableau interfaces, charts, dashboards", outcomes: ["Build live metrics report", "Establish business KPIs"], project: "Marketing dashboard suite" },
    { weekNo: 6, title: "Data Analytics Capstone Report", focus: "Process, visualize and report dataset insight", outcomes: ["Deliver business insight briefing", "Publish code notebook"], project: "Market Analytics Capstone" },
  ],
};

// ── Weekly Tasks ─────────────────────────────────────────────
export interface WeeklyTask {
  id: string;
  trackId: string;
  weekNo: number;
  dayNo: number;
  title: string;
  taskDetails: string;
  instructions: string[];
  estimatedHours: number;
  status: TaskStatus;
  points: number;
}

const STATIC_WEEKLY_TASKS: WeeklyTask[] = [
  // Week 1
  {
    id: "task_w1d1",
    trackId: "track_001",
    weekNo: 1,
    dayNo: 1,
    title: "Build a Next.js Navbar",
    taskDetails: "Create a fully responsive navigation bar with mobile hamburger menu, smooth scroll links, and glassmorphism styling.",
    instructions: [
      "Set up a new Next.js 15 project with TypeScript and Tailwind CSS.",
      "Create a `Navbar` component in `components/layout/`.",
      "Implement responsive design with a hamburger menu for mobile screens (< 768px).",
      "Add smooth scroll behavior for anchor links using CSS `scroll-behavior: smooth`.",
      "Style the navbar with a glass effect: semi-transparent background + backdrop-blur.",
      "Push your code to a public GitHub repository.",
      "Deploy to Vercel and submit both links below.",
    ],
    estimatedHours: 3,
    status: "APPROVED",
    points: 100,
  },
  {
    id: "task_w1d2",
    trackId: "track_001",
    weekNo: 1,
    dayNo: 2,
    title: "Hero Section with Animation",
    taskDetails: "Build an animated hero section with Framer Motion entrance animations and a typewriter effect.",
    instructions: [
      "Install Framer Motion: `npm install framer-motion`.",
      "Create a `HeroSection` component with a headline, sub-headline, and two CTA buttons.",
      "Add entrance animations using `motion.div` with `initial`, `animate`, and `transition` props.",
      "Implement a typewriter effect for the sub-headline using a custom hook.",
      "Ensure full responsiveness across mobile, tablet, and desktop.",
      "Push to GitHub and update your repository.",
    ],
    estimatedHours: 4,
    status: "APPROVED",
    points: 120,
  },
  {
    id: "task_w1d3",
    trackId: "track_001",
    weekNo: 1,
    dayNo: 3,
    title: "Feature Cards Grid",
    taskDetails: "Design and implement a responsive grid of glassmorphism feature cards with hover interactions.",
    instructions: [
      "Create a `FeaturesSection` component.",
      "Build at least 6 feature cards with an icon, title, and description.",
      "Use CSS Grid with `auto-fill` and `minmax` for responsiveness.",
      "Apply glassmorphism styles: `background: rgba(255,255,255,0.04)`, `backdrop-filter: blur(20px)`.",
      "Add hover effects: lift transform (`translateY(-8px)`) and border glow.",
      "Push to GitHub.",
    ],
    estimatedHours: 3,
    status: "SUBMITTED",
    points: 100,
  },
  {
    id: "task_w1d4",
    trackId: "track_001",
    weekNo: 1,
    dayNo: 4,
    title: "Dark Mode Toggle",
    taskDetails: "Implement a system-aware dark/light mode toggle with smooth CSS variable transitions.",
    instructions: [
      "Use Next.js `next-themes` package for theme management.",
      "Create a `ThemeToggle` button component with Sun/Moon icons.",
      "Define CSS custom properties for both light and dark themes.",
      "Ensure no flash of unstyled content (FOUC) on first load.",
      "Add a smooth 300ms transition for all color changes.",
      "Push to GitHub.",
    ],
    estimatedHours: 2,
    status: "IN_PROGRESS",
    points: 80,
  },
  {
    id: "task_w1d5",
    trackId: "track_001",
    weekNo: 1,
    dayNo: 5,
    title: "Contact Form with Validation",
    taskDetails: "Build a contact form with client-side validation using React Hook Form and Zod schema.",
    instructions: [
      "Install: `npm install react-hook-form zod @hookform/resolvers`.",
      "Create a `ContactForm` component with fields: Name, Email, Subject, Message.",
      "Define a Zod schema for form validation.",
      "Show inline error messages below each invalid field.",
      "Add a success state with a confirmation message on submit.",
      "Push to GitHub.",
    ],
    estimatedHours: 4,
    status: "LOCKED",
    points: 120,
  },
  // Week 2
  {
    id: "task_w2d1",
    trackId: "track_001",
    weekNo: 2,
    dayNo: 1,
    title: "REST API with Next.js Route Handlers",
    taskDetails: "Build a CRUD REST API using Next.js App Router Route Handlers for a Blog resource.",
    instructions: [
      "Create `app/api/posts/route.ts` for GET (list) and POST (create).",
      "Create `app/api/posts/[id]/route.ts` for GET (single), PUT (update), DELETE.",
      "Use in-memory storage (a `Map`) as a temporary database.",
      "Return proper HTTP status codes and JSON responses.",
      "Test all endpoints using Thunder Client or Postman.",
      "Document the API in your README.",
      "Push to GitHub.",
    ],
    estimatedHours: 5,
    status: "LOCKED",
    points: 150,
  },
  {
    id: "task_w2d2",
    trackId: "track_001",
    weekNo: 2,
    dayNo: 2,
    title: "PostgreSQL + Prisma Setup",
    taskDetails: "Connect your Next.js app to a PostgreSQL database using Prisma ORM.",
    instructions: [
      "Install Prisma: `npm install prisma @prisma/client`.",
      "Initialize Prisma: `npx prisma init`.",
      "Define a `Post` model in `schema.prisma`.",
      "Run `npx prisma migrate dev --name init`.",
      "Update your API route handlers to use `prisma.post.findMany()` etc.",
      "Create a seed script to populate test data.",
      "Push to GitHub.",
    ],
    estimatedHours: 6,
    status: "LOCKED",
    points: 180,
  },
  // Frontend Track — Week 1
  {
    id: "task_fe_w1d1",
    trackId: "track_007",
    weekNo: 1,
    dayNo: 1,
    title: "Responsive Layout Starter",
    taskDetails: "Build a landing page layout with hero, features, and footer using Flexbox and Grid.",
    instructions: [
      "Create a page with hero, features, and footer sections.",
      "Use CSS Grid for the feature cards.",
      "Add a mobile layout with stacked sections.",
      "Use a consistent spacing scale for margins and padding.",
      "Push to GitHub.",
    ],
    estimatedHours: 3,
    status: "APPROVED",
    points: 80,
  },
  {
    id: "task_fe_w1d2",
    trackId: "track_007",
    weekNo: 1,
    dayNo: 2,
    title: "Design Tokens + Typography",
    taskDetails: "Define color, spacing, and typography tokens and apply them consistently.",
    instructions: [
      "Create a token file (CSS variables or Tailwind theme).",
      "Apply a typography scale to headings and body text.",
      "Use tokenized spacing utilities across sections.",
      "Add a visual contrast section to test your palette.",
      "Push to GitHub.",
    ],
    estimatedHours: 3,
    status: "IN_PROGRESS",
    points: 90,
  },
  {
    id: "task_fe_w1d3",
    trackId: "track_007",
    weekNo: 1,
    dayNo: 3,
    title: "JavaScript UI Interactions",
    taskDetails: "Add tabs or accordion interactions with vanilla JavaScript.",
    instructions: [
      "Build a tabs or accordion component in HTML.",
      "Manage active state with JavaScript.",
      "Add keyboard navigation for accessibility.",
      "Include smooth transitions for open/close states.",
      "Push to GitHub.",
    ],
    estimatedHours: 3,
    status: "LOCKED",
    points: 100,
  },
  {
    id: "task_fe_w1d4",
    trackId: "track_007",
    weekNo: 1,
    dayNo: 4,
    title: "React Components 101",
    taskDetails: "Rebuild the landing page using React components and props.",
    instructions: [
      "Split the layout into Header, Hero, Features, and Footer components.",
      "Pass data via props instead of hardcoding text.",
      "Create a reusable Button component.",
      "Keep the layout fully responsive.",
      "Push to GitHub.",
    ],
    estimatedHours: 4,
    status: "LOCKED",
    points: 110,
  },
  {
    id: "task_fe_w1d5",
    trackId: "track_007",
    weekNo: 1,
    dayNo: 5,
    title: "Accessibility Pass",
    taskDetails: "Improve accessibility with semantic HTML, focus states, and ARIA labels.",
    instructions: [
      "Add semantic tags and ARIA labels where needed.",
      "Ensure color contrast meets WCAG AA guidelines.",
      "Add visible focus styles for keyboard users.",
      "Run a Lighthouse accessibility check.",
      "Push to GitHub.",
    ],
    estimatedHours: 2,
    status: "LOCKED",
    points: 90,
  },
  // Backend Track — Week 1
  {
    id: "task_be_w1d1",
    trackId: "track_008",
    weekNo: 1,
    dayNo: 1,
    title: "HTTP + Node Basics",
    taskDetails: "Create a basic Node.js HTTP server that returns JSON responses.",
    instructions: [
      "Initialize a Node.js project with npm.",
      "Create an HTTP server using the core `http` module.",
      "Return JSON for a `/status` endpoint.",
      "Add basic logging for requests.",
      "Push to GitHub.",
    ],
    estimatedHours: 2,
    status: "APPROVED",
    points: 80,
  },
  {
    id: "task_be_w1d2",
    trackId: "track_008",
    weekNo: 1,
    dayNo: 2,
    title: "Express REST API",
    taskDetails: "Set up Express with CRUD routes for a `tasks` resource.",
    instructions: [
      "Install Express and create an `app.js` server.",
      "Add GET, POST, PUT, and DELETE routes for `/tasks`.",
      "Use in-memory storage with a simple array.",
      "Return proper status codes for each route.",
      "Push to GitHub.",
    ],
    estimatedHours: 3,
    status: "IN_PROGRESS",
    points: 110,
  },
  {
    id: "task_be_w1d3",
    trackId: "track_008",
    weekNo: 1,
    dayNo: 3,
    title: "Validation + Error Handling",
    taskDetails: "Add request validation and centralized error handling.",
    instructions: [
      "Validate request payloads for create and update.",
      "Add a centralized error handler middleware.",
      "Standardize error responses.",
      "Document validation rules in README.",
      "Push to GitHub.",
    ],
    estimatedHours: 3,
    status: "LOCKED",
    points: 90,
  },
  {
    id: "task_be_w1d4",
    trackId: "track_008",
    weekNo: 1,
    dayNo: 4,
    title: "Configuration + Env",
    taskDetails: "Add environment configuration and separate dev/prod settings.",
    instructions: [
      "Install and configure `dotenv`.",
      "Create a config module for settings.",
      "Add separate dev and prod config defaults.",
      "Update README with env setup steps.",
      "Push to GitHub.",
    ],
    estimatedHours: 2,
    status: "LOCKED",
    points: 80,
  },
  {
    id: "task_be_w1d5",
    trackId: "track_008",
    weekNo: 1,
    dayNo: 5,
    title: "API Documentation",
    taskDetails: "Document your API endpoints and usage examples.",
    instructions: [
      "Create a README section for API docs.",
      "List each endpoint with method and example payload.",
      "Include sample success and error responses.",
      "Add instructions for running the API locally.",
      "Push to GitHub.",
    ],
    estimatedHours: 2,
    status: "LOCKED",
    points: 80,
  },
  // Full Stack Track — Week 2 (continued)
  {
    id: "task_w2d3",
    trackId: "track_001",
    weekNo: 2,
    dayNo: 3,
    title: "Authentication Basics",
    taskDetails: "Add sign-in and protect a route using a simple credentials flow.",
    instructions: [
      "Create a sign-in form with email and password fields.",
      "Store a session token on successful login.",
      "Protect one dashboard route with middleware or guards.",
      "Show signed-in state in the UI.",
      "Push to GitHub.",
    ],
    estimatedHours: 4,
    status: "LOCKED",
    points: 140,
  },
  {
    id: "task_w2d4",
    trackId: "track_001",
    weekNo: 2,
    dayNo: 4,
    title: "Server Actions + Forms",
    taskDetails: "Handle form submissions using server actions with validation and error states.",
    instructions: [
      "Create a server action for creating a record.",
      "Add client form validation with clear error messages.",
      "Show success and error UI states.",
      "Persist the record with Prisma.",
      "Push to GitHub.",
    ],
    estimatedHours: 4,
    status: "LOCKED",
    points: 130,
  },
  {
    id: "task_w2d5",
    trackId: "track_001",
    weekNo: 2,
    dayNo: 5,
    title: "File Uploads + Storage",
    taskDetails: "Add file uploads for a user avatar or project asset and store metadata in the DB.",
    instructions: [
      "Add a file upload input with basic validation.",
      "Store the file locally or in a temp folder.",
      "Save the file URL in the database.",
      "Display the uploaded asset in the UI.",
      "Push to GitHub.",
    ],
    estimatedHours: 4,
    status: "LOCKED",
    points: 130,
  },
  // Full Stack Track — Week 3
  {
    id: "task_w3d1",
    trackId: "track_001",
    weekNo: 3,
    dayNo: 1,
    title: "Dashboard Layout + Data Fetch",
    taskDetails: "Create a dashboard layout and fetch data from your API.",
    instructions: [
      "Design a dashboard layout with sidebar and main content.",
      "Fetch API data on page load.",
      "Render loading and empty states.",
      "Keep the layout responsive.",
      "Push to GitHub.",
    ],
    estimatedHours: 4,
    status: "LOCKED",
    points: 120,
  },
  {
    id: "task_w3d2",
    trackId: "track_001",
    weekNo: 3,
    dayNo: 2,
    title: "CRUD UI Flows",
    taskDetails: "Build create, edit, and delete flows connected to your API.",
    instructions: [
      "Add a form to create a new item.",
      "Add edit and delete actions per item.",
      "Sync UI state with API responses.",
      "Show toast or inline feedback.",
      "Push to GitHub.",
    ],
    estimatedHours: 4,
    status: "LOCKED",
    points: 120,
  },
  {
    id: "task_w3d3",
    trackId: "track_001",
    weekNo: 3,
    dayNo: 3,
    title: "Search + Filters",
    taskDetails: "Add search, filter, and sorting to your dashboard list.",
    instructions: [
      "Add a keyword search input.",
      "Implement at least two filters.",
      "Add sorting by date or status.",
      "Keep filters in the URL or state.",
      "Push to GitHub.",
    ],
    estimatedHours: 3,
    status: "LOCKED",
    points: 110,
  },
  {
    id: "task_w3d4",
    trackId: "track_001",
    weekNo: 3,
    dayNo: 4,
    title: "Optimistic Updates",
    taskDetails: "Improve UX by adding optimistic UI and robust loading states.",
    instructions: [
      "Add optimistic UI for create and delete actions.",
      "Show skeleton loaders for fetches.",
      "Handle API errors gracefully.",
      "Add retry or refresh controls.",
      "Push to GitHub.",
    ],
    estimatedHours: 3,
    status: "LOCKED",
    points: 110,
  },
  {
    id: "task_w3d5",
    trackId: "track_001",
    weekNo: 3,
    dayNo: 5,
    title: "Activity Feed",
    taskDetails: "Create an activity feed that logs user actions in your app.",
    instructions: [
      "Store activity entries in the database.",
      "Render a timeline or feed UI.",
      "Display timestamps and event types.",
      "Add filtering by event type.",
      "Push to GitHub.",
    ],
    estimatedHours: 3,
    status: "LOCKED",
    points: 120,
  },
  // Full Stack Track — Week 4
  {
    id: "task_w4d1",
    trackId: "track_001",
    weekNo: 4,
    dayNo: 1,
    title: "Roles + Permissions",
    taskDetails: "Introduce role-based permissions for key actions.",
    instructions: [
      "Add a role field to your user model.",
      "Create at least two roles (admin, member).",
      "Protect one API route by role.",
      "Show role status in the UI.",
      "Push to GitHub.",
    ],
    estimatedHours: 4,
    status: "LOCKED",
    points: 140,
  },
  {
    id: "task_w4d2",
    trackId: "track_001",
    weekNo: 4,
    dayNo: 2,
    title: "Protected Routes",
    taskDetails: "Add middleware to guard protected pages and API routes.",
    instructions: [
      "Create middleware to check session tokens.",
      "Redirect unauthenticated users to sign-in.",
      "Guard at least one API route.",
      "Log access attempts for debugging.",
      "Push to GitHub.",
    ],
    estimatedHours: 3,
    status: "LOCKED",
    points: 120,
  },
  {
    id: "task_w4d3",
    trackId: "track_001",
    weekNo: 4,
    dayNo: 3,
    title: "Audit Log",
    taskDetails: "Track and display sensitive actions in an audit log.",
    instructions: [
      "Log create/update/delete events to a table.",
      "Include actor, action, and timestamp.",
      "Render the log in an admin view.",
      "Add a filter for action type.",
      "Push to GitHub.",
    ],
    estimatedHours: 3,
    status: "LOCKED",
    points: 120,
  },
  {
    id: "task_w4d4",
    trackId: "track_001",
    weekNo: 4,
    dayNo: 4,
    title: "Rate Limiting + Validation",
    taskDetails: "Add basic rate limiting and tighten request validation.",
    instructions: [
      "Add a simple rate limit to an API route.",
      "Validate payloads with a schema library.",
      "Return standard error responses.",
      "Add unit tests for validation.",
      "Push to GitHub.",
    ],
    estimatedHours: 3,
    status: "LOCKED",
    points: 110,
  },
  {
    id: "task_w4d5",
    trackId: "track_001",
    weekNo: 4,
    dayNo: 5,
    title: "Security Review",
    taskDetails: "Conduct a security pass and document fixes.",
    instructions: [
      "List top security risks in your app.",
      "Fix at least two issues.",
      "Add secure headers where possible.",
      "Document the review in README.",
      "Push to GitHub.",
    ],
    estimatedHours: 3,
    status: "LOCKED",
    points: 120,
  },
  // Full Stack Track — Week 5
  {
    id: "task_w5d1",
    trackId: "track_001",
    weekNo: 5,
    dayNo: 1,
    title: "Team Workspaces",
    taskDetails: "Add team workspaces with members and shared data.",
    instructions: [
      "Create a workspace model and relationships.",
      "Add UI to switch between workspaces.",
      "Limit data access by workspace.",
      "Add an invite flow UI.",
      "Push to GitHub.",
    ],
    estimatedHours: 4,
    status: "LOCKED",
    points: 140,
  },
  {
    id: "task_w5d2",
    trackId: "track_001",
    weekNo: 5,
    dayNo: 2,
    title: "Realtime Updates",
    taskDetails: "Add realtime updates using polling or Server-Sent Events.",
    instructions: [
      "Create a realtime endpoint.",
      "Update the UI when new data arrives.",
      "Handle disconnects gracefully.",
      "Show a live status indicator.",
      "Push to GitHub.",
    ],
    estimatedHours: 4,
    status: "LOCKED",
    points: 130,
  },
  {
    id: "task_w5d3",
    trackId: "track_001",
    weekNo: 5,
    dayNo: 3,
    title: "Notifications",
    taskDetails: "Implement in-app notifications for key events.",
    instructions: [
      "Create a notification model.",
      "Trigger notifications on key actions.",
      "Add a notification bell UI.",
      "Mark notifications as read.",
      "Push to GitHub.",
    ],
    estimatedHours: 3,
    status: "LOCKED",
    points: 120,
  },
  {
    id: "task_w5d4",
    trackId: "track_001",
    weekNo: 5,
    dayNo: 4,
    title: "Billing Plans UI",
    taskDetails: "Create a pricing page and plan gating for premium features.",
    instructions: [
      "Design a pricing page with 2-3 plans.",
      "Gate one feature behind a premium plan flag.",
      "Show an upgrade CTA in the UI.",
      "Store plan choice in the database.",
      "Push to GitHub.",
    ],
    estimatedHours: 3,
    status: "LOCKED",
    points: 120,
  },
  {
    id: "task_w5d5",
    trackId: "track_001",
    weekNo: 5,
    dayNo: 5,
    title: "Analytics Dashboard",
    taskDetails: "Add basic analytics cards and charts for key metrics.",
    instructions: [
      "Define 3-4 metrics and store them.",
      "Create stat cards for each metric.",
      "Add a simple chart view.",
      "Include date range filters.",
      "Push to GitHub.",
    ],
    estimatedHours: 3,
    status: "LOCKED",
    points: 120,
  },
  // Full Stack Track — Week 6
  {
    id: "task_w6d1",
    trackId: "track_001",
    weekNo: 6,
    dayNo: 1,
    title: "Unit Tests",
    taskDetails: "Add unit tests for critical helpers and UI components.",
    instructions: [
      "Set up a test runner.",
      "Write 4-6 unit tests.",
      "Add a coverage script.",
      "Document how to run tests.",
      "Push to GitHub.",
    ],
    estimatedHours: 3,
    status: "LOCKED",
    points: 120,
  },
  {
    id: "task_w6d2",
    trackId: "track_001",
    weekNo: 6,
    dayNo: 2,
    title: "API Integration Tests",
    taskDetails: "Create integration tests for your API routes.",
    instructions: [
      "Set up a test database or mock data.",
      "Write tests for create and list endpoints.",
      "Validate error responses.",
      "Ensure tests run in CI.",
      "Push to GitHub.",
    ],
    estimatedHours: 4,
    status: "LOCKED",
    points: 130,
  },
  {
    id: "task_w6d3",
    trackId: "track_001",
    weekNo: 6,
    dayNo: 3,
    title: "Performance Audit",
    taskDetails: "Run a performance audit and fix the top issues.",
    instructions: [
      "Use Lighthouse to audit performance.",
      "Fix the top 2-3 issues.",
      "Optimize images and fonts.",
      "Document improvements.",
      "Push to GitHub.",
    ],
    estimatedHours: 3,
    status: "LOCKED",
    points: 120,
  },
  {
    id: "task_w6d4",
    trackId: "track_001",
    weekNo: 6,
    dayNo: 4,
    title: "Caching Strategy",
    taskDetails: "Introduce caching for expensive queries or API responses.",
    instructions: [
      "Identify a slow query or endpoint.",
      "Add a caching layer.",
      "Set cache TTL and invalidation rules.",
      "Measure the speed improvement.",
      "Push to GitHub.",
    ],
    estimatedHours: 3,
    status: "LOCKED",
    points: 120,
  },
  {
    id: "task_w6d5",
    trackId: "track_001",
    weekNo: 6,
    dayNo: 5,
    title: "Accessibility + UX Polish",
    taskDetails: "Improve accessibility and UX details across the app.",
    instructions: [
      "Fix contrast and focus issues.",
      "Add aria labels for key controls.",
      "Improve empty and error states.",
      "Run a final UI pass.",
      "Push to GitHub.",
    ],
    estimatedHours: 2,
    status: "LOCKED",
    points: 100,
  },
  // Full Stack Track — Week 7
  {
    id: "task_w7d1",
    trackId: "track_001",
    weekNo: 7,
    dayNo: 1,
    title: "CI Pipeline",
    taskDetails: "Set up CI to run lint and tests on every push.",
    instructions: [
      "Create a GitHub Actions workflow.",
      "Run lint and test scripts.",
      "Fail the pipeline on errors.",
      "Add a status badge to README.",
      "Push to GitHub.",
    ],
    estimatedHours: 3,
    status: "LOCKED",
    points: 120,
  },
  {
    id: "task_w7d2",
    trackId: "track_001",
    weekNo: 7,
    dayNo: 2,
    title: "Environment + Secrets",
    taskDetails: "Harden environment configuration for staging and production.",
    instructions: [
      "Create a config module for env variables.",
      "Add validation for required vars.",
      "Prepare sample env templates.",
      "Document env setup steps.",
      "Push to GitHub.",
    ],
    estimatedHours: 2,
    status: "LOCKED",
    points: 100,
  },
  {
    id: "task_w7d3",
    trackId: "track_001",
    weekNo: 7,
    dayNo: 3,
    title: "Dockerize the App",
    taskDetails: "Create a Dockerfile and document local container usage.",
    instructions: [
      "Add a Dockerfile for the app.",
      "Add a docker-compose file for DB.",
      "Document build and run steps.",
      "Verify the app runs in a container.",
      "Push to GitHub.",
    ],
    estimatedHours: 3,
    status: "LOCKED",
    points: 120,
  },
  {
    id: "task_w7d4",
    trackId: "track_001",
    weekNo: 7,
    dayNo: 4,
    title: "Monitoring + Logs",
    taskDetails: "Add structured logging and basic health checks.",
    instructions: [
      "Add a health check endpoint.",
      "Log key events with structured logs.",
      "Add error tracking hooks.",
      "Document monitoring steps.",
      "Push to GitHub.",
    ],
    estimatedHours: 2,
    status: "LOCKED",
    points: 100,
  },
  {
    id: "task_w7d5",
    trackId: "track_001",
    weekNo: 7,
    dayNo: 5,
    title: "Release Checklist",
    taskDetails: "Prepare a release checklist and deployment notes.",
    instructions: [
      "Create a release checklist in README.",
      "Document rollback steps.",
      "Add a changelog entry.",
      "Tag a release in Git.",
      "Push to GitHub.",
    ],
    estimatedHours: 2,
    status: "LOCKED",
    points: 100,
  },
  // Full Stack Track — Week 8
  {
    id: "task_w8d1",
    trackId: "track_001",
    weekNo: 8,
    dayNo: 1,
    title: "Capstone Scope",
    taskDetails: "Define the scope and milestones for your capstone.",
    instructions: [
      "Write a one-page project brief.",
      "Define MVP features and stretch goals.",
      "Create a simple wireframe.",
      "Set delivery milestones.",
      "Push to GitHub.",
    ],
    estimatedHours: 2,
    status: "LOCKED",
    points: 90,
  },
  {
    id: "task_w8d2",
    trackId: "track_001",
    weekNo: 8,
    dayNo: 2,
    title: "Capstone Core Build",
    taskDetails: "Implement the core features of your capstone app.",
    instructions: [
      "Build the primary user flow.",
      "Connect the UI to the API.",
      "Add persistence with the database.",
      "Deploy a preview build.",
      "Push to GitHub.",
    ],
    estimatedHours: 5,
    status: "LOCKED",
    points: 160,
  },
  {
    id: "task_w8d3",
    trackId: "track_001",
    weekNo: 8,
    dayNo: 3,
    title: "Capstone Advanced Features",
    taskDetails: "Add advanced features and integrations.",
    instructions: [
      "Add one advanced feature (realtime, payments, or integrations).",
      "Improve UX for power users.",
      "Update data models as needed.",
      "Document feature usage.",
      "Push to GitHub.",
    ],
    estimatedHours: 4,
    status: "LOCKED",
    points: 150,
  },
  {
    id: "task_w8d4",
    trackId: "track_001",
    weekNo: 8,
    dayNo: 4,
    title: "Capstone QA + Polish",
    taskDetails: "Finalize UX, fix bugs, and prepare for demo.",
    instructions: [
      "Run a full QA checklist.",
      "Fix bugs and UX issues.",
      "Improve loading and error states.",
      "Prepare final deployment.",
      "Push to GitHub.",
    ],
    estimatedHours: 3,
    status: "LOCKED",
    points: 120,
  },
  {
    id: "task_w8d5",
    trackId: "track_001",
    weekNo: 8,
    dayNo: 5,
    title: "Capstone Demo + Docs",
    taskDetails: "Create a demo and publish project documentation.",
    instructions: [
      "Record or prepare a live demo.",
      "Write a detailed README.",
      "Add setup and deployment steps.",
      "Share the final GitHub link.",
      "Push to GitHub.",
    ],
    estimatedHours: 2,
    status: "LOCKED",
    points: 120,
  },
  // Frontend Track — Week 2
  {
    id: "task_fe_w2d1",
    trackId: "track_007",
    weekNo: 2,
    dayNo: 1,
    title: "Fetch + Render API Data",
    taskDetails: "Consume a public API and render the results with loading states.",
    instructions: [
      "Pick a public API and fetch data.",
      "Render a list with loading and empty states.",
      "Handle API errors gracefully.",
      "Keep the UI responsive.",
      "Push to GitHub.",
    ],
    estimatedHours: 3,
    status: "LOCKED",
    points: 100,
  },
  {
    id: "task_fe_w2d2",
    trackId: "track_007",
    weekNo: 2,
    dayNo: 2,
    title: "Search + Filter UI",
    taskDetails: "Add search and filter controls for the API data.",
    instructions: [
      "Create a search input and two filters.",
      "Apply filters client-side.",
      "Show active filter chips.",
      "Reset filters with one click.",
      "Push to GitHub.",
    ],
    estimatedHours: 3,
    status: "LOCKED",
    points: 100,
  },
  {
    id: "task_fe_w2d3",
    trackId: "track_007",
    weekNo: 2,
    dayNo: 3,
    title: "Form Validation",
    taskDetails: "Create a multi-field form with client-side validation.",
    instructions: [
      "Build a form with at least 4 fields.",
      "Add validation messages per field.",
      "Disable submit until valid.",
      "Show success confirmation.",
      "Push to GitHub.",
    ],
    estimatedHours: 3,
    status: "LOCKED",
    points: 100,
  },
  {
    id: "task_fe_w2d4",
    trackId: "track_007",
    weekNo: 2,
    dayNo: 4,
    title: "Local Storage Preferences",
    taskDetails: "Persist user preferences like theme or layout selection.",
    instructions: [
      "Add a toggle or selector for a preference.",
      "Save the value to localStorage.",
      "Load the preference on page load.",
      "Document the behavior.",
      "Push to GitHub.",
    ],
    estimatedHours: 2,
    status: "LOCKED",
    points: 90,
  },
  {
    id: "task_fe_w2d5",
    trackId: "track_007",
    weekNo: 2,
    dayNo: 5,
    title: "Performance Basics",
    taskDetails: "Optimize images and reduce layout shifts.",
    instructions: [
      "Add lazy loading to images.",
      "Set width/height for media.",
      "Reduce heavy effects on mobile.",
      "Re-run Lighthouse for score improvement.",
      "Push to GitHub.",
    ],
    estimatedHours: 2,
    status: "LOCKED",
    points: 90,
  },
  // Frontend Track — Week 3
  {
    id: "task_fe_w3d1",
    trackId: "track_007",
    weekNo: 3,
    dayNo: 1,
    title: "React State + Hooks",
    taskDetails: "Build a small app that uses useState and useEffect.",
    instructions: [
      "Create a component with stateful UI.",
      "Use useEffect for side effects.",
      "Clean up effects properly.",
      "Add a loading indicator.",
      "Push to GitHub.",
    ],
    estimatedHours: 3,
    status: "LOCKED",
    points: 110,
  },
  {
    id: "task_fe_w3d2",
    trackId: "track_007",
    weekNo: 3,
    dayNo: 2,
    title: "Reusable List Components",
    taskDetails: "Create reusable list and card components for data rendering.",
    instructions: [
      "Create a list component with props.",
      "Render at least two card variants.",
      "Add empty state UI.",
      "Add pagination controls.",
      "Push to GitHub.",
    ],
    estimatedHours: 3,
    status: "LOCKED",
    points: 110,
  },
  {
    id: "task_fe_w3d3",
    trackId: "track_007",
    weekNo: 3,
    dayNo: 3,
    title: "Controlled Forms",
    taskDetails: "Build controlled inputs with validation and helper text.",
    instructions: [
      "Create a form with controlled inputs.",
      "Add helper text and inline errors.",
      "Disable submit until valid.",
      "Reset form on submit.",
      "Push to GitHub.",
    ],
    estimatedHours: 3,
    status: "LOCKED",
    points: 110,
  },
  {
    id: "task_fe_w3d4",
    trackId: "track_007",
    weekNo: 3,
    dayNo: 4,
    title: "Theme Context",
    taskDetails: "Use React Context to manage theme state.",
    instructions: [
      "Create a ThemeContext provider.",
      "Add a toggle in the UI.",
      "Persist theme in localStorage.",
      "Apply theme classes globally.",
      "Push to GitHub.",
    ],
    estimatedHours: 3,
    status: "LOCKED",
    points: 110,
  },
  {
    id: "task_fe_w3d5",
    trackId: "track_007",
    weekNo: 3,
    dayNo: 5,
    title: "Component Testing",
    taskDetails: "Write tests for key components using a testing library.",
    instructions: [
      "Set up a test runner.",
      "Write tests for at least two components.",
      "Validate UI states and interactions.",
      "Add a test script to package.json.",
      "Push to GitHub.",
    ],
    estimatedHours: 3,
    status: "LOCKED",
    points: 120,
  },
  // Frontend Track — Week 4
  {
    id: "task_fe_w4d1",
    trackId: "track_007",
    weekNo: 4,
    dayNo: 1,
    title: "Data Fetching Library",
    taskDetails: "Use SWR or React Query to fetch and cache API data.",
    instructions: [
      "Install SWR or React Query.",
      "Fetch data with caching enabled.",
      "Add loading and error states.",
      "Invalidate cache on mutations.",
      "Push to GitHub.",
    ],
    estimatedHours: 3,
    status: "LOCKED",
    points: 120,
  },
  {
    id: "task_fe_w4d2",
    trackId: "track_007",
    weekNo: 4,
    dayNo: 2,
    title: "Pagination + Skeletons",
    taskDetails: "Add pagination and skeleton loaders for list views.",
    instructions: [
      "Implement pagination controls.",
      "Render skeleton cards during loading.",
      "Handle empty states.",
      "Keep pagination state in URL.",
      "Push to GitHub.",
    ],
    estimatedHours: 3,
    status: "LOCKED",
    points: 120,
  },
  {
    id: "task_fe_w4d3",
    trackId: "track_007",
    weekNo: 4,
    dayNo: 3,
    title: "Error Boundaries",
    taskDetails: "Add error boundaries to prevent UI crashes.",
    instructions: [
      "Create an error boundary component.",
      "Wrap key sections with it.",
      "Add fallback UI with retry.",
      "Log errors in the console.",
      "Push to GitHub.",
    ],
    estimatedHours: 2,
    status: "LOCKED",
    points: 100,
  },
  {
    id: "task_fe_w4d4",
    trackId: "track_007",
    weekNo: 4,
    dayNo: 4,
    title: "Optimistic UI",
    taskDetails: "Add optimistic UI for create or update actions.",
    instructions: [
      "Update UI before the API response.",
      "Rollback on error.",
      "Show pending status.",
      "Handle retries.",
      "Push to GitHub.",
    ],
    estimatedHours: 2,
    status: "LOCKED",
    points: 110,
  },
  {
    id: "task_fe_w4d5",
    trackId: "track_007",
    weekNo: 4,
    dayNo: 5,
    title: "Sortable Data Table",
    taskDetails: "Build a table with sorting and column filters.",
    instructions: [
      "Create a table with at least 5 columns.",
      "Add sort toggles per column.",
      "Add filters for two columns.",
      "Keep the table responsive.",
      "Push to GitHub.",
    ],
    estimatedHours: 3,
    status: "LOCKED",
    points: 120,
  },
  // Frontend Track — Week 5
  {
    id: "task_fe_w5d1",
    trackId: "track_007",
    weekNo: 5,
    dayNo: 1,
    title: "App Router Layouts",
    taskDetails: "Build a multi-page layout with shared navigation.",
    instructions: [
      "Create a root layout and nested layouts.",
      "Add a shared navbar and footer.",
      "Use route groups for sections.",
      "Add active nav styling.",
      "Push to GitHub.",
    ],
    estimatedHours: 3,
    status: "LOCKED",
    points: 120,
  },
  {
    id: "task_fe_w5d2",
    trackId: "track_007",
    weekNo: 5,
    dayNo: 2,
    title: "Dynamic Routes + Metadata",
    taskDetails: "Implement dynamic pages and SEO metadata.",
    instructions: [
      "Create a dynamic route (slug or id).",
      "Render data per route.",
      "Add metadata for SEO.",
      "Add 404 handling.",
      "Push to GitHub.",
    ],
    estimatedHours: 3,
    status: "LOCKED",
    points: 120,
  },
  {
    id: "task_fe_w5d3",
    trackId: "track_007",
    weekNo: 5,
    dayNo: 3,
    title: "Server Components",
    taskDetails: "Fetch data on the server and stream content.",
    instructions: [
      "Fetch data in a server component.",
      "Add a loading UI with Suspense.",
      "Compare server vs client fetching.",
      "Document the tradeoffs.",
      "Push to GitHub.",
    ],
    estimatedHours: 3,
    status: "LOCKED",
    points: 120,
  },
  {
    id: "task_fe_w5d4",
    trackId: "track_007",
    weekNo: 5,
    dayNo: 4,
    title: "SEO + Open Graph",
    taskDetails: "Add SEO enhancements and Open Graph images.",
    instructions: [
      "Add metadata for key pages.",
      "Create Open Graph images.",
      "Add Twitter card metadata.",
      "Validate with an SEO tool.",
      "Push to GitHub.",
    ],
    estimatedHours: 2,
    status: "LOCKED",
    points: 110,
  },
  {
    id: "task_fe_w5d5",
    trackId: "track_007",
    weekNo: 5,
    dayNo: 5,
    title: "Deploy + Performance Budget",
    taskDetails: "Deploy the app and set a performance budget.",
    instructions: [
      "Deploy to Vercel or Netlify.",
      "Set a performance budget target.",
      "Optimize to meet the budget.",
      "Document final scores.",
      "Push to GitHub.",
    ],
    estimatedHours: 2,
    status: "LOCKED",
    points: 110,
  },
  // Frontend Track — Week 6
  {
    id: "task_fe_w6d1",
    trackId: "track_007",
    weekNo: 6,
    dayNo: 1,
    title: "Design Tokens",
    taskDetails: "Define a scalable design token system for color, spacing, and typography.",
    instructions: [
      "Create token variables for color and spacing.",
      "Apply a consistent typography scale.",
      "Document token usage.",
      "Refactor UI to use tokens.",
      "Push to GitHub.",
    ],
    estimatedHours: 3,
    status: "LOCKED",
    points: 120,
  },
  {
    id: "task_fe_w6d2",
    trackId: "track_007",
    weekNo: 6,
    dayNo: 2,
    title: "Component Library",
    taskDetails: "Build reusable button, input, and card components.",
    instructions: [
      "Create 3-5 reusable components.",
      "Add size and variant props.",
      "Document usage examples.",
      "Add hover and focus states.",
      "Push to GitHub.",
    ],
    estimatedHours: 3,
    status: "LOCKED",
    points: 120,
  },
  {
    id: "task_fe_w6d3",
    trackId: "track_007",
    weekNo: 6,
    dayNo: 3,
    title: "Motion Design",
    taskDetails: "Add motion to key UI elements with Framer Motion.",
    instructions: [
      "Animate page entry for one section.",
      "Add hover animations to cards.",
      "Keep motion subtle and purposeful.",
      "Test on mobile performance.",
      "Push to GitHub.",
    ],
    estimatedHours: 3,
    status: "LOCKED",
    points: 120,
  },
  {
    id: "task_fe_w6d4",
    trackId: "track_007",
    weekNo: 6,
    dayNo: 4,
    title: "Micro-interactions",
    taskDetails: "Add small UI interactions for feedback and delight.",
    instructions: [
      "Add button press states.",
      "Add inline validation feedback.",
      "Add a subtle toast notification.",
      "Ensure interactions are accessible.",
      "Push to GitHub.",
    ],
    estimatedHours: 2,
    status: "LOCKED",
    points: 110,
  },
  {
    id: "task_fe_w6d5",
    trackId: "track_007",
    weekNo: 6,
    dayNo: 5,
    title: "Dark Mode + Themes",
    taskDetails: "Implement a full theme system with light/dark modes.",
    instructions: [
      "Add theme tokens for light and dark modes.",
      "Create a theme toggle component.",
      "Persist the chosen theme.",
      "Ensure color contrast is compliant.",
      "Push to GitHub.",
    ],
    estimatedHours: 3,
    status: "LOCKED",
    points: 120,
  },
  // Frontend Track — Week 7
  {
    id: "task_fe_w7d1",
    trackId: "track_007",
    weekNo: 7,
    dayNo: 1,
    title: "Keyboard Navigation Audit",
    taskDetails: "Ensure the app is fully usable with a keyboard.",
    instructions: [
      "Test navigation with Tab and Shift+Tab.",
      "Fix focus order issues.",
      "Add skip-to-content link.",
      "Document fixes.",
      "Push to GitHub.",
    ],
    estimatedHours: 2,
    status: "LOCKED",
    points: 100,
  },
  {
    id: "task_fe_w7d2",
    trackId: "track_007",
    weekNo: 7,
    dayNo: 2,
    title: "ARIA + Semantics",
    taskDetails: "Improve semantic HTML and ARIA labeling.",
    instructions: [
      "Add semantic tags for layout.",
      "Add aria labels for controls.",
      "Fix heading hierarchy.",
      "Re-run a11y audit.",
      "Push to GitHub.",
    ],
    estimatedHours: 2,
    status: "LOCKED",
    points: 100,
  },
  {
    id: "task_fe_w7d3",
    trackId: "track_007",
    weekNo: 7,
    dayNo: 3,
    title: "UI Unit Tests",
    taskDetails: "Add tests for critical UI flows.",
    instructions: [
      "Write tests for form validation.",
      "Test a list rendering scenario.",
      "Test a modal or dialog flow.",
      "Update test coverage.",
      "Push to GitHub.",
    ],
    estimatedHours: 3,
    status: "LOCKED",
    points: 110,
  },
  {
    id: "task_fe_w7d4",
    trackId: "track_007",
    weekNo: 7,
    dayNo: 4,
    title: "Responsive QA Pass",
    taskDetails: "Audit the UI across breakpoints and fix layout issues.",
    instructions: [
      "Test mobile, tablet, and desktop views.",
      "Fix layout shifts or overflow issues.",
      "Adjust spacing for small screens.",
      "Document changes in README.",
      "Push to GitHub.",
    ],
    estimatedHours: 2,
    status: "LOCKED",
    points: 100,
  },
  {
    id: "task_fe_w7d5",
    trackId: "track_007",
    weekNo: 7,
    dayNo: 5,
    title: "Accessibility Report",
    taskDetails: "Write a short accessibility report with before/after fixes.",
    instructions: [
      "Capture a11y audit results.",
      "List issues and fixes.",
      "Add screenshots if needed.",
      "Publish the report in README.",
      "Push to GitHub.",
    ],
    estimatedHours: 2,
    status: "LOCKED",
    points: 100,
  },
  // Frontend Track — Week 8
  {
    id: "task_fe_w8d1",
    trackId: "track_007",
    weekNo: 8,
    dayNo: 1,
    title: "Capstone Plan",
    taskDetails: "Define the product idea, scope, and design direction.",
    instructions: [
      "Write a short product brief.",
      "Create a moodboard or style guide.",
      "Define the UI scope.",
      "Set delivery milestones.",
      "Push to GitHub.",
    ],
    estimatedHours: 2,
    status: "LOCKED",
    points: 90,
  },
  {
    id: "task_fe_w8d2",
    trackId: "track_007",
    weekNo: 8,
    dayNo: 2,
    title: "Capstone Core UI",
    taskDetails: "Build the core screens of your frontend capstone.",
    instructions: [
      "Implement the main navigation and layout.",
      "Build core pages and components.",
      "Add mock data flows.",
      "Deploy a preview build.",
      "Push to GitHub.",
    ],
    estimatedHours: 4,
    status: "LOCKED",
    points: 140,
  },
  {
    id: "task_fe_w8d3",
    trackId: "track_007",
    weekNo: 8,
    dayNo: 3,
    title: "Capstone Advanced UI",
    taskDetails: "Add advanced components and micro-interactions.",
    instructions: [
      "Add complex components like charts or tables.",
      "Add animation where helpful.",
      "Improve navigation flow.",
      "Refine visual hierarchy.",
      "Push to GitHub.",
    ],
    estimatedHours: 4,
    status: "LOCKED",
    points: 140,
  },
  {
    id: "task_fe_w8d4",
    trackId: "track_007",
    weekNo: 8,
    dayNo: 4,
    title: "Capstone Polish",
    taskDetails: "Finalize responsiveness and UI polish.",
    instructions: [
      "Fix spacing and alignment issues.",
      "Ensure typography consistency.",
      "Polish hover and focus states.",
      "Run a final UI audit.",
      "Push to GitHub.",
    ],
    estimatedHours: 3,
    status: "LOCKED",
    points: 120,
  },
  {
    id: "task_fe_w8d5",
    trackId: "track_007",
    weekNo: 8,
    dayNo: 5,
    title: "Deploy + Case Study",
    taskDetails: "Deploy the project and write a short case study.",
    instructions: [
      "Deploy to a public URL.",
      "Write a case study summary.",
      "Include screenshots and metrics.",
      "Share the final GitHub link.",
      "Push to GitHub.",
    ],
    estimatedHours: 2,
    status: "LOCKED",
    points: 120,
  },
  // Backend Track — Week 2
  {
    id: "task_be_w2d1",
    trackId: "track_008",
    weekNo: 2,
    dayNo: 1,
    title: "REST API Design",
    taskDetails: "Design REST endpoints and resource naming conventions.",
    instructions: [
      "Define a resource and REST routes.",
      "Create route handlers for CRUD.",
      "Add request validation.",
      "Document endpoints in README.",
      "Push to GitHub.",
    ],
    estimatedHours: 3,
    status: "LOCKED",
    points: 110,
  },
  {
    id: "task_be_w2d2",
    trackId: "track_008",
    weekNo: 2,
    dayNo: 2,
    title: "Middleware + Validation",
    taskDetails: "Create middleware for validation, auth, and logging.",
    instructions: [
      "Add request validation middleware.",
      "Add request logging middleware.",
      "Apply middleware to routes.",
      "Return standardized errors.",
      "Push to GitHub.",
    ],
    estimatedHours: 3,
    status: "LOCKED",
    points: 110,
  },
  {
    id: "task_be_w2d3",
    trackId: "track_008",
    weekNo: 2,
    dayNo: 3,
    title: "Pagination + Filtering",
    taskDetails: "Add pagination, filtering, and sorting to list endpoints.",
    instructions: [
      "Add pagination query params.",
      "Implement filtering by status or type.",
      "Add sorting options.",
      "Document query parameters.",
      "Push to GitHub.",
    ],
    estimatedHours: 3,
    status: "LOCKED",
    points: 110,
  },
  {
    id: "task_be_w2d4",
    trackId: "track_008",
    weekNo: 2,
    dayNo: 4,
    title: "Error Handling + Logging",
    taskDetails: "Create centralized error handling and structured logs.",
    instructions: [
      "Add a global error handler.",
      "Return consistent error shapes.",
      "Log errors with context.",
      "Add basic request tracing.",
      "Push to GitHub.",
    ],
    estimatedHours: 3,
    status: "LOCKED",
    points: 110,
  },
  {
    id: "task_be_w2d5",
    trackId: "track_008",
    weekNo: 2,
    dayNo: 5,
    title: "OpenAPI Docs",
    taskDetails: "Create OpenAPI or Swagger docs for your API.",
    instructions: [
      "Define schemas for requests and responses.",
      "Document all endpoints.",
      "Add example payloads.",
      "Publish a docs URL or file.",
      "Push to GitHub.",
    ],
    estimatedHours: 2,
    status: "LOCKED",
    points: 100,
  },
  // Backend Track — Week 3
  {
    id: "task_be_w3d1",
    trackId: "track_008",
    weekNo: 3,
    dayNo: 1,
    title: "Schema Design",
    taskDetails: "Design a PostgreSQL schema for your domain.",
    instructions: [
      "Create an ER diagram.",
      "Define tables and relationships.",
      "Add constraints and defaults.",
      "Document the schema.",
      "Push to GitHub.",
    ],
    estimatedHours: 3,
    status: "LOCKED",
    points: 120,
  },
  {
    id: "task_be_w3d2",
    trackId: "track_008",
    weekNo: 3,
    dayNo: 2,
    title: "Prisma CRUD",
    taskDetails: "Create Prisma models and implement CRUD operations.",
    instructions: [
      "Define Prisma models.",
      "Run migrations.",
      "Implement CRUD endpoints.",
      "Add validation tests.",
      "Push to GitHub.",
    ],
    estimatedHours: 4,
    status: "LOCKED",
    points: 130,
  },
  {
    id: "task_be_w3d3",
    trackId: "track_008",
    weekNo: 3,
    dayNo: 3,
    title: "Migrations + Seed",
    taskDetails: "Create migration scripts and seed test data.",
    instructions: [
      "Create a seed script.",
      "Add sample data records.",
      "Document how to run seeds.",
      "Verify data integrity.",
      "Push to GitHub.",
    ],
    estimatedHours: 3,
    status: "LOCKED",
    points: 120,
  },
  {
    id: "task_be_w3d4",
    trackId: "track_008",
    weekNo: 3,
    dayNo: 4,
    title: "Indexes + Optimization",
    taskDetails: "Add indexes and optimize slow queries.",
    instructions: [
      "Identify a slow query.",
      "Add indexes where needed.",
      "Measure performance before/after.",
      "Document improvements.",
      "Push to GitHub.",
    ],
    estimatedHours: 3,
    status: "LOCKED",
    points: 120,
  },
  {
    id: "task_be_w3d5",
    trackId: "track_008",
    weekNo: 3,
    dayNo: 5,
    title: "Transactions + Constraints",
    taskDetails: "Use transactions and constraints to ensure data integrity.",
    instructions: [
      "Add a transaction-based flow.",
      "Use unique and foreign key constraints.",
      "Handle rollbacks on error.",
      "Document edge cases.",
      "Push to GitHub.",
    ],
    estimatedHours: 3,
    status: "LOCKED",
    points: 120,
  },
  // Backend Track — Week 4
  {
    id: "task_be_w4d1",
    trackId: "track_008",
    weekNo: 4,
    dayNo: 1,
    title: "JWT Authentication",
    taskDetails: "Implement JWT-based authentication for protected routes.",
    instructions: [
      "Add login and token issuance.",
      "Secure routes with auth middleware.",
      "Handle token expiration.",
      "Document auth flow.",
      "Push to GitHub.",
    ],
    estimatedHours: 4,
    status: "LOCKED",
    points: 130,
  },
  {
    id: "task_be_w4d2",
    trackId: "track_008",
    weekNo: 4,
    dayNo: 2,
    title: "Password Hashing",
    taskDetails: "Store passwords securely using hashing and salts.",
    instructions: [
      "Add hashing for password storage.",
      "Validate password strength.",
      "Add password reset flow.",
      "Document security decisions.",
      "Push to GitHub.",
    ],
    estimatedHours: 3,
    status: "LOCKED",
    points: 120,
  },
  {
    id: "task_be_w4d3",
    trackId: "track_008",
    weekNo: 4,
    dayNo: 3,
    title: "Role-Based Access",
    taskDetails: "Add RBAC to restrict sensitive endpoints.",
    instructions: [
      "Add roles to user data.",
      "Restrict endpoints by role.",
      "Add admin-only routes.",
      "Document role permissions.",
      "Push to GitHub.",
    ],
    estimatedHours: 3,
    status: "LOCKED",
    points: 120,
  },
  {
    id: "task_be_w4d4",
    trackId: "track_008",
    weekNo: 4,
    dayNo: 4,
    title: "Rate Limiting",
    taskDetails: "Add rate limiting to protect against abuse.",
    instructions: [
      "Configure a rate limiter.",
      "Apply it to critical endpoints.",
      "Return clear limit errors.",
      "Log limit violations.",
      "Push to GitHub.",
    ],
    estimatedHours: 2,
    status: "LOCKED",
    points: 110,
  },
  {
    id: "task_be_w4d5",
    trackId: "track_008",
    weekNo: 4,
    dayNo: 5,
    title: "Security Checklist",
    taskDetails: "Run a security checklist and fix critical issues.",
    instructions: [
      "Run a security audit checklist.",
      "Fix at least two issues.",
      "Document findings in README.",
      "Add secure headers.",
      "Push to GitHub.",
    ],
    estimatedHours: 2,
    status: "LOCKED",
    points: 110,
  },
  // Backend Track — Week 5
  {
    id: "task_be_w5d1",
    trackId: "track_008",
    weekNo: 5,
    dayNo: 1,
    title: "Redis Caching",
    taskDetails: "Cache expensive API responses using Redis.",
    instructions: [
      "Set up Redis locally.",
      "Cache one list endpoint.",
      "Set TTL and cache keys.",
      "Measure response time improvements.",
      "Push to GitHub.",
    ],
    estimatedHours: 3,
    status: "LOCKED",
    points: 120,
  },
  {
    id: "task_be_w5d2",
    trackId: "track_008",
    weekNo: 5,
    dayNo: 2,
    title: "Cache Invalidation",
    taskDetails: "Design cache invalidation rules for updates.",
    instructions: [
      "Invalidate cache on create/update.",
      "Use tags or keys for invalidation.",
      "Handle cache misses gracefully.",
      "Document strategy.",
      "Push to GitHub.",
    ],
    estimatedHours: 2,
    status: "LOCKED",
    points: 110,
  },
  {
    id: "task_be_w5d3",
    trackId: "track_008",
    weekNo: 5,
    dayNo: 3,
    title: "Background Jobs",
    taskDetails: "Add a job queue for async tasks.",
    instructions: [
      "Create a job worker.",
      "Queue a background job on API request.",
      "Handle failures and retries.",
      "Log job status.",
      "Push to GitHub.",
    ],
    estimatedHours: 3,
    status: "LOCKED",
    points: 120,
  },
  {
    id: "task_be_w5d4",
    trackId: "track_008",
    weekNo: 5,
    dayNo: 4,
    title: "Retry + Dead Letter",
    taskDetails: "Add retry strategies and dead-letter handling.",
    instructions: [
      "Add a retry policy for jobs.",
      "Create a dead-letter queue.",
      "Alert when jobs fail.",
      "Document recovery steps.",
      "Push to GitHub.",
    ],
    estimatedHours: 2,
    status: "LOCKED",
    points: 110,
  },
  {
    id: "task_be_w5d5",
    trackId: "track_008",
    weekNo: 5,
    dayNo: 5,
    title: "Load Testing",
    taskDetails: "Run a basic load test and document results.",
    instructions: [
      "Use a load testing tool.",
      "Test one key endpoint.",
      "Record latency and throughput.",
      "Document optimizations.",
      "Push to GitHub.",
    ],
    estimatedHours: 2,
    status: "LOCKED",
    points: 110,
  },
  // Backend Track — Week 6
  {
    id: "task_be_w6d1",
    trackId: "track_008",
    weekNo: 6,
    dayNo: 1,
    title: "Service Layer",
    taskDetails: "Refactor business logic into a service layer.",
    instructions: [
      "Create a service folder.",
      "Move business logic from routes.",
      "Keep routes thin and clean.",
      "Add unit tests for services.",
      "Push to GitHub.",
    ],
    estimatedHours: 3,
    status: "LOCKED",
    points: 120,
  },
  {
    id: "task_be_w6d2",
    trackId: "track_008",
    weekNo: 6,
    dayNo: 2,
    title: "Event Messaging",
    taskDetails: "Emit events for critical actions and handle them.",
    instructions: [
      "Create an event emitter module.",
      "Emit events for create/update.",
      "Handle events in background workers.",
      "Log event processing.",
      "Push to GitHub.",
    ],
    estimatedHours: 3,
    status: "LOCKED",
    points: 120,
  },
  {
    id: "task_be_w6d3",
    trackId: "track_008",
    weekNo: 6,
    dayNo: 3,
    title: "Webhooks",
    taskDetails: "Implement webhook delivery for external integrations.",
    instructions: [
      "Create a webhook model.",
      "Send webhooks on key events.",
      "Handle retries for failures.",
      "Document webhook payloads.",
      "Push to GitHub.",
    ],
    estimatedHours: 3,
    status: "LOCKED",
    points: 120,
  },
  {
    id: "task_be_w6d4",
    trackId: "track_008",
    weekNo: 6,
    dayNo: 4,
    title: "Idempotency Keys",
    taskDetails: "Add idempotency keys for safe retries.",
    instructions: [
      "Accept an idempotency header.",
      "Store request fingerprints.",
      "Prevent duplicate operations.",
      "Document usage.",
      "Push to GitHub.",
    ],
    estimatedHours: 2,
    status: "LOCKED",
    points: 110,
  },
  {
    id: "task_be_w6d5",
    trackId: "track_008",
    weekNo: 6,
    dayNo: 5,
    title: "API Versioning",
    taskDetails: "Add versioning strategy for your API.",
    instructions: [
      "Pick a versioning strategy (path or header).",
      "Create v1 endpoints.",
      "Document versioning rules.",
      "Plan v2 changes.",
      "Push to GitHub.",
    ],
    estimatedHours: 2,
    status: "LOCKED",
    points: 110,
  },
  // Backend Track — Week 7
  {
    id: "task_be_w7d1",
    trackId: "track_008",
    weekNo: 7,
    dayNo: 1,
    title: "Structured Logging",
    taskDetails: "Add structured JSON logs for requests and errors.",
    instructions: [
      "Use a logger library.",
      "Log request IDs and status codes.",
      "Log errors with context.",
      "Document log format.",
      "Push to GitHub.",
    ],
    estimatedHours: 2,
    status: "LOCKED",
    points: 110,
  },
  {
    id: "task_be_w7d2",
    trackId: "track_008",
    weekNo: 7,
    dayNo: 2,
    title: "Metrics + Health Checks",
    taskDetails: "Expose health checks and basic metrics.",
    instructions: [
      "Add a health endpoint.",
      "Track request counts and latency.",
      "Expose metrics in a route.",
      "Document how to read metrics.",
      "Push to GitHub.",
    ],
    estimatedHours: 2,
    status: "LOCKED",
    points: 110,
  },
  {
    id: "task_be_w7d3",
    trackId: "track_008",
    weekNo: 7,
    dayNo: 3,
    title: "Dockerize the API",
    taskDetails: "Containerize the API with Docker.",
    instructions: [
      "Create a Dockerfile.",
      "Add a docker-compose file.",
      "Run the API in a container.",
      "Document local setup.",
      "Push to GitHub.",
    ],
    estimatedHours: 3,
    status: "LOCKED",
    points: 120,
  },
  {
    id: "task_be_w7d4",
    trackId: "track_008",
    weekNo: 7,
    dayNo: 4,
    title: "CI Pipeline",
    taskDetails: "Add CI to run tests and lint on push.",
    instructions: [
      "Create a GitHub Actions workflow.",
      "Run lint and tests.",
      "Fail the build on errors.",
      "Add a status badge.",
      "Push to GitHub.",
    ],
    estimatedHours: 2,
    status: "LOCKED",
    points: 110,
  },
  {
    id: "task_be_w7d5",
    trackId: "track_008",
    weekNo: 7,
    dayNo: 5,
    title: "Deployment + Rollback",
    taskDetails: "Deploy the API and document rollback steps.",
    instructions: [
      "Deploy to a hosting provider.",
      "Document environment variables.",
      "Add rollback steps.",
      "Verify health checks post-deploy.",
      "Push to GitHub.",
    ],
    estimatedHours: 2,
    status: "LOCKED",
    points: 110,
  },
  // Backend Track — Week 8
  {
    id: "task_be_w8d1",
    trackId: "track_008",
    weekNo: 8,
    dayNo: 1,
    title: "Capstone Plan",
    taskDetails: "Define scope, endpoints, and data model for the capstone API.",
    instructions: [
      "Write a project brief.",
      "Design endpoints and data model.",
      "Define success criteria.",
      "Set milestones.",
      "Push to GitHub.",
    ],
    estimatedHours: 2,
    status: "LOCKED",
    points: 90,
  },
  {
    id: "task_be_w8d2",
    trackId: "track_008",
    weekNo: 8,
    dayNo: 2,
    title: "Capstone Core Endpoints",
    taskDetails: "Build core CRUD endpoints and validations.",
    instructions: [
      "Implement core routes.",
      "Add validation and errors.",
      "Write tests for endpoints.",
      "Deploy a preview build.",
      "Push to GitHub.",
    ],
    estimatedHours: 4,
    status: "LOCKED",
    points: 140,
  },
  {
    id: "task_be_w8d3",
    trackId: "track_008",
    weekNo: 8,
    dayNo: 3,
    title: "Capstone Auth + DB",
    taskDetails: "Integrate authentication and database persistence.",
    instructions: [
      "Add auth guards to routes.",
      "Connect routes to database models.",
      "Handle migrations and seeds.",
      "Update API docs.",
      "Push to GitHub.",
    ],
    estimatedHours: 4,
    status: "LOCKED",
    points: 140,
  },
  {
    id: "task_be_w8d4",
    trackId: "track_008",
    weekNo: 8,
    dayNo: 4,
    title: "Capstone Tests + Docs",
    taskDetails: "Finalize tests and complete documentation.",
    instructions: [
      "Write integration tests.",
      "Add OpenAPI docs.",
      "Document setup steps.",
      "Polish README.",
      "Push to GitHub.",
    ],
    estimatedHours: 3,
    status: "LOCKED",
    points: 130,
  },
  {
    id: "task_be_w8d5",
    trackId: "track_008",
    weekNo: 8,
    dayNo: 5,
    title: "Capstone Deploy + Demo",
    taskDetails: "Deploy the API and prepare a demo walkthrough.",
    instructions: [
      "Deploy to production.",
      "Verify endpoints with a client.",
      "Prepare demo steps.",
      "Share the final GitHub link.",
      "Push to GitHub.",
    ],
    estimatedHours: 2,
    status: "LOCKED",
    points: 120,
  },
];

// Dynamic task generator for non-primary tracks
const generateTasksForTracks = (): WeeklyTask[] => {
  const generated: WeeklyTask[] = [];
  const dynamicTrackIds = ["track_002", "track_003", "track_004", "track_005", "track_006"];

  for (const trackId of dynamicTrackIds) {
    const roadmap = TRACK_ROADMAPS[trackId];
    if (!roadmap) continue;

    for (const week of roadmap) {
      for (let day = 1; day <= 5; day++) {
        let taskTitle = "";
        let details = "";
        let instructions: string[] = [];

        // Distribute focus and titles dynamically based on days
        if (day === 1) {
          taskTitle = `Introduction to ${week.title}`;
          details = `Understand the core principles of ${week.title} and setup the local workspace.`;
          instructions = [
            `Install required software and dependencies for ${week.title}.`,
            `Read the initial guide on ${week.focus}.`,
            `Complete a basic configuration check.`,
            `Push your setup files to GitHub.`,
          ];
        } else if (day === 2) {
          taskTitle = `Hands-on Practice: ${week.outcomes[0]}`;
          details = `Implement a simple project to achieve the outcome: ${week.outcomes[0]}.`;
          instructions = [
            `Create a new workspace module.`,
            `Implement code logic for ${week.outcomes[0]}.`,
            `Test local executions with dynamic input parameters.`,
            `Push code changes to your repository.`,
          ];
        } else if (day === 3) {
          taskTitle = `Data & Integration: ${week.outcomes[1] || week.outcomes[0]}`;
          details = `Connect data structures and execute workflows mapping to: ${week.outcomes[1] || week.outcomes[0]}.`;
          instructions = [
            `Connect your local module to external data inputs.`,
            `Write scripts to parse and normalize dataset schemas.`,
            `Confirm correct outputs and run diagnostics.`,
            `Save work in a public GitHub repo.`,
          ];
        } else if (day === 4) {
          taskTitle = `Refactoring & Quality Check`;
          details = `Polish the codebase, add error boundaries, and optimize configurations.`;
          instructions = [
            `Refactor existing helper functions for readability.`,
            `Add basic error handling and logging.`,
            `Optimize execution times and profile performance.`,
            `Commit and push code.`,
          ];
        } else {
          taskTitle = `Weekly Project: ${week.project}`;
          details = `Build and deliver the weekly project: ${week.project}.`;
          instructions = [
            `Design the system architecture for ${week.project}.`,
            `Implement all core features specified in the requirements.`,
            `Verify compatibility and write a comprehensive README.`,
            `Deploy to a hosting provider or verify container runs.`,
            `Submit your repository link.`,
          ];
        }

        generated.push({
          id: `task_${trackId.slice(6)}_w${week.weekNo}d${day}`,
          trackId,
          weekNo: week.weekNo,
          dayNo: day,
          title: taskTitle,
          taskDetails: details,
          instructions,
          estimatedHours: day === 5 ? 4 : 2,
          status: "LOCKED",
          points: day === 5 ? 150 : 80,
        });
      }
    }
  }
  return generated;
};

export const WEEKLY_TASKS: WeeklyTask[] = [
  ...STATIC_WEEKLY_TASKS,
  ...generateTasksForTracks(),
];

// ── Badges ───────────────────────────────────────────────────
export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  earned: boolean;
  earnedDate?: string;
}

export const BADGES: Badge[] = [
  { id: "badge_001", name: "First Commit", description: "Submitted your very first task", icon: "GitCommit", color: "#00F5FF", earned: true, earnedDate: "2026-04-02" },
  { id: "badge_002", name: "Week 1 Warrior", description: "Completed all 5 tasks in Week 1", icon: "Swords", color: "#A855F7", earned: true, earnedDate: "2026-04-06" },
  { id: "badge_003", name: "Speed Coder", description: "Submitted a task 2 hours early", icon: "Zap", color: "#F59E0B", earned: true, earnedDate: "2026-04-03" },
  { id: "badge_004", name: "Glassmorphism Pro", description: "Built a glass-effect UI component", icon: "Layers", color: "#00BFA5", earned: true, earnedDate: "2026-04-04" },
  { id: "badge_005", name: "API Architect", description: "Built and documented a REST API", icon: "Network", color: "#EC4899", earned: false },
  { id: "badge_006", name: "Database Wizard", description: "Connected Prisma to PostgreSQL", icon: "Database", color: "#FF6B35", earned: false },
  { id: "badge_007", name: "Deployment King", description: "Deployed 5 projects to production", icon: "Rocket", color: "#6366F1", earned: false },
  { id: "badge_008", name: "Streak Master", description: "Maintained a 14-day submission streak", icon: "Flame", color: "#EF4444", earned: false },
];

// ── Submissions ───────────────────────────────────────────────
export interface Submission {
  id: string;
  userId: string;
  taskId: string;
  taskTitle: string;
  githubUrl: string;
  liveUrl?: string;
  linkedinUrl?: string;
  status: SubmissionStatus;
  feedback?: string;
  submittedAt: string;
  reviewedAt?: string;
  points: number;
}

export const SUBMISSIONS: Submission[] = [
  {
    id: "sub_001", userId: "usr_001", taskId: "task_w1d1", taskTitle: "Build a Next.js Navbar",
    githubUrl: "https://github.com/alex-johnson/connexode-week1-navbar",
    liveUrl: "https://connexode-navbar.vercel.app",
    linkedinUrl: "https://www.linkedin.com/posts/alex-johnson_connexode-navbar-activity-12345",
    status: "APPROVED", feedback: "Excellent glassmorphism implementation! Clean code structure.",
    submittedAt: "2026-04-02T14:30:00Z", reviewedAt: "2026-04-03T09:00:00Z", points: 100,
  },
  {
    id: "sub_002", userId: "usr_001", taskId: "task_w1d2", taskTitle: "Hero Section with Animation",
    githubUrl: "https://github.com/alex-johnson/connexode-week1-hero",
    liveUrl: "https://connexode-hero.vercel.app",
    linkedinUrl: "https://www.linkedin.com/posts/alex-johnson_connexode-hero-activity-12346",
    status: "APPROVED", feedback: "Smooth animations. Great attention to detail on the typewriter effect.",
    submittedAt: "2026-04-03T16:00:00Z", reviewedAt: "2026-04-04T10:00:00Z", points: 120,
  },
  {
    id: "sub_003", userId: "usr_001", taskId: "task_w1d3", taskTitle: "Feature Cards Grid",
    githubUrl: "https://github.com/alex-johnson/connexode-week1-cards",
    liveUrl: "https://connexode-cards.vercel.app",
    status: "PENDING",
    submittedAt: "2026-04-05T12:00:00Z", points: 0,
  },
];

// ── Curriculum & Audit Logs ─────────────────────────────────
export interface TaskEditLog {
  id: string;
  editorName: string;
  editorRole: string;
  trackTitle: string;
  fieldName: string;
  oldValue: string;
  newValue: string;
  changedAt: string;
}

export const MOCK_TASK_EDIT_LOGS: TaskEditLog[] = [
  {
    id: "log_001",
    editorName: "Marcus Aurelius",
    editorRole: "MENTOR",
    trackTitle: "Frontend Engineering",
    fieldName: "title",
    oldValue: "React Components 101",
    newValue: "React Components & Core Props",
    changedAt: "2026-06-01T10:00:00Z"
  }
];

export function addTask(task: WeeklyTask, editor: User) {
  WEEKLY_TASKS.push(task);
  const track = TRACKS.find(t => t.id === task.trackId);
  MOCK_TASK_EDIT_LOGS.unshift({
    id: `log_${Math.random().toString(36).substring(2, 9)}`,
    editorName: editor.name,
    editorRole: editor.role,
    trackTitle: track ? track.title : "Unknown Track",
    fieldName: "creation",
    oldValue: "(none)",
    newValue: task.title,
    changedAt: new Date().toISOString()
  });
}

export function editTask(id: string, updatedTask: Partial<WeeklyTask>, editor: User) {
  const index = WEEKLY_TASKS.findIndex(t => t.id === id);
  if (index !== -1) {
    const oldTask = WEEKLY_TASKS[index];
    WEEKLY_TASKS[index] = { ...oldTask, ...updatedTask };
    const track = TRACKS.find(t => t.id === oldTask.trackId);
    MOCK_TASK_EDIT_LOGS.unshift({
      id: `log_${Math.random().toString(36).substring(2, 9)}`,
      editorName: editor.name,
      editorRole: editor.role,
      trackTitle: track ? track.title : "Unknown Track",
      fieldName: "title",
      oldValue: oldTask.title,
      newValue: updatedTask.title || oldTask.title,
      changedAt: new Date().toISOString()
    });
  }
}

export function deleteTask(id: string, editor: User) {
  const index = WEEKLY_TASKS.findIndex(t => t.id === id);
  if (index !== -1) {
    const oldTask = WEEKLY_TASKS[index];
    WEEKLY_TASKS.splice(index, 1);
    const track = TRACKS.find(t => t.id === oldTask.trackId);
    MOCK_TASK_EDIT_LOGS.unshift({
      id: `log_${Math.random().toString(36).substring(2, 9)}`,
      editorName: editor.name,
      editorRole: editor.role,
      trackTitle: track ? track.title : "Unknown Track",
      fieldName: "deletion",
      oldValue: oldTask.title,
      newValue: "(deleted)",
      changedAt: new Date().toISOString()
    });
  }
}

// ── Phase Progress ────────────────────────────────────────────
export const PHASE_PROGRESS = [
  { phase: 1, label: "Foundation", percentage: 75, color: "#00F5FF" },
  { phase: 2, label: "Practical Skills", percentage: 60, color: "#A855F7" },
  { phase: 3, label: "Industry Projects", percentage: 85, color: "#00BFA5" },
];

// ── Platform Stats ────────────────────────────────────────────
export const PLATFORM_STATS = [
  { label: "Students Enrolled", value: "12,400+", icon: "Users" },
  { label: "Tracks Available", value: "8", icon: "BookOpen" },
  { label: "Projects Submitted", value: "94,000+", icon: "GitBranch" },
  { label: "Hired in 90 days", value: "78%", icon: "TrendingUp" },
];




