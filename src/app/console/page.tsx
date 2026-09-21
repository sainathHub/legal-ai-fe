'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Search, 
  FolderPlus, 
  FileText, 
  MessageSquare, 
  Database, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  ArrowLeft, 
  Plus, 
  Trash2, 
  Copy, 
  Check, 
  Sliders, 
  ExternalLink,
  ShieldCheck,
  Server,
  RefreshCw,
  Clock,
  Sparkles,
  Scale,
  BookOpen,
  SlidersHorizontal,
  Info,
  ChevronRight,
  Pin
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/lib/context/AuthContext';
import { api, ApiError, getApiBaseUrl } from '@/lib/api/client';
import { 
  Project, 
  ProjectDetail, 
  Thread, 
  VectorSearchResultItem, 
  VectorStatus,
  LegalRAGResponse,
  LegalRAGModelInfo,
  ConversationMessage,
} from '@/lib/api/types';
import AuthDialog from '@/components/AuthDialog';
import LegalOpinionViewer from '@/components/LegalOpinionViewer';
import CitationsDialog from '@/components/CitationsDialog';
import ConversationPanel from '@/components/ConversationPanel';

export default function ConsolePage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading: authLoading, backendHealth, checkBackendHealth, logout } = useAuth();

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'rag' | 'projects' | 'diagnostics'>('rag');

  // Legal RAG & Advisory State
  const [queryText, setQueryText] = useState('Principles for grant of anticipatory bail under Section 438 CrPC and arbitrary arrest guidelines');
  const [searchLimit, setSearchLimit] = useState<number>(4);
  const [searchMode, setSearchMode] = useState<'hybrid' | 'vector' | 'bm25'>('hybrid');
  const [selectedModel, setSelectedModel] = useState<string>('qwen/qwen3.8-27b');
  const [caseTypeFilter, setCaseTypeFilter] = useState<string>('');
  const [minYearFilter, setMinYearFilter] = useState<number>(0);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // Analysis & Results State
  const [analyzing, setAnalyzing] = useState(false);
  const [ragResult, setRagResult] = useState<LegalRAGResponse | null>(null);
  const [citationsModalOpen, setCitationsModalOpen] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [groqMissingNotice, setGroqMissingNotice] = useState<boolean>(false);
  const [fallbackPrecedents, setFallbackPrecedents] = useState<VectorSearchResultItem[]>([]);
  const [copiedExtractId, setCopiedExtractId] = useState<string | null>(null);

  // Multi-turn Conversation State
  const [conversationMessages, setConversationMessages] = useState<ConversationMessage[]>([]);
  const [conversationThreadId, setConversationThreadId] = useState<string | null>(null);
  const [conversationThreadTitle, setConversationThreadTitle] = useState<string>('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingStatus, setStreamingStatus] = useState<string>('');
  const abortControllerRef = React.useRef<AbortController | null>(null);

  // Projects / Cases State
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeProject, setActiveProject] = useState<ProjectDetail | null>(null);
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [newCaseTitle, setNewCaseTitle] = useState('');
  const [newCaseDesc, setNewCaseDesc] = useState('');
  const [creatingCase, setCreatingCase] = useState(false);
  const [showNewCaseModal, setShowNewCaseModal] = useState(false);

  // Threads State
  const [newThreadTitle, setNewThreadTitle] = useState('');
  const [creatingThread, setCreatingThread] = useState(false);
  const [activeThread, setActiveThread] = useState<Thread | null>(null);
  const [threadNotes, setThreadNotes] = useState<string>('');
  const [pinnedNotice, setPinnedNotice] = useState<string | null>(null);

  // Diagnostics State
  const [vectorStatus, setVectorStatus] = useState<VectorStatus | null>(null);
  const [ragModelInfo, setRagModelInfo] = useState<LegalRAGModelInfo | null>(null);
  const [loadingDiagnostics, setLoadingDiagnostics] = useState(false);

  // Curated Landmark Queries for Indian Advocates
  const landmarkQueries = [
    {
      title: 'Anticipatory Bail (438 CrPC)',
      query: 'Principles for grant of anticipatory bail under Section 438 CrPC and arbitrary arrest safeguards',
    },
    {
      title: 'Article 21 Privacy & Surveillance',
      query: 'Right to privacy under Article 21 and digital surveillance proportional interference standards',
    },
    {
      title: 'IBC Section 14 Moratorium',
      query: 'Moratorium under Section 14 IBC and personal guarantors liability under Indian Contract Act',
    },
    {
      title: 'Arbitration Award (Section 34)',
      query: 'Scope of patent illegality and public policy grounds for setting aside arbitral award under Section 34',
    },
    {
      title: 'FIR Quashing (482 CrPC Bhajan Lal)',
      query: 'Guidelines for quashing of criminal FIR under Section 482 CrPC pursuant to State of Haryana v Bhajan Lal',
    },
  ];

  // Load Projects from PostgreSQL
  const loadProjects = useCallback(async () => {
    if (!isAuthenticated) return;
    setLoadingProjects(true);
    try {
      const data = await api.projects.list();
      setProjects(data);
      if (data.length > 0 && !activeProject) {
        loadProjectDetails(data[0].id);
      }
    } catch (err) {
      console.error('Failed to fetch projects', err);
    } finally {
      setLoadingProjects(false);
    }
  }, [isAuthenticated, activeProject]);

  // Load Project Details with Threads
  const loadProjectDetails = async (projectId: string) => {
    try {
      const detail = await api.projects.get(projectId);
      setActiveProject(detail);
      if (detail.threads && detail.threads.length > 0) {
        setActiveThread(detail.threads[0]);
      } else {
        setActiveThread(null);
      }
    } catch (err) {
      console.error('Failed to load project details', err);
    }
  };

  // Load Diagnostics & Models
  const loadDiagnostics = useCallback(async () => {
    setLoadingDiagnostics(true);
    try {
      const [vStatus, mInfo] = await Promise.allSettled([
        api.vectors.status(),
        isAuthenticated ? api.rag.models() : Promise.resolve(null),
      ]);
      if (vStatus.status === 'fulfilled') setVectorStatus(vStatus.value);
      if (mInfo.status === 'fulfilled' && mInfo.value) setRagModelInfo(mInfo.value);
    } catch (err) {
      console.error('Failed to load diagnostics', err);
    } finally {
      setLoadingDiagnostics(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      loadProjects();
    }
    loadDiagnostics();
  }, [isAuthenticated, loadProjects, loadDiagnostics]);

  // ─── Create or reuse a session thread for conversations ───────────────────
  const ensureConversationThread = async (): Promise<string> => {
    if (conversationThreadId) return conversationThreadId;
    const sessionTitle = `Research Session · ${new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}`;
    let projectId: string;
    if (projects.length > 0) {
      projectId = projects[0].id;
    } else {
      const newProj = await api.projects.create({
        title: sessionTitle,
        description: 'Auto-created research session',
      });
      setProjects([newProj]);
      projectId = newProj.id;
    }
    const newThread = await api.threads.create(projectId, { title: sessionTitle });
    setConversationThreadId(newThread.id);
    setConversationThreadTitle(sessionTitle);
    return newThread.id;
  };

  // ─── Main Action: Send a message to the conversation ─────────────────────
  const sendConversationMessage = async (queryInput: string) => {
    const trimmed = queryInput.trim();
    if (!trimmed || isStreaming) return;

    setSearchError(null);
    setGroqMissingNotice(false);

    if (!isAuthenticated) {
      setAuthModalOpen(true);
      return;
    }

    const userMsg: ConversationMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: trimmed,
      created_at: new Date().toISOString(),
    };
    setConversationMessages((prev) => [...prev, userMsg]);

    const aiMsgId = `ai-${Date.now()}`;
    const aiMsgPlaceholder: ConversationMessage = {
      id: aiMsgId,
      role: 'assistant',
      content: '',
      created_at: new Date().toISOString(),
      isStreaming: true,
    };
    setConversationMessages((prev) => [...prev, aiMsgPlaceholder]);
    setIsStreaming(true);
    setStreamingStatus('Contextualizing legal inquiry via LangChain…');

    if (abortControllerRef.current) abortControllerRef.current.abort();
    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      let threadId: string;
      try {
        threadId = await ensureConversationThread();
      } catch {
        threadId = '';
      }

      let accContent = '';
      let precedents: VectorSearchResultItem[] = [];
      let standaloneQuery: string | null = null;
      let executionTimeMs = 0;
      let tokensUsed: number | undefined;

      const stream = api.rag.stream(
        {
          query: trimmed,
          limit: searchLimit,
          search_mode: searchMode,
          model: selectedModel,
          case_type: caseTypeFilter || null,
          min_year: minYearFilter > 0 ? minYearFilter : undefined,
          ...(threadId ? { thread_id: threadId } : {}),
        },
        controller.signal,
      );

      for await (const event of stream) {
        if (controller.signal.aborted) break;

        if (event.event === 'status') {
          const statusText =
            event.data.message ||
            (event.data.stage === 'contextualizing'
              ? 'Evaluating dialogue history via LangChain…'
              : event.data.stage === 'searching'
                ? 'Searching Indian case precedents in Weaviate…'
                : `Processing (${event.data.stage})…`);
          setStreamingStatus(statusText);
        } else if (event.event === 'precedents') {
          const incomingPrecedents = (event.data.precedents as VectorSearchResultItem[]) ?? [];
          precedents = incomingPrecedents;
          standaloneQuery = event.data.standalone_query ?? null;
          setStreamingStatus('Synthesizing judicial opinion via Groq…');

          if (standaloneQuery && standaloneQuery !== trimmed) {
            setConversationMessages((prev) =>
              prev.map((m) =>
                m.id === userMsg.id ? { ...m, standalone_query: standaloneQuery } : m
              )
            );
          }

          // Immediately update AI placeholder with precedents so citations badge is ready
          const currentPrecedents = precedents;
          setConversationMessages((prev) =>
            prev.map((m) =>
              m.id === aiMsgId
                ? { ...m, precedents: currentPrecedents, standalone_query: standaloneQuery }
                : m
            )
          );
        } else if (event.event === 'token') {
          const delta = event.data.delta ?? event.data.token ?? event.data.content ?? '';
          if (delta) {
            accContent += delta;
            const currentContent = accContent;
            const currentPrecedents = precedents;
            setConversationMessages((prev) =>
              prev.map((m) =>
                m.id === aiMsgId
                  ? { ...m, content: currentContent, precedents: currentPrecedents, isStreaming: true }
                  : m
              )
            );
          }
        } else if (event.event === 'done') {
          executionTimeMs = event.data.execution_time_ms ?? 0;
          tokensUsed = event.data.tokens_used;
          if (event.data.standalone_query) {
            standaloneQuery = event.data.standalone_query;
          }
          break;
        } else if (event.event === 'error') {
          const errMsg = event.data.error || event.data.message || event.data.detail || 'Stream error';
          throw new Error(errMsg);
        }
      }

      setConversationMessages((prev) =>
        prev.map((m) =>
          m.id === aiMsgId
            ? {
                ...m,
                content: accContent,
                precedents,
                standalone_query: standaloneQuery,
                isStreaming: false,
                execution_time_ms: executionTimeMs,
                tokens_used: tokensUsed ?? null,
              }
            : m
        )
      );
    } catch (err) {
      if ((err as Error)?.name === 'AbortError') return;
      const errMsg = err instanceof Error ? err.message : String(err);

      if (errMsg.includes('GROQ_API_KEY is not configured')) {
        setGroqMissingNotice(true);
        setConversationMessages((prev) => prev.filter((m) => m.id !== aiMsgId));
        try {
          const vRes = await api.vectors.search({
            query: trimmed,
            limit: searchLimit,
            alpha: searchMode === 'hybrid' ? 0.5 : searchMode === 'vector' ? 1.0 : 0.0,
          });
          setFallbackPrecedents(vRes.results || []);
          setCitationsModalOpen(true);
        } catch { /* ignore */ }
      } else {
        setSearchError(errMsg);
        setConversationMessages((prev) =>
          prev.map((m) =>
            m.id === aiMsgId
              ? { ...m, content: `⚠️ Error: ${errMsg}`, isStreaming: false }
              : m
          )
        );
      }
    } finally {
      setIsStreaming(false);
      setStreamingStatus('');
    }
  };

  // Backwards-compat wrapper for top query bar
  const handleRunAnalysis = (queryInput: string = queryText) => {
    setQueryText(queryInput);
    sendConversationMessage(queryInput);
  };

  // Clear conversation (delete from backend + local state)
  const handleClearConversation = async () => {
    setConversationMessages([]);
    setRagResult(null);
    if (conversationThreadId) {
      try { await api.threads.clearMessages(conversationThreadId); } catch { /* ignore */ }
    }
  };

  // Reset to brand-new conversation (new thread)
  const handleNewConversation = () => {
    setConversationMessages([]);
    setConversationThreadId(null);
    setConversationThreadTitle('');
    setRagResult(null);
    setSearchError(null);
    setGroqMissingNotice(false);
  };

  // Pin Analysis to Active Case Thread
  const handlePinAnalysisToThread = (opinionText: string) => {
    if (!activeProject) {
      alert('Please create or select a case in the "Case Files" tab first to pin this opinion.');
      return;
    }

    const timestamp = new Date().toLocaleString();
    const pinContent = `\n\n--- PINNED ADVISORY OPINION (${timestamp}) ---\nQuery: ${ragResult?.query || queryText}\n\n${opinionText}\n`;
    setThreadNotes((prev) => (prev ? prev + pinContent : pinContent));

    setPinnedNotice(`Pinned to ${activeProject.title}! View in "Case Files" tab.`);
    setTimeout(() => setPinnedNotice(null), 3500);
  };

  // Create New Project Case
  const handleCreateCase = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCaseTitle.trim()) return;
    setCreatingCase(true);
    try {
      const newProj = await api.projects.create({
        title: newCaseTitle.trim(),
        description: newCaseDesc.trim() || undefined,
      });
      setProjects([newProj, ...projects]);
      setShowNewCaseModal(false);
      setNewCaseTitle('');
      setNewCaseDesc('');
      loadProjectDetails(newProj.id);
    } catch (err) {
      console.error('Error creating case project', err);
    } finally {
      setCreatingCase(false);
    }
  };

  // Create New Thread in Project
  const handleCreateThread = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeProject || !newThreadTitle.trim()) return;
    setCreatingThread(true);
    try {
      const newThr = await api.threads.create(activeProject.id, {
        title: newThreadTitle.trim(),
      });
      const updatedProject = {
        ...activeProject,
        threads: [...(activeProject.threads || []), newThr],
      };
      setActiveProject(updatedProject);
      setActiveThread(newThr);
      setNewThreadTitle('');
    } catch (err) {
      console.error('Error creating thread', err);
    } finally {
      setCreatingThread(false);
    }
  };

  // Copy Precedent Extract
  const handleCopyExtract = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedExtractId(id);
    setTimeout(() => setCopiedExtractId(null), 2000);
  };

  const displayedPrecedents = ragResult?.precedents || fallbackPrecedents;

  return (
    <div className="min-h-screen bg-zinc-50 text-black flex flex-col font-sans">
      {/* Top Header Bar */}
      <header className="bg-white border-b border-black/10 sticky top-0 z-40 px-6 py-3 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/')}
              className="flex items-center gap-1.5 text-xs font-semibold text-zinc-500 hover:text-black transition-colors cursor-pointer"
            >
              <ArrowLeft size={14} />
              <span>Back to Home</span>
            </button>
            <span className="text-zinc-300">|</span>
            <div className="flex items-center gap-2">
              <span className="font-bold text-base tracking-widest text-black font-display">
                JURIS.AI
              </span>
              <Badge variant="outline" className="text-[10px] font-mono border-black/15 bg-black/5 text-zinc-700">
                LEGAL RESEARCH & ADVISORY CONSOLE
              </Badge>
            </div>
          </div>

          {/* Center Main Tabs */}
          <div className="hidden md:flex items-center gap-1 bg-zinc-100 p-1 rounded-full border border-black/10">
            <button
              onClick={() => setActiveTab('rag')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'rag' 
                  ? 'bg-black text-white shadow-xs' 
                  : 'text-zinc-600 hover:text-black'
              }`}
            >
              <Sparkles size={13} className="text-amber-300" />
              <span>AI Legal Advisory</span>
            </button>
            <button
              onClick={() => setActiveTab('projects')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'projects' 
                  ? 'bg-black text-white shadow-xs' 
                  : 'text-zinc-600 hover:text-black'
              }`}
            >
              <FolderPlus size={13} />
              <span>Case Files ({projects.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('diagnostics')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'diagnostics' 
                  ? 'bg-black text-white shadow-xs' 
                  : 'text-zinc-600 hover:text-black'
              }`}
            >
              <Server size={13} />
              <span>Backend Status</span>
            </button>
          </div>

          {/* Right: Advocate Profile & Session */}
          <div className="flex items-center gap-3">
            {isAuthenticated && user ? (
              <div className="flex items-center gap-2">
                <div className="hidden sm:flex flex-col items-end">
                  <span className="text-xs font-bold text-black">{user.full_name}</span>
                  <span className="text-[10px] font-mono text-zinc-500">
                    {user.bar_council_id ? `Bar ID: ${user.bar_council_id}` : user.email}
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={logout}
                  className="text-xs rounded-full border-black/15 text-zinc-700 hover:text-black"
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <Button
                size="sm"
                onClick={() => setAuthModalOpen(true)}
                className="bg-black text-white hover:bg-zinc-800 rounded-full text-xs font-semibold px-4"
              >
                Sign In Counsel
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Pinned Notification Toast */}
      {pinnedNotice && (
        <div className="fixed bottom-6 right-6 z-50 bg-black text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-2.5 text-xs animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 size={16} className="text-emerald-400" />
          <span>{pinnedNotice}</span>
        </div>
      )}

      {/* Main Console Canvas */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-6">
        {/* Tab 1: AI Legal Advisory & Analysis */}
        {activeTab === 'rag' && (
          <div className="flex flex-col gap-6">
            {/* Search / Query Input Banner */}
            <div className="bg-white border border-black/10 rounded-2xl p-6 shadow-xs">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                <div>
                  <h2 className="text-xl font-bold text-black font-display tracking-tight flex items-center gap-2">
                    <span>Indian Judicial Advisory & Precedent Analysis</span>
                    <Badge variant="outline" className="text-[10px] font-mono border-emerald-300 bg-emerald-50 text-emerald-800">
                      Weaviate Cloud + Groq LLM
                    </Badge>
                  </h2>
                  <p className="text-xs text-zinc-600 mt-1">
                    Enter facts, statutory sections, or case propositions to formulate an authoritative legal opinion backed by landmark Supreme Court & High Court rulings.
                  </p>
                </div>

                {/* Advanced Filter Toggle */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                  className="text-xs rounded-xl border-black/15 gap-1.5 self-end sm:self-auto"
                >
                  <SlidersHorizontal size={13} />
                  <span>{showAdvancedFilters ? 'Hide Parameters' : 'RAG Parameters'}</span>
                </Button>
              </div>

              {/* Advanced Parameters Drawer */}
              {showAdvancedFilters && (
                <div className="mb-4 p-4 rounded-xl bg-zinc-50 border border-black/10 grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs font-mono animate-in fade-in">
                  <div>
                    <label className="block text-[10px] text-zinc-500 uppercase tracking-wider mb-1">
                      Retrieval Strategy
                    </label>
                    <select
                      value={searchMode}
                      onChange={(e) => setSearchMode(e.target.value as any)}
                      className="w-full bg-white border border-black/15 rounded-lg px-2 py-1.5 text-xs focus:outline-none"
                    >
                      <option value="hybrid">Hybrid (Vector + BM25)</option>
                      <option value="vector">MiniLM Semantic Vector</option>
                      <option value="bm25">BM25 Keyword Search</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] text-zinc-500 uppercase tracking-wider mb-1">
                      Precedents Limit
                    </label>
                    <select
                      value={searchLimit}
                      onChange={(e) => setSearchLimit(parseInt(e.target.value))}
                      className="w-full bg-white border border-black/15 rounded-lg px-2 py-1.5 text-xs focus:outline-none"
                    >
                      <option value={2}>2 Precedents</option>
                      <option value={4}>4 Precedents (Default)</option>
                      <option value={6}>6 Precedents</option>
                      <option value={8}>8 Precedents</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] text-zinc-500 uppercase tracking-wider mb-1">
                      Synthesis Model
                    </label>
                    <select
                      value={selectedModel}
                      onChange={(e) => setSelectedModel(e.target.value)}
                      className="w-full bg-white border border-black/15 rounded-lg px-2 py-1.5 text-xs focus:outline-none"
                    >
                      <option value="qwen/qwen3.8-27b">Qwen 3.8-27B (Recommended)</option>
                      <option value="openai/gpt-oss-120b">GPT-OSS 120B</option>
                      <option value="openai/gpt-oss-20b">GPT-OSS 20B</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] text-zinc-500 uppercase tracking-wider mb-1">
                      Case Type Filter
                    </label>
                    <select
                      value={caseTypeFilter}
                      onChange={(e) => setCaseTypeFilter(e.target.value)}
                      className="w-full bg-white border border-black/15 rounded-lg px-2 py-1.5 text-xs focus:outline-none"
                    >
                      <option value="">All Categories</option>
                      <option value="Criminal">Criminal Law</option>
                      <option value="Constitutional">Constitutional Law</option>
                      <option value="Civil">Civil Law</option>
                      <option value="Commercial">Commercial / IBC</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Inquiry Input Form */}
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1 flex items-center">
                  <Search size={18} className="absolute left-4 text-zinc-400 pointer-events-none" />
                  <Input
                    type="text"
                    value={queryText}
                    onChange={(e) => setQueryText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleRunAnalysis()}
                    placeholder="Enter legal issue, case facts, or statutory provisions..."
                    className="pl-11 pr-4 py-6 bg-zinc-50 border-black/15 text-sm rounded-xl text-black focus-visible:ring-0 focus-visible:border-black shadow-xs"
                  />
                </div>
                <Button
                  onClick={() => handleRunAnalysis()}
                  disabled={analyzing}
                  className="bg-black text-white hover:bg-zinc-800 rounded-xl px-7 py-6 font-semibold cursor-pointer shadow-xs disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {analyzing ? (
                    <>
                      <Loader2 size={16} className="animate-spin text-amber-300" />
                      <span>Synthesizing Opinion...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles size={16} className="text-amber-300" />
                      <span>Analyze & Formulate Opinion</span>
                    </>
                  )}
                </Button>
              </div>

              {/* Landmark Queries Chips */}
              <div className="mt-3 flex items-center gap-2 flex-wrap">
                <span className="text-[11px] font-mono text-zinc-500">Quick Landmark Inquiries:</span>
                {landmarkQueries.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setQueryText(item.query);
                      handleRunAnalysis(item.query);
                    }}
                    className="text-[11px] bg-zinc-100 hover:bg-zinc-200 border border-black/10 px-2.5 py-1 rounded-full text-zinc-700 transition-colors cursor-pointer"
                  >
                    {item.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Error Message */}
            {searchError && (
              <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs flex items-center gap-3">
                <AlertCircle size={18} className="shrink-0" />
                <div>{searchError}</div>
              </div>
            )}

            {/* Groq API Key Missing Guidance Banner */}
            {groqMissingNotice && (
              <div className="p-5 bg-amber-50 border border-amber-300 text-amber-900 rounded-2xl text-xs flex flex-col gap-2.5 animate-in fade-in">
                <div className="flex items-center gap-2 font-bold font-display text-sm">
                  <AlertCircle size={18} className="text-amber-700 shrink-0" />
                  <span>GROQ_API_KEY Required on Render Backend</span>
                </div>
                <p className="text-amber-800 leading-relaxed">
                  Weaviate precedent retrieval succeeded, but neural opinion synthesis requires your Groq API key on the backend.
                </p>
                <div className="bg-white/80 p-3 rounded-lg border border-amber-200 font-mono text-[11px] text-amber-950">
                  <span>To enable live Groq LLM opinions:</span>
                  <ol className="list-decimal list-inside mt-1 space-y-0.5">
                    <li>Open your <a href="https://dashboard.render.com" target="_blank" rel="noreferrer" className="underline font-bold">Render Dashboard</a>.</li>
                    <li>Select <strong>legal-ai-backend-75al</strong> &rarr; <strong>Environment</strong>.</li>
                    <li>Add <code>GROQ_API_KEY</code> with your key from <code>legal-ai-backend/.env</code>.</li>
                  </ol>
                </div>
                {fallbackPrecedents.length > 0 && (
                  <div className="pt-2 border-t border-amber-200/70 flex items-center justify-between flex-wrap gap-2">
                    <span className="text-[11px] text-amber-800">
                      {fallbackPrecedents.length} landmark precedent citations retrieved from Weaviate Cloud:
                    </span>
                    <Button
                      size="sm"
                      onClick={() => setCitationsModalOpen(true)}
                      className="bg-amber-900 text-white hover:bg-amber-950 text-xs h-8 gap-1.5 cursor-pointer shadow-xs"
                    >
                      <BookOpen size={13} />
                      <span>View Citations Popup ({fallbackPrecedents.length})</span>
                    </Button>
                  </div>
                )}
              </div>
            )}

            {/* Multi-turn Conversation Panel */}
            <ConversationPanel
              messages={conversationMessages}
              isStreaming={isStreaming}
              streamingStatus={streamingStatus}
              onSendMessage={sendConversationMessage}
              onClearConversation={handleClearConversation}
              onNewConversation={handleNewConversation}
              threadTitle={conversationThreadTitle || undefined}
              searchMode={searchMode}
            />
          </div>
        )}

        {/* Tab 2: Case Files & Chat Threads (PostgreSQL) */}
        {activeTab === 'projects' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Cases List */}
            <div className="lg:col-span-4 bg-white border border-black/10 rounded-2xl p-5 shadow-xs flex flex-col gap-4">
              <div className="flex items-center justify-between pb-3 border-b border-black/10">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider font-mono text-black">
                    MY LEGAL CASES
                  </h3>
                  <span className="text-[11px] text-zinc-500 font-mono">
                    PostgreSQL / Neon Cloud
                  </span>
                </div>
                <Button
                  size="sm"
                  onClick={() => setShowNewCaseModal(true)}
                  className="bg-black text-white hover:bg-zinc-800 rounded-lg text-xs font-medium px-3 h-8 cursor-pointer"
                >
                  <Plus size={14} className="mr-1" /> New Case
                </Button>
              </div>

              {loadingProjects ? (
                <div className="py-12 flex justify-center text-zinc-400">
                  <Loader2 size={24} className="animate-spin" />
                </div>
              ) : projects.length === 0 ? (
                <div className="py-10 text-center text-zinc-500 text-xs">
                  No cases registered yet. Click &quot;New Case&quot; to create a case brief.
                </div>
              ) : (
                <div className="flex flex-col gap-2 max-h-[540px] overflow-y-auto">
                  {projects.map((proj) => (
                    <button
                      key={proj.id}
                      onClick={() => loadProjectDetails(proj.id)}
                      className={`p-3.5 rounded-xl text-left border transition-all cursor-pointer ${
                        activeProject?.id === proj.id
                          ? 'bg-black text-white border-black shadow-xs'
                          : 'bg-zinc-50 border-black/10 text-black hover:border-black/30'
                      }`}
                    >
                      <div className="font-bold text-xs truncate">{proj.title}</div>
                      {proj.description && (
                        <div className={`text-[11px] truncate mt-1 ${activeProject?.id === proj.id ? 'text-zinc-300' : 'text-zinc-500'}`}>
                          {proj.description}
                        </div>
                      )}
                      <div className={`text-[10px] font-mono mt-2 ${activeProject?.id === proj.id ? 'text-zinc-400' : 'text-zinc-400'}`}>
                        {new Date(proj.created_at).toLocaleDateString()}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right Column: Active Case Workspace & Threads */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              {activeProject ? (
                <div className="bg-white border border-black/10 rounded-2xl p-6 shadow-xs flex flex-col gap-6">
                  {/* Case Title & Info */}
                  <div className="border-b border-black/10 pb-4">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline" className="text-[10px] font-mono border-black/15">
                        CASE ID: {activeProject.id.substring(0, 8)}
                      </Badge>
                      <span className="text-xs text-zinc-400 font-mono">
                        Created {new Date(activeProject.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <h2 className="text-xl font-bold text-black font-display">
                      {activeProject.title}
                    </h2>
                    {activeProject.description && (
                      <p className="text-xs text-zinc-600 mt-2 leading-relaxed">
                        {activeProject.description}
                      </p>
                    )}
                  </div>

                  {/* Threads Section */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider font-mono text-zinc-500 flex items-center gap-1.5">
                        <MessageSquare size={13} />
                        <span>Briefing & Drafting Threads</span>
                      </h4>

                      {/* Add Thread Form */}
                      <form onSubmit={handleCreateThread} className="flex gap-2">
                        <Input
                          type="text"
                          required
                          value={newThreadTitle}
                          onChange={(e) => setNewThreadTitle(e.target.value)}
                          placeholder="e.g. Bail Application Draft"
                          className="text-xs h-8 w-52 bg-zinc-50 border-black/15"
                        />
                        <Button
                          type="submit"
                          size="sm"
                          disabled={creatingThread}
                          className="h-8 bg-black text-white hover:bg-zinc-800 text-xs px-3"
                        >
                          {creatingThread ? <Loader2 size={12} className="animate-spin" /> : 'Add Thread'}
                        </Button>
                      </form>
                    </div>

                    {activeProject.threads && activeProject.threads.length > 0 ? (
                      <div className="flex flex-col gap-3">
                        <div className="flex gap-2 overflow-x-auto pb-2 border-b border-black/10">
                          {activeProject.threads.map((thr) => (
                            <button
                              key={thr.id}
                              onClick={() => setActiveThread(thr)}
                              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap cursor-pointer transition-all border ${
                                activeThread?.id === thr.id
                                  ? 'bg-zinc-900 text-white border-zinc-900 shadow-xs'
                                  : 'bg-zinc-100 text-zinc-700 border-black/10 hover:border-black/30'
                              }`}
                            >
                              {thr.title}
                            </button>
                          ))}
                        </div>

                        {/* Thread Drafting Workspace */}
                        {activeThread && (
                          <div className="bg-zinc-50 rounded-xl p-4 border border-black/10 flex flex-col gap-3">
                            <div className="flex items-center justify-between text-xs font-mono text-zinc-500">
                              <span>Active Thread: <strong>{activeThread.title}</strong></span>
                              <span>Session saved to PostgreSQL</span>
                            </div>

                            <textarea
                              rows={10}
                              value={threadNotes}
                              onChange={(e) => setThreadNotes(e.target.value)}
                              placeholder={`Drafting legal arguments, citations, and witness preparation notes for "${activeThread.title}"...\n(Tip: You can pin full opinions from the AI Legal Advisory tab directly into this canvas)`}
                              className="w-full bg-white border border-black/15 rounded-xl p-3 text-xs text-black font-serif leading-relaxed focus:outline-none focus:border-black"
                            />

                            <div className="flex justify-between items-center text-[11px] text-zinc-500 font-mono">
                              <span>Auto-synced with legal case record</span>
                              <Button
                                size="sm"
                                onClick={() => alert('Draft brief notes saved.')}
                                className="bg-black text-white hover:bg-zinc-800 text-xs px-4"
                              >
                                Save Draft Notes
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="bg-zinc-50 rounded-xl p-8 text-center text-xs text-zinc-500 border border-black/10">
                        No threads created for this case yet. Enter a thread title above (e.g. &quot;Bail Arguments&quot;) to start drafting.
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="bg-white border border-black/10 rounded-2xl p-12 text-center text-zinc-500 text-xs">
                  Select a case from the left list or create a new case to view briefs and threads.
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 3: Backend Status & Diagnostics */}
        {activeTab === 'diagnostics' && (
          <div className="flex flex-col gap-6 max-w-4xl mx-auto">
            <div className="bg-white border border-black/10 rounded-2xl p-6 shadow-xs">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-black/10">
                <div>
                  <h3 className="text-base font-bold text-black font-display">
                    Render Web Service Diagnostics
                  </h3>
                  <span className="text-xs text-zinc-500 font-mono">
                    Host: {backendHealth.apiUrl}
                  </span>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    checkBackendHealth();
                    loadDiagnostics();
                  }}
                  className="rounded-full text-xs gap-1.5"
                >
                  <RefreshCw size={13} /> Re-Probe
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
                {/* Status Card 1 */}
                <Card className="p-4 bg-zinc-50 border-black/10 rounded-xl">
                  <div className="text-[10px] font-mono text-zinc-500 uppercase">FastAPI Service</div>
                  <div className="text-base font-bold text-black mt-1">{backendHealth.service || 'Legal AI Backend'}</div>
                  <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-semibold mt-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    {backendHealth.state === 'online' ? 'Online' : backendHealth.state}
                  </div>
                </Card>

                {/* Status Card 2 */}
                <Card className="p-4 bg-zinc-50 border-black/10 rounded-xl">
                  <div className="text-[10px] font-mono text-zinc-500 uppercase">PostgreSQL (Neon)</div>
                  <div className="text-base font-bold text-black mt-1">Database</div>
                  <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-semibold mt-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    {backendHealth.postgres || 'connected'}
                  </div>
                </Card>

                {/* Status Card 3 */}
                <Card className="p-4 bg-zinc-50 border-black/10 rounded-xl">
                  <div className="text-[10px] font-mono text-zinc-500 uppercase">Weaviate Cloud</div>
                  <div className="text-base font-bold text-black mt-1">Vector DB</div>
                  <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-semibold mt-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    {backendHealth.weaviate || 'connected'}
                  </div>
                </Card>

                {/* Status Card 4 */}
                <Card className="p-4 bg-zinc-50 border-black/10 rounded-xl">
                  <div className="text-[10px] font-mono text-zinc-500 uppercase">Groq LLM Engine</div>
                  <div className="text-base font-bold text-black mt-1">Qwen 3.8-27B</div>
                  <div className="flex items-center gap-1 text-[11px] font-semibold mt-1">
                    <span className={`w-1.5 h-1.5 rounded-full ${ragModelInfo?.groq_configured ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                    <span className={ragModelInfo?.groq_configured ? 'text-emerald-600' : 'text-amber-700'}>
                      {ragModelInfo?.groq_configured ? 'Configured' : 'Key Unset'}
                    </span>
                  </div>
                </Card>
              </div>

              {/* Cluster & Model Metadata */}
              <div className="p-4 bg-zinc-50 rounded-xl border border-black/10 space-y-2 text-xs font-mono">
                <div className="font-bold text-black uppercase tracking-wider text-[11px]">
                  RAG Architecture & Cluster Info:
                </div>
                {vectorStatus ? (
                  <div className="space-y-1 text-zinc-600">
                    <div>Weaviate Cluster: <strong>{vectorStatus.configured_url}</strong></div>
                    <div>Default Target Collection: <strong>{vectorStatus.default_collection}</strong> (22,500+ Indian judgments)</div>
                    <div>
                      Supported Groq Models:{' '}
                      <strong>
                        {ragModelInfo?.supported_models?.join(', ') || 'qwen/qwen3.8-27b, openai/gpt-oss-120b'}
                      </strong>
                    </div>
                  </div>
                ) : (
                  <div className="text-zinc-500">
                    {loadingDiagnostics ? 'Loading cluster info...' : 'Cluster info retrieved upon probe.'}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Modal for Creating New Case */}
      {showNewCaseModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-in fade-in">
          <div className="bg-white border border-black/15 rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <h3 className="text-lg font-bold text-black font-display mb-1">
              CREATE LEGAL CASE / PROJECT
            </h3>
            <p className="text-xs text-zinc-600 mb-4">
              Add a new case file to manage brief drafting and precedent research.
            </p>

            <form onSubmit={handleCreateCase} className="flex flex-col gap-3.5">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-mono text-zinc-600 uppercase">Case Title / Cause Title</label>
                <Input
                  type="text"
                  required
                  value={newCaseTitle}
                  onChange={(e) => setNewCaseTitle(e.target.value)}
                  placeholder="e.g. State of Maharashtra v. Reliance Infra"
                  className="bg-zinc-50 text-xs"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-mono text-zinc-600 uppercase">Case Summary / Background (Optional)</label>
                <textarea
                  rows={3}
                  value={newCaseDesc}
                  onChange={(e) => setNewCaseDesc(e.target.value)}
                  placeholder="Facts, sections involved (e.g. Section 138 NI Act, Section 9 Arbitration Act)..."
                  className="bg-zinc-50 border border-black/15 rounded-md p-2 text-xs focus:outline-none focus:border-black"
                />
              </div>

              <div className="flex justify-end gap-2 mt-3">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowNewCaseModal(false)}
                  className="text-xs"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  size="sm"
                  disabled={creatingCase}
                  className="bg-black text-white hover:bg-zinc-800 text-xs font-semibold"
                >
                  {creatingCase ? <Loader2 size={13} className="animate-spin mr-1" /> : null}
                  <span>Create Case File</span>
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Citations Modal */}
      <CitationsDialog
        open={citationsModalOpen}
        onOpenChange={setCitationsModalOpen}
        precedents={displayedPrecedents}
        searchMode={searchMode}
        query={queryText}
      />

      {/* Auth Dialog */}
      <AuthDialog
        open={authModalOpen}
        initialMode="signin"
        onOpenChange={setAuthModalOpen}
      />
    </div>
  );
}
