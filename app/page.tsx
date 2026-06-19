import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import ContactModalTrigger from "@/components/landing/ContactModalTrigger";
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
      <WelcomeBanner />
      <ContactModalTrigger />
    </main>
  );
}





