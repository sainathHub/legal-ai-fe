'use client';

import React, { useState } from 'react';
import { Copy, Check, Printer, Sparkles, BookOpen, Scale, Lightbulb, FileText, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { VectorSearchResultItem } from '@/lib/api/types';
import CitationsDialog from '@/components/CitationsDialog';

interface LegalOpinionViewerProps {
  answer: string;
  query: string;
  modelUsed?: string;
  executionTimeMs?: number;
  searchModeUsed?: string;
  precedents?: VectorSearchResultItem[];
  onSaveToThread?: (opinionText: string) => void;
}

export default function LegalOpinionViewer({
  answer,
  query,
  modelUsed = 'qwen/qwen3.8-27b',
  executionTimeMs,
  searchModeUsed = 'hybrid',
  precedents = [],
  onSaveToThread,
}: LegalOpinionViewerProps) {
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const [citationsOpen, setCitationsOpen] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(`LEGAL ADVISORY OPINION\nQuery: ${query}\n\n${answer}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    if (onSaveToThread) {
      onSaveToThread(answer);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // Helper to parse sections or lines from markdown
  const parseFormattedText = (rawText: string) => {
    const lines = rawText.split('\n');
    return lines.map((line, idx) => {
      const trimmed = line.trim();

      if (!trimmed) {
        return <div key={idx} className="h-2" />;
      }

      // Main Section Headers (e.g. ### 📋 Direct Legal Opinion, etc.)
      if (trimmed.startsWith('###') || trimmed.startsWith('##') || trimmed.startsWith('#')) {
        const headerText = trimmed.replace(/^#+\s*/, '');
        let icon = <FileText size={16} className="text-zinc-700" />;
        let borderColor = 'border-black/20 bg-zinc-50';

        if (headerText.includes('📋') || headerText.toLowerCase().includes('opinion') || headerText.toLowerCase().includes('summary')) {
          icon = <Sparkles size={16} className="text-indigo-600" />;
          borderColor = 'border-indigo-200 bg-indigo-50/50';
        } else if (headerText.includes('🏛️') || headerText.toLowerCase().includes('precedent') || headerText.toLowerCase().includes('ratio')) {
          icon = <BookOpen size={16} className="text-emerald-700" />;
          borderColor = 'border-emerald-200 bg-emerald-50/50';
        } else if (headerText.includes('⚖️') || headerText.toLowerCase().includes('statutory') || headerText.toLowerCase().includes('provisions')) {
          icon = <Scale size={16} className="text-amber-700" />;
          borderColor = 'border-amber-200 bg-amber-50/50';
        } else if (headerText.includes('💡') || headerText.toLowerCase().includes('strategic') || headerText.toLowerCase().includes('steps')) {
          icon = <Lightbulb size={16} className="text-blue-700" />;
          borderColor = 'border-blue-200 bg-blue-50/50';
        }

        return (
          <div key={idx} className={`mt-5 mb-2.5 p-2.5 rounded-xl border flex items-center gap-2 font-display text-sm font-bold text-black ${borderColor}`}>
            {icon}
            <span>{headerText}</span>
          </div>
        );
      }

      // Bullet points
      if (trimmed.startsWith('- ') || trimmed.startsWith('* ') || /^\d+\.\s/.test(trimmed)) {
        const bulletText = trimmed.replace(/^[-*]\s+|\d+\.\s+/, '');
        return (
          <div key={idx} className="flex items-start gap-2.5 my-1.5 pl-2 text-xs sm:text-[13px] leading-relaxed text-zinc-800">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-900 mt-2 shrink-0" />
            <span dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(bulletText) }} />
          </div>
        );
      }

      // Regular paragraph
      return (
        <p 
          key={idx} 
          className="my-1.5 text-xs sm:text-[13px] leading-relaxed text-zinc-700 font-sans"
          dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(trimmed) }}
        />
      );
    });
  };

  // Minimal inline markdown parser for bold, italics, code
  const formatInlineMarkdown = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-black">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
      .replace(/`([^`]+)`/g, '<code class="bg-zinc-100 text-zinc-900 px-1 py-0.5 rounded text-[11px] font-mono border border-black/10">$1</code>');
  };

  return (
    <div className="bg-white border border-black/10 rounded-2xl p-6 shadow-xs flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-2">
      {/* Header bar of the opinion */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-black/10 gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <Badge className="bg-black text-white text-[11px] font-mono py-0.5 px-2.5 gap-1.5">
            <Sparkles size={12} className="text-amber-300" />
            <span>JUDICIAL ADVISORY OPINION</span>
          </Badge>
          <Badge variant="outline" className="text-[10px] font-mono border-black/15 bg-zinc-50 text-zinc-700">
            Model: {modelUsed}
          </Badge>
          {executionTimeMs !== undefined && (
            <span className="text-[11px] font-mono text-zinc-500">
              Generated in {executionTimeMs} ms
            </span>
          )}
          {searchModeUsed && (
            <span className="text-[11px] font-mono text-zinc-500 hidden md:inline">
              • Strategy: {searchModeUsed}
            </span>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 shrink-0 flex-wrap">
          {/* Pop-up Citations Button */}
          {precedents && precedents.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCitationsOpen(true)}
              className="text-xs h-8 border-emerald-300 bg-emerald-50/70 hover:bg-emerald-100/80 text-emerald-900 font-semibold gap-1.5 cursor-pointer shadow-xs"
            >
              <BookOpen size={13} className="text-emerald-700" />
              <span>Citations ({precedents.length})</span>
            </Button>
          )}

          {onSaveToThread && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleSave}
              className="text-xs h-8 border-black/15 text-zinc-700 hover:text-black gap-1.5"
            >
              {saved ? (
                <>
                  <CheckCircle2 size={13} className="text-emerald-600" />
                  <span>Pinned</span>
                </>
              ) : (
                <>
                  <FileText size={13} />
                  <span>Pin to Case</span>
                </>
              )}
            </Button>
          )}

          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            className="text-xs h-8 border-black/15 text-zinc-700 hover:text-black gap-1.5"
          >
            {copied ? (
              <>
                <Check size={13} className="text-emerald-600" />
                <span>Copied Brief</span>
              </>
            ) : (
              <>
                <Copy size={13} />
                <span>Copy Brief</span>
              </>
            )}
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={handlePrint}
            className="text-xs h-8 text-zinc-600 hover:text-black"
            title="Print Legal Brief"
          >
            <Printer size={14} />
          </Button>
        </div>
      </div>

      {/* Query Banner */}
      <div className="bg-zinc-50 border border-black/5 rounded-xl p-3.5 flex items-start gap-2.5">
        <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 shrink-0 mt-0.5">
          Inquiry:
        </span>
        <span className="text-xs font-semibold text-zinc-900 leading-snug font-serif">
          &ldquo;{query}&rdquo;
        </span>
      </div>

      {/* Rendered Advisory Content */}
      <div className="py-2 text-zinc-800 font-sans">
        {parseFormattedText(answer)}
      </div>

      {/* Footer disclaimers & verification */}
      <div className="pt-3 border-t border-black/10 flex flex-col sm:flex-row items-center justify-between text-[10px] font-mono text-zinc-400 gap-2">
        <span>AI-assisted synthesis over Indian Supreme Court & High Court precedents. Always verify citations before court filing.</span>
        <span className="shrink-0 text-zinc-500">JURIS.AI • Neural Legal Intelligence</span>
      </div>

      {/* Citations Popup Dialog */}
      <CitationsDialog
        open={citationsOpen}
        onOpenChange={setCitationsOpen}
        precedents={precedents}
        searchMode={searchModeUsed}
        query={query}
      />
    </div>
  );
}
