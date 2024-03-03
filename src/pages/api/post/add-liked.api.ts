import { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from '@/lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  const { id, userId } = req.body

  const liked = await prisma.like.create({
    data: {
      postId: id,
      userId,
    },
  })

  if (!liked) {
    await prisma.$disconnect()
    return res.status(400).send({ message: 'Error when liking the post.' })
  }

  await prisma.$disconnect()
  return res.status(201).send({ message: 'Post liked' })
}
