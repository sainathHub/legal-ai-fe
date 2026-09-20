'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/navigation';
import { ArrowRight, LogOut, Terminal, Activity, ShieldCheck, Check, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/context/AuthContext';
import { setApiBaseUrl, getApiBaseUrl } from '@/lib/api/client';

interface NavbarProps {
  onOpenAuth: (mode: 'signin' | 'signup') => void;
}

export default function Navbar({ onOpenAuth }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [showHealthFlyout, setShowHealthFlyout] = useState(false);
  const [customHost, setCustomHost] = useState('');
  const [hostSaved, setHostSaved] = useState(false);

  const { user, isAuthenticated, logout, backendHealth, checkBackendHealth } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSaveHost = () => {
    if (customHost.trim()) {
      setApiBaseUrl(customHost.trim());
    } else {
      setApiBaseUrl(null);
    }
    setHostSaved(true);
    checkBackendHealth();
    setTimeout(() => setHostSaved(false), 2000);
  };

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'py-3.5 bg-white/85 backdrop-blur-xl border-b border-black/10 shadow-[0_4px_30px_rgba(0,0,0,0.05)]' 
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Brand Name & Backend Status Badge */}
        <div className="flex items-center gap-4">
          <a href="/" className="flex items-center text-black group">
            <span className="text-lg font-bold tracking-widest text-black font-display">
              JURIS.AI
            </span>
          </a>

          {/* Live Render Backend Status Pill */}
          <div className="relative">
            <button
              onClick={() => {
                setCustomHost(getApiBaseUrl());
                setShowHealthFlyout(!showHealthFlyout);
              }}
              className="group flex items-center gap-2 px-2.5 py-1 rounded-full text-[11px] font-mono border transition-all cursor-pointer bg-zinc-50 border-black/10 hover:border-black/30 text-zinc-700"
              title="Click to view Render backend health"
            >
              <span className="relative flex h-2 w-2">
                {backendHealth.state === 'online' && (
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                )}
                <span 
                  className={`relative inline-flex rounded-full h-2 w-2 ${
                    backendHealth.state === 'online'
                      ? 'bg-emerald-500'
                      : backendHealth.state === 'degraded'
                      ? 'bg-amber-500'
                      : backendHealth.state === 'checking'
                      ? 'bg-blue-400 animate-pulse'
                      : 'bg-red-500'
                  }`}
                />
              </span>
              <span className="hidden sm:inline font-medium">
                {backendHealth.state === 'online'
                  ? `Render Live ${backendHealth.latencyMs ? `(${backendHealth.latencyMs}ms)` : ''}`
                  : backendHealth.state === 'degraded'
                  ? 'Render Degraded'
                  : backendHealth.state === 'checking'
                  ? 'Pinging Render...'
                  : 'Render Offline'}
              </span>
            </button>

            {/* Health Flyout Dropdown */}
            {showHealthFlyout && (
              <div className="absolute left-0 mt-2 w-80 p-4 bg-white/95 backdrop-blur-2xl border border-black/15 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] z-50 text-xs text-black animate-in fade-in zoom-in-95">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-black/10">
                  <span className="font-bold text-[11px] uppercase tracking-wider font-mono text-zinc-500">
                    RENDER BACKEND HEALTH
                  </span>
                  <button
                    onClick={() => checkBackendHealth()}
                    className="text-[10px] font-mono text-black hover:underline cursor-pointer flex items-center gap-1"
                  >
                    <Activity size={12} /> Ping
                  </button>
                </div>

                <div className="space-y-1.5 font-mono text-[11px] mb-3">
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Service:</span>
                    <span className="font-semibold text-black">{backendHealth.service || 'Legal AI Backend'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">PostgreSQL (Neon):</span>
                    <span className={backendHealth.postgres === 'connected' ? 'text-emerald-600 font-semibold' : 'text-zinc-600'}>
                      {backendHealth.postgres || 'checking'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Weaviate Cloud:</span>
                    <span className={backendHealth.weaviate === 'connected' ? 'text-emerald-600 font-semibold' : 'text-zinc-600'}>
                      {backendHealth.weaviate || 'checking'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Latency:</span>
                    <span>{backendHealth.latencyMs ? `${backendHealth.latencyMs} ms` : 'N/A'}</span>
                  </div>
                </div>

                {/* API Host Switcher */}
                <div className="pt-2 border-t border-black/10">
                  <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-1">
                    API Host Override
                  </label>
                  <div className="flex gap-1.5">
                    <input
                      type="text"
                      value={customHost}
                      onChange={(e) => setCustomHost(e.target.value)}
                      placeholder="https://legal-ai-backend-75al.onrender.com"
                      className="flex-1 px-2 py-1 text-[11px] font-mono bg-zinc-50 border border-black/15 rounded-lg focus:outline-none focus:border-black"
                    />
                    <Button
                      size="sm"
                      onClick={handleSaveHost}
                      className="px-2.5 h-7 text-[10px] bg-black text-white hover:bg-zinc-800 rounded-lg cursor-pointer font-mono"
                    >
                      {hostSaved ? <Check size={12} /> : 'Save'}
                    </Button>
                  </div>
                  <span className="block text-[9px] text-zinc-400 font-mono mt-1">
                    Leave blank to restore default Render deployment.
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action CTAs */}
        <div className="flex items-center gap-3">
          {isAuthenticated && user ? (
            <div className="flex items-center gap-2">
              <a
                href="/console"
                className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-black text-white hover:bg-zinc-800 shadow-sm cursor-pointer transition-all"
              >
                <Terminal size={13} />
                <span>Console</span>
              </a>

              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-zinc-100 rounded-full border border-black/10 text-xs font-mono text-black">
                <ShieldCheck size={13} className="text-zinc-500" />
                <span className="font-semibold">{user.full_name}</span>
                {user.bar_council_id && (
                  <span className="text-[10px] text-zinc-400">({user.bar_council_id})</span>
                )}
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={logout}
                className="text-zinc-500 hover:text-black hover:bg-black/5 cursor-pointer text-xs p-2 h-8 rounded-full"
                title="Sign Out"
              >
                <LogOut size={14} />
              </Button>
            </div>
          ) : (
            <>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => onOpenAuth('signin')}
                className="text-zinc-700 hover:text-black hover:bg-black/5 cursor-pointer text-xs font-medium"
              >
                Sign In
              </Button>
              <Button 
                size="sm"
                onClick={() => onOpenAuth('signup')}
                className="bg-black text-white hover:bg-zinc-800 font-semibold rounded-full px-5 cursor-pointer shadow-[0_2px_14px_rgba(0,0,0,0.15)] hover:shadow-[0_4px_24px_rgba(0,0,0,0.25)] transition-all text-xs"
              >
                <span>Get Started</span>
                <ArrowRight size={13} className="ml-1" />
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
