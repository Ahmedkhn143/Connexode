import Link from "next/link";
import { Code2, ExternalLink, Share2, MessageCircle } from "lucide-react";

const FOOTER_LINKS = {
  Platform: [
    { label: "Tracks", href: "#tracks" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Campus Ambassadors", href: "#trust" },
    { label: "Student Dashboard", href: "/dashboard" },
  ],
  Resources: [
    { label: "Documentation", href: "#" },
    { label: "Task Archive", href: "#" },
    { label: "Mentor Portal", href: "#" },
    { label: "Leaderboard", href: "#" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookie Policy", href: "#" },
  ],
};

const SOCIAL_LINKS = [
  { icon: ExternalLink, href: "#", label: "GitHub" },
  { icon: Share2, href: "#", label: "LinkedIn" },
  { icon: MessageCircle, href: "#", label: "Twitter / X" },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/8 px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="group mb-5 flex items-center gap-2.5">
              <img
                src="/logo.png?v=20"
                alt="Connexode Logo"
                className="h-9 w-9 rounded-xl object-cover shadow-[0_0_16px_rgba(0,245,255,0.4)] transition-shadow duration-300 group-hover:shadow-[0_0_24px_rgba(0,245,255,0.6)] animate-pulse-slow"
              />
              <span className="font-display text-xl font-bold text-white">
                Connex<span className="text-cyan-400">ode</span>
              </span>
            </Link>
            <p className="mb-6 text-sm leading-relaxed text-slate-500">
              The premium developer network and leadership platform where skills are built through action and community.
            </p>
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 text-slate-500 transition-all hover:border-cyan-400/30 hover:text-cyan-400"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-slate-500">
                {category}
              </p>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-500 transition-colors hover:text-cyan-400"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/6 pt-8 text-xs text-slate-600 sm:flex-row">
          <p>© 2026 Connexode. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Built with
            <span className="text-cyan-400">♥</span>
            for the next generation of developers.
          </p>
        </div>
      </div>
    </footer>
  );
}
