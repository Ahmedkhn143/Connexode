import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import TracksSection from "@/components/landing/TracksSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import TrustSection from "@/components/landing/TrustSection";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";
import WelcomeBanner from "@/components/landing/WelcomeBanner";

export const metadata: Metadata = {
  title: "Connexode — Build Real Skills. Get Real Experience. Land Your Job.",
  description:
    "A premium task-based virtual internship platform. Pick a tech track, follow structured daily tasks, submit GitHub projects, and earn industry-verified certificates.",
};

export default function HomePage() {
  return (
    <main className="relative bg-[#020B18]">
      <Navbar />
      <HeroSection />
      <TracksSection />
      <HowItWorksSection />
      <TrustSection />
      <CTASection />
      <Footer />
      <WelcomeBanner />
    </main>
  );
}

