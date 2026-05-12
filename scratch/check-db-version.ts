
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    const result = await prisma.$queryRawUnsafe('SELECT version();');
    console.log(result);
  } catch (error) {
    console.error('Error fetching version:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
