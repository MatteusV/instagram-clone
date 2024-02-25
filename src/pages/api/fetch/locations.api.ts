// import { NextApiRequest, NextApiResponse } from 'next'

// import { prisma } from '@/lib/prisma'

// export default async function Handler(
//   req: NextApiRequest,
//   res: NextApiResponse,
// ) {
//   const locations = await prisma.location.findMany({})
//   if (locations) {
//     return res.status(200).send(locations)
//   } else {
//     return res.status(400).send({ message: 'No location found' })
//   }
// }
