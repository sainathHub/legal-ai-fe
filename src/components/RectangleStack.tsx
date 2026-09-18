'use client';

import React from 'react';

export default function RectangleStack() {
  return (
    <div className="relative w-full max-w-[300px] sm:max-w-[340px] h-[280px] sm:h-[300px] flex items-center justify-center group cursor-pointer select-none">
      {/* Background Rectangle 3 (Lowest layer) */}
      <div 
        className="absolute inset-0 translate-x-6 -translate-y-6 rounded-2xl border border-zinc-200/80 bg-zinc-100/75 shadow-sm transition-all duration-300 ease-out group-hover:translate-x-10 group-hover:-translate-y-10 group-hover:shadow-md"
        style={{ zIndex: 1 }}
      />

      {/* Background Rectangle 2 (Middle layer) */}
      <div 
        className="absolute inset-0 translate-x-3 -translate-y-3 rounded-2xl border border-zinc-200 bg-zinc-50/90 shadow-sm transition-all duration-300 ease-out group-hover:translate-x-5 group-hover:-translate-y-5 group-hover:shadow-md"
        style={{ zIndex: 2 }}
      />

      {/* Foreground Rectangle 1 (Top layer, clean normal rectangle) */}
      <div 
        className="relative w-full h-full rounded-2xl border border-zinc-300 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-300 ease-out group-hover:-translate-x-1.5 group-hover:-translate-y-1.5 group-hover:shadow-[0_16px_40px_rgba(0,0,0,0.09)]"
        style={{ zIndex: 3 }}
      />
    </div>
  );
}
