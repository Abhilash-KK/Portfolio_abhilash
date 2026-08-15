import React from 'react';
import ScrollReveal from './ScrollReveal';
import TerminalWidget from './TerminalWidget';
import GithubStream from './GithubStream';

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
      desc: 'Currently pursuing MCA at Amal Jyothi College of Engineering (GPA: 9.01/10). Completed BCA at MIT Mysore (GPA: 8.65/10).'
    },
    {
      title: 'Career Objective',
      icon: 'fas fa-bullseye',
      desc: 'Motivated and enthusiastic graduate seeking an opportunity to start my career in a growth-oriented organization to apply my skills, learn new technologies, and contribute to success.'
    },
    {
      title: 'Interests',
      icon: 'fas fa-brain',
      desc: 'Deeply interested in Artificial Intelligence, Computer Vision, YOLO architectures, and building responsive, secure Web Applications.'
    },
    {
      title: 'Key Strengths',
      icon: 'fas fa-bolt',
      desc: 'Quick learner, good team player, analytical thinker, fast learner, and committed to continuous learning and professional growth.'
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
          Hi, I'm Abhilash K K. Motivated and enthusiastic graduate seeking an opportunity to start my career in a growth-oriented organization. I aim to apply my knowledge and skills, learn new technologies, and gain practical experience while contributing to the success of the organization.
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

        {/* Interactive Hacker Terminal & GitHub Stream Dashboard */}
        <div className="w-full max-w-[1100px] flex flex-col lg:flex-row gap-6 items-stretch mb-16">
          <div className="flex-1 flex flex-col items-center">
            <h3 className="font-display text-xs font-bold text-slate-500 tracking-[0.25em] uppercase mb-4 self-center lg:self-start">
              Interactive Diagnostics Shell
            </h3>
            <TerminalWidget />
          </div>
          <div className="w-full lg:w-auto flex flex-col items-center shrink-0">
            <h3 className="font-display text-xs font-bold text-slate-500 tracking-[0.25em] uppercase mb-4 self-center lg:self-start">
              Live Activity Stream
            </h3>
            <GithubStream />
          </div>
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
