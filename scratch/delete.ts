import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  await prisma.project.deleteMany({where: {slug: 'agentic-ai-chatbot'}});
  console.log('deleted');
  await prisma.$disconnect();
}
main();
