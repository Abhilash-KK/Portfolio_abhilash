import React, { useState } from 'react';
import ScrollReveal from './ScrollReveal';
import Tilt from './Tilt';
import { playClick, playHover } from '../utils/sfx';

export default function Certificates() {
  const [activeCert, setActiveCert] = useState(null);

  const certifications = [
    {
      id: 'sih-2025',
      icon: 'fas fa-trophy',
      title: 'Smart India Hackathon 2025',
      desc: 'Certificate of Appreciation',
      file: `${import.meta.env.BASE_URL}certificates/smart_india_hackathon_2025.pdf`
    },
    {
      id: 'nptel-ml',
      icon: 'fas fa-brain',
      title: 'NPTEL Certification',
      desc: 'Machine Learning for Engineering and Science Applications',
      file: `${import.meta.env.BASE_URL}certificates/nptel_ml.pdf`
    },
    {
      id: 'nasa-space-apps',
      icon: 'fas fa-rocket',
      title: 'Nasa Space Apps',
      desc: 'Participation Certificate',
      file: `${import.meta.env.BASE_URL}certificates/nasa_space_apps.pdf`
    },
    {
      id: 'nptel-blockchain',
      icon: 'fas fa-cubes',
      title: 'NPTEL Certification',
      desc: 'Blockchain and Its Applications',
      file: `${import.meta.env.BASE_URL}certificates/nptel_blockchain.pdf`
    },
    {
      id: 'i2u-level2',
      icon: 'fas fa-certificate',
      title: 'I2U 2025 Project Contest',
      desc: 'Level 2 Funded Certificate (Automated Cardamom Harvesting System)',
      file: `${import.meta.env.BASE_URL}certificates/i2u_level2.pdf`
    }
  ];

  const handleCardClick = (cert) => {
    playClick();
    if (cert.file) {
      setActiveCert(cert);
    }
  };

  return (
    <section id="certificates" className="py-24 px-6 md:px-12 max-w-[1200px] mx-auto overflow-hidden">
      <ScrollReveal className="flex flex-col items-start mb-16">
        {/* Title */}
        <h2 className="font-display text-3xl md:text-4xl font-extrabold text-white uppercase tracking-wider">
          COURSES & CERTIFICATES
        </h2>
        <div className="h-[3px] w-48 bg-gradient-to-r from-green-400 via-yellow-400 to-purple-600 mt-3 rounded-full"></div>
      </ScrollReveal>

      {/* Certificates Dark Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
        {certifications.map((cert) => (
          <ScrollReveal key={cert.id} className="h-full">
            <Tilt 
              onClick={() => handleCardClick(cert)}
              className={`bg-[#0b0b0f] border border-border-dark rounded-2xl shadow-xl hover:border-primary/45 transition-all duration-300 text-center py-10 px-8 flex flex-col items-center justify-between h-full relative group ${
                cert.file ? 'cursor-pointer' : ''
              }`}
            >
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 text-primary text-2xl shadow-[0_0_15px_rgba(168,85,247,0.15)] group-hover:scale-110 transition-transform duration-300">
                  <i className={cert.icon}></i>
                </div>
                <h3 className="font-display text-lg font-bold text-white mb-2 uppercase tracking-wide">
                  {cert.title}
                </h3>
                <p className="text-slate-400 text-sm font-medium mb-6">
                  {cert.desc}
                </p>
              </div>

              {cert.file ? (
                <button
                  onMouseEnter={playHover}
                  className="font-display text-[0.7rem] font-bold tracking-widest text-primary border border-primary/30 hover:bg-primary hover:text-white px-5 py-2 rounded-lg uppercase transition-all duration-300 flex items-center gap-2 mt-2"
                >
                  <i className="fas fa-eye text-xs"></i>
                  <span>VIEW CERTIFICATE</span>
                </button>
              ) : (
                <span className="text-[0.65rem] font-display font-semibold tracking-widest text-slate-600 uppercase border border-border-dark/50 px-3 py-1 rounded">
                  AWAITING FILE ATTACHMENT
                </span>
              )}
            </Tilt>
          </ScrollReveal>
        ))}
      </div>

      {/* Certificate Viewer Modal */}
      {activeCert && (
        <div 
          className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setActiveCert(null)}
        >
          <div 
            className="bg-[#0b0b0f] border border-border-dark w-full max-w-4xl max-h-[90vh] rounded-2xl flex flex-col overflow-hidden shadow-[0_0_50px_rgba(168,85,247,0.3)] animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-5 border-b border-border-dark flex items-center justify-between bg-bg-dark/90">
              <div>
                <span className="text-[0.65rem] font-display font-bold tracking-[0.25em] text-primary block uppercase">
                  VERIFIED CERTIFICATE
                </span>
                <h3 className="font-display text-lg sm:text-xl font-bold text-white uppercase">
                  {activeCert.title}
                </h3>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href={activeCert.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-display text-[0.75rem] font-bold tracking-wider bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg uppercase transition-all duration-300 flex items-center gap-2"
                >
                  <i className="fas fa-external-link-alt text-xs"></i>
                  <span>OPEN FULL</span>
                </a>
                <button
                  onClick={() => setActiveCert(null)}
                  className="w-9 h-9 rounded-xl border border-border-dark flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
            </div>

            {/* Modal Content / Preview */}
            <div className="flex-1 bg-[#121218] p-4 flex items-center justify-center overflow-auto">
              {activeCert.file?.endsWith('.pdf') ? (
                <iframe 
                  src={`${activeCert.file}#toolbar=1&view=FitH`} 
                  className="w-full h-[70vh] border-0" 
                  title={activeCert.title}
                />
              ) : (
                <img 
                  src={activeCert.file} 
                  alt={activeCert.title} 
                  className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-2xl" 
                />
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
