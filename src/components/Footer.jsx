import React from 'react';
import { Scale, ArrowUpRight, ShieldCheck } from 'lucide-react';
import './Footer.css';

const GithubIcon = ({ size = 16 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-main-row">
          <div className="footer-brand-col">
            <div className="footer-brand">
              <div className="brand-icon-box">
                <Scale size={20} strokeWidth={2.2} />
              </div>
              <span className="brand-title font-display">JURIS.AI</span>
            </div>
            <p className="footer-tagline">
              Advanced neural intelligence for Indian jurisprudence. Bridging 100-page court 
              judgments with high-speed brief extraction and semantic vector retrieval.
            </p>
            <div className="footer-repo-link">
              <a 
                href="https://github.com/sainathHub/legal-ai-fe" 
                target="_blank" 
                rel="noreferrer"
                className="github-btn"
              >
                <GithubIcon size={16} />
                <span className="font-mono">sainathHub / legal-ai-fe</span>
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>

          <div className="footer-links-grid">
            <div className="footer-col">
              <span className="footer-col-heading font-mono">PLATFORM</span>
              <a href="#overview">Overview</a>
              <a href="#demo">Document Summarizer</a>
              <a href="#demo">Precedent Vector RAG</a>
              <a href="#architecture">Ecosystem</a>
            </div>

            <div className="footer-col">
              <span className="footer-col-heading font-mono">ECOSYSTEM</span>
              <a href="https://github.com/sainathHub/legal-ai-fe" target="_blank" rel="noreferrer">
                <span>legal-ai-fe</span>
                <ArrowUpRight size={12} />
              </a>
              <a href="https://github.com/sainathHub/Law-AI-Summarizer-Backend" target="_blank" rel="noreferrer">
                <span>Summarizer Backend</span>
                <ArrowUpRight size={12} />
              </a>
              <a href="https://github.com/sainathHub/legal-ai" target="_blank" rel="noreferrer">
                <span>legal-ai Weaviate RAG</span>
                <ArrowUpRight size={12} />
              </a>
            </div>

            <div className="footer-col">
              <span className="footer-col-heading font-mono">JURISPRUDENCE</span>
              <span>Supreme Court of India</span>
              <span>High Courts of Judicature</span>
              <span>Indian Kanoon Integration</span>
              <span>Constitution Part III</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom-bar">
          <div className="copyright-text font-mono">
            © {new Date().getFullYear()} JURIS.AI • BUILT FOR LEGAL SCHOLARS & BENCH PRACTITIONERS
          </div>
          <div className="footer-security-pill font-mono">
            <ShieldCheck size={14} />
            <span>ZERO HALLUCINATION CITATION ENGINE</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
