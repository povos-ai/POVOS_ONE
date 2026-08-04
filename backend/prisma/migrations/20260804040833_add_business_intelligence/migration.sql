-- CreateEnum
CREATE TYPE "BusinessType" AS ENUM ('TENDER', 'B2B', 'CONSULTING', 'PARTNERSHIP', 'VENDOR', 'SUPPLY', 'SERVICE', 'PROJECT', 'INVESTMENT', 'JOINT_VENTURE', 'OTHER');

-- CreateEnum
CREATE TYPE "BusinessCategory" AS ENUM ('IT', 'CONSTRUCTION', 'HEALTHCARE', 'EDUCATION', 'AGRICULTURE', 'MANUFACTURING', 'RETAIL', 'FINANCE', 'ENERGY', 'TRANSPORT', 'TELECOM', 'OTHER');

-- CreateEnum
CREATE TYPE "BusinessStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'CLOSED', 'AWARDED', 'CANCELLED');

-- CreateTable
CREATE TABLE "Business" (
    "id" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" "BusinessType" NOT NULL,
    "category" "BusinessCategory" NOT NULL,
    "sector" TEXT,
    "location" TEXT,
    "budget" DOUBLE PRECISION,
    "deadline" TIMESTAMP(3),
    "status" "BusinessStatus" NOT NULL DEFAULT 'DRAFT',
    "published" BOOLEAN NOT NULL DEFAULT false,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Business_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusinessSubmission" (
    "id" TEXT NOT NULL,
    "businessId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,
    "status" "SubmissionStatus" NOT NULL DEFAULT 'DRAFT',
    "submittedAt" TIMESTAMP(3),
    "data" JSONB,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BusinessSubmission_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Business_slug_key" ON "Business"("slug");

-- CreateIndex
CREATE INDEX "Business_workspaceId_idx" ON "Business"("workspaceId");

-- CreateIndex
CREATE INDEX "Business_type_idx" ON "Business"("type");

-- CreateIndex
CREATE INDEX "Business_category_idx" ON "Business"("category");

-- CreateIndex
CREATE INDEX "Business_status_idx" ON "Business"("status");

-- CreateIndex
CREATE INDEX "BusinessSubmission_businessId_idx" ON "BusinessSubmission"("businessId");

-- CreateIndex
CREATE INDEX "BusinessSubmission_userId_idx" ON "BusinessSubmission"("userId");

-- CreateIndex
CREATE INDEX "BusinessSubmission_workspaceId_idx" ON "BusinessSubmission"("workspaceId");

-- CreateIndex
CREATE INDEX "BusinessSubmission_status_idx" ON "BusinessSubmission"("status");

-- AddForeignKey
ALTER TABLE "Business" ADD CONSTRAINT "Business_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessSubmission" ADD CONSTRAINT "BusinessSubmission_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessSubmission" ADD CONSTRAINT "BusinessSubmission_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessSubmission" ADD CONSTRAINT "BusinessSubmission_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
