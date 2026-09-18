'use client';

import React from 'react';
import { Scale, ArrowUpRight, ShieldCheck } from 'lucide-react';

const GithubIcon = ({ size = 16 }: { size?: number }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 bg-black py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[1.4fr_2fr] gap-12 mb-14">
          {/* Brand Column */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white text-black flex items-center justify-center">
                <Scale size={18} strokeWidth={2.2} />
              </div>
              <span className="text-lg font-bold tracking-widest font-display text-white">
                JURIS.AI
              </span>
            </div>
            <p className="text-sm text-zinc-400 leading-relaxed max-w-sm">
              Advanced neural intelligence for Indian jurisprudence. Bridging 100-page court 
              judgments with high-speed brief extraction and semantic vector retrieval.
            </p>
            <div className="pt-2">
              <a 
                href="https://github.com/sainathHub/legal-ai-fe" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.04] border border-white/10 text-zinc-300 hover:text-white hover:border-white/30 text-xs transition-all font-mono"
              >
                <GithubIcon size={15} />
                <span>sainathHub / legal-ai-fe</span>
                <ArrowUpRight size={13} />
              </a>
            </div>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="flex flex-col gap-2.5 text-sm">
              <span className="font-mono text-xs text-zinc-400 tracking-wider mb-1">PLATFORM</span>
              <a href="#overview" className="text-zinc-400 hover:text-white transition-colors">Overview</a>
              <a href="#demo" className="text-zinc-400 hover:text-white transition-colors">Document Summarizer</a>
              <a href="#demo" className="text-zinc-400 hover:text-white transition-colors">Precedent Vector RAG</a>
              <a href="#architecture" className="text-zinc-400 hover:text-white transition-colors">Ecosystem</a>
            </div>

            <div className="flex flex-col gap-2.5 text-sm">
              <span className="font-mono text-xs text-zinc-400 tracking-wider mb-1">ECOSYSTEM</span>
              <a 
                href="https://github.com/sainathHub/legal-ai-fe" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors"
              >
                <span>legal-ai-fe</span>
                <ArrowUpRight size={12} />
              </a>
              <a 
                href="https://github.com/sainathHub/Law-AI-Summarizer-Backend" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors"
              >
                <span>Summarizer Backend</span>
                <ArrowUpRight size={12} />
              </a>
              <a 
                href="https://github.com/sainathHub/legal-ai" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors"
              >
                <span>legal-ai Weaviate</span>
                <ArrowUpRight size={12} />
              </a>
            </div>

            <div className="flex flex-col gap-2.5 text-sm">
              <span className="font-mono text-xs text-zinc-400 tracking-wider mb-1">JURISPRUDENCE</span>
              <span className="text-zinc-500">Supreme Court of India</span>
              <span className="text-zinc-500">High Courts of Judicature</span>
              <span className="text-zinc-500">Indian Kanoon Corpus</span>
              <span className="text-zinc-500">Constitution Part III</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="font-mono text-zinc-500">
            © {new Date().getFullYear()} JURIS.AI • BUILT FOR LEGAL SCHOLARS & BENCH PRACTITIONERS
          </div>
          <div className="inline-flex items-center gap-2 text-zinc-400 font-mono bg-white/[0.03] border border-white/10 px-3 py-1 rounded-full text-[11px]">
            <ShieldCheck size={14} />
            <span>ZERO HALLUCINATION CITATION ENGINE</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
