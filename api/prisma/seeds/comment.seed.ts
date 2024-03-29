import { PrismaClient } from '@prisma/client';

/* 
  Article 1 : Romain
    2 comments
  Article 2 : Coraline
    1 comment
  Article 3 : Sylvain
    0 comment


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
  await prisma.comment.createMany({
    data: [
      {
        content: 'Très bon article !',
        authorId: await getUserByEmail('coraline@user.fr').then((id) => {
          return id;
        }),
        articleId: await getArticleByTitle('Article 1').then((id) => {
          return id;
        }),
      },
      {
        content:
          'I like to do lists but only add things which are not regularly done. That way the list is short and those items will stand out, not hidden by the routine.',
        authorId: await getUserByEmail('oceane@user.fr').then((id) => {
          return id;
        }),
        articleId: await getArticleByTitle('Article 1').then((id) => {
          return id;
        }),
      },
      {
        content:
          'I like to do lists but only add things which are not regularly done. That way the list is short and those items will stand out, not hidden by the routine.',
        authorId: await getUserByEmail('sylvain@user.fr').then((id) => {
          return id;
        }),
        articleId: await getArticleByTitle('Article 2').then((id) => {
          return id;
        }),
      },
    ],
  });
}

export const seedComment = async () => {
  try {
    await main();
    console.log('✅ Comment records created successfully');
    await prisma.$disconnect();
  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  }
};
