'use client';

import React, { useState } from 'react';
import { BookOpen, ExternalLink, Copy, Check, Scale } from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { VectorSearchResultItem } from '@/lib/api/types';

interface CitationsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  precedents: VectorSearchResultItem[];
  searchMode?: string;
  query?: string;
}

export default function CitationsDialog({
  open,
  onOpenChange,
  precedents,
  searchMode = 'hybrid',
  query,
}: CitationsDialogProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl max-h-[88vh] bg-white border-black/15 text-black p-6 rounded-2xl shadow-[0_30px_70px_rgba(0,0,0,0.2)] flex flex-col gap-4 overflow-hidden">
        <DialogHeader className="flex flex-col gap-1 pb-3 border-b border-black/10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center shrink-0">
              <BookOpen size={16} />
            </div>
            <div>
              <DialogTitle className="text-base font-bold uppercase tracking-wide text-black font-display flex items-center gap-2">
                <span>CITED LANDMARK PRECEDENTS & EXTRACTS</span>
                <Badge className="bg-black text-white text-[10px] font-mono">
                  {precedents.length} CITATIONS
                </Badge>
              </DialogTitle>
              <DialogDescription className="text-zinc-500 text-xs mt-0.5">
                Authoritative Indian Supreme Court and High Court rulings retrieved from Weaviate Cloud ({searchMode}).
              </DialogDescription>
            </div>
          </div>

          {query && (
            <div className="mt-2 px-3 py-2 rounded-lg bg-zinc-50 border border-black/5 text-xs text-zinc-700 truncate font-serif">
              <span className="font-mono text-[10px] uppercase text-zinc-500 mr-1.5">Query:</span>
              &ldquo;{query}&rdquo;
            </div>
          )}
        </DialogHeader>

        {/* Scrollable list of precedent citations */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-4 max-h-[calc(88vh-200px)]">
          {precedents.length === 0 ? (
            <div className="py-12 text-center text-zinc-500 text-xs flex flex-col items-center justify-center gap-2">
              <Scale size={28} className="text-zinc-400" />
              <span>No precedent citations available for this query.</span>
            </div>
          ) : (
            precedents.map((item, index) => {
              const title = item.title || item.metadata?.case_title || 'Supreme Court / High Court Ruling';
              const court = item.metadata?.court_name || 'Apex Court of India';
              const date = item.metadata?.decision_date || item.metadata?.year || 'Precedent Archive';
              const sourceUrl = item.metadata?.source_url as string | undefined;
              const excerpt = item.content || item.title || (item.metadata && Object.keys(item.metadata).length > 0 ? JSON.stringify(item.metadata, null, 2) : `Precedent judgment chunk (${item.id}) indexed in Weaviate Cloud.`);

              return (
                <Card 
                  key={item.id || index} 
                  className="p-4 sm:p-5 bg-white border border-black/10 rounded-xl shadow-2xs hover:border-black/30 transition-all flex flex-col gap-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2.5">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <Badge className="bg-black text-white text-[10px] font-mono">
                          PRECEDENT #{index + 1}
                        </Badge>
                        {item.score !== undefined && item.score !== null && (
                          <Badge variant="outline" className="text-[10px] font-mono border-emerald-300 bg-emerald-50 text-emerald-800">
                            Score: {item.score.toFixed(4)}
                          </Badge>
                        )}
                        <span className="text-[11px] font-mono text-zinc-500 truncate">
                          {court} • {date}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-black font-display leading-snug">
                        {title}
                      </h4>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                      {sourceUrl && (
                        <a
                          href={sourceUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 border border-black/10 rounded-lg text-zinc-600 hover:text-black hover:bg-zinc-50 transition-colors"
                          title="Open Indian Kanoon Source"
                        >
                          <ExternalLink size={13} />
                        </a>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleCopy(item.id, excerpt)}
                        className="text-xs h-7 rounded-lg border-black/15 text-zinc-700 hover:text-black gap-1"
                      >
                        {copiedId === item.id ? (
                          <>
                            <Check size={12} className="text-emerald-600" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy size={12} />
                            <span>Excerpt</span>
                          </>
                        )}
                      </Button>
                    </div>
                  </div>

                  {/* Quoted Excerpt */}
                  <div className="bg-zinc-50 rounded-lg p-3 border border-black/5 text-xs text-zinc-800 leading-relaxed font-serif whitespace-pre-line">
                    {excerpt}
                  </div>
                </Card>
              );
            })
          )}
        </div>

        <DialogFooter className="pt-2 border-t border-black/10 flex items-center justify-between">
          <span className="text-[10px] font-mono text-zinc-400">
            Click outside or &ldquo;Done&rdquo; to return to the advisory opinion.
          </span>
          <Button
            size="sm"
            onClick={() => onOpenChange(false)}
            className="bg-black text-white hover:bg-zinc-800 text-xs px-4"
          >
            Done
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
