// components/layout/RootNav.tsx
// Shared Nav — desktop + mobile hamburger drawer
// "use client" because mobile state (open/close) needs useState

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Logo from "@/components/ui/Logo";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";

const navLinks = [
  { label: "About",    href: "/about" },
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
      { label: "Leaderboard",      href: "/community/leaderboard" },
      { label: "Project Showcase", href: "/community/showcase" },
      { label: "Success Stories",  href: "/community/success-stories" },
    ],
  },
  { label: "Contact", href: "/contact" },
];

export function RootNav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Close mobile nav on route change
  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  // Detect scroll for nav blur effect
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Lock body scroll when mobile nav open
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
          backgroundColor: scrolled
            ? "rgba(4,12,24,0.92)"
            : "rgba(4,12,24,0.75)",
          borderBottom: "1px solid rgba(126,200,216,0.08)",
          transition: "background-color 0.3s",
        }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md"
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
                        ? "#7EC8D8"
                        : "rgba(126,200,216,0.55)",
                    }}
                    className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm transition-colors hover:text-[#7EC8D8]"
                  >
                    {link.label}
                    <ChevronDown
                      size={13}
                      className={`transition-transform ${
                        openDropdown === link.label ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Dropdown */}
                  {openDropdown === link.label && (
                    <div
                      onMouseEnter={() => setOpenDropdown(link.label)}
                      onMouseLeave={() => setOpenDropdown(null)}
                      style={{
                        backgroundColor: "#082038",
                        border: "1px solid rgba(126,200,216,0.12)",
                      }}
                      className="absolute top-full left-0 mt-1 w-52 rounded-xl overflow-hidden shadow-2xl"
                    >
                      {link.dropdown.map((d) => (
                        <Link
                          key={d.href}
                          href={d.href}
                          style={{
                            backgroundColor: isActive(d.href)
                              ? "rgba(24,128,128,0.12)"
                              : "transparent",
                            color: isActive(d.href)
                              ? "#7EC8D8"
                              : "rgba(126,200,216,0.65)",
                            borderBottom: "1px solid rgba(126,200,216,0.06)",
                          }}
                          className="block px-4 py-3 text-sm transition-colors hover:bg-[rgba(24,128,128,0.1)] hover:text-[#7EC8D8] last:border-0"
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
                      color: isActive(link.href)
                        ? "#7EC8D8"
                        : "rgba(126,200,216,0.55)",
                    }}
                    className="rounded-lg px-3 py-2 text-sm transition-colors hover:text-[#7EC8D8]"
                  >
                    {link.label}
                  </Link>
                </li>
              )
            )}
          </ul>

          {/* Desktop right CTAs */}
          <div className="hidden items-center gap-3 md:flex">
            <Link
              href="/auth/signin"
              style={{ color: "rgba(126,200,216,0.5)" }}
              className="text-sm transition-colors hover:text-[#7EC8D8]"
            >
              Sign in
            </Link>
            <Link
              href="/join"
              style={{ backgroundColor: "#188080", color: "#E8F4F8" }}
              className="rounded-full px-5 py-2 text-sm font-semibold transition-all hover:brightness-110 active:scale-95"
            >
              Join Connexode
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            style={{ color: "#7EC8D8" }}
            className="flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:bg-[rgba(126,200,216,0.08)] md:hidden"
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
          style={{ backgroundColor: "rgba(4,12,24,0.7)", backdropFilter: "blur(4px)" }}
        />
      )}

      {/* ── Mobile drawer ── */}
      <div
        style={{
          backgroundColor: "#061020",
          borderRight: "1px solid rgba(126,200,216,0.1)",
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
          style={{ borderBottom: "1px solid rgba(126,200,216,0.08)" }}
          className="flex items-center justify-between px-6 py-5"
        >
          <Link
            href="/"
            className="flex items-center gap-2.5"
            onClick={() => setMobileOpen(false)}
          >
            <Logo size="default" />
          </Link>
          <button
            onClick={() => setMobileOpen(false)}
            style={{ color: "rgba(126,200,216,0.5)" }}
            className="rounded-lg p-1.5 hover:bg-[rgba(126,200,216,0.08)]"
          >
            <X size={18} />
          </button>
        </div>

        {/* Drawer links */}
        <nav className="flex-1 px-4 py-4 space-y-1">
          {navLinks.map((link) => (
            <div key={link.href}>
              <Link
                href={link.href}
                onClick={() => !link.dropdown && setMobileOpen(false)}
                style={{
                  backgroundColor: isActive(link.href)
                    ? "rgba(24,128,128,0.12)"
                    : "transparent",
                  color: isActive(link.href)
                    ? "#7EC8D8"
                    : "rgba(126,200,216,0.7)",
                  border: `1px solid ${isActive(link.href) ? "rgba(24,128,128,0.25)" : "transparent"}`,
                }}
                className="flex items-center rounded-xl px-4 py-3 text-sm font-medium transition-all hover:bg-[rgba(24,128,128,0.08)] hover:text-[#7EC8D8]"
              >
                {link.label}
              </Link>

              {/* Mobile dropdown items */}
              {link.dropdown && (
                <div className="ml-4 mt-1 space-y-0.5">
                  {link.dropdown.map((d) => (
                    <Link
                      key={d.href}
                      href={d.href}
                      onClick={() => setMobileOpen(false)}
                      style={{
                        color: isActive(d.href)
                          ? "#7EC8D8"
                          : "rgba(126,200,216,0.45)",
                        borderLeft: `2px solid ${isActive(d.href) ? "#188080" : "rgba(126,200,216,0.1)"}`,
                      }}
                      className="flex items-center px-4 py-2.5 text-xs transition-colors hover:text-[#7EC8D8]"
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
          style={{ borderTop: "1px solid rgba(126,200,216,0.08)" }}
          className="p-5 space-y-3"
        >
          <Link
            href="/join"
            onClick={() => setMobileOpen(false)}
            style={{ backgroundColor: "#188080", color: "#E8F4F8" }}
            className="flex items-center justify-center rounded-full py-3 text-sm font-semibold transition-all hover:brightness-110"
          >
            Join Connexode
          </Link>
          <Link
            href="/auth/signin"
            onClick={() => setMobileOpen(false)}
            style={{
              border: "1px solid rgba(126,200,216,0.15)",
              color: "rgba(126,200,216,0.6)",
            }}
            className="flex items-center justify-center rounded-full py-3 text-sm font-medium transition-all hover:text-[#7EC8D8]"
          >
            Sign in
          </Link>
        </div>
      </div>
    </>
  );
}
