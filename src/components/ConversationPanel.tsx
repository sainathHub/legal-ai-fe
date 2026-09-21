'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  Sparkles, Scale, BookOpen, MessageSquare, Trash2, Plus,
  SendHorizonal, Loader2, Copy, Check, ChevronRight, FileText,
  Lightbulb, Bot, History, ChevronDown, Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import CitationsDialog from '@/components/CitationsDialog';
import { ConversationMessage, Thread, VectorSearchResultItem } from '@/lib/api/types';

interface ConversationPanelProps {
  messages: ConversationMessage[];
  isStreaming: boolean;
  streamingStatus?: string;
  onSendMessage: (text: string) => void;
  onClearConversation: () => void;
  onNewConversation: () => void;
  threadTitle?: string;
  searchMode?: string;
  threads?: Thread[];
  activeThreadId?: string | null;
  onSelectThread?: (threadId: string) => void;
  loadingMessages?: boolean;
}

function formatInline(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-black">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
    .replace(/`([^`]+)`/g, '<code class="bg-zinc-100 text-zinc-900 px-1 py-0.5 rounded text-[11px] font-mono border border-black/10">$1</code>');
}

function FormattedOpinion({ text }: { text: string }) {
  const lines = text.split('\n');
  return (
    <div className="text-zinc-800 font-sans">
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        if (!trimmed) return <div key={idx} className="h-2" />;

        const isHeader =
          trimmed.startsWith('###') ||
          trimmed.startsWith('##') ||
          trimmed.startsWith('#') ||
          /^(?:[-*]\s*)?[📋🏛️⚖️💡]\s*\*\*/.test(trimmed);

        if (isHeader) {
          const rawHeader = trimmed
            .replace(/^#+\s*/, '')
            .replace(/^[-*]\s*/, '')
            .trim();
          let iconEl = <FileText size={14} className="text-zinc-600 shrink-0" />;
          let border = 'border-black/15 bg-zinc-50';

          if (rawHeader.includes('📋') || /opinion|summary/i.test(rawHeader)) {
            iconEl = <Sparkles size={14} className="text-indigo-600 shrink-0" />;
            border = 'border-indigo-200 bg-indigo-50/60';
          } else if (rawHeader.includes('🏛️') || /precedent|ratio/i.test(rawHeader)) {
            iconEl = <BookOpen size={14} className="text-emerald-700 shrink-0" />;
            border = 'border-emerald-200 bg-emerald-50/60';
          } else if (rawHeader.includes('⚖️') || /statutory|provisions/i.test(rawHeader)) {
            iconEl = <Scale size={14} className="text-amber-700 shrink-0" />;
            border = 'border-amber-200 bg-amber-50/60';
          } else if (rawHeader.includes('💡') || /strategic|steps|advice/i.test(rawHeader)) {
            iconEl = <Lightbulb size={14} className="text-blue-700 shrink-0" />;
            border = 'border-blue-200 bg-blue-50/60';
          }
          return (
            <div key={idx} className={`mt-4 mb-2 p-2.5 rounded-lg border flex items-center gap-2 text-xs font-bold font-display text-black ${border}`}>
              {iconEl}
              <span dangerouslySetInnerHTML={{ __html: formatInline(rawHeader) }} />
            </div>
          );
        }

        if (trimmed.startsWith('- ') || trimmed.startsWith('* ') || /^\d+\.\s/.test(trimmed)) {
          const bulletText = trimmed.replace(/^[-*]\s+|\d+\.\s+/, '');
          return (
            <div key={idx} className="flex items-start gap-2 my-1 pl-1 text-[12px] leading-relaxed text-zinc-700">
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 mt-1.5 shrink-0" />
              <span dangerouslySetInnerHTML={{ __html: formatInline(bulletText) }} />
            </div>
          );
        }

        return (
          <p
            key={idx}
            className="my-1.5 text-[12px] leading-relaxed text-zinc-700"
            dangerouslySetInnerHTML={{ __html: formatInline(trimmed) }}
          />
        );
      })}
    </div>
  );
}

function MessageBubble({
  message,
  searchMode,
  streamingStatus,
}: {
  message: ConversationMessage;
  searchMode?: string;
  streamingStatus?: string;
}) {
  const [citationsOpen, setCitationsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (message.role === 'user') {
    return (
      <div className="flex justify-end gap-2 group">
        <div className="max-w-[80%]">
          {message.standalone_query && message.standalone_query !== message.content && (
            <div className="flex justify-end mb-1">
              <div className="flex items-center gap-1.5 bg-indigo-50 border border-indigo-200 rounded-full px-2.5 py-1 text-[10px] font-mono text-indigo-700">
                <ChevronRight size={10} />
                <span className="italic">Contextualized: &quot;{message.standalone_query}&quot;</span>
              </div>
            </div>
          )}
          <div className="bg-black text-white rounded-2xl rounded-tr-md px-4 py-3 text-xs font-medium leading-relaxed shadow-sm">
            {message.content}
          </div>
          <div className="flex justify-end mt-1 text-[10px] font-mono text-zinc-400">
            {new Date(message.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
        <div className="w-7 h-7 rounded-full bg-zinc-900 text-white flex items-center justify-center shrink-0 mt-1">
          <MessageSquare size={12} />
        </div>
      </div>
    );
  }

  const hasPrecedents = (message.precedents?.length ?? 0) > 0;
  return (
    <div className="flex gap-2 group">
      <div className="w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0 mt-1">
        <Bot size={12} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="bg-white border border-black/10 rounded-2xl rounded-tl-md px-4 py-4 shadow-sm">
          <div className="flex items-center justify-between mb-3 pb-2.5 border-b border-black/8 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <Badge className="bg-black text-white text-[9px] font-mono py-0 px-2 gap-1">
                <Sparkles size={9} className="text-amber-300" />
                JUDICIAL ADVISORY
              </Badge>
              {message.execution_time_ms !== undefined && (
                <span className="text-[10px] font-mono text-zinc-400">
                  {message.execution_time_ms.toFixed(0)} ms
                </span>
              )}
            </div>
            <div className="flex items-center gap-1.5">
              {hasPrecedents && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCitationsOpen(true)}
                  className="h-6 text-[10px] border-emerald-300 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 font-semibold gap-1 px-2"
                >
                  <BookOpen size={10} className="text-emerald-700" />
                  <span>Citations ({message.precedents!.length})</span>
                </Button>
              )}
              <button
                onClick={handleCopy}
                className="h-6 px-2 text-[10px] border border-black/10 rounded-md text-zinc-500 hover:text-black hover:bg-zinc-50 transition-colors flex items-center gap-1"
                title="Copy opinion"
              >
                {copied ? <Check size={10} className="text-emerald-600" /> : <Copy size={10} />}
              </button>
            </div>
          </div>
          {message.isStreaming && !message.content ? (
            <div className="flex items-center gap-2.5 py-4 text-zinc-600">
              <Loader2 size={14} className="animate-spin text-indigo-600 shrink-0" />
              <span className="text-xs font-mono">{streamingStatus || 'Synthesizing judicial opinion…'}</span>
            </div>
          ) : !message.content && !message.isStreaming ? (
            <div className="py-3 px-3 rounded-lg bg-zinc-50 border border-black/10 text-zinc-500 text-xs italic font-mono flex items-center gap-2">
              <Sparkles size={14} className="text-zinc-400 shrink-0" />
              <span>No opinion content received from advisory engine. Please try submitting again.</span>
            </div>
          ) : (
            <FormattedOpinion text={message.content} />
          )}
          {message.isStreaming && message.content && (
            <span className="inline-block w-1 h-3.5 bg-indigo-600 rounded animate-pulse ml-0.5" />
          )}
        </div>
        <div className="flex items-center gap-2 mt-1 text-[10px] font-mono text-zinc-400">
          <span>{new Date(message.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          {message.tokens_used && <span>• {message.tokens_used} tokens</span>}
        </div>
      </div>
      {hasPrecedents && (
        <CitationsDialog
          open={citationsOpen}
          onOpenChange={setCitationsOpen}
          precedents={message.precedents as VectorSearchResultItem[]}
          searchMode={searchMode}
          query={message.standalone_query ?? undefined}
        />
      )}
    </div>
  );
}

export default function ConversationPanel({
  messages,
  isStreaming,
  streamingStatus,
  onSendMessage,
  onClearConversation,
  onNewConversation,
  threadTitle,
  searchMode = 'hybrid',
  threads = [],
  activeThreadId,
  onSelectThread,
  loadingMessages = false,
}: ConversationPanelProps) {
  const [inputText, setInputText] = useState('');
  const [sessionsOpen, setSessionsOpen] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setSessionsOpen(false);
      }
    }
    if (sessionsOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [sessionsOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isStreaming]);

  const handleSubmit = () => {
    const text = inputText.trim();
    if (!text || isStreaming) return;
    setInputText('');
    onSendMessage(text);
    if (textareaRef.current) textareaRef.current.style.height = 'auto';
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
    const el = e.target;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
  };

  const hasMessages = messages.length > 0;

  return (
    <div
      className="flex flex-col bg-white border border-black/10 rounded-2xl shadow-sm overflow-hidden"
      style={{ height: 'calc(100vh - 280px)', minHeight: '520px' }}
    >
      {/* Header with Interactive Thread Selector */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-black/10 bg-white shrink-0 relative">
        <div className="flex items-center gap-2.5 min-w-0" ref={dropdownRef}>
          <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0">
            <MessageSquare size={14} />
          </div>

          <div className="relative min-w-0">
            <button
              type="button"
              onClick={() => setSessionsOpen(!sessionsOpen)}
              className="flex items-center gap-1.5 text-left hover:bg-zinc-50 px-2 py-1 -ml-2 rounded-lg transition-colors group cursor-pointer max-w-full"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <p className="text-xs font-bold font-display uppercase tracking-wider text-black truncate max-w-[200px] sm:max-w-[320px]">
                    {threadTitle || 'Research Session'}
                  </p>
                  <ChevronDown
                    size={12}
                    className={`text-zinc-400 group-hover:text-black transition-transform shrink-0 ${
                      sessionsOpen ? 'rotate-180' : ''
                    }`}
                  />
                </div>
                <p className="text-[10px] font-mono text-zinc-400">
                  {hasMessages
                    ? `${messages.length} turn${messages.length !== 1 ? 's' : ''}`
                    : 'Ask a legal question to begin'}{' '}
                  • {threads && threads.length > 0 ? `${threads.length} saved session${threads.length !== 1 ? 's' : ''}` : 'PostgreSQL synced'}
                </p>
              </div>
            </button>

            {/* Sessions Dropdown Menu */}
            {sessionsOpen && (
              <div className="absolute top-full left-0 mt-1.5 w-84 max-w-[90vw] bg-white border border-black/15 rounded-xl shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95">
                <div className="p-3 border-b border-black/10 bg-zinc-50 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[11px] font-mono font-semibold text-zinc-700">
                    <History size={13} className="text-indigo-600" />
                    <span>Saved Research Sessions</span>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      setSessionsOpen(false);
                      onNewConversation();
                    }}
                    className="h-6 px-2 text-[10px] font-mono text-indigo-700 hover:bg-indigo-50 gap-1"
                  >
                    <Plus size={10} />
                    <span>New</span>
                  </Button>
                </div>

                <div className="max-h-64 overflow-y-auto p-1.5 space-y-1">
                  {threads && threads.length > 0 ? (
                    threads.map((thr) => {
                      const isActive = thr.id === activeThreadId;
                      return (
                        <button
                          key={thr.id}
                          onClick={() => {
                            setSessionsOpen(false);
                            onSelectThread?.(thr.id);
                          }}
                          className={`w-full text-left p-2 rounded-lg text-xs transition-colors flex items-center justify-between gap-2 cursor-pointer ${
                            isActive
                              ? 'bg-indigo-50 border border-indigo-200/80 text-indigo-950 font-semibold'
                              : 'hover:bg-zinc-50 text-zinc-800'
                          }`}
                        >
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-xs">{thr.title}</p>
                            <p className="text-[10px] font-mono text-zinc-400 mt-0.5 flex items-center gap-1">
                              <Clock size={9} />
                              {new Date(thr.created_at).toLocaleDateString([], {
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </p>
                          </div>
                          {isActive && <Check size={14} className="text-indigo-600 shrink-0" />}
                        </button>
                      );
                    })
                  ) : (
                    <div className="p-4 text-center text-zinc-400 text-xs font-mono">
                      No saved threads yet.
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {threads && threads.length > 1 && (
            <button
              type="button"
              onClick={() => setSessionsOpen(!sessionsOpen)}
              className="h-7 px-2 text-[11px] font-mono border border-black/10 rounded-lg text-zinc-600 hover:text-black hover:bg-zinc-50 flex items-center gap-1 cursor-pointer transition-colors"
              title="View all saved research sessions"
            >
              <History size={12} className="text-indigo-600" />
              <span className="hidden sm:inline">Sessions</span>
              <span className="bg-zinc-100 text-zinc-700 px-1.5 py-0.5 rounded-full text-[9px] font-bold">
                {threads.length}
              </span>
            </button>
          )}

          {hasMessages && (
            <Button
              variant="outline"
              size="sm"
              onClick={onClearConversation}
              className="h-7 text-[11px] border-red-200 text-red-600 hover:bg-red-50 gap-1 px-2.5"
              title="Clear all messages in this conversation"
            >
              <Trash2 size={11} />
              <span className="hidden sm:inline">Clear</span>
            </Button>
          )}

          <Button
            variant="outline"
            size="sm"
            onClick={onNewConversation}
            className="h-7 text-[11px] border-black/15 text-zinc-700 hover:text-black gap-1 px-2.5"
            title="Start a fresh conversation"
          >
            <Plus size={11} />
            <span>New Session</span>
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-5 py-5 space-y-5 scroll-smooth">
        {loadingMessages && (
          <div className="flex flex-col items-center justify-center h-full text-center gap-3 py-16">
            <Loader2 size={24} className="animate-spin text-indigo-600" />
            <span className="text-xs font-mono text-zinc-500">
              Loading conversation history from PostgreSQL…
            </span>
          </div>
        )}

        {!loadingMessages && !hasMessages && !isStreaming && (
          <div className="flex flex-col items-center justify-center h-full text-center gap-4 py-12">
            <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center">
              <Scale size={26} className="text-indigo-400" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-black font-display uppercase tracking-wide mb-1">
                JURIS.AI Research Assistant
              </h3>
              <p className="text-xs text-zinc-500 max-w-sm leading-relaxed">
                Ask any legal question to receive an AI-synthesized judicial advisory opinion backed by 22,500+ Indian court precedents. Ask follow-up questions to refine and deepen the analysis.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-md mt-2">
              {[
                'What are the principles for anticipatory bail under Section 438 CrPC?',
                'Can bail conditions be modified after first appearance?',
                'Scope of Article 21 in digital surveillance cases?',
                'Grounds for quashing an FIR under Section 482 CrPC',
              ].map((suggestion, i) => (
                <button
                  key={i}
                  onClick={() => onSendMessage(suggestion)}
                  className="text-left text-[11px] bg-zinc-50 border border-black/10 px-3 py-2 rounded-lg text-zinc-700 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-900 transition-all leading-relaxed cursor-pointer"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        {!loadingMessages &&
          messages.map((msg) => (
            <MessageBubble
              key={msg.id}
              message={msg}
              searchMode={searchMode}
              streamingStatus={streamingStatus}
            />
          ))}

        {/* Streaming status indicator before first token arrives */}
        {isStreaming && streamingStatus && messages[messages.length - 1]?.role === 'user' && (
          <div className="flex gap-2">
            <div className="w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0 mt-1">
              <Bot size={12} />
            </div>
            <div className="bg-white border border-black/10 rounded-2xl rounded-tl-md px-4 py-3 shadow-sm flex items-center gap-2.5">
              <Loader2 size={13} className="animate-spin text-indigo-500" />
              <span className="text-[11px] font-mono text-zinc-500">{streamingStatus}</span>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input Bar */}
      <div className="shrink-0 border-t border-black/10 px-4 py-3 bg-zinc-50/60">
        <div className="flex items-end gap-3 bg-white border border-black/15 rounded-xl px-3.5 py-2.5 shadow-xs focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
          <textarea
            ref={textareaRef}
            value={inputText}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            rows={1}
            placeholder={
              hasMessages
                ? 'Ask a follow-up question… (Enter to send, Shift+Enter for newline)'
                : 'Type your legal question… (Enter to send)'
            }
            disabled={isStreaming}
            className="flex-1 resize-none bg-transparent text-xs text-zinc-900 placeholder:text-zinc-400 focus:outline-none leading-relaxed disabled:opacity-50 min-h-[20px]"
            style={{ maxHeight: '160px', overflowY: 'auto' }}
          />
          <Button
            onClick={handleSubmit}
            disabled={!inputText.trim() || isStreaming}
            className="h-8 w-8 p-0 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shrink-0 disabled:opacity-40 transition-all"
            title="Send (Enter)"
          >
            {isStreaming ? (
              <Loader2 size={13} className="animate-spin" />
            ) : (
              <SendHorizonal size={13} />
            )}
          </Button>
        </div>
        <p className="text-[10px] font-mono text-zinc-400 mt-1.5 pl-1">
          Powered by Groq · Qwen 3.8-27B · 22,500+ Indian court precedents
        </p>
      </div>
    </div>
  );
}
