import { NextApiRequest, NextApiResponse } from 'next'
import { parseCookies } from 'nookies'

import { prisma } from '@/lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
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
    await prisma.$disconnect()
    return res.redirect(301, '/login')
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.user_id,
    },
  })

  if (!user) {
    await prisma.$disconnect()
    res.status(404).send({ message: 'User not found' })
  }
  await prisma.$disconnect()
  res.status(200).send(user)
}
