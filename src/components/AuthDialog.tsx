'use client';

import React, { useState, useEffect } from 'react';
import { Scale, Lock, Mail, User, Info, CheckCircle2, ArrowRight } from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface AuthDialogProps {
  open: boolean;
  initialMode?: 'signin' | 'signup';
  onOpenChange: (open: boolean) => void;
}

export default function AuthDialog({
  open,
  initialMode = 'signin',
  onOpenChange,
}: AuthDialogProps) {
  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setMode(initialMode);
    setSubmitted(false);
  }, [initialMode, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[460px] bg-zinc-950/95 border-white/15 text-white p-7 rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.95),0_0_40px_rgba(255,255,255,0.08)] backdrop-blur-2xl">
        <DialogHeader className="flex flex-col items-center text-center mb-3">
          <div className="w-12 h-12 rounded-xl bg-white text-black flex items-center justify-center mb-3 shadow-[0_0_20px_rgba(255,255,255,0.25)]">
            <Scale size={24} />
          </div>
          <DialogTitle className="text-xl font-bold uppercase tracking-wide text-white font-display">
            {mode === 'signin' ? 'COUNSEL SIGN IN' : 'CREATE COUNSEL ACCOUNT'}
          </DialogTitle>
          <DialogDescription className="text-zinc-400 text-xs mt-1">
            Access Indian jurisprudence briefs, precedent vector search, and courtroom drafting tools.
          </DialogDescription>
        </DialogHeader>

        {/* Tab Switcher */}
        <div className="grid grid-cols-2 bg-white/[0.04] border border-white/10 p-1 rounded-full mb-4">
          <button
            type="button"
            className={`py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              mode === 'signin' 
                ? 'bg-white text-black shadow-sm' 
                : 'text-zinc-400 hover:text-white'
            }`}
            onClick={() => { setMode('signin'); setSubmitted(false); }}
          >
            Sign In
          </button>
          <button
            type="button"
            className={`py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              mode === 'signup' 
                ? 'bg-white text-black shadow-sm' 
                : 'text-zinc-400 hover:text-white'
            }`}
            onClick={() => { setMode('signup'); setSubmitted(false); }}
          >
            Create Account
          </button>
        </div>

        {submitted ? (
          <div className="flex flex-col items-center text-center gap-3 py-4">
            <CheckCircle2 size={36} className="text-white animate-bounce" />
            <h4 className="text-lg font-bold text-white font-display">DEMO ACCESS GRANTED</h4>
            <p className="text-xs text-zinc-400 leading-relaxed mb-2">
              Backend JWT authentication is queued for the upcoming milestone. 
              You now have full preview access to the Legal AI research workspace.
            </p>
            <Button
              className="w-full bg-white text-black hover:bg-zinc-200 font-semibold"
              onClick={() => onOpenChange(false)}
            >
              Enter Research Console
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {mode === 'signup' && (
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[10px] text-zinc-400 tracking-wider">
                  FULL NAME / LAW FIRM
                </label>
                <div className="relative flex items-center">
                  <User size={15} className="absolute left-3 text-zinc-500 pointer-events-none" />
                  <Input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Adv. Siddhartha Reddy"
                    className="pl-9 bg-black/60 border-white/15 text-white placeholder:text-zinc-600 focus-visible:border-white focus-visible:ring-0"
                  />
                </div>
              </div>
            )}

            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[10px] text-zinc-400 tracking-wider">
                OFFICIAL EMAIL ADDRESS
              </label>
              <div className="relative flex items-center">
                <Mail size={15} className="absolute left-3 text-zinc-500 pointer-events-none" />
                <Input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="counsel@chambers.in"
                  className="pl-9 bg-black/60 border-white/15 text-white placeholder:text-zinc-600 focus-visible:border-white focus-visible:ring-0"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[10px] text-zinc-400 tracking-wider">
                SECURE PASSWORD
              </label>
              <div className="relative flex items-center">
                <Lock size={15} className="absolute left-3 text-zinc-500 pointer-events-none" />
                <Input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="pl-9 bg-black/60 border-white/15 text-white placeholder:text-zinc-600 focus-visible:border-white focus-visible:ring-0"
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-white text-black hover:bg-zinc-200 font-semibold py-5 cursor-pointer mt-2"
            >
              <span>{mode === 'signin' ? 'Sign In to Workspace' : 'Initialize Account'}</span>
              <ArrowRight size={16} className="ml-2" />
            </Button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-zinc-500 font-mono text-center mt-1">
              <Info size={13} className="shrink-0" />
              <span>Full Supabase / JWT backend to connect in Phase 2.</span>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
