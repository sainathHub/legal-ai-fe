'use client';

import React, { useState, useEffect, useRef } from 'react';

// Exact 10-layer isometric ribbon paths from tennr.com's hero architecture
const TENNR_LAYERS = [
  { index: 0, d: "M618,328.58l355.63-223.58v1063.5l-355.63,222.5V328.58Z", opacity: 0.25, strokeOpacity: 0.15 },
  { index: 1, d: "M668,378.58l355.63-223.58v1061l-355.63,227V378.58Z", opacity: 0.32, strokeOpacity: 0.20 },
  { index: 2, d: "M716,426.58l355.63-223.58v1064l-355.63,222.5V426.58Z", opacity: 0.40, strokeOpacity: 0.25, label: "Research" },
  { index: 3, d: "M762,472.58l355.63-223.58v1061.27l-355.63,226.73V472.58Z", opacity: 0.48, strokeOpacity: 0.32 },
  { index: 4, d: "M806,516.58l355.63-223.58v1064.27l-355.63,221.42V516.58Z", opacity: 0.58, strokeOpacity: 0.40 },
  { index: 5, d: "M848,558.58l355.63-223.58v1066.27l-355.63,220.42V558.58Z", opacity: 0.68, strokeOpacity: 0.50, label: "Draft" },
  { index: 6, d: "M888,598.58l355.63-223.58v1063.27l-355.63,223.42V598.58Z", opacity: 0.78, strokeOpacity: 0.60 },
  { index: 7, d: "M926,628.81l355.63-223.58v1063.27l-355.63,223.5V628.81Z", opacity: 0.86, strokeOpacity: 0.70 },
  { index: 8, d: "M962,672.58l355.63-223.58v1063.5l-355.63,222.42V672.58Z", opacity: 0.94, strokeOpacity: 0.80 },
  { index: 9, d: "M998,706.58l355.63-223.58v1063.27l-355.63,221.42V706.58Z", opacity: 1.00, strokeOpacity: 0.95, label: "Clauses" },
];

export default function RectangleStack() {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  // Smooth mouse parallax like Tennr.com
  useEffect(() => {
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let animId: number;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const updateParallax = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      setMouseOffset({ x: currentX, y: currentY });
      animId = requestAnimationFrame(updateParallax);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    animId = requestAnimationFrame(updateParallax);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full max-w-[340px] sm:max-w-[400px] h-[340px] sm:h-[380px] flex items-center justify-center cursor-pointer select-none group"
    >
      {/* Exact Tennr 10-Layer Cascading Isometric Vector Stack */}
      <svg
        viewBox="580 90 800 860"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible drop-shadow-[0_15px_35px_rgba(0,0,0,0.06)]"
      >
        <defs>
          <filter id="tennr-shadow" x="-10%" y="-10%" width="130%" height="130%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity="0.05" />
          </filter>
        </defs>

        {TENNR_LAYERS.map((layer) => {
          // Calculate expansion and parallax translation per layer
          const expandFactor = isHovered ? (layer.index - 4.5) * 12 : 0;
          const parallaxX = mouseOffset.x * (layer.index + 1) * 3.5;
          const parallaxY = mouseOffset.y * (layer.index + 1) * 2.5;
          const totalX = expandFactor + parallaxX;
          const totalY = expandFactor + parallaxY;

          return (
            <g
              key={layer.index}
              style={{
                transform: `translate3d(${totalX}px, ${totalY}px, 0)`,
                transition: isHovered 
                  ? 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)' 
                  : 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)',
                opacity: layer.opacity,
              }}
            >
              {/* Shaded Plane Fill */}
              <path
                d={layer.d}
                fill={layer.index === 9 ? '#ffffff' : '#f9f9fb'}
                fillOpacity={0.88 + layer.index * 0.012}
                filter={layer.index > 5 ? 'url(#tennr-shadow)' : undefined}
              />
              {/* Crisp Stroke Outline */}
              <path
                d={layer.d}
                stroke="#000000"
                strokeWidth={layer.index === 9 ? 1.8 : 1.2}
                strokeOpacity={layer.strokeOpacity}
                fill="none"
              />
            </g>
          );
        })}
      </svg>

      {/* Synchronized Feature Callouts: Research, Draft, Clauses */}
      {/* 1. Research Callout (Top) */}
      <div 
        className="absolute top-2 right-24 sm:right-28 flex flex-col items-center pointer-events-none transition-all duration-300 ease-out"
        style={{
          opacity: isHovered ? 1 : 0,
          transform: `translate3d(${mouseOffset.x * 12}px, ${isHovered ? mouseOffset.y * 10 - 8 : mouseOffset.y * 10}px, 0)`,
        }}
      >
        <span className="text-xs sm:text-[13px] font-medium tracking-normal text-black whitespace-nowrap mb-1">
          Research
        </span>
        <span 
          className="w-[1px] bg-zinc-800 transition-all duration-300 ease-out"
          style={{ height: isHovered ? '28px' : '0px' }}
        />
      </div>

      {/* 2. Draft Callout (Right) */}
      <div 
        className="absolute top-1/2 -translate-y-1/2 -right-4 sm:-right-8 flex items-center pointer-events-none transition-all duration-300 ease-out"
        style={{
          opacity: isHovered ? 1 : 0,
          transform: `translate3d(${isHovered ? mouseOffset.x * 18 + 8 : mouseOffset.x * 18}px, ${mouseOffset.y * 14}px, 0)`,
        }}
      >
        <span 
          className="h-[1px] bg-zinc-800 transition-all duration-300 ease-out"
          style={{ width: isHovered ? '36px' : '0px' }}
        />
        <span className="pl-2 text-xs sm:text-[13px] font-medium tracking-normal text-black whitespace-nowrap">
          Draft
        </span>
      </div>

      {/* 3. Clauses Callout (Bottom) */}
      <div 
        className="absolute bottom-4 left-16 sm:left-20 flex flex-col items-center pointer-events-none transition-all duration-300 ease-out"
        style={{
          opacity: isHovered ? 1 : 0,
          transform: `translate3d(${mouseOffset.x * 24}px, ${isHovered ? mouseOffset.y * 18 + 8 : mouseOffset.y * 18}px, 0)`,
        }}
      >
        <span 
          className="w-[1px] bg-zinc-800 transition-all duration-300 ease-out"
          style={{ height: isHovered ? '28px' : '0px' }}
        />
        <span className="text-xs sm:text-[13px] font-medium tracking-normal text-black whitespace-nowrap mt-1">
          Clauses
        </span>
      </div>
    </div>
  );
}
