-- A project may have no screenshot yet; the UI renders a typographic cover instead.
ALTER TABLE "projects" ALTER COLUMN "thumbnailUrl" DROP NOT NULL;

-- A project's role is left unset rather than guessed when the contribution
-- split is not established; the UI omits the field instead of asserting one.
ALTER TABLE "projects" ALTER COLUMN "role" DROP NOT NULL;
