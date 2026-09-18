'use client';

import React, { useState } from 'react';
import StackedBackground from '@/components/StackedBackground';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import AuthDialog from '@/components/AuthDialog';

export default function Home() {
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');

  const handleOpenAuth = (mode: 'signin' | 'signup' = 'signin') => {
    setAuthMode(mode);
    setAuthOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-white selection:text-black overflow-hidden flex flex-col justify-between">
      {/* 3D Stacked Rectangles Background Animation */}
      <StackedBackground />

      {/* Minimal Navbar */}
      <Navbar onOpenAuth={handleOpenAuth} />

      {/* The Single Dedicated Landing Section */}
      <main className="relative z-10 flex-1 flex flex-col justify-center">
        <Hero onOpenAuth={handleOpenAuth} />
      </main>

      {/* Subtle Copyright Micro-Bar */}
      <footer className="relative z-10 py-6 px-6 text-center border-t border-white/5 text-[11px] font-mono text-zinc-500 flex flex-col sm:flex-row items-center justify-between max-w-6xl mx-auto w-full gap-2">
        <span>© {new Date().getFullYear()} JURIS.AI • INDIAN JURISPRUDENCE & PRECEDENT RAG</span>
        <span className="text-zinc-600">OLED MONOCHROME EDITION</span>
      </footer>

      {/* Auth Dialog (ShadCN Modal) */}
      <AuthDialog
        open={authOpen}
        initialMode={authMode}
        onOpenChange={setAuthOpen}
      />
    </div>
  );
}
