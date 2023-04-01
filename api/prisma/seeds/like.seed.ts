import { PrismaClient } from '@prisma/client';

/* 
  Article 1 : 3 likes
  article 2 : 0 likes
  Article 3 : 1 like
*/

const prisma = new PrismaClient();

// HELPERS
async function getUserByEmail(email: string) {
  const user = await prisma.user.findFirst({
    select: { id: true },
    where: { email: email },
  });
  return user.id;
}

async function getArticleByTitle(name: string) {
  const article = await prisma.article.findFirst({
    select: { id: true },
    where: { title: name },
  });
  return article.id;
}

// MAIN
async function main() {
  await prisma.like.createMany({
    data: [
      {
        authorId: await getUserByEmail('coraline@user.fr').then((id) => {
          return id;
        }),
        articleId: await getArticleByTitle('Article 1').then((id) => {
          return id;
        }),
      },
      {
        authorId: await getUserByEmail('oceane@user.fr').then((id) => {
          return id;
        }),
        articleId: await getArticleByTitle('Article 1').then((id) => {
          return id;
        }),
      },
      {
        authorId: await getUserByEmail('romain@user.fr').then((id) => {
          return id;
        }),
        articleId: await getArticleByTitle('Article 1').then((id) => {
          return id;
        }),
      },
      {
        authorId: await getUserByEmail('sylvain@user.fr').then((id) => {
          return id;
        }),
        articleId: await getArticleByTitle('Article 3').then((id) => {
          return id;
        }),
      },
    ],
  });
}

export const seedLike = async () => {
  try {
    await main();
    console.log('[SEED] successfully create likes records');
    await prisma.$disconnect();
  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  }
};
