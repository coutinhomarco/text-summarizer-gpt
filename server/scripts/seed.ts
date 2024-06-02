import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create initial users
  const user1 = await prisma.user.create({
    data: {
      username: 'john_doe',
      password: 'securepassword123',
      logs: {
        create: [
          {
            text: 'This is a message log for John Doe.',
            summary: 'Message log summary for John Doe.',
          },
          {
            text: 'Another message log for John Doe.',
            summary: 'Another message log summary for John Doe.',
          },
        ],
      },
    },
  });

  const user2 = await prisma.user.create({
    data: {
      username: 'jane_doe',
      password: 'anothersecurepassword456',
      logs: {
        create: [
          {
            text: 'This is a message log for Jane Doe.',
            summary: 'Message log summary for Jane Doe.',
          },
        ],
      },
    },
  });

  console.log({ user1, user2 });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
