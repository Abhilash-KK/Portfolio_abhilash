import React from 'react';
import ScrollReveal from './ScrollReveal';

export default function Skills() {
  const technicalSkills = ['Python', 'HTML & CSS', 'SQL', 'C Programming'];
  const softSkills = [
    'Problem Solving',
    'Fast Learning',
    'Communication',
    'Data-Driven Decision Making'
  ];
  const languages = ['English', 'Malayalam'];

  return (
    <section id="skills" className="py-24 px-6 md:px-12 max-w-[1200px] mx-auto overflow-hidden">
      <ScrollReveal className="flex flex-col items-start mb-16">
        {/* Title */}
        <h2 className="font-display text-3xl md:text-4xl font-extrabold text-white uppercase tracking-wider">
          SKILLS & EXPERTISE
        </h2>
        <div className="h-[3px] w-48 bg-gradient-to-r from-green-400 via-yellow-400 to-purple-600 mt-3 rounded-full"></div>
      </ScrollReveal>

      {/* Grid containing 3 categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Technical Skills Card */}
        <ScrollReveal className="bg-[#0b0b0f] border border-border-dark p-8 rounded-2xl shadow-xl hover:border-primary/30 transition-all duration-300">
          <h3 className="font-display text-lg font-bold text-white mb-6 flex items-center gap-3 uppercase tracking-wider">
            <i className="fas fa-code text-primary shadow-[0_0_10px_rgba(168,85,247,0.3)]"></i> Technical
          </h3>
          <div className="flex flex-wrap gap-3">
            {technicalSkills.map((skill) => (
              <span
                key={skill}
                className="bg-[#12121a] text-slate-300 border border-border-dark px-4 py-2.5 rounded-lg text-sm font-semibold hover:text-primary hover:border-primary/50 hover:bg-[#1a1a26] transition-all duration-200"
              >
                {skill}
              </span>
            ))}
          </div>
        </ScrollReveal>

        {/* Soft Skills Card */}
        <ScrollReveal className="bg-[#0b0b0f] border border-border-dark p-8 rounded-2xl shadow-xl hover:border-primary/30 transition-all duration-300">
          <h3 className="font-display text-lg font-bold text-white mb-6 flex items-center gap-3 uppercase tracking-wider">
            <i className="fas fa-users-cog text-primary shadow-[0_0_10px_rgba(168,85,247,0.3)]"></i> Soft Skills
          </h3>
          <div className="flex flex-wrap gap-3">
            {softSkills.map((skill) => (
              <span
                key={skill}
                className="bg-[#12121a] text-slate-300 border border-border-dark px-4 py-2.5 rounded-lg text-sm font-semibold hover:text-primary hover:border-primary/50 hover:bg-[#1a1a26] transition-all duration-200"
              >
                {skill}
              </span>
            ))}
          </div>
        </ScrollReveal>

        {/* Languages Card */}
        <ScrollReveal className="bg-[#0b0b0f] border border-border-dark p-8 rounded-2xl shadow-xl hover:border-primary/30 transition-all duration-300">
          <h3 className="font-display text-lg font-bold text-white mb-6 flex items-center gap-3 uppercase tracking-wider">
            <i className="fas fa-language text-primary shadow-[0_0_10px_rgba(168,85,247,0.3)]"></i> Languages
          </h3>
          <div className="flex flex-wrap gap-3">
            {languages.map((lang) => (
              <span
                key={lang}
                className="bg-[#12121a] text-slate-300 border border-border-dark px-4 py-2.5 rounded-lg text-sm font-semibold hover:text-primary hover:border-primary/50 hover:bg-[#1a1a26] transition-all duration-200"
              >
                {lang}
              </span>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
