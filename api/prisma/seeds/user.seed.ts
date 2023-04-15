import { hashPassword } from '@api/common/utils/auth';
import { PrismaClient, Role } from '@prisma/client';

const passwordHash = hashPassword('password');

const prisma = new PrismaClient();

async function main() {
  await prisma.user
    .createMany({
      data: [
        {
          email: 'user@user.fr',
          firstname: 'Jean Michel',
          lastname: 'Patapouet',
          roles: [Role.USER],
          password: await passwordHash.then((hash) => {
            return hash;
          }),
        },
        {
          email: 'admin@admin.fr',
          firstname: 'Omega Michelle',
          lastname: 'Patapouet',
          roles: [Role.ADMIN, Role.USER],
          password: await passwordHash.then((hash) => {
            return hash;
          }),
        },
        {
          email: 'oceane@user.fr',
          firstname: 'Oceane',
          roles: [Role.USER],
          password: await passwordHash.then((hash) => {
            return hash;
          }),
          lastname: 'User',
        },
        {
          email: 'oceane@admin.fr',
          firstname: 'Oceane',
          roles: [Role.ADMIN, Role.USER],
          lastname: 'Admin',
          password: await passwordHash.then((hash) => {
            return hash;
          }),
        },
        {
          email: 'sylvain@user.fr',
          firstname: 'Sylvain',
          roles: [Role.USER],
          password: await passwordHash.then((hash) => {
            return hash;
          }),
          lastname: 'User',
        },
        {
          email: 'sylvain@admin.fr',
          firstname: 'Sylvain',
          roles: [Role.ADMIN, Role.USER],
          lastname: 'Admin',
          password: await passwordHash.then((hash) => {
            return hash;
          }),
        },
        {
          email: 'romain@user.fr',
          firstname: 'Romain',
          roles: [Role.USER],
          password: await passwordHash.then((hash) => {
            return hash;
          }),
          lastname: 'User',
        },
        {
          email: 'romain@admin.fr',
          firstname: 'Romain',
          roles: [Role.ADMIN, Role.USER],
          lastname: 'Admin',
          password: await passwordHash.then((hash) => {
            return hash;
          }),
        },
        {
          email: 'coraline@user.fr',
          firstname: 'Coraline',
          roles: [Role.USER],
          password: await passwordHash.then((hash) => {
            return hash;
          }),
          lastname: 'User',
        },
        {
          email: 'coraline@admin.fr',
          firstname: 'Coraline',
          roles: [Role.ADMIN, Role.USER],
          lastname: 'Admin',
          password: await passwordHash.then((hash) => {
            return hash;
          }),
        },
      ],
    })
    .then(() => console.log('✅ User records created successfully'))
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
