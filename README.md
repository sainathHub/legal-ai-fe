# Legal AI Frontend (`legal-ai-fe`)

> **Frontend user interface for the Legal AI platform — combining automated legal document summarization with semantic case precedent search & Indian jurisprudence RAG.**

---

## 🏛️ Overview

**`legal-ai-fe`** is the dedicated web client for the Legal AI ecosystem. It connects legal practitioners, researchers, and students to AI-powered legal analysis tools:

1. **Legal Document Summarizer**: Upload judgments, contracts, petitions, or case briefs (PDF/text) to receive structured, high-accuracy summaries (Facts, Legal Issues, Ratio Decidendi, Precedents Cited, and Final Holding).
2. **Semantic Precedent & Case Law RAG**: Natural language legal research that queries high-dimensional vector embeddings of Indian Supreme Court & High Court judgments to retrieve matching precedents and synthesize authoritative legal analyses.

---

## 🏗️ Architecture & Ecosystem

```
               ┌──────────────────────────────┐
               │    legal-ai-fe (Frontend)     │
               │   Modern Web UI / React/Vite │
               └──────────────┬───────────────┘
                              │
             ┌────────────────┴────────────────┐
             ▼                                 ▼
┌───────────────────────────┐     ┌───────────────────────────┐
│ Law-AI-Summarizer-Backend │     │         legal-ai          │
│   FastAPI + Groq API      │     │  Weaviate Vector DB + RAG │
│   Document Summarization  │     │  Indian Jurisprudence Search│
└───────────────────────────┘     └───────────────────────────┘
```

- **Backend 1 (Summarization)**: [`sainathHub/Law-AI-Summarizer-Backend`](https://github.com/sainathHub/Law-AI-Summarizer-Backend)
- **Backend 2 (Precedent RAG)**: [`sainathHub/legal-ai`](https://github.com/sainathHub/legal-ai)

---

## 🚀 Key Features (Roadmap)

- [ ] **Document Ingestion & Parsing**: Drag-and-drop support for PDF and text judgments with client-side preview.
- [ ] **Structured Brief Generation**:
  - Procedural History & Material Facts
  - Substantive Questions of Law / Framing of Issues
  - Ratio Decidendi & Legal Rationale
  - Final Disposition & Orders
- [ ] **Semantic Legal Research Engine**:
  - Vector similarity search across Indian landmark precedents.
  - Multi-attribute filtering (Court, Year, Case Type, Relevant Sections/Acts).
  - Precedent citation cards with similarity match percentage and paragraph excerpts.
- [ ] **Interactive Case Briefing Canvas**: Export summaries to PDF, Markdown, or clipboard for legal filings.

---

## 🛠️ Getting Started (Development)

```bash
# Clone the repository
git clone git@github.com:sainathHub/legal-ai-fe.git
cd legal-ai-fe

# Install dependencies (once UI framework initialized)
npm install

# Start development server
npm run dev
```

---

## 📜 License

MIT License. Developed by [@sainathHub](https://github.com/sainathHub).
