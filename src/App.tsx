import React from 'react';
import {Analytics} from '@vercel/analytics/react';
import Navbar from './components/Navbar';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Achievements from './components/sections/Achievements';
import Education from './components/sections/Education';
import Certifications from './components/sections/Certifications';
import Contact from './components/sections/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import FloatingChat from './components/sections/FloatingChat';

export default function App() {
  return (
    <div className="bg-[#050505] min-h-screen text-[#f3f4f6] select-none relative selection:bg-white/10 selection:text-white transition-colors duration-300">
      {/* Dynamic customizable interaction visualizer trailing pointer */}
      <CustomCursor />

      {/* Background radial overlays */}
      <div className="absolute inset-0 bg-[#050505] -z-20"></div>
      
      {/* Dynamic Background Grid Mesh */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none -z-10"></div>

      {/* Top persistent navigation bar */}
      <Navbar />

      {/* Stacked sections layout for natural scrollable experience */}
      <main className="relative flex flex-col">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Achievements />
        <Education />
        <Certifications />
        <Contact />
      </main>

      {/* Footer credits and connections persistent at the bottom of pages */}
      <Footer />

      {/* Floating Interactive Chat Assistant Bubble */}
      <FloatingChat />

      {/* Vercel Web Analytics */}
      <Analytics />
    </div>
  );
}
