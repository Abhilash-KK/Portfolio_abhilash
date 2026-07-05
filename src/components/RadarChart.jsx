import React, { useState } from 'react';
import { playHover } from '../utils/sfx';

export default function RadarChart() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const skills = [
    { name: 'Machine Learning', value: 90 },
    { name: 'Web Dev', value: 85 },
    { name: 'Python / C', value: 92 },
    { name: 'Database (SQL)', value: 80 },
    { name: 'Computer Vision', value: 88 },
    { name: 'Collaboration', value: 85 }
  ];

  const size = 300;
  const center = size / 2;
  const radius = size * 0.35;
  const angleStep = (Math.PI * 2) / skills.length;

  // Calculate coordinates for grid lines & values
  const getCoordinates = (index, value) => {
    const angle = angleStep * index - Math.PI / 2; // Start from top
    const currentRadius = radius * (value / 100);
    const x = center + currentRadius * Math.cos(angle);
    const y = center + currentRadius * Math.sin(angle);
    return { x, y };
  };

  // Generate grid levels (concentric pentagons/hexagons)
  const gridLevels = [20, 40, 60, 80, 100];

  // Draw the polygon for values
  const points = skills.map((s, idx) => {
    const coords = getCoordinates(idx, s.value);
    return `${coords.x},${coords.y}`;
  }).join(' ');

  const handlePointHover = (idx) => {
    setHoveredIndex(idx);
    playHover();
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-[#0b0b0f] border border-border-dark rounded-2xl shadow-xl w-full max-w-[400px] hover:border-primary/20 transition-all duration-300">
      <h3 className="font-display text-sm font-bold text-white uppercase tracking-wider mb-6 flex items-center gap-3">
        <i className="fas fa-chart-pie text-primary shadow-[0_0_10px_rgba(168,85,247,0.3)]"></i> Skill Matrix
      </h3>

      <div className="relative w-full aspect-square flex items-center justify-center">
        <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full">
          {/* Radial grids */}
          {gridLevels.map((level) => {
            const levelPoints = skills.map((_, idx) => {
              const coords = getCoordinates(idx, level);
              return `${coords.x},${coords.y}`;
            }).join(' ');
            return (
              <polygon
                key={level}
                points={levelPoints}
                fill="none"
                stroke="rgba(168, 85, 247, 0.12)"
                strokeWidth="1"
              />
            );
          })}

          {/* Grid lines (center to corners) */}
          {skills.map((_, idx) => {
            const coords = getCoordinates(idx, 100);
            return (
              <line
                key={idx}
                x1={center}
                y1={center}
                x2={coords.x}
                y2={coords.y}
                stroke="rgba(168, 85, 247, 0.12)"
                strokeWidth="1"
              />
            );
          })}

          {/* Filled Skill Polygon Area */}
          <polygon
            points={points}
            fill="rgba(168, 85, 247, 0.25)"
            stroke="#a855f7"
            strokeWidth="2"
            filter="drop-shadow(0px 0px 6px rgba(168,85,247,0.4))"
            className="transition-all duration-500 ease-out"
          />

          {/* Interaction/Indicator Dots */}
          {skills.map((s, idx) => {
            const coords = getCoordinates(idx, s.value);
            const isHovered = hoveredIndex === idx;
            return (
              <circle
                key={idx}
                cx={coords.x}
                cy={coords.y}
                r={isHovered ? 6 : 4}
                fill={isHovered ? '#22c55e' : '#a855f7'}
                stroke="#0b0b0f"
                strokeWidth="1.5"
                onMouseEnter={() => handlePointHover(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="cursor-pointer transition-all duration-200"
              />
            );
          })}

          {/* Floating Text Labels */}
          {skills.map((s, idx) => {
            const angle = angleStep * idx - Math.PI / 2;
            const labelRadius = radius + 25; // Push label outside grid
            const x = center + labelRadius * Math.cos(angle);
            const y = center + labelRadius * Math.sin(angle);
            
            // Adjust text anchor
            let textAnchor = 'middle';
            if (Math.cos(angle) > 0.1) textAnchor = 'start';
            else if (Math.cos(angle) < -0.1) textAnchor = 'end';

            const isHovered = hoveredIndex === idx;

            return (
              <text
                key={idx}
                x={x}
                y={y + 4}
                fill={isHovered ? '#22c55e' : '#94a3b8'}
                fontSize="10"
                fontWeight="bold"
                textAnchor={textAnchor}
                className="font-display select-none transition-colors duration-200 uppercase tracking-widest"
              >
                {s.name}
              </text>
            );
          })}
        </svg>

        {/* Hover center tooltip */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none">
          <span className="text-[0.65rem] font-bold text-slate-500 tracking-[0.2em] uppercase">
            {hoveredIndex !== null ? skills[hoveredIndex].name : 'Overview'}
          </span>
          <span className="text-xl font-black font-display text-white mt-0.5">
            {hoveredIndex !== null ? `${skills[hoveredIndex].value}%` : 'Skill Map'}
          </span>
        </div>
      </div>
    </div>
  );
}
