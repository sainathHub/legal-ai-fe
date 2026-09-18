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

  const stackLayers: StackLayer[] = [
    { id: 1, zIndex: 1, delay: '0s', label: 'INDIAN PRECEDENTS DB', sub: 'SEC. 14 IBC & ART. 21' },
    { id: 2, zIndex: 2, delay: '0.6s', label: 'LANDMARK JURISPRUDENCE', sub: '1950 - 2026 BENCH ORDERS' },
    { id: 3, zIndex: 3, delay: '1.2s', label: 'RATIO DECIDENDI VECTORS', sub: 'WEAVIATE EMBEDDINGS' },
    { id: 4, zIndex: 4, delay: '1.8s', label: 'GROQ LLM SUMMARIZER', sub: 'LEGAL FACTS & HOLDINGS' },
    { id: 5, zIndex: 5, delay: '2.4s', label: 'JURISPRUDENCE RAG MATRIX', sub: 'HIGH COURT & APEX BENCH' },
    { id: 6, zIndex: 6, delay: '3.0s', label: 'ACTIVE BRIEF DOSSIER', sub: 'CITATION GRAPH SYNTHESIS' },
  ];

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-black"
      style={{
        // @ts-expect-error CSS variable
        '--mouse-x': '0',
        '--mouse-y': '0',
      }}
      aria-hidden="true"
    >
      {/* Ambient monochrome radial glow orbs */}
      <div 
        className="absolute w-[700px] h-[700px] top-[40%] left-[55%] -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none opacity-15 filter blur-[140px]"
        style={{
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0.05) 50%, transparent 70%)',
        }}
      />
      <div 
        className="absolute w-[500px] h-[500px] -top-24 -right-12 rounded-full pointer-events-none opacity-10 filter blur-[120px]"
        style={{
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%)',
        }}
      />

      {/* Subtle Architectural Grid Lines */}
      <div 
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
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
          perspectiveOrigin: '65% 45%',
        }}
      >
        {/* The Central Isometric Stack */}
        <div 
          className="absolute right-[8%] top-[48%] w-[380px] h-[250px] max-lg:right-1/2 max-lg:top-[65%] max-lg:translate-x-1/2 max-lg:scale-75 max-lg:opacity-40 transition-transform duration-100 ease-out"
          style={{
            transformStyle: 'preserve-3d',
            transform: `
              translate3d(0, -50%, 0)
              rotateX(calc(58deg + (var(--mouse-y) * 8deg)))
              rotateY(calc(-4deg + (var(--mouse-x) * 8deg)))
              rotateZ(calc(-36deg + (var(--mouse-x) * 5deg)))
            `,
          }}
        >
          {stackLayers.map((layer, idx) => (
            <div
              key={layer.id}
              className={`absolute inset-0 rounded-2xl p-5 flex flex-col justify-between backdrop-blur-xl border transition-all duration-300 animate-stack-float ${
                idx === 5 
                  ? 'bg-zinc-900/90 border-white/40 shadow-[0_30px_60px_rgba(0,0,0,0.95),inset_0_1px_0_rgba(255,255,255,0.4),0_0_40px_rgba(255,255,255,0.08)]' 
                  : 'bg-zinc-950/80 border-white/15 shadow-[0_20px_40px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.12)]'
              }`}
              style={{
                // @ts-expect-error CSS variable
                '--layer-index': idx,
                animationDelay: layer.delay,
                zIndex: layer.zIndex,
                transformStyle: 'preserve-3d',
                transform: `translate3d(calc(${idx} * -18px), calc(${idx} * -18px), calc(${idx} * 38px))`,
              }}
            >
              {/* Header */}
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_#ffffff]" />
                <span className="font-mono text-[10px] tracking-wider text-zinc-300 font-semibold uppercase">
                  {layer.label}
                </span>
                <span className="ml-auto font-mono text-[9px] text-zinc-500 bg-white/5 px-1.5 py-0.5 rounded border border-white/10">
                  INDEX #{layer.id}
                </span>
              </div>

              {/* Wireframe document lines */}
              <div className="flex flex-col gap-1.5 my-3">
                <div className="h-0.5 rounded w-[85%] bg-gradient-to-r from-white/30 to-white/5" />
                <div className="h-0.5 rounded w-[65%] bg-gradient-to-r from-white/20 to-white/5" />
                <div className="h-0.5 rounded w-[40%] bg-gradient-to-r from-white/15 to-white/5" />
              </div>

              {/* Footer */}
              <div className="flex justify-between items-center text-[10px] text-zinc-400 uppercase border-t border-white/10 pt-2">
                <span>{layer.sub}</span>
                <span className="font-mono text-zinc-600">0x{layer.id}A9</span>
              </div>
            </div>
          ))}
        </div>

        {/* Ambient floating perimeter wireframe rectangles */}
        <div 
          className="absolute w-40 h-24 top-[15%] left-[8%] border border-white/10 bg-white/[0.015] backdrop-blur-sm rounded-lg animate-ambient-drift max-md:hidden"
          style={{ animationDuration: '24s', transform: 'rotate(14deg)' }}
        />
        <div 
          className="absolute w-56 h-32 bottom-[12%] left-[18%] border border-white/10 bg-white/[0.015] backdrop-blur-sm rounded-lg animate-ambient-drift max-md:hidden"
          style={{ animationDuration: '28s', animationDelay: '-5s', transform: 'rotate(-12deg)' }}
        />
        <div 
          className="absolute w-36 h-20 top-[22%] right-[35%] border border-white/10 bg-white/[0.015] backdrop-blur-sm rounded-lg animate-ambient-drift max-md:hidden"
          style={{ animationDuration: '20s', animationDelay: '-10s', transform: 'rotate(-22deg)' }}
        />
        <div 
          className="absolute w-44 h-28 bottom-[25%] right-[5%] border border-white/10 bg-white/[0.015] backdrop-blur-sm rounded-lg animate-ambient-drift max-md:hidden"
          style={{ animationDuration: '32s', animationDelay: '-15s', transform: 'rotate(8deg)' }}
        />
      </div>
    </div>
  );
}
