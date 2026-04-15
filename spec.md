# Software Requirements Specification (SRS)
## AI-Integrated Developer Portfolio: The Anthology

**Version:** 1.0.0  
**Author:** Senior Enterprise Architect(Benjamin Ofili)  
**Last Updated:** 15th April 2026  
**Status:** Draft for Implementation

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [System Architecture Overview](#2-system-architecture-overview)
3. [Narrative Structure: The Anthology](#3-narrative-structure-the-anthology)
4. [Technical Stack Specification](#4-technical-stack-specification)
5. [Phase 2: V0 UI Generation Workflow](#5-phase-2-v0-ui-generation-workflow)
6. [Component Architecture](#6-component-architecture)
7. [AI Integration Architecture](#7-ai-integration-architecture)
8. [Accessibility Requirements (WCAG 2.2 Level AA)](#8-accessibility-requirements-wcag-22-level-aa)
9. [Generative Engine Optimization (GEO)](#9-generative-engine-optimization-geo)
10. [Feature Requirements: MoSCoW Method](#10-feature-requirements-moscow-method)
11. [User Journey Maps](#11-user-journey-maps)
12. [Data Schema & Validation](#12-data-schema--validation)
13. [Testing Strategy](#13-testing-strategy)
14. [Deployment & Infrastructure](#14-deployment--infrastructure)
15. [Success Metrics & KPIs](#15-success-metrics--kpis)
16. [Appendices](#16-appendices)

---

## 1. Executive Summary

### 1.1 Project Vision
This portfolio transcends the traditional project showcase grid. It functions as a **high-end technical publication** structured in four thematic chapters, demonstrating engineering excellence, AI integration mastery, and strategic problem-solving through narrative architecture.

### 1.2 Primary Objectives
1. **Eliminate the Design-to-Code Bottleneck**: Leverage v0 by Vercel for production-ready component generation before IDE initialization.
2. **Showcase AI Engineering Competency**: Implement production-grade RAG pipeline with agentic tool-calling.
3. **Optimize for AI Sourcing**: Apply GEO principles to maximize discoverability by LLM-powered recruitment agents.
4. **Maintain Enterprise Standards**: Strict WCAG 2.2 Level AA compliance, component composition, and type-safe validation.

### 1.3 Target Audiences
- **Primary**: Engineering hiring managers and technical recruiters
- **Secondary**: AI-powered sourcing agents (ChatGPT Search, Perplexity, SearchGPT)
- **Tertiary**: Peer developers and open-source community

---

## 2. System Architecture Overview

### 2.1 Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                     CLIENT LAYER (Edge)                      │
│  Next.js 15+ App Router (React 19+, Suspense Boundaries)   │
│  Tailwind CSS + Shadcn UI Components                        │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                   API LAYER (Serverless)                     │
│  Next.js Route Handlers (app/api/*)                         │
│  Server Actions (useFormState, useFormStatus)               │
└────────────────────┬────────────────────────────────────────┘
                     │
        ┌────────────┴──────────────┐
        ▼                           ▼
┌──────────────────┐      ┌─────────────────────┐
│  AI LAYER        │      │  DATA LAYER         │
│  - Vercel AI SDK │      │  - Supabase/Neon    │
│  - RAG Pipeline  │      │  - pgvector         │
│  - Tool Calling  │      │  - Row-Level Sec.   │
└──────────────────┘      └─────────────────────┘
```

### 2.2 Architectural Principles
1. **Edge-First Rendering**: Maximize static generation with selective ISR (Incremental Static Regeneration).
2. **Progressive Enhancement**: Core content accessible without JavaScript.
3. **Zero-Runtime CSS**: Purged Tailwind with no client-side style injection.
4. **Type-Safe Data Flow**: Zod schemas enforced at API boundaries and form submissions.
5. **Composable Component Hierarchy**: Primitive → Block → Layout → Page.

---

## 3. Narrative Structure: The Anthology

### 3.1 Content Architecture

#### Chapter I: Identity
**Route:** `/identity`  
**Purpose:** Establish problem-solving philosophy and value proposition.

**Content Blocks:**
1. **Hero Statement** (max 280 characters)
   - Declarative value proposition
   - Keywords: "full-stack," "AI integration," "accessibility-first"
   
2. **Engineering Principles** (3-5 principles)
   - Each principle: heading + 2-3 sentence explanation
   - Example: "Composition Over Configuration"
   
3. **Technical Timeline** (interactive, not a resume)
   - Key inflection points in technical evolution
   - Semantic milestones (e.g., "Migrated monolith to microservices")

**Accessibility Requirements:**
- `<article>` wrapper with `aria-labelledby` referencing chapter heading
- Skip link to main content
- Semantic heading hierarchy (h1 → h2 → h3)

---

#### Chapter II: The Workshop
**Route:** `/workshop`  
**Purpose:** Curate toolkit and justify architectural choices.

**Content Sections:**

1. **Stack Audit** (categorized by layer)
   ```
   Frontend: Next.js, React, TypeScript, Tailwind CSS
   State Management: Server Components, React Context (minimal)
   Validation: Zod
   Backend: Serverless Functions, Supabase/Neon
   AI: Vercel AI SDK, pgvector
   Testing: Vitest, Playwright, Testing Library
   ```

2. **Decision Records** (ADR format)
   - Why Next.js App Router over Pages Router
   - Why Shadcn UI over component libraries (e.g., MUI)
   - Why pgvector over external vector DBs for MVP

3. **Tooling Philosophy**
   - Package manager: pnpm (strict peer dependencies)
   - Monorepo structure: Turborepo (if multi-app)
   - Linting: ESLint (Airbnb + accessibility plugins)

**Component Specification:**
- Tool cards with logo, description, and "Why I Use It" rationale
- Filter by category (Frontend, Backend, AI, Testing)
- Each card must have `role="article"` and `aria-label`

---

#### Chapter III: The Lab
**Route:** `/lab`  
**Purpose:** Deep-dive into 3-5 flagship projects (Rule of Five).

**Project Selection Criteria:**
1. Full-stack (frontend + backend + infrastructure)
2. Demonstrates specific skill cluster (e.g., real-time, AI, payments)
3. Production-deployed with measurable impact
4. Open-source or detailed case study available

**Project Card Anatomy:**
```typescript
interface ProjectCard {
  id: string;
  title: string; // max 60 chars
  tagline: string; // 15-20 words
  role: string; // "Solo Developer" | "Lead Engineer" | "Contributor"
  techStack: string[]; // exact matches from Workshop
  caseStudyUrl: string; // internal route or external link
  liveUrl?: string;
  repositoryUrl?: string;
  metrics: ProjectMetrics;
  thumbnailUrl: string; // 16:9 aspect ratio, optimized WebP
}

interface ProjectMetrics {
  impact: string; // "Reduced load time by 40%"
  scale?: string; // "10k+ MAU"
  timeframe: string; // "2 weeks" (adheres to Two-Week Rule)
}
```

**Layout Specification:**
- **Not a grid**: Use magazine-style asymmetric layout
- Featured project: full-width hero with parallax scroll
- Supporting projects: alternating left/right image-text blocks
- Mobile: stacked cards with optimized imagery

**Deep-Dive Case Study Structure:**
1. Problem Statement (1 paragraph, 60-80 words)
2. Constraints (technical and business)
3. Architecture Diagram (interactive SVG or static image)
4. Implementation Highlights (code snippets with syntax highlighting)
5. Challenges & Solutions (3-5 specific examples)
6. Metrics & Outcomes (quantitative results)
7. Lessons Learned (2-3 key takeaways)

---

#### Chapter IV: The Lens
**Route:** `/lens`  
**Purpose:** Technical writing, UI/UX critiques, debugging narratives.

**Content Types:**

1. **Technical Articles**
   - Long-form analysis (1200-2000 words)
   - Code examples with copy button
   - Table of contents with anchor links
   - Estimated read time

2. **UI/UX Critiques**
   - Before/after comparisons
   - WCAG violation breakdowns
   - Proposed solutions with code diffs

3. **Debugging Narratives** ("Hardest Bug" series)
   ```typescript
   interface BugNarrative {
     title: string; // "The Race Condition in React 18 Suspense"
     context: string; // Environment, stack, constraints
     symptoms: string[]; // Observable behaviors
     investigation: InvestigationStep[]; // Chronological steps
     rootCause: string; // Technical explanation
     solution: string; // Code fix with explanation
     prevention: string; // How to avoid in future
     timeInvested: string; // "8 hours over 2 days"
   }
   ```

4. **Open-Source Contributions**
   - PR summaries with diff previews
   - Community impact (stars, downloads, forks)

**SEO/GEO Optimization:**
- Meta descriptions: 150-160 characters
- Structured data: `Article` schema with `author`, `datePublished`, `headline`
- Keyword clustering in first 100 words
- Exact technical terms (no synonyms for indexing)

---

## 4. Technical Stack Specification

### 4.1 Core Dependencies

```json
{
  "dependencies": {
    "next": "^15.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "typescript": "^5.3.0",
    "tailwindcss": "^3.4.0",
    "zod": "^3.22.0",
    "@radix-ui/react-*": "latest",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.2.0",
    "ai": "^3.0.0",
    "@ai-sdk/openai": "^0.0.24",
    "@supabase/supabase-js": "^2.39.0",
    "sharp": "^0.33.0",
    "server-only": "^0.0.1"
  },
  "devDependencies": {
    "@types/node": "^20.10.0",
    "@types/react": "^18.2.0",
    "eslint": "^8.56.0",
    "eslint-config-next": "^15.0.0",
    "eslint-plugin-jsx-a11y": "^6.8.0",
    "prettier": "^3.1.0",
    "prettier-plugin-tailwindcss": "^0.5.0",
    "vitest": "^1.0.0",
    "@testing-library/react": "^14.1.0",
    "@playwright/test": "^1.40.0"
  }
}
```

### 4.2 Next.js Configuration

**File:** `next.config.js`

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    typedRoutes: true,
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'your-supabase-project.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
```

### 4.3 Tailwind Configuration

**File:** `tailwind.config.ts`

```typescript
import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

const config: Config = {
  darkMode: ['class'],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)', ...defaultTheme.fontFamily.sans],
        mono: ['var(--font-geist-mono)', ...defaultTheme.fontFamily.mono],
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '65ch',
            '--tw-prose-body': 'hsl(var(--foreground))',
            '--tw-prose-headings': 'hsl(var(--foreground))',
            '--tw-prose-links': 'hsl(var(--primary))',
            '--tw-prose-code': 'hsl(var(--foreground))',
            '--tw-prose-pre-bg': 'hsl(var(--muted))',
          },
        },
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    require('@tailwindcss/typography'),
  ],
};

export default config;
```

**Constraints:**
- **No arbitrary values** (e.g., `w-[32px]`): Use semantic spacing scale
- **Use CSS variables** for theme values to support dark mode
- **Typography plugin** for prose content in The Lens

### 4.4 Database Selection: Supabase vs. Neon

**Recommendation:** Supabase

| Criterion | Supabase | Neon |
|-----------|----------|------|
| pgvector Support | ✅ Native | ✅ Native |
| Edge Functions | ✅ Deno-based | ❌ (use Next.js instead) |
| Storage Buckets | ✅ Integrated | ❌ (use Vercel Blob) |
| Auth (if needed) | ✅ Built-in | ❌ (use NextAuth) |
| Free Tier | 500MB DB + 1GB storage | 512MB DB only |
| Connection Pooling | ✅ pgBouncer | ✅ Built-in |

**Decision:** Supabase for MVP due to integrated storage for project thumbnails and potential auth expansion.

---

## 5. Phase 2: V0 UI Generation Workflow

### 5.1 Design-to-Code Pipeline

```
┌──────────────┐      ┌──────────────┐      ┌──────────────┐
│   Ideation   │─────▶│  V0 Input    │─────▶│ V0 Generation│
│  (Concept)   │      │ (Multimodal) │      │ (React + TW) │
└──────────────┘      └──────────────┘      └──────┬───────┘
                                                    │
                                                    ▼
┌──────────────┐      ┌──────────────┐      ┌──────────────┐
│  Production  │◀─────│  Refinement  │◀─────│  V0 Export   │
│     Code     │      │  (Iteration) │      │   (Copy)     │
└──────────────┘      └──────────────┘      └──────────────┘
```

### 5.2 V0 Prompt Engineering Standards

**Input Constraints:**
1. **Always specify mobile-first**: "Design for mobile (375px) first, then desktop (1440px)"
2. **Reference Shadcn UI**: "Use Shadcn UI components with Tailwind CSS"
3. **Accessibility mandate**: "Ensure WCAG 2.2 Level AA compliance with semantic HTML and ARIA labels"
4. **No arbitrary values**: "Use Tailwind's default spacing scale (e.g., `p-4`, not `p-[18px]`)"

**Example Prompt Template:**

```
Create a responsive project card component for a developer portfolio.

REQUIREMENTS:
- Mobile-first (375px → 1440px)
- Use Shadcn UI Card primitive
- 16:9 aspect ratio image (Next.js Image component)
- Title (h3), tagline (p), tech stack (pill badges), CTA button
- Hover state with subtle scale and shadow
- WCAG AA contrast ratios
- Semantic HTML (article wrapper)
- No arbitrary Tailwind values

STYLE:
- Dark mode support via CSS variables
- Typography: Geist Sans font family
- Colors: Use semantic tokens (primary, muted, accent)
```

### 5.3 V0 Output Validation Checklist

Before copying code from v0 to IDE:

- [ ] **TypeScript types defined** for all props
- [ ] **Shadcn UI components imported** (not raw Radix UI)
- [ ] **No arbitrary values** (search for `[` in className strings)
- [ ] **Semantic HTML tags** (`<article>`, `<section>`, `<nav>`)
- [ ] **ARIA labels present** on interactive elements
- [ ] **Dark mode variables** used (e.g., `bg-background` not `bg-white`)
- [ ] **Next.js Image** used instead of `<img>` tag
- [ ] **Responsive classes** present (`sm:`, `md:`, `lg:`)

### 5.4 V0 Iteration Protocol

**Iteration Strategy:**
1. **First Pass**: Generate full-page layout with placeholder content
2. **Second Pass**: Refine individual sections (hero, project cards, footer)
3. **Third Pass**: Interactive states (hover, focus, loading)
4. **Fourth Pass**: Accessibility audit (run prompt: "Audit this for WCAG AA compliance")

**Version Control:**
- Save each v0 generation as `components/v0/[component-name]-v[n].tsx`
- Keep iteration history for comparison
- Final production version moves to `components/ui` or `components/blocks`

### 5.5 Multimodal Input Workflow

**Screenshot/Wireframe Upload:**
1. Create low-fidelity wireframe in Figma or hand-drawn sketch
2. Export as PNG (max 2MB)
3. Upload to v0 with prompt: "Convert this wireframe to React + Tailwind with Shadcn UI"
4. Specify any deviations from wireframe in text prompt

**Reference Image Constraints:**
- **Aspect ratio**: Match target viewport (mobile: 9:16, desktop: 16:9)
- **Annotations**: Use arrows and labels for interactive elements
- **Color codes**: Provide hex values for brand colors if deviating from default theme

---

## 6. Component Architecture

### 6.1 Directory Structure

```
src/
├── app/                          # Next.js App Router
│   ├── (chapters)/               # Route group for anthology
│   │   ├── identity/
│   │   │   ├── page.tsx
│   │   │   └── layout.tsx
│   │   ├── workshop/
│   │   │   └── page.tsx
│   │   ├── lab/
│   │   │   ├── page.tsx
│   │   │   └── [projectId]/
│   │   │       └── page.tsx
│   │   └── lens/
│   │       ├── page.tsx
│   │       └── [articleSlug]/
│   │           └── page.tsx
│   ├── api/
│   │   ├── chat/
│   │   │   └── route.ts          # AI chat endpoint
│   │   └── embeddings/
│   │       └── route.ts          # RAG pipeline
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Home (anthology index)
│   └── globals.css               # Tailwind directives + CSS vars
├── components/
│   ├── ui/                       # Shadcn primitives (CLI-generated)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── input.tsx
│   │   └── ...
│   ├── blocks/                   # Composed components
│   │   ├── project-card.tsx
│   │   ├── skill-badge.tsx
│   │   ├── chapter-nav.tsx
│   │   └── ai-chat-interface.tsx
│   ├── layouts/                  # Page-level layouts
│   │   ├── chapter-layout.tsx
│   │   └── article-layout.tsx
│   └── providers/
│       └── theme-provider.tsx    # Dark mode context
├── lib/
│   ├── utils.ts                  # cn() helper, etc.
│   ├── validations/
│   │   ├── project.ts            # Zod schemas
│   │   ├── article.ts
│   │   └── chat.ts
│   ├── db/
│   │   ├── supabase.ts           # Client initialization
│   │   ├── queries.ts            # Type-safe queries
│   │   └── migrations/
│   └── ai/
│       ├── rag-pipeline.ts       # Embedding + retrieval
│       ├── tools.ts              # Function definitions
│       └── prompts.ts            # System prompts
├── public/
│   ├── projects/                 # Optimized images
│   └── og/                       # Open Graph images
└── types/
    ├── database.types.ts         # Generated from Supabase
    └── index.ts                  # Shared types
```

### 6.2 Component Composition Rules

1. **Primitives** (`components/ui/`):
   - Generated via Shadcn CLI: `pnpm dlx shadcn-ui@latest add [component]`
   - **Never modify** directly (except for theme token alignment)
   - Use `className` prop for composition

2. **Blocks** (`components/blocks/`):
   - Composed from primitives
   - Accept business-domain props (e.g., `ProjectCard` takes `project: Project`)
   - Handle internal state (hover, focus)
   - **Must export TypeScript interface** for props

3. **Layouts** (`components/layouts/`):
   - Accept `children` prop
   - Handle page-level concerns (breadcrumbs, chapter navigation)
   - Integrate skip links and landmark regions

### 6.3 Example: ProjectCard Component

**File:** `components/blocks/project-card.tsx`

```typescript
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import type { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
  className?: string;
}

export function ProjectCard({ project, featured = false, className }: ProjectCardProps) {
  return (
    <Card
      className={cn(
        'group overflow-hidden transition-all hover:shadow-lg',
        featured && 'md:col-span-2',
        className
      )}
      asChild
    >
      <article aria-labelledby={`project-${project.id}-title`}>
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={project.thumbnailUrl}
            alt={`Screenshot of ${project.title} project`}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes={featured ? '(min-width: 768px) 66vw, 100vw' : '(min-width: 768px) 33vw, 100vw'}
          />
        </div>
        
        <CardHeader>
          <h3 id={`project-${project.id}-title`} className="text-xl font-semibold">
            {project.title}
          </h3>
          <p className="text-sm text-muted-foreground">{project.tagline}</p>
        </CardHeader>

        <CardContent>
          <div className="flex flex-wrap gap-2" role="list" aria-label="Technologies used">
            {project.techStack.map((tech) => (
              <Badge key={tech} variant="secondary" role="listitem">
                {tech}
              </Badge>
            ))}
          </div>
          
          {project.metrics && (
            <p className="mt-4 text-sm font-medium text-primary">
              {project.metrics.impact}
            </p>
          )}
        </CardContent>

        <CardFooter>
          <Button asChild className="w-full">
            <Link href={project.caseStudyUrl}>
              View Case Study
              <span className="sr-only"> for {project.title}</span>
            </Link>
          </Button>
        </CardFooter>
      </article>
    </Card>
  );
}
```

**Validation:**
- ✅ Semantic HTML (`<article>`)
- ✅ ARIA labels (`aria-labelledby`, `sr-only` for context)
- ✅ Composed from Shadcn primitives
- ✅ TypeScript interface exported
- ✅ No arbitrary values (uses `aspect-video`, `gap-2`, etc.)
- ✅ Responsive images with `sizes` attribute

---

## 7. AI Integration Architecture

### 7.1 RAG Pipeline Specification

**Objective:** Enable recruiters and visitors to ask natural language questions about your skills, projects, and experience with zero hallucinations.

#### 7.1.1 Data Ingestion Flow

```
┌─────────────────┐
│  Source Content │  (Projects, Articles, Workshop Tools)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Semantic Chunker│  (LangChain RecursiveCharacterTextSplitter)
│  - 512 tokens   │
│  - 50 overlap   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Embedding Model │  (OpenAI text-embedding-3-small, 1536 dims)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Vector Store   │  (Supabase pgvector)
│  - Cosine sim.  │
│  - HNSW index   │
└─────────────────┘
```

#### 7.1.2 Database Schema for pgvector

**File:** `lib/db/migrations/001_create_embeddings.sql`

```sql
-- Enable pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Embeddings table
CREATE TABLE embeddings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content TEXT NOT NULL,
  metadata JSONB NOT NULL, -- { type: 'project' | 'article' | 'tool', id: string, title: string }
  embedding VECTOR(1536) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- HNSW index for fast similarity search
CREATE INDEX ON embeddings USING hnsw (embedding vector_cosine_ops);

-- Function for similarity search
CREATE OR REPLACE FUNCTION match_embeddings(
  query_embedding VECTOR(1536),
  match_threshold FLOAT,
  match_count INT
)
RETURNS TABLE (
  id UUID,
  content TEXT,
  metadata JSONB,
  similarity FLOAT
)
LANGUAGE SQL STABLE
AS $$
  SELECT
    id,
    content,
    metadata,
    1 - (embedding <=> query_embedding) AS similarity
  FROM embeddings
  WHERE 1 - (embedding <=> query_embedding) > match_threshold
  ORDER BY similarity DESC
  LIMIT match_count;
$$;
```

#### 7.1.3 Embedding Generation Script

**File:** `lib/ai/generate-embeddings.ts`

```typescript
import { openai } from '@ai-sdk/openai';
import { embed } from 'ai';
import { createClient } from '@supabase/supabase-js';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { projectsData, articlesData, workshopData } from '@/data'; // Static data exports

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Use service role for write access
);

const textSplitter = new RecursiveCharacterTextSplitter({
  chunkSize: 512,
  chunkOverlap: 50,
});

async function generateEmbeddings() {
  // Combine all content sources
  const contentItems = [
    ...projectsData.map(p => ({
      type: 'project' as const,
      id: p.id,
      title: p.title,
      content: `${p.title}\n${p.tagline}\n${p.fullDescription}\nTech: ${p.techStack.join(', ')}`,
    })),
    ...articlesData.map(a => ({
      type: 'article' as const,
      id: a.slug,
      title: a.title,
      content: `${a.title}\n${a.excerpt}\n${a.body}`,
    })),
    ...workshopData.map(t => ({
      type: 'tool' as const,
      id: t.name,
      title: t.name,
      content: `${t.name}\n${t.category}\n${t.rationale}`,
    })),
  ];

  for (const item of contentItems) {
    // Split content into chunks
    const chunks = await textSplitter.splitText(item.content);

    for (const chunk of chunks) {
      // Generate embedding
      const { embedding } = await embed({
        model: openai.embedding('text-embedding-3-small'),
        value: chunk,
      });

      // Insert into database
      await supabase.from('embeddings').insert({
        content: chunk,
        metadata: {
          type: item.type,
          id: item.id,
          title: item.title,
        },
        embedding,
      });
    }
  }

  console.log('✅ Embeddings generated and stored');
}

generateEmbeddings();
```

**Execution:** Run as a build step or manually via `tsx lib/ai/generate-embeddings.ts`

#### 7.1.4 RAG Query Pipeline

**File:** `lib/ai/rag-pipeline.ts`

```typescript
import { openai } from '@ai-sdk/openai';
import { embed } from 'ai';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export async function retrieveContext(query: string, topK = 5) {
  // Generate embedding for user query
  const { embedding } = await embed({
    model: openai.embedding('text-embedding-3-small'),
    value: query,
  });

  // Retrieve similar chunks
  const { data: matches, error } = await supabase.rpc('match_embeddings', {
    query_embedding: embedding,
    match_threshold: 0.7, // Minimum similarity score
    match_count: topK,
  });

  if (error) throw error;

  // Format context for prompt
  const context = matches
    .map(
      (match: any) =>
        `[${match.metadata.type}: ${match.metadata.title}]\n${match.content}`
    )
    .join('\n\n---\n\n');

  return {
    context,
    sources: matches.map((m: any) => ({
      type: m.metadata.type,
      id: m.metadata.id,
      title: m.metadata.title,
      similarity: m.similarity,
    })),
  };
}
```

### 7.2 Agentic Tool-Calling Architecture

**Objective:** Enable the AI to perform multi-step reasoning with access to structured data tools.

#### 7.2.1 Tool Definitions

**File:** `lib/ai/tools.ts`

```typescript
import { tool } from 'ai';
import { z } from 'zod';
import { getProjectById, searchArticles, getSkillsByCategory } from '@/lib/db/queries';

export const tools = {
  getProjectDetails: tool({
    description: 'Retrieve detailed information about a specific project by ID',
    parameters: z.object({
      projectId: z.string().describe('The unique identifier of the project'),
    }),
    execute: async ({ projectId }) => {
      const project = await getProjectById(projectId);
      return project;
    },
  }),

  searchTechnicalArticles: tool({
    description: 'Search through technical articles and blog posts',
    parameters: z.object({
      query: z.string().describe('Search query for articles'),
      limit: z.number().optional().default(5),
    }),
    execute: async ({ query, limit }) => {
      const articles = await searchArticles(query, limit);
      return articles;
    },
  }),

  getSkillProficiency: tool({
    description: 'Get proficiency level and experience with specific technologies',
    parameters: z.object({
      category: z
        .enum(['frontend', 'backend', 'ai', 'testing', 'infrastructure'])
        .describe('Technology category'),
    }),
    execute: async ({ category }) => {
      const skills = await getSkillsByCategory(category);
      return skills;
    },
  }),

  calculateProjectTimeline: tool({
    description: 'Calculate total development time across projects',
    parameters: z.object({
      projectIds: z.array(z.string()).describe('Array of project IDs to analyze'),
    }),
    execute: async ({ projectIds }) => {
      // Business logic to sum timeframes
      const projects = await Promise.all(projectIds.map(getProjectById));
      const totalWeeks = projects.reduce((sum, p) => {
        const weeks = parseInt(p.metrics.timeframe) || 0;
        return sum + weeks;
      }, 0);
      return { totalWeeks, projects: projects.length };
    },
  }),
};
```

#### 7.2.2 AI Chat Route Handler

**File:** `app/api/chat/route.ts`

```typescript
import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { z } from 'zod';
import { tools } from '@/lib/ai/tools';
import { retrieveContext } from '@/lib/ai/rag-pipeline';

// Schema validation for incoming messages
const messageSchema = z.object({
  messages: z.array(
    z.object({
      role: z.enum(['user', 'assistant', 'system']),
      content: z.string(),
    })
  ),
});

export async function POST(req: Request) {
  const body = await req.json();
  const { messages } = messageSchema.parse(body);

  // Get last user message for RAG
  const lastUserMessage = messages.filter((m) => m.role === 'user').pop();
  
  // Retrieve relevant context
  const { context, sources } = await retrieveContext(lastUserMessage?.content || '');

  // System prompt with context injection
  const systemPrompt = `You are an AI assistant for a senior full-stack developer's portfolio.

CONTEXT FROM PORTFOLIO:
${context}

INSTRUCTIONS:
- Answer questions about projects, skills, experience, and technical articles
- Cite sources by mentioning the project/article title
- If information is not in the context, use available tools to retrieve it
- Be concise and technical (assume audience is engineering recruiters)
- If asked about availability or contact, politely decline and suggest using the contact form

AVAILABLE SOURCES:
${sources.map((s: any) => `- ${s.type}: ${s.title} (${(s.similarity * 100).toFixed(0)}% match)`).join('\n')}`;

  const result = streamText({
    model: openai('gpt-4-turbo'),
    messages: [
      { role: 'system', content: systemPrompt },
      ...messages,
    ],
    tools,
    maxSteps: 5, // Allow multi-step tool calling
  });

  return result.toDataStreamResponse();
}
```

#### 7.2.3 Client-Side Chat Interface

**File:** `components/blocks/ai-chat-interface.tsx`

```typescript
'use client';

import { useChat } from 'ai/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

export function AIChatInterface() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
  });

  return (
    <Card className="flex h-[600px] flex-col">
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4" role="log" aria-live="polite" aria-atomic="false">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                'flex flex-col gap-2',
                message.role === 'user' ? 'items-end' : 'items-start'
              )}
            >
              <div
                className={cn(
                  'rounded-lg px-4 py-2 max-w-[80%]',
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                )}
              >
                <p className="text-sm">{message.content}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="animate-pulse">Thinking...</span>
            </div>
          )}
        </div>
      </ScrollArea>

      <form onSubmit={handleSubmit} className="flex gap-2 p-4 border-t">
        <Input
          value={input}
          onChange={handleInputChange}
          placeholder="Ask about my projects, skills, or experience..."
          disabled={isLoading}
          aria-label="Chat message input"
          className="flex-1"
        />
        <Button type="submit" disabled={isLoading}>
          Send
        </Button>
      </form>
    </Card>
  );
}
```

**Accessibility Requirements:**
- `role="log"` with `aria-live="polite"` for screen reader announcements
- Loading state clearly indicated
- Keyboard navigation support (Tab, Enter)
- High contrast colors (verified with WCAG contrast checker)

### 7.3 Error Recovery & Rate Limiting

**File:** `app/api/chat/route.ts` (extended)

```typescript
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '1 m'), // 10 requests per minute
});

export async function POST(req: Request) {
  // Rate limiting
  const ip = req.headers.get('x-forwarded-for') ?? 'unknown';
  const { success, limit, remaining } = await ratelimit.limit(ip);

  if (!success) {
    return new Response('Rate limit exceeded', { status: 429 });
  }

  try {
    const body = await req.json();
    const { messages } = messageSchema.parse(body);

    // ... rest of implementation
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify({ error: 'Invalid request format' }), {
        status: 400,
      });
    }

    console.error('Chat API error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
    });
  }
}
```

---

## 8. Accessibility Requirements (WCAG 2.2 Level AA)

### 8.1 Success Criteria Checklist

| Criterion | Requirement | Implementation |
|-----------|-------------|----------------|
| **1.1.1 Non-text Content** | All images have alt text | `Image` component with descriptive `alt` |
| **1.3.1 Info and Relationships** | Semantic HTML structure | `<article>`, `<nav>`, `<section>`, headings |
| **1.4.3 Contrast (Minimum)** | 4.5:1 for text, 3:1 for large text | CSS variables verified with contrast checker |
| **1.4.10 Reflow** | No horizontal scroll at 320px | Mobile-first responsive design |
| **2.1.1 Keyboard** | All functionality via keyboard | `tabindex`, focus states, skip links |
| **2.4.1 Bypass Blocks** | Skip to main content link | `<a href="#main-content">Skip to content</a>` |
| **2.4.3 Focus Order** | Logical tab sequence | DOM order matches visual order |
| **2.4.7 Focus Visible** | Clear focus indicators | Tailwind `ring` utilities on `:focus-visible` |
| **3.1.1 Language of Page** | `lang` attribute | `<html lang="en">` |
| **4.1.2 Name, Role, Value** | ARIA labels on interactive elements | `aria-label`, `aria-labelledby`, `aria-describedby` |

### 8.2 Implementation Details

#### 8.2.1 Skip Link

**File:** `app/layout.tsx`

```typescript
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('font-sans antialiased', geistSans.variable)}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-primary focus:text-primary-foreground"
        >
          Skip to main content
        </a>
        
        <ThemeProvider attribute="class" defaultTheme="system">
          <div className="relative flex min-h-screen flex-col">
            <SiteHeader />
            <main id="main-content" className="flex-1">
              {children}
            </main>
            <SiteFooter />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
```

#### 8.2.2 Focus Management

**Tailwind Configuration Addition:**

```typescript
// tailwind.config.ts (extend section)
extend: {
  ringWidth: {
    DEFAULT: '2px',
  },
  ringOffsetWidth: {
    DEFAULT: '2px',
  },
}
```

**Global CSS:**

```css
/* app/globals.css */
@layer base {
  * {
    @apply focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2;
  }
}
```

#### 8.2.3 ARIA Landmarks

```typescript
// components/layouts/site-header.tsx
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <nav className="container flex h-16 items-center" aria-label="Main navigation">
        {/* Navigation items */}
      </nav>
    </header>
  );
}

// components/layouts/site-footer.tsx
export function SiteFooter() {
  return (
    <footer className="border-t bg-muted/50" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      {/* Footer content */}
    </footer>
  );
}
```

### 8.3 Automated Testing

**File:** `tests/accessibility.spec.ts`

```typescript
import { test, expect } from '@playwright/test';
import { injectAxe, checkA11y } from 'axe-playwright';

test.describe('Accessibility Tests', () => {
  test('Identity page passes axe', async ({ page }) => {
    await page.goto('/identity');
    await injectAxe(page);
    await checkA11y(page, null, {
      detailedReport: true,
      detailedReportOptions: { html: true },
    });
  });

  test('Keyboard navigation works', async ({ page }) => {
    await page.goto('/');
    
    // Press Tab to focus skip link
    await page.keyboard.press('Tab');
    const skipLink = page.getByText('Skip to main content');
    await expect(skipLink).toBeFocused();

    // Activate skip link
    await page.keyboard.press('Enter');
    const mainContent = page.locator('#main-content');
    await expect(mainContent).toBeFocused();
  });

  test('Color contrast meets WCAG AA', async ({ page }) => {
    await page.goto('/');
    await injectAxe(page);
    await checkA11y(page, null, {
      rules: {
        'color-contrast': { enabled: true },
      },
    });
  });
});
```

---

## 9. Generative Engine Optimization (GEO)

### 9.1 GEO Principles

**Objective:** Maximize discoverability and accurate citation by LLM-powered search engines (ChatGPT Search, Perplexity, SearchGPT).

**Differences from Traditional SEO:**

| Aspect | SEO | GEO |
|--------|-----|-----|
| Target | Search crawlers | LLM context windows |
| Content Style | Keyword density | Declarative sentences |
| Structure | Backlinks + meta tags | Semantic HTML + schema |
| Optimization | Page rank | Citation likelihood |

### 9.2 Content Guidelines

#### 9.2.1 Sentence Structure
- **Max 15-20 words per sentence**
- **Declarative format**: "I built X using Y to solve Z"
- **Avoid ambiguity**: "React" not "the framework," "PostgreSQL" not "the database"

**Example (Bad):**
> "I've worked extensively with modern JavaScript frameworks and have deep expertise in building scalable applications using the latest technologies."

**Example (Good):**
> "I build production Next.js applications with TypeScript. I use Tailwind CSS for styling. I implement WCAG 2.2 Level AA accessibility standards."

#### 9.2.2 Keyword Clustering

**Primary Keywords (exact matches required):**
- Full-stack developer
- Next.js 15 App Router
- TypeScript
- Tailwind CSS
- Shadcn UI
- React 19 Server Components
- Retrieval-Augmented Generation (RAG)
- WCAG 2.2 accessibility
- Serverless Postgres
- Supabase pgvector

**Semantic Clusters:**
- **Frontend:** React, Next.js, TypeScript, Tailwind CSS, Radix UI, component composition
- **AI Engineering:** RAG pipeline, vector embeddings, OpenAI API, agentic workflows, tool calling
- **Accessibility:** WCAG AA, ARIA, semantic HTML, keyboard navigation, screen reader support
- **Backend:** Serverless functions, Postgres, Supabase, edge runtime, API routes

**Placement Strategy:**
- First 100 words of each page must include 3-5 primary keywords
- Headings must contain exact technical terms (e.g., "RAG Pipeline Architecture")
- Project descriptions must list exact tech stack names

### 9.3 Structured Data Implementation

**File:** `app/identity/page.tsx`

```typescript
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Identity | Full-Stack Developer & AI Engineer',
  description:
    'Senior full-stack developer specializing in Next.js, TypeScript, and AI integration. I build accessible, production-grade applications with RAG pipelines and agentic workflows.',
  openGraph: {
    title: 'Identity | Full-Stack Developer & AI Engineer',
    description:
      'Senior full-stack developer specializing in Next.js, TypeScript, and AI integration.',
    type: 'profile',
    url: 'https://yourportfolio.com/identity',
  },
};

export default function IdentityPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'Your Name',
            jobTitle: 'Senior Full-Stack Developer',
            knowsAbout: [
              'Next.js',
              'TypeScript',
              'React',
              'Tailwind CSS',
              'Retrieval-Augmented Generation',
              'WCAG Accessibility',
              'Serverless Architecture',
            ],
            url: 'https://yourportfolio.com',
            sameAs: [
              'https://github.com/yourusername',
              'https://linkedin.com/in/yourusername',
            ],
          }),
        }}
      />
      {/* Page content */}
    </>
  );
}
```

**File:** `app/lab/[projectId]/page.tsx`

```typescript
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = await getProjectById(params.projectId);

  return {
    title: `${project.title} | Project Case Study`,
    description: project.tagline,
    openGraph: {
      title: project.title,
      description: project.tagline,
      type: 'article',
      publishedTime: project.completedDate,
      tags: project.techStack,
      images: [
        {
          url: project.thumbnailUrl,
          width: 1200,
          height: 630,
          alt: `Screenshot of ${project.title}`,
        },
      ],
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const project = await getProjectById(params.projectId);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'TechArticle',
            headline: project.title,
            description: project.tagline,
            author: {
              '@type': 'Person',
              name: 'Your Name',
            },
            datePublished: project.completedDate,
            keywords: project.techStack.join(', '),
          }),
        }}
      />
      {/* Project content */}
    </>
  );
}
```

### 9.4 Sitemap Configuration

**File:** `app/sitemap.ts`

```typescript
import { MetadataRoute } from 'next';
import { getAllProjects, getAllArticles } from '@/lib/db/queries';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getAllProjects();
  const articles = await getAllArticles();

  const baseUrl = 'https://yourportfolio.com';

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/identity`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/workshop`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/lab`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...projects.map((project) => ({
      url: `${baseUrl}/lab/${project.id}`,
      lastModified: new Date(project.updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    {
      url: `${baseUrl}/lens`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...articles.map((article) => ({
      url: `${baseUrl}/lens/${article.slug}`,
      lastModified: new Date(article.publishedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ];
}
```

### 9.5 robots.txt

**File:** `app/robots.ts`

```typescript
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
      {
        userAgent: 'GPTBot', // OpenAI crawler
        allow: '/',
      },
      {
        userAgent: 'ChatGPT-User', // ChatGPT browser
        allow: '/',
      },
    ],
    sitemap: 'https://yourportfolio.com/sitemap.xml',
  };
}
```

---

## 10. Feature Requirements: MoSCoW Method

### 10.1 Must-Have (MVP - Week 1-2)

| Feature | Description | Time Estimate | Acceptance Criteria |
|---------|-------------|---------------|---------------------|
| **Navigation Structure** | Header with chapter links, mobile menu | 4 hours | All pages accessible, keyboard navigable, ARIA labels |
| **Identity Page** | Hero, principles, timeline | 8 hours | Static content, responsive, WCAG AA |
| **Workshop Page** | Stack audit, decision records | 6 hours | Filterable tools, semantic HTML |
| **Lab Page (Grid)** | 3-5 project cards, basic layout | 8 hours | Cards clickable, images optimized |
| **Project Detail Page** | Case study template (1 project) | 12 hours | Full narrative, code snippets, metrics |
| **Dark Mode** | Theme toggle with system preference | 4 hours | Persists preference, smooth transition |
| **Responsive Design** | Mobile-first (375px → 1440px) | 8 hours | No horizontal scroll, touch targets 44px+ |
| **SEO Basics** | Meta tags, Open Graph, sitemap | 4 hours | All pages indexed, social previews work |
| **Contact Form** | Email submission (Resend API) | 6 hours | Zod validation, rate limiting, success state |

**Total: ~60 hours (~2 weeks at 30 hrs/week)**

### 10.2 Should-Have (Post-MVP - Week 3-4)

| Feature | Description | Rationale |
|---------|-------------|-----------|
| **AI Chat Interface** | RAG-powered Q&A | Showcase AI competency |
| **Lens Page** | Article listing and detail pages | Demonstrate writing ability |
| **Search** | Full-text search across projects/articles | Improve UX for recruiters |
| **Analytics** | Vercel Analytics or Plausible | Track engagement metrics |
| **Advanced Animations** | Framer Motion transitions | Polish, delight factor |
| **Blog RSS Feed** | XML feed for articles | Discoverability |

### 10.3 Could-Have (Future Iterations)

| Feature | Description | Risk |
|---------|-------------|------|
| **Resume Builder** | Dynamic resume generation from data | Scope creep |
| **Project Filtering** | Filter by tech stack, category | Low priority for MVP |
| **Testimonials** | Client/colleague recommendations | Requires outreach |
| **Multilingual Support** | i18n for non-English markets | Not target audience |
| **Email Newsletter** | Capture subscribers | Maintenance overhead |

### 10.4 Won't-Have (Out of Scope)

- **User Authentication**: No user accounts needed
- **E-commerce**: No paid services offered
- **Social Features**: No comments, likes, or shares
- **Real-time Collaboration**: No multiplayer features
- **Mobile App**: Web-only for MVP

### 10.5 Two-Week Rule Validation

**Rule:** Any Must-Have feature requiring >16 hours moves to Should-Have.

**Audit:**
- ✅ All Must-Have features ≤12 hours
- ✅ Total MVP time = 60 hours (2 weeks at 30 hrs/week)
- ⚠️ If AI Chat is promoted to Must-Have, estimate 20 hours → Move Project Detail (12h) to Should-Have to compensate

---

## 11. User Journey Maps

### 11.1 Persona 1: Technical Recruiter

**Name:** Sarah Chen  
**Role:** Senior Technical Recruiter at FAANG  
**Goal:** Assess full-stack competency for Senior Engineer role  
**Context:** Reviewing 20 portfolios/day, spends 3-5 minutes per site  

#### Journey Map

```
Entry Point: Google search "senior next.js developer portfolio"
     ↓
Landing Page (Homepage)
  ├─ Scans hero statement (15 seconds)
  ├─ Sees chapter navigation (5 seconds)
  └─ Decision: Click "The Lab" (most relevant)
     ↓
Lab Page
  ├─ Sees 5 project cards with tech badges (20 seconds)
  ├─ Filters for "Next.js + TypeScript" (10 seconds)
  ├─ Clicks featured project (highest impact metric)
     ↓
Project Detail Page
  ├─ Reads problem statement (30 seconds)
  ├─ Scans architecture diagram (20 seconds)
  ├─ Reviews code snippets (40 seconds)
  ├─ Checks metrics ("40% faster load time") (10 seconds)
  └─ Decision: Open resume/contact form
     ↓
Contact Form
  ├─ Fills out 4 fields (45 seconds)
  ├─ Submits (5 seconds)
  └─ Sees success message with expected response time
     ↓
Exit: Adds to "Interview" shortlist

Total Time: 4 minutes 15 seconds
Conversion: HIGH (interview requested)
```

**Pain Points:**
- ❌ Too much text in hero (loses interest)
- ❌ Projects not filterable (wastes time)
- ❌ No clear "View Resume" CTA (friction)

**Solutions:**
- ✅ Hero max 280 chars (2 sentences)
- ✅ Filter by tech stack on Lab page
- ✅ Sticky "Download Resume" button in header

---

### 11.2 Persona 2: AI Sourcing Agent (ChatGPT Search)

**Agent:** ChatGPT-4 with browsing enabled  
**Query:** "Find a senior full-stack developer with RAG pipeline experience and Next.js expertise"  
**Context:** Parsing 100+ websites, extracting structured data  

#### Journey Map

```
Entry Point: LLM crawls sitemap.xml
     ↓
Identity Page
  ├─ Extracts Person schema (name, jobTitle, knowsAbout)
  ├─ Indexes primary keywords (Next.js, RAG, TypeScript)
  ├─ Parses first 100 words for declarative sentences
  └─ Confidence: 85% match to query
     ↓
Workshop Page
  ├─ Extracts tech stack list (exact terms)
  ├─ Indexes decision records (ADR keywords)
  └─ Validation: "RAG" + "Next.js" both present
     ↓
Lab Page
  ├─ Iterates over project cards
  ├─ Extracts TechArticle schema from featured project
  ├─ Finds "RAG Pipeline" in project title
  └─ Confidence: 95% match
     ↓
Project Detail: RAG E-commerce Assistant
  ├─ Extracts implementation details (chunking, embeddings)
  ├─ Finds quantitative metrics ("99.2% accuracy")
  ├─ Indexes code snippets (validates technical depth)
  └─ Final Confidence: 98% match
     ↓
Response Generation:
  "I found [Your Name], a senior full-stack developer with production 
   RAG experience. They built a RAG-powered e-commerce assistant using 
   Next.js and achieved 99.2% answer accuracy. View their portfolio: 
   [link to project]"

Result: TOP 3 CITATION
```

**Success Factors:**
- ✅ Structured data on all pages
- ✅ Exact keyword matches (no synonyms)
- ✅ Quantitative metrics (validates claims)
- ✅ Semantic HTML (assists parsing)

**Failure Points:**
- ❌ Vague language ("worked with AI") → Low confidence
- ❌ Missing schema → No citation
- ❌ Ambiguous headings ("My Work") → Skipped

---

### 11.3 Persona 3: Peer Developer

**Name:** Alex Rodriguez  
**Role:** Mid-level Frontend Developer  
**Goal:** Learn implementation patterns, get inspired  
**Context:** Following your Twitter/GitHub, casual browsing  

#### Journey Map

```
Entry Point: Twitter link to article "Hardest Bug: React 18 Suspense Race Condition"
     ↓
Lens Page (Article Detail)
  ├─ Reads title and estimated time (5 min read)
  ├─ Scrolls through table of contents
  ├─ Jumps to "Investigation Steps" section
  ├─ Copies code snippet (uses copy button)
  ├─ Reads "Root Cause" explanation (learns new pattern)
  └─ Decision: Explore more articles
     ↓
Lens Page (Article Listing)
  ├─ Sees 8 articles with tags
  ├─ Filters by "React" tag
  ├─ Clicks "UI/UX Critique: Accessibility Violations in MUI"
     ↓
Article Detail
  ├─ Sees before/after comparison images
  ├─ Reviews WCAG violation breakdown
  ├─ Copies proposed solution code
  └─ Decision: Check out projects
     ↓
Lab Page
  ├─ Sees featured project with RAG integration
  ├─ Clicks "View Repository" (GitHub)
     ↓
GitHub Repository
  ├─ Reads README
  ├─ Stars repository
  └─ Returns to portfolio to bookmark
     ↓
Exit: Adds to browser bookmarks, follows on GitHub

Total Time: 18 minutes
Conversion: MEDIUM (no direct ask, but social proof gained)
```

**Engagement Signals:**
- ✅ Code snippets with syntax highlighting
- ✅ Copy button on code blocks
- ✅ External links to GitHub
- ✅ Clear technical explanations

---

## 12. Data Schema & Validation

### 12.1 Database Schema

**File:** `lib/db/schema.sql`

```sql
-- Projects table
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(60) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  tagline VARCHAR(200) NOT NULL,
  full_description TEXT NOT NULL,
  role VARCHAR(50) NOT NULL, -- 'Solo Developer' | 'Lead Engineer' | 'Contributor'
  tech_stack TEXT[] NOT NULL,
  case_study_content TEXT,
  live_url VARCHAR(500),
  repository_url VARCHAR(500),
  thumbnail_url VARCHAR(500) NOT NULL,
  completed_date DATE NOT NULL,
  timeframe VARCHAR(50) NOT NULL, -- '2 weeks', '1 month', etc.
  impact_metric VARCHAR(200),
  scale_metric VARCHAR(200),
  featured BOOLEAN DEFAULT FALSE,
  display_order INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Articles table
CREATE TABLE articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(100) NOT NULL,
  slug VARCHAR(150) UNIQUE NOT NULL,
  excerpt VARCHAR(300) NOT NULL,
  body TEXT NOT NULL,
  category VARCHAR(50) NOT NULL, -- 'technical' | 'critique' | 'debugging'
  tags TEXT[] NOT NULL,
  cover_image_url VARCHAR(500),
  read_time_minutes INTEGER NOT NULL,
  published_at TIMESTAMPTZ NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  view_count INTEGER DEFAULT 0
);

-- Workshop tools table
CREATE TABLE workshop_tools (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  category VARCHAR(50) NOT NULL, -- 'frontend' | 'backend' | 'ai' | 'testing' | 'infrastructure'
  description TEXT NOT NULL,
  rationale TEXT NOT NULL, -- "Why I Use It" section
  logo_url VARCHAR(500),
  website_url VARCHAR(500),
  display_order INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Contact form submissions
CREATE TABLE contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  company VARCHAR(150),
  message TEXT NOT NULL,
  source VARCHAR(50), -- 'contact_form' | 'ai_chat'
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  responded_at TIMESTAMPTZ
);

-- Indexes
CREATE INDEX idx_projects_slug ON projects(slug);
CREATE INDEX idx_projects_featured ON projects(featured) WHERE featured = TRUE;
CREATE INDEX idx_articles_slug ON articles(slug);
CREATE INDEX idx_articles_published_at ON articles(published_at DESC);
CREATE INDEX idx_contact_created_at ON contact_submissions(created_at DESC);
```

### 12.2 Zod Schemas

**File:** `lib/validations/project.ts`

```typescript
import { z } from 'zod';

export const projectSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(5).max(60),
  slug: z.string().min(5).max(100).regex(/^[a-z0-9-]+$/),
  tagline: z.string().min(15).max(200),
  fullDescription: z.string().min(100),
  role: z.enum(['Solo Developer', 'Lead Engineer', 'Contributor']),
  techStack: z.array(z.string()).min(2).max(10),
  caseStudyContent: z.string().optional(),
  liveUrl: z.string().url().optional(),
  repositoryUrl: z.string().url().optional(),
  thumbnailUrl: z.string().url(),
  completedDate: z.date(),
  timeframe: z.string().regex(/^\d+\s+(weeks?|months?)$/),
  impactMetric: z.string().max(200).optional(),
  scaleMetric: z.string().max(200).optional(),
  featured: z.boolean().default(false),
  displayOrder: z.number().int().positive(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Project = z.infer<typeof projectSchema>;

// Form schema (subset for creation)
export const createProjectSchema = projectSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type CreateProjectInput = z.infer<typeof createProjectSchema>;
```

**File:** `lib/validations/contact.ts`

```typescript
import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address'),
  company: z.string().max(150).optional(),
  message: z.string().min(20, 'Message must be at least 20 characters').max(2000),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;
```

### 12.3 Type-Safe Database Queries

**File:** `lib/db/queries.ts`

```typescript
import { createClient } from '@supabase/supabase-js';
import { projectSchema, type Project } from '@/lib/validations/project';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export async function getAllProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('display_order', { ascending: true });

  if (error) throw error;

  // Validate with Zod
  return z.array(projectSchema).parse(data);
}

export async function getProjectById(id: string): Promise<Project> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  if (!data) throw new Error('Project not found');

  return projectSchema.parse(data);
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('featured', true)
    .order('display_order', { ascending: true });

  if (error) throw error;

  return z.array(projectSchema).parse(data);
}
```

---

## 13. Testing Strategy

### 13.1 Testing Pyramid

```
        ┌─────────────┐
        │   E2E Tests │  (10% - Playwright)
        └─────────────┘
       ┌───────────────┐
       │Integration    │   (30% - Vitest + Testing Library)
       └───────────────┘
      ┌─────────────────┐
      │  Unit Tests     │    (60% - Vitest)
      └─────────────────┘
```

### 13.2 Unit Tests

**File:** `lib/utils.test.ts`

```typescript
import { describe, it, expect } from 'vitest';
import { cn } from './utils';

describe('cn utility', () => {
  it('merges class names correctly', () => {
    expect(cn('px-4', 'py-2')).toBe('px-4 py-2');
  });

  it('handles Tailwind conflicts', () => {
    expect(cn('px-4', 'px-8')).toBe('px-8');
  });

  it('handles conditional classes', () => {
    expect(cn('base', true && 'active', false && 'disabled')).toBe('base active');
  });
});
```

**File:** `lib/validations/project.test.ts`

```typescript
import { describe, it, expect } from 'vitest';
import { projectSchema } from './project';

describe('projectSchema', () => {
  it('validates correct project data', () => {
    const validProject = {
      id: '123e4567-e89b-12d3-a456-426614174000',
      title: 'RAG E-commerce Assistant',
      slug: 'rag-ecommerce-assistant',
      tagline: 'AI-powered product search with 99.2% accuracy',
      fullDescription: 'A comprehensive description...',
      role: 'Solo Developer',
      techStack: ['Next.js', 'TypeScript', 'OpenAI', 'pgvector'],
      thumbnailUrl: 'https://example.com/image.jpg',
      completedDate: new Date('2024-01-15'),
      timeframe: '2 weeks',
      featured: true,
      displayOrder: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    expect(() => projectSchema.parse(validProject)).not.toThrow();
  });

  it('rejects invalid timeframe format', () => {
    const invalidProject = {
      /* ...other valid fields */
      timeframe: 'about 2 weeks', // Invalid format
    };

    expect(() => projectSchema.parse(invalidProject)).toThrow();
  });
});
```

### 13.3 Integration Tests

**File:** `components/blocks/project-card.test.tsx`

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProjectCard } from './project-card';

const mockProject = {
  id: '1',
  title: 'Test Project',
  tagline: 'A test project for testing purposes',
  techStack: ['React', 'TypeScript'],
  thumbnailUrl: '/test-image.jpg',
  caseStudyUrl: '/lab/test-project',
  metrics: {
    impact: 'Increased efficiency by 50%',
    timeframe: '2 weeks',
  },
  /* ...other required fields */
};

describe('ProjectCard', () => {
  it('renders project information correctly', () => {
    render(<ProjectCard project={mockProject} />);

    expect(screen.getByText('Test Project')).toBeInTheDocument();
    expect(screen.getByText('A test project for testing purposes')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
  });

  it('has correct ARIA labels', () => {
    render(<ProjectCard project={mockProject} />);

    const article = screen.getByRole('article');
    expect(article).toHaveAttribute('aria-labelledby', 'project-1-title');
  });

  it('renders CTA link with screen reader text', () => {
    render(<ProjectCard project={mockProject} />);

    const link = screen.getByRole('link', { name: /view case study for test project/i });
    expect(link).toHaveAttribute('href', '/lab/test-project');
  });
});
```

### 13.4 E2E Tests

**File:** `tests/e2e/user-journey.spec.ts`

```typescript
import { test, expect } from '@playwright/test';

test.describe('Recruiter Journey', () => {
  test('can navigate from homepage to project detail', async ({ page }) => {
    // Land on homepage
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

    // Navigate to Lab
    await page.getByRole('link', { name: /the lab/i }).click();
    await expect(page).toHaveURL('/lab');

    // Click first project card
    await page.getByRole('article').first().getByRole('link').click();
    await expect(page).toHaveURL(/\/lab\/.+/);

    // Verify project detail content
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.getByText(/problem statement/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /view live site/i })).toBeVisible();
  });

  test('contact form submission works', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: /contact/i }).click();

    await page.fill('input[name="name"]', 'Sarah Chen');
    await page.fill('input[name="email"]', 'sarah@example.com');
    await page.fill('input[name="company"]', 'FAANG Corp');
    await page.fill('textarea[name="message"]', 'Interested in discussing a senior role.');

    await page.getByRole('button', { name: /send message/i }).click();

    // Verify success message
    await expect(page.getByText(/message sent successfully/i)).toBeVisible();
  });
});
```

### 13.5 Accessibility Tests

**File:** `tests/accessibility.spec.ts`

```typescript
import { test, expect } from '@playwright/test';
import { injectAxe, checkA11y } from 'axe-playwright';

