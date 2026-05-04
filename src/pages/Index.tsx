import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { AIAgents } from "@/components/AIAgents";
import { Proof } from "@/components/Proof";
import { CaseStudies } from "@/components/CaseStudies";
import { Pricing } from "@/components/Pricing";
import { About } from "@/components/About";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-black">
      <Hero />
      <Proof />
      <Services />
      <AIAgents />
      <CaseStudies />
      <Pricing />
      <About />
      <CTA />
      <Footer />
    </main>
  );
};

export default Index;
