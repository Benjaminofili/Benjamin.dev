-- ============================================================================
-- SUPABASE SETUP SCRIPT FOR AI-INTEGRATED PORTFOLIO
-- ============================================================================
-- Purpose: Enable pgvector, create similarity search functions, and configure RLS
-- Run this AFTER Prisma migrations have created the base tables
-- ============================================================================

-- ----------------------------------------------------------------------------
-- STEP 1: ENABLE PGVECTOR EXTENSION
-- ----------------------------------------------------------------------------

CREATE EXTENSION IF NOT EXISTS vector
  WITH SCHEMA public;

COMMENT ON EXTENSION vector IS 'Vector similarity search for embeddings (pgvector)';

-- ----------------------------------------------------------------------------
-- STEP 2: CREATE HNSW INDEX ON EMBEDDINGS FOR FAST SIMILARITY SEARCH
-- ----------------------------------------------------------------------------

CREATE INDEX IF NOT EXISTS document_chunks_embedding_idx 
  ON document_chunks 
  USING hnsw (embedding vector_cosine_ops);

COMMENT ON INDEX document_chunks_embedding_idx IS 
  'HNSW index for fast cosine similarity search on embeddings';

-- ----------------------------------------------------------------------------
-- STEP 3: CREATE SIMILARITY SEARCH FUNCTION
-- ----------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION match_documents(
  query_embedding vector(1536),
  match_threshold float DEFAULT 0.7,
  match_count int DEFAULT 5
)
RETURNS TABLE (
  id uuid,
  content text,
  metadata jsonb,
  similarity float
)
LANGUAGE sql STABLE
AS $$
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

-- ----------------------------------------------------------------------------
-- STEP 4: CREATE HELPER FUNCTION FOR METADATA FILTERING
-- ----------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION match_documents_by_type(
  query_embedding vector(1536),
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
LANGUAGE sql STABLE
AS $$
  SELECT
    document_chunks.id,
    document_chunks.content,
    document_chunks.metadata,
    1 - (document_chunks.embedding <=> query_embedding) AS similarity
  FROM document_chunks
  WHERE 
    1 - (document_chunks.embedding <=> query_embedding) > match_threshold
    AND metadata->>'type' = content_type
  ORDER BY document_chunks.embedding <=> query_embedding ASC
  LIMIT match_count;
$$;

-- ----------------------------------------------------------------------------
-- STEP 5: ENABLE ROW LEVEL SECURITY (RLS) ON ALL TABLES
-- ----------------------------------------------------------------------------

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE document_chunks ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- ----------------------------------------------------------------------------
-- STEP 6: CREATE RLS POLICIES FOR PUBLIC READ ACCESS
-- ----------------------------------------------------------------------------

CREATE POLICY "Public users can view published projects"
  ON projects FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Public users can view published articles"
  ON articles FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Public users can search document chunks"
  ON document_chunks FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "No public access to contact submissions"
  ON contact_submissions FOR SELECT TO anon USING (false);

-- ----------------------------------------------------------------------------
-- STEP 7: CREATE RLS POLICIES FOR ADMIN
-- ----------------------------------------------------------------------------

CREATE POLICY "Admin can manage projects"
  ON projects FOR ALL TO authenticated
  USING (auth.uid() = 'fd6a35c0-6586-4261-aec6-7f561771b6e7'::uuid)
  WITH CHECK (auth.uid() = 'fd6a35c0-6586-4261-aec6-7f561771b6e7'::uuid);

CREATE POLICY "Admin can manage articles"
  ON articles FOR ALL TO authenticated
  USING (auth.uid() = 'fd6a35c0-6586-4261-aec6-7f561771b6e7'::uuid)
  WITH CHECK (auth.uid() = 'fd6a35c0-6586-4261-aec6-7f561771b6e7'::uuid);

CREATE POLICY "Admin can manage document chunks"
  ON document_chunks FOR ALL TO authenticated
  USING (auth.uid() = 'fd6a35c0-6586-4261-aec6-7f561771b6e7'::uuid)
  WITH CHECK (auth.uid() = 'fd6a35c0-6586-4261-aec6-7f561771b6e7'::uuid);

CREATE POLICY "Admin can view contact submissions"
  ON contact_submissions FOR SELECT TO authenticated
  USING (auth.uid() = 'fd6a35c0-6586-4261-aec6-7f561771b6e7'::uuid);

CREATE POLICY "Admin can update contact submissions"
  ON contact_submissions FOR UPDATE TO authenticated
  USING (auth.uid() = 'fd6a35c0-6586-4261-aec6-7f561771b6e7'::uuid)
  WITH CHECK (auth.uid() = 'fd6a35c0-6586-4261-aec6-7f561771b6e7'::uuid);

-- ----------------------------------------------------------------------------
-- STEP 8: ALLOW PUBLIC TO INSERT CONTACT SUBMISSIONS
-- ----------------------------------------------------------------------------

CREATE POLICY "Anyone can submit contact form"
  ON contact_submissions FOR INSERT TO anon, authenticated WITH CHECK (true);

-- ----------------------------------------------------------------------------
-- STEP 9: CREATE FUNCTION TO INCREMENT ARTICLE VIEW COUNT
-- ----------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION increment_article_view_count(article_id uuid)
RETURNS void
LANGUAGE sql
AS $$
  UPDATE articles
  SET "viewCount" = "viewCount" + 1
  WHERE id = article_id;
$$;

GRANT EXECUTE ON FUNCTION increment_article_view_count TO anon, authenticated;

-- ----------------------------------------------------------------------------
-- STEP 10: CREATE VIEW FOR PUBLIC PROJECT SUMMARIES
-- ----------------------------------------------------------------------------

CREATE OR REPLACE VIEW project_summaries AS
  SELECT
    id,
    title,
    slug,
    tagline,
    role,
    "techStack",
    "liveUrl",
    "repositoryUrl",
    "thumbnailUrl",
    "completedDate",
    timeframe,
    "impactMetric",
    "scaleMetric",
    featured,
    "displayOrder",
    "createdAt",
    "updatedAt"
  FROM projects
  ORDER BY "displayOrder" ASC;

GRANT SELECT ON project_summaries TO anon, authenticated;

-- ----------------------------------------------------------------------------
-- STEP 11: VERIFY SETUP
-- ----------------------------------------------------------------------------

SELECT * FROM pg_extension WHERE extname = 'vector';

SELECT indexname, tablename 
FROM pg_indexes 
WHERE tablename IN ('projects', 'articles', 'document_chunks')
ORDER BY tablename, indexname;

SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename IN ('projects', 'articles', 'document_chunks', 'contact_submissions');
