'use client';

import React from 'react';

export default function RectangleStack() {
  return (
    <div className="relative w-full max-w-[240px] sm:max-w-[270px] h-[224px] sm:h-[240px] flex items-center justify-center group cursor-pointer select-none">
      {/* Background Rectangle 3 (Lowest layer) */}
      <div 
        className="absolute inset-0 translate-x-5 -translate-y-5 rounded-xl border border-zinc-200/80 bg-zinc-100/75 shadow-sm transition-all duration-300 ease-out group-hover:translate-x-8 group-hover:-translate-y-8 group-hover:shadow-md"
        style={{ zIndex: 1 }}
      />

      {/* Background Rectangle 2 (Middle layer) */}
      <div 
        className="absolute inset-0 translate-x-2.5 -translate-y-2.5 rounded-xl border border-zinc-200 bg-zinc-50/90 shadow-sm transition-all duration-300 ease-out group-hover:translate-x-4 group-hover:-translate-y-4 group-hover:shadow-md"
        style={{ zIndex: 2 }}
      />

      {/* Foreground Rectangle 1 (Top layer, clean normal rectangle) */}
      <div 
        className="relative w-full h-full rounded-xl border border-zinc-300 bg-white shadow-[0_6px_24px_rgba(0,0,0,0.06)] transition-all duration-300 ease-out group-hover:-translate-x-1 group-hover:-translate-y-1 group-hover:shadow-[0_12px_32px_rgba(0,0,0,0.09)]"
        style={{ zIndex: 3 }}
      />
    </div>
  );
}
