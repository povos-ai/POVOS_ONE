/*
  Warnings:

  - Added the required column `category` to the `Opportunity` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "OpportunityCategory" AS ENUM ('JOB', 'SCHOLARSHIP', 'TENDER', 'GRANT', 'STARTUP', 'FELLOWSHIP', 'TRAINING', 'INTERNSHIP', 'SCHEME', 'CSR', 'EVENT');

-- AlterTable
ALTER TABLE "Opportunity" ADD COLUMN     "category" "OpportunityCategory" NOT NULL,
ADD COLUMN     "searchText" TEXT;

-- CreateIndex
CREATE INDEX "Opportunity_category_idx" ON "Opportunity"("category");
