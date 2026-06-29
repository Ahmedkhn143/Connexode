"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function MentorRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/dashboard/mentor");
  }, [router]);

  return (
    <div style={{ backgroundColor: "#050508", color: "#FAFAFA" }} className="min-h-screen flex items-center justify-center font-sans">
      <p className="text-sm text-slate-400">Redirecting to mentor dashboard...</p>
    </div>
  );
}
