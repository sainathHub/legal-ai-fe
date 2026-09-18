'use client';

import React from 'react';
import { ArrowRight, ChevronRight, FileText, Search, Database } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface HeroProps {
  onOpenAuth: (mode: 'signin' | 'signup') => void;
}

export default function Hero({ onOpenAuth }: HeroProps) {
  return (
    <section className="relative z-10 pt-36 pb-20 px-6 flex flex-col items-center justify-center min-h-[92vh]" id="overview">
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
        {/* Top Status Badge */}
        <div className="mb-7">
          <Badge 
            variant="outline" 
            className="px-4 py-1.5 rounded-full border-white/20 bg-white/[0.04] backdrop-blur-md text-zinc-300 tracking-wider text-[11px] font-mono gap-2.5 font-normal"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_#ffffff] animate-pulse" />
            <span>INDIAN JURISPRUDENCE & PRECEDENT RAG ENGINE</span>
          </Badge>
        </div>

        {/* Main Hero Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold uppercase tracking-tight text-white max-w-5xl leading-[1.08] mb-6 font-display">
          PRECISION LEGAL AI FOR <br />
          <span className="bg-gradient-to-b from-white via-white to-zinc-500 bg-clip-text text-transparent">
            INDIAN JURISPRUDENCE.
          </span>
        </h1>

        {/* Legal AI Caption */}
        <p className="text-base sm:text-lg md:text-xl text-zinc-300 max-w-3xl leading-relaxed mb-10 font-normal">
          Transform hundreds of pages of complex courtroom judgments into structured, 
          verifiable briefs in milliseconds. Query semantic case precedents across landmark 
          Supreme Court and High Court rulings with authoritative vector-backed citations.
        </p>

        {/* CTA Actions */}
        <div className="flex items-center justify-center gap-4 flex-wrap mb-10">
          <Button
            size="lg"
            onClick={() => onOpenAuth('signup')}
            className="bg-white text-black hover:bg-zinc-200 font-semibold rounded-full px-8 py-6 text-base cursor-pointer shadow-[0_2px_20px_rgba(255,255,255,0.25)] hover:shadow-[0_4px_30px_rgba(255,255,255,0.45)] hover:-translate-y-0.5 transition-all"
          >
            <span>Launch Research Console</span>
            <ArrowRight size={18} className="ml-2" />
          </Button>

          <a
            href="#demo"
            className={cn(
              buttonVariants({ variant: 'outline', size: 'lg' }),
              'border-white/20 bg-white/[0.04] text-white hover:bg-white/10 hover:border-white/40 rounded-full px-7 py-6 text-base cursor-pointer backdrop-blur-md'
            )}
          >
            <span>Explore Interactive Demo</span>
            <ChevronRight size={18} className="ml-1" />
          </a>
        </div>

        {/* Trust & Architecture Row */}
        <div className="flex items-center justify-center gap-4 sm:gap-6 flex-wrap text-xs text-zinc-400 font-mono tracking-wider mb-16">
          <div className="inline-flex items-center gap-2 hover:text-white transition-colors">
            <FileText size={15} />
            <span>Automated Brief Summarizer</span>
          </div>
          <span className="text-zinc-600">/</span>
          <div className="inline-flex items-center gap-2 hover:text-white transition-colors">
            <Search size={15} />
            <span>Semantic Case Precedent RAG</span>
          </div>
          <span className="text-zinc-600">/</span>
          <div className="inline-flex items-center gap-2 hover:text-white transition-colors">
            <Database size={15} />
            <span>Weaviate Vector Embeddings</span>
          </div>
        </div>

        {/* Bottom Metrics Bar */}
        <Card className="w-full max-w-5xl p-7 bg-zinc-950/70 border-white/12 backdrop-blur-2xl grid grid-cols-2 md:grid-cols-4 gap-6 text-center rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.8)]">
          <div className="flex flex-col items-center gap-1.5">
            <div className="text-2xl sm:text-3xl font-bold text-white font-mono">15,000+</div>
            <div className="text-[11px] text-zinc-400 tracking-wider uppercase font-medium">
              Landmark Indian Precedents
            </div>
          </div>

          <div className="flex flex-col items-center gap-1.5 border-l border-white/10 max-md:border-none">
            <div className="text-2xl sm:text-3xl font-bold text-white font-mono">&lt; 350ms</div>
            <div className="text-[11px] text-zinc-400 tracking-wider uppercase font-medium">
              Groq Llama-3 Summarization
            </div>
          </div>

          <div className="flex flex-col items-center gap-1.5 md:border-l border-white/10">
            <div className="text-2xl sm:text-3xl font-bold text-white font-mono">5-Point</div>
            <div className="text-[11px] text-zinc-400 tracking-wider uppercase font-medium">
              Structured Brief Synthesis
            </div>
          </div>

          <div className="flex flex-col items-center gap-1.5 border-l border-white/10 max-md:border-none">
            <div className="text-2xl sm:text-3xl font-bold text-white font-mono">100%</div>
            <div className="text-[11px] text-zinc-400 tracking-wider uppercase font-medium">
              Verifiable Bench Citations
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
