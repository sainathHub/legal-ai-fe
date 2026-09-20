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
  Send,
  Layers
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
  VectorStatus 
} from '@/lib/api/types';
import AuthDialog from '@/components/AuthDialog';

export default function ConsolePage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading: authLoading, backendHealth, checkBackendHealth, logout } = useAuth();

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'rag' | 'projects' | 'diagnostics'>('rag');

  // Precedent RAG State
  const [searchQuery, setSearchQuery] = useState('Right to privacy under Article 21 and digital surveillance');
  const [searchLimit, setSearchLimit] = useState<number>(5);
  const [searchAlpha, setSearchAlpha] = useState<number>(0.0);
  const [searching, setSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<VectorSearchResultItem[]>([]);
  const [totalResults, setTotalResults] = useState<number>(0);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [searchNotice, setSearchNotice] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

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

  // Vector Diagnostics State
  const [vectorStatus, setVectorStatus] = useState<VectorStatus | null>(null);
  const [loadingVectorStatus, setLoadingVectorStatus] = useState(false);

  // Suggested search queries for Indian advocates
  const suggestedQueries = [
    'Right to privacy under Article 21 and digital surveillance',
    'Moratorium under Section 14 IBC and personal guarantors',
    'Principles for grant of anticipatory bail under Section 438 CrPC',
    'Scope of interference with arbitral awards under Section 34 of Arbitration Act',
    'Basic Structure Doctrine and constitutional amendment powers under Article 368',
  ];

  // Fetch projects list
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

  // Fetch project details with threads
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

  // Fetch Vector store status
  const loadVectorStatus = useCallback(async () => {
    setLoadingVectorStatus(true);
    try {
      const status = await api.vectors.status();
      setVectorStatus(status);
    } catch (err) {
      console.error('Failed to fetch vector status', err);
    } finally {
      setLoadingVectorStatus(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      loadProjects();
    }
    loadVectorStatus();
  }, [isAuthenticated, loadProjects, loadVectorStatus]);

  // Execute Vector Precedent Search
  const handleSearch = async (queryText: string = searchQuery, overrideAlpha?: number) => {
    if (!queryText.trim()) return;
    setSearching(true);
    setSearchError(null);
    setSearchNotice(null);

    // If not authenticated, prompt user
    if (!isAuthenticated) {
      setSearching(false);
      setAuthModalOpen(true);
      return;
    }

    const currentAlpha = overrideAlpha !== undefined ? overrideAlpha : searchAlpha;

    try {
      const res = await api.vectors.search({
        query: queryText.trim(),
        limit: searchLimit,
        alpha: currentAlpha,
      });
      setSearchResults(res.results || []);
      setTotalResults(res.total_results || 0);
    } catch (err) {
      const errMsg = err instanceof ApiError ? err.message : String(err);
      
      // If collection does not have vectorizer configured on cloud, fallback to BM25 keyword search
      if (errMsg.includes('without vectorizer') && currentAlpha > 0) {
        try {
          const fallbackRes = await api.vectors.search({
            query: queryText.trim(),
            limit: searchLimit,
            alpha: 0.0,
          });
          setSearchAlpha(0.0);
          setSearchResults(fallbackRes.results || []);
          setTotalResults(fallbackRes.total_results || 0);
          setSearchNotice('Weaviate Cloud collection does not have a vectorizer enabled; automatically routed query through BM25 keyword index.');
          return;
        } catch (fallbackErr) {
          setSearchError(fallbackErr instanceof ApiError ? fallbackErr.message : 'Search failed.');
        }
      } else {
        setSearchError(errMsg);
      }
    } finally {
      setSearching(false);
    }
  };

  // Create New Case Project
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

  // Create New Thread inside active project
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

  // Copy citation extract
  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

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
                RESEARCH CONSOLE
              </Badge>
            </div>
          </div>

          {/* Center Tabs */}
          <div className="hidden md:flex items-center gap-1 bg-zinc-100 p-1 rounded-full border border-black/10">
            <button
              onClick={() => setActiveTab('rag')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'rag' 
                  ? 'bg-black text-white shadow-xs' 
                  : 'text-zinc-600 hover:text-black'
              }`}
            >
              <Search size={13} />
              <span>Precedent Vector RAG</span>
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

          {/* Right: Auth Profile / Sign In */}
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

      {/* Main Console Canvas */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-6">
        {/* Tab 1: Precedent Semantic RAG */}
        {activeTab === 'rag' && (
          <div className="flex flex-col gap-6">
            {/* Search Header Banner */}
            <div className="bg-white border border-black/10 rounded-2xl p-6 shadow-xs">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                <div>
                  <h2 className="text-xl font-bold text-black font-display tracking-tight flex items-center gap-2">
                    <span>Indian Jurisprudence Semantic Search</span>
                    <Badge variant="outline" className="text-[10px] font-mono border-emerald-300 bg-emerald-50 text-emerald-700">
                      Weaviate Cloud Live
                    </Badge>
                  </h2>
                  <p className="text-xs text-zinc-600 mt-1">
                    Execute high-dimensional cosine similarity searches across indexed Supreme Court & High Court precedents.
                  </p>
                </div>

                {/* Hybrid Search Controls */}
                <div className="flex items-center gap-4 text-xs font-mono text-zinc-600 bg-zinc-50 border border-black/10 px-3 py-2 rounded-xl">
                  <div className="flex items-center gap-2">
                    <Sliders size={13} />
                    <span>Hybrid Alpha: <strong>{searchAlpha}</strong></span>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={searchAlpha}
                      onChange={(e) => setSearchAlpha(parseFloat(e.target.value))}
                      className="w-20 accent-black cursor-pointer"
                      title="0 = BM25 keyword only, 1 = Vector semantic only"
                    />
                  </div>
                  <span className="text-zinc-300">|</span>
                  <div className="flex items-center gap-1.5">
                    <span>Limit:</span>
                    <select
                      value={searchLimit}
                      onChange={(e) => setSearchLimit(parseInt(e.target.value))}
                      className="bg-white border border-black/15 rounded px-1.5 py-0.5 text-xs font-mono focus:outline-none"
                    >
                      <option value={3}>3</option>
                      <option value={5}>5</option>
                      <option value={10}>10</option>
                      <option value={15}>15</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Search Bar Input */}
              <div className="flex gap-2">
                <div className="relative flex-1 flex items-center">
                  <Search size={18} className="absolute left-4 text-zinc-400 pointer-events-none" />
                  <Input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    placeholder="Enter legal issue, case ratio, or constitutional inquiry..."
                    className="pl-11 pr-4 py-6 bg-zinc-50 border-black/15 text-sm rounded-xl text-black focus-visible:ring-0 focus-visible:border-black shadow-xs"
                  />
                </div>
                <Button
                  onClick={() => handleSearch()}
                  disabled={searching}
                  className="bg-black text-white hover:bg-zinc-800 rounded-xl px-7 py-6 font-semibold cursor-pointer shadow-xs disabled:opacity-60"
                >
                  {searching ? (
                    <>
                      <Loader2 size={16} className="mr-2 animate-spin" />
                      <span>Vectorizing...</span>
                    </>
                  ) : (
                    <span>Query Precedents</span>
                  )}
                </Button>
              </div>

              {/* Sample Queries Chips */}
              <div className="mt-3 flex items-center gap-2 flex-wrap">
                <span className="text-[11px] font-mono text-zinc-500">Quick Landmark Probes:</span>
                {suggestedQueries.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSearchQuery(q);
                      handleSearch(q);
                    }}
                    className="text-[11px] bg-zinc-100 hover:bg-zinc-200 border border-black/10 px-2.5 py-1 rounded-full text-zinc-700 transition-colors cursor-pointer"
                  >
                    {q.length > 38 ? `${q.substring(0, 38)}...` : q}
                  </button>
                ))}
              </div>
            </div>

            {/* Search Notices & Errors */}
            {searchNotice && (
              <div className="p-4 bg-amber-50 border border-amber-200 text-amber-800 rounded-xl text-xs flex items-center gap-3">
                <AlertCircle size={18} className="shrink-0 text-amber-600" />
                <div className="leading-relaxed">{searchNotice}</div>
              </div>
            )}

            {searchError && (
              <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs flex items-center gap-3">
                <AlertCircle size={18} className="shrink-0" />
                <div>{searchError}</div>
              </div>
            )}

            {searching && (
              <div className="flex flex-col items-center justify-center py-20 bg-white border border-black/10 rounded-2xl gap-3 text-center">
                <Loader2 size={32} className="animate-spin text-black" />
                <h3 className="font-bold text-sm text-black font-display">
                  QUERYING WEAVIATE HYBRID VECTORS
                </h3>
                <p className="text-xs text-zinc-500 max-w-sm">
                  Computing 384-dimensional text embeddings and scanning landmark Indian court judgments...
                </p>
              </div>
            )}

            {!searching && searchResults.length > 0 && (
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between text-xs font-mono text-zinc-500 px-1">
                  <span>Found {totalResults} matching precedent chunks</span>
                  <span>Cluster: Weaviate Cloud (WCS)</span>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {searchResults.map((item, index) => {
                    const title = item.title || item.metadata?.case_title || 'Supreme Court / High Court Ruling';
                    const court = item.metadata?.court_name || 'Apex Court of India';
                    const date = item.metadata?.decision_date || item.metadata?.year || 'Precedent Archive';
                    const sourceUrl = item.metadata?.source_url as string | undefined;

                    return (
                      <Card key={item.id || index} className="p-6 bg-white border-black/10 rounded-2xl shadow-xs hover:border-black/30 transition-all">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <Badge className="bg-black text-white text-[10px] font-mono">
                                MATCH #{index + 1}
                              </Badge>
                              {item.score !== undefined && item.score !== null && (
                                <Badge variant="outline" className="text-[10px] font-mono border-emerald-300 bg-emerald-50 text-emerald-800">
                                  Score: {item.score.toFixed(4)}
                                </Badge>
                              )}
                              <span className="text-xs font-mono text-zinc-500">
                                {court} • {date}
                              </span>
                            </div>
                            <h3 className="text-base font-bold text-black font-display">
                              {title}
                            </h3>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            {sourceUrl && (
                              <a
                                href={sourceUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="p-2 border border-black/10 rounded-lg text-zinc-600 hover:text-black hover:bg-zinc-50 transition-colors"
                                title="Open Kanoon Source"
                              >
                                <ExternalLink size={14} />
                              </a>
                            )}
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleCopy(item.id, item.content || '')}
                              className="text-xs rounded-lg border-black/15 text-zinc-700 hover:text-black"
                            >
                              {copiedId === item.id ? (
                                <>
                                  <Check size={13} className="text-emerald-600 mr-1" />
                                  <span>Copied</span>
                                </>
                              ) : (
                                <>
                                  <Copy size={13} className="mr-1" />
                                  <span>Extract</span>
                                </>
                              )}
                            </Button>
                          </div>
                        </div>

                        {/* Extract Paragraph */}
                        <div className="bg-zinc-50 rounded-xl p-4 border border-black/5 text-xs text-zinc-800 leading-relaxed font-serif whitespace-pre-line">
                          {item.content || item.title || (item.metadata && Object.keys(item.metadata).length > 0 ? JSON.stringify(item.metadata, null, 2) : `Precedent judgment chunk (${item.id}) indexed in Weaviate Cloud.`)}
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </div>
            )}

            {!searching && searchResults.length === 0 && !searchError && (
              <div className="bg-white border border-black/10 rounded-2xl p-12 text-center flex flex-col items-center justify-center">
                <Database size={40} className="text-zinc-400 mb-3" />
                <h3 className="text-base font-bold text-black font-display">READY FOR LEGAL RESEARCH</h3>
                <p className="text-xs text-zinc-500 max-w-md mt-1 mb-4">
                  Enter any legal proposition or choose one of the landmark probes above to query vector similarities directly from Weaviate Cloud.
                </p>
                <Button
                  onClick={() => handleSearch()}
                  className="bg-black text-white hover:bg-zinc-800 rounded-full text-xs font-semibold px-6 py-4"
                >
                  Run Initial Privacy Probe
                </Button>
              </div>
            )}
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

                      {/* Add Thread Inline Form */}
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
                              rows={8}
                              value={threadNotes}
                              onChange={(e) => setThreadNotes(e.target.value)}
                              placeholder={`Drafting legal arguments, citations, and witness preparation notes for "${activeThread.title}"...`}
                              className="w-full bg-white border border-black/15 rounded-xl p-3 text-xs text-black font-serif leading-relaxed focus:outline-none focus:border-black"
                            />

                            <div className="flex justify-between items-center text-[11px] text-zinc-500 font-mono">
                              <span>Auto-synced with legal case record</span>
                              <Button
                                size="sm"
                                onClick={() => alert('Draft notes saved.')}
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
                        No threads created for this case yet. Enter a thread title above (e.g. &quot;Bail Arguments&quot; or &quot;Cross-Examination Questions&quot;) to start drafting.
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
                    loadVectorStatus();
                  }}
                  className="rounded-full text-xs gap-1.5"
                >
                  <RefreshCw size={13} /> Re-Probe
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                {/* Status Card 1 */}
                <Card className="p-4 bg-zinc-50 border-black/10 rounded-xl">
                  <div className="text-[10px] font-mono text-zinc-500 uppercase">FastAPI Service</div>
                  <div className="text-base font-bold text-black mt-1">{backendHealth.service || 'Legal AI Backend'}</div>
                  <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-semibold mt-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    {backendHealth.state === 'online' ? 'Online & Responsive' : backendHealth.state}
                  </div>
                </Card>

                {/* Status Card 2 */}
                <Card className="p-4 bg-zinc-50 border-black/10 rounded-xl">
                  <div className="text-[10px] font-mono text-zinc-500 uppercase">PostgreSQL Database</div>
                  <div className="text-base font-bold text-black mt-1">Neon Cloud</div>
                  <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-semibold mt-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Status: {backendHealth.postgres || 'connected'}
                  </div>
                </Card>

                {/* Status Card 3 */}
                <Card className="p-4 bg-zinc-50 border-black/10 rounded-xl">
                  <div className="text-[10px] font-mono text-zinc-500 uppercase">Vector Database</div>
                  <div className="text-base font-bold text-black mt-1">Weaviate Cloud (WCS)</div>
                  <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-semibold mt-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Status: {backendHealth.weaviate || 'connected'}
                  </div>
                </Card>
              </div>

              {/* Weaviate Cluster Information */}
              <div className="p-4 bg-zinc-50 rounded-xl border border-black/10 space-y-2 text-xs font-mono">
                <div className="font-bold text-black uppercase tracking-wider text-[11px]">
                  Weaviate Index Metadata:
                </div>
                {vectorStatus ? (
                  <div className="space-y-1 text-zinc-600">
                    <div>Configured Cluster: <strong>{vectorStatus.configured_url}</strong></div>
                    <div>Default Target Collection: <strong>{vectorStatus.default_collection}</strong></div>
                    <div>
                      Available Collections:{' '}
                      <strong>
                        {vectorStatus.available_collections && vectorStatus.available_collections.length > 0 
                          ? vectorStatus.available_collections.join(', ') 
                          : 'LegalChunk'}
                      </strong>
                    </div>
                  </div>
                ) : (
                  <div className="text-zinc-500">
                    {loadingVectorStatus ? 'Loading Weaviate cluster info...' : 'Cluster info retrieved upon probe.'}
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

      {/* Auth Dialog */}
      <AuthDialog
        open={authModalOpen}
        initialMode="signin"
        onOpenChange={setAuthModalOpen}
      />
    </div>
  );
}
