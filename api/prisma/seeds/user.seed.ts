import { Role, Prisma, PrismaClient } from '@prisma/client';

const users: Prisma.UserCreateInput[] = [
  {
    email: 'oceane@user.fr',
    firstname: 'Oceane',
    role: Role.ADMIN,
    password: 'password',
    lastname: 'User',
  },
  {
    email: 'oceane@admin.fr',
    firstname: 'Oceane',
    role: Role.USER,
    lastname: 'Admin',
    password: 'password',
  },
  {
    email: 'sylvain@user.fr',
    firstname: 'Sylvain',
    role: Role.ADMIN,
    password: 'password',
    lastname: 'User',
  },
  {
    email: 'sylvain@admin.fr',
    firstname: 'Sylvain',
    role: Role.USER,
    lastname: 'Admin',
    password: 'password',
  },
  {
    email: 'romain@user.fr',
    firstname: 'Romain',
    role: Role.ADMIN,
    password: 'password',
    lastname: 'User',
  },
  {
    email: 'romain@admin.fr',
    firstname: 'Romain',
    role: Role.USER,
    lastname: 'Admin',
    password: 'password',
  },
  {
    email: 'coraline@user.fr',
    firstname: 'Coraline',
    role: Role.ADMIN,
    password: 'password',
    lastname: 'User',
  },
  {
    email: 'coraline@admin.fr',
    firstname: 'Coraline',
    role: Role.USER,
    lastname: 'Admin',
    password: 'password',
  },
];

const prisma = new PrismaClient();

async function main() {
  await prisma.user
    .createMany({ data: users })
    .then(() => console.log('[SEED] successfully create users records'))
    .catch((e) => console.log('error', e));
}

export const seedUser = async () => {
  try {
    await main();
    await prisma.$disconnect();
  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  }
};
