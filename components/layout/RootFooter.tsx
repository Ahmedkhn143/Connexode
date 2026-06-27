// components/layout/RootFooter.tsx
// Shared footer — all pages
// Update social hrefs with your real URLs before deploying

import Link from "next/link";
import Image from "next/image";

const footerLinks = {
  Platform: [
    { label: "Ambassador Program", href: "/join/ambassador" },
    { label: "Internship Program", href: "/join/internship" },
    { label: "Services",           href: "/services" },
    { label: "Leaderboard",        href: "/community/leaderboard" },
    { label: "Project Showcase",   href: "/community/showcase" },
    { label: "Verify Certificate", href: "/verify" },
  ],
  Company: [
    { label: "About",   href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
};

const socials = [
  { label: "Instagram", href: "https://instagram.com/connexode" },   // ← update
  { label: "LinkedIn",  href: "https://linkedin.com/company/connexode" },
  { label: "Facebook",  href: "https://facebook.com/connexode" },
];

export function RootFooter() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        backgroundColor: "#061020",
        borderTop: "1px solid rgba(126,200,216,0.06)",
      }}
    >
      {/* Main footer content */}
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="mb-5 flex items-center gap-2.5">
              <Image
                src="/logo.png"
                alt="Connexode"
                width={30}
                height={30}
                className="rounded-md opacity-90"
              />
              <span style={{ color: "#E8F4F8" }} className="text-sm font-bold">
                Conne<span style={{ color: "#7EC8D8" }}>x</span>ode
              </span>
            </Link>
            <p
              style={{ color: "rgba(126,200,216,0.4)" }}
              className="mb-6 max-w-xs text-sm leading-relaxed"
            >
              Training campus ambassadors and interns through mentorship,
              AI-skill workshops, and structured tracks — while delivering
              real client services through a dedicated team.
            </p>
            {/* Social links */}
            <div className="flex items-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    border: "1px solid rgba(126,200,216,0.12)",
                    color: "rgba(126,200,216,0.45)",
                    backgroundColor: "rgba(8,32,56,0.5)",
                  }}
                  className="rounded-lg px-3 py-1.5 text-xs font-medium transition-all hover:border-[rgba(126,200,216,0.35)] hover:text-[#7EC8D8]"
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
                style={{ color: "rgba(126,200,216,0.35)" }}
                className="mb-4 text-[10px] font-semibold uppercase tracking-widest"
              >
                {group}
              </p>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      style={{ color: "rgba(126,200,216,0.5)" }}
                      className="text-sm transition-colors hover:text-[#7EC8D8]"
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
        style={{ borderTop: "1px solid rgba(126,200,216,0.06)" }}
        className="mx-auto max-w-6xl px-6 py-5"
      >
        <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
          <p style={{ color: "rgba(126,200,216,0.2)" }} className="text-xs">
            © {year} Connexode. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link
              href="/verify"
              style={{ color: "rgba(126,200,216,0.25)" }}
              className="text-xs transition-colors hover:text-[#7EC8D8]"
            >
              Verify Certificate
            </Link>
            <span style={{ color: "rgba(126,200,216,0.1)" }}>·</span>
            <p style={{ color: "rgba(126,200,216,0.2)" }} className="text-xs">
              Campus Talent Network · Pakistan
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
