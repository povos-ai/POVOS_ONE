/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `workspace` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "workspace" ADD COLUMN     "address" TEXT,
ADD COLUMN     "city" TEXT,
ADD COLUMN     "country" TEXT,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "state" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "workspace_email_key" ON "workspace"("email");
