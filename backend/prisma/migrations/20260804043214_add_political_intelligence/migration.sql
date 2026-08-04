-- CreateEnum
CREATE TYPE "CampaignType" AS ENUM ('ELECTION', 'AWARENESS', 'FUNDRAISING', 'VOLUNTEER', 'SOCIAL', 'OTHER');

-- CreateEnum
CREATE TYPE "CampaignStatus" AS ENUM ('DRAFT', 'PLANNING', 'ACTIVE', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "ContentType" AS ENUM ('POSTER', 'BANNER', 'SOCIAL_POST', 'VIDEO', 'ARTICLE', 'SPEECH', 'PRESS_RELEASE', 'OTHER');

-- CreateEnum
CREATE TYPE "ContentStatus" AS ENUM ('DRAFT', 'SCHEDULED', 'PUBLISHED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "BoothStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'CLOSED');

-- CreateEnum
CREATE TYPE "MediaType" AS ENUM ('NEWS', 'INTERVIEW', 'PRESS_RELEASE', 'SOCIAL_MEDIA', 'BLOG', 'OTHER');

-- CreateTable
CREATE TABLE "Campaign" (
    "id" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "type" "CampaignType" NOT NULL,
    "status" "CampaignStatus" NOT NULL DEFAULT 'DRAFT',
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "budget" DOUBLE PRECISION,
    "location" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT,

    CONSTRAINT "Campaign_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Content" (
    "id" TEXT NOT NULL,
    "campaignId" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "type" "ContentType" NOT NULL,
    "status" "ContentStatus" NOT NULL DEFAULT 'DRAFT',
    "content" TEXT,
    "mediaUrl" TEXT,
    "scheduledAt" TIMESTAMP(3),
    "publishedAt" TIMESTAMP(3),
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT,

    CONSTRAINT "Content_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Booth" (
    "id" TEXT NOT NULL,
    "campaignId" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "address" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "volunteers" INTEGER NOT NULL DEFAULT 0,
    "status" "BoothStatus" NOT NULL DEFAULT 'ACTIVE',
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT,

    CONSTRAINT "Booth_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MediaCoverage" (
    "id" TEXT NOT NULL,
    "campaignId" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "source" TEXT,
    "url" TEXT,
    "publishedAt" TIMESTAMP(3),
    "type" "MediaType" NOT NULL,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT,

    CONSTRAINT "MediaCoverage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Campaign_slug_key" ON "Campaign"("slug");

-- CreateIndex
CREATE INDEX "Campaign_workspaceId_idx" ON "Campaign"("workspaceId");

-- CreateIndex
CREATE UNIQUE INDEX "Content_slug_key" ON "Content"("slug");

-- CreateIndex
CREATE INDEX "Content_campaignId_idx" ON "Content"("campaignId");

-- CreateIndex
CREATE INDEX "Content_workspaceId_idx" ON "Content"("workspaceId");

-- CreateIndex
CREATE INDEX "Booth_campaignId_idx" ON "Booth"("campaignId");

-- CreateIndex
CREATE INDEX "Booth_workspaceId_idx" ON "Booth"("workspaceId");

-- CreateIndex
CREATE INDEX "MediaCoverage_campaignId_idx" ON "MediaCoverage"("campaignId");

-- CreateIndex
CREATE INDEX "MediaCoverage_workspaceId_idx" ON "MediaCoverage"("workspaceId");

-- AddForeignKey
ALTER TABLE "Campaign" ADD CONSTRAINT "Campaign_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Campaign" ADD CONSTRAINT "Campaign_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Content" ADD CONSTRAINT "Content_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Content" ADD CONSTRAINT "Content_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Content" ADD CONSTRAINT "Content_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booth" ADD CONSTRAINT "Booth_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booth" ADD CONSTRAINT "Booth_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booth" ADD CONSTRAINT "Booth_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MediaCoverage" ADD CONSTRAINT "MediaCoverage_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MediaCoverage" ADD CONSTRAINT "MediaCoverage_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MediaCoverage" ADD CONSTRAINT "MediaCoverage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
