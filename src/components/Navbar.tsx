'use client';

import React, { useState, useEffect } from 'react';
import { Scale, Menu, X, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavbarProps {
  onOpenAuth: (mode: 'signin' | 'signup') => void;
}

export default function Navbar({ onOpenAuth }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
          ? 'py-3 bg-black/80 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.8)]' 
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-3 text-white group">
          <div className="w-9 h-9 rounded-lg bg-white text-black flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.25)] group-hover:scale-105 transition-transform duration-200">
            <Scale size={20} strokeWidth={2.2} />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-extrabold tracking-widest leading-none font-display">
              JURIS.AI
            </span>
            <span className="font-mono text-[10px] tracking-widest text-zinc-400">
              LEGAL INTEL
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          <a 
            href="#overview" 
            className="text-sm font-medium text-zinc-400 hover:text-white transition-colors duration-200"
          >
            Overview
          </a>
          <a 
            href="#demo" 
            className="text-sm font-medium text-zinc-400 hover:text-white transition-colors duration-200"
          >
            Capabilities
          </a>
          <a 
            href="#demo" 
            className="text-sm font-medium text-zinc-400 hover:text-white transition-colors duration-200"
          >
            Interactive Demo
          </a>
          <a 
            href="#architecture" 
            className="text-sm font-medium text-zinc-400 hover:text-white transition-colors duration-200"
          >
            Architecture
          </a>
        </nav>

        {/* Action CTAs */}
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => onOpenAuth('signin')}
            className="hidden sm:inline-flex text-zinc-300 hover:text-white hover:bg-white/10 cursor-pointer"
          >
            Sign In
          </Button>
          <Button 
            size="sm"
            onClick={() => onOpenAuth('signup')}
            className="bg-white text-black hover:bg-zinc-200 font-semibold rounded-full px-5 cursor-pointer shadow-[0_2px_14px_rgba(255,255,255,0.25)] hover:shadow-[0_4px_24px_rgba(255,255,255,0.4)] transition-all"
          >
            <span>Get Started</span>
            <ArrowRight size={14} className="ml-1" />
          </Button>

          {/* Mobile Toggle */}
          <button
            type="button"
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-md border border-white/10 text-white hover:bg-white/10 cursor-pointer"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-zinc-950/95 border-b border-white/10 px-6 py-6 flex flex-col gap-4 backdrop-blur-2xl">
          <a 
            href="#overview" 
            className="text-zinc-300 hover:text-white py-2 border-b border-white/5"
            onClick={() => setMobileMenuOpen(false)}
          >
            Overview
          </a>
          <a 
            href="#demo" 
            className="text-zinc-300 hover:text-white py-2 border-b border-white/5"
            onClick={() => setMobileMenuOpen(false)}
          >
            Capabilities
          </a>
          <a 
            href="#demo" 
            className="text-zinc-300 hover:text-white py-2 border-b border-white/5"
            onClick={() => setMobileMenuOpen(false)}
          >
            Interactive Demo
          </a>
          <a 
            href="#architecture" 
            className="text-zinc-300 hover:text-white py-2 border-b border-white/5"
            onClick={() => setMobileMenuOpen(false)}
          >
            Architecture
          </a>

          <div className="flex flex-col gap-2 pt-2">
            <Button 
              variant="outline" 
              className="w-full border-white/20 text-white hover:bg-white/10"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAuth('signin');
              }}
            >
              Sign In
            </Button>
            <Button 
              className="w-full bg-white text-black hover:bg-zinc-200"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAuth('signup');
              }}
            >
              Get Started
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
