import React, { useState, useEffect } from 'react';
import { X, Scale, ArrowRight, Lock, Mail, User, Info, CheckCircle2 } from 'lucide-react';
import './AuthModal.css';

export default function AuthModal({ isOpen, initialMode = 'signin', onClose }) {
  const [mode, setMode] = useState(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setMode(initialMode);
    setSubmitted(false);
  }, [initialMode, isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="auth-overlay" onClick={onClose}>
      <div 
        className="auth-modal-card glass-card"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button 
          type="button" 
          className="auth-close-btn" 
          onClick={onClose}
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        {/* Modal Brand Header */}
        <div className="auth-modal-header">
          <div className="auth-brand-mark">
            <Scale size={24} />
          </div>
          <h3 className="auth-title font-display">
            {mode === 'signin' ? 'COUNSEL SIGN IN' : 'CREATE COUNSEL ACCOUNT'}
          </h3>
          <p className="auth-subtitle">
            Access Indian jurisprudence briefs, precedent vector search, and courtroom drafting tools.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="auth-tabs">
          <button
            type="button"
            className={`auth-tab-btn ${mode === 'signin' ? 'auth-tab-active' : ''}`}
            onClick={() => { setMode('signin'); setSubmitted(false); }}
          >
            Sign In
          </button>
          <button
            type="button"
            className={`auth-tab-btn ${mode === 'signup' ? 'auth-tab-active' : ''}`}
            onClick={() => { setMode('signup'); setSubmitted(false); }}
          >
            Create Account
          </button>
        </div>

        {submitted ? (
          <div className="auth-success-box">
            <CheckCircle2 size={36} className="success-icon" />
            <h4 className="success-title font-display">DEMO ACCESS GRANTED</h4>
            <p className="success-text">
              Backend JWT authentication is queued for the upcoming milestone. 
              You now have full preview access to the Legal AI research workspace.
            </p>
            <button 
              type="button" 
              className="btn btn-primary"
              onClick={onClose}
            >
              Enter Research Console
            </button>
          </div>
        ) : (
          <form className="auth-form" onSubmit={handleSubmit}>
            {mode === 'signup' && (
              <div className="form-group">
                <label className="form-label font-mono">FULL NAME / LAW FIRM</label>
                <div className="form-input-wrapper">
                  <User size={16} className="input-icon" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Adv. Siddhartha Reddy"
                    className="form-input"
                  />
                </div>
              </div>
            )}

            <div className="form-group">
              <label className="form-label font-mono">OFFICIAL EMAIL ADDRESS</label>
              <div className="form-input-wrapper">
                <Mail size={16} className="input-icon" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="counsel@chambers.in"
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label font-mono">SECURE PASSWORD</label>
              <div className="form-input-wrapper">
                <Lock size={16} className="input-icon" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="form-input"
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary auth-submit-btn">
              <span>{mode === 'signin' ? 'Sign In to Workspace' : 'Initialize Account'}</span>
              <ArrowRight size={16} />
            </button>

            {/* Note about future backend */}
            <div className="auth-roadmap-note font-mono">
              <Info size={14} />
              <span>Full Supabase / JWT authentication pipeline to be integrated in next step.</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
