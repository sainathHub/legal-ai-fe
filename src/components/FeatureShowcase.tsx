'use client';

import React, { useState } from 'react';
import { 
  FileText, 
  Search, 
  CheckCircle2, 
  Sparkles,
  ChevronRight,
  BookOpen,
  Quote,
  SlidersHorizontal,
  Copy,
  Check
} from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

interface FeatureShowcaseProps {
  onOpenAuth: (mode: 'signin' | 'signup') => void;
}

export default function FeatureShowcase({ onOpenAuth }: FeatureShowcaseProps) {
  const [activeCase, setActiveCase] = useState<'puttaswamy' | 'kesavananda'>('puttaswamy');
  const [activeSection, setActiveSection] = useState<'ratio' | 'facts' | 'issues' | 'holding'>('ratio');
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

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative z-10 py-24 px-6" id="demo">
      <div className="max-w-6xl mx-auto">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 flex flex-col items-center">
          <Badge 
            variant="outline" 
            className="px-3.5 py-1 rounded-full border-white/20 bg-white/[0.04] text-zinc-300 tracking-wider text-[11px] font-mono gap-2 mb-4 font-normal"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_#ffffff]" />
            <span>INTERACTIVE WORKSPACE PREVIEW</span>
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold uppercase text-white tracking-tight mb-4 font-display">
            EXPERIENCE THE LEGAL INTELLIGENCE ENGINE
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg">
            Explore live previews of our two core capabilities: AI-driven structured brief synthesis 
            and high-dimensional semantic precedent retrieval.
          </p>
        </div>

        {/* ShadCN Tabs */}
        <Tabs defaultValue="summarizer" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="bg-zinc-900/80 border border-white/10 p-1.5 rounded-full gap-2">
              <TabsTrigger 
                value="summarizer" 
                className="rounded-full px-6 py-2.5 text-sm font-semibold data-[state=active]:bg-white data-[state=active]:text-black transition-all cursor-pointer flex items-center gap-2"
              >
                <FileText size={16} />
                <span>Document Summarizer</span>
                <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-black/10 dark:bg-white/10">GROQ LLM</span>
              </TabsTrigger>
              <TabsTrigger 
                value="rag" 
                className="rounded-full px-6 py-2.5 text-sm font-semibold data-[state=active]:bg-white data-[state=active]:text-black transition-all cursor-pointer flex items-center gap-2"
              >
                <Search size={16} />
                <span>Precedent RAG Search</span>
                <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-black/10 dark:bg-white/10">WEAVIATE</span>
              </TabsTrigger>
            </TabsList>
          </div>

          {/* ===================== TAB 1: SUMMARIZER ===================== */}
          <TabsContent value="summarizer">
            <Card className="bg-zinc-950/80 border-white/12 rounded-2xl overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.95)] backdrop-blur-2xl mb-16">
              {/* Window Toolbar */}
              <div className="flex items-center justify-between px-6 py-3.5 bg-zinc-900/60 border-b border-white/10 flex-wrap gap-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                  <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                  <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveCase('puttaswamy')}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
                      activeCase === 'puttaswamy' 
                        ? 'bg-white text-black font-semibold' 
                        : 'bg-white/5 border border-white/10 text-zinc-300 hover:text-white'
                    }`}
                  >
                    Puttaswamy (2017)
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveCase('kesavananda')}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
                      activeCase === 'kesavananda' 
                        ? 'bg-white text-black font-semibold' 
                        : 'bg-white/5 border border-white/10 text-zinc-300 hover:text-white'
                    }`}
                  >
                    Kesavananda (1973)
                  </button>
                </div>

                <div className="font-mono text-[11px] text-zinc-500 tracking-wider">
                  MODEL: LLAMA-3-70B • LATENCY: 312ms
                </div>
              </div>

              {/* Case Header Banner */}
              <div className="p-6 sm:p-8 bg-zinc-900/30 border-b border-white/10 flex justify-between items-start gap-4 flex-wrap">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 font-display">
                    {currentCaseData.title}
                  </h3>
                  <div className="flex items-center gap-2.5 text-xs text-zinc-400 font-mono flex-wrap">
                    <span>{currentCaseData.citation}</span>
                    <span>•</span>
                    <span>{currentCaseData.bench}</span>
                    <span>•</span>
                    <span>{currentCaseData.date}</span>
                  </div>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 border border-white/20 rounded-full text-white font-mono text-xs">
                  <Sparkles size={13} />
                  <span>CONFIDENCE: {currentCaseData.confidence}</span>
                </div>
              </div>

              {/* Brief Grid Layout */}
              <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] min-h-[380px]">
                {/* Sidebar Navigation */}
                <div className="p-4 bg-zinc-950/60 border-r border-white/10 flex flex-col gap-1.5 max-md:border-r-0 max-md:border-b">
                  <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest px-3 py-2">
                    EXTRACTED BRIEF SECTIONS
                  </span>
                  <button
                    type="button"
                    onClick={() => setActiveSection('ratio')}
                    className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-sm text-left transition-all cursor-pointer ${
                      activeSection === 'ratio'
                        ? 'bg-white/10 border border-white/20 text-white font-semibold'
                        : 'text-zinc-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Quote size={15} />
                    <span>Ratio Decidendi</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveSection('facts')}
                    className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-sm text-left transition-all cursor-pointer ${
                      activeSection === 'facts'
                        ? 'bg-white/10 border border-white/20 text-white font-semibold'
                        : 'text-zinc-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <FileText size={15} />
                    <span>Facts of Case</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveSection('issues')}
                    className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-sm text-left transition-all cursor-pointer ${
                      activeSection === 'issues'
                        ? 'bg-white/10 border border-white/20 text-white font-semibold'
                        : 'text-zinc-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <SlidersHorizontal size={15} />
                    <span>Legal Issues Framed</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveSection('holding')}
                    className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-sm text-left transition-all cursor-pointer ${
                      activeSection === 'holding'
                        ? 'bg-white/10 border border-white/20 text-white font-semibold'
                        : 'text-zinc-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <CheckCircle2 size={15} />
                    <span>Final Disposition</span>
                  </button>
                </div>

                {/* Content Panel */}
                <div className="p-6 sm:p-8 flex flex-col justify-between">
                  <div className="flex justify-between items-center pb-3 mb-5 border-b border-white/10">
                    <span className="font-mono text-xs text-zinc-400 uppercase tracking-wider">
                      {activeSection === 'ratio' && 'PRIMARY LEGAL PRINCIPLE (BINDING PRECEDENT)'}
                      {activeSection === 'facts' && 'SUMMARY OF MATERIAL FACTS'}
                      {activeSection === 'issues' && 'CONSTITUTIONAL QUESTIONS CONSIDERED'}
                      {activeSection === 'holding' && 'FINAL OPERATIVE HOLDING'}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopy(
                        activeSection === 'ratio' ? currentCaseData.ratio :
                        activeSection === 'facts' ? currentCaseData.facts :
                        activeSection === 'holding' ? currentCaseData.holding :
                        currentCaseData.issues.join('\n')
                      )}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 border border-white/10 rounded text-xs text-zinc-400 hover:text-white hover:border-white/30 transition-colors cursor-pointer font-mono"
                    >
                      {copied ? <Check size={13} /> : <Copy size={13} />}
                      <span>{copied ? 'COPIED' : 'COPY'}</span>
                    </button>
                  </div>

                  <div className="text-zinc-200 text-base sm:text-lg leading-relaxed grow">
                    {activeSection === 'ratio' && (
                      <blockquote className="italic border-l-2 border-white pl-5 py-1 text-white">
                        "{currentCaseData.ratio}"
                      </blockquote>
                    )}
                    {activeSection === 'facts' && (
                      <p>{currentCaseData.facts}</p>
                    )}
                    {activeSection === 'issues' && (
                      <ul className="space-y-3">
                        {currentCaseData.issues.map((issue, i) => (
                          <li key={i} className="flex gap-3 items-start">
                            <span className="font-mono text-xs text-zinc-500 pt-1">0{i + 1}.</span>
                            <span>{issue}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    {activeSection === 'holding' && (
                      <div className="bg-white/[0.03] border border-white/10 p-5 rounded-lg text-white">
                        <p>{currentCaseData.holding}</p>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between items-center pt-5 mt-6 border-t border-white/10 text-xs flex-wrap gap-2">
                    <span className="font-mono text-zinc-500">Source: Indian Kanoon & Official Apex Registry</span>
                    <button
                      type="button"
                      onClick={() => onOpenAuth('signin')}
                      className="inline-flex items-center gap-1 text-white font-mono hover:gap-2 transition-all cursor-pointer"
                    >
                      <span>ANALYZE FULL 500-PAGE PDF</span>
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* ===================== TAB 2: PRECEDENT RAG ===================== */}
          <TabsContent value="rag">
            <Card className="bg-zinc-950/80 border-white/12 rounded-2xl overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.95)] backdrop-blur-2xl mb-16">
              {/* Search Header */}
              <div className="p-6 sm:p-8 bg-zinc-900/60 border-b border-white/10 flex flex-col gap-4">
                <div className="flex items-center gap-3 bg-black/80 border border-white/20 rounded-full px-4 py-2 focus-within:border-white transition-colors">
                  <Search size={18} className="text-zinc-400 shrink-0" />
                  <input
                    type="text"
                    value={ragQuery}
                    onChange={(e) => setRagQuery(e.target.value)}
                    placeholder="Enter natural language legal query or proposition of law..."
                    className="w-full bg-transparent border-none outline-none text-white text-sm placeholder:text-zinc-600"
                  />
                  <Button size="sm" className="bg-white text-black hover:bg-zinc-200 rounded-full px-5">
                    Search
                  </Button>
                </div>

                {/* Sample Proposition Chips */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono text-[11px] text-zinc-500">SAMPLE PROPOSITIONS:</span>
                  {ragQueries.map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setRagQuery(item.query)}
                      className={`px-3 py-1 rounded-full text-xs transition-colors cursor-pointer ${
                        ragQuery === item.query 
                          ? 'bg-white text-black font-medium' 
                          : 'bg-white/5 border border-white/10 text-zinc-300 hover:text-white'
                      }`}
                    >
                      {item.query.substring(0, 42)}...
                    </button>
                  ))}
                </div>
              </div>

              {/* Retrieval Results Grid */}
              <div className="p-6 sm:p-8">
                <div className="flex justify-between items-center text-xs font-mono text-zinc-500 mb-5">
                  <span>RETRIEVED 2 RELEVANT PRECEDENTS ACROSS 15,000+ INDEXED JUDGMENTS</span>
                  <span>WEAVIATE HYBRID VECTORS</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {currentRag.results.map((res, idx) => (
                    <div 
                      key={idx} 
                      className="p-5 rounded-xl bg-zinc-900/40 border border-white/10 flex flex-col justify-between gap-4 hover:border-white/30 transition-colors"
                    >
                      <div className="flex justify-between items-start gap-3">
                        <div>
                          <h4 className="text-base font-bold text-white font-display mb-1">{res.caseName}</h4>
                          <div className="text-xs text-zinc-400 font-mono">{res.citation} • {res.court}</div>
                        </div>
                        <div className="text-right bg-white/5 border border-white/15 px-2 py-1 rounded">
                          <div className="text-sm font-bold text-white font-mono">
                            {(parseFloat(res.similarity) * 100).toFixed(1)}%
                          </div>
                          <div className="text-[9px] text-zinc-500 font-mono">SIMILARITY</div>
                        </div>
                      </div>

                      <p className="text-sm italic text-zinc-300 leading-relaxed">
                        "{res.snippet}"
                      </p>

                      <div className="flex justify-between items-center pt-3 border-t border-white/10 text-xs">
                        <span className="font-mono text-zinc-500 text-[11px]">VERIFIED CITATION</span>
                        <button
                          type="button"
                          onClick={() => onOpenAuth('signin')}
                          className="inline-flex items-center gap-1 text-white font-mono hover:gap-2 transition-all cursor-pointer text-xs"
                        >
                          VIEW BENCH ORDER <ChevronRight size={13} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Feature Highlights Trio */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="features">
          <Card className="p-8 bg-zinc-950/60 border-white/10 backdrop-blur-xl flex flex-col gap-4">
            <div className="w-11 h-11 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center text-white">
              <FileText size={22} />
            </div>
            <h4 className="text-xl font-bold text-white font-display">Automated Summarization</h4>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Upload multi-hundred-page Indian court petitions or final orders. Powered by our 
              FastAPI backend and high-throughput Groq LLM inference, receive structured 5-part briefs in seconds.
            </p>
          </Card>

          <Card className="p-8 bg-zinc-950/60 border-white/10 backdrop-blur-xl flex flex-col gap-4">
            <div className="w-11 h-11 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center text-white">
              <Search size={22} />
            </div>
            <h4 className="text-xl font-bold text-white font-display">Semantic Precedent Search</h4>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Query complex legal propositions naturally. Our Weaviate vector engine matches concepts, 
              statutory provisions, and judicial reasoning beyond simple keyword matching.
            </p>
          </Card>

          <Card className="p-8 bg-zinc-950/60 border-white/10 backdrop-blur-xl flex flex-col gap-4">
            <div className="w-11 h-11 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center text-white">
              <BookOpen size={22} />
            </div>
            <h4 className="text-xl font-bold text-white font-display">Verifiable Bench Citations</h4>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Every synthesized point links directly to verified paragraphs from the Supreme Court 
              and High Courts of India, eliminating AI hallucinations and streamlining court filings.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
}
