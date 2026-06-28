import React from 'react';
import ScrollReveal from './ScrollReveal';

export default function Hero() {
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

  return (
    <section id="home" className="relative pt-32 pb-20 px-6 md:px-12 max-w-[1200px] mx-auto min-h-[90vh] flex items-center overflow-hidden">
      {/* Background neon glows */}
      <div className="absolute top-[-10%] right-[-10%] w-[350px] h-[350px] bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[350px] h-[350px] bg-green-500/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full z-10">
        {/* Left text elements */}
        <ScrollReveal className="flex flex-col items-start text-left">
          <span className="font-display text-[0.8rem] font-bold tracking-[0.3em] text-primary mb-4 block uppercase">
            ABHILASH K K
          </span>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.05] tracking-tight text-white mb-6 uppercase">
            FULL STACK<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-primary">DEVELOPER</span>
          </h1>
          <p className="font-sans text-slate-400 text-base md:text-lg mb-8 max-w-[480px]">
            Building intelligent computer vision systems, training complex neural network models, and coding robust software solutions.
          </p>
          <a
            href="#contact"
            onClick={handleScrollToContact}
            className="font-display text-[0.8rem] font-bold tracking-widest bg-primary hover:bg-primary-hover text-white px-8 py-4 uppercase transition-all duration-300 shadow-[0_0_25px_rgba(168,85,247,0.4)] hover:shadow-[0_0_35px_rgba(168,85,247,0.6)] hover:-translate-y-0.5"
          >
            LET'S TALK
          </a>
        </ScrollReveal>

        {/* Right graphic visual */}
        <ScrollReveal className="relative flex justify-center lg:justify-end items-center">
          <div className="relative w-full max-w-[420px] aspect-square rounded-full flex items-center justify-center p-4">
            {/* Outer neon border */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/30 to-cyan-500/10 blur-[8px] opacity-70 animate-pulse"></div>

            {/* Neural Net Image */}
            <img
              src="/hero_neural_net.png"
              alt="Futuristic Neural Network"
              className="relative w-full h-full object-cover rounded-full border border-white/10 z-10 shadow-[0_0_50px_rgba(168,85,247,0.25)]"
            />

            {/* Floating Bubble 1: Python */}
            <div className="absolute top-4 left-6 w-14 h-14 bg-[#0d0d12] border border-border-dark rounded-2xl flex items-center justify-center text-2xl text-[#f59e0b] shadow-[0_0_20px_rgba(245,158,11,0.25)] hover:scale-110 transition-transform duration-300 z-20 animate-bounce" style={{ animationDuration: '3.5s' }}>
              <i className="fab fa-python"></i>
            </div>

            {/* Floating Bubble 2: PyTorch/Neural Nets */}
            <div className="absolute bottom-8 right-6 w-14 h-14 bg-[#0d0d12] border border-border-dark rounded-2xl flex items-center justify-center text-2xl text-[#c084fc] shadow-[0_0_20px_rgba(168,85,247,0.25)] hover:scale-110 transition-transform duration-300 z-20 animate-bounce" style={{ animationDuration: '4.5s' }}>
              <i className="fas fa-brain"></i>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
