import React from 'react';
import ScrollReveal from './ScrollReveal';

export default function Certificates() {
  const certifications = [
    {
      icon: 'fas fa-trophy',
      title: 'Smart India Hackathon 2025',
      desc: 'Certificate of Appreciation'
    },
    {
      icon: 'fas fa-rocket',
      title: 'Nasa Space Apps',
      desc: 'Participation Certificate'
    },
    {
      icon: 'fas fa-certificate',
      title: 'I2U',
      desc: 'Level 2 Certificate'
    },
    {
      icon: 'fas fa-brain',
      title: 'NPTEL: Machine Learning',
      desc: 'Machine Learning for Engineering and Science'
    },
    {
      icon: 'fas fa-cubes',
      title: 'NPTEL: BlockChain',
      desc: 'BlockChain and Its Applications'
    }
  ];

  return (
    <section id="certificates" className="py-24 px-6 md:px-12 max-w-[1200px] mx-auto overflow-hidden">
      <ScrollReveal className="flex flex-col items-start mb-16">
        {/* Title */}
        <h2 className="font-display text-3xl md:text-4xl font-extrabold text-white uppercase tracking-wider">
          COURSES & CERTIFICATIONS
        </h2>
        <div className="h-[3px] w-48 bg-gradient-to-r from-green-400 via-yellow-400 to-purple-600 mt-3 rounded-full"></div>
      </ScrollReveal>

      {/* Certificates Dark Cards Grid (wrapping 5 items nicely) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
        {certifications.map((cert, index) => (
          <ScrollReveal
            key={index}
            className="bg-[#0b0b0f] border border-border-dark rounded-2xl shadow-xl hover:border-primary/40 hover:-translate-y-1.5 transition-all duration-300 text-center py-12 px-8 flex flex-col items-center"
          >
            <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 text-primary text-2xl shadow-[0_0_15px_rgba(168,85,247,0.15)]">
              <i className={cert.icon}></i>
            </div>
            <h3 className="font-display text-lg font-bold text-white mb-2 uppercase tracking-wide">
              {cert.title}
            </h3>
            <p className="text-slate-400 text-sm font-medium">
              {cert.desc}
            </p>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
