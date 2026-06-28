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

  const infoBlocks = [
    {
      title: 'Education',
      icon: 'fas fa-graduation-cap',
      desc: 'Currently pursuing MCA (Master of Computer Applications) at Amal Jyothi College of Engineering. Building strong mathematical and programming foundations.'
    },
    {
      title: 'Career Objective',
      icon: 'fas fa-bullseye',
      desc: 'Passionate about Web Development. Aspiring to begin my professional journey in a growth-oriented organization that values innovation, dedication, and technical growth.'
    },
    {
      title: 'Interests',
      icon: 'fas fa-brain',
      desc: 'Deeply interested in Artificial Intelligence models, Computer Vision systems, and building responsive, secure Full Stack Web Applications.'
    },
    {
      title: 'Key Strengths',
      icon: 'fas fa-bolt',
      desc: 'Quick learner, analytical thinker, active team collaborator, and dedicated problem solver prepared to take on new technical challenges.'
    }
  ];

  return (
    <section id="about" className="relative py-24 px-6 md:px-12 max-w-[1200px] mx-auto text-center overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-purple-900/5 rounded-full blur-[120px] pointer-events-none"></div>

      <ScrollReveal className="relative z-10 flex flex-col items-center">
        {/* Centered Heading */}
        <h2 className="font-display text-3xl md:text-4xl font-extrabold text-white tracking-widest uppercase mb-6">
          ABOUT ME
        </h2>
        <div className="h-[3px] w-24 bg-gradient-to-r from-green-400 to-purple-600 mb-10 rounded-full"></div>

        {/* Introduction text */}
        <p className="font-sans text-slate-300 text-base md:text-lg leading-[1.8] max-w-[850px] mb-16 text-center">
          Hi, I'm Abhilash K K. I am an enthusiastic, self-driven developer looking to begin my professional journey. I utilize my analytical capabilities and educational foundations to solve complex problems, build modern applications, and learn new technical stacks rapidly.
        </p>

        {/* Structured Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-[1000px] mb-16 text-left">
          {infoBlocks.map((block) => (
            <div 
              key={block.title} 
              className="bg-[#0b0b0f] border border-border-dark p-6 rounded-xl hover:border-primary/20 transition-all duration-300 flex items-start gap-4"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                <i className={`${block.icon} text-sm`}></i>
              </div>
              <div>
                <h3 className="font-display text-sm font-bold text-white uppercase tracking-wider mb-2">
                  {block.title}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {block.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Hacker Terminal console box */}
        <div className="w-full flex flex-col items-center mb-16">
          <h3 className="font-display text-xs font-bold text-slate-500 tracking-[0.25em] uppercase mb-4">
            Interactive Diagnostics Shell
          </h3>
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
