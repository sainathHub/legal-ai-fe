'use client';

import React, { useEffect, useRef } from 'react';

interface StackLayer {
  id: number;
  zIndex: number;
  delay: string;
  label: string;
  sub: string;
}

export default function StackedBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let animId: number;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      targetX = (e.clientX / innerWidth - 0.5) * 2;
      targetY = (e.clientY / innerHeight - 0.5) * 2;
    };

    const animate = () => {
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;

      if (container) {
        container.style.setProperty('--mouse-x', currentX.toFixed(4));
        container.style.setProperty('--mouse-y', currentY.toFixed(4));
      }

      animId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  // 5 horizontal legal dossier cards in a clean horizontal cascade
  const stackLayers: StackLayer[] = [
    { id: 1, zIndex: 1, delay: '0s', label: 'INDIAN PRECEDENTS DB', sub: 'SEC. 14 IBC & ART. 21' },
    { id: 2, zIndex: 2, delay: '0.6s', label: 'LANDMARK JURISPRUDENCE', sub: '1950 - 2026 BENCH ORDERS' },
    { id: 3, zIndex: 3, delay: '1.2s', label: 'RATIO DECIDENDI VECTORS', sub: 'WEAVIATE EMBEDDINGS' },
    { id: 4, zIndex: 4, delay: '1.8s', label: 'GROQ LLM SUMMARIZER', sub: 'LEGAL FACTS & HOLDINGS' },
    { id: 5, zIndex: 5, delay: '2.4s', label: 'JURISPRUDENCE RAG MATRIX', sub: 'HIGH COURT & APEX BENCH' },
  ];

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-white"
      style={{
        // @ts-expect-error CSS variable
        '--mouse-x': '0',
        '--mouse-y': '0',
      }}
      aria-hidden="true"
    >
      {/* Subtle Architectural Grid Lines */}
      <div 
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0, 0, 0, 0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          maskImage: 'radial-gradient(ellipse at 60% 40%, black 20%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 60% 40%, black 20%, transparent 80%)',
        }}
      />

      {/* 3D Perspective Viewport */}
      <div 
        className="absolute inset-0 flex items-center justify-center"
        style={{
          perspective: '1200px',
          perspectiveOrigin: '65% 50%',
        }}
      >
        {/* Simple Horizontal Stack Cluster */}
        <div 
          className="absolute right-[4%] sm:right-[6%] lg:right-[8%] xl:right-[10%] top-[50%] -translate-y-1/2 w-[320px] sm:w-[350px] md:w-[380px] h-[210px] sm:h-[230px] max-lg:opacity-35 max-md:hidden transition-transform duration-100 ease-out"
          style={{
            transformStyle: 'preserve-3d',
            transform: `
              translate3d(0, -50%, 0)
              rotateY(calc(-14deg + (var(--mouse-x) * 8deg)))
              rotateX(calc(6deg + (var(--mouse-y) * 6deg)))
              rotateZ(calc(-1deg + (var(--mouse-x) * 2deg)))
            `,
          }}
        >
          {stackLayers.map((layer, idx) => (
            <div
              key={layer.id}
              className={`absolute inset-0 rounded-2xl p-5 flex flex-col justify-between backdrop-blur-xl border transition-all duration-300 animate-horizontal-stack-float ${
                idx === stackLayers.length - 1
                  ? 'bg-white border-black/35 shadow-[0_25px_50px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.95)]'
                  : 'bg-white/95 border-black/15 shadow-[0_15px_30px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(255,255,255,0.85)]'
              }`}
              style={{
                // @ts-expect-error CSS variables
                '--layer-index': idx,
                '--h-offset': '44px',
                animationDelay: layer.delay,
                zIndex: layer.zIndex,
                transformStyle: 'preserve-3d',
                transform: `translate3d(calc(${idx} * 44px), calc(${idx} * -4px), calc(${idx} * 16px))`,
              }}
            >
              {/* Header */}
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-black shadow-[0_0_6px_rgba(0,0,0,0.4)]" />
                <span className="font-mono text-[10px] tracking-wider text-zinc-900 font-semibold uppercase">
                  {layer.label}
                </span>
                <span className="ml-auto font-mono text-[9px] text-zinc-600 bg-black/5 px-1.5 py-0.5 rounded border border-black/10 font-medium">
                  INDEX #{layer.id}
                </span>
              </div>

              {/* Wireframe document lines */}
              <div className="flex flex-col gap-1.5 my-3">
                <div className="h-0.5 rounded w-[85%] bg-gradient-to-r from-black/30 to-black/5" />
                <div className="h-0.5 rounded w-[65%] bg-gradient-to-r from-black/20 to-black/5" />
                <div className="h-0.5 rounded w-[40%] bg-gradient-to-r from-black/15 to-black/5" />
              </div>

              {/* Footer */}
              <div className="flex justify-between items-center text-[10px] text-zinc-600 uppercase border-t border-black/10 pt-2 font-medium">
                <span>{layer.sub}</span>
                <span className="font-mono text-zinc-400">0x{layer.id}A9</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
