'use client';

import React from 'react';

export default function RectangleStack() {
  return (
    <div className="relative w-full max-w-[240px] sm:max-w-[260px] h-[220px] sm:h-[235px] flex items-center justify-center group cursor-pointer select-none">
      {/* Layer 6 (Deepest, lowest opacity) */}
      <div 
        className="absolute inset-0 translate-x-[25px] -translate-y-[25px] rounded-xl border border-zinc-200/50 bg-zinc-100/40 opacity-30 shadow-sm transition-all duration-400 ease-out group-hover:translate-x-[50px] group-hover:-translate-y-[50px] group-hover:opacity-40"
        style={{ zIndex: 1 }}
      />

      {/* Layer 5 (Tennr cascade layer -> RESEARCH Callout) */}
      <div 
        className="absolute inset-0 translate-x-[20px] -translate-y-[20px] rounded-xl border border-zinc-200/60 bg-zinc-100/60 opacity-45 shadow-sm transition-all duration-400 ease-out group-hover:translate-x-[40px] group-hover:-translate-y-[40px] group-hover:opacity-60"
        style={{ zIndex: 2 }}
      >
        {/* Top Callout: Research */}
        <div className="absolute bottom-full left-12 sm:left-14 flex flex-col items-center pointer-events-none pb-0.5">
          <span className="text-xs sm:text-[13px] font-medium tracking-normal text-black whitespace-nowrap mb-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-out">
            Research
          </span>
          <span className="w-[1px] bg-zinc-700 h-0 group-hover:h-6 sm:group-hover:h-8 transition-all duration-350 ease-out" />
        </div>
      </div>

      {/* Layer 4 (Middle-back cascade layer) */}
      <div 
        className="absolute inset-0 translate-x-[15px] -translate-y-[15px] rounded-xl border border-zinc-200/75 bg-zinc-100/70 opacity-60 shadow-sm transition-all duration-400 ease-out group-hover:translate-x-[30px] group-hover:-translate-y-[30px] group-hover:opacity-75"
        style={{ zIndex: 3 }}
      />

      {/* Layer 3 (Middle cascade layer -> DRAFT Callout) */}
      <div 
        className="absolute inset-0 translate-x-[10px] -translate-y-[10px] rounded-xl border border-zinc-250 bg-zinc-50/80 opacity-75 shadow-sm transition-all duration-400 ease-out group-hover:translate-x-[20px] group-hover:-translate-y-[20px] group-hover:opacity-90"
        style={{ zIndex: 4 }}
      >
        {/* Right Callout: Draft */}
        <div className="absolute top-1/2 -translate-y-1/2 left-full flex items-center pointer-events-none pl-0.5">
          <span className="h-[1px] bg-zinc-700 w-0 group-hover:w-7 sm:group-hover:w-11 transition-all duration-350 ease-out" />
          <span className="pl-2 text-xs sm:text-[13px] font-medium tracking-normal text-black whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-out">
            Draft
          </span>
        </div>
      </div>

      {/* Layer 2 (Middle-front cascade layer) */}
      <div 
        className="absolute inset-0 translate-x-[5px] -translate-y-[5px] rounded-xl border border-zinc-300/80 bg-zinc-50/90 opacity-90 shadow-sm transition-all duration-400 ease-out group-hover:translate-x-[10px] group-hover:-translate-y-[10px] group-hover:opacity-100"
        style={{ zIndex: 5 }}
      />

      {/* Layer 1 (Front top card -> CLAUSES Callout) */}
      <div 
        className="relative w-full h-full rounded-xl border border-zinc-300 bg-white shadow-[0_6px_24px_rgba(0,0,0,0.06)] transition-all duration-400 ease-out group-hover:-translate-x-[6px] group-hover:-translate-y-[6px] group-hover:shadow-[0_16px_40px_rgba(0,0,0,0.11)]"
        style={{ zIndex: 6 }}
      >
        {/* Bottom Callout: Clauses */}
        <div className="absolute top-full left-10 sm:left-12 flex flex-col items-center pointer-events-none pt-0.5">
          <span className="w-[1px] bg-zinc-700 h-0 group-hover:h-6 sm:group-hover:h-8 transition-all duration-350 ease-out" />
          <span className="text-xs sm:text-[13px] font-medium tracking-normal text-black whitespace-nowrap mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-out">
            Clauses
          </span>
        </div>
      </div>
    </div>
  );
}
