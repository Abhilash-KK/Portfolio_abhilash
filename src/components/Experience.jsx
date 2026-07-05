import React, { useState, useEffect, useRef } from 'react';
import ScrollReveal from './ScrollReveal';
import Tilt from './Tilt';

export default function Experience() {
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const sectionHeight = rect.height;
      const viewportHeight = window.innerHeight;

      // Starts when section top enters viewport bottom, ends when section bottom leaves viewport top
      const start = rect.top - viewportHeight;
      const current = -start;
      const totalRange = sectionHeight + viewportHeight;

      const progress = Math.max(0, Math.min(1, current / totalRange));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Trigger initially
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="experience" className="py-24 px-6 md:px-12 max-w-[1200px] mx-auto overflow-hidden">
      <ScrollReveal className="flex flex-col items-start mb-16">
        {/* Title */}
        <h2 className="font-display text-3xl md:text-4xl font-extrabold text-white uppercase tracking-wider">
          PROFESSIONAL EXPERIENCE
        </h2>
        <div className="h-[3px] w-48 bg-gradient-to-r from-green-400 via-yellow-400 to-purple-600 mt-3 rounded-full"></div>
      </ScrollReveal>

      {/* Timeline Wrapper Container */}
      <div ref={containerRef} className="relative pl-8 md:pl-16 flex flex-col gap-12">
        {/* Vertical SVG Pipeline Line */}
        <div className="absolute left-3 md:left-6 top-2 bottom-2 w-1 flex justify-center z-0">
          <svg className="w-4 h-full pointer-events-none">
            {/* Background track */}
            <line 
              x1="50%" 
              y1="0%" 
              x2="50%" 
              y2="100%" 
              stroke="#1f1f29" 
              strokeWidth="3" 
              strokeLinecap="round" 
            />
            {/* Glowing active line */}
            <line 
              x1="50%" 
              y1="0%" 
              x2="50%" 
              y2={`${scrollProgress * 100}%`} 
              stroke="var(--primary-color, #a855f7)" 
              strokeWidth="3" 
              strokeLinecap="round"
              style={{ filter: 'drop-shadow(0px 0px 5px var(--primary-color, #a855f7))' }}
            />
          </svg>
        </div>

        {/* Experience Card 1 - M-Squared */}
        <div className="relative">
          {/* Glowing node point */}
          <div 
            className={`absolute -left-[28px] md:-left-[47px] top-8 w-4 h-4 rounded-full border-2 transition-all duration-500 z-10 ${
              scrollProgress > 0.25 
                ? 'bg-primary border-primary shadow-[0_0_12px_var(--primary-color,#a855f7)] scale-110' 
                : 'bg-[#050505] border-border-dark'
            }`}
          />
          <ScrollReveal>
            <Tilt className="bg-[#0b0b0f] border border-border-dark p-8 md:p-10 rounded-2xl shadow-xl hover:border-primary/30 transition-all duration-300">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-border-dark/60 pb-6 mb-6">
                <div>
                  <h3 className="font-display text-2xl font-bold text-white mb-1">
                    Web Development Intern
                  </h3>
                  <p className="text-primary font-semibold text-sm">
                    M-Squared Software & Services (P) Ltd.
                  </p>
                  <p className="text-slate-500 text-xs mt-1">
                    June 15th 2026 - June 27th 2026 | Thiruvananthapuram, Kerala, India
                  </p>
                </div>
                <span className="bg-green-500/10 text-green-400 border border-green-500/20 px-4 py-1.5 rounded-full text-xs font-semibold shadow-[0_0_15px_rgba(74,222,128,0.15)]">
                  Certificate of Participation Received
                </span>
              </div>

              {/* Internship details & accomplishments */}
              <div>
                <h4 className="font-display text-xs font-bold tracking-widest text-slate-300 uppercase mb-4">
                  Hands-on Experience & Training
                </h4>
                <ul className="list-disc pl-5 flex flex-col gap-2.5 text-sm text-slate-400 leading-relaxed font-sans">
                  <li>Undertook an intensive **2-week Web Development internship** conforming to the 2nd Semester MCA curriculum from Amal Jyothi College of Engineering.</li>
                  <li>Gained practical exposure to building responsive web designs and styling modern interfaces.</li>
                  <li>Collaborated on project deliverables and web architecture tasks.</li>
                  <li>Demonstrated **outstanding performance and dedication** throughout the internship program.</li>
                </ul>
              </div>
            </Tilt>
          </ScrollReveal>
        </div>

        {/* Experience Card 2 - GeekWick */}
        <div className="relative">
          {/* Glowing node point */}
          <div 
            className={`absolute -left-[28px] md:-left-[47px] top-8 w-4 h-4 rounded-full border-2 transition-all duration-500 z-10 ${
              scrollProgress > 0.65 
                ? 'bg-primary border-primary shadow-[0_0_12px_var(--primary-color,#a855f7)] scale-110' 
                : 'bg-[#050505] border-border-dark'
            }`}
          />
          <ScrollReveal>
            <Tilt className="bg-[#0b0b0f] border border-border-dark p-8 md:p-10 rounded-2xl shadow-xl hover:border-primary/30 transition-all duration-300">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-border-dark/60 pb-6 mb-6">
                <div>
                  <h3 className="font-display text-2xl font-bold text-white mb-1">
                    Internship Trainee
                  </h3>
                  <p className="text-primary font-semibold text-sm">
                    GeekWick TechMedia Services Pvt Ltd
                  </p>
                  <p className="text-slate-500 text-xs mt-1">
                    March 10th 2025 - May 2nd 2025 | Mysore, India
                  </p>
                </div>
                <span className="bg-green-500/10 text-green-400 border border-green-500/20 px-4 py-1.5 rounded-full text-xs font-semibold shadow-[0_0_15px_rgba(74,222,128,0.15)]">
                  Certificate of Internship Received
                </span>
              </div>

              {/* Internship details & accomplishments */}
              <div>
                <h4 className="font-display text-xs font-bold tracking-widest text-slate-300 uppercase mb-4">
                  Hands-on Experience & Training
                </h4>
                <ul className="list-disc pl-5 flex flex-col gap-2.5 text-sm text-slate-400 leading-relaxed font-sans">
                  <li>Acquired practical understanding of **software development principles** in enterprise layouts.</li>
                  <li>Designed and planned modern interfaces for **Web and Mobile application development** layouts.</li>
                  <li>Executed project deliverables, participating in planning sessions, sprint scopes, and milestone reviews.</li>
                  <li>Practiced active **team collaboration and Agile communication** under the guidance of Akshith TP and Shivaraj from the IT department.</li>
                </ul>
              </div>
            </Tilt>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
