import React, { useState, useEffect, useRef } from 'react';
import ScrollReveal from './ScrollReveal';
import Tilt from './Tilt';
import { playClick, playHover } from '../utils/sfx';

export default function Experience() {
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeCert, setActiveCert] = useState(null);

  const experiences = [
    {
      id: 'm-squared',
      title: 'Web Development Intern',
      company: 'M-Squared Software & Services (P)Ltd',
      period: 'June 15, 2026 – June 27, 2026 | Thiruvananthapuram, Kerala, India',
      badge: 'Certificate Received',
      highlights: [
        'Completed an intensive web development internship, gaining hands-on experience in building responsive websites using HTML, CSS, JavaScript, and modern web practices.',
        'Collaborated on web architecture and UI implementation while demonstrating strong technical and problem-solving skills.'
      ],
      certImage: `${import.meta.env.BASE_URL}certificates/msquared_internship.png`,
      certPdf: `${import.meta.env.BASE_URL}certificates/msquared_internship.pdf`
    },
    {
      id: 'geekwick',
      title: 'Frontend Developer Intern',
      company: 'Geek Wick TechMedia Services Pvt Ltd',
      period: 'March 10, 2025 – May 2, 2025 | Mysore, Karnataka, India',
      badge: 'Certificate Received',
      highlights: [
        'Developed responsive UI components using React.js and Tailwind CSS, successfully converting Figma designs into functional layouts.',
        'Integrated REST APIs using Axios, and implemented routing and state management to optimize frontend performance.'
      ],
      techStack: ['React.js', 'JavaScript (ES6)', 'Tailwind CSS', 'Axios', 'Git', 'GitHub', 'Figma'],
      certImage: `${import.meta.env.BASE_URL}certificates/geekwick_internship.png`,
      certPdf: `${import.meta.env.BASE_URL}certificates/geekwick_internship.pdf`
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const sectionHeight = rect.height;
      const viewportHeight = window.innerHeight;

      const start = rect.top - viewportHeight;
      const current = -start;
      const totalRange = sectionHeight + viewportHeight;

      const progress = Math.max(0, Math.min(1, current / totalRange));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenCert = (exp) => {
    playClick();
    if (exp.certImage || exp.certPdf) {
      setActiveCert(exp);
    }
  };

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
            <line 
              x1="50%" 
              y1="0%" 
              x2="50%" 
              y2="100%" 
              stroke="#1f1f29" 
              strokeWidth="3" 
              strokeLinecap="round" 
            />
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

        {experiences.map((exp, idx) => (
          <div key={exp.id} className="relative">
            {/* Glowing node point */}
            <div 
              className={`absolute -left-[28px] md:-left-[47px] top-8 w-4 h-4 rounded-full border-2 transition-all duration-500 z-10 ${
                scrollProgress > (idx === 0 ? 0.25 : 0.65)
                  ? 'bg-primary border-primary shadow-[0_0_12px_var(--primary-color,#a855f7)] scale-110' 
                  : 'bg-[#050505] border-border-dark'
              }`}
            />
            <ScrollReveal>
              <Tilt className="bg-[#0b0b0f] border border-border-dark p-8 md:p-10 rounded-2xl shadow-xl hover:border-primary/30 transition-all duration-300">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-border-dark/60 pb-6 mb-6">
                  <div>
                    <h3 className="font-display text-2xl font-bold text-white mb-1">
                      {exp.title}
                    </h3>
                    <p className="text-primary font-semibold text-sm">
                      {exp.company}
                    </p>
                    <p className="text-slate-500 text-xs mt-1">
                      {exp.period}
                    </p>
                  </div>

                  {exp.certImage || exp.certPdf ? (
                    <button
                      onClick={() => handleOpenCert(exp)}
                      onMouseEnter={playHover}
                      className="bg-green-500/10 hover:bg-green-500/20 text-green-400 border border-green-500/30 px-4 py-2 rounded-full text-xs font-semibold shadow-[0_0_15px_rgba(74,222,128,0.15)] hover:shadow-[0_0_20px_rgba(74,222,128,0.3)] transition-all duration-300 flex items-center gap-2 cursor-pointer"
                    >
                      <i className="fas fa-eye text-xs"></i>
                      <span>VIEW CERTIFICATE</span>
                    </button>
                  ) : (
                    <span className="bg-green-500/10 text-green-400 border border-green-500/20 px-4 py-1.5 rounded-full text-xs font-semibold shadow-[0_0_15px_rgba(74,222,128,0.15)]">
                      {exp.badge}
                    </span>
                  )}
                </div>

                {/* Internship details & accomplishments */}
                <div>
                  <h4 className="font-display text-xs font-bold tracking-widest text-slate-300 uppercase mb-4">
                    Key Accomplishments & Training
                  </h4>
                  <ul className="list-disc pl-5 flex flex-col gap-2.5 text-sm text-slate-400 leading-relaxed font-sans mb-4">
                    {exp.highlights.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>

                  {exp.techStack && (
                    <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-border-dark/40">
                      <span className="text-xs font-bold text-slate-300 font-display uppercase tracking-wider">Technologies Used:</span>
                      {exp.techStack.map((tech) => (
                        <span key={tech} className="bg-[#12121a] text-slate-300 border border-border-dark px-2.5 py-1 rounded text-xs font-semibold">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Tilt>
            </ScrollReveal>
          </div>
        ))}
      </div>

      {/* Internship Certificate Modal */}
      {activeCert && (
        <div 
          className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setActiveCert(null)}
        >
          <div 
            className="bg-[#0b0b0f] border border-border-dark w-full max-w-4xl max-h-[92vh] rounded-2xl flex flex-col overflow-hidden shadow-[0_0_50px_rgba(168,85,247,0.3)] animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-border-dark flex flex-wrap items-center justify-between gap-3 bg-bg-dark/90 shrink-0">
              <div>
                <span className="text-[0.65rem] font-display font-bold tracking-[0.25em] text-primary block uppercase">
                  INTERNSHIP CERTIFICATE
                </span>
                <h3 className="font-display text-base sm:text-xl font-bold text-white uppercase tracking-wide">
                  {activeCert.company}
                </h3>
              </div>
              
              <div className="flex items-center gap-3">
                {activeCert.certPdf && (
                  <a
                    href={activeCert.certPdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    onMouseEnter={playHover}
                    onClick={playClick}
                    className="font-display text-[0.75rem] font-bold tracking-wider bg-primary hover:bg-primary-hover text-white px-4 py-2.5 rounded-lg uppercase transition-all duration-300 flex items-center gap-2 shadow-[0_0_15px_rgba(168,85,247,0.3)]"
                  >
                    <i className="fas fa-file-pdf text-xs"></i>
                    <span>OPEN OFFICIAL PDF</span>
                  </a>
                )}

                <button
                  onClick={() => {
                    playClick();
                    setActiveCert(null);
                  }}
                  onMouseEnter={playHover}
                  className="w-9 h-9 rounded-xl border border-border-dark flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  title="Close Preview"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="flex-1 bg-[#121218] p-4 flex items-center justify-center overflow-auto min-h-[350px]">
              <img 
                src={activeCert.certImage} 
                alt={`${activeCert.company} Internship Certificate`} 
                className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-2xl border border-white/10"
              />
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3 border-t border-border-dark bg-bg-dark/80 flex justify-between items-center text-xs text-slate-400 font-sans shrink-0">
              <span>{activeCert.title} ({activeCert.period.split(' | ')[0]})</span>
              <span className="hidden sm:inline text-slate-500">Click anywhere outside to close</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
