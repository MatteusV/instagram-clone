import { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from '@/lib/prisma'

export default async function Handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).end()
  }
  const locations = await prisma.location.findMany({})
  if (locations) {
    return res.status(200).send(locations)
  } else {
    return res.status(400).send({ message: 'No location found' })
  }
}
