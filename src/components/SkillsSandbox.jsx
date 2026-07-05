import React, { useEffect, useRef } from 'react';
import { playTick, playClick } from '../utils/sfx';

export default function SkillsSandbox() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = canvas.parentElement.clientWidth || 350);
    let height = (canvas.height = 300);

    const skills = [
      'Python', 'React', 'YOLOv8', 'Vite', 'HTML', 'CSS',
      'SQL', 'OpenCV', 'PyTorch', 'Git', 'JS', 'Agile'
    ];

    const bubbles = [];
    const dragCoeff = 0.98; // Friction
    const elasticity = 0.75; // Bounce factor

    class Bubble {
      constructor(text, x, y) {
        this.text = text;
        ctx.font = 'bold 12px sans-serif';
        const textWidth = ctx.measureText(text).width;
        this.radius = textWidth / 2 + 18; // Radius based on text width
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 4;
        this.vy = (Math.random() - 0.5) * 4;
        this.mass = this.radius * 0.1;
        this.isBeingDragged = false;
        this.glowColor = this.getRandomGlowColor();
      }

      getRandomGlowColor() {
        const colors = [
          '#a855f7', // Purple
          '#22c55e', // Green
          '#06b6d4', // Cyan
          '#eab308'  // Yellow
        ];
        return colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        if (this.isBeingDragged) return;

        // Apply friction
        this.vx *= dragCoeff;
        this.vy *= dragCoeff;

        this.x += this.vx;
        this.y += this.vy;

        // Wall collisions
        if (this.x - this.radius < 0) {
          this.x = this.radius;
          this.vx = -this.vx * elasticity;
          playTick();
        } else if (this.x + this.radius > width) {
          this.x = width - this.radius;
          this.vx = -this.vx * elasticity;
          playTick();
        }

        if (this.y - this.radius < 0) {
          this.y = this.radius;
          this.vy = -this.vy * elasticity;
          playTick();
        } else if (this.y + this.radius > height) {
          this.y = height - this.radius;
          this.vy = -this.vy * elasticity;
          playTick();
        }
      }

      draw() {
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);

        // Glassmorphism body fill
        ctx.fillStyle = 'rgba(11, 11, 15, 0.75)';
        ctx.fill();

        // Neon border stroke
        ctx.strokeStyle = this.isBeingDragged ? '#ffffff' : this.glowColor;
        ctx.lineWidth = this.isBeingDragged ? 2 : 1;
        ctx.shadowBlur = this.isBeingDragged ? 12 : 5;
        ctx.shadowColor = this.isBeingDragged ? '#ffffff' : this.glowColor;
        ctx.stroke();

        // Draw Text inside bubble
        ctx.shadowBlur = 0; // reset shadow for text
        ctx.fillStyle = this.isBeingDragged ? '#ffffff' : '#e2e8f0';
        ctx.font = 'bold 11px "Space Grotesk", sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.text, this.x, this.y);
        ctx.restore();
      }
    }

    // Initialize bubbles at random non-overlapping positions
    skills.forEach((skill, idx) => {
      let x = Math.random() * (width - 80) + 40;
      let y = Math.random() * (height - 80) + 40;
      
      // Basic avoidance on placement
      for (let attempt = 0; attempt < 20; attempt++) {
        let overlapping = false;
        bubbles.forEach((b) => {
          const dist = Math.hypot(b.x - x, b.y - y);
          if (dist < b.radius + 35) overlapping = true;
        });
        if (!overlapping) break;
        x = Math.random() * (width - 80) + 40;
        y = Math.random() * (height - 80) + 40;
      }

      bubbles.push(new Bubble(skill, x, y));
    });

    // Handle physics collisions between bubbles
    const resolveCollisions = () => {
      for (let i = 0; i < bubbles.length; i++) {
        for (let j = i + 1; j < bubbles.length; j++) {
          const b1 = bubbles[i];
          const b2 = bubbles[j];

          const dx = b2.x - b1.x;
          const dy = b2.y - b1.y;
          const dist = Math.hypot(dx, dy);
          const minDist = b1.radius + b2.radius;

          if (dist < minDist) {
            // Overlap correction
            const overlap = minDist - dist;
            const nx = dx / dist;
            const ny = dy / dist;

            // Separate them equally
            if (!b1.isBeingDragged && !b2.isBeingDragged) {
              b1.x -= nx * overlap * 0.5;
              b1.y -= ny * overlap * 0.5;
              b2.x += nx * overlap * 0.5;
              b2.y += ny * overlap * 0.5;
            } else if (b1.isBeingDragged) {
              b2.x += nx * overlap;
              b2.y += ny * overlap;
            } else {
              b1.x -= nx * overlap;
              b1.y -= ny * overlap;
            }

            // Elastic collision velocities
            const kx = b1.vx - b2.vx;
            const ky = b1.vy - b2.vy;
            const p = 2 * (nx * kx + ny * ky) / (b1.mass + b2.mass);

            if (!b1.isBeingDragged) {
              b1.vx -= p * b2.mass * nx;
              b1.vy -= p * b2.mass * ny;
            }
            if (!b2.isBeingDragged) {
              b2.vx += p * b1.mass * nx;
              b2.vy += p * b1.mass * ny;
            }

            playTick();
          }
        }
      }
    };

    // Interaction vars
    let activeDragBubble = null;
    let lastMousePos = { x: 0, y: 0 };
    let mouseVelocity = { x: 0, y: 0 };

    const getMouseCoords = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      return { x, y };
    };

    const handleMouseDown = (e) => {
      const mouse = getMouseCoords(e);
      bubbles.forEach((b) => {
        const dist = Math.hypot(b.x - mouse.x, b.y - mouse.y);
        if (dist < b.radius) {
          activeDragBubble = b;
          b.isBeingDragged = true;
          b.vx = 0;
          b.vy = 0;
          lastMousePos = { ...mouse };
          playClick();
        }
      });
    };

    const handleMouseMove = (e) => {
      if (!activeDragBubble) return;
      const mouse = getMouseCoords(e);

      mouseVelocity = {
        x: mouse.x - lastMousePos.x,
        y: mouse.y - lastMousePos.y
      };

      activeDragBubble.x = mouse.x;
      activeDragBubble.y = mouse.y;

      lastMousePos = { ...mouse };
    };

    const handleMouseUp = () => {
      if (!activeDragBubble) return;
      activeDragBubble.isBeingDragged = false;
      activeDragBubble.vx = mouseVelocity.x * 0.8;
      activeDragBubble.vy = mouseVelocity.y * 0.8;
      activeDragBubble = null;
      mouseVelocity = { x: 0, y: 0 };
      playClick();
    };

    // Listeners
    canvas.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    // Support mobile touch events
    const handleTouchStart = (e) => {
      if (e.touches.length > 0) handleMouseDown(e.touches[0]);
    };
    const handleTouchMove = (e) => {
      if (e.touches.length > 0) handleMouseMove(e.touches[0]);
    };
    canvas.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleMouseUp);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth || 350;
    };
    window.addEventListener('resize', handleResize);

    // Loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      bubbles.forEach((b) => {
        b.update();
        b.draw();
      });

      resolveCollisions();

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-[#0b0b0f] border border-border-dark rounded-2xl shadow-xl w-full max-w-[400px] hover:border-primary/20 transition-all duration-300">
      <h3 className="font-display text-sm font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-3">
        <i className="fas fa-gamepad text-primary shadow-[0_0_10px_rgba(168,85,247,0.3)]"></i> Skills Sandbox
      </h3>
      <p className="text-slate-500 text-[0.65rem] tracking-wider uppercase mb-4 font-semibold font-display">
        Click, drag, and fling skill bubbles!
      </p>
      <div className="w-full bg-[#050505] rounded-xl overflow-hidden border border-border-dark/60 relative">
        <canvas ref={canvasRef} className="block cursor-grab active:cursor-grabbing w-full" />
      </div>
    </div>
  );
}
