-- ============================================================================
-- GEMINI EMBEDDING MIGRATION: 1536 -> 768
-- Run this in Supabase SQL Editor (or via psql against the same database)
-- ============================================================================

BEGIN;

DROP INDEX IF EXISTS public.document_chunks_embedding_idx;

DROP FUNCTION IF EXISTS public.match_documents(vector(1536), float, int);
DROP FUNCTION IF EXISTS public.match_documents_by_type(vector(1536), text, float, int);

ALTER TABLE public.document_chunks
  ALTER COLUMN embedding TYPE vector(768);

CREATE INDEX IF NOT EXISTS document_chunks_embedding_idx
  ON public.document_chunks
  USING hnsw (embedding vector_cosine_ops);

COMMENT ON INDEX public.document_chunks_embedding_idx IS
  'HNSW index for fast cosine similarity search on 768-dim embeddings (Gemini)';

CREATE OR REPLACE FUNCTION public.match_documents(
  query_embedding vector(768),
  match_threshold float DEFAULT 0.7,
  match_count int DEFAULT 5
)
RETURNS TABLE (
  id uuid,
  content text,
  metadata jsonb,
  similarity float
)
LANGUAGE sql
STABLE
AS $$
  SELECT
    dc.id,
    dc.content,
    dc.metadata,
    1 - (dc.embedding <=> query_embedding) AS similarity
  FROM public.document_chunks AS dc
  WHERE 1 - (dc.embedding <=> query_embedding) > match_threshold
  ORDER BY dc.embedding <=> query_embedding ASC
  LIMIT match_count;
$$;

CREATE OR REPLACE FUNCTION public.match_documents_by_type(
  query_embedding vector(768),
  content_type text,
  match_threshold float DEFAULT 0.7,
  match_count int DEFAULT 5
)
RETURNS TABLE (
  id uuid,
  content text,
  metadata jsonb,
  similarity float
)
LANGUAGE sql
STABLE
AS $$
  SELECT
    dc.id,
    dc.content,
    dc.metadata,
    1 - (dc.embedding <=> query_embedding) AS similarity
  FROM public.document_chunks AS dc
  WHERE
    1 - (dc.embedding <=> query_embedding) > match_threshold
    AND dc.metadata->>'type' = content_type
  ORDER BY dc.embedding <=> query_embedding ASC
  LIMIT match_count;
$$;

COMMIT;
