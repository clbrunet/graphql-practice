import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.user.upsert({
    where: {
      username: 'alice',
    },
    update: {},
    create: {
      username: 'alice',
      password: 'passalice',
      posts: {
        create: {
          title: 'Hey',
          content: 'Content of "Hey"',
        }
      },
    },
  });
  await prisma.user.upsert({
    where: {
      username: 'bob',
    },
    update: {},
    create: {
      username: 'bob',
      password: 'passbob',
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
