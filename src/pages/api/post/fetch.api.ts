import { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from '@/lib/prisma'

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  const posts = await prisma.post.findMany({
    include: {
      user: {
        select: {
          name: true,
          avatar_url: true,
        },
      },
    },
  })

  const [comments] = await Promise.all(
    posts.map(async (post) => {
      const comments = await prisma.comment.findMany({
        where: {
          postId: post.id,
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              avatar_url: true,
            },
          },
        },
      })
      return comments
    }),
  )

  return res.status(200).send({ posts, comments })
}
