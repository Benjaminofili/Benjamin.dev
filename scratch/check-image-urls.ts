
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    const projects = await prisma.project.findMany({
      select: { title: true, thumbnailUrl: true }
    });
    const articles = await prisma.article.findMany({
      select: { title: true, coverImageUrl: true }
    });
    
    console.log("Projects:");
    console.table(projects);
    console.log("Articles:");
    console.table(articles);
  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
