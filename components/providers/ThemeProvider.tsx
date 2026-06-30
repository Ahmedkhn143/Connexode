// components/providers/ThemeProvider.tsx
// Uses next-themes — light is default, dark toggle via .dark class on <html>
"use client";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="light" enableSystem={false}>
      {children}
    </NextThemesProvider>
  );
}

// Re-export useTheme from next-themes so existing imports still work
export { useTheme } from "next-themes";
