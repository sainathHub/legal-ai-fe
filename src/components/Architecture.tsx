'use client';

import React from 'react';
import { Layout, Zap, Database } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

export default function Architecture() {
  return (
    <section className="relative z-10 py-20 px-6" id="architecture">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 flex flex-col items-center">
          <Badge 
            variant="outline" 
            className="px-3.5 py-1 rounded-full border-white/20 bg-white/[0.04] text-zinc-300 tracking-wider text-[11px] font-mono gap-2 mb-4 font-normal"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_#ffffff]" />
            <span>FULL-STACK LEGAL INTELLIGENCE</span>
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold uppercase text-white tracking-tight mb-4 font-display">
            ENGINEERED FOR SUPREME COURT JURISPRUDENCE
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg">
            A tripartite architecture marrying real-time neural inference with high-dimensional 
            vector databases to guarantee zero hallucination in legal citations.
          </p>
        </div>

        {/* 3-Node Architecture Flow Diagram */}
        <Card className="p-8 sm:p-12 bg-zinc-950/70 border-white/12 backdrop-blur-2xl rounded-2xl flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Node 1: Client UI */}
          <div className="flex-1 w-full p-7 rounded-xl bg-zinc-900/60 border border-white/30 shadow-[0_10px_30px_rgba(0,0,0,0.8),0_0_20px_rgba(255,255,255,0.05)] flex flex-col gap-3">
            <div className="w-11 h-11 rounded-lg bg-white text-black flex items-center justify-center">
              <Layout size={22} />
            </div>
            <div className="font-mono text-[10px] text-zinc-400 tracking-wider bg-white/5 border border-white/10 px-2 py-0.5 rounded w-fit">
              CLIENT / UI
            </div>
            <h4 className="text-xl font-bold text-white font-display">legal-ai-fe</h4>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Minimalist high-contrast workstation, structured brief renderer, and citation graph explorer.
            </p>
            <div className="flex gap-2 text-xs text-zinc-400 font-mono border-t border-white/10 pt-3">
              <span>Next.js 15</span>
              <span>•</span>
              <span>Tailwind v4</span>
              <span>•</span>
              <span>ShadCN</span>
            </div>
          </div>

          {/* Connector 1 */}
          <div className="flex lg:flex-col items-center gap-2 text-zinc-500 w-24 max-lg:w-full justify-center">
            <div className="h-0.5 w-full lg:w-0.5 lg:h-12 bg-gradient-to-r lg:bg-gradient-to-b from-transparent via-white to-transparent animate-pulse-line" />
            <span className="font-mono text-[9px] text-zinc-500 whitespace-nowrap">REST / JSON</span>
          </div>

          {/* Node 2: Inference */}
          <div className="flex-1 w-full p-7 rounded-xl bg-zinc-900/40 border border-white/10 flex flex-col gap-3 hover:border-white/30 transition-colors">
            <div className="w-11 h-11 rounded-lg bg-white/10 text-white flex items-center justify-center border border-white/15">
              <Zap size={22} />
            </div>
            <div className="font-mono text-[10px] text-zinc-400 tracking-wider bg-white/5 border border-white/10 px-2 py-0.5 rounded w-fit">
              INFERENCE ENGINE
            </div>
            <h4 className="text-xl font-bold text-white font-display">Law-AI-Summarizer</h4>
            <p className="text-zinc-400 text-sm leading-relaxed">
              FastAPI microservice executing 5-point extraction (Ratio, Facts, Issues) via Groq Llama-3.
            </p>
            <div className="flex gap-2 text-xs text-zinc-400 font-mono border-t border-white/10 pt-3">
              <span>FastAPI</span>
              <span>•</span>
              <span>Groq Llama-3</span>
            </div>
          </div>

          {/* Connector 2 */}
          <div className="flex lg:flex-col items-center gap-2 text-zinc-500 w-24 max-lg:w-full justify-center">
            <div className="h-0.5 w-full lg:w-0.5 lg:h-12 bg-gradient-to-r lg:bg-gradient-to-b from-transparent via-white to-transparent animate-pulse-line" />
            <span className="font-mono text-[9px] text-zinc-500 whitespace-nowrap">VECTORS</span>
          </div>

          {/* Node 3: Vector DB */}
          <div className="flex-1 w-full p-7 rounded-xl bg-zinc-900/40 border border-white/10 flex flex-col gap-3 hover:border-white/30 transition-colors">
            <div className="w-11 h-11 rounded-lg bg-white/10 text-white flex items-center justify-center border border-white/15">
              <Database size={22} />
            </div>
            <div className="font-mono text-[10px] text-zinc-400 tracking-wider bg-white/5 border border-white/10 px-2 py-0.5 rounded w-fit">
              CASE PRECEDENT RAG
            </div>
            <h4 className="text-xl font-bold text-white font-display">legal-ai Weaviate</h4>
            <p className="text-zinc-400 text-sm leading-relaxed">
              High-dimensional vector repository indexing 15,000+ Indian High Court and Apex Court judgments.
            </p>
            <div className="flex gap-2 text-xs text-zinc-400 font-mono border-t border-white/10 pt-3">
              <span>Weaviate DB</span>
              <span>•</span>
              <span>Hybrid RAG</span>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
