import Link from "next/link";

const InstagramIcon = ({ size = 18 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const LinkedinIcon = ({ size = 18 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const FacebookIcon = ({ size = 18 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

export default function PublicFooter() {
  return (
    <footer
      style={{
        backgroundColor: "var(--theme-surface)",
        borderTop: "1px solid var(--theme-border)",
      }}
      className="py-16 px-6 font-sans"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <span
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 800,
                fontSize: "18px",
                letterSpacing: "-0.5px",
                color: "var(--theme-logo-text)",
              }}
            >
              Conne<span style={{ color: "#06B6D4" }}>x</span>ode
            </span>
            <p style={{ color: "var(--theme-text-secondary)" }} className="text-sm">
              Build. Connect. Grow.
            </p>
            <div className="flex items-center gap-4 mt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--theme-text-muted)" }}
                className="hover:text-[var(--theme-text-primary)] transition-colors"
              >
                <InstagramIcon size={18} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--theme-text-muted)" }}
                className="hover:text-[var(--theme-text-primary)] transition-colors"
              >
                <LinkedinIcon size={18} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--theme-text-muted)" }}
                className="hover:text-[var(--theme-text-primary)] transition-colors"
              >
                <FacebookIcon size={18} />
              </a>
            </div>
          </div>

          {/* Platform */}
          <div className="flex flex-col gap-3">
            <span style={{ color: "#06B6D4" }} className="text-[11px] font-semibold tracking-[0.2em] uppercase mb-1">
              Platform
            </span>
            <Link
              href="/join/ambassador"
              style={{ color: "var(--theme-text-secondary)" }}
              className="text-sm hover:text-[var(--theme-text-primary)] transition-colors"
            >
              Ambassador Program
            </Link>
            <Link
              href="/join/internship"
              style={{ color: "var(--theme-text-secondary)" }}
              className="text-sm hover:text-[var(--theme-text-primary)] transition-colors"
            >
              Internship Program
            </Link>
            <Link
              href="/services"
              style={{ color: "var(--theme-text-secondary)" }}
              className="text-sm hover:text-[var(--theme-text-primary)] transition-colors"
            >
              Services
            </Link>
            <Link
              href="/leaderboard"
              style={{ color: "var(--theme-text-secondary)" }}
              className="text-sm hover:text-[var(--theme-text-primary)] transition-colors"
            >
              Leaderboard
            </Link>
            <Link
              href="/verify"
              style={{ color: "var(--theme-text-secondary)" }}
              className="text-sm hover:text-[var(--theme-text-primary)] transition-colors"
            >
              Verify Certificate
            </Link>
          </div>

          {/* Company */}
          <div className="flex flex-col gap-3">
            <span style={{ color: "#06B6D4" }} className="text-[11px] font-semibold tracking-[0.2em] uppercase mb-1">
              Company
            </span>
            <Link
              href="/about"
              style={{ color: "var(--theme-text-secondary)" }}
              className="text-sm hover:text-[var(--theme-text-primary)] transition-colors"
            >
              About
            </Link>
            <Link
              href="/contact"
              style={{ color: "var(--theme-text-secondary)" }}
              className="text-sm hover:text-[var(--theme-text-primary)] transition-colors"
            >
              Contact
            </Link>
          </div>

          {/* Connect */}
          <div className="flex flex-col gap-3">
            <span style={{ color: "#06B6D4" }} className="text-[11px] font-semibold tracking-[0.2em] uppercase mb-1">
              Connect
            </span>
            <span style={{ color: "var(--theme-text-secondary)" }} className="text-sm">
              info@connexode.com
            </span>
            <span style={{ color: "var(--theme-text-secondary)" }} className="text-sm">
              +92 (300) 000-0000
            </span>
          </div>
        </div>

        {/* Divider */}
        <div
          style={{
            height: "1px",
            background: "linear-gradient(90deg, transparent, var(--theme-border), transparent)",
          }}
          className="mb-8"
        />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p style={{ color: "var(--theme-text-muted)" }} className="text-xs">
            &copy; 2026 Connexode &middot; Build. Connect. Grow.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" style={{ color: "var(--theme-text-muted)" }} className="text-xs hover:text-[var(--theme-text-secondary)] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" style={{ color: "var(--theme-text-muted)" }} className="text-xs hover:text-[var(--theme-text-secondary)] transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
