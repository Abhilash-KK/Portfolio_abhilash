import React from 'react';
import ScrollReveal from './ScrollReveal';
import TerminalWidget from './TerminalWidget';

export default function About() {
  const pillars = [
    'COMPUTER VISION',
    'DEEP LEARNING',
    'YOLO ARCHITECTURES',
    'MODEL TRAINING'
  ];

  return (
    <section id="about" className="relative py-24 px-6 md:px-12 max-w-[1000px] mx-auto text-center overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-purple-900/5 rounded-full blur-[120px] pointer-events-none"></div>

      <ScrollReveal className="relative z-10 flex flex-col items-center">
        {/* Centered Heading */}
        <h2 className="font-display text-3xl md:text-4xl font-extrabold text-white tracking-widest uppercase mb-10">
          ABOUT ME
        </h2>

        {/* About Text Description */}
        <p className="font-sans text-slate-300 text-base md:text-lg leading-[1.8] max-w-[800px] mb-12">
          Welcome to my developer portfolio. I am an enthusiastic and self-driven graduate looking to begin my professional journey in a growth-oriented organization that values innovation and dedication. I aspire to utilize my educational background and analytical abilities to support organizational objectives while gaining hands-on industry experience. Adaptable and quick to learn, I am prepared to embrace new challenges, collaborate effectively with teams, and contribute meaningfully to deep learning projects.
        </p>

        {/* Interactive Hacker Terminal console box */}
        <div className="w-full flex justify-center mb-12">
          <TerminalWidget />
        </div>

        {/* Expertise Pillars List */}
        <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-4 font-display text-[0.8rem] font-bold tracking-[0.2em] text-white">
          {pillars.map((pillar, index) => (
            <React.Fragment key={pillar}>
              <span className="hover:text-primary transition-colors">{pillar}</span>
              {index < pillars.length - 1 && (
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.8)] block"></span>
              )}
            </React.Fragment>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}
