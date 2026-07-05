import React, { useRef, useState } from 'react';

export default function Tilt({ children, className = '', options = {} }) {
  const cardRef = useRef(null);
  const [style, setStyle] = useState({});
  const [glareStyle, setGlareStyle] = useState({ opacity: 0 });

  const settings = {
    max: 12,           // max rotation angle in degrees
    perspective: 1000, // transform perspective
    scale: 1.02,       // transform scale on hover
    speed: 400,        // transition speed in ms
    ...options
  };

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Mouse coordinates relative to card
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Normalize coordinates from -0.5 to 0.5
    const normX = (x / width) - 0.5;
    const normY = (y / height) - 0.5;

    // Calculate rotation percentage
    const rotateX = -normY * settings.max;
    const rotateY = normX * settings.max;

    // Calculate glare angle and opacity
    const angle = Math.atan2(y - height / 2, x - width / 2) * (180 / Math.PI);
    const glareOpacity = 0.12; // Max opacity of the glare

    setStyle({
      transform: `perspective(${settings.perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${settings.scale}, ${settings.scale}, ${settings.scale})`,
      transition: 'transform 100ms ease-out'
    });

    setGlareStyle({
      opacity: glareOpacity,
      background: `linear-gradient(${angle - 180}deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0) 80%)`,
      transition: 'opacity 100ms ease-out'
    });
  };

  const handleMouseLeave = () => {
    setStyle({
      transform: `perspective(${settings.perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
      transition: `transform ${settings.speed}ms ease`
    });

    setGlareStyle({
      opacity: 0,
      transition: `all ${settings.speed}ms ease`
    });
  };

  return (
    <div
      ref={cardRef}
      className={`relative overflow-hidden ${className}`}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {/* Glare/Shine layer */}
      <div 
        className="absolute inset-0 pointer-events-none z-30" 
        style={glareStyle}
      />
    </div>
  );
}
