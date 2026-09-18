import React, { useState, useEffect } from 'react';
import { Scale, Menu, X, ArrowRight, ShieldCheck } from 'lucide-react';
import './Navbar.css';

export default function Navbar({ onOpenAuth }) {
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
    <header className={`navbar-header ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Brand Logo */}
        <a href="#" className="navbar-brand">
          <div className="brand-icon-box">
            <Scale size={20} strokeWidth={2.2} />
          </div>
          <div className="brand-text-group">
            <span className="brand-title font-display">JURIS.AI</span>
            <span className="brand-subtitle font-mono">LEGAL INTEL</span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="navbar-nav-desktop">
          <a href="#overview" className="nav-link">Overview</a>
          <a href="#features" className="nav-link">Capabilities</a>
          <a href="#demo" className="nav-link">Interactive Demo</a>
          <a href="#architecture" className="nav-link">Architecture</a>
        </nav>

        {/* Action CTAs */}
        <div className="navbar-actions">
          <button 
            type="button" 
            className="btn btn-ghost btn-sm"
            onClick={() => onOpenAuth('signin')}
            id="nav-signin-btn"
          >
            Sign In
          </button>
          <button 
            type="button" 
            className="btn btn-primary btn-sm"
            onClick={() => onOpenAuth('signup')}
            id="nav-getstarted-btn"
          >
            <span>Get Started</span>
            <ArrowRight size={14} />
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            className="mobile-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="navbar-mobile-drawer">
          <a 
            href="#overview" 
            className="mobile-nav-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            Overview
          </a>
          <a 
            href="#features" 
            className="mobile-nav-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            Capabilities
          </a>
          <a 
            href="#demo" 
            className="mobile-nav-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            Interactive Demo
          </a>
          <a 
            href="#architecture" 
            className="mobile-nav-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            Architecture
          </a>

          <div className="mobile-drawer-actions">
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAuth('signin');
              }}
            >
              Sign In
            </button>
            <button 
              type="button" 
              className="btn btn-primary"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAuth('signup');
              }}
            >
              <span>Get Started</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
