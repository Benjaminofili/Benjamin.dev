
import { put } from '@vercel/blob';
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

async function migrateImages() {
  const projects = await prisma.project.findMany();
  
  for (const project of projects) {
    if (project.thumbnailUrl && project.thumbnailUrl.startsWith('/')) {
      // The database has .webp but the local files are .png named after the original path
      const localRelativePath = project.thumbnailUrl.replace('.webp', '.png');
      const localPath = path.join(process.cwd(), 'public', localRelativePath);
      
      if (fs.existsSync(localPath)) {
        console.log(`Uploading ${localPath}...`);
        const fileBuffer = fs.readFileSync(localPath);
        const blob = await put(`projects/${project.slug}.png`, fileBuffer, {
          access: 'public',
        });
        
        await prisma.project.update({
          where: { id: project.id },
          data: { thumbnailUrl: blob.url },
        });
        console.log(`Updated ${project.title} to ${blob.url}`);
      } else {
        console.log(`File not found: ${localPath}`);
      }
    }
  }
}

migrateImages()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
