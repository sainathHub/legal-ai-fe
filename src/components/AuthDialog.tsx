'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, User, CheckCircle2, ArrowRight, ShieldCheck, AlertCircle, Loader2 } from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/lib/context/AuthContext';
import { ApiError } from '@/lib/api/client';

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
  const router = useRouter();
  const { login, register, backendHealth } = useAuth();

  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [barCouncilId, setBarCouncilId] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setMode(initialMode);
    setErrorMsg(null);
    setSuccess(false);
  }, [initialMode, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    try {
      if (mode === 'signin') {
        await login({ email: email.trim(), password });
      } else {
        if (password.length < 8) {
          setErrorMsg('Password must be at least 8 characters long.');
          setLoading(false);
          return;
        }
        await register({
          email: email.trim(),
          password,
          full_name: fullName.trim(),
          bar_council_id: barCouncilId.trim() || null,
        });
      }
      setSuccess(true);
      setTimeout(() => {
        onOpenChange(false);
        router.push('/console');
      }, 900);
    } catch (err) {
      if (err instanceof ApiError) {
        setErrorMsg(err.message);
      } else if (err instanceof Error) {
        setErrorMsg(err.message);
      } else {
        setErrorMsg('An unexpected error occurred. Please check backend connection.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[460px] bg-white border-black/15 text-black p-7 rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.15)] backdrop-blur-2xl">
        <DialogHeader className="flex flex-col items-center text-center mb-3">
          <DialogTitle className="text-xl font-bold uppercase tracking-wide text-black font-display">
            {mode === 'signin' ? 'COUNSEL SIGN IN' : 'CREATE COUNSEL ACCOUNT'}
          </DialogTitle>
          <DialogDescription className="text-zinc-600 text-xs mt-1">
            Connected to Render FastAPI Backend • Supreme Court Jurisprudence Engine
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
            onClick={() => { setMode('signin'); setErrorMsg(null); }}
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
            onClick={() => { setMode('signup'); setErrorMsg(null); }}
          >
            Create Account
          </button>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2 animate-in fade-in slide-in-from-top-1">
            <AlertCircle size={15} className="shrink-0 mt-0.5" />
            <div className="leading-snug">{errorMsg}</div>
          </div>
        )}

        {success ? (
          <div className="flex flex-col items-center text-center gap-3 py-6">
            <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center animate-pulse">
              <CheckCircle2 size={28} />
            </div>
            <h4 className="text-lg font-bold text-black font-display">AUTHENTICATED</h4>
            <p className="text-xs text-zinc-600 leading-relaxed">
              JWT session established with PostgreSQL. Entering Research Console...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
            {mode === 'signup' && (
              <>
                <div className="flex flex-col gap-1">
                  <label className="font-mono text-[10px] text-zinc-600 tracking-wider">
                    COUNSEL FULL NAME
                  </label>
                  <div className="relative flex items-center">
                    <User size={15} className="absolute left-3 text-zinc-400 pointer-events-none" />
                    <Input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Adv. Siddhartha Reddy"
                      className="pl-9 bg-zinc-50 border-black/15 text-black placeholder:text-zinc-400 focus-visible:border-black focus-visible:ring-0 text-sm"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-mono text-[10px] text-zinc-600 tracking-wider">
                    BAR COUNCIL ENROLLMENT ID (OPTIONAL)
                  </label>
                  <div className="relative flex items-center">
                    <ShieldCheck size={15} className="absolute left-3 text-zinc-400 pointer-events-none" />
                    <Input
                      type="text"
                      value={barCouncilId}
                      onChange={(e) => setBarCouncilId(e.target.value)}
                      placeholder="e.g. D/1420/2021"
                      className="pl-9 bg-zinc-50 border-black/15 text-black placeholder:text-zinc-400 focus-visible:border-black focus-visible:ring-0 text-sm"
                    />
                  </div>
                </div>
              </>
            )}

            <div className="flex flex-col gap-1">
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
                  className="pl-9 bg-zinc-50 border-black/15 text-black placeholder:text-zinc-400 focus-visible:border-black focus-visible:ring-0 text-sm"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-mono text-[10px] text-zinc-600 tracking-wider">
                SECURE PASSWORD {mode === 'signup' && '(MIN 8 CHARACTERS)'}
              </label>
              <div className="relative flex items-center">
                <Lock size={15} className="absolute left-3 text-zinc-400 pointer-events-none" />
                <Input
                  type="password"
                  required
                  minLength={mode === 'signup' ? 8 : undefined}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="pl-9 bg-zinc-50 border-black/15 text-black placeholder:text-zinc-400 focus-visible:border-black focus-visible:ring-0 text-sm"
                />
              </div>
            </div>

            <Button 
              type="submit" 
              disabled={loading}
              className="w-full bg-black text-white hover:bg-zinc-800 font-semibold py-5 cursor-pointer mt-2 shadow-[0_2px_12px_rgba(0,0,0,0.15)] disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="mr-2 animate-spin" />
                  <span>Connecting to Render...</span>
                </>
              ) : (
                <>
                  <span>{mode === 'signin' ? 'Sign In to Workspace' : 'Register Counsel Account'}</span>
                  <ArrowRight size={16} className="ml-2" />
                </>
              )}
            </Button>

            <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 pt-2 border-t border-black/5">
              <span className="truncate max-w-[240px]">
                Host: {backendHealth.apiUrl.replace(/^https?:\/\//, '')}
              </span>
              <span className="flex items-center gap-1 text-emerald-600 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                {backendHealth.state === 'online' ? 'Live' : backendHealth.state}
              </span>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
