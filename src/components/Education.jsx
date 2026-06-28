import React from 'react';
import ScrollReveal from './ScrollReveal';

export default function Education() {
  const credentials = [
    {
      title: 'MCA',
      subtitle: 'Amal Jyothi College of Engineering',
      desc: 'Currently pursuing a Master of Computer Application (2025 - 2027) under APJ Abdul Kalam Technological University, Kerala. Focus areas include advanced software architectures and deep learning models.'
    },
    {
      title: 'BCA',
      subtitle: 'Maharaja Institute of Technology',
      desc: 'Completed Bachelor of Computer Application (2022 - 2025) under Mysore University, Karnataka. Graduated with a Cumulative GPA of 8.6/10, establishing strong mathematical and programming foundations.'
    },
    {
      title: 'PLUS TWO',
      subtitle: 'G.H.S.S Vaduvanchal',
      desc: 'Completed Higher Secondary Education in Biology Science (2020 - 2022) under the Kerala State Board, achieving a score of 81.25%.'
    },
    {
      title: 'TENTH',
      subtitle: 'Assumption High School',
      desc: 'Completed secondary school education (SSLC) at S.Bathery (2019 - 2020) under the Kerala State Board, graduating with an outstanding score of 98%.'
    }
  ];

  return (
    <section id="education" className="py-24 px-6 md:px-12 max-w-[1200px] mx-auto text-center overflow-hidden">
      <ScrollReveal className="flex flex-col items-center mb-16">
        {/* Title */}
        <h2 className="font-display text-3xl md:text-4xl font-extrabold text-white uppercase tracking-widest">
          TESTIMONIALS
        </h2>
        <div className="h-[3px] w-48 bg-gradient-to-r from-green-400 via-yellow-400 to-purple-600 mt-3 rounded-full"></div>
      </ScrollReveal>

      {/* Testimonials solid purple grid (now holds 5 cards wrapping neatly) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
        {credentials.map((cred, index) => (
          <ScrollReveal
            key={index}
            className="bg-[#6b07bf] hover:bg-[#780cd4] text-white p-8 sm:p-10 rounded-none shadow-[0_10px_30px_rgba(107,7,191,0.3)] hover:-translate-y-2 transition-all duration-300 min-h-[340px] flex flex-col justify-center items-center text-center"
          >
            <h3 className="font-display text-2xl font-black tracking-wider uppercase mb-1">
              {cred.title}
            </h3>
            <p className="text-[0.7rem] font-display font-semibold tracking-widest text-purple-200/80 mb-6 uppercase">
              {cred.subtitle}
            </p>
            <p className="font-sans text-sm leading-[1.7] text-white/90">
              {cred.desc}
            </p>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
