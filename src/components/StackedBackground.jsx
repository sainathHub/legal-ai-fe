import React, { useEffect, useRef } from 'react';
import './StackedBackground.css';

export default function StackedBackground() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let animId;

    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      // Normalized between -1 and 1
      targetX = (e.clientX / innerWidth - 0.5) * 2;
      targetY = (e.clientY / innerHeight - 0.5) * 2;
    };

    const animate = () => {
      // Smooth lerp interpolation
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;

      if (container) {
        container.style.setProperty('--mouse-x', currentX.toFixed(4));
        container.style.setProperty('--mouse-y', currentY.toFixed(4));
      }

      animId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  // 6 main stacked legal dossier cards + accent floating wireframe cards
  const stackLayers = [
    { id: 1, zIndex: 1, delay: '0s', label: 'INDIAN PRECEDENTS DB', sub: 'SEC. 14 IBC & ART. 21' },
    { id: 2, zIndex: 2, delay: '0.6s', label: 'LANDMARK JURISPRUDENCE', sub: '1950 - 2026 BENCH ORDERS' },
    { id: 3, zIndex: 3, delay: '1.2s', label: 'RATIO DECIDENDI VECTORS', sub: 'WEAVIATE EMBEDDINGS' },
    { id: 4, zIndex: 4, delay: '1.8s', label: 'GROQ LLM SUMMARIZER', sub: 'LEGAL FACTS & HOLDINGS' },
    { id: 5, zIndex: 5, delay: '2.4s', label: 'JURISPRUDENCE RAG MATRIX', sub: 'HIGH COURT & APEX BENCH' },
    { id: 6, zIndex: 6, delay: '3.0s', label: 'ACTIVE BRIEF DOSSIER', sub: 'CITATION GRAPH SYNTHESIS' },
  ];

  return (
    <div className="stacked-bg-wrapper" ref={containerRef} aria-hidden="true">
      {/* Ambient monochrome radial glow */}
      <div className="bg-glow-orb bg-glow-center" />
      <div className="bg-glow-orb bg-glow-top-right" />

      {/* 3D Perspective Canvas Container */}
      <div className="perspective-viewport">
        {/* The Central Isometric Stack */}
        <div className="stack-isometric-cluster">
          {stackLayers.map((layer, idx) => (
            <div
              key={layer.id}
              className={`stack-card stack-card-${idx + 1}`}
              style={{
                '--layer-index': idx,
                '--anim-delay': layer.delay,
                zIndex: layer.zIndex,
              }}
            >
              {/* Card internal wireframe graphics */}
              <div className="card-header-bar">
                <span className="card-dot" />
                <span className="card-tag">{layer.label}</span>
                <span className="card-badge">INDEX #{layer.id}</span>
              </div>
              <div className="card-lines">
                <div className="card-line card-line-long" />
                <div className="card-line card-line-med" />
                <div className="card-line card-line-short" />
              </div>
              <div className="card-footer-info">
                <span>{layer.sub}</span>
                <span className="card-hash font-mono">0x{layer.id}A9</span>
              </div>
            </div>
          ))}
        </div>

        {/* Ambient floating perimeter wireframe rectangles */}
        <div className="ambient-float-rect rect-1" />
        <div className="ambient-float-rect rect-2" />
        <div className="ambient-float-rect rect-3" />
        <div className="ambient-float-rect rect-4" />
        <div className="ambient-float-rect rect-5" />
      </div>

      {/* Grid overlay mask for architectural feel */}
      <div className="architectural-grid" />
    </div>
  );
}
