import { NextApiRequest, NextApiResponse } from 'next'
import { setCookie } from 'nookies'

import { prisma } from '@/lib/prisma'
import { generateToken } from '@/utils/jwt'

export default async function Handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  const { email, fullName } = req.body
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (!user) {
    await prisma.$disconnect()
    return res.status(401).send({ message: 'Email or password incorrect' })
  }

  if (user.name === fullName) {
    const token = generateToken(user.id)
    setCookie({ res }, '@instagram:token', token, {
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    })
    await prisma.$disconnect()
    return res.status(200).send(user.id)
  }

  await prisma.$disconnect()
  return res.status(401).send({ message: 'Email or full name incorrect' })
}
