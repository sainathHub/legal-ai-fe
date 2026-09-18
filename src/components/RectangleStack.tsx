'use client';

import React from 'react';
import { ChevronRight } from 'lucide-react';

export default function RectangleStack() {
  return (
    <div className="relative w-full max-w-[340px] sm:max-w-[370px] h-[330px] sm:h-[350px] flex items-center justify-center group cursor-pointer select-none">
      {/* Background Rectangle 3 (Lowest layer) */}
      <div 
        className="absolute inset-0 translate-x-6 -translate-y-6 rounded-2xl border border-zinc-200/70 bg-zinc-100/60 shadow-sm transition-transform duration-300 ease-out group-hover:translate-x-8 group-hover:-translate-y-8"
        style={{ zIndex: 1 }}
      />

      {/* Background Rectangle 2 (Middle layer) */}
      <div 
        className="absolute inset-0 translate-x-3 -translate-y-3 rounded-2xl border border-zinc-200 bg-zinc-50/90 shadow-sm transition-transform duration-300 ease-out group-hover:translate-x-4 group-hover:-translate-y-4"
        style={{ zIndex: 2 }}
      />

      {/* Foreground Rectangle 1 (Top card) */}
      <div 
        className="relative w-full h-full rounded-2xl border border-zinc-300/80 bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.06)] flex flex-col justify-between transition-transform duration-300 ease-out group-hover:-translate-y-0.5"
        style={{ zIndex: 3 }}
      >
        {/* Top Header of front rectangle */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-black" />
              <span className="font-mono text-xs font-semibold tracking-wider text-black">
                CASE RECORD #01
              </span>
            </div>
            <span className="text-[11px] font-mono text-zinc-600 bg-zinc-100 px-2 py-0.5 rounded">
              VERIFIED
            </span>
          </div>

          <div className="h-4 w-3/4 bg-zinc-900 rounded-sm mb-2" />
          <div className="h-3 w-1/2 bg-zinc-200 rounded-sm mb-6" />

          {/* Minimal skeleton content lines */}
          <div className="space-y-2.5">
            <div className="h-2 w-full bg-zinc-100 rounded-full" />
            <div className="h-2 w-11/12 bg-zinc-100 rounded-full" />
            <div className="h-2 w-4/5 bg-zinc-100 rounded-full" />
            <div className="h-2 w-2/3 bg-zinc-100 rounded-full" />
          </div>
        </div>

        {/* Bottom meta */}
        <div className="pt-4 border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-600 font-mono">
          <span>SUPREME COURT PRECEDENT</span>
          <span className="flex items-center gap-1 text-black font-semibold">
            BRIEF <ChevronRight size={13} />
          </span>
        </div>
      </div>
    </div>
  );
}
