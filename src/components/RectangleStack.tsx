'use client';

import React from 'react';

export default function RectangleStack() {
  return (
    <div className="relative w-full max-w-[240px] sm:max-w-[260px] h-[220px] sm:h-[235px] flex items-center justify-center group cursor-pointer select-none">
      {/* Background Rectangle 3 (Lowest layer) -> RESEARCH (Top position) */}
      <div 
        className="absolute inset-0 translate-x-5 -translate-y-5 rounded-xl border border-zinc-200/80 bg-zinc-100/75 shadow-sm transition-all duration-300 ease-out group-hover:translate-x-8 group-hover:-translate-y-8 group-hover:shadow-md"
        style={{ zIndex: 1 }}
      >
        {/* Distinct Position 1: Line going UP to 'Research' */}
        <div className="absolute -top-1 left-12 sm:left-14 -translate-y-full flex flex-col items-center pointer-events-none pb-1">
          <span className="text-xs sm:text-[13px] font-medium tracking-normal text-zinc-500 group-hover:text-black transition-colors whitespace-nowrap mb-1.5">
            Research
          </span>
          <span className="w-[1px] h-6 sm:h-8 bg-zinc-300 group-hover:bg-zinc-800 transition-colors" />
        </div>
      </div>

      {/* Background Rectangle 2 (Middle layer) -> DRAFT (Right position) */}
      <div 
        className="absolute inset-0 translate-x-2.5 -translate-y-2.5 rounded-xl border border-zinc-200 bg-zinc-50/90 shadow-sm transition-all duration-300 ease-out group-hover:translate-x-4 group-hover:-translate-y-4 group-hover:shadow-md"
        style={{ zIndex: 2 }}
      >
        {/* Distinct Position 2: Line going RIGHT to 'Draft' */}
        <div className="absolute top-1/2 -translate-y-1/2 right-0 translate-x-full flex items-center pointer-events-none pl-1">
          <span className="w-7 sm:w-11 h-[1px] bg-zinc-300 group-hover:bg-zinc-800 transition-colors" />
          <span className="pl-2 text-xs sm:text-[13px] font-medium tracking-normal text-zinc-500 group-hover:text-black transition-colors whitespace-nowrap">
            Draft
          </span>
        </div>
      </div>

      {/* Foreground Rectangle 1 (Top layer) -> CLAUSES (Bottom position) */}
      <div 
        className="relative w-full h-full rounded-xl border border-zinc-300 bg-white shadow-[0_6px_24px_rgba(0,0,0,0.06)] transition-all duration-300 ease-out group-hover:-translate-x-1 group-hover:-translate-y-1 group-hover:shadow-[0_12px_32px_rgba(0,0,0,0.09)]"
        style={{ zIndex: 3 }}
      >
        {/* Distinct Position 3: Line going DOWN to 'Clauses' */}
        <div className="absolute -bottom-1 left-10 sm:left-12 translate-y-full flex flex-col items-center pointer-events-none pt-1">
          <span className="w-[1px] h-6 sm:h-8 bg-zinc-300 group-hover:bg-zinc-800 transition-colors" />
          <span className="text-xs sm:text-[13px] font-medium tracking-normal text-zinc-500 group-hover:text-black transition-colors whitespace-nowrap mt-1.5">
            Clauses
          </span>
        </div>
      </div>
    </div>
  );
}
