import React from 'react';
import ScrollReveal from './ScrollReveal';
import SkillsSandbox from './SkillsSandbox';

export default function Skills() {
  const technicalSkills = [
    { name: 'Python', level: 90 },
    { name: 'SQL', level: 85 },
    { name: 'C Programming', level: 80 },
    { name: 'HTML & CSS', level: 85 },
    { name: 'React.js & Tailwind', level: 80 }
  ];
  const softSkills = [
    'Data-Driven Decision Making',
    'Communication',
    'Fast Learning',
    'Problem Solving'
  ];
  const languages = ['English', 'Malayalam', 'Hindi'];

  return (
    <section id="skills" className="py-24 px-6 md:px-12 max-w-[1200px] mx-auto overflow-hidden">
      <ScrollReveal className="flex flex-col items-start mb-16">
        {/* Title */}
        <h2 className="font-display text-3xl md:text-4xl font-extrabold text-white uppercase tracking-wider">
          SKILLS & EXPERTISE
        </h2>
        <div className="h-[3px] w-48 bg-gradient-to-r from-green-400 via-yellow-400 to-purple-600 mt-3 rounded-full"></div>
      </ScrollReveal>

      {/* Grid containing Lists and Physics Sandbox (Balanced 2-column layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start justify-items-center w-full">
        {/* Column 1: Detailed Lists */}
        <div className="flex flex-col gap-8 w-full max-w-[550px]">
          {/* Technical Skills Card */}
          <ScrollReveal className="bg-[#0b0b0f] border border-border-dark p-8 rounded-2xl shadow-xl hover:border-primary/30 transition-all duration-300 w-full">
            <h3 className="font-display text-lg font-bold text-white mb-6 flex items-center gap-3 uppercase tracking-wider">
              <i className="fas fa-code text-primary shadow-[0_0_10px_rgba(168,85,247,0.3)]"></i> Technical
            </h3>
            <div className="flex flex-col gap-5">
              {technicalSkills.map((skill) => (
                <div key={skill.name} className="w-full">
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-sm font-semibold text-slate-300 font-sans">{skill.name}</span>
                    <span className="text-xs font-bold text-primary font-display">{skill.level}%</span>
                  </div>
                  {/* Progress bar container */}
                  <div className="w-full h-2 bg-[#12121a] border border-border-dark rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-primary to-cyan-400 rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(168,85,247,0.5)]"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Soft Skills & Languages Stacks */}
          <ScrollReveal className="bg-[#0b0b0f] border border-border-dark p-8 rounded-2xl shadow-xl hover:border-primary/30 transition-all duration-300 w-full">
            <div className="mb-6">
              <h3 className="font-display text-lg font-bold text-white mb-4 flex items-center gap-3 uppercase tracking-wider">
                <i className="fas fa-users-cog text-primary shadow-[0_0_10px_rgba(168,85,247,0.3)]"></i> Soft Skills
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {softSkills.map((skill) => (
                  <span
                    key={skill}
                    className="bg-[#12121a] text-slate-300 border border-border-dark px-3 py-1.5 rounded-lg text-xs font-semibold hover:text-primary hover:border-primary/50 hover:bg-[#1a1a26] transition-all duration-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="border-t border-border-dark/60 pt-6">
              <h3 className="font-display text-lg font-bold text-white mb-4 flex items-center gap-3 uppercase tracking-wider">
                <i className="fas fa-language text-primary shadow-[0_0_10px_rgba(168,85,247,0.3)]"></i> Languages
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {languages.map((lang) => (
                  <span
                    key={lang}
                    className="bg-[#12121a] text-slate-300 border border-border-dark px-3.5 py-1.5 rounded-lg text-xs font-semibold hover:text-primary hover:border-primary/50 hover:bg-[#1a1a26] transition-all duration-200"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Column 2: Physics Sandbox */}
        <ScrollReveal className="w-full max-w-[550px]">
          <SkillsSandbox />
        </ScrollReveal>
      </div>
    </section>
  );
}
