import { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from '@/lib/prisma'

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  const posts = await prisma.post.findMany()
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      avatar_url: true,
      username: true,
    },
  })

  return res.status(200).send({ posts, users })
}
