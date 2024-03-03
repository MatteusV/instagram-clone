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

  await prisma.like.delete({
    where: {
      postId: id,
      userId,
    },
  })

  await prisma.$disconnect()
  return res.status(201).send({ message: 'Like removed from post' })
}
