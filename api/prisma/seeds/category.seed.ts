import { Prisma, PrismaClient } from '@prisma/client';

const categories: Prisma.CategoryCreateInput[] = [
  {
    name: 'Podcast',
  },
  {
    name: 'Voyage',
  },
  {
    name: 'Crypto',
  },
];

const prisma = new PrismaClient();

async function main() {
  return prisma.category
    .createMany({ data: categories })
    .then(() => console.log('✅ Categorie records created successfully'))
    .catch((e) => console.log('error', e));
}

export const seedCategory = async () => {
  try {
    await main();
    await prisma.$disconnect();
  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  }
};
