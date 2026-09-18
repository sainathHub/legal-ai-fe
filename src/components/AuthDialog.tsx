'use client';

import React, { useState, useEffect } from 'react';
import { Lock, Mail, User, Info, CheckCircle2, ArrowRight } from 'lucide-react';
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
      <DialogContent className="sm:max-w-[460px] bg-white border-black/15 text-black p-7 rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.15)] backdrop-blur-2xl">
        <DialogHeader className="flex flex-col items-center text-center mb-3">
          <DialogTitle className="text-xl font-bold uppercase tracking-wide text-black font-display">
            {mode === 'signin' ? 'COUNSEL SIGN IN' : 'CREATE COUNSEL ACCOUNT'}
          </DialogTitle>
          <DialogDescription className="text-zinc-600 text-xs mt-1">
            Access Indian jurisprudence briefs, precedent vector search, and courtroom drafting tools.
          </DialogDescription>
        </DialogHeader>

        {/* Tab Switcher */}
        <div className="grid grid-cols-2 bg-black/[0.04] border border-black/10 p-1 rounded-full mb-4">
          <button
            type="button"
            className={`py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              mode === 'signin' 
                ? 'bg-black text-white shadow-sm' 
                : 'text-zinc-600 hover:text-black'
            }`}
            onClick={() => { setMode('signin'); setSubmitted(false); }}
          >
            Sign In
          </button>
          <button
            type="button"
            className={`py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              mode === 'signup' 
                ? 'bg-black text-white shadow-sm' 
                : 'text-zinc-600 hover:text-black'
            }`}
            onClick={() => { setMode('signup'); setSubmitted(false); }}
          >
            Create Account
          </button>
        </div>

        {submitted ? (
          <div className="flex flex-col items-center text-center gap-3 py-4">
            <CheckCircle2 size={36} className="text-black animate-bounce" />
            <h4 className="text-lg font-bold text-black font-display">DEMO ACCESS GRANTED</h4>
            <p className="text-xs text-zinc-600 leading-relaxed mb-2">
              Backend JWT authentication is queued for the upcoming milestone. 
              You now have full preview access to the Legal AI research workspace.
            </p>
            <Button
              className="w-full bg-black text-white hover:bg-zinc-800 font-semibold"
              onClick={() => onOpenChange(false)}
            >
              Enter Research Console
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {mode === 'signup' && (
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[10px] text-zinc-600 tracking-wider">
                  FULL NAME / LAW FIRM
                </label>
                <div className="relative flex items-center">
                  <User size={15} className="absolute left-3 text-zinc-400 pointer-events-none" />
                  <Input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Adv. Siddhartha Reddy"
                    className="pl-9 bg-zinc-50 border-black/15 text-black placeholder:text-zinc-400 focus-visible:border-black focus-visible:ring-0"
                  />
                </div>
              </div>
            )}

            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[10px] text-zinc-600 tracking-wider">
                OFFICIAL EMAIL ADDRESS
              </label>
              <div className="relative flex items-center">
                <Mail size={15} className="absolute left-3 text-zinc-400 pointer-events-none" />
                <Input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="counsel@chambers.in"
                  className="pl-9 bg-zinc-50 border-black/15 text-black placeholder:text-zinc-400 focus-visible:border-black focus-visible:ring-0"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[10px] text-zinc-600 tracking-wider">
                SECURE PASSWORD
              </label>
              <div className="relative flex items-center">
                <Lock size={15} className="absolute left-3 text-zinc-400 pointer-events-none" />
                <Input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="pl-9 bg-zinc-50 border-black/15 text-black placeholder:text-zinc-400 focus-visible:border-black focus-visible:ring-0"
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-black text-white hover:bg-zinc-800 font-semibold py-5 cursor-pointer mt-2 shadow-[0_2px_12px_rgba(0,0,0,0.15)]"
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
