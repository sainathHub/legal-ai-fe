'use client';

import React from 'react';

export default function RectangleStack() {
  return (
    <div className="relative w-full max-w-[340px] sm:max-w-[380px] h-[310px] sm:h-[340px] flex items-center justify-center group cursor-pointer select-none">
      {/* Tennr-Inspired Geometric Cascading Isometric Planes */}
      <svg
        viewBox="0 0 460 410"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
      >
        {/* Layer 0 (Deepest / Back sheet) */}
        <g className="transition-transform duration-500 ease-out group-hover:-translate-x-4 group-hover:-translate-y-3">
          <path
            d="M 40,100 L 210,25 L 210,215 L 40,290 Z"
            fill="#f4f4f5"
            fillOpacity="0.4"
            stroke="#000000"
            strokeOpacity="0.08"
            strokeWidth="1"
          />
        </g>

        {/* Layer 1 */}
        <g className="transition-transform duration-500 ease-out group-hover:-translate-x-3 group-hover:-translate-y-2">
          <path
            d="M 56,114 L 226,39 L 226,229 L 56,304 Z"
            fill="#f4f4f5"
            fillOpacity="0.5"
            stroke="#000000"
            strokeOpacity="0.10"
            strokeWidth="1"
          />
        </g>

        {/* Layer 2 */}
        <g className="transition-transform duration-500 ease-out group-hover:-translate-x-2 group-hover:-translate-y-1.5">
          <path
            d="M 72,128 L 242,53 L 242,243 L 72,318 Z"
            fill="#f4f4f5"
            fillOpacity="0.6"
            stroke="#000000"
            strokeOpacity="0.12"
            strokeWidth="1"
          />
        </g>

        {/* Layer 3 */}
        <g className="transition-transform duration-500 ease-out group-hover:-translate-x-1 group-hover:-translate-y-1">
          <path
            d="M 88,142 L 258,67 L 258,257 L 88,332 Z"
            fill="#fafafa"
            fillOpacity="0.75"
            stroke="#000000"
            strokeOpacity="0.15"
            strokeWidth="1"
          />
        </g>

        {/* Layer 4 (Center axis) */}
        <g className="transition-transform duration-500 ease-out">
          <path
            d="M 104,156 L 274,81 L 274,271 L 104,346 Z"
            fill="#fafafa"
            fillOpacity="0.85"
            stroke="#000000"
            strokeOpacity="0.18"
            strokeWidth="1"
          />
        </g>

        {/* Layer 5 */}
        <g className="transition-transform duration-500 ease-out group-hover:translate-x-2 group-hover:translate-y-1.5">
          <path
            d="M 120,170 L 290,95 L 290,285 L 120,360 Z"
            fill="#ffffff"
            fillOpacity="0.9"
            stroke="#000000"
            strokeOpacity="0.22"
            strokeWidth="1"
          />
        </g>

        {/* Layer 6 */}
        <g className="transition-transform duration-500 ease-out group-hover:translate-x-4 group-hover:translate-y-3">
          <path
            d="M 136,184 L 306,109 L 306,299 L 136,374 Z"
            fill="#ffffff"
            fillOpacity="0.95"
            stroke="#000000"
            strokeOpacity="0.28"
            strokeWidth="1.2"
          />
        </g>

        {/* Layer 7 (Front sheet / Crisp white focus card) */}
        <g className="transition-transform duration-500 ease-out group-hover:translate-x-6 group-hover:translate-y-4.5">
          <path
            d="M 152,198 L 322,123 L 322,313 L 152,388 Z"
            fill="#ffffff"
            stroke="#000000"
            strokeOpacity="0.45"
            strokeWidth="1.5"
            className="filter drop-shadow-[0_8px_20px_rgba(0,0,0,0.06)]"
          />
        </g>
      </svg>

      {/* Feature Callouts extending outward on hover */}

      {/* 1. Top Callout: Research */}
      <div className="absolute top-2 sm:top-3 left-[36%] flex flex-col items-center pointer-events-none">
        <span className="text-xs sm:text-[13px] font-medium tracking-normal text-black whitespace-nowrap mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-out">
          Research
        </span>
        <span className="w-[1px] bg-zinc-700 h-0 group-hover:h-6 sm:group-hover:h-8 transition-all duration-350 ease-out" />
      </div>

      {/* 2. Right Callout: Draft */}
      <div className="absolute top-[48%] -translate-y-1/2 right-1 sm:right-3 flex items-center pointer-events-none">
        <span className="h-[1px] bg-zinc-700 w-0 group-hover:w-7 sm:group-hover:w-11 transition-all duration-350 ease-out" />
        <span className="pl-2 text-xs sm:text-[13px] font-medium tracking-normal text-black whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-out">
          Draft
        </span>
      </div>

      {/* 3. Bottom Callout: Clauses */}
      <div className="absolute bottom-1 sm:bottom-2 left-[28%] flex flex-col items-center pointer-events-none">
        <span className="w-[1px] bg-zinc-700 h-0 group-hover:h-6 sm:group-hover:h-8 transition-all duration-350 ease-out" />
        <span className="text-xs sm:text-[13px] font-medium tracking-normal text-black whitespace-nowrap mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-out">
          Clauses
        </span>
      </div>
    </div>
  );
}
