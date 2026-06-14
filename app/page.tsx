import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import ServicesSection from "@/components/landing/ServicesSection";
import PortfolioSection from "@/components/landing/PortfolioSection";
import WebDemoSection from "@/components/landing/WebDemoSection";
import TechStackSection from "@/components/landing/TechStackSection";
import EngagementSection from "@/components/landing/EngagementSection";
import IndustriesSection from "@/components/landing/IndustriesSection";
import ContactModalTrigger from "@/components/landing/ContactModalTrigger";
import TracksSection from "@/components/landing/TracksSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import CompanyDetailsSection from "@/components/landing/CompanyDetailsSection";
import AmbassadorBenefitsSection from "@/components/landing/AmbassadorBenefitsSection";
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
      <ServicesSection />
      <PortfolioSection />
      <WebDemoSection />
      <TechStackSection />
      <EngagementSection />
      <IndustriesSection />
      {/* <TracksSection /> */}
      {/* <HowItWorksSection /> */}
      <CompanyDetailsSection />
      <AmbassadorBenefitsSection />
      <TrustSection />
      <CTASection />
      <Footer />
      <WelcomeBanner />
      <ContactModalTrigger />
    </main>
  );
}





