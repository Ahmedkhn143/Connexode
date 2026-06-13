"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function SessionGuard() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const publicPaths = ["/", "/leaderboard", "/events", "/ambassador"];
      if (publicPaths.includes(pathname)) {
        const activeUser = localStorage.getItem("connexode_active_user") || sessionStorage.getItem("connexode_active_user");
        if (activeUser) {
          localStorage.removeItem("connexode_active_user");
          sessionStorage.removeItem("connexode_active_user");
          // Dispatch storage event to alert other tabs/components
          window.dispatchEvent(new Event("storage"));
          // Force reload to completely reset auth state across Navbar/UI
          window.location.reload();
        }
      }
    }
  }, [pathname]);

  return null;
}
