import React, { useState } from 'react';
import StackedBackground from './components/StackedBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeatureShowcase from './components/FeatureShowcase';
import Architecture from './components/Architecture';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';

export default function App() {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('signin');

  const handleOpenAuth = (mode = 'signin') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const handleCloseAuth = () => {
    setAuthModalOpen(false);
  };

  return (
    <div className="app-container">
      {/* Subtle Noise Texture Overlay */}
      <div className="noise-overlay" />

      {/* 3D Stacked Rectangles Background Animation */}
      <StackedBackground />

      {/* Navigation Bar */}
      <Navbar onOpenAuth={handleOpenAuth} />

      {/* Main Content Flow */}
      <main>
        {/* Hero Section with Legal AI Caption & Key Metrics */}
        <Hero onOpenAuth={handleOpenAuth} />

        {/* Interactive Showcase: Brief Summarizer & Precedent RAG */}
        <FeatureShowcase onOpenAuth={handleOpenAuth} />

        {/* System Architecture Section */}
        <Architecture />
      </main>

      {/* Site Footer */}
      <Footer />

      {/* Authentication Modal Placeholder for Phase 2 */}
      <AuthModal 
        isOpen={authModalOpen} 
        initialMode={authMode} 
        onClose={handleCloseAuth} 
      />
    </div>
  );
}
