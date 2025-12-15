import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create demo users
  const user1 = await prisma.user.create({
    data: {
      email: 'rajesh.kumar@example.com',
      name: 'Rajesh Kumar',
    },
  })

  const user2 = await prisma.user.create({
    data: {
      email: 'priya.sharma@example.com',
      name: 'Priya Sharma',
    },
  })

  const user3 = await prisma.user.create({
    data: {
      email: 'mohammed.ali@example.com',
      name: 'Mohammed Ali',
    },
  })

  // Create demo posts
  await prisma.post.create({
    data: {
      title: 'Welcome to Suraksha Mitra',
      content: 'This is a platform dedicated to the welfare and growth of security professionals.',
      published: true,
      authorId: user1.id,
    },
  })

  await prisma.post.create({
    data: {
      title: 'Health Benefits for Security Guards',
      content: 'Learn about the comprehensive health insurance and medical benefits available to our members.',
      published: true,
      authorId: user2.id,
    },
  })

  await prisma.post.create({
    data: {
      title: 'Training Programs Announcement',
      content: 'New training courses are available for skill development and career advancement.',
      published: true,
      authorId: user3.id,
    },
  })

  await prisma.post.create({
    data: {
      title: 'Emergency Loan Process',
      content: 'Quick guide on how to access emergency loans when you need them most.',
      published: false,
      authorId: user1.id,
    },
  })

  console.log('Database seeded successfully!')
  console.log('Created users:', { user1, user2, user3 })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })