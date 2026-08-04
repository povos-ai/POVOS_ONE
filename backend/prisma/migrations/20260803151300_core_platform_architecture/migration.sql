/*
  Warnings:

  - You are about to drop the column `workspaceId` on the `Opportunity` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Submission` table. All the data in the column will be lost.
  - You are about to drop the `Notification` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `workspace` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `workspaceId` to the `Opportunity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Submission` table without a default value. This is not possible if the table is not empty.
  - Added the required column `workspaceId` to the `Submission` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "MemoryType" AS ENUM ('PROFILE', 'DOCUMENT', 'CHAT', 'PROPOSAL', 'CAMPAIGN', 'RESEARCH', 'CONSULTATION', 'SPEECH', 'SOCIAL_MEDIA', 'POLICY', 'FINANCE', 'LEGAL');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "OpportunityCategory" ADD VALUE 'RESEARCH';
ALTER TYPE "OpportunityCategory" ADD VALUE 'HEALTH';
ALTER TYPE "OpportunityCategory" ADD VALUE 'AGRICULTURE';

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "OpportunityType" ADD VALUE 'EXAM';
ALTER TYPE "OpportunityType" ADD VALUE 'RESEARCH';
ALTER TYPE "OpportunityType" ADD VALUE 'HEALTH';
ALTER TYPE "OpportunityType" ADD VALUE 'AGRICULTURE';

-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_userId_fkey";

-- DropForeignKey
ALTER TABLE "Opportunity" DROP CONSTRAINT "Opportunity_workspaceId_fkey";

-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_workspaceId_fkey";

-- DropForeignKey
ALTER TABLE "Submission" DROP CONSTRAINT "Submission_userId_fkey";

-- DropIndex
DROP INDEX "Opportunity_district_idx";

-- DropIndex
DROP INDEX "Opportunity_workspaceId_idx";

-- DropIndex
DROP INDEX "Submission_userId_idx";

-- AlterTable
ALTER TABLE "Opportunity" DROP COLUMN "workspaceId",
ADD COLUMN     "clicks" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "views" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "workspaceId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Submission" DROP COLUMN "userId",
ADD COLUMN     "data" JSONB,
ADD COLUMN     "metadata" JSONB,
ADD COLUMN     "userId" TEXT NOT NULL,
ADD COLUMN     "workspaceId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Notification";

-- DropTable
DROP TABLE "workspace";

-- DropTable
DROP TABLE "user";

-- DropEnum
DROP TYPE "workspaceType";

-- DropEnum
DROP TYPE "userRole";

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT,
    "phone" TEXT,
    "avatar" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "lastLoginAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workspace" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "logo" TEXT,
    "description" TEXT,
    "website" TEXT,
    "settings" JSONB,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "workspace_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Division" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "workspaceId" TEXT NOT NULL,
    "parentId" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Division_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Membership" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,
    "divisionId" TEXT,
    "roleId" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Membership_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "isSystem" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Permission" (
    "id" TEXT NOT NULL,
    "resource" TEXT NOT NULL,
    "action" TEXT NOT NULL,

    CONSTRAINT "Permission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workspaceMemory" (
    "id" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,
    "type" "MemoryType" NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "metadata" JSONB,
    "vectorId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "workspaceMemory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PermissionToRole" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE INDEX "user_email_idx" ON "user"("email");

-- CreateIndex
CREATE INDEX "user_isActive_idx" ON "user"("isActive");

-- CreateIndex
CREATE UNIQUE INDEX "workspace_slug_key" ON "workspace"("slug");

-- CreateIndex
CREATE INDEX "workspace_slug_idx" ON "workspace"("slug");

-- CreateIndex
CREATE INDEX "workspace_isActive_idx" ON "workspace"("isActive");

-- CreateIndex
CREATE INDEX "Division_workspaceId_idx" ON "Division"("workspaceId");

-- CreateIndex
CREATE INDEX "Division_parentId_idx" ON "Division"("parentId");

-- CreateIndex
CREATE INDEX "Membership_userId_idx" ON "Membership"("userId");

-- CreateIndex
CREATE INDEX "Membership_workspaceId_idx" ON "Membership"("workspaceId");

-- CreateIndex
CREATE INDEX "Membership_roleId_idx" ON "Membership"("roleId");

-- CreateIndex
CREATE UNIQUE INDEX "Membership_userId_workspaceId_divisionId_key" ON "Membership"("userId", "workspaceId", "divisionId");

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");

-- CreateIndex
CREATE INDEX "Permission_resource_idx" ON "Permission"("resource");

-- CreateIndex
CREATE UNIQUE INDEX "Permission_resource_action_key" ON "Permission"("resource", "action");

-- CreateIndex
CREATE INDEX "workspaceMemory_workspaceId_idx" ON "workspaceMemory"("workspaceId");

-- CreateIndex
CREATE INDEX "workspaceMemory_type_idx" ON "workspaceMemory"("type");

-- CreateIndex
CREATE UNIQUE INDEX "Session_token_key" ON "Session"("token");

-- CreateIndex
CREATE INDEX "Session_token_idx" ON "Session"("token");

-- CreateIndex
CREATE INDEX "Session_expiresAt_idx" ON "Session"("expiresAt");

-- CreateIndex
CREATE UNIQUE INDEX "_PermissionToRole_AB_unique" ON "_PermissionToRole"("A", "B");

-- CreateIndex
CREATE INDEX "_PermissionToRole_B_index" ON "_PermissionToRole"("B");

-- CreateIndex
CREATE INDEX "Opportunity_workspaceId_idx" ON "Opportunity"("workspaceId");

-- CreateIndex
CREATE INDEX "Submission_workspaceId_idx" ON "Submission"("workspaceId");

-- CreateIndex
CREATE INDEX "Submission_userId_idx" ON "Submission"("userId");

-- CreateIndex
CREATE INDEX "Submission_status_idx" ON "Submission"("status");

-- AddForeignKey
ALTER TABLE "workspace" ADD CONSTRAINT "workspace_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Division" ADD CONSTRAINT "Division_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "workspace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Division" ADD CONSTRAINT "Division_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Division"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Membership" ADD CONSTRAINT "Membership_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Membership" ADD CONSTRAINT "Membership_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "workspace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Membership" ADD CONSTRAINT "Membership_divisionId_fkey" FOREIGN KEY ("divisionId") REFERENCES "Division"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Membership" ADD CONSTRAINT "Membership_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Opportunity" ADD CONSTRAINT "Opportunity_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "workspace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "workspace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workspaceMemory" ADD CONSTRAINT "workspaceMemory_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "workspace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PermissionToRole" ADD CONSTRAINT "_PermissionToRole_A_fkey" FOREIGN KEY ("A") REFERENCES "Permission"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PermissionToRole" ADD CONSTRAINT "_PermissionToRole_B_fkey" FOREIGN KEY ("B") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;
