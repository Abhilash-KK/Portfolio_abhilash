import React from 'react';

export default function Footer() {
  return (
    <footer className="max-w-[1200px] mx-auto px-6 md:px-12 py-12 border-t border-border-dark/60 flex flex-col md:flex-row justify-between items-center gap-6 mt-12 bg-bg-dark">
      <p className="text-slate-500 text-center md:text-left text-xs font-sans">
        &copy; 2026 ABHILASH K K. Designed with passion for innovation.
      </p>
      <div className="flex gap-6">
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xl text-slate-500 hover:text-primary hover:-translate-y-1 transition-all duration-300"
          aria-label="GitHub"
        >
          <i className="fab fa-github"></i>
        </a>
        <a
          href="https://www.linkedin.com/in/abhilash-k-k-"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xl text-slate-500 hover:text-primary hover:-translate-y-1 transition-all duration-300"
          aria-label="LinkedIn"
        >
          <i className="fab fa-linkedin"></i>
        </a>
        <a
          href="mailto:kkabhilash30@gmail.com"
          className="text-xl text-slate-500 hover:text-primary hover:-translate-y-1 transition-all duration-300"
          aria-label="Email"
        >
          <i className="fas fa-envelope"></i>
        </a>
      </div>
    </footer>
  );
}
