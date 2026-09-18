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
        {/* Distinct Position 1: Line draws UP from card edge, then 'Research' reveals */}
        <div className="absolute top-0 left-12 sm:left-14 -translate-y-full flex flex-col items-center pointer-events-none">
          {/* Text: reveals after line finishes extending */}
          <span className="text-xs sm:text-[13px] font-medium tracking-normal text-black whitespace-nowrap mb-1.5 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-150 group-hover:duration-200 group-hover:delay-200 ease-out">
            Research
          </span>
          {/* Line: draws from card top edge upward */}
          <span className="w-[1px] h-6 sm:h-8 bg-zinc-700 origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-250 ease-out" />
        </div>
      </div>

      {/* Background Rectangle 2 (Middle layer) -> DRAFT (Right position) */}
      <div 
        className="absolute inset-0 translate-x-2.5 -translate-y-2.5 rounded-xl border border-zinc-200 bg-zinc-50/90 shadow-sm transition-all duration-400 ease-out group-hover:translate-x-6 group-hover:-translate-y-6 group-hover:shadow-md"
        style={{ zIndex: 2 }}
      >
        {/* Distinct Position 2: Line draws RIGHT from card edge, then 'Draft' reveals */}
        <div className="absolute top-1/2 -translate-y-1/2 right-0 translate-x-full flex items-center pointer-events-none">
          {/* Line: draws from card right edge outward */}
          <span className="w-7 sm:w-11 h-[1px] bg-zinc-700 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-250 ease-out" />
          {/* Text: reveals after line finishes extending */}
          <span className="pl-2 text-xs sm:text-[13px] font-medium tracking-normal text-black whitespace-nowrap opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-150 group-hover:duration-200 group-hover:delay-200 ease-out">
            Draft
          </span>
        </div>
      </div>

      {/* Foreground Rectangle 1 (Top layer) -> CLAUSES (Bottom position) */}
      <div 
        className="relative w-full h-full rounded-xl border border-zinc-300 bg-white shadow-[0_6px_24px_rgba(0,0,0,0.06)] transition-all duration-400 ease-out group-hover:-translate-x-2.5 group-hover:-translate-y-2.5 group-hover:shadow-[0_16px_40px_rgba(0,0,0,0.11)]"
        style={{ zIndex: 3 }}
      >
        {/* Distinct Position 3: Line draws DOWN from card edge, then 'Clauses' reveals */}
        <div className="absolute bottom-0 left-10 sm:left-12 translate-y-full flex flex-col items-center pointer-events-none">
          {/* Line: draws from card bottom edge downward */}
          <span className="w-[1px] h-6 sm:h-8 bg-zinc-700 origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-250 ease-out" />
          {/* Text: reveals after line finishes extending */}
          <span className="text-xs sm:text-[13px] font-medium tracking-normal text-black whitespace-nowrap mt-1.5 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-150 group-hover:duration-200 group-hover:delay-200 ease-out">
            Clauses
          </span>
        </div>
      </div>
    </div>
  );
}
