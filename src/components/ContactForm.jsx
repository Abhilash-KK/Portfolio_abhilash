import React, { useState } from 'react';
import ScrollReveal from './ScrollReveal';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [status, setStatus] = useState(''); // '', 'sending', 'success', 'error'

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill out all fields.');
      return;
    }

    setStatus('sending');

    try {
      const response = await fetch("https://formsubmit.co/ajax/kkabhilash30@gmail.com", {
        method: "POST",
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message
        })
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus(''), 5000); // Clear status after 5s
      } else {
        setStatus('error');
        setTimeout(() => setStatus(''), 5000);
      }
    } catch (error) {
      console.error(error);
      setStatus('error');
      setTimeout(() => setStatus(''), 5000);
    }
  };

  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <section id="contact" className="relative py-24 px-6 md:px-12 max-w-[1200px] mx-auto overflow-hidden">
      <div className="grid grid-cols-1 w-full relative">
        <ScrollReveal className="flex flex-col items-start mb-16">
          {/* Title */}
          <h2 className="font-display text-3xl md:text-4xl font-extrabold text-white uppercase tracking-wider text-left">
            I AM READY TO COLLABORATE WITH YOU
          </h2>
          <div className="h-[3px] w-48 bg-gradient-to-r from-green-400 via-yellow-400 to-purple-600 mt-3 rounded-full"></div>
        </ScrollReveal>

        {/* Inline Form */}
        <ScrollReveal className="mb-20">
          <form onSubmit={handleSubmit} className="flex flex-wrap items-center gap-y-8 gap-x-4 font-display text-base md:text-xl text-white uppercase leading-relaxed">
            <span className="text-slate-300">My Name Is</span>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="YOUR NAME"
              className="bg-transparent border-b border-border-dark py-2 px-3 focus:outline-none focus:border-primary text-white font-sans text-sm md:text-base normal-case min-w-[200px] transition-colors"
              required
            />
            
            <span className="text-slate-300">My Email Is</span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="YOUR EMAIL"
              className="bg-transparent border-b border-border-dark py-2 px-3 focus:outline-none focus:border-primary text-white font-sans text-sm md:text-base normal-case min-w-[200px] transition-colors"
              required
            />
            
            <span className="text-slate-300">I Am Interested In</span>
            <input
              type="text"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="PROJECT / TOPIC"
              className="bg-transparent border-b border-border-dark py-2 px-3 focus:outline-none focus:border-primary text-white font-sans text-sm md:text-base normal-case min-w-[250px] transition-colors flex-1"
              required
            />

             <button
              type="submit"
              disabled={status === 'sending'}
              className="font-display text-xs font-bold tracking-widest bg-primary hover:bg-primary-hover text-white px-8 py-3.5 uppercase transition-all duration-300 shadow-[0_0_15px_rgba(168,85,247,0.3)] hover:shadow-[0_0_25px_rgba(168,85,247,0.5)] cursor-pointer disabled:opacity-50"
            >
              {status === 'sending' ? 'SENDING...' : 'SEND'}
            </button>
          </form>
          {status === 'success' && (
            <p className="mt-6 text-green-400 font-display text-sm tracking-wider uppercase animate-pulse">
              ✔ Message sent successfully! I will get in touch soon.
            </p>
          )}
          {status === 'error' && (
            <p className="mt-6 text-red-400 font-display text-sm tracking-wider uppercase">
              ✘ There was an error sending the message. Please try again.
            </p>
          )}
        </ScrollReveal>

        {/* Contact details row */}
        <ScrollReveal className="flex flex-wrap gap-x-12 gap-y-4 border-t border-border-dark/60 pt-10 text-xs md:text-sm text-slate-400 font-sans">
          <span className="flex items-center gap-2 hover:text-primary transition-colors duration-200">
            <i className="fas fa-phone text-primary text-base"></i> 
            <a href="tel:+918590979422">+91 8590979422</a>
          </span>
          <span className="flex items-center gap-2 hover:text-primary transition-colors duration-200">
            <i className="fas fa-location-dot text-primary text-base"></i> 
            <span>Narikkundu(PO), Ambalavayal, Wayanad, Kerala</span>
          </span>
          <span className="flex items-center gap-2 hover:text-primary transition-colors duration-200">
            <i className="fas fa-envelope text-primary text-base"></i> 
            <a href="mailto:kkabhilash30@gmail.com">kkabhilash30@gmail.com</a>
          </span>
        </ScrollReveal>

        {/* Vertical Go Back To The Top sidebar */}
        <button
          onClick={handleScrollTop}
          className="absolute right-0 bottom-10 hidden lg:flex items-center gap-2 text-slate-500 font-display text-[0.65rem] font-bold tracking-[0.3em] uppercase [writing-mode:vertical-rl] select-none hover:text-primary transition-all duration-300 group cursor-pointer focus:outline-none"
        >
          <span className="group-hover:-translate-y-1 transition-transform duration-300">Go Back To The Top</span>
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
        </button>
      </div>
    </section>
  );
}
