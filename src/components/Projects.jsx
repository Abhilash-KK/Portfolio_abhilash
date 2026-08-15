import React, { useState } from 'react';
import ScrollReveal from './ScrollReveal';
import Tilt from './Tilt';

export default function Projects() {
  const [activeProject, setActiveProject] = useState(null);

  const projectsData = [
    {
      id: 'tsrd',
      title: 'TRAFFIC SIGN DETECTION',
      displayTitle: 'Traffic Sign Detection and Recognition Using YOLO & Deep Learning',
      meta: 'YOLO & Deep Learning System',
      desc: 'Developed a real-time detection and recognition system utilizing YOLOv5/v8, and implemented deep learning classification models (ResNet, EfficientNet, ConvNeXt, VGGNet).',
      highlights: [
        'Implemented YOLOv5 and YOLOv8 models for real-time traffic sign detection.',
        'Trained and evaluated deep learning classification models (ResNet, EfficientNet, ConvNeXt, VGGNet).',
        'Used OpenCV and Python for image preprocessing, dataset annotation, and real-time bounding box detection.',
        'Evaluated system performance using precision, recall, accuracy, and mAP metrics.'
      ],
      tags: ['Python', 'YOLO', 'OpenCV', 'TensorFlow', 'Keras', 'ResNet', 'EfficientNet'],
      image: `${import.meta.env.BASE_URL}proj_tsrd.png`,
      bgGradient: 'from-blue-600/30 to-purple-600/30'
    },
    {
      id: 'student-leave-hub',
      title: 'LEAVE MANAGEMENT HUB',
      displayTitle: 'Student & Employee Leave Management Hub',
      meta: 'Full-Stack Web Portal | Django & MySQL',
      desc: 'Built a secure web portal for handling leave requests, managerial approvals, and role-based authentication using Django.',
      highlights: [
        'Built role-based authentication and authorization for students, employees, and managers.',
        'Implemented automated leave balance calculations, approval workflows, and status tracking.',
        'Designed responsive dashboard interfaces using Bootstrap, CSS, JavaScript, and Chart.js graphics.',
        'Configured MySQL database storage for user profiles and leave logs.'
      ],
      tags: ['Python', 'Django', 'MySQL', 'JavaScript', 'Bootstrap', 'CSS', 'Chart.js'],
      demoUrl: 'https://leave-management-0oez.onrender.com',
      image: `${import.meta.env.BASE_URL}proj_leave_hub.png`,
      bgGradient: 'from-pink-600/30 to-blue-600/30'
    },
    {
      id: 'emergency-contact-app',
      title: 'EMERGENCY CONTACT APP',
      displayTitle: 'Emergency Contact & Real-Time Alert System',
      meta: 'Full-Stack Web App | React, Node.js & Web APIs',
      desc: 'Built a responsive personal safety and emergency contact application designed for quick SOS alerting, contact group management, and real-time location sharing during urgent situations.',
      highlights: [
        'Designed an intuitive, high-priority UI with one-tap SOS emergency trigger for quick user action.',
        'Integrated Geolocation API for real-time location tracking and instant alert messaging dispatch.',
        'Implemented secure user authentication and encrypted emergency contact group storage.',
        'Engineered mobile-first responsive interfaces optimized for low latency and high accessibility.'
      ],
      tags: ['React.js', 'JavaScript', 'Node.js', 'Express', 'Tailwind CSS', 'Firebase', 'Geolocation API'],
      image: `${import.meta.env.BASE_URL}proj_emergency_contact.png`,
      bgGradient: 'from-red-600/30 to-purple-600/30'
    },
    {
      id: 'developer-portfolio',
      title: 'DEVELOPER PORTFOLIO',
      displayTitle: 'Interactive Developer Portfolio & Showcase Web App',
      meta: 'Modern Frontend Web App | React 19 & Tailwind CSS',
      desc: 'Designed and engineered an interactive, high-performance developer portfolio showcasing professional experience, projects, interactive particle physics canvas, and live GitHub API integration.',
      highlights: [
        'Built dynamic 3D tilt interaction cards, interactive particle network background canvas, and custom audio SFX engines.',
        'Integrated live GitHub API feed for real-time commit streaming and repository statistics.',
        'Engineered interactive skill sandbox widgets and fast document preview modals with download tracking.',
        'Optimized for responsive layout performance across desktop, tablet, and mobile browsers.'
      ],
      tags: ['React 19', 'JavaScript (ES6+)', 'Tailwind CSS', 'Vite', 'Canvas API', 'GitHub API', 'Web Audio API'],
      demoUrl: 'https://abhilash-kk.github.io/Portfolio_abhilash/',
      image: `${import.meta.env.BASE_URL}proj_portfolio.png`,
      bgGradient: 'from-purple-600/30 to-blue-600/30'
    }
  ];

  return (
    <section id="projects" className="py-24 px-6 md:px-12 max-w-[1200px] mx-auto overflow-hidden">
      <ScrollReveal className="flex flex-col items-start mb-16">
        {/* Title with Gradient Line */}
        <h2 className="font-display text-3xl md:text-4xl font-extrabold text-white uppercase tracking-wider">
          PROJECTS
        </h2>
        <div className="h-[3px] w-48 bg-gradient-to-r from-green-400 via-yellow-400 to-purple-600 mt-3 rounded-full"></div>
      </ScrollReveal>

      {/* Grid of Projects (2x2 layout on desktop) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projectsData.map((project) => (
          <ScrollReveal key={project.id} className="group cursor-pointer" onClick={() => setActiveProject(project)}>
            {/* 3D Tilt Card Container */}
            <Tilt className="rounded-xl overflow-hidden mb-4 shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
              {/* Card Thumbnail Container */}
              <div className="relative w-full aspect-video bg-card-dark border border-border-dark">
                {/* actual project image */}
                <img 
                  src={project.image} 
                  alt={project.displayTitle}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 z-10"
                />
                {/* Subtle hover gradient overlay */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-primary/20 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center z-20">
                  <span className="font-display text-xs font-bold tracking-widest text-white bg-bg-dark/80 px-4 py-2 border border-border-dark rounded shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    VIEW DETAILS
                  </span>
                </div>
              </div>
            </Tilt>

            {/* Label underneath */}
            <h3 className="font-display text-center text-lg font-bold tracking-widest text-white group-hover:text-primary transition-colors uppercase">
              {project.title}
            </h3>
            <p className="text-center font-display text-[0.65rem] tracking-[0.2em] text-slate-400 mt-1 uppercase">
              {project.meta.split(' | ')[0]}
            </p>
          </ScrollReveal>
        ))}
      </div>

      {/* Project Detail Modal */}
      {activeProject && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-6 animate-in fade-in duration-200" onClick={() => setActiveProject(null)}>
          <div 
            className="bg-[#0b0b0f] border border-border-dark w-full max-w-[700px] rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(168,85,247,0.2)] animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-8 border-b border-border-dark flex justify-between items-center">
              <div>
                <span className="text-xs font-display font-bold tracking-[0.25em] text-primary block mb-1 uppercase">
                  {activeProject.meta}
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-white uppercase">
                  {activeProject.displayTitle}
                </h3>
              </div>
              <button 
                onClick={() => setActiveProject(null)} 
                className="w-10 h-10 rounded-full border border-border-dark flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/5 transition-colors text-lg"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            {/* Content */}
            <div className="p-8 max-h-[60vh] overflow-y-auto font-sans">
              <p className="text-slate-300 leading-relaxed mb-6">
                {activeProject.desc}
              </p>
              
              <h4 className="font-display text-xs font-bold tracking-widest text-white uppercase mb-4">
                Key Accomplishments
              </h4>
              <ul className="list-disc pl-5 flex flex-col gap-2.5 mb-6 text-sm text-slate-400 leading-relaxed">
                {activeProject.highlights.map((h, index) => (
                  <li key={index}>{h}</li>
                ))}
              </ul>

              <h4 className="font-display text-xs font-bold tracking-widest text-white uppercase mb-4">
                Tech Stack
              </h4>
              <div className="flex flex-wrap gap-2 mb-6">
                {activeProject.tags.map((tag) => (
                  <span 
                    key={tag}
                    className="px-3.5 py-1 bg-[#1a1a26] border border-border-dark text-xs text-slate-300 font-semibold rounded-full uppercase"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Demo URL Button */}
              {activeProject.demoUrl && (
                <div className="border-t border-border-dark/60 pt-6">
                  <a
                    href={activeProject.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-display text-xs font-bold tracking-widest bg-primary hover:bg-primary-hover text-white px-6 py-3 uppercase transition-all duration-300 shadow-[0_0_15px_rgba(168,85,247,0.3)]"
                  >
                    <i className="fas fa-external-link-alt"></i> VISIT LIVE APP
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
