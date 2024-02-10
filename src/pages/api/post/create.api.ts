import { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from '@/lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  const { formData, image } = req.body

  const { location, subtitle } = formData

  const sessionToken = req.cookies['next-auth.session-token']

  const session = await prisma.session.findFirst({
    where: {
      sessionToken,
    },
  })

  if (!session?.userId) {
    return res.status(401).send({ message: 'User not found' })
  }

  const city = location.split('-')[0]
  const state = location.split('-')[1]

  await prisma.post.create({
    data: {
      content: image,
      subtitle,
      userId: session.userId,
      Location: {
        create: {
          city,
          state,
        },
      },
    },
  })

  return res.status(201).send({ message: 'Post created' })
}
