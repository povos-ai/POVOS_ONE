CREATE TABLE IF NOT EXISTS "User" (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  "firstName" TEXT NOT NULL,
  "lastName" TEXT,
  role TEXT DEFAULT 'APPLICANT',
  "isActive" BOOLEAN DEFAULT TRUE,
  "emailVerified" BOOLEAN DEFAULT FALSE,
  "lastLoginAt" TIMESTAMP,
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "updatedAt" TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "Workspace" (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  logo TEXT,
  "isActive" BOOLEAN DEFAULT TRUE,
  "createdBy" TEXT,
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "updatedAt" TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "Opportunity" (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  title TEXT NOT NULL,
  slug TEXT UNIQUE,
  description TEXT,
  type TEXT,
  category TEXT,
  level TEXT,
  state TEXT,
  district TEXT,
  status TEXT DEFAULT 'DRAFT',
  published BOOLEAN DEFAULT FALSE,
  "applicationUrl" TEXT,
  "startDate" TIMESTAMP,
  "lastDate" TIMESTAMP,
  eligibility JSONB,
  benefits JSONB,
  "requiredDocuments" JSONB,
  metadata JSONB,
  "searchText" TEXT,
  "aiSummary" TEXT,
  views INTEGER DEFAULT 0,
  clicks INTEGER DEFAULT 0,
  "workspaceId" TEXT,
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "updatedAt" TIMESTAMP DEFAULT NOW()
);
