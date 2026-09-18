import React from 'react';
import { ArrowRight, Sparkles, FileText, Search, Database, ChevronRight } from 'lucide-react';
import './Hero.css';

export default function Hero({ onOpenAuth }) {
  return (
    <section className="hero-section" id="overview">
      <div className="hero-container">
        {/* Top Status Badge */}
        <div className="hero-badge-wrapper">
          <div className="badge">
            <span className="badge-dot" />
            <span>INDIAN JURISPRUDENCE & PRECEDENT RAG ENGINE</span>
          </div>
        </div>

        {/* Main Hero Typography */}
        <div className="hero-content">
          <h1 className="hero-title font-display">
            PRECISION LEGAL AI FOR <br />
            <span className="hero-title-highlight">INDIAN JURISPRUDENCE.</span>
          </h1>

          {/* Legal AI Caption */}
          <p className="hero-caption">
            Transform hundreds of pages of complex courtroom judgments into structured, 
            verifiable briefs in milliseconds. Query semantic case precedents across landmark 
            Supreme Court and High Court rulings with authoritative vector-backed citations.
          </p>

          {/* Call-to-Action Group */}
          <div className="hero-actions">
            <button 
              type="button" 
              className="btn btn-primary hero-btn-main"
              onClick={() => onOpenAuth('signup')}
              id="hero-launch-btn"
            >
              <span>Launch Research Console</span>
              <ArrowRight size={18} />
            </button>
            <a 
              href="#demo" 
              className="btn btn-secondary hero-btn-secondary"
              id="hero-demo-btn"
            >
              <span>Explore Interactive Demo</span>
              <ChevronRight size={16} />
            </a>
          </div>

          {/* Trust & Architecture Pills */}
          <div className="hero-trust-row">
            <div className="trust-item">
              <FileText size={15} />
              <span>Automated Brief Summarizer</span>
            </div>
            <span className="trust-divider">/</span>
            <div className="trust-item">
              <Search size={15} />
              <span>Semantic Case Precedent RAG</span>
            </div>
            <span className="trust-divider">/</span>
            <div className="trust-item">
              <Database size={15} />
              <span>Weaviate Vector Embeddings</span>
            </div>
          </div>
        </div>

        {/* Bottom Metrics Bar */}
        <div className="hero-metrics-bar glass-card">
          <div className="metric-col">
            <div className="metric-value font-mono">15,000+</div>
            <div className="metric-label">Landmark Indian Precedents</div>
          </div>
          <div className="metric-separator" />
          <div className="metric-col">
            <div className="metric-value font-mono">&lt; 350ms</div>
            <div className="metric-label">Groq Llama-3 Summarization</div>
          </div>
          <div className="metric-separator" />
          <div className="metric-col">
            <div className="metric-value font-mono">5-Point</div>
            <div className="metric-label">Structured Brief Synthesis</div>
          </div>
          <div className="metric-separator" />
          <div className="metric-col">
            <div className="metric-value font-mono">100%</div>
            <div className="metric-label">Verifiable Paragraph Citations</div>
          </div>
        </div>
      </div>
    </section>
  );
}
