import { PrismaClient, Role } from '@prisma/client';
import { hashPassword } from '@api/common/utils/auth';

const passwordHash = hashPassword('password');

const prisma = new PrismaClient();

async function main() {
  await prisma.user
    .createMany({
      data: [
        {
          email: 'oceane@user.fr',
          firstname: 'Oceane',
          role: Role.ADMIN,
          password: await passwordHash.then((hash) => {
            return hash;
          }),
          lastname: 'User',
        },
        {
          email: 'oceane@admin.fr',
          firstname: 'Oceane',
          role: Role.USER,
          lastname: 'Admin',
          password: await passwordHash.then((hash) => {
            return hash;
          }),
        },
        {
          email: 'sylvain@user.fr',
          firstname: 'Sylvain',
          role: Role.ADMIN,
          password: await passwordHash.then((hash) => {
            return hash;
          }),
          lastname: 'User',
        },
        {
          email: 'sylvain@admin.fr',
          firstname: 'Sylvain',
          role: Role.USER,
          lastname: 'Admin',
          password: await passwordHash.then((hash) => {
            return hash;
          }),
        },
        {
          email: 'romain@user.fr',
          firstname: 'Romain',
          role: Role.ADMIN,
          password: await passwordHash.then((hash) => {
            return hash;
          }),
          lastname: 'User',
        },
        {
          email: 'romain@admin.fr',
          firstname: 'Romain',
          role: Role.USER,
          lastname: 'Admin',
          password: await passwordHash.then((hash) => {
            return hash;
          }),
        },
        {
          email: 'coraline@user.fr',
          firstname: 'Coraline',
          role: Role.ADMIN,
          password: await passwordHash.then((hash) => {
            return hash;
          }),
          lastname: 'User',
        },
        {
          email: 'coraline@admin.fr',
          firstname: 'Coraline',
          role: Role.USER,
          lastname: 'Admin',
          password: await passwordHash.then((hash) => {
            return hash;
          }),
        },
      ],
    })
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
