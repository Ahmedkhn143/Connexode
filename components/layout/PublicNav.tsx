"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, Sun, Moon } from "lucide-react";
import Logo from "@/components/ui/Logo";
import { useTheme } from "next-themes";

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
        width: 36, height: 36, borderRadius: "50%",
        background: "var(--surface)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: "1px solid var(--border)",
        display: "flex", alignItems: "center", justifyContent: "center",
        color: "var(--text-secondary)", cursor: "pointer",
        transition: "all 0.2s", flexShrink: 0,
      }}
      className="hover:border-[var(--border-strong)] hover:scale-110"
    >
      {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
    </button>
  );
}

export default function PublicNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      style={{
        background: scrolled ? "var(--surface)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: `1px solid ${scrolled ? "var(--border)" : "transparent"}`,
        boxShadow: scrolled ? "var(--shadow-sm)" : "none",
        transition: "all 0.3s ease",
      }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="mx-auto max-w-7xl px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center select-none">
          <Logo size="default" />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-7">
          {[
            { label: "About", href: "/about" },
            { label: "Services", href: "/services" },
            { label: "Community", href: "/community" },
            { label: "Contact", href: "/contact" },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              style={{ color: "var(--text-secondary)", fontSize: "14px", fontWeight: 500 }}
              className="transition-colors hover:text-[var(--text-primary)]"
            >
              {l.label}
            </Link>
          ))}

          {/* Join Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              onBlur={() => setTimeout(() => setDropdownOpen(false), 150)}
              style={{ color: "var(--text-secondary)", fontSize: "14px", fontWeight: 500 }}
              className="flex items-center gap-1 transition-colors hover:text-[var(--text-primary)] focus:outline-none"
            >
              Join <ChevronDown size={13} className={`transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
            </button>
            {dropdownOpen && (
              <div
                style={{
                  background: "var(--surface)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  border: "1px solid var(--border)",
                  boxShadow: "var(--shadow-md)",
                  borderRadius: "12px",
                }}
                className="absolute top-full left-0 mt-2 w-52 overflow-hidden"
              >
                {[
                  { label: "Ambassador Program", href: "/join/ambassador" },
                  { label: "Internship Program", href: "/join/internship" },
                ].map((d) => (
                  <Link
                    key={d.href}
                    href={d.href}
                    style={{ color: "var(--text-secondary)", borderBottom: "1px solid var(--border)", fontSize: "13px" }}
                    className="block px-4 py-3 transition-colors hover:text-[var(--violet)] hover:bg-[var(--theme-hover)] last:border-0"
                  >
                    {d.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <NavThemeToggle />
          <Link
            href="/register"
            style={{ color: "var(--text-secondary)", fontSize: "14px", fontWeight: 500 }}
            className="transition-colors hover:text-[var(--text-primary)]"
          >
            Sign in
          </Link>
          <Link
            href="/join"
            style={{
              background: "var(--gradient)",
              color: "#fff",
              borderRadius: "999px",
              padding: "10px 24px",
              fontWeight: 700,
              fontSize: "14px",
              boxShadow: "var(--shadow-glow)",
            }}
            className="transition-all hover:brightness-110 hover:-translate-y-0.5 active:scale-95"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{ color: "var(--text-primary)" }}
          className="md:hidden focus:outline-none"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          style={{
            background: "var(--surface-solid)",
            borderBottom: "1px solid var(--border)",
          }}
          className="md:hidden px-6 py-6 flex flex-col gap-4"
        >
          {[
            { label: "About", href: "/about" },
            { label: "Services", href: "/services" },
            { label: "Ambassador Program", href: "/join/ambassador" },
            { label: "Internship Program", href: "/join/internship" },
            { label: "Community", href: "/community" },
            { label: "Contact", href: "/contact" },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              style={{ color: "var(--text-secondary)", borderBottom: "1px solid var(--border)", fontSize: "14px" }}
              className="transition-colors hover:text-[var(--text-primary)] py-1"
            >
              {l.label}
            </Link>
          ))}
          <div className="flex items-center justify-between pt-4 mt-2">
            <div className="flex items-center gap-3">
              <NavThemeToggle />
              <Link href="/register" onClick={() => setMobileOpen(false)} style={{ color: "var(--text-secondary)", fontSize: "14px" }} className="transition-colors hover:text-[var(--text-primary)]">
                Sign in
              </Link>
            </div>
            <Link
              href="/join"
              onClick={() => setMobileOpen(false)}
              style={{ background: "var(--gradient)", color: "#fff", borderRadius: "999px", padding: "10px 24px", fontWeight: 700, fontSize: "14px" }}
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
