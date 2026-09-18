'use client';

import React from 'react';

export default function RectangleStack() {
  return (
    <div className="relative w-full max-w-[240px] sm:max-w-[260px] h-[220px] sm:h-[235px] flex items-center justify-center group cursor-pointer select-none">
      {/* Background Rectangle 3 (Lowest layer) -> RESEARCH */}
      <div 
        className="absolute inset-0 translate-x-5 -translate-y-5 rounded-xl border border-zinc-200/80 bg-zinc-100/75 shadow-sm transition-all duration-300 ease-out group-hover:translate-x-8 group-hover:-translate-y-8 group-hover:shadow-md"
        style={{ zIndex: 1 }}
      >
        {/* Callout Line & Label: Research */}
        <div className="absolute top-5 -right-1 translate-x-full flex items-center pointer-events-none">
          {/* Anchor Dot */}
          <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 group-hover:bg-black transition-colors" />
          {/* Connecting Line */}
          <span className="w-6 sm:w-10 h-[1px] bg-zinc-300 group-hover:bg-zinc-800 transition-colors" />
          {/* Feature Badge */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/95 border border-zinc-200/90 shadow-[0_2px_8px_rgba(0,0,0,0.04)] group-hover:border-zinc-400 group-hover:shadow-md transition-all">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
            <span className="font-mono text-[11px] font-semibold tracking-wider text-zinc-800 group-hover:text-black uppercase whitespace-nowrap">
              Research
            </span>
          </div>
        </div>
      </div>

      {/* Background Rectangle 2 (Middle layer) -> DRAFT */}
      <div 
        className="absolute inset-0 translate-x-2.5 -translate-y-2.5 rounded-xl border border-zinc-200 bg-zinc-50/90 shadow-sm transition-all duration-300 ease-out group-hover:translate-x-4 group-hover:-translate-y-4 group-hover:shadow-md"
        style={{ zIndex: 2 }}
      >
        {/* Callout Line & Label: Draft */}
        <div className="absolute top-1/2 -translate-y-1/2 -right-1 translate-x-full flex items-center pointer-events-none">
          {/* Anchor Dot */}
          <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 group-hover:bg-black transition-colors" />
          {/* Connecting Line */}
          <span className="w-8 sm:w-13 h-[1px] bg-zinc-300 group-hover:bg-zinc-800 transition-colors" />
          {/* Feature Badge */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/95 border border-zinc-200/90 shadow-[0_2px_8px_rgba(0,0,0,0.04)] group-hover:border-zinc-400 group-hover:shadow-md transition-all">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
            <span className="font-mono text-[11px] font-semibold tracking-wider text-zinc-800 group-hover:text-black uppercase whitespace-nowrap">
              Draft
            </span>
          </div>
        </div>
      </div>

      {/* Foreground Rectangle 1 (Top layer) -> HIGHLIGHT CLAUSES */}
      <div 
        className="relative w-full h-full rounded-xl border border-zinc-300 bg-white shadow-[0_6px_24px_rgba(0,0,0,0.06)] transition-all duration-300 ease-out group-hover:-translate-x-1 group-hover:-translate-y-1 group-hover:shadow-[0_12px_32px_rgba(0,0,0,0.09)]"
        style={{ zIndex: 3 }}
      >
        {/* Callout Line & Label: Highlight Clauses */}
        <div className="absolute bottom-5 -right-1 translate-x-full flex items-center pointer-events-none">
          {/* Anchor Dot */}
          <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 group-hover:bg-black transition-colors" />
          {/* Connecting Line */}
          <span className="w-10 sm:w-16 h-[1px] bg-zinc-300 group-hover:bg-zinc-800 transition-colors" />
          {/* Feature Badge */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/95 border border-zinc-200/90 shadow-[0_2px_8px_rgba(0,0,0,0.04)] group-hover:border-zinc-400 group-hover:shadow-md transition-all">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
            <span className="font-mono text-[11px] font-semibold tracking-wider text-zinc-800 group-hover:text-black uppercase whitespace-nowrap">
              Highlight Clauses
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
