/*
  Warnings:

  - The values [MANAGER,STAFF,user] on the enum `userRole` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "userRole_new" AS ENUM ('SUPER_ADMIN', 'ADMIN', 'workspace', 'REVIEWER', 'APPLICANT');
ALTER TABLE "public"."user" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "user" ALTER COLUMN "role" TYPE "userRole_new" USING ("role"::text::"userRole_new");
ALTER TYPE "userRole" RENAME TO "userRole_old";
ALTER TYPE "userRole_new" RENAME TO "userRole";
DROP TYPE "public"."userRole_old";
ALTER TABLE "user" ALTER COLUMN "role" SET DEFAULT 'APPLICANT';
COMMIT;

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "emailVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "lastLoginAt" TIMESTAMP(3),
ADD COLUMN     "phoneVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "refreshToken" TEXT,
ALTER COLUMN "role" SET DEFAULT 'APPLICANT';

-- CreateIndex
CREATE INDEX "user_email_idx" ON "user"("email");

-- CreateIndex
CREATE INDEX "user_phone_idx" ON "user"("phone");

-- CreateIndex
CREATE INDEX "user_role_idx" ON "user"("role");

-- CreateIndex
CREATE INDEX "user_isActive_idx" ON "user"("isActive");

-- CreateIndex
CREATE INDEX "Submission_userId_idx" ON "Submission"("userId");

-- CreateIndex
CREATE INDEX "Submission_opportunityId_idx" ON "Submission"("opportunityId");
