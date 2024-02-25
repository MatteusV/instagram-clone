import { NextApiRequest, NextApiResponse } from 'next'
import { parseCookies } from 'nookies'

import { prisma } from '@/lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  const { content, postId } = req.body

  const cookies = parseCookies({ req })
  const sessionToken = cookies['next-auth.session-token']

  const session = await prisma.session.findFirst({
    where: {
      session_token: sessionToken,
    },
  })

  if (!session) {
    return res.status(401).send({ message: 'Unable to find user' })
  }

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
      userId: session.user_id,
    },
  })

  if (!commentCreated.id) {
    return res.status(400).json({ message: 'Unable to create comment' })
  }

  return res.status(201).send({ message: 'Comment created' })
}
