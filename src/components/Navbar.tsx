'use client';

import React, { useState, useEffect } from 'react';
import { Scale, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavbarProps {
  onOpenAuth: (mode: 'signin' | 'signup') => void;
}

export default function Navbar({ onOpenAuth }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'py-3.5 bg-black/80 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.8)]' 
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-3 text-white group">
          <div className="w-9 h-9 rounded-lg bg-white text-black flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.25)] group-hover:scale-105 transition-transform duration-200">
            <Scale size={20} strokeWidth={2.2} />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-extrabold tracking-widest leading-none font-display">
              JURIS.AI
            </span>
            <span className="font-mono text-[9px] tracking-widest text-zinc-400">
              LEGAL INTEL
            </span>
          </div>
        </a>

        {/* Action CTAs */}
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => onOpenAuth('signin')}
            className="text-zinc-300 hover:text-white hover:bg-white/10 cursor-pointer text-xs"
          >
            Sign In
          </Button>
          <Button 
            size="sm"
            onClick={() => onOpenAuth('signup')}
            className="bg-white text-black hover:bg-zinc-200 font-semibold rounded-full px-5 cursor-pointer shadow-[0_2px_14px_rgba(255,255,255,0.25)] hover:shadow-[0_4px_24px_rgba(255,255,255,0.4)] transition-all text-xs"
          >
            <span>Get Started</span>
            <ArrowRight size={13} className="ml-1" />
          </Button>
        </div>
      </div>
    </header>
  );
}
