const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

async function main() {
  const email = 'demo@povos.com';
  const password = await bcrypt.hash('Demo@123', 10);

  const user = await prisma.user.upsert({
    where: { email },
    update: {
      firstName: 'Demo',
      lastName: 'User',
      password,
      role: 'ADMIN',
      isVerified: true,
      age: 30,
      education: 'Graduate',
      income: 500000,
      category: 'professional',
      state: 'Bihar',
    },
    create: {
      email,
      password,
      firstName: 'Demo',
      lastName: 'User',
      role: 'ADMIN',
      isVerified: true,
      age: 30,
      education: 'Graduate',
      income: 500000,
      category: 'professional',
      state: 'Bihar',
    },
  });
  console.log('✅ User:', user.email, user.firstName, user.lastName);

  const opps = [
    {
      title: 'Startup India Seed Fund',
      description: 'Government scheme for startups.',
      category: 'Startup',
      type: 'Grant',
      state: 'All India',
      lastDate: new Date('2026-12-31'),
      status: 'OPEN',
    },
    {
      title: 'Bihar Startup Policy 2026',
      description: 'Bihar government support for startups.',
      category: 'Startup',
      type: 'Scheme',
      state: 'Bihar',
      lastDate: new Date('2026-09-30'),
      status: 'OPEN',
    },
    {
      title: 'National Scholarship Scheme',
      description: 'Scholarship for graduate students.',
      category: 'Education',
      type: 'Scholarship',
      state: 'All India',
      lastDate: new Date('2026-08-15'),
      status: 'OPEN',
    },
  ];

  for (const opp of opps) {
    await prisma.opportunity.upsert({
      where: { title: opp.title },
      update: opp,
      create: opp,
    });
  }
  console.log('✅ 3 opportunities created.');
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.());