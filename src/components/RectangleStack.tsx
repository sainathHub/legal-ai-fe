'use client';

import React from 'react';

export default function RectangleStack() {
  return (
    <div className="relative w-full max-w-[240px] sm:max-w-[260px] h-[220px] sm:h-[235px] flex items-center justify-center group cursor-pointer select-none">
      {/* Background Rectangle 3 (Lowest layer) -> RESEARCH (Top position) */}
      <div 
        className="absolute inset-0 translate-x-5 -translate-y-5 rounded-xl border border-zinc-200/80 bg-zinc-100/75 shadow-sm transition-all duration-400 ease-out group-hover:translate-x-12 group-hover:-translate-y-12 group-hover:shadow-lg"
        style={{ zIndex: 1 }}
      >
        {/* Top Callout: Text reveals from the start and extends upward with the growing line */}
        <div className="absolute bottom-full left-12 sm:left-14 flex flex-col items-center pointer-events-none pb-0.5">
          <span className="text-xs sm:text-[13px] font-medium tracking-normal text-black whitespace-nowrap mb-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-out">
            Research
          </span>
          <span className="w-[1px] bg-zinc-700 h-0 group-hover:h-6 sm:group-hover:h-8 transition-all duration-350 ease-out" />
        </div>
      </div>

      {/* Background Rectangle 2 (Middle layer) -> DRAFT (Right position) */}
      <div 
        className="absolute inset-0 translate-x-2.5 -translate-y-2.5 rounded-xl border border-zinc-200 bg-zinc-50/90 shadow-sm transition-all duration-400 ease-out group-hover:translate-x-6 group-hover:-translate-y-6 group-hover:shadow-md"
        style={{ zIndex: 2 }}
      >
        {/* Right Callout: Text reveals from the start and extends rightward with the growing line */}
        <div className="absolute top-1/2 -translate-y-1/2 left-full flex items-center pointer-events-none pl-0.5">
          <span className="h-[1px] bg-zinc-700 w-0 group-hover:w-7 sm:group-hover:w-11 transition-all duration-350 ease-out" />
          <span className="pl-2 text-xs sm:text-[13px] font-medium tracking-normal text-black whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-out">
            Draft
          </span>
        </div>
      </div>

      {/* Foreground Rectangle 1 (Top layer) -> CLAUSES (Bottom position) */}
      <div 
        className="relative w-full h-full rounded-xl border border-zinc-300 bg-white shadow-[0_6px_24px_rgba(0,0,0,0.06)] transition-all duration-400 ease-out group-hover:-translate-x-2.5 group-hover:-translate-y-2.5 group-hover:shadow-[0_16px_40px_rgba(0,0,0,0.11)]"
        style={{ zIndex: 3 }}
      >
        {/* Bottom Callout: Text reveals from the start and extends downward with the growing line */}
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
