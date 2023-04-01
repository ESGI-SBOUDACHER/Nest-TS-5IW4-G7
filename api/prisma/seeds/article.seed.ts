import { PrismaClient } from '@prisma/client';

/* 
  Category Podcast : 0 articles
  Category Voyage : 1 articles
  Category Crypto : 2 articles

  Article 1 : Romain
  Article 2 : Coraline
  Article 3 : Sylvain
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

async function getCategoryByName(name: string) {
  const category = await prisma.category.findFirst({
    select: { id: true },
    where: { name: name },
  });
  return category.id;
}

// MAIN
async function main() {
  await prisma.article.createMany({
    data: [
      {
        title: 'Article 1',
        content:
          'Duis in sodales ipsum.Duis in sodales ipsum.Duis in sodales ipsum.Duis in sodales ipsum.Duis in sodales ipsum.Duis in sodales ipsum.',
        isPublished: false,
        authorId: await getUserByEmail('romain@admin.fr').then((id) => {
          return id;
        }),
        categoryId: await getCategoryByName('Voyage').then((id) => {
          return id;
        }),
      },
      {
        title: 'Article 2',
        content:
          'Donec vitae varius purus. Phasellus condimentum congue convallis. Nunc diam odio, vestibulum vel est et, lobortis convallis nisl. Nunc congue lorem non auctor lacinia. Sed vel mattis metus, vel tristique mi. Nunc sit amet cursus leo. Sed non volutpat quam. Cras pretium libero ac urna sollicitudin, eget varius nulla vehicula. Morbi interdum, neque suscipit blandit sodales, mi eros imperdiet nulla, sed porta augue tellus ac ante. Aenean in leo ac quam fermentum tempor ut et massa. Mauris faucibus tellus eget rutrum viverra. Sed erat lacus, condimentum convallis neque a, aliquet ultrices neque. Proin id arcu rutrum, dapibus nunc sit amet, efficitur nisl.Duis suscipit ligula quis lacinia semper. Sed quis eros sapien. Morbi mollis, sem eget ultricies dapibus, arcu sapien posuere arcu, vitae blandit velit arcu quis eros. Mauris aliquet tortor sit amet augue maximus fermentum. Donec non risus non leo pharetra sodales. Quisque erat nulla, efficitur in dignissim in, gravida eget urna. Nulla nec libero risus. Donec viverra lorem eget purus suscipit, sit amet feugiat dolor posuere. Cras ac porta urna. Aliquam faucibus vitae velit sit amet tincidunt.',
        isPublished: false,
        authorId: await getUserByEmail('coraline@admin.fr').then((id) => {
          return id;
        }),
        categoryId: await getCategoryByName('Crypto').then((id) => {
          return id;
        }),
      },
      {
        title: 'Article 3',
        content:
          'Donec vitae varius purus. Phasellus condimentum congue convallis. Nunc diam odio, vestibulum vel est et, lobortis convallis nisl. Nunc congue lorem non auctor lacinia. Sed vel mattis metus, vel tristique mi. Nunc sit amet cursus leo. Sed non volutpat quam. Cras pretium libero ac urna sollicitudin, eget varius nulla vehicula. Morbi interdum, neque suscipit blandit sodales, mi eros imperdiet nulla, sed porta augue tellus ac ante. Aenean in leo ac quam fermentum tempor ut et massa. Mauris faucibus tellus eget rutrum viverra. Sed erat lacus, condimentum convallis neque a, aliquet ultrices neque. Proin id arcu rutrum, dapibus nunc sit amet, efficitur nisl.Duis suscipit ligula quis lacinia semper. Sed quis eros sapien. Morbi mollis, sem eget ultricies dapibus, arcu sapien posuere arcu, vitae blandit velit arcu quis eros. Mauris aliquet tortor sit amet augue maximus fermentum. Donec non risus non leo pharetra sodales. Quisque erat nulla, efficitur in dignissim in, gravida eget urna. Nulla nec libero risus. Donec viverra lorem eget purus suscipit, sit amet feugiat dolor posuere. Cras ac porta urna. Aliquam faucibus vitae velit sit amet tincidunt.',
        isPublished: false,
        authorId: await getUserByEmail('sylvain@admin.fr').then((id) => {
          return id;
        }),
        categoryId: await getCategoryByName('Crypto').then((id) => {
          return id;
        }),
      },
    ],
  });
}

export const seedArticle = async () => {
  try {
    await main();
    await prisma.$disconnect();
    console.log('[SEED] successfully create articles records');
  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  }
};
