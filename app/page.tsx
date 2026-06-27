// app/page.tsx
// Connexode Homepage — colors extracted directly from logo
// Navy #082038 · Teal #188080 · Cyan #7EC8D8
// Stack: Next.js 15 · TypeScript · Tailwind CSS · Lucide React

import Link from "next/link";
import {
  ArrowRight,
  Users,
  BookOpen,
  Briefcase,
  CheckCircle,
  LayoutDashboard,
  Award,
} from "lucide-react";

// ─── COLOUR TOKENS (from logo) ────────────────────────────────────────────────
// Navy   #082038  → page bg, card surfaces
// Teal   #188080  → primary CTA, active states
// Cyan   #7EC8D8  → glows, accent text, borders
// ─────────────────────────────────────────────────────────────────────────────

type Pillar = {
  icon: React.ReactNode;
  tag: string;
  title: string;
  description: string;
  cta: string;
  href: string;
};

type Step = {
  number: string;
  title: string;
  description: string;
};

const pillars: Pillar[] = [
  {
    icon: <Users size={20} strokeWidth={1.5} />,
    tag: "Community",
    title: "Campus Ambassador Program",
    description:
      "Lead AI-awareness sessions on your campus, host webinars, grow your network, and track your real impact on a live dashboard.",
    cta: "Apply as ambassador",
    href: "/join/ambassador",
  },
  {
    icon: <BookOpen size={20} strokeWidth={1.5} />,
    tag: "Learning",
    title: "Internship Program",
    description:
      "Follow structured 8-week tracks, submit real projects, receive mentor feedback, and earn an industry-verified certificate.",
    cta: "View tracks",
    href: "/join/internship",
  },
  {
    icon: <Briefcase size={20} strokeWidth={1.5} />,
    tag: "Agency",
    title: "Client Services",
    description:
      "Frontend, full-stack, Figma design, video editing, Blender 3D, and social media marketing — delivered by our dedicated team.",
    cta: "Explore services",
    href: "/services",
  },
];

const steps: Step[] = [
  {
    number: "01",
    title: "Apply",
    description:
      "Choose Ambassador or Internship, fill the short form, and get an instant confirmation email.",
  },
  {
    number: "02",
    title: "Get reviewed",
    description:
      "Our team reviews within 3–5 days. Track your status live — no guessing, no waiting in the dark.",
  },
  {
    number: "03",
    title: "Grow with real tools",
    description:
      "Once approved, your role-based dashboard unlocks: tasks, grades, webinars, and your live progress tracker.",
  },
];


// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section
      style={{ backgroundColor: "#040C18" }}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-28 pb-20 text-center"
    >
      {/* Glow — teal from logo */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <div
          style={{ backgroundColor: "rgba(24,128,128,0.12)" }}
          className="h-[560px] w-[900px] rounded-full blur-[130px]"
        />
        {/* Secondary navy glow */}
        <div
          style={{ backgroundColor: "rgba(8,32,56,0.6)" }}
          className="absolute h-[400px] w-[600px] rounded-full blur-[100px]"
        />
      </div>

      {/* Eyebrow pill */}
      <span
        style={{
          border: "1px solid rgba(126,200,216,0.2)",
          backgroundColor: "rgba(8,32,56,0.6)",
          color: "#7EC8D8",
        }}
        className="relative mb-7 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-widest"
      >
        <span
          style={{ backgroundColor: "#7EC8D8" }}
          className="h-1.5 w-1.5 rounded-full animate-pulse"
        />
        Campus talent network · Pakistan
      </span>

      {/* Headline */}
      <h1
        style={{ color: "#E8F4F8" }}
        className="relative mx-auto max-w-4xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl"
      >
        Build real skills.
        <br />
        Build real connections.
        <br />
        <span
          style={{
            background: "linear-gradient(135deg, #7EC8D8 0%, #188080 60%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Build the future of tech.
        </span>
      </h1>

      {/* Sub-headline */}
      <p
        style={{ color: "rgba(126,200,216,0.55)" }}
        className="relative mx-auto mt-6 max-w-2xl text-base leading-relaxed sm:text-lg"
      >
        Connexode trains campus ambassadors and interns through mentorship,
        AI-skill workshops, and structured tracks — while delivering
        development, design, and growth services through a dedicated team.
      </p>

      {/* CTA row */}
      <div className="relative mt-10 flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/join"
          style={{ backgroundColor: "#188080", color: "#E8F4F8" }}
          className="flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold transition-all hover:brightness-110 active:scale-95"
        >
          Join Connexode
          <ArrowRight size={15} />
        </Link>
        <Link
          href="#how-it-works"
          style={{
            border: "1px solid rgba(126,200,216,0.2)",
            backgroundColor: "rgba(8,32,56,0.5)",
            color: "rgba(126,200,216,0.7)",
          }}
          className="flex items-center gap-2 rounded-full px-7 py-3 text-sm font-medium transition-all hover:bg-[rgba(8,32,56,0.8)] hover:text-[#7EC8D8]"
        >
          See how it works
        </Link>
      </div>

      {/* Trust line */}
      <p
        style={{ color: "rgba(126,200,216,0.25)" }}
        className="relative mt-8 text-xs"
      >
        Active across universities in Pakistan &nbsp;·&nbsp; Mentors, students
        &amp; ambassadors growing together
      </p>

      {/* Scroll indicator */}
      <div
        style={{ borderColor: "rgba(126,200,216,0.15)" }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex h-9 w-5 justify-center rounded-full border pt-1.5"
      >
        <span
          style={{ backgroundColor: "#7EC8D8" }}
          className="h-1.5 w-0.5 rounded-full animate-bounce opacity-60"
        />
      </div>
    </section>
  );
}

// ─── PILLAR CARDS ─────────────────────────────────────────────────────────────
function PillarCards() {
  return (
    <section
      style={{ backgroundColor: "#040C18" }}
      className="pb-24 pt-4"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {pillars.map((p, i) => (
            <div
              key={p.title}
              style={{
                backgroundColor: "#082038",
                border: "1px solid rgba(126,200,216,0.1)",
                transition: "border-color 0.25s, transform 0.25s",
              }}
              className="group flex flex-col rounded-2xl p-7 hover:border-[rgba(126,200,216,0.35)] hover:-translate-y-1"
            >
              {/* Icon + tag row */}
              <div className="mb-5 flex items-center gap-3">
                <span
                  style={{
                    backgroundColor: "rgba(24,128,128,0.15)",
                    border: "1px solid rgba(24,128,128,0.3)",
                    color: "#7EC8D8",
                  }}
                  className="flex h-10 w-10 items-center justify-center rounded-xl"
                >
                  {p.icon}
                </span>
                <span
                  style={{
                    border: "1px solid rgba(126,200,216,0.15)",
                    color: "rgba(126,200,216,0.45)",
                    backgroundColor: "rgba(8,32,56,0.5)",
                  }}
                  className="rounded-full px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-widest"
                >
                  {p.tag}
                </span>
              </div>

              {/* Title */}
              <h3
                style={{ color: "#E8F4F8" }}
                className="mb-3 text-[16px] font-semibold leading-snug"
              >
                {p.title}
              </h3>

              {/* Description */}
              <p
                style={{ color: "rgba(126,200,216,0.45)" }}
                className="flex-1 text-sm leading-relaxed"
              >
                {p.description}
              </p>

              {/* CTA */}
              <Link
                href={p.href}
                style={{ color: "#7EC8D8" }}
                className="mt-6 flex items-center gap-1.5 text-sm font-medium transition-all group-hover:gap-2.5 hover:text-[#188080]"
              >
                {p.cta}
                <ArrowRight
                  size={14}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── HOW IT WORKS ─────────────────────────────────────────────────────────────
function HowItWorks() {
  return (
    <section
      id="how-it-works"
      style={{
        backgroundColor: "#061020",
        borderTop: "1px solid rgba(126,200,216,0.06)",
        borderBottom: "1px solid rgba(126,200,216,0.06)",
      }}
      className="py-24"
    >
      <div className="mx-auto max-w-6xl px-6">
        {/* Section header */}
        <div className="mb-16 text-center">
          <p
            style={{ color: "#7EC8D8" }}
            className="mb-3 text-xs font-medium uppercase tracking-widest"
          >
            The process
          </p>
          <h2
            style={{ color: "#E8F4F8" }}
            className="text-2xl font-bold sm:text-3xl"
          >
            Apply, get reviewed, start growing
          </h2>
        </div>

        {/* Steps */}
        <div className="relative grid grid-cols-1 gap-12 md:grid-cols-3">
          {/* Connector line — desktop */}
          <div
            aria-hidden
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(126,200,216,0.15), transparent)",
            }}
            className="absolute top-7 left-[calc(16.66%+1rem)] right-[calc(16.66%+1rem)] hidden h-px md:block"
          />

          {steps.map((step) => (
            <div
              key={step.number}
              className="flex flex-col items-center text-center md:items-start md:text-left"
            >
              {/* Number badge */}
              <span
                style={{
                  border: "1px solid rgba(24,128,128,0.4)",
                  backgroundColor: "rgba(8,32,56,0.7)",
                  color: "#7EC8D8",
                }}
                className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-full text-lg font-bold"
              >
                {step.number}
              </span>
              <h3
                style={{ color: "#E8F4F8" }}
                className="mb-2 text-[16px] font-semibold"
              >
                {step.title}
              </h3>
              <p
                style={{ color: "rgba(126,200,216,0.45)" }}
                className="text-sm leading-relaxed"
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Feature pills */}
        <div className="mt-16 flex flex-wrap justify-center gap-3">
          {[
            { icon: <CheckCircle size={12} />, label: "Auto email on apply" },
            { icon: <LayoutDashboard size={12} />, label: "Role-based dashboard" },
            { icon: <Award size={12} />, label: "Verified certificate" },
          ].map(({ icon, label }) => (
            <span
              key={label}
              style={{
                border: "1px solid rgba(126,200,216,0.12)",
                backgroundColor: "rgba(8,32,56,0.5)",
                color: "rgba(126,200,216,0.5)",
              }}
              className="flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs"
            >
              <span style={{ color: "#188080" }}>{icon}</span>
              {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA BAND ─────────────────────────────────────────────────────────────────
function CTABand() {
  return (
    <section
      style={{ backgroundColor: "#040C18" }}
      className="py-24"
    >
      <div className="mx-auto max-w-3xl px-6 text-center">
        {/* Teal accent line above headline */}
        <div
          style={{
            background: "linear-gradient(90deg, transparent, #188080, transparent)",
          }}
          className="mx-auto mb-10 h-px w-24"
        />

        <h2
          style={{ color: "#E8F4F8" }}
          className="mb-4 text-3xl font-bold sm:text-4xl"
        >
          Ready to be part of Connexode?
        </h2>
        <p
          style={{ color: "rgba(126,200,216,0.45)" }}
          className="mb-10 text-base"
        >
          Apply as an ambassador, enroll in an internship track, or get in
          touch about our services. Your next step takes two minutes.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/join"
            style={{ backgroundColor: "#188080", color: "#E8F4F8" }}
            className="flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold transition-all hover:brightness-110 active:scale-95"
          >
            Join Connexode
            <ArrowRight size={15} />
          </Link>
          <Link
            href="/contact"
            style={{
              border: "1px solid rgba(126,200,216,0.2)",
              backgroundColor: "rgba(8,32,56,0.5)",
              color: "rgba(126,200,216,0.65)",
            }}
            className="rounded-full px-8 py-3.5 text-sm font-medium transition-all hover:text-[#7EC8D8] hover:border-[rgba(126,200,216,0.4)]"
          >
            Contact us
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <main style={{ backgroundColor: "#040C18" }} className="min-h-screen antialiased">
      <Hero />
      <PillarCards />
      <HowItWorks />
      <CTABand />
    </main>
  );
}
