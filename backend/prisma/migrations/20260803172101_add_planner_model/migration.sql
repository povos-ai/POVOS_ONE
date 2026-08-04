-- CreateEnum
CREATE TYPE "PlannerType" AS ENUM ('DEADLINE', 'REMINDER', 'EVENT', 'TASK', 'INTERVIEW', 'FOLLOWUP', 'MEETING', 'SUBMISSION');

-- CreateEnum
CREATE TYPE "Priority" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'URGENT');

-- CreateEnum
CREATE TYPE "PlannerStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED', 'OVERDUE');

-- CreateTable
CREATE TABLE "Planner" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "type" "PlannerType" NOT NULL,
    "priority" "Priority" NOT NULL DEFAULT 'MEDIUM',
    "status" "PlannerStatus" NOT NULL DEFAULT 'PENDING',
    "dueDate" TIMESTAMP(3),
    "reminderAt" TIMESTAMP(3),
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Planner_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Planner_userId_idx" ON "Planner"("userId");

-- CreateIndex
CREATE INDEX "Planner_workspaceId_idx" ON "Planner"("workspaceId");

-- CreateIndex
CREATE INDEX "Planner_dueDate_idx" ON "Planner"("dueDate");

-- CreateIndex
CREATE INDEX "Planner_status_idx" ON "Planner"("status");

-- CreateIndex
CREATE INDEX "Planner_type_idx" ON "Planner"("type");

-- AddForeignKey
ALTER TABLE "Planner" ADD CONSTRAINT "Planner_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Planner" ADD CONSTRAINT "Planner_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
