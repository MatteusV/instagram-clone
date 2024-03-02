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

  if (!id || !userId) {
    return res.status(400).send({ message: 'Enter the postId and userId' })
  }

  const favorite = await prisma.favorite.create({
    data: {
      postId: id,
      userId,
    },
  })

  if (favorite.id) {
    await prisma.$disconnect()
    return res.status(201).send({ message: 'Favorite created' })
  }

  await prisma.$disconnect()
  return res.status(400).send({ message: 'Error when creating favorite' })
}
