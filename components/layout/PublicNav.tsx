"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";

export default function PublicNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      style={{
        background: "rgba(5, 5, 8, 0.85)",
        backdropFilter: "blur(12px)",
        borderBottom: scrolled ? "1px solid rgba(26, 26, 46, 0.8)" : "1px solid transparent",
      }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    >
      <div className="mx-auto max-w-7xl px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1 select-none">
          <span
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 800,
              fontSize: "18px",
              letterSpacing: "-0.5px",
              color: "#FAFAFA",
            }}
          >
            Conne<span style={{ color: "#06B6D4" }}>x</span>ode
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/about"
            style={{ color: "#A1A1AA" }}
            className="text-sm font-medium hover:text-[#FAFAFA] transition-colors"
          >
            About
          </Link>
          <Link
            href="/services"
            style={{ color: "#A1A1AA" }}
            className="text-sm font-medium hover:text-[#FAFAFA] transition-colors"
          >
            Services
          </Link>

          {/* Join Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              onBlur={() => setTimeout(() => setDropdownOpen(false), 200)}
              style={{ color: "#A1A1AA" }}
              className="flex items-center gap-1 text-sm font-medium hover:text-[#FAFAFA] transition-colors focus:outline-none"
            >
              Join <ChevronDown size={14} className={`transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} />
            </button>
            {dropdownOpen && (
              <div
                style={{
                  backgroundColor: "#0D0D14",
                  border: "1px solid #1A1A2E",
                  borderRadius: "12px",
                }}
                className="absolute top-full left-0 mt-2 w-48 py-2 shadow-xl z-50"
              >
                <Link
                  href="/join/ambassador"
                  className="block px-4 py-2 text-xs uppercase tracking-wider font-semibold text-[#06B6D4] hover:bg-[#1A1A2E] transition-colors"
                >
                  Ambassador Program
                </Link>
                <Link
                  href="/join/internship"
                  className="block px-4 py-2 text-xs uppercase tracking-wider font-semibold text-[#06B6D4] hover:bg-[#1A1A2E] transition-colors"
                >
                  Internship Program
                </Link>
              </div>
            )}
          </div>

          <Link
            href="/community"
            style={{ color: "#A1A1AA" }}
            className="text-sm font-medium hover:text-[#FAFAFA] transition-colors"
          >
            Community
          </Link>
          <Link
            href="/contact"
            style={{ color: "#A1A1AA" }}
            className="text-sm font-medium hover:text-[#FAFAFA] transition-colors"
          >
            Contact
          </Link>
        </div>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/register"
            style={{ color: "#A1A1AA" }}
            className="text-sm font-medium hover:text-[#FAFAFA] transition-colors"
          >
            Sign in
          </Link>
          <Link
            href="/join"
            style={{
              background: "linear-gradient(135deg, #7C3AED, #6D28D9)",
              color: "#fff",
              borderRadius: "999px",
              padding: "10px 24px",
              fontWeight: 700,
              fontSize: "0.875rem",
            }}
            className="transition-all hover:brightness-110 active:scale-95 text-center"
          >
            Get started
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{ color: "#FAFAFA" }}
          className="md:hidden focus:outline-none"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          style={{
            backgroundColor: "#050508",
            borderBottom: "1px solid #1A1A2E",
          }}
          className="md:hidden px-6 py-6 flex flex-col gap-4 animate-fadeIn"
        >
          <Link
            href="/about"
            onClick={() => setMobileOpen(false)}
            style={{ color: "#A1A1AA" }}
            className="text-sm font-medium hover:text-[#FAFAFA] py-1 border-b border-[#1A1A2E]"
          >
            About
          </Link>
          <Link
            href="/services"
            onClick={() => setMobileOpen(false)}
            style={{ color: "#A1A1AA" }}
            className="text-sm font-medium hover:text-[#FAFAFA] py-1 border-b border-[#1A1A2E]"
          >
            Services
          </Link>
          <div className="flex flex-col gap-2 pl-2">
            <span style={{ color: "#52525B" }} className="text-xs uppercase tracking-wider font-semibold">Join Programs</span>
            <Link
              href="/join/ambassador"
              onClick={() => setMobileOpen(false)}
              className="text-[#06B6D4] text-xs font-semibold py-1 hover:underline"
            >
              Ambassador Program
            </Link>
            <Link
              href="/join/internship"
              onClick={() => setMobileOpen(false)}
              className="text-[#06B6D4] text-xs font-semibold py-1 hover:underline"
            >
              Internship Program
            </Link>
          </div>
          <Link
            href="/community"
            onClick={() => setMobileOpen(false)}
            style={{ color: "#A1A1AA" }}
            className="text-sm font-medium hover:text-[#FAFAFA] py-1 border-b border-[#1A1A2E]"
          >
            Community
          </Link>
          <Link
            href="/contact"
            onClick={() => setMobileOpen(false)}
            style={{ color: "#A1A1AA" }}
            className="text-sm font-medium hover:text-[#FAFAFA] py-1 border-b border-[#1A1A2E]"
          >
            Contact
          </Link>
          <div className="flex items-center justify-between pt-4 mt-2">
            <Link
              href="/register"
              onClick={() => setMobileOpen(false)}
              style={{ color: "#A1A1AA" }}
              className="text-sm font-medium hover:text-[#FAFAFA]"
            >
              Sign in
            </Link>
            <Link
              href="/join"
              onClick={() => setMobileOpen(false)}
              style={{
                background: "linear-gradient(135deg, #7C3AED, #6D28D9)",
                color: "#fff",
                borderRadius: "999px",
                padding: "10px 24px",
                fontWeight: 700,
                fontSize: "0.875rem",
              }}
              className="text-center"
            >
              Get started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
