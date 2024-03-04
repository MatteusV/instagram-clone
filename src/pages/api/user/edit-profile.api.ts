import { NextApiRequest, NextApiResponse } from 'next'
import { parseCookies } from 'nookies'

import { prisma } from '@/lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'PUT') {
    res.status(405).end()
  }
  const { bio, site, gender } = req.body

  const cookies = parseCookies({ req })
  const sessionToken = cookies['next-auth.session-token']

  if (!sessionToken) {
    res.redirect(305, '/login')
  }
  const session = await prisma.session.findFirst({
    where: {
      session_token: sessionToken,
    },
  })

  if (!session) {
    await prisma.$disconnect()
    res.redirect(305, '/login')
  }

  if (site !== null) {
    const user = await prisma.user.update({
      where: {
        id: session!.user_id,
      },
      data: {
        site,
        bio,
        gender,
      },
    })

    if (user.site === site) {
      await prisma.$disconnect()
      return res.status(201).send({ message: 'User  updated' })
    } else {
      await prisma.$disconnect()
      return res.status(404).send({ message: 'User not updated' })
    }
  } else {
    const user = await prisma.user.update({
      where: {
        id: session!.user_id,
      },
      data: {
        bio,
        gender,
      },
    })

    if (user.bio === bio) {
      await prisma.$disconnect()
      return res.status(200).send({ message: 'User  updated' })
    } else {
      await prisma.$disconnect()
      return res.status(404).send({ message: 'User not updated' })
    }
  }
}
