"use client";

import { useState } from "react";
import Link from "next/link";
import { Code2, Cpu, Search, Share2, Video, Check, ChevronDown, ChevronUp } from "lucide-react";
import PublicNav from "@/components/layout/PublicNav";
import PublicFooter from "@/components/layout/PublicFooter";

export default function ServicesPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const servicesList = [
    {
      icon: <Code2 size={24} />,
      tag: "Development",
      title: "Full-Stack Development",
      desc: "From pixel-perfect user interfaces to backend APIs, we build web applications that perform at scale and deliver exceptional user experiences.",
      stack: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "Prisma"],
      checklist: [
        "Frontend (React/Next.js)",
        "Backend APIs (Node.js)",
        "Database design",
        "Auth & security",
        "Vercel/Railway deployment",
        "End-to-end web apps"
      ]
    },
    {
      icon: <Cpu size={24} />,
      tag: "AI Automation",
      title: "AI & Custom Chatbots",
      desc: "Bring intelligence to your workflows. We design custom AI assistants and automate manual operations to save your business hundreds of hours.",
      stack: ["OpenAI API", "Claude API", "LangChain", "n8n", "Python", "Pinecone"],
      checklist: [
        "Custom chatbots trained on your data",
        "AI workflow automation",
        "OpenAI/Claude API integration",
        "LangChain agents",
        "Business process automation",
        "n8n/Make pipelines"
      ]
    },
    {
      icon: <Search size={24} />,
      tag: "Growth",
      title: "Search Engine Optimisation (SEO)",
      desc: "Get discovered by the right customers. We perform in-depth technical audits and design custom search strategies to boost your organic search footprint.",
      stack: ["Google Search Console", "Ahrefs", "Screaming Frog", "SEMrush", "Analytics"],
      checklist: [
        "Technical SEO audit",
        "On-page optimisation",
        "Keyword research & strategy",
        "Link building",
        "GSC setup & monitoring",
        "Monthly reporting"
      ]
    },
    {
      icon: <Share2 size={24} />,
      tag: "Social",
      title: "Social Media Marketing & Management",
      desc: "Grow your online presence and engage with your community. We develop content calendars, design visuals, and track page growth metrics.",
      stack: ["Meta Business Suite", "Canva Pro", "Buffer", "Notion", "Analytics"],
      checklist: [
        "Social strategy (Instagram, LinkedIn, Facebook, TikTok)",
        "Monthly content calendar",
        "Caption writing & hashtags",
        "Graphic design for posts/reels",
        "Full page management",
        "Analytics reporting"
      ]
    },
    {
      icon: <Video size={24} />,
      tag: "Media",
      title: "Design, Video & 3D",
      desc: "Stand out with stunning UI/UX, premium video assets, and detailed 3D designs that keep users engaged and build brand authority.",
      stack: ["Figma", "Premiere Pro", "DaVinci Resolve", "After Effects", "Blender"],
      checklist: [
        "Figma UI/UX design",
        "Design systems",
        "Short-form video editing",
        "Long-form production",
        "Blender 3D renders",
        "Thumbnail & poster design"
      ]
    }
  ];

  const processSteps = [
    {
      step: "01",
      title: "Discovery call",
      desc: "We learn about your project, goals, and timeline. Free, no commitment."
    },
    {
      step: "02",
      title: "Proposal & scope",
      desc: "You get a clear written scope, timeline, and milestone-based pricing. No surprises."
    },
    {
      step: "03",
      title: "Build & check-ins",
      desc: "Regular updates, shared preview links, and constant direct communication."
    },
    {
      step: "04",
      title: "Delivery & support",
      desc: "Final testing, deployment, handover session, and ongoing post-launch support."
    }
  ];

  const faqs = [
    {
      q: "Do you work with international clients?",
      a: "Yes, fully remote. We work with clients from North America, Europe, the Middle East, and beyond."
    },
    {
      q: "How much does it cost?",
      a: "Every project is priced dynamically based on scope and requirements. We offer transparent, milestone-based payments and quote after our discovery call."
    },
    {
      q: "How long does it take?",
      a: "Simple landing pages usually take 5–7 days. More complex web applications, automations, or design projects range from 3–6 weeks."
    },
    {
      q: "Can I hire for one service only?",
      a: "Absolutely. You can hire us for a single landing page design, a specific automation pipeline, or ongoing monthly SEO without any bundling."
    },
    {
      q: "How do we communicate?",
      a: "We communicate directly via WhatsApp, Slack, or Google Meet, based on your team's preference. You will always have direct contact with the project builder."
    },
    {
      q: "Do you offer retainers?",
      a: "Yes, specifically for Search Engine Optimisation (SEO) and Social Media Management where consistent monthly execution is required to see results."
    }
  ];

  return (
    <div style={{ backgroundColor: "var(--theme-bg)", color: "var(--theme-text-primary)" }} className="min-h-screen flex flex-col font-sans transition-colors duration-300">
      <PublicNav />

      {/* Hero Section */}
      <section
        style={{
          background: "radial-gradient(ellipse 80% 50% at 50% 20%, rgba(124,58,237,0.12) 0%, transparent 70%)",
        }}
        className="pt-36 pb-20 px-6 flex flex-col items-center text-center"
      >
        <span
          style={{
            backgroundColor: "rgba(6,182,212,0.1)",
            border: "1px solid rgba(6,182,212,0.2)",
            color: "#06B6D4",
            fontSize: "10px",
            fontWeight: 600,
            letterSpacing: "0.15em",
          }}
          className="mb-6 px-4 py-1.5 rounded-full uppercase inline-block"
        >
          Global services · Pakistan-built
        </span>

        <h1
          style={{
            fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
            fontWeight: 800,
            letterSpacing: "-0.04em",
            lineHeight: "1.1",
          }}
          className="max-w-4xl mx-auto mb-6"
        >
          World-class tech services.<br />
          <span
            style={{
              background: "linear-gradient(135deg, #7C3AED, #06B6D4)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Delivered worldwide.
          </span>
        </h1>

        <p style={{ color: "var(--theme-text-secondary)" }} className="max-w-[600px] mx-auto text-base leading-relaxed">
          From full-stack web apps to AI chatbots, SEO, and social media — our dedicated team delivers real work for clients anywhere.
        </p>
      </section>

      {/* Services List (Vertical Grid, full width cards) */}
      <section className="py-12 px-6 max-w-5xl mx-auto w-full flex flex-col gap-8">
        {servicesList.map((service, index) => (
          <div
            key={index}
            style={{
              backgroundColor: "var(--theme-surface)",
              border: "1px solid var(--theme-border)",
              borderRadius: "12px",
            }}
            className="p-8 md:p-12 transition-all hover:border-[var(--theme-border-hover)] hover:-translate-y-1 flex flex-col md:flex-row justify-between gap-8 md:gap-12"
          >
            {/* Left Column */}
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div
                    style={{
                      backgroundColor: "rgba(124,58,237,0.15)",
                      border: "1px solid rgba(124,58,237,0.25)",
                    }}
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-[#7C3AED]"
                  >
                    {service.icon}
                  </div>
                  <span
                    style={{
                      backgroundColor: "rgba(6,182,212,0.1)",
                      border: "1px solid rgba(6,182,212,0.2)",
                      color: "#06B6D4",
                      fontSize: "10px",
                      fontWeight: 600,
                      letterSpacing: "0.1em",
                    }}
                    className="px-2.5 py-1 rounded-full uppercase"
                  >
                    {service.tag}
                  </span>
                </div>

                <h3 style={{ color: "var(--theme-text-primary)" }} className="text-xl font-bold mb-3 tracking-tight">
                  {service.title}
                </h3>
                <p style={{ color: "var(--theme-text-secondary)" }} className="text-sm leading-relaxed mb-6">
                  {service.desc}
                </p>
              </div>

              {/* Stack badges */}
              <div className="flex flex-wrap gap-2 mt-auto">
                {service.stack.map((tech, idx) => (
                  <span
                    key={idx}
                    style={{
                      backgroundColor: "var(--theme-bg)",
                      border: "1px solid var(--theme-border)",
                      color: "var(--theme-text-secondary)",
                    }}
                    className="px-3 py-1 rounded-full text-xs animate-fadeIn"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Column */}
            <div
              style={{
                borderLeft: "1px solid var(--theme-border)",
              }}
              className="md:pl-12 flex-1 flex flex-col justify-between"
            >
              <ul className="flex flex-col gap-3 mb-8">
                {service.checklist.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-[var(--theme-text-secondary)]">
                    <Check size={16} className="text-[#06B6D4] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/contact"
                style={{
                  background: "transparent",
                  border: "1px solid rgba(6,182,212,0.35)",
                  color: "#06B6D4",
                  borderRadius: "999px",
                  padding: "12px 28px",
                  fontWeight: 600,
                }}
                className="transition-all hover:border-[#06B6D4]/70 active:scale-95 text-center w-full block"
              >
                Get quote
              </Link>
            </div>
          </div>
        ))}
      </section>

      {/* 4-Step Process Section */}
      <section
        style={{
          backgroundColor: "var(--theme-surface)",
          borderTop: "1px solid var(--theme-border)",
          borderBottom: "1px solid var(--theme-border)",
        }}
        className="py-24 px-6 w-full"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span
              style={{
                color: "#06B6D4",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.2em",
              }}
              className="uppercase block mb-2"
            >
              How we work
            </span>
            <h2 style={{ color: "var(--theme-text-primary)" }} className="text-3xl font-bold tracking-tight">
              Our 4-step process
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: "var(--theme-bg)",
                  border: "1px solid var(--theme-border)",
                  borderRadius: "12px",
                }}
                className="p-6 relative"
              >
                <span
                  style={{
                    background: "linear-gradient(135deg, #7C3AED, #06B6D4)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    fontSize: "2rem",
                    fontWeight: 800,
                  }}
                  className="mb-4 block"
                >
                  {step.step}
                </span>
                <h3 style={{ color: "var(--theme-text-primary)" }} className="text-base font-bold mb-2">
                  {step.title}
                </h3>
                <p style={{ color: "var(--theme-text-secondary)" }} className="text-xs leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-6 max-w-3xl mx-auto w-full">
        <div className="text-center mb-16">
          <span
            style={{
              color: "#06B6D4",
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.2em",
            }}
            className="uppercase block mb-2"
          >
            Questions
          </span>
          <h2 style={{ color: "var(--theme-text-primary)" }} className="text-3xl font-bold tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="flex flex-col gap-4">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                style={{
                  backgroundColor: "var(--theme-surface)",
                  border: "1px solid var(--theme-border)",
                  borderRadius: "12px",
                }}
                className="overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-semibold text-sm hover:text-[var(--theme-text-primary)] transition-colors"
                >
                  <span style={{ color: "var(--theme-text-primary)" }}>{faq.q}</span>
                  {isOpen ? <ChevronUp size={18} className="text-[var(--theme-text-secondary)]" /> : <ChevronDown size={18} className="text-[var(--theme-text-secondary)]" />}
                </button>
                {isOpen && (
                  <div
                    style={{
                      borderTop: "1px solid var(--theme-border)",
                      color: "var(--theme-text-secondary)",
                    }}
                    className="p-6 text-xs leading-relaxed"
                  >
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Bottom Section */}
      <section className="py-12 px-6 max-w-5xl mx-auto w-full mb-12">
        <div
          style={{
            border: "1px solid transparent",
            background: "linear-gradient(var(--theme-surface), var(--theme-surface)) padding-box, linear-gradient(135deg, #7C3AED, #06B6D4) border-box",
            borderRadius: "16px",
          }}
          className="p-12 text-center"
        >
          <h2 style={{ color: "var(--theme-text-primary)" }} className="text-3xl font-extrabold mb-4 tracking-tight">
            Have a custom requirement?
          </h2>
          <p style={{ color: "var(--theme-text-secondary)" }} className="max-w-lg mx-auto mb-8 text-sm leading-relaxed">
            Get in touch with us and let's craft the perfect technical solution tailored to your goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <Link
              href="/contact"
              style={{
                background: "linear-gradient(135deg, #7C3AED, #6D28D9)",
                color: "#fff",
                borderRadius: "999px",
                padding: "12px 28px",
                fontWeight: 700,
              }}
              className="transition-all hover:brightness-110 active:scale-95 text-center w-full sm:w-auto"
            >
              Get started
            </Link>
            <Link
              href="/contact"
              style={{
                background: "transparent",
                border: "1px solid rgba(6,182,212,0.35)",
                color: "#06B6D4",
                borderRadius: "999px",
                padding: "12px 28px",
                fontWeight: 600,
              }}
              className="transition-all hover:border-[#06B6D4]/70 active:scale-95 text-center w-full sm:w-auto"
            >
              Contact support
            </Link>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
