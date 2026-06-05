import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import AiReviewerDemo from "@/components/task/AiReviewerDemo";

export const metadata: Metadata = {
  title: "AI Code Reviewer — Connexode Labs",
  description: "Futuristic Pull Request analyzer and code health indicator.",
};

export default function AiReviewerPage() {
  return (
    <main className="relative min-h-screen bg-[#020B18] text-slate-100 pb-20 pt-28 overflow-hidden">
      {/* Top Navbar */}
      <Navbar />

      {/* Main UI component */}
      <AiReviewerDemo />
    </main>
  );
}
