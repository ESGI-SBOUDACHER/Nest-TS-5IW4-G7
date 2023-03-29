import { PrismaClient } from '@prisma/client';
import { seedUser } from './user.seed';
import { seedCategory } from './category.seed';
import { seedArticle } from './article.seed';
import { seedLike } from './like.seed';
import { seedComment } from './comment.seed';

const prisma = new PrismaClient();

const deleteCategory = prisma.category.deleteMany();
const deleteArticle = prisma.article.deleteMany();
const deleteComment = prisma.comment.deleteMany();
const deleteLike = prisma.like.deleteMany();
const deleteUser = prisma.user.deleteMany();

async function launch() {
  await prisma.$transaction([
    deleteLike,
    deleteComment,
    deleteArticle,
    deleteCategory,
    deleteUser,
  ]);

  await seedUser();
  await seedCategory();
  await seedArticle();
  await seedComment();
  await seedLike();
}

launch();
