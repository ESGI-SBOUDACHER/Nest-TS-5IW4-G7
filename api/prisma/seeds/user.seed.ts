import { Role, Prisma } from '@prisma/client';

export const users: Prisma.UserUpsertArgs[] = [
  {
    where: { email: 'oceane@user.fr' },
    update: {},
    create: {
      email: 'oceane@user.fr',
      firstname: 'Oceane',
      role: Role.ADMIN,
      password: 'password',
      lastname: 'User',
    },
  },
  {
    where: { email: 'oceane@admin.fr' },
    update: {},
    create: {
      email: 'oceane@admin.fr',
      firstname: 'Oceane',
      role: Role.USER,
      lastname: 'Admin',
      password: 'password',
    },
  },
  {
    where: { email: 'sylvain@user.fr' },
    update: {},
    create: {
      email: 'sylvain@user.fr',
      firstname: 'Sylvain',
      role: Role.ADMIN,
      password: 'password',
      lastname: 'User',
    },
  },
  {
    where: { email: 'sylvain@admin.fr' },
    update: {},
    create: {
      email: 'sylvain@admin.fr',
      firstname: 'Sylvain',
      role: Role.USER,
      lastname: 'Admin',
      password: 'password',
    },
  },
  {
    where: { email: 'romain@user.fr' },
    update: {},
    create: {
      email: 'romain@user.fr',
      firstname: 'Romain',
      role: Role.ADMIN,
      password: 'password',
      lastname: 'User',
    },
  },
  {
    where: { email: 'romain@admin.fr' },
    update: {},
    create: {
      email: 'romain@admin.fr',
      firstname: 'Romain',
      role: Role.USER,
      lastname: 'Admin',
      password: 'password',
    },
  },
  {
    where: { email: 'coraline@user.fr' },
    update: {},
    create: {
      email: 'coraline@user.fr',
      firstname: 'Coraline',
      role: Role.ADMIN,
      password: 'password',
      lastname: 'User',
    },
  },
  {
    where: { email: 'coraline@admin.fr' },
    update: {},
    create: {
      email: 'coraline@admin.fr',
      firstname: 'Coraline',
      role: Role.USER,
      lastname: 'Admin',
      password: 'password',
    },
  },
];
