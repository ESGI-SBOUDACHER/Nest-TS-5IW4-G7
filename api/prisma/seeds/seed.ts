import { PrismaClient, Role } from '@prisma/client';
import { users } from './user.seed';

const prisma = new PrismaClient();

function catchErrors(e: Error, name: string) {
  console.error(`[SEED] Failed to create ${name} records`, e);
  prisma.$disconnect();
  process.exit(1);
}

function catchSuccess(name: string) {
  console.info(`[SEED] Succussfully create ${name} records`);
}

async function seedUser() {
  return Promise.all(users.map((n) => prisma.user.upsert(n)))
    .then(async () => catchSuccess('user'))
    .catch((e) => catchErrors(e, 'user'));
}

seedUser();
