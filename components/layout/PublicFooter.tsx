import Link from "next/link";
import Logo from "@/components/ui/Logo";

const InstagramIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);
const LinkedinIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
  </svg>
);
const FacebookIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

export default function PublicFooter() {
  return (
    <footer
      style={{
        background: "var(--surface)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderTop: "1px solid var(--border)",
      }}
      className="pt-16 pb-8 px-6 font-sans"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mb-14">

          {/* Col 1 — Brand */}
          <div className="flex flex-col gap-4">
            <Logo size="default" />
            <p style={{ color: "var(--text-secondary)", fontSize: "13px", lineHeight: "1.75" }} className="max-w-[240px]">
              Connexode trains campus talent and delivers practical tech systems —
              full-stack development, AI automation, SEO, and growth — worldwide.
            </p>
            <div className="flex items-center gap-4 mt-1">
              {[
                { href: "https://instagram.com", icon: <InstagramIcon size={17} /> },
                { href: "https://linkedin.com", icon: <LinkedinIcon size={17} /> },
                { href: "https://facebook.com", icon: <FacebookIcon size={17} /> },
              ].map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                  style={{ color: "var(--text-muted)" }}
                  className="hover:text-[var(--text-primary)] transition-colors">
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Col 2 — Services */}
          <div className="flex flex-col gap-2.5">
            <span style={{ color: "var(--violet)", fontSize: "11px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", display: "block", marginBottom: "10px" }}>Services</span>
            {[
              { label: "Full-Stack Apps", href: "/services#fullstack" },
              { label: "AI Automation", href: "/services#ai" },
              { label: "SEO", href: "/services#seo" },
              { label: "Social Media", href: "/services#social" },
              { label: "Design & Video", href: "/services#design" },
            ].map((l) => (
              <Link key={l.href} href={l.href} style={{ color: "var(--text-secondary)", fontSize: "14px" }} className="hover:text-[var(--text-primary)] transition-colors">{l.label}</Link>
            ))}
          </div>

          {/* Col 3 — Programs */}
          <div className="flex flex-col gap-2.5">
            <span style={{ color: "var(--violet)", fontSize: "11px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", display: "block", marginBottom: "10px" }}>Programs</span>
            {[
              { label: "Internship Program", href: "/join/internship" },
              { label: "Ambassador Program", href: "/join/ambassador" },
              { label: "Leaderboard", href: "/leaderboard" },
              { label: "Verify Certificate", href: "/verify" },
            ].map((l) => (
              <Link key={l.href} href={l.href} style={{ color: "var(--text-secondary)", fontSize: "14px" }} className="hover:text-[var(--text-primary)] transition-colors">{l.label}</Link>
            ))}
          </div>

          {/* Col 4 — Company */}
          <div className="flex flex-col gap-2.5">
            <span style={{ color: "var(--violet)", fontSize: "11px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", display: "block", marginBottom: "10px" }}>Company</span>
            {[
              { label: "About", href: "/about" },
              { label: "Contact", href: "/contact" },
              { label: "Careers", href: "/join" },
            ].map((l) => (
              <Link key={l.href} href={l.href} style={{ color: "var(--text-secondary)", fontSize: "14px" }} className="hover:text-[var(--text-primary)] transition-colors">{l.label}</Link>
            ))}
          </div>
        </div>

        <div style={{ height: 1, background: "linear-gradient(90deg, transparent, var(--border), transparent)" }} className="mb-7" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
          <p style={{ color: "var(--text-muted)", fontSize: "12px" }}>&copy; 2026 Connexode. All rights reserved.</p>
          <p style={{ color: "var(--text-muted)", fontSize: "12px" }}>Remote-first, serving clients worldwide</p>
          <div className="flex items-center gap-5">
            <Link href="/privacy" style={{ color: "var(--text-muted)", fontSize: "12px" }} className="hover:text-[var(--text-secondary)] transition-colors">Privacy Policy</Link>
            <Link href="/terms" style={{ color: "var(--text-muted)", fontSize: "12px" }} className="hover:text-[var(--text-secondary)] transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
