/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Opportunity` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `level` to the `Opportunity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Opportunity` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "OpportunityStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'CLOSED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "OpportunityLevel" AS ENUM ('CENTRAL', 'STATE', 'DISTRICT', 'PRIVATE', 'INTERNATIONAL');

-- AlterTable
ALTER TABLE "Opportunity" ADD COLUMN     "aiSummary" TEXT,
ADD COLUMN     "applicationUrl" TEXT,
ADD COLUMN     "benefits" JSONB,
ADD COLUMN     "district" TEXT,
ADD COLUMN     "eligibility" JSONB,
ADD COLUMN     "lastDate" TIMESTAMP(3),
ADD COLUMN     "level" "OpportunityLevel" NOT NULL,
ADD COLUMN     "metadata" JSONB,
ADD COLUMN     "requiredDocuments" JSONB,
ADD COLUMN     "slug" TEXT NOT NULL,
ADD COLUMN     "startDate" TIMESTAMP(3),
ADD COLUMN     "state" TEXT,
ADD COLUMN     "status" "OpportunityStatus" NOT NULL DEFAULT 'DRAFT';

-- CreateIndex
CREATE UNIQUE INDEX "Opportunity_slug_key" ON "Opportunity"("slug");

-- CreateIndex
CREATE INDEX "Opportunity_type_idx" ON "Opportunity"("type");

-- CreateIndex
CREATE INDEX "Opportunity_status_idx" ON "Opportunity"("status");

-- CreateIndex
CREATE INDEX "Opportunity_state_idx" ON "Opportunity"("state");

-- CreateIndex
CREATE INDEX "Opportunity_district_idx" ON "Opportunity"("district");

-- CreateIndex
CREATE INDEX "Opportunity_lastDate_idx" ON "Opportunity"("lastDate");

-- CreateIndex
CREATE INDEX "Opportunity_workspaceId_idx" ON "Opportunity"("workspaceId");
