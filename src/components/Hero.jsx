import React, { useState } from 'react';
import ScrollReveal from './ScrollReveal';

export default function Hero() {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  const handleScrollToContact = (e) => {
    e.preventDefault();
    const target = document.querySelector('#contact');
    if (target) {
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  const handleDownloadResume = () => {
    setIsDownloading(true);
    setDownloadProgress(0);
    setIsDone(false);

    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsDownloading(false);
          setIsDone(true);
          
          // Trigger file download (expects resume.pdf in public folder)
          const link = document.createElement('a');
          link.href = `${import.meta.env.BASE_URL}resume.pdf`;
          link.download = 'Abhilash_KK_Resume.pdf';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);

          // Reset status after 3 seconds
          setTimeout(() => setIsDone(false), 3000);
          return 100;
        }
        return prev + 10;
      });
    }, 150);
  };

  return (
    <section id="home" className="relative pt-32 pb-20 px-6 md:px-12 max-w-[1200px] mx-auto min-h-[90vh] flex items-center overflow-hidden">
      {/* Background neon glows */}
      <div className="absolute top-[-10%] right-[-10%] w-[350px] h-[350px] bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[350px] h-[350px] bg-green-500/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full z-10">
        {/* Left text elements */}
        <ScrollReveal className="flex flex-col items-start text-left">
          <span className="font-display text-[0.8rem] font-bold tracking-[0.3em] text-primary mb-4 block uppercase">
            HI, THERE!
          </span>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.05] tracking-tight text-white mb-4 uppercase">
            HI, I'M <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-primary">ABHILASH K K</span>
          </h1>
          <p className="font-display text-base sm:text-lg md:text-xl font-bold text-slate-200 mb-4 tracking-wide uppercase border-l-2 border-primary pl-3">
            MCA Student | Aspiring Full Stack Developer
          </p>
          <p className="font-sans text-slate-400 text-sm sm:text-base md:text-lg mb-8 max-w-[480px]">
            Building intelligent computer vision systems, training complex neural network models, and coding robust software solutions.
          </p>
          
          {/* Action buttons row */}
          <div className="flex flex-wrap gap-4 items-center w-full">
            <a
              href="#contact"
              onClick={handleScrollToContact}
              className="font-display text-[0.8rem] font-bold tracking-widest bg-primary hover:bg-primary-hover text-white px-8 py-4 uppercase transition-all duration-300 shadow-[0_0_25px_rgba(168,85,247,0.4)] hover:shadow-[0_0_35px_rgba(168,85,247,0.6)] hover:-translate-y-0.5"
            >
              LET'S TALK
            </a>
            
            {/* Download Resume with Progress */}
            <button
              onClick={handleDownloadResume}
              disabled={isDownloading}
              className="font-display text-[0.8rem] font-bold tracking-widest border border-white/20 hover:border-primary/50 text-white bg-transparent hover:bg-white/5 px-8 py-4 uppercase transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer disabled:opacity-80"
            >
              {isDownloading ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                  <span>DOWNLOADING {downloadProgress}%</span>
                </>
              ) : isDone ? (
                <>
                  <i className="fas fa-check text-green-400"></i>
                  <span>RESUME DOWNLOADED</span>
                </>
              ) : (
                <>
                  <i className="fas fa-download text-xs text-slate-400"></i>
                  <span>DOWNLOAD RESUME</span>
                </>
              )}
            </button>
          </div>
        </ScrollReveal>

        {/* Right graphic visual */}
        <ScrollReveal className="relative flex justify-center lg:justify-end items-center">
          <div className="relative w-full max-w-[420px] aspect-square rounded-full flex items-center justify-center p-4">
            {/* Outer neon border */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/30 to-cyan-500/10 blur-[8px] opacity-70 animate-pulse"></div>

            {/* Neural Net Image */}
            <img
              src={`${import.meta.env.BASE_URL}hero_neural_net.png`}
              alt="Futuristic Neural Network"
              className="relative w-full h-full object-cover rounded-full border border-white/10 z-10 shadow-[0_0_50px_rgba(168,85,247,0.25)]"
            />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
