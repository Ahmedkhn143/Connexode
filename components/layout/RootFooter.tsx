// components/layout/RootFooter.tsx
// Glassmorphism footer — light/dark via CSS vars

import Link from "next/link";
import Logo from "@/components/ui/Logo";

const footerLinks = {
  Services: [
    { label: "Full-Stack Apps", href: "/services#fullstack" },
    { label: "AI Automation", href: "/services#ai" },
    { label: "SEO", href: "/services#seo" },
    { label: "Social Media", href: "/services#social" },
    { label: "Design & Video", href: "/services#design" },
  ],
  Programs: [
    { label: "Internship Program", href: "/join/internship" },
    { label: "Ambassador Program", href: "/join/ambassador" },
    { label: "Leaderboard", href: "/community/leaderboard" },
    { label: "Project Showcase", href: "/community/showcase" },
    { label: "Verify Certificate", href: "/verify" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Careers", href: "/join" },
  ],
};

const socials = [
  { label: "Instagram", href: "https://instagram.com/connexode" },
  { label: "LinkedIn", href: "https://linkedin.com/company/connexode" },
  { label: "Facebook", href: "https://facebook.com/connexode" },
];

export function RootFooter() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        background: "var(--surface)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href="/" className="mb-5 flex items-center gap-2.5">
              <Logo size="default" showTagline />
            </Link>
            <p
              style={{ color: "var(--text-secondary)", fontSize: "13px", lineHeight: "1.75" }}
              className="mb-6 max-w-xs"
            >
              Connexode trains campus talent and delivers practical tech systems —
              full-stack development, AI automation, SEO, and growth — for teams
              and businesses worldwide.
            </p>
            <div className="flex items-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    border: "1px solid var(--border)",
                    color: "var(--text-muted)",
                    background: "var(--surface)",
                    backdropFilter: "blur(8px)",
                  }}
                  className="rounded-lg px-3 py-1.5 text-xs font-medium transition-all hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <p
                style={{
                  color: "var(--violet)",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  marginBottom: "14px",
                }}
              >
                {group}
              </p>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      style={{ color: "var(--text-secondary)", fontSize: "14px" }}
                      className="transition-colors hover:text-[var(--text-primary)]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{ borderTop: "1px solid var(--border)" }}
        className="mx-auto max-w-6xl px-6 py-5"
      >
        <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
          <p style={{ color: "var(--text-muted)", fontSize: "12px" }}>
            © {year} Connexode. All rights reserved.
          </p>
          <p style={{ color: "var(--text-muted)", fontSize: "12px" }}>
            Remote-first, serving clients worldwide
          </p>
          <div className="flex items-center gap-5">
            <Link href="/privacy" style={{ color: "var(--text-muted)", fontSize: "12px" }} className="transition-colors hover:text-[var(--text-secondary)]">
              Privacy Policy
            </Link>
            <Link href="/terms" style={{ color: "var(--text-muted)", fontSize: "12px" }} className="transition-colors hover:text-[var(--text-secondary)]">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
