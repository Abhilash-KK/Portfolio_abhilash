import React, { useState, useEffect } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToSection = (e, id) => {
    e.preventDefault();
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
    { label: 'PORTFOLIO', href: '#projects' },
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
              className="text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      <div className="hidden md:flex items-center gap-5 text-sm text-slate-300">
        <a
          href="https://github.com/Abhilash-KK"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-primary transition-colors"
          aria-label="GitHub"
        >
          <i className="fab fa-github"></i>
        </a>
        <a
          href="https://www.linkedin.com/in/abhilash-k-k-"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-primary transition-colors"
          aria-label="LinkedIn"
        >
          <i className="fab fa-linkedin"></i>
        </a>
        <a
          href="https://www.instagram.com/_.abhi_lash.__?igsh=MTJtd2kyYjVjMzJpNA=="
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-primary transition-colors"
          aria-label="Instagram"
        >
          <i className="fab fa-instagram"></i>
        </a>
      </div>

      {/* Mobile Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
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
              className="text-slate-300 hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="flex gap-6 text-lg border-t border-border-dark pt-6 text-slate-300">
            <a href="https://github.com/Abhilash-KK" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
              <i className="fab fa-github"></i>
            </a>
            <a href="https://www.linkedin.com/in/abhilash-k-k-" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="https://www.instagram.com/_.abhi_lash.__?igsh=MTJtd2kyYjVjMzJpNA==" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
