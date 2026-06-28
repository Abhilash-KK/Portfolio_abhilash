import React from 'react';
import ScrollReveal from './ScrollReveal';

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-6 md:px-12 max-w-[1200px] mx-auto overflow-hidden">
      <ScrollReveal className="flex flex-col items-start mb-16">
        {/* Title */}
        <h2 className="font-display text-3xl md:text-4xl font-extrabold text-white uppercase tracking-wider">
          PROFESSIONAL EXPERIENCE
        </h2>
        <div className="h-[3px] w-48 bg-gradient-to-r from-green-400 via-yellow-400 to-purple-600 mt-3 rounded-full"></div>
      </ScrollReveal>

      {/* Experience Dark Card */}
      <ScrollReveal className="bg-[#0b0b0f] border border-border-dark p-8 md:p-10 rounded-2xl shadow-xl hover:border-primary/30 transition-all duration-300">
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
          <ul className="list-disc pl-5 flex flex-col gap-2.5 text-sm text-slate-400 leading-relaxed mb-6 font-sans">
            <li>Acquired practical understanding of **software development principles** in enterprise layouts.</li>
            <li>Designed and planned modern interfaces for **Web and Mobile application development** layouts.</li>
            <li>Executed project deliverables, participating in planning sessions, sprint scopes, and milestone reviews.</li>
            <li>Practiced active **team collaboration and Agile communication** under the guidance of Akshith TP and Shivaraj from the IT department.</li>
          </ul>
        </div>
      </ScrollReveal>
    </section>
  );
}
