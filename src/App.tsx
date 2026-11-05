import React, { useState, useEffect, lazy, Suspense } from 'react';
import { ReadingProgressBar } from './components/ReadingProgressBar';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { HeroMetrics } from './components/HeroMetrics';
import { MotionToggle } from './components/MotionToggle';
import { ProjectsSection } from './components/ProjectsSection';
import { SkillsSection } from './components/SkillsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { About } from './components/About';
import { EducationSection } from './components/EducationSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ScrollReveal } from './components/ScrollReveal';

const ResumeModal = lazy(() =>
  import('./components/ResumeModal').then((m) => ({ default: m.ResumeModal }))
);

export default function App() {
  const [resumeOpen, setResumeOpen] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: -500, y: -500 });
  const [cursorOpacity, setCursorOpacity] = useState(0);

  // Spotlight Cursor follower with warm editorial glow
  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
      setCursorOpacity(1);
    };

    const handlePointerLeave = () => {
      setCursorOpacity(0);
    };

    window.addEventListener('pointermove', handlePointerMove);
    document.addEventListener('mouseleave', handlePointerLeave);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('mouseleave', handlePointerLeave);
    };
  }, []);

  return (
    <div className="bg-[#030303] text-[#f1eee8] font-sans antialiased relative min-h-screen overflow-x-hidden selection:bg-[#ff8c59] selection:text-[#030303]">
      {/* Keyboard Accessible Skip to Content Link */}
      <a
        href="#projects"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-[#ff8c59] focus:text-[#030303] focus:font-mono focus:text-xs focus:rounded-md focus:shadow-lg focus:outline-none"
      >
        Skip to content
      </a>

      {/* Top Reading Progress Bar */}
      <ReadingProgressBar />

      {/* Subtle Editorial Hairline Grid */}
      <div className="fixed inset-0 editorial-grid pointer-events-none opacity-60 z-0" />

      {/* Top Ambient Warmth Glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[550px] bg-[radial-gradient(ellipse_at_top,rgba(255,140,89,0.06),rgba(241,238,232,0.02)_40%,transparent_70%)] pointer-events-none z-0" />

      {/* Interactive Cursor Spotlight Follower */}
      <div
        className="fixed w-[450px] h-[450px] rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 z-0 transition-opacity duration-300 blur-3xl bg-[radial-gradient(circle,rgba(255,140,89,0.06)_0%,rgba(241,238,232,0.02)_50%,transparent_75%)]"
        style={{
          left: `${cursorPos.x}px`,
          top: `${cursorPos.y}px`,
          opacity: cursorOpacity,
        }}
      />

      {/* Navigation Header */}
      <Navbar onOpenResume={() => setResumeOpen(true)} />

      {/* Main Content Sections */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-6">
        <Hero />

        {/* Full-width 4-Column Metric Stat Strip */}
        <HeroMetrics />

        {/* Chapter 01: Work */}
        <ProjectsSection />

        {/* Chapter 02: Expertise */}
        <ScrollReveal direction="up" delay={50}>
          <SkillsSection />
        </ScrollReveal>

        {/* Chapter 03: Journey */}
        <ScrollReveal direction="up" delay={50}>
          <ExperienceSection />
        </ScrollReveal>

        {/* Chapter 04: Perspective & Specifications */}
        <ScrollReveal direction="up" delay={50}>
          <About onOpenResume={() => setResumeOpen(true)} />
        </ScrollReveal>

        {/* Academic Foundation */}
        <ScrollReveal direction="up" delay={50}>
          <EducationSection />
        </ScrollReveal>

        {/* Chapter 05: Contact */}
        <ScrollReveal direction="up" delay={50}>
          <ContactSection />
        </ScrollReveal>
      </main>

      {/* Editorial Footer */}
      <Footer />

      {/* Full Curriculum Vitae / Resume Modal (Code-Split) */}
      <Suspense fallback={null}>
        <ResumeModal
          isOpen={resumeOpen}
          onClose={() => setResumeOpen(false)}
        />
      </Suspense>

      {/* Floating Motion Control Toggle */}
      <MotionToggle />
    </div>
  );
}
