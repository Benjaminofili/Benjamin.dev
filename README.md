# Benjamin.dev

Portfolio of Awelechukwu Benjamin Ofili — Software Engineer (full-stack and mobile) and final-year BSc (Hons) Business Computing and Data Analytics student at Middlesex University Mauritius.

## Stack

Next.js (App Router), React, TypeScript, Tailwind CSS, tRPC, Prisma, PostgreSQL with pgvector (Neon), Vercel AI SDK with Gemini for the portfolio assistant.

## Structure

- `src/components/blocks` — Identity, Lab, Lens, Journey and Contact sections
- `src/components/TheWorkshop.tsx` — capabilities, experience and engineering approach
- `src/lib/profile.ts` — identity, contact details and assistant identity text (single source of truth)
- `scripts/ingest-case-studies.ts` — syncs project content to the database and rebuilds the RAG index
- `scripts/geo-case-study-data.ts` — case study copy

## Development

```bash
npm install
cp .env.example .env   # add DATABASE_URL, DIRECT_URL, GOOGLE_GENERATIVE_AI_API_KEY
npm run dev
```

To publish content changes: `npx tsx scripts/ingest-case-studies.ts` (use `--dry-run` to preview).
