'use client';

import React from 'react';
import { ArrowRight, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeroProps {
  onOpenAuth: (mode: 'signin' | 'signup') => void;
}

export default function Hero({ onOpenAuth }: HeroProps) {
  return (
    <section className="relative z-10 pt-36 pb-20 px-6 sm:px-10 flex flex-col justify-center">
      <div className="max-w-6xl mx-auto w-full flex flex-col items-start text-left">
        {/* Simple Left-Aligned Heading */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-extrabold tracking-tight text-black max-w-2xl leading-[1.18] mb-4 font-display">
          Legal AI for <br />
          <span className="bg-gradient-to-r from-black via-black to-zinc-600 bg-clip-text text-transparent">
            Indian Jurisprudence
          </span>
        </h1>

        {/* Smaller, Refined Left-Aligned Caption */}
        <p className="text-sm sm:text-[15px] text-zinc-600 max-w-xl leading-relaxed mb-8 font-normal">
          Transform hundreds of pages of complex courtroom judgments into structured, 
          verifiable briefs in milliseconds. Query semantic case precedents across landmark 
          Supreme Court and High Court rulings with authoritative vector-backed citations.
        </p>

        {/* Left-Aligned CTA Buttons */}
        <div className="flex items-center justify-start gap-3.5 flex-wrap">
          <Button
            size="default"
            onClick={() => onOpenAuth('signup')}
            className="bg-black text-white hover:bg-zinc-800 font-semibold rounded-full px-6 py-5 text-sm cursor-pointer shadow-[0_3px_15px_rgba(0,0,0,0.18)] hover:shadow-[0_5px_24px_rgba(0,0,0,0.28)] hover:-translate-y-0.5 transition-all"
          >
            <span>Launch Research Console</span>
            <ArrowRight size={15} className="ml-1.5" />
          </Button>

          <Button
            variant="outline"
            size="default"
            onClick={() => onOpenAuth('signin')}
            className="border-black/20 bg-white/80 text-black hover:bg-zinc-100 hover:border-black/40 rounded-full px-6 py-5 text-sm cursor-pointer backdrop-blur-md shadow-sm"
          >
            <Lock size={14} className="mr-1.5 text-zinc-600" />
            <span>Counsel Sign In</span>
          </Button>
        </div>
      </div>
    </section>
  );
}
