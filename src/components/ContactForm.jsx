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
    <section id="contact" className="relative py-24 pl-6 pr-16 md:pl-12 md:pr-24 max-w-[1200px] mx-auto overflow-hidden">
      <div className="grid grid-cols-1 w-full relative">
        <ScrollReveal className="flex flex-col items-start mb-16">
          {/* Title */}
          <h2 className="font-display text-3xl md:text-4xl font-extrabold text-white uppercase tracking-wider text-left">
            I AM READY TO COLLABORATE WITH YOU
          </h2>
          <div className="h-[3px] w-48 bg-gradient-to-r from-green-400 via-yellow-400 to-purple-600 mt-3 rounded-full"></div>
        </ScrollReveal>

        {/* Structured Form */}
        <ScrollReveal className="mb-20">
          <form onSubmit={handleSubmit} className="flex flex-col gap-8 w-full max-w-[900px]">
            {/* Row 1: Name and Email */}
            <div className="flex flex-col md:flex-row gap-8 w-full">
              {/* Name field */}
              <div className="flex items-center gap-4 flex-1 border-b border-border-dark/60 py-3">
                <span className="text-slate-300 font-display text-xs md:text-sm tracking-wider font-bold shrink-0">
                  MY NAME IS
                </span>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="YOUR NAME"
                  className="bg-transparent focus:outline-none text-white font-sans text-sm md:text-base w-full placeholder:text-slate-700"
                  required
                />
              </div>
              
              {/* Email field */}
              <div className="flex items-center gap-4 flex-1 border-b border-border-dark/60 py-3">
                <span className="text-slate-300 font-display text-xs md:text-sm tracking-wider font-bold shrink-0">
                  MY EMAIL IS
                </span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="YOUR EMAIL"
                  className="bg-transparent focus:outline-none text-white font-sans text-sm md:text-base w-full placeholder:text-slate-700"
                  required
                />
              </div>
            </div>
            
            {/* Row 2: Message/Topic */}
            <div className="flex items-center gap-4 border-b border-border-dark/60 py-3 w-full">
              <span className="text-slate-300 font-display text-xs md:text-sm tracking-wider font-bold shrink-0">
                I AM INTERESTED IN
              </span>
              <input
                type="text"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="PROJECT DETAILS / MESSAGE"
                className="bg-transparent focus:outline-none text-white font-sans text-sm md:text-base w-full placeholder:text-slate-700"
                required
              />
            </div>

            {/* Row 3: Submit Button */}
            <div className="flex justify-start md:justify-end mt-4">
              <button
                type="submit"
                disabled={status === 'sending'}
                className="font-display text-xs font-bold tracking-widest bg-primary hover:bg-primary-hover text-white px-8 py-3.5 uppercase transition-all duration-300 shadow-[0_0_15px_rgba(168,85,247,0.3)] hover:shadow-[0_0_25px_rgba(168,85,247,0.5)] cursor-pointer disabled:opacity-50"
              >
                {status === 'sending' ? 'SENDING...' : 'SEND'}
              </button>
            </div>
          </form>
          
          {/* Status alerts */}
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
            <i className="fab fa-whatsapp text-primary text-base"></i> 
            <a href="https://wa.me/918590979422" target="_blank" rel="noopener noreferrer">WhatsApp Chat</a>
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
