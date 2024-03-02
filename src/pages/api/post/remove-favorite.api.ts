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

  await prisma.favorite.delete({
    where: {
      postId: id,
      userId,
    },
  })

  await prisma.$disconnect()
  return res.status(200).end()
}
