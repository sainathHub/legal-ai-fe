import React from 'react';
import { Cpu, Database, Layout, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import './Architecture.css';

export default function Architecture() {
  return (
    <section className="architecture-section" id="architecture">
      <div className="architecture-container">
        {/* Section Header */}
        <div className="section-header">
          <div className="badge">
            <span className="badge-dot" />
            <span>FULL-STACK LEGAL INTELLIGENCE</span>
          </div>
          <h2 className="section-title font-display">
            ENGINEERED FOR SUPREME COURT JURISPRUDENCE
          </h2>
          <p className="section-subtitle">
            A tripartite architecture marrying real-time neural inference with high-dimensional 
            vector databases to guarantee zero hallucination in legal citations.
          </p>
        </div>

        {/* 3-Node Architecture Flow Diagram */}
        <div className="arch-diagram glass-card">
          <div className="arch-node-wrapper">
            <div className="arch-node arch-node-active">
              <div className="node-icon-box">
                <Layout size={24} />
              </div>
              <div className="node-badge font-mono">CLIENT / UI</div>
              <h4 className="node-title font-display">legal-ai-fe</h4>
              <p className="node-desc">
                Minimalist high-contrast workstation, structured brief renderer, and citation graph explorer.
              </p>
              <div className="node-specs font-mono">
                <span>Vite + React 19</span>
                <span>•</span>
                <span>Vanilla CSS</span>
              </div>
            </div>
          </div>

          <div className="arch-connector">
            <div className="connector-line" />
            <div className="connector-pulse font-mono">REST / JSON</div>
          </div>

          <div className="arch-node-wrapper">
            <div className="arch-node">
              <div className="node-icon-box">
                <Zap size={24} />
              </div>
              <div className="node-badge font-mono">INFERENCE ENGINE</div>
              <h4 className="node-title font-display">Law-AI-Summarizer</h4>
              <p className="node-desc">
                FastAPI microservice executing 5-point extraction (Ratio, Facts, Issues) via Groq Llama-3.
              </p>
              <div className="node-specs font-mono">
                <span>FastAPI</span>
                <span>•</span>
                <span>Groq Llama-3</span>
              </div>
            </div>
          </div>

          <div className="arch-connector">
            <div className="connector-line" />
            <div className="connector-pulse font-mono">VECTORS</div>
          </div>

          <div className="arch-node-wrapper">
            <div className="arch-node">
              <div className="node-icon-box">
                <Database size={24} />
              </div>
              <div className="node-badge font-mono">CASE PRECEDENT RAG</div>
              <h4 className="node-title font-display">legal-ai Weaviate</h4>
              <p className="node-desc">
                High-dimensional vector repository indexing 15,000+ Indian High Court and Apex Court judgments.
              </p>
              <div className="node-specs font-mono">
                <span>Weaviate DB</span>
                <span>•</span>
                <span>Hybrid RAG</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