test.describe('Accessibility Compliance', () => {
  const routes = ['/', '/identity', '/workshop', '/lab', '/lens'];

  for (const route of routes) {
    test(`${route} passes axe WCAG AA`, async ({ page }) => {
      await page.goto(route);
      await injectAxe(page);
      await checkA11y(page, null, {
        axeOptions: {
          runOnly: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'],
        },
      });
    });
  }

  test('keyboard navigation works across all pages', async ({ page }) => {
    await page.goto('/');

    // Tab to skip link
    await page.keyboard.press('Tab');
    let focusedElement = await page.evaluate(() => document.activeElement?.textContent);
    expect(focusedElement).toContain('Skip to main content');

    // Tab through navigation
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press('Tab');
      const focused = await page.evaluate(() => document.activeElement?.tagName);
      expect(['A', 'BUTTON']).toContain(focused);
    }
  });

  test('focus indicators are visible', async ({ page }) => {
    await page.goto('/');

    await page.keyboard.press('Tab');
    const ring = await page.evaluate(() => {
      const el = document.activeElement;
      return window.getComputedStyle(el!).getPropertyValue('outline');
    });

    expect(ring).not.toBe('none');
  });
});
```

### 13.6 Performance Tests

**File:** `tests/performance.spec.ts`

```typescript
import { test, expect } from '@playwright/test';

