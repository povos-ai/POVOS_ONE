import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // Create default roles
  const roles = await prisma.role.createMany({
    data: [
      { name: 'SUPER_ADMIN', description: 'Full access to everything', isSystem: true },
      { name: 'ADMIN', description: 'Workspace admin', isSystem: true },
      { name: 'ORGANIZATION', description: 'Organization admin', isSystem: true },
      { name: 'REVIEWER', description: 'Can review submissions', isSystem: true },
      { name: 'APPLICANT', description: 'Can apply to opportunities', isSystem: true },
    ],
    skipDuplicates: true,
  });

  console.log('✅ Roles created');

  // Create default permissions
  const permissions = await prisma.permission.createMany({
    data: [
      { resource: 'opportunity', action: 'view' },
      { resource: 'opportunity', action: 'create' },
      { resource: 'opportunity', action: 'edit' },
      { resource: 'opportunity', action: 'delete' },
      { resource: 'user', action: 'view' },
      { resource: 'user', action: 'create' },
      { resource: 'user', action: 'edit' },
      { resource: 'user', action: 'delete' },
      { resource: 'workspace', action: 'view' },
      { resource: 'workspace', action: 'create' },
      { resource: 'workspace', action: 'edit' },
      { resource: 'workspace', action: 'delete' },
      { resource: 'submission', action: 'view' },
      { resource: 'submission', action: 'create' },
      { resource: 'submission', action: 'edit' },
      { resource: 'submission', action: 'delete' },
      { resource: 'ai', action: 'view' },
      { resource: 'ai', action: 'use' },
      { resource: 'document', action: 'view' },
      { resource: 'document', action: 'create' },
      { resource: 'document', action: 'edit' },
      { resource: 'document', action: 'delete' },
    ],
    skipDuplicates: true,
  });

  console.log('✅ Permissions created');

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10);

  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      password: hashedPassword,
      firstName: 'Super',
      lastName: 'Admin',
      isActive: true,
    },
  });

  console.log('✅ Admin user created');

  // Create default workspace
  const workspace = await prisma.workspace.upsert({
    where: { slug: 'povos-platform' },
    update: {},
    create: {
      name: 'POVOS Platform',
      slug: 'povos-platform',
      description: 'Main <PovosText className="text-2xl" /> Platform',
      isActive: true,
      createdById: adminUser.id,
    },
  });

  console.log('✅ Workspace created');

  // Assign admin user to workspace with SUPER_ADMIN role
  const superAdminRole = await prisma.role.findFirst({
    where: { name: 'SUPER_ADMIN' },
  });

  if (superAdminRole) {
    await prisma.membership.upsert({
      where: {
        userId_workspaceId_divisionId: {
          userId: adminUser.id,
          workspaceId: workspace.id,
          divisionId: '', // ✅ Empty string instead of null
        },
      },
      update: {},
      create: {
        userId: adminUser.id,
        workspaceId: workspace.id,
        roleId: superAdminRole.id,
        isActive: true,
      },
    });
    console.log('✅ Admin membership created');
  }

  console.log('🎉 Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });