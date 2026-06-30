// components/layout/RootNav.tsx
// Shared Nav — glassmorphism, light/dark via next-themes
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Logo from "@/components/ui/Logo";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

const navLinks = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  {
    label: "Join Connexode",
    href: "/join",
    dropdown: [
      { label: "Ambassador Program", href: "/join/ambassador" },
      { label: "Internship Program", href: "/join/internship" },
    ],
  },
  {
    label: "Community",
    href: "/community",
    dropdown: [
      { label: "Leaderboard", href: "/community/leaderboard" },
      { label: "Project Showcase", href: "/community/showcase" },
      { label: "Success Stories", href: "/community/success-stories" },
    ],
  },
  { label: "Contact", href: "/contact" },
];

/* ─── Inline theme toggle button ─── */
function NavThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div style={{ width: 36, height: 36 }} />;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
      style={{
        width: 36,
        height: 36,
        borderRadius: "50%",
        background: "var(--surface)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: "1px solid var(--border)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "var(--text-secondary)",
        cursor: "pointer",
        transition: "all 0.2s",
        flexShrink: 0,
      }}
      className="hover:border-[var(--border-strong)] hover:scale-110"
    >
      {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
    </button>
  );
}

export function RootNav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  function isActive(href: string) {
    return pathname === href || pathname.startsWith(href + "/");
  }

  return (
    <>
      {/* ── Desktop + mobile header bar ── */}
      <header
        style={{
          background: scrolled ? "var(--surface)" : "rgba(248,250,252,0)",
          backdropFilter: scrolled ? "blur(20px)" : "blur(0px)",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "blur(0px)",
          borderBottom: `1px solid ${scrolled ? "var(--border)" : "transparent"}`,
          transition: "all 0.3s ease",
        }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
            <Logo size="default" />
          </Link>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) =>
              link.dropdown ? (
                <li key={link.href} className="relative">
                  <button
                    onMouseEnter={() => setOpenDropdown(link.label)}
                    onMouseLeave={() => setOpenDropdown(null)}
                    style={{
                      color: isActive(link.href)
                        ? "var(--violet)"
                        : "var(--text-secondary)",
                    }}
                    className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:text-[var(--violet)]"
                  >
                    {link.label}
                    <ChevronDown
                      size={13}
                      className={`transition-transform ${openDropdown === link.label ? "rotate-180" : ""}`}
                    />
                  </button>

                  {openDropdown === link.label && (
                    <div
                      onMouseEnter={() => setOpenDropdown(link.label)}
                      onMouseLeave={() => setOpenDropdown(null)}
                      style={{
                        background: "var(--surface)",
                        backdropFilter: "blur(20px)",
                        WebkitBackdropFilter: "blur(20px)",
                        border: "1px solid var(--border)",
                        boxShadow: "var(--shadow-md), var(--inset-highlight)",
                      }}
                      className="absolute top-full left-0 mt-2 w-52 rounded-xl overflow-hidden"
                    >
                      {link.dropdown.map((d) => (
                        <Link
                          key={d.href}
                          href={d.href}
                          style={{
                            color: isActive(d.href) ? "var(--violet)" : "var(--text-secondary)",
                            borderBottom: "1px solid var(--border)",
                          }}
                          className="block px-4 py-3 text-sm transition-colors hover:text-[var(--violet)] hover:bg-[var(--theme-hover)] last:border-0"
                        >
                          {d.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </li>
              ) : (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    style={{
                      color: isActive(link.href) ? "var(--violet)" : "var(--text-secondary)",
                    }}
                    className="rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:text-[var(--violet)]"
                  >
                    {link.label}
                  </Link>
                </li>
              )
            )}
          </ul>

          {/* Desktop right CTAs */}
          <div className="hidden items-center gap-3 md:flex">
            <NavThemeToggle />
            <Link
              href="/auth/signin"
              style={{ color: "var(--text-secondary)" }}
              className="text-sm font-medium transition-colors hover:text-[var(--text-primary)]"
            >
              Sign in
            </Link>
            <Link
              href="/join"
              style={{
                background: "var(--gradient)",
                color: "#fff",
                borderRadius: "999px",
                padding: "9px 22px",
                fontSize: "14px",
                fontWeight: 700,
                boxShadow: "var(--shadow-glow)",
              }}
              className="transition-all hover:brightness-110 hover:-translate-y-0.5 active:scale-95"
            >
              Join Connexode
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            style={{ color: "var(--text-primary)" }}
            className="flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:bg-[var(--theme-hover)] md:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
      </header>

      {/* ── Mobile drawer overlay ── */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
          style={{ backgroundColor: "rgba(15,23,42,0.4)", backdropFilter: "blur(4px)" }}
        />
      )}

      {/* ── Mobile drawer ── */}
      <div
        style={{
          background: "var(--surface-solid)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderRight: "1px solid var(--border)",
          boxShadow: "var(--shadow-md)",
          transform: mobileOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1)",
          top: 0,
          left: 0,
          bottom: 0,
          width: "80%",
          maxWidth: "320px",
        }}
        className="fixed z-50 flex flex-col overflow-y-auto md:hidden"
      >
        {/* Drawer header */}
        <div
          style={{ borderBottom: "1px solid var(--border)" }}
          className="flex items-center justify-between px-6 py-5"
        >
          <Link href="/" className="flex items-center gap-2.5" onClick={() => setMobileOpen(false)}>
            <Logo size="default" />
          </Link>
          <div className="flex items-center gap-2">
            <NavThemeToggle />
            <button
              onClick={() => setMobileOpen(false)}
              style={{ color: "var(--text-secondary)" }}
              className="rounded-lg p-1.5 hover:bg-[var(--theme-hover)]"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Drawer links */}
        <nav className="flex-1 px-4 py-4 space-y-1">
          {navLinks.map((link) => (
            <div key={link.href}>
              <Link
                href={link.href}
                onClick={() => !link.dropdown && setMobileOpen(false)}
                style={{
                  backgroundColor: isActive(link.href) ? "rgba(124,58,237,0.08)" : "transparent",
                  color: isActive(link.href) ? "var(--violet)" : "var(--text-secondary)",
                  border: `1px solid ${isActive(link.href) ? "rgba(124,58,237,0.18)" : "transparent"}`,
                }}
                className="flex items-center rounded-xl px-4 py-3 text-sm font-medium transition-all hover:bg-[var(--theme-hover)] hover:text-[var(--violet)]"
              >
                {link.label}
              </Link>
              {link.dropdown && (
                <div className="ml-4 mt-1 space-y-0.5">
                  {link.dropdown.map((d) => (
                    <Link
                      key={d.href}
                      href={d.href}
                      onClick={() => setMobileOpen(false)}
                      style={{
                        color: isActive(d.href) ? "var(--violet)" : "var(--text-muted)",
                        borderLeft: `2px solid ${isActive(d.href) ? "var(--violet)" : "var(--border)"}`,
                      }}
                      className="flex items-center px-4 py-2.5 text-xs transition-colors hover:text-[var(--violet)]"
                    >
                      {d.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Drawer bottom CTAs */}
        <div
          style={{ borderTop: "1px solid var(--border)" }}
          className="p-5 space-y-3"
        >
          <Link
            href="/join"
            onClick={() => setMobileOpen(false)}
            style={{ background: "var(--gradient)", color: "#fff" }}
            className="flex items-center justify-center rounded-full py-3 text-sm font-semibold transition-all hover:brightness-110"
          >
            Join Connexode
          </Link>
          <Link
            href="/auth/signin"
            onClick={() => setMobileOpen(false)}
            style={{ border: "1px solid var(--border)", color: "var(--text-secondary)" }}
            className="flex items-center justify-center rounded-full py-3 text-sm font-medium transition-all hover:text-[var(--text-primary)] hover:border-[var(--border-strong)]"
          >
            Sign in
          </Link>
        </div>
      </div>
    </>
  );
}