test.describe('Performance Benchmarks', () => {
  test('homepage loads within 2 seconds', async ({ page }) => {
    const start = Date.now();
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const loadTime = Date.now() - start;

    expect(loadTime).toBeLessThan(2000);
  });

  test('LCP is under 2.5 seconds', async ({ page }) => {
    await page.goto('/');

    const lcp = await page.evaluate(() => {
      return new Promise<number>((resolve) => {
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1] as any;
          resolve(lastEntry.renderTime || lastEntry.loadTime);
        }).observe({ type: 'largest-contentful-paint', buffered: true });

        setTimeout(() => resolve(0), 5000);
      });
    });

    expect(lcp).toBeLessThan(2500);
  });
});
```

---

## 14. Deployment & Infrastructure

### 14.1 Vercel Configuration

**File:** `vercel.json`

```json
{
  "buildCommand": "pnpm build",
  "devCommand": "pnpm dev",
  "installCommand": "pnpm install",
  "framework": "nextjs",
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        }
      ]
    },
    {
      "source": "/fonts/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ],
  "env": {
    "NEXT_PUBLIC_SUPABASE_URL": "@supabase-url",
    "SUPABASE_ANON_KEY": "@supabase-anon-key"
  }
}
```

### 14.2 Environment Variables

**File:** `.env.example`

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# OpenAI
OPENAI_API_KEY=sk-your-key

# Upstash (Rate Limiting)
UPSTASH_REDIS_REST_URL=https://your-redis.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-token

# Resend (Email)
RESEND_API_KEY=re_your-key

# Analytics
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=your-analytics-id
```

