import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Education from './components/Education';
import Skills from './components/Skills';
import Certificates from './components/Certificates';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import InteractiveCanvas from './components/InteractiveCanvas';

export default function App() {
  return (
    <div className="bg-bg-dark text-white min-h-screen relative antialiased selection:bg-primary selection:text-white">
      {/* Dynamic interactive neural net canvas background */}
      <InteractiveCanvas />

      {/* Decorative background grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none z-0"></div>
      
      {/* Navbar - Fixed glass header */}
      <Navbar />

      {/* Hero Header Area */}
      <Hero />

      {/* Main sections block */}
      <main>
        {/* About Section */}
        <About />

        {/* Portfolio / Projects Section */}
        <Projects />

        {/* Professional Experience Section */}
        <Experience />

        {/* Testimonials / Education solid purple blocks */}
        <Education />

        {/* Skills Section */}
        <Skills />

        {/* Accolades / Certifications Section */}
        <Certificates />

        {/* Contact Form & Footer Details */}
        <ContactForm />
      </main>

      {/* Footer copyright and social */}
      <Footer />
    </div>
  );
}
