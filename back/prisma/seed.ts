import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt';
import { SALT_ROUNDS } from '../src/constants.js';

const prisma = new PrismaClient()

async function main() {
  await prisma.user.deleteMany();
  await prisma.user.create({
    data: {
      username: 'alice',
      password: bcrypt.hashSync('palice', SALT_ROUNDS),
      posts: {
        create: {
          title: 'Hey',
          content: 'Content of "Hey"',
        }
      },
    }
  });
  await prisma.user.create({
    data: {
      username: 'bob',
      password: bcrypt.hashSync('pbob', SALT_ROUNDS),
      posts: {
        create: [
          {
            title: 'Hello',
            content: 'Content of "Hello"',
          },
          {
            title: 'Title from bob',
            content: 'Content from bob',
          },
        ]
      },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