### 14.3 CI/CD Pipeline

**File:** `.github/workflows/ci.yml`

```yaml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
        with:
          version: 8
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile
      - run: pnpm lint
      - run: pnpm type-check

  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
        with:
          version: 8
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile
      - run: pnpm test:unit
      - run: pnpm test:integration

  e2e:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
        with:
          version: 8
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile
      - run: npx playwright install --with-deps
      - run: pnpm build
      - run: pnpm test:e2e
      - uses: actions/upload-artifact@v3
        if: failure()
        with:
          name: playwright-report
          path: playwright-report/

  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
        with:
          version: 8
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile
      - run: pnpm build
      - run: pnpm start &
      - run: npx wait-on http://localhost:3000
      - run: |
          npx lighthouse http://localhost:3000 \
            --only-categories=performance,accessibility,best-practices,seo \
            --chrome-flags="--headless" \
            --output=json \
            --output-path=./lighthouse-report.json
      - run: |
          PERF_SCORE=$(jq '.categories.performance.score * 100' lighthouse-report.json)
          if [ "$PERF_SCORE" -lt "90" ]; then exit 1; fi
```

### 14.4 Database Migrations

**Tool:** Supabase CLI

**Workflow:**
1. Create migration: `pnpm supabase migration new [name]`
2. Write SQL in `supabase/migrations/[timestamp]_[name].sql`
3. Apply locally: `pnpm supabase db push`
4. Deploy to production: Automatic on push to `main` (Supabase GitHub integration)

