import { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from '@/lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  const { content, postId, userId } = req.body

  const postExists = await prisma.post.findUnique({
    where: {
      id: postId,
    },
  })

  if (!postExists) {
    return res.status(404).json({ message: 'Post not found' })
  }

  const commentCreated = await prisma.comment.create({
    data: {
      content,
      postId,
      userId,
    },
  })

  if (!commentCreated.id) {
    return res.status(400).json({ message: 'Unable to create comment' })
  }

  return res.status(201).send({ message: 'Comment created' })
}
