import useReveal from "../hooks/useReveal";
import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";
import MobileMockup from "../components/landing/MobileMockup";
import DesktopMockup from "../components/landing/DesktopMockup";
import Features from "../components/landing/Features";
import Testimonials from "../components/landing/Testimonials";
import HowItWorks from "../components/landing/HowItWorks";
import TechStack from "../components/landing/TechStack";
import BuiltBy from "../components/landing/BuiltBy";
import CTA from "../components/landing/CTA";
import Footer from "../components/landing/Footer";
import "./LandingPage.css";

export default function LandingPage() {
  useReveal();

  return (
    <div className="relative min-h-screen bg-slate-900 overflow-x-hidden">
      {/* Bg decorators */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none" />
      <div className="fixed top-0 -left-10 w-[480px] h-[480px] bg-pink-500 opacity-[0.07] blur-[120px] rounded-full pointer-events-none" />
      <div className="fixed bottom-0 -right-10 w-[480px] h-[480px] bg-cyan-500 opacity-[0.07] blur-[120px] rounded-full pointer-events-none" />
      <Navbar />
      <Hero />
      <MobileMockup />
      <DesktopMockup />
      <Features />
      <Testimonials />
      <HowItWorks />
      <TechStack />
      <BuiltBy />
      <CTA />
      <Footer />
    </div>
  );
}
