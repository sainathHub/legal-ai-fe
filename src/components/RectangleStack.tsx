'use client';

import React from 'react';

export default function RectangleStack() {
  return (
    <div className="relative w-full max-w-[240px] sm:max-w-[270px] h-[240px] sm:h-[260px] flex items-center justify-center group cursor-pointer select-none py-6">
      {/* 
        Tennr-Style Isometric Cascading Stack
        Uses Tennr's iconic isometric plane slope (-skew-y-[20deg]) with 8 stepped layers 
        and graduated translucent opacities (20% -> 100%).
      */}
      <div className="relative w-[190px] sm:w-[210px] h-[190px] sm:h-[210px] -skew-y-[20deg] transition-transform duration-500 ease-out">
        
        {/* Layer 0 (Deepest) */}
        <div 
          className="absolute inset-0 translate-x-[36px] -translate-y-[36px] rounded-xl border border-zinc-200/40 bg-zinc-100/30 opacity-20 shadow-sm transition-all duration-500 ease-out group-hover:translate-x-[72px] group-hover:-translate-y-[72px] group-hover:opacity-30"
          style={{ zIndex: 1 }}
        />

        {/* Layer 1 */}
        <div 
          className="absolute inset-0 translate-x-[32px] -translate-y-[32px] rounded-xl border border-zinc-200/50 bg-zinc-100/40 opacity-28 shadow-sm transition-all duration-500 ease-out group-hover:translate-x-[63px] group-hover:-translate-y-[63px] group-hover:opacity-40"
          style={{ zIndex: 2 }}
        />

        {/* Layer 2 */}
        <div 
          className="absolute inset-0 translate-x-[27px] -translate-y-[27px] rounded-xl border border-zinc-200/60 bg-zinc-100/50 opacity-38 shadow-sm transition-all duration-500 ease-out group-hover:translate-x-[54px] group-hover:-translate-y-[54px] group-hover:opacity-50"
          style={{ zIndex: 3 }}
        />

        {/* Layer 3 (RESEARCH Callout) */}
        <div 
          className="absolute inset-0 translate-x-[22px] -translate-y-[22px] rounded-xl border border-zinc-200/75 bg-zinc-100/65 opacity-50 shadow-sm transition-all duration-500 ease-out group-hover:translate-x-[45px] group-hover:-translate-y-[45px] group-hover:opacity-65"
          style={{ zIndex: 4 }}
        >
          {/* Top Callout: Research (un-skewed text for clean horizontal legibility) */}
          <div className="absolute bottom-full left-8 sm:left-10 flex flex-col items-center pointer-events-none pb-1">
            <div className="skew-y-[20deg]">
              <span className="text-xs sm:text-[13px] font-medium tracking-normal text-black whitespace-nowrap mb-1.5 block opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-out">
                Research
              </span>
            </div>
            <span className="w-[1px] bg-zinc-700 h-0 group-hover:h-6 sm:group-hover:h-8 transition-all duration-350 ease-out" />
          </div>
        </div>

        {/* Layer 4 */}
        <div 
          className="absolute inset-0 translate-x-[18px] -translate-y-[18px] rounded-xl border border-zinc-250/80 bg-zinc-100/75 opacity-62 shadow-sm transition-all duration-500 ease-out group-hover:translate-x-[36px] group-hover:-translate-y-[36px] group-hover:opacity-75"
          style={{ zIndex: 5 }}
        />

        {/* Layer 5 (DRAFT Callout) */}
        <div 
          className="absolute inset-0 translate-x-[13px] -translate-y-[13px] rounded-xl border border-zinc-300/80 bg-zinc-50/85 opacity-75 shadow-sm transition-all duration-500 ease-out group-hover:translate-x-[27px] group-hover:-translate-y-[27px] group-hover:opacity-88"
          style={{ zIndex: 6 }}
        >
          {/* Right Callout: Draft (un-skewed text for clean horizontal legibility) */}
          <div className="absolute top-1/2 -translate-y-1/2 left-full flex items-center pointer-events-none pl-1">
            <span className="h-[1px] bg-zinc-700 w-0 group-hover:w-7 sm:group-hover:w-11 transition-all duration-350 ease-out" />
            <div className="skew-y-[20deg] pl-2">
              <span className="text-xs sm:text-[13px] font-medium tracking-normal text-black whitespace-nowrap block opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-out">
                Draft
              </span>
            </div>
          </div>
        </div>

        {/* Layer 6 */}
        <div 
          className="absolute inset-0 translate-x-[8px] -translate-y-[8px] rounded-xl border border-zinc-300/90 bg-zinc-50/95 opacity-88 shadow-sm transition-all duration-500 ease-out group-hover:translate-x-[16px] group-hover:-translate-y-[16px] group-hover:opacity-98"
          style={{ zIndex: 7 }}
        />

        {/* Layer 7 (Front top plane -> CLAUSES Callout) */}
        <div 
          className="relative w-full h-full rounded-xl border border-zinc-350 bg-white opacity-100 shadow-[0_10px_35px_rgba(0,0,0,0.08)] transition-all duration-500 ease-out group-hover:-translate-x-[6px] group-hover:-translate-y-[6px] group-hover:shadow-[0_18px_45px_rgba(0,0,0,0.13)]"
          style={{ zIndex: 8 }}
        >
          {/* Bottom Callout: Clauses (un-skewed text for clean horizontal legibility) */}
          <div className="absolute top-full left-8 sm:left-10 flex flex-col items-center pointer-events-none pt-1">
            <span className="w-[1px] bg-zinc-700 h-0 group-hover:h-6 sm:group-hover:h-8 transition-all duration-350 ease-out" />
            <div className="skew-y-[20deg] mt-1.5">
              <span className="text-xs sm:text-[13px] font-medium tracking-normal text-black whitespace-nowrap block opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-out">
                Clauses
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
