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

  const { email, name } = req.body

  const user = await prisma.user.findUnique({
    where: {
      email,
      name,
    },
  })

  if (!user) {
    res.status(401).send({ message: 'Email or password incorrect' })
  } else {
    const token = generateToken(user.id)
    setCookie({ res }, '@instagram:token', token, {
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    })
    res.status(200).send({ message: 'Authentication successful' })
  }
}
