"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("light");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("connexode_theme");
      if (saved === "dark") {
        setTheme("dark");
        document.documentElement.classList.remove("light");
      } else {
        setTheme("light");
        document.documentElement.classList.add("light");
      }
    }
  }, []);

  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
      localStorage.setItem("connexode_theme", "light");
      document.documentElement.classList.add("light");
    } else {
      setTheme("dark");
      localStorage.setItem("connexode_theme", "dark");
      document.documentElement.classList.remove("light");
    }
  };

  return (
    <motion.button
      onClick={toggleTheme}
      type="button"
      className="fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-[#080f1e]/80 backdrop-blur-md shadow-2xl text-cyan-400 hover:text-white hover:scale-110 active:scale-95 transition-all cursor-pointer"
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.95 }}
      title="Toggle Light/Dark Theme"
    >
      {theme === "dark" ? (
        <Sun size={20} className="animate-spin-slow text-yellow-400" />
      ) : (
        <Moon size={20} className="text-purple-600 fill-purple-600" />
      )}
    </motion.button>
  );
}
