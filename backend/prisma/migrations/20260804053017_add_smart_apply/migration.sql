-- CreateTable
CREATE TABLE "ApplicationTemplate" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "data" JSONB,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ApplicationTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SmartApplication" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,
    "opportunityId" TEXT NOT NULL,
    "templateId" TEXT,
    "status" "ApplicationStatus" NOT NULL DEFAULT 'PENDING',
    "data" JSONB,
    "appliedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SmartApplication_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ApplicationTemplate_userId_idx" ON "ApplicationTemplate"("userId");

-- CreateIndex
CREATE INDEX "ApplicationTemplate_workspaceId_idx" ON "ApplicationTemplate"("workspaceId");

-- CreateIndex
CREATE INDEX "SmartApplication_userId_idx" ON "SmartApplication"("userId");

-- CreateIndex
CREATE INDEX "SmartApplication_workspaceId_idx" ON "SmartApplication"("workspaceId");

-- CreateIndex
CREATE INDEX "SmartApplication_opportunityId_idx" ON "SmartApplication"("opportunityId");

-- CreateIndex
CREATE INDEX "SmartApplication_status_idx" ON "SmartApplication"("status");

-- AddForeignKey
ALTER TABLE "ApplicationTemplate" ADD CONSTRAINT "ApplicationTemplate_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationTemplate" ADD CONSTRAINT "ApplicationTemplate_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SmartApplication" ADD CONSTRAINT "SmartApplication_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SmartApplication" ADD CONSTRAINT "SmartApplication_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SmartApplication" ADD CONSTRAINT "SmartApplication_opportunityId_fkey" FOREIGN KEY ("opportunityId") REFERENCES "Opportunity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SmartApplication" ADD CONSTRAINT "SmartApplication_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "ApplicationTemplate"("id") ON DELETE SET NULL ON UPDATE CASCADE;
