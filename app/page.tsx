"use client";

import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/sections/hero";
import { AboutSection } from "@/components/sections/about";
import { SkillsSection } from "@/components/sections/skills";
import { ProjectsSection } from "@/components/sections/projects";
import { ExperienceSection } from "@/components/sections/experience";
import { CodingSection } from "@/components/sections/coding";
import { TechStackSection } from "@/components/sections/tech-stack";
import { ContactSection } from "@/components/sections/contact";
import { AnimatedBackground } from "@/components/animated-background";
import { CustomCursor } from "@/components/custom-cursor";
import { ScrollProgress } from "@/components/scroll-progress";
import { BackToTop } from "@/components/back-to-top";
import { LoadingScreen } from "@/components/loading-screen";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <CustomCursor />
      <ScrollProgress />
      <AnimatedBackground />

      <div className="relative z-10">
        <Navbar />

        <main>
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <ExperienceSection />
          <CodingSection />
          <TechStackSection />
          <ContactSection />
        </main>

        <Footer />
      </div>

      <BackToTop />
    </>
  );
}
