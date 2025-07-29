import { PrismaClient } from '@prisma/client';
import sampleData from './sample-data';

async function main() {
  const prisma = new PrismaClient();
  // Clear existing data
  await prisma.product.deleteMany();
  await prisma.account.deleteMany();
  await prisma.session.deleteMany();
  await prisma.verificationToken.deleteMany();
  await prisma.user.deleteMany();

  await prisma.product.createMany({ data: sampleData.products });
  // await prisma.account.createMany({data: sampleData.account });
  // await prisma.session.createMany({data: sampleData.session});
  // await prisma.verificationToken.createMany({data: sampleData.verificationToken });
  await prisma.user.createMany({ data: sampleData.users });

  console.log('Database seeded with sample data.');
}

main();
