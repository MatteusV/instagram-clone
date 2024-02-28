import { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from '@/lib/prisma'

export default async function Handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { username } = req.query

  if (!username) {
    return res.status(400).send({ message: 'No username provided' })
  }

  if (typeof username === 'string') {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    })
    if (user) {
      const countPosts = await prisma.post.count({
        where: {
          userId: user.id,
        },
      })
      return res.status(200).send({ user, countPosts })
    } else {
      return res.status(404).send({ message: 'User not found' })
    }
  }
}
