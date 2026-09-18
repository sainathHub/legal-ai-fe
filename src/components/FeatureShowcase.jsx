import React, { useState } from 'react';
import { 
  FileText, 
  Search, 
  CheckCircle2, 
  Layers, 
  Cpu, 
  ExternalLink, 
  Sparkles,
  ChevronRight,
  BookOpen,
  Quote,
  SlidersHorizontal,
  Copy,
  Check
} from 'lucide-react';
import './FeatureShowcase.css';

export default function FeatureShowcase({ onOpenAuth }) {
  const [activeTab, setActiveTab] = useState('summarizer');
  const [activeCase, setActiveCase] = useState('puttaswamy');
  const [activeSection, setActiveSection] = useState('ratio');
  const [ragQuery, setRagQuery] = useState('Right to privacy under Article 21 and digital data protection');
  const [copied, setCopied] = useState(false);

  const sampleJudgments = {
    puttaswamy: {
      title: 'Justice K.S. Puttaswamy (Retd.) v. Union of India',
      citation: '(2017) 10 SCC 1',
      bench: '9-Judge Constitutional Bench — Supreme Court of India',
      date: '24 August 2017',
      facts: 'The validity of the Aadhaar biometric identification project was challenged. Petitioners contended that mandatory biometric collection infringed upon the fundamental right to privacy, requiring an apex constitutional determination on whether privacy is an intrinsic part of Article 21 and Part III rights.',
      issues: [
        'Is there any fundamental right to privacy guaranteed under Part III of the Constitution of India?',
        'Do the earlier rulings in M.P. Sharma (1954, 8 Judges) and Kharak Singh (1962, 6 Judges) hold good law denying privacy as a fundamental right?'
      ],
      ratio: 'Privacy is a natural, inalienable fundamental right intrinsic to life, personal liberty, and human dignity under Article 21. It emanates from the entire Chapter III of fundamental rights. Any state encroachment must satisfy the 3-fold proportionality test: (1) Legality, (2) Legitimate state aim, and (3) Proportionality between means and ends.',
      holding: 'M.P. Sharma and Kharak Singh are expressly overruled to the extent they held privacy is not a fundamental right. Privacy is declared a constitutionally protected fundamental right.',
      confidence: '99.4%'
    },
    kesavananda: {
      title: 'Kesavananda Bharati Sripadagalvaru v. State of Kerala',
      citation: '(1973) 4 SCC 225',
      bench: '13-Judge Constitutional Bench — Supreme Court of India',
      date: '24 April 1973',
      facts: 'The petitioner, head of the Edneer Mutt in Kerala, challenged the Kerala Land Reforms Acts and the 24th, 25th, and 29th Constitutional Amendments under Article 26 (freedom to manage religious affairs) and Article 31 (right to property).',
      issues: [
        'What is the scope and limitation of Parliament’s constituent power to amend the Constitution under Article 368?',
        'Does Article 368 confer power on Parliament to alter or destroy the basic foundation of the Constitution?'
      ],
      ratio: 'Article 368 confers plenary constituent power upon Parliament, but does not enable Parliament to alter the "Basic Structure" or essential framework of the Constitution of India. Judicial review is an inviolable basic feature.',
      holding: 'The 24th Amendment is valid, but the second clause of Article 31-C (ouster of judicial review) is invalid. The Basic Structure Doctrine is established as an immutable constitutional safeguard.',
      confidence: '99.8%'
    }
  };

  const ragQueries = [
    {
      query: 'Right to privacy under Article 21 and digital data protection',
      results: [
        {
          caseName: 'K.S. Puttaswamy v. Union of India',
          citation: '(2017) 10 SCC 1',
          court: 'Supreme Court of India',
          similarity: '0.964',
          snippet: 'Privacy is the constitutional core of human dignity. Informational privacy forms a pivotal facet of Article 21 protection in the modern digital age.'
        },
        {
          caseName: 'Navtej Singh Johar v. Union of India',
          citation: '(2018) 10 SCC 1',
          court: 'Supreme Court of India',
          similarity: '0.892',
          snippet: 'The constitutional protection of privacy under Article 21 encompasses individual decisional autonomy, personal identity, and freedom from state intrusion.'
        }
      ]
    },
    {
      query: 'Moratorium under Section 14 IBC and personal guarantors',
      results: [
        {
          caseName: 'State Bank of India v. V. Ramakrishnan',
          citation: '(2018) 17 SCC 394',
          court: 'Supreme Court of India',
          similarity: '0.978',
          snippet: 'Section 14 of the Insolvency and Bankruptcy Code, 2016 does not apply to a personal guarantor to a corporate debtor. The moratorium applies solely to the corporate debtor.'
        },
        {
          caseName: 'Lalit Kumar Jain v. Union of India',
          citation: '(2021) 9 SCC 321',
          court: 'Supreme Court of India',
          similarity: '0.931',
          snippet: 'The approval of a resolution plan does not ipso facto discharge the liabilities of personal guarantors under the Indian Contract Act and IBC.'
        }
      ]
    }
  ];

  const currentCaseData = sampleJudgments[activeCase];
  const currentRag = ragQueries.find(r => r.query === ragQuery) || ragQueries[0];

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="showcase-section" id="demo">
      <div className="showcase-container">
        {/* Section Heading */}
        <div className="section-header">
          <div className="badge">
            <span className="badge-dot" />
            <span>INTERACTIVE WORKSPACE PREVIEW</span>
          </div>
          <h2 className="section-title font-display">
            EXPERIENCE THE LEGAL INTELLIGENCE ENGINE
          </h2>
          <p className="section-subtitle">
            Explore live previews of our two core capabilities: AI-driven structured brief synthesis 
            and high-dimensional semantic precedent retrieval.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="showcase-tabs-nav">
          <button 
            type="button" 
            className={`tab-switch-btn ${activeTab === 'summarizer' ? 'tab-switch-active' : ''}`}
            onClick={() => setActiveTab('summarizer')}
            id="tab-btn-summarizer"
          >
            <FileText size={17} />
            <span>Document Summarizer</span>
            <span className="tab-pill font-mono">GROQ LLM</span>
          </button>
          <button 
            type="button" 
            className={`tab-switch-btn ${activeTab === 'rag' ? 'tab-switch-active' : ''}`}
            onClick={() => setActiveTab('rag')}
            id="tab-btn-rag"
          >
            <Search size={17} />
            <span>Precedent RAG Search</span>
            <span className="tab-pill font-mono">WEAVIATE VECTORS</span>
          </button>
        </div>

        {/* ===================== TAB 1: SUMMARIZER ===================== */}
        {activeTab === 'summarizer' && (
          <div className="console-window glass-card">
            {/* Top Toolbar */}
            <div className="console-toolbar">
              <div className="console-window-dots">
                <span className="window-dot" />
                <span className="window-dot" />
                <span className="window-dot" />
              </div>
              <div className="console-case-selector">
                <button
                  type="button"
                  className={`case-select-chip ${activeCase === 'puttaswamy' ? 'case-chip-active' : ''}`}
                  onClick={() => setActiveCase('puttaswamy')}
                >
                  Puttaswamy (2017)
                </button>
                <button
                  type="button"
                  className={`case-select-chip ${activeCase === 'kesavananda' ? 'case-chip-active' : ''}`}
                  onClick={() => setActiveCase('kesavananda')}
                >
                  Kesavananda Bharati (1973)
                </button>
              </div>
              <div className="console-meta-tag font-mono">
                MODEL: LLAMA-3-70B • LATENCY: 312ms
              </div>
            </div>

            {/* Case Header Banner */}
            <div className="case-header-banner">
              <div className="case-title-area">
                <h3 className="case-heading font-display">{currentCaseData.title}</h3>
                <div className="case-metadata-row font-mono">
                  <span className="meta-item">{currentCaseData.citation}</span>
                  <span className="meta-sep">•</span>
                  <span className="meta-item">{currentCaseData.bench}</span>
                  <span className="meta-sep">•</span>
                  <span className="meta-item">{currentCaseData.date}</span>
                </div>
              </div>
              <div className="confidence-chip font-mono">
                <Sparkles size={14} />
                <span>CONFIDENCE: {currentCaseData.confidence}</span>
              </div>
            </div>

            {/* 5-Point Brief Breakdown */}
            <div className="brief-grid-layout">
              {/* Left Column: Sections Navigation */}
              <div className="brief-sidebar">
                <span className="sidebar-label font-mono">EXTRACTED BRIEF SECTIONS</span>
                <button 
                  type="button" 
                  className={`brief-nav-item ${activeSection === 'ratio' ? 'brief-nav-active' : ''}`}
                  onClick={() => setActiveSection('ratio')}
                >
                  <Quote size={15} />
                  <span>Ratio Decidendi</span>
                </button>
                <button 
                  type="button" 
                  className={`brief-nav-item ${activeSection === 'facts' ? 'brief-nav-active' : ''}`}
                  onClick={() => setActiveSection('facts')}
                >
                  <FileText size={15} />
                  <span>Facts of Case</span>
                </button>
                <button 
                  type="button" 
                  className={`brief-nav-item ${activeSection === 'issues' ? 'brief-nav-active' : ''}`}
                  onClick={() => setActiveSection('issues')}
                >
                  <SlidersHorizontal size={15} />
                  <span>Legal Issues Framed</span>
                </button>
                <button 
                  type="button" 
                  className={`brief-nav-item ${activeSection === 'holding' ? 'brief-nav-active' : ''}`}
                  onClick={() => setActiveSection('holding')}
                >
                  <CheckCircle2 size={15} />
                  <span>Final Disposition</span>
                </button>
              </div>

              {/* Right Column: Display Active Section */}
              <div className="brief-content-panel">
                <div className="panel-top-row">
                  <span className="panel-badge font-mono">
                    {activeSection === 'ratio' && 'PRIMARY LEGAL PRINCIPLE (BINDING PRECEDENT)'}
                    {activeSection === 'facts' && 'SUMMARY OF MATERIAL FACTS'}
                    {activeSection === 'issues' && 'CONSTITUTIONAL QUESTIONS CONSIDERED'}
                    {activeSection === 'holding' && 'FINAL OPERATIVE HOLDING'}
                  </span>
                  <button 
                    type="button" 
                    className="copy-btn"
                    onClick={() => handleCopy(
                      activeSection === 'ratio' ? currentCaseData.ratio :
                      activeSection === 'facts' ? currentCaseData.facts :
                      activeSection === 'holding' ? currentCaseData.holding :
                      currentCaseData.issues.join('\n')
                    )}
                  >
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                    <span className="font-mono">{copied ? 'COPIED' : 'COPY'}</span>
                  </button>
                </div>

                <div className="panel-body-text">
                  {activeSection === 'ratio' && (
                    <blockquote className="legal-quote">
                      "{currentCaseData.ratio}"
                    </blockquote>
                  )}
                  {activeSection === 'facts' && (
                    <p>{currentCaseData.facts}</p>
                  )}
                  {activeSection === 'issues' && (
                    <ul className="issues-list">
                      {currentCaseData.issues.map((issue, i) => (
                        <li key={i}>
                          <span className="issue-num font-mono">0{i + 1}.</span>
                          <span>{issue}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {activeSection === 'holding' && (
                    <div className="holding-box">
                      <p>{currentCaseData.holding}</p>
                    </div>
                  )}
                </div>

                <div className="panel-footer">
                  <span className="footer-citation font-mono">Source: Indian Kanoon & Official Apex Court Registry</span>
                  <button 
                    type="button" 
                    className="link-btn font-mono"
                    onClick={() => onOpenAuth('signin')}
                  >
                    <span>ANALYZE FULL 500-PAGE PDF</span>
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===================== TAB 2: PRECEDENT RAG ===================== */}
        {activeTab === 'rag' && (
          <div className="console-window glass-card">
            {/* Search Input Bar */}
            <div className="rag-search-header">
              <div className="rag-input-box">
                <Search size={18} className="search-icon" />
                <input 
                  type="text" 
                  className="rag-text-input" 
                  value={ragQuery}
                  onChange={(e) => setRagQuery(e.target.value)}
                  placeholder="Enter natural language legal query or proposition of law..."
                />
                <button 
                  type="button" 
                  className="btn btn-primary btn-sm"
                  onClick={() => {}}
                >
                  Search
                </button>
              </div>

              {/* Sample Query Chips */}
              <div className="sample-chips-row">
                <span className="chips-label font-mono">SAMPLE PROPOSITIONS:</span>
                {ragQueries.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`query-chip ${ragQuery === item.query ? 'query-chip-active' : ''}`}
                    onClick={() => setRagQuery(item.query)}
                  >
                    {item.query.substring(0, 42)}...
                  </button>
                ))}
              </div>
            </div>

            {/* Retrieval Results Matrix */}
            <div className="rag-results-area">
              <div className="results-header-bar font-mono">
                <span>RETRIEVED 2 RELEVANT PRECEDENTS ACROSS 15,000+ INDEXED JUDGMENTS</span>
                <span>EMBEDDING: WEAVIATE HYBRID</span>
              </div>

              <div className="results-cards-grid">
                {currentRag.results.map((res, idx) => (
                  <div key={idx} className="result-card">
                    <div className="result-card-top">
                      <div>
                        <h4 className="result-title font-display">{res.caseName}</h4>
                        <div className="result-court font-mono">{res.citation} • {res.court}</div>
                      </div>
                      <div className="similarity-score font-mono">
                        <div className="similarity-val">{(parseFloat(res.similarity) * 100).toFixed(1)}%</div>
                        <div className="similarity-sub">SIMILARITY</div>
                      </div>
                    </div>
                    <p className="result-snippet">
                      "{res.snippet}"
                    </p>
                    <div className="result-footer">
                      <span className="matched-tag font-mono">VERIFIED CITATION</span>
                      <button 
                        type="button" 
                        className="btn-view-brief font-mono"
                        onClick={() => onOpenAuth('signin')}
                      >
                        VIEW FULL BENCH ORDER <ChevronRight size={13} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Feature Highlights Grid */}
        <div className="features-trio-grid" id="features">
          <div className="feature-box glass-card">
            <div className="feature-icon-wrapper">
              <FileText size={22} />
            </div>
            <h4 className="feature-box-title font-display">Automated Summarization</h4>
            <p className="feature-box-desc">
              Upload multi-hundred-page Indian court petitions or final orders. Powered by our 
              FastAPI backend and high-throughput Groq LLM inference, receive structured 5-part briefs in seconds.
            </p>
          </div>

          <div className="feature-box glass-card">
            <div className="feature-icon-wrapper">
              <Search size={22} />
            </div>
            <h4 className="feature-box-title font-display">Semantic Precedent Search</h4>
            <p className="feature-box-desc">
              Query complex legal propositions naturally. Our Weaviate vector engine matches concepts, 
              statutory provisions, and judicial reasoning beyond simple keyword matching.
            </p>
          </div>

          <div className="feature-box glass-card">
            <div className="feature-icon-wrapper">
              <BookOpen size={22} />
            </div>
            <h4 className="feature-box-title font-display">Verifiable Bench Citations</h4>
            <p className="feature-box-desc">
              Every synthesized point links directly to verified paragraphs from the Supreme Court 
              and High Courts of India, eliminating AI hallucinations and streamlining court filings.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
