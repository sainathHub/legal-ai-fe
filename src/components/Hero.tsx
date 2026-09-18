'use client';

import React from 'react';
import { ArrowRight, Lock, FileText, Search, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

interface HeroProps {
  onOpenAuth: (mode: 'signin' | 'signup') => void;
}

export default function Hero({ onOpenAuth }: HeroProps) {
  return (
    <section className="relative z-10 pt-32 pb-12 sm:pt-36 sm:pb-20 px-6 sm:px-10 flex flex-col justify-center">
      <div className="max-w-6xl mx-auto w-full flex flex-col items-start text-left">
        {/* Top Status Badge */}
        <div className="mb-5">
          <Badge 
            variant="outline" 
            className="px-3.5 py-1 rounded-full border-black/15 bg-black/[0.03] backdrop-blur-md text-zinc-700 tracking-wider text-[10.5px] font-mono gap-2 font-normal"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-black shadow-[0_0_6px_rgba(0,0,0,0.4)] animate-pulse" />
            <span>INDIAN JURISPRUDENCE & PRECEDENT RAG ENGINE</span>
          </Badge>
        </div>

        {/* Smaller, Refined Left-Aligned Heading */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-extrabold uppercase tracking-tight text-black max-w-2xl leading-[1.18] mb-4 font-display">
          PRECISION LEGAL AI FOR <br />
          <span className="bg-gradient-to-r from-black via-black to-zinc-600 bg-clip-text text-transparent">
            INDIAN JURISPRUDENCE.
          </span>
        </h1>

        {/* Smaller, Refined Left-Aligned Caption */}
        <p className="text-sm sm:text-[15px] text-zinc-600 max-w-xl leading-relaxed mb-8 font-normal">
          Transform hundreds of pages of complex courtroom judgments into structured, 
          verifiable briefs in milliseconds. Query semantic case precedents across landmark 
          Supreme Court and High Court rulings with authoritative vector-backed citations.
        </p>

        {/* Left-Aligned CTA Buttons */}
        <div className="flex items-center justify-start gap-3.5 flex-wrap mb-10">
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

        {/* Left-Aligned Trust & Architecture Row */}
        <div className="flex items-center justify-start gap-3 sm:gap-5 flex-wrap text-[11px] text-zinc-600 font-mono tracking-wider mb-12">
          <div className="inline-flex items-center gap-1.5 hover:text-black transition-colors">
            <FileText size={13} />
            <span>Automated Brief Summarizer</span>
          </div>
          <span className="text-zinc-300">/</span>
          <div className="inline-flex items-center gap-1.5 hover:text-black transition-colors">
            <Search size={13} />
            <span>Semantic Precedent RAG</span>
          </div>
          <span className="text-zinc-300">/</span>
          <div className="inline-flex items-center gap-1.5 hover:text-black transition-colors">
            <Database size={13} />
            <span>Weaviate Vectors</span>
          </div>
        </div>

        {/* Bottom Metrics Bar */}
        <Card className="w-full max-w-4xl p-6 bg-white/90 border-black/10 backdrop-blur-2xl grid grid-cols-2 md:grid-cols-4 gap-5 text-left rounded-2xl shadow-[0_15px_35px_rgba(0,0,0,0.05)]">
          <div className="flex flex-col gap-1">
            <div className="text-xl sm:text-2xl font-bold text-black font-mono">15,000+</div>
            <div className="text-[10.5px] text-zinc-500 tracking-wider uppercase font-medium">
              Landmark Precedents
            </div>
          </div>

          <div className="flex flex-col gap-1 md:border-l border-black/10 md:pl-5">
            <div className="text-xl sm:text-2xl font-bold text-black font-mono">&lt; 350ms</div>
            <div className="text-[10.5px] text-zinc-500 tracking-wider uppercase font-medium">
              Groq Llama-3 Speed
            </div>
          </div>

          <div className="flex flex-col gap-1 max-md:border-none border-l border-black/10 pl-0 md:pl-5">
            <div className="text-xl sm:text-2xl font-bold text-black font-mono">5-Point</div>
            <div className="text-[10.5px] text-zinc-500 tracking-wider uppercase font-medium">
              Structured Briefs
            </div>
          </div>

          <div className="flex flex-col gap-1 md:border-l border-black/10 md:pl-5">
            <div className="text-xl sm:text-2xl font-bold text-black font-mono">100%</div>
            <div className="text-[10.5px] text-zinc-500 tracking-wider uppercase font-medium">
              Verifiable Citations
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
