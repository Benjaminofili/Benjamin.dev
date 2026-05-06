-- Enable pgvector
CREATE EXTENSION IF NOT EXISTS vector WITH SCHEMA public;

-- Create HNSW Index
CREATE INDEX IF NOT EXISTS document_chunks_embedding_idx ON document_chunks USING hnsw (embedding vector_cosine_ops);

-- Create match_documents function
CREATE OR REPLACE FUNCTION match_documents(
  query_embedding vector(768),
  match_threshold float DEFAULT 0.7,
  match_count int DEFAULT 5
) RETURNS TABLE (
  id uuid,
  content text,
  metadata jsonb,
  similarity float
) LANGUAGE sql STABLE AS $$
SELECT
  document_chunks.id,
  document_chunks.content,
  document_chunks.metadata,
  1 - (document_chunks.embedding <=> query_embedding) AS similarity
FROM document_chunks
WHERE 1 - (document_chunks.embedding <=> query_embedding) > match_threshold
ORDER BY document_chunks.embedding <=> query_embedding ASC
LIMIT match_count;
$$;
