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
}

export const MOCK_USER: User = {
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
    title: "Full Stack Web Dev",
    slug: "full-stack-web-dev",
    description: "Master React, Next.js, Node.js, and PostgreSQL by building 8 production-grade projects.",
    icon: "Code2",
    durationWeeks: 8,
    tags: ["React", "Next.js", "Node.js", "PostgreSQL"],
    color: "#00F5FF",
    gradient: "from-cyan-500/20 to-blue-600/20",
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

export const WEEKLY_TASKS: WeeklyTask[] = [
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
    status: "APPROVED", feedback: "Excellent glassmorphism implementation! Clean code structure.",
    submittedAt: "2026-04-02T14:30:00Z", reviewedAt: "2026-04-03T09:00:00Z", points: 100,
  },
  {
    id: "sub_002", userId: "usr_001", taskId: "task_w1d2", taskTitle: "Hero Section with Animation",
    githubUrl: "https://github.com/alex-johnson/connexode-week1-hero",
    liveUrl: "https://connexode-hero.vercel.app",
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

// ── Phase Progress ────────────────────────────────────────────
export const PHASE_PROGRESS = [
  { phase: 1, label: "Foundation", percentage: 75, color: "#00F5FF" },
  { phase: 2, label: "Practical Skills", percentage: 60, color: "#A855F7" },
  { phase: 3, label: "Industry Projects", percentage: 85, color: "#00BFA5" },
];

// ── Platform Stats ────────────────────────────────────────────
export const PLATFORM_STATS = [
  { label: "Students Enrolled", value: "12,400+", icon: "Users" },
  { label: "Tracks Available", value: "6", icon: "BookOpen" },
  { label: "Projects Submitted", value: "94,000+", icon: "GitBranch" },
  { label: "Hired in 90 days", value: "78%", icon: "TrendingUp" },
];