**Example Migration:**

```sql
-- supabase/migrations/20240115_add_view_count_to_articles.sql
ALTER TABLE articles
ADD COLUMN view_count INTEGER DEFAULT 0;

CREATE INDEX idx_articles_view_count ON articles(view_count DESC);
```

---

## 15. Success Metrics & KPIs

### 15.1 Technical Performance

| Metric | Target | Measurement Tool |
|--------|--------|------------------|
| **Lighthouse Performance** | ≥90 | CI/CD pipeline |
| **Lighthouse Accessibility** | 100 | CI/CD + manual audits |
| **First Contentful Paint (FCP)** | <1.5s | Vercel Analytics |
| **Largest Contentful Paint (LCP)** | <2.5s | Vercel Analytics |
| **Cumulative Layout Shift (CLS)** | <0.1 | Vercel Analytics |
| **Total Blocking Time (TBT)** | <300ms | Vercel Analytics |
| **Time to Interactive (TTI)** | <3.5s | Vercel Analytics |
| **Bundle Size (First Load JS)** | <150KB | Next.js build output |

### 15.2 User Engagement

| Metric | Target | Measurement Tool |
|--------|--------|------------------|
| **Average Session Duration** | >3 minutes | Vercel Analytics |
| **Bounce Rate** | <40% | Vercel Analytics |
| **Pages per Session** | >2.5 | Vercel Analytics |
| **Contact Form Conversion** | >5% | Custom tracking |
| **AI Chat Engagement** | >30% of visitors | Custom tracking |
| **Project Detail Views** | >60% click-through from Lab | Custom tracking |

