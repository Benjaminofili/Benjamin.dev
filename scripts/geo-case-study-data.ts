/**
 * scripts/geo-case-study-data.ts
 *
 * GEO-optimized case study content — keyed by project slug.
 * Using Markdown-like format compatible with renderSimpleMarkdown in CaseStudyPage.
 *
 * Rules applied:
 *  - Answer-first structure (≤20-word declarative sentences)
 *  - Intent-driven section headings (## Heading)
 *  - Skill clustering in intro paragraphs
 *  - Format: ## Heading, 1) **Bold** content, plain paragraphs.
 */

export type CaseStudyEntry = {
  title: string;
  markdown: string;
};

export const GEO_CASE_STUDIES: Record<string, CaseStudyEntry> = {

  /* ── 1. VERD ────────────────────────────────────────────────────────────── */
  "verd": {
    title: "VERD — AI-Powered Crop Health Diagnostic Engine",
    markdown: `## System Architecture
The presentation layer is built with Flutter and GoRouter for deep-linkable navigation. Global state is managed exclusively with Riverpod for predictable, immutable state flows.

The core AI pipeline uses a conditional routing service. Online requests route to Firebase Storage and Gemini API for high-fidelity results. Offline requests fall back instantly to on-device quantized TensorFlow Lite.

## Core Engineering Challenge
The problem: providing low-latency AI diagnostics in rural areas with volatile internet without blocking the UI thread.

1) **Hybrid AI Routing**  
Engineered a service that detects network state via connectivity_plus to toggle between cloud and edge inference.

2) **Zero-Latency Inference**  
Embedded a quantized TFLite model directly in the app bundle for sub-500ms offline diagnostics.

3) **Background Synchronization**  
Used Hive to cache local scan history and image paths, silently uploading to Firestore upon reconnection.

## Measured Impact
Achieved 100% data retention during network outages via Hive caching and automated synchronization. delivered sub-500ms diagnostic inference in zero-connectivity environments. Maintained a lean, high-performance cross-platform bundle by stripping unused native libraries.`,
  },

  /* ── 2. Fusion Fiesta ───────────────────────────────────────────────────── */
  "fusion-fiesta": {
    title: "Fusion Fiesta — Enterprise Event Management Platform",
    markdown: `## System Architecture
The codebase is partitioned by business domain: admin, organizer, student, and common. UI, state, and data repositories for each persona are completely isolated to prevent state pollution.

GoRouter with a MainNavigationShell delivers dynamic, deep-linkable routing. Route guards verify JSON Web Tokens and user roles before rendering any sensitive screens.

## Core Engineering Challenge
The problem: managing deeply nested state and navigation across three different user personas in a single binary without leaking access.

1) **Strict Navigation Guards**  
The routing engine intercepts session state directly to block unauthorized transitions before any widgets render.

2) **Scoped Dependency Injection**  
Utilized GetIt to ensure each persona only loads authorized repositories into memory, keeping the app fast and secure.

3) **Decoupled Data Layer**  
Abstracted data fetching through a centralized API client, making components agnostic of the data source.

## Measured Impact
Architected a modular codebase scaling to 30+ screens across three roles while minimizing merge conflicts. Engineered an offline-capable QR-code ticketing system to optimize live check-ins.`,
  },

  /* ── 3. Tasteflow ───────────────────────────────────────────────────────── */
  "tasteflow": {
    title: "Tasteflow — Multi-Tenant Restaurant & Delivery Platform",
    markdown: `## System Architecture
Flask Blueprints enforce strict domain isolation across admin, customer, owner, and auth modules. This prevents role logic from tangling and ensures maintainable scaling.

SQLAlchemy manages complex relational states and cascading foreign key constraints. Jinja2 provides server-side rendering for fast initial loads and SEO, enhanced by vanilla JavaScript.

## Core Engineering Challenge
The problem: three distinct roles require different auth lifecycles and access privileges without risking horizontal data leakage.

1) **Blueprint-Level Security**  
Implemented middleware that validates route requests against active session claims automatically.

2) **Implicit Data Scoping**  
Engineered SQLAlchemy queries to inherently scope data fetching to the authenticated user's restaurant context.

3) **Atomic Transaction Logic**  
Centralized order state transitions within role-guarded utility functions to prevent race conditions during preparation.

## Measured Impact
Architected an enterprise multi-portal ecosystem scaling across 3 roles and 20+ routes with strict isolation. Built automated database seeding scripts reducing environment spin-up time to under 2 minutes.`,
  },

  /* ── 4. Baby Shophub ────────────────────────────────────────────────────── */
  "baby-shophub": {
    title: "Baby Shophub — Cross-Platform E-Commerce Ecosystem",
    markdown: `## System Architecture
The presentation layer uses component-driven Flutter architecture. Complex flows are separated into admin and customer domains while UI primitives live in a reusable shared directory.

Data persistence and user sessions are managed through Supabase. The app leverages PostgreSQL mapping to handle dynamic product catalogs and live order history.

## Core Engineering Challenge
The problem: managing complex navigation states across two entirely different user experiences while supporting external deep linking.

1) **Dynamic Auth Wrapper**  
Intercepts session tokens to securely funnel users to either the shopping flow or administrative dashboard.

2) **Deep Link Orchestration**  
Parses external URIs to push specific product screens onto the stack without breaking back-button history.

3) **Service Abstraction**  
Decoupled external communications into dedicated singleton services to keep UI declarative and agnostic of database queries.

## Measured Impact
Engineered a secure dual-role ecosystem with 20+ screens isolating customer flows from sensitive admin controls. Migrated to Supabase to ensure low-latency data fetching with zero infra overhead.`,
  },

  /* ── 5. AI Support Agent ────────────────────────────────────────────────── */
  "ai-support-agent": {
    title: "AI Support Agent — Enterprise RAG & Conversational AI",
    markdown: `## System Architecture
Django handles synchronous web requests while long-running tasks like LLM inference are offloaded to Celery workers using Redis as a message broker.

The knowledge app leverages PostgreSQL with the pgvector extension for similarity search. Incoming payloads are intercepted by generic webhooks and routed to a unified ticket timeline.

## Core Engineering Challenge
The problem: building a responsive chat interface that doesn't block the main thread while waiting for slow LLM APIs.

1) **Async Message Passing**  
The server returns "Message Received" immediately while prompt construction and RAG lookup run in the background.

2) **Vectorized Knowledge Retrieval**  
Implemented a RAG pipeline utilizing pgvector to store document embeddings and reduce AI hallucinations.

3) **Multi-Channel Normalization**  
Architected a system capable of parsing IMAP emails and webchat forms into a unified conversational model.

## Measured Impact
Engineered an async task queue achieving 100% webhook ingestion success under high load. Implemented a production-grade RAG pipeline drastically reducing customer support response errors.`,
  },

  /* ── 6. DevDocs AI ──────────────────────────────────────────────────────── */
  "devdocs-ai": {
    title: "DevDocs AI — SaaS Documentation Engine",
    markdown: `## System Architecture
Built a provider-agnostic AI routing system capable of hot-swapping between Anthropic, Gemini, OpenAI, and local Ollama models based on cost logic.

Stripe webhooks handle subscription events to update user tiers in Supabase instantly. FeatureLock components restrict access to premium AI models based on tier claims.

## Core Engineering Challenge
The problem: mitigating latency and financial costs of large-scale documentation generation while preventing prompt-injection attacks.

1) **Asynchronous Orchestrator**  
Paired multi-model generation with Redis caching to return cached structures instantly and reduce redundant API calls.

2) **Graceful Degradation**  
Implemented fallback routing where primary model timeouts trigger faster, lighter models like Groq to preserve UX.

3) **Distributed Rate Limiting**  
Deployed Upstash Redis to protect expensive AI endpoints from automated scraping and DDoS vulnerabilities.

## Measured Impact
Architected an AI integration layer supporting 5 distinct LLM ecosystems. Engineered an enterprise SaaS access control system with strict tier-based resource limits.`,
  },

  /* ── 7. MediConnect ─────────────────────────────────────────────────────── */
  "mediconnect": {
    title: "MediConnect — Telehealth & EMR Platform",
    markdown: `## System Architecture
The application is architected as a modular monolith partitioned into domains: accounts, appointments, consultations, and records. This ensures patient data isolation.

Integrated the Whereby API to orchestrate dynamic, secure video rooms. Medical documents are offloaded to AWS S3 via custom storage backends for scalable file handling.

## Core Engineering Challenge
The problem: preventing double-bookings in a high-concurrency environment while synchronizing local state with external video room generation.

1) **Atomic Slot Locking**  
Engineered a booking engine that executes atomic transactions with strict constraint validation to eliminate race conditions.

2) **Secure Room Provisioning**  
Asynchronously provisions timed video rooms via API, storing encrypted URLs in the Consultation model for doctor-patient access.

3) **Custom S3 Backends**  
Developed a secure module for EMR handling ensuring proper data segregation and file protection for sensitive PDFs.

## Measured Impact
Engineered a comprehensive integration testing suite validating 100% of critical user journeys. Architected a secure EMR system using AWS S3 for sensitive patient records.`,
  },

  /* ── 8. AspireEdge ──────────────────────────────────────────────────────── */
  "aspire-edge": {
    title: "AspireEdge — Enterprise Full-Stack Ecosystem",
    markdown: `## System Architecture
The ecosystem is divided into two distinct repositories for mobile and backend. This allows the Spring Boot API and Flutter client to scale independently.

Docker Compose orchestrates a local PostgreSQL environment to ensure 100% parity with production. Spring YAML profiles handle dynamic database switching at runtime.

## Core Engineering Challenge
The problem: establishing a secure bridge between a local containerized backend and a remote Supabase database while keeping the client agnostic.

1) **Environment Configuration Pipeline**  
Utilized Spring Boot profile management to inject database credentials at runtime without code changes.

2) **Agnostic API Client**  
Structured the Flutter client to read base URLs from environment variables, enabling seamless switching between dev and cloud servers.

3) **Native Multi-OS Compilation**  
Configured the Flutter environment to support compilation for iOS, Android, macOS, Linux, and Windows from a single codebase.

## Measured Impact
Architected a containerized dev environment reducing backend onboarding time to under 60 seconds. Established a unified mobile architecture supporting 5 operating systems from day one.`,
  },

  /* ── 9. Bistro Bliss ────────────────────────────────────────────────────── */
  "bistro-bliss": {
    title: "Bistro Bliss — Modern Restaurant Web Application",
    markdown: `## System Architecture
The application is built on Radix UI primitives via Shadcn UI. This ensures that date-pickers, modals, and menus are fully ARIA-compliant and keyboard navigable.

Leverages Next.js App Router to optimize static assets. The next/image component serves WebP formats with automatic lazy-loading for high Lighthouse performance.

## Core Engineering Challenge
The problem: building a visually complex reservation system that handles date selection and party size without layout shifts on mobile.

1) **Visual Stability Engineering**  
Used Radix Popover and Calendar primitives to ensure interactive elements float above the layout without triggering DOM reflows.

2) **Type-Safe Form Pipeline**  
Combined react-hook-form with Zod for strict schema validation and real-time contextual error messaging.

3) **Responsive Asset Delivery**  
Optimized visual assets through Tailwind utility composition to scale from 320px mobile to 4K desktop displays.

## Measured Impact
Engineered a 100% accessible component library ensuring screen-reader compatibility. Implemented strict type-safe validation pipelines eliminating malformed reservation requests.`,
  },

  /* ── 10. Antonio Translator ─────────────────────────────────────────────── */
  "antonio-translator": {
    title: "Antonio Translator — Real-Time Voice Translation Engine",
    markdown: `## System Architecture
The architecture relies on deeply abstracted, headless Dart services to insulate core logic from the UI layer. Services communicate solely through asynchronous data streams.

Engineered a multi-stage async processing queue. The system orchestrates audio capture, STT transcription, REST translation, and TTS synthesis without blocking the main thread.

## Core Engineering Challenge
The problem: managing a 4-step async operation while the UI was being actively modified, risking memory leaks and broken state management.

1) **Service-Oriented Decoupling**  
Designed the translation pipeline to be entirely agnostic of the Flutter widget tree, using singleton services for buffer management.

2) **Tier-Gated Access**  
Integrated a centralized user tier service to gate access to premium translation models and establish a SaaS foundation.

3) **Local Persistence Layer**  
Implemented storage and history services to allow offline access to favorite translations and reduce redundant API costs.

## Measured Impact
Architected a fault-tolerant audio processing pipeline with sub-second orchestration latency. Insulated 100% of business logic from the presentation layer.`,
  },

};
