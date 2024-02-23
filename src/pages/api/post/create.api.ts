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

  const { formData, imageUrl } = req.body
  const { subtitle, location } = formData

  const cookies = parseCookies({ req })
  const sessionToken = cookies['next-auth.session-token']

  if (!sessionToken) {
    return res.redirect(301, '/login')
  }

  const session = await prisma.session.findFirst({
    where: {
      session_token: sessionToken,
    },
  })

  if (!session) {
    return res.redirect(301, '/login')
  }

  if (location) {
    const city = location.split('-')[0]
    const state = location.split('-')[1]

    const postCreated = await prisma.post.create({
      data: {
        content: imageUrl,
        subtitle,
        userId: session.user_id,
        city,
        state,
      },
    })

    if (postCreated) {
      return res.status(201).send({ message: 'Post created' })
    } else {
      return res.status(400).send({ message: 'Error when creating post' })
    }
  } else {
    await prisma.post.create({
      data: {
        content: imageUrl,
        subtitle,
        userId: session.user_id,
      },
    })
    return res.status(201).send({ message: 'Post created' })
  }
}
