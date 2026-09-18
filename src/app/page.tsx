'use client';

import React, { useState } from 'react';
import StackedBackground from '@/components/StackedBackground';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeatureShowcase from '@/components/FeatureShowcase';
import Architecture from '@/components/Architecture';
import Footer from '@/components/Footer';
import AuthDialog from '@/components/AuthDialog';

export default function Home() {
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');

  const handleOpenAuth = (mode: 'signin' | 'signup' = 'signin') => {
    setAuthMode(mode);
    setAuthOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-white selection:text-black">
      {/* 3D Stacked Rectangles Background Animation */}
      <StackedBackground />

      {/* Navigation Bar */}
      <Navbar onOpenAuth={handleOpenAuth} />

      {/* Main Sections */}
      <main className="relative z-10">
        <Hero onOpenAuth={handleOpenAuth} />
        <FeatureShowcase onOpenAuth={handleOpenAuth} />
        <Architecture />
      </main>

      {/* Footer */}
      <Footer />

      {/* Auth Dialog (ShadCN Modal) */}
      <AuthDialog
        open={authOpen}
        initialMode={authMode}
        onOpenChange={setAuthOpen}
      />
    </div>
  );
}
