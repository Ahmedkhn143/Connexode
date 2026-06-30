"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <motion.button
      onClick={toggleTheme}
      type="button"
      className="fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-[#080f1e]/80 backdrop-blur-md shadow-2xl text-violet-600 dark:text-cyan-400 hover:scale-110 active:scale-95 transition-all cursor-pointer"
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.95 }}
      title="Toggle Light/Dark Theme"
    >
      {theme === "dark" ? (
        <Sun size={20} className="text-yellow-400" />
      ) : (
        <Moon size={20} className="text-purple-600 fill-purple-600" />
      )}
    </motion.button>
  );
}
