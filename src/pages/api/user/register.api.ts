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

  const userExists = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (userExists) {
    return res.status(400).json({
      message: 'User already taken.',
    })
  }

  const usernameDeafault = fullName.split(' ')[0]

  const user = await prisma.user.create({
    data: {
      name: fullName,
      email,
      username: usernameDeafault,
    },
  })

  const token = generateToken(user.id)
  setCookie({ res }, '@instagram:token', token, {
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  })

  return res.status(201).send(user)
}
