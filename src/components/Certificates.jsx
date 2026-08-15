import React, { useState } from 'react';
import ScrollReveal from './ScrollReveal';
import Tilt from './Tilt';
import { playClick, playHover } from '../utils/sfx';

export default function Certificates() {
  const [activeCert, setActiveCert] = useState(null);
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  const certifications = [
    {
      id: 'sih-2025',
      icon: 'fas fa-trophy',
      title: 'Smart India Hackathon 2025',
      desc: 'Certificate of Appreciation',
      images: [`${import.meta.env.BASE_URL}certificates/smart_india_hackathon_2025.png`],
      pdf: `${import.meta.env.BASE_URL}certificates/smart_india_hackathon_2025.pdf`
    },
    {
      id: 'nptel-ml',
      icon: 'fas fa-brain',
      title: 'NPTEL Certification',
      desc: 'Machine Learning for Engineering and Science Applications',
      images: [`${import.meta.env.BASE_URL}certificates/nptel_ml.png`],
      pdf: `${import.meta.env.BASE_URL}certificates/nptel_ml.pdf`
    },
    {
      id: 'nasa-space-apps',
      icon: 'fas fa-rocket',
      title: 'Nasa Space Apps',
      desc: 'Participation Certificates (Global & Local Host)',
      images: [
        `${import.meta.env.BASE_URL}certificates/nasa_space_apps_1.png`,
        `${import.meta.env.BASE_URL}certificates/nasa_space_apps_kanjirapally.png`
      ],
      pdf: `${import.meta.env.BASE_URL}certificates/nasa_space_apps.pdf`
    },
    {
      id: 'nptel-blockchain',
      icon: 'fas fa-cubes',
      title: 'NPTEL Certification',
      desc: 'Blockchain and Its Applications',
      images: [`${import.meta.env.BASE_URL}certificates/nptel_blockchain.png`],
      pdf: `${import.meta.env.BASE_URL}certificates/nptel_blockchain.pdf`
    },
    {
      id: 'i2u-level2',
      icon: 'fas fa-certificate',
      title: 'I2U 2025 Project Contest',
      desc: 'Level 2 Funded Certificate (Automated Cardamom Harvesting System)',
      images: [`${import.meta.env.BASE_URL}certificates/i2u_level2.png`],
      pdf: `${import.meta.env.BASE_URL}certificates/i2u_level2.pdf`
    }
  ];

  const handleOpenModal = (cert) => {
    playClick();
    setActiveCert(cert);
    setActiveImageIdx(0);
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

      {/* Certificates Dark Cards Grid (Clean Design) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
        {certifications.map((cert) => (
          <ScrollReveal key={cert.id} className="h-full">
            <Tilt 
              onClick={() => handleOpenModal(cert)}
              onMouseEnter={playHover}
              className="bg-[#0b0b0f] border border-border-dark rounded-2xl shadow-xl hover:border-primary/50 transition-all duration-300 text-center py-12 px-8 flex flex-col items-center justify-center h-full relative group cursor-pointer hover:-translate-y-1 shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_15px_35px_rgba(168,85,247,0.2)]"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 text-primary text-2xl shadow-[0_0_15px_rgba(168,85,247,0.15)] group-hover:scale-110 group-hover:border-primary/40 transition-all duration-300">
                <i className={cert.icon}></i>
              </div>
              <h3 className="font-display text-lg font-bold text-white mb-2 uppercase tracking-wide group-hover:text-primary transition-colors">
                {cert.title}
              </h3>
              <p className="text-slate-400 text-sm font-medium">
                {cert.desc}
              </p>
            </Tilt>
          </ScrollReveal>
        ))}
      </div>

      {/* Certificate Viewer Modal */}
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
                  VERIFIED CERTIFICATE
                </span>
                <h3 className="font-display text-base sm:text-xl font-bold text-white uppercase tracking-wide">
                  {activeCert.title}
                </h3>
              </div>
              
              <div className="flex items-center gap-3">
                {/* Download PDF button */}
                <a
                  href={activeCert.pdf}
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

                {/* Close Button */}
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

            {/* Modal Image Gallery Body */}
            <div className="flex-1 bg-[#121218] p-4 flex flex-col items-center justify-center overflow-auto min-h-[350px]">
              <img 
                src={activeCert.images[activeImageIdx]} 
                alt={`${activeCert.title} preview`} 
                className="max-w-full max-h-[65vh] object-contain rounded-lg shadow-2xl border border-white/10"
              />

              {/* Multi-page certificate tabs selector (if multiple certificates exist like NASA Space Apps) */}
              {activeCert.images.length > 1 && (
                <div className="flex gap-3 mt-4 pt-3 border-t border-border-dark/60">
                  {activeCert.images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        playClick();
                        setActiveImageIdx(idx);
                      }}
                      className={`font-display text-xs font-bold px-4 py-1.5 rounded-full transition-all duration-200 cursor-pointer ${
                        activeImageIdx === idx 
                          ? 'bg-primary text-white shadow-[0_0_10px_rgba(168,85,247,0.5)]' 
                          : 'bg-[#1a1a26] text-slate-400 hover:text-white border border-border-dark'
                      }`}
                    >
                      Certificate {idx + 1} {idx === 0 ? '(Global)' : '(Local Host)'}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Modal Footer info */}
            <div className="px-6 py-3 border-t border-border-dark bg-bg-dark/80 flex justify-between items-center text-xs text-slate-400 font-sans shrink-0">
              <span>{activeCert.desc}</span>
              <span className="hidden sm:inline text-slate-500">Click anywhere outside to close</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