### 15.3 SEO/GEO Performance

| Metric | Target | Measurement Tool |
|--------|--------|------------------|
| **Google Search Console Impressions** | >1,000/month (Month 3) | Google Search Console |
| **Click-Through Rate (CTR)** | >3% | Google Search Console |
| **Average Position** | <20 for target keywords | Google Search Console |
| **AI Citation Rate** | ≥1 citation in ChatGPT Search tests | Manual testing |
| **Indexed Pages** | 100% (all public pages) | Google Search Console |
| **Core Web Vitals Pass Rate** | 100% | Google Search Console |

### 15.4 Business Outcomes

| Metric | Target | Timeline |
|--------|--------|----------|
| **Qualified Interview Requests** | ≥5 | Month 2 |
| **GitHub Stars (if OSS components)** | ≥50 | Month 6 |
| **LinkedIn Profile Views** | +30% increase | Month 3 |
| **Recruiter InMails** | ≥10 | Month 4 |
| **Speaking/Consulting Inquiries** | ≥2 | Month 6 |

### 15.5 Monitoring Setup

**Vercel Analytics:**
- Enable in Vercel dashboard
- Track custom events: `contact_form_submit`, `ai_chat_interaction`, `project_view`

**Custom Event Tracking:**

```typescript
// lib/analytics.ts
export function trackEvent(eventName: string, properties?: Record<string, any>) {
  if (typeof window !== 'undefined' && window.va) {
    window.va('track', eventName, properties);
  }
}

// Usage in components
import { trackEvent } from '@/lib/analytics';

function ProjectCard({ project }: Props) {
  return (
    <Link
      href={project.caseStudyUrl}
      onClick={() => trackEvent('project_view', { projectId: project.id })}
    >
      {/* Card content */}
    </Link>
  );
}
```

