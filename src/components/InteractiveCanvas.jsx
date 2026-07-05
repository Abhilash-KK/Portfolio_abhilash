import React, { useEffect, useRef, useState } from 'react';

export default function InteractiveCanvas() {
  const canvasRef = useRef(null);
  const [bgMode, setBgMode] = useState(() => localStorage.getItem('bg-mode') || 'neural');
  const bgModeRef = useRef(bgMode);

  useEffect(() => {
    bgModeRef.current = bgMode;
  }, [bgMode]);

  useEffect(() => {
    const handleBgChange = (e) => {
      setBgMode(e.detail);
    };
    window.addEventListener('bg-mode-change', handleBgChange);
    return () => window.removeEventListener('bg-mode-change', handleBgChange);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles = [];
    const particleCount = Math.min(60, Math.floor((width * height) / 25000));
    const connectionDistance = 110;
    const mouse = { x: null, y: null, radius: 150 };

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.radius = Math.random() * 2 + 1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce on boundaries
        if (this.x < 0 || this.x > width) this.vx = -this.vx;
        if (this.y < 0 || this.y > height) this.vy = -this.vy;

        // Mouse push effect
        if (mouse.x !== null && mouse.y !== null) {
          const dx = this.x - mouse.x;
          const dy = this.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            const angle = Math.atan2(dy, dx);
            this.x += Math.cos(angle) * force * 0.8;
            this.y += Math.sin(angle) * force * 0.8;
          }
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(168, 85, 247, 0.45)'; // Glow purple
        ctx.shadowBlur = 4;
        ctx.shadowColor = '#a855f7';
        ctx.fill();
        ctx.shadowBlur = 0; // Reset
      }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Matrix Rain Initialization
    const fontSize = 14;
    let cols = Math.floor(width / fontSize);
    let yPos = Array(cols).fill(0).map(() => Math.random() * -height);

    // Listeners
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      
      // Re-initialize columns on resize for Matrix mode
      cols = Math.floor(width / fontSize);
      yPos = Array(cols).fill(0).map(() => Math.random() * -height);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    // Animation Loop
    const animate = () => {
      if (bgModeRef.current === 'matrix') {
        // Draw Matrix digital rain
        ctx.fillStyle = 'rgba(5, 5, 5, 0.08)'; // slow fade to leave trails
        ctx.fillRect(0, 0, width, height);

        ctx.fillStyle = 'rgba(34, 197, 94, 0.85)'; // Green code characters
        ctx.font = `bold ${fontSize}px monospace`;
        ctx.shadowBlur = 4;
        ctx.shadowColor = '#22c55e';

        for (let i = 0; i < yPos.length; i++) {
          // Random character (Katana or ASCII-like symbols)
          const text = String.fromCharCode(Math.floor(Math.random() * 96) + 33);
          const x = i * fontSize;
          const y = yPos[i];
          ctx.fillText(text, x, y);

          if (y > height || (y > 0 && Math.random() < 0.015)) {
            yPos[i] = -fontSize;
          } else {
            yPos[i] += fontSize;
          }
        }
        ctx.shadowBlur = 0;
      } else {
        // Draw default Neural Net nodes
        ctx.clearRect(0, 0, width, height);

        // Update and draw particles
        particles.forEach((p) => {
          p.update();
          p.draw();
        });

        // Draw connections
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < connectionDistance) {
              const alpha = (connectionDistance - dist) / connectionDistance * 0.15;
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.strokeStyle = `rgba(168, 85, 247, ${alpha})`;
              ctx.lineWidth = 0.8;
              ctx.stroke();
            }
          }

          // Draw connection to mouse
          if (mouse.x !== null && mouse.y !== null) {
            const dx = particles[i].x - mouse.x;
            const dy = particles[i].y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < mouse.radius) {
              const alpha = (mouse.radius - dist) / mouse.radius * 0.2;
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(mouse.x, mouse.y);
              ctx.strokeStyle = `rgba(34, 197, 94, ${alpha})`;
              ctx.lineWidth = 0.8;
              ctx.stroke();
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 w-full h-full pointer-events-none z-0 transition-opacity duration-500 ${
        bgMode === 'matrix' ? 'opacity-25' : 'opacity-40'
      }`}
    />
  );
}
