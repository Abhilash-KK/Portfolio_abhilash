import React, { useState, useEffect } from 'react';
import { getMuteState, setMuteState, playClick, playHover } from '../utils/sfx';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMuted, setIsMuted] = useState(getMuteState());
  const [bgMode, setBgMode] = useState(() => localStorage.getItem('bg-mode') || 'neural');

  const themes = [
    { name: 'purple', primary: '#a855f7', hover: '#c084fc', class: 'bg-[#a855f7]' },
    { name: 'green', primary: '#22c55e', hover: '#4ade80', class: 'bg-[#22c55e]' },
    { name: 'blue', primary: '#06b6d4', hover: '#22d3ee', class: 'bg-[#06b6d4]' },
    { name: 'red', primary: '#f43f5e', hover: '#fb7185', class: 'bg-[#f43f5e]' }
  ];

  const [activeTheme, setActiveTheme] = useState(() => localStorage.getItem('theme-color') || 'purple');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Load and apply theme on mount
    const savedTheme = localStorage.getItem('theme-color') || 'purple';
    const foundTheme = themes.find((t) => t.name === savedTheme) || themes[0];
    document.documentElement.style.setProperty('--primary-color', foundTheme.primary);
    document.documentElement.style.setProperty('--primary-color-hover', foundTheme.hover);
  }, []);

  useEffect(() => {
    const handleMuteChange = (e) => {
      setIsMuted(e.detail);
    };
    window.addEventListener('sfx-mute-change', handleMuteChange);
    return () => window.removeEventListener('sfx-mute-change', handleMuteChange);
  }, []);

  const handleThemeChange = (themeName) => {
    playClick();
    const foundTheme = themes.find((t) => t.name === themeName);
    if (foundTheme) {
      document.documentElement.style.setProperty('--primary-color', foundTheme.primary);
      document.documentElement.style.setProperty('--primary-color-hover', foundTheme.hover);
      setActiveTheme(themeName);
      localStorage.setItem('theme-color', themeName);
    }
  };

  const toggleMute = () => {
    const nextState = !isMuted;
    setMuteState(nextState);
    if (!nextState) {
      setTimeout(() => playClick(), 50);
    }
  };

  const toggleBgMode = () => {
    playClick();
    const nextMode = bgMode === 'neural' ? 'matrix' : 'neural';
    setBgMode(nextMode);
    localStorage.setItem('bg-mode', nextMode);
    window.dispatchEvent(new CustomEvent('bg-mode-change', { detail: nextMode }));
  };

  const handleScrollToSection = (e, id) => {
    e.preventDefault();
    playClick();
    const target = document.querySelector(id);
    if (target) {
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
      setIsOpen(false);
    }
  };

  const navLinks = [
    { label: 'HOME', href: '#home' },
    { label: 'ABOUT', href: '#about' },
    { label: 'PROJECTS', href: '#projects' },
    { label: 'EXPERIENCE', href: '#experience' },
    { label: 'TESTIMONIALS', href: '#education' },
    { label: 'CONTACT', href: '#contact' }
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 py-6 px-6 md:px-12 flex justify-between items-center ${
      isScrolled ? 'bg-bg-dark/80 backdrop-blur-md border-b border-border-dark py-4' : 'bg-transparent'
    }`}>
      {/* Brand Logo */}
      <a
        href="#home"
        onClick={(e) => handleScrollToSection(e, '#home')}
        onMouseEnter={playHover}
        className="font-display text-lg font-bold tracking-widest text-white hover:text-primary transition-colors"
      >
        Abhilash K K
      </a>

      {/* Center Nav Links */}
      <ul className="hidden md:flex gap-8 font-display text-[0.8rem] font-bold tracking-[0.15em]">
        {navLinks.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              onClick={(e) => handleScrollToSection(e, link.href)}
              onMouseEnter={playHover}
              className="text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      <div className="hidden md:flex items-center gap-5 text-sm text-slate-300">
        {/* Accent Color Customizer Dots */}
        <div className="flex gap-2 items-center bg-[#0b0b0f] border border-border-dark px-3 py-1.5 rounded-full shadow-[0_0_10px_rgba(0,0,0,0.5)]">
          {themes.map((theme) => (
            <button
              key={theme.name}
              onClick={() => handleThemeChange(theme.name)}
              onMouseEnter={playHover}
              className={`w-3.5 h-3.5 rounded-full cursor-pointer transition-all duration-300 ${theme.class} ${
                activeTheme === theme.name 
                  ? 'scale-125 border border-white ring-2 ring-primary/40 shadow-[0_0_10px_rgba(255,255,255,0.4)]' 
                  : 'opacity-50 hover:opacity-100 hover:scale-110'
              }`}
              title={`Switch to ${theme.name} theme`}
            />
          ))}
        </div>

        <div className="h-4 w-[1px] bg-border-dark"></div>

        {/* Custom SFX Toggle */}
        <button
          onClick={toggleMute}
          onMouseEnter={playHover}
          className="hover:text-primary transition-colors cursor-pointer flex items-center justify-center w-8 h-8 rounded-full border border-border-dark bg-[#0b0b0f] text-slate-400 shadow-[0_0_10px_rgba(0,0,0,0.5)]"
          title={isMuted ? "Unmute Sound Effects" : "Mute Sound Effects"}
        >
          <i className={isMuted ? "fas fa-volume-mute" : "fas fa-volume-up"}></i>
        </button>

        {/* Custom Background Style Toggle */}
        <button
          onClick={toggleBgMode}
          onMouseEnter={playHover}
          className="hover:text-primary transition-colors cursor-pointer flex items-center justify-center w-8 h-8 rounded-full border border-border-dark bg-[#0b0b0f] text-slate-400 shadow-[0_0_10px_rgba(0,0,0,0.5)]"
          title={bgMode === 'neural' ? "Switch to Matrix Rain" : "Switch to Neural Net"}
        >
          <i className={bgMode === 'neural' ? "fas fa-network-wired" : "fas fa-code"}></i>
        </button>

        <div className="h-4 w-[1px] bg-border-dark"></div>

        <a
          href="https://github.com/Abhilash-KK"
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={playHover}
          className="hover:text-primary transition-colors"
          aria-label="GitHub"
        >
          <i className="fab fa-github"></i>
        </a>
        <a
          href="https://www.linkedin.com/in/abhilash-k-k-47ba2438a?utm_source=share_via&utm_content=profile&utm_medium=member_android"
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={playHover}
          className="hover:text-primary transition-colors"
          aria-label="LinkedIn"
        >
          <i className="fab fa-linkedin"></i>
        </a>
        <a
          href="https://www.instagram.com/_.abhi_lash.__?igsh=MTJtd2kyYjVjMzJpNA=="
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={playHover}
          className="hover:text-primary transition-colors"
          aria-label="Instagram"
        >
          <i className="fab fa-instagram"></i>
        </a>
        <a
          href="https://wa.me/918590979422"
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={playHover}
          className="hover:text-primary transition-colors"
          aria-label="WhatsApp"
        >
          <i className="fab fa-whatsapp"></i>
        </a>
      </div>

      {/* Mobile Hamburger Button */}
      <button
        onClick={() => { playClick(); setIsOpen(!isOpen); }}
        onMouseEnter={playHover}
        className="block md:hidden text-slate-300 hover:text-white focus:outline-none"
        aria-label="Toggle navigation menu"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-bg-dark border-b border-border-dark p-8 flex flex-col gap-6 font-display text-[0.8rem] font-bold tracking-[0.15em] animate-in fade-in slide-in-from-top-5 duration-300">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleScrollToSection(e, link.href)}
              onMouseEnter={playHover}
              className="text-slate-300 hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
          
          {/* Mobile Interactive Control Toggles */}
          <div className="flex flex-col gap-4 border-t border-border-dark pt-6 text-sm text-slate-300">
            {/* Color selector row */}
            <div className="flex items-center justify-between border border-border-dark bg-[#0b0b0f] px-4 py-3 rounded-lg shadow-[0_0_10px_rgba(0,0,0,0.5)]">
              <span className="text-[0.65rem] font-bold tracking-widest text-slate-400 font-display">THEME ACCENT:</span>
              <div className="flex gap-3">
                {themes.map((theme) => (
                  <button
                    key={theme.name}
                    onClick={() => handleThemeChange(theme.name)}
                    className={`w-5 h-5 rounded-full cursor-pointer transition-all duration-300 ${theme.class} ${
                      activeTheme === theme.name 
                        ? 'scale-125 border border-white ring-2 ring-primary/40' 
                        : 'opacity-50'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={toggleMute}
                className="hover:text-primary transition-colors flex items-center justify-center gap-2 border border-border-dark bg-[#0b0b0f] px-4 py-2.5 rounded-lg text-slate-400 shadow-[0_0_10px_rgba(0,0,0,0.5)] flex-1"
              >
                <i className={isMuted ? "fas fa-volume-mute" : "fas fa-volume-up"}></i>
                <span>{isMuted ? "UNMUTE SFX" : "MUTE SFX"}</span>
              </button>
              <button
                onClick={toggleBgMode}
                className="hover:text-primary transition-colors flex items-center justify-center gap-2 border border-border-dark bg-[#0b0b0f] px-4 py-2.5 rounded-lg text-slate-400 shadow-[0_0_10px_rgba(0,0,0,0.5)] flex-1"
              >
                <i className={bgMode === 'neural' ? "fas fa-network-wired" : "fas fa-code"}></i>
                <span>{bgMode === 'neural' ? "MATRIX RAIN" : "NEURAL NET"}</span>
              </button>
            </div>
          </div>

          <div className="flex gap-6 text-lg border-t border-border-dark pt-6 text-slate-300">
            <a href="https://github.com/Abhilash-KK" target="_blank" rel="noopener noreferrer" onMouseEnter={playHover} className="hover:text-primary transition-colors">
              <i className="fab fa-github"></i>
            </a>
            <a href="https://www.linkedin.com/in/abhilash-k-k-47ba2438a?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noopener noreferrer" onMouseEnter={playHover} className="hover:text-primary transition-colors">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="https://www.instagram.com/_.abhi_lash.__?igsh=MTJtd2kyYjVjMzJpNA==" target="_blank" rel="noopener noreferrer" onMouseEnter={playHover} className="hover:text-primary transition-colors">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://wa.me/918590979422" target="_blank" rel="noopener noreferrer" onMouseEnter={playHover} className="hover:text-primary transition-colors">
              <i className="fab fa-whatsapp"></i>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