**Uptime Monitoring:**
- Use Vercel's built-in uptime checks
- Alert via email if downtime >1 minute

---

## 16. Appendices

### Appendix A: Glossary

- **RAG (Retrieval-Augmented Generation)**: AI pattern that retrieves relevant documents before generating responses to reduce hallucinations
- **pgvector**: PostgreSQL extension for vector similarity search
- **HNSW**: Hierarchical Navigable Small World, an algorithm for approximate nearest neighbor search
- **GEO (Generative Engine Optimization)**: SEO adapted for LLM-powered search engines
- **MoSCoW**: Prioritization method (Must/Should/Could/Won't have)
- **ADR (Architecture Decision Record)**: Document explaining why a technical choice was made
- **WCAG (Web Content Accessibility Guidelines)**: International accessibility standards
- **ISR (Incremental Static Regeneration)**: Next.js feature for updating static content without full rebuild

### Appendix B: Tool-Calling Example Flow

```
User Query: "What's your experience with TypeScript?"
     ↓
AI Agent: Calls getSkillProficiency({ category: 'frontend' })
     ↓
Tool Returns: { name: 'TypeScript', yearsExperience: 5, proficiency: 'Expert', ... }
     ↓
AI Agent: Calls searchTechnicalArticles({ query: 'TypeScript', limit: 3 })
     ↓
Tool Returns: [Article 1, Article 2, Article 3]
     ↓
AI Agent: Synthesizes Response
     ↓
Output: "I have 5 years of expert-level TypeScript experience. I've written 
         extensively about it, including articles on advanced type patterns 
         and generic constraints. You can read more in my article 'TypeScript 
         Generics Beyond the Basics.'"
```

### Appendix C: Embedding Generation Performance

**Benchmark (100 content items):**
- Text splitting: ~2 seconds
- Embedding generation (OpenAI API): ~15 seconds
- Database insertion: ~5 seconds
- **Total: ~22 seconds**

**Cost Estimate:**
- text-embedding-3-small: $0.00002/1K tokens
- Average content item: 500 tokens
- 100 items = 50K tokens = $0.001
- **Negligible for MVP**

### Appendix D: Alternative Tech Stack Considerations

| Decision | Chosen | Rejected | Reason |
|----------|--------|----------|--------|
| **Framework** | Next.js | Remix, Astro | App Router maturity, Vercel ecosystem |
| **CSS** | Tailwind | CSS Modules, Styled Components | Utility-first speed, zero runtime |
| **Components** | Shadcn UI | MUI, Chakra | Copy-paste model, full control |
| **Database** | Supabase | Neon, PlanetScale | Integrated storage + auth potential |
| **Vector DB** | pgvector | Pinecone, Weaviate | Cost ($0 for MVP), co-location with data |
| **AI SDK** | Vercel AI SDK | LangChain | Lightweight, Next.js integration |
| **Deployment** | Vercel | Netlify, Cloudflare Pages | Best Next.js DX, edge runtime |

### Appendix E: Content Writing Checklist

**For Every Page:**
- [ ] First 100 words include 3+ primary keywords
- [ ] Sentences are 15-20 words max
- [ ] Headings use exact technical terms (no synonyms)
- [ ] At least one quantitative metric per section
- [ ] Meta description is 150-160 characters
- [ ] Open Graph image is 1200×630px
- [ ] Structured data (JSON-LD) is present
- [ ] All images have descriptive alt text
- [ ] External links have `rel="noopener noreferrer"`
- [ ] Internal links use descriptive anchor text (not "click here")

### Appendix F: Component Audit Process

**Before Adding a New Component:**
1. Check if Shadcn UI has a primitive (use `pnpm dlx shadcn-ui@latest add [name]`)
2. If custom component needed, check if it can compose existing primitives
3. Define TypeScript interface for props first
4. Write unit test (props validation, rendering)
5. Ensure ARIA labels and semantic HTML
6. Verify no arbitrary Tailwind values (search codebase for `[`)
7. Test keyboard navigation manually
8. Add to Storybook (if implemented in Should-Have phase)

### Appendix G: References

- [Next.js 15 Documentation](https://nextjs.org/docs)
- [Shadcn UI Components](https://ui.shadcn.com)
- [WCAG 2.2 Guidelines](https://www.w3.org/WAI/WCAG22/quickref/)
- [Vercel AI SDK Documentation](https://sdk.vercel.ai/docs)
- [Supabase pgvector Guide](https://supabase.com/docs/guides/ai)
- [MoSCoW Prioritization](https://en.wikipedia.org/wiki/MoSCoW_method)
- [GEO Best Practices](https://www.nngroup.com/articles/generative-engine-optimization/)

---

## Document Control

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0 | 2026-04-15 | Senior Enterprise Architect(Benjamin Ofili) | Initial SRS creation |

**Approval Status:** Awaiting Implementation

**Next Review Date:** Post-MVP (Week 3)

---

**End of Software Requirements Specification**

This document serves as the architectural blueprint for solo development. Deviations from this spec require documented justification in an Architecture Decision Record (ADR). All Must-Have features must be completed before declaring MVP status.