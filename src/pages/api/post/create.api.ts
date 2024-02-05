import { handleUpload, type HandleUploadBody } from '@vercel/blob/client'
import { NextApiRequest, NextApiResponse } from 'next'
import { parseCookies } from 'nookies'

import { prisma } from '@/lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const body = req.body as HandleUploadBody
  try {
    const jsonResponse = await handleUpload({
      body,
      request: req,
      onBeforeGenerateToken: async () => {
        const cookies = parseCookies({ req })
        const sessionToken = cookies['next-auth.session-token']
        if (!sessionToken) {
          res.status(405).send({ message: 'Session token not found.' })
        }

        const userId = await prisma.session.findFirst({
          where: {
            sessionToken,
          },
          select: {
            userId: true,
          },
        })

        if (!userId) {
          res.status(405).send({ message: 'Inbalid session token.' })
        }

        return {
          allowedContentTypes: [
            'image/jpeg',
            'image/png',
            'image/gif',
            'video.mp4',
          ],
          tokenPayload: JSON.stringify({
            userId,
            sessionToken,
          }),
        }
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        // Get notified of client upload completion
        // ⚠️ This will not work on `localhost` websites,
        // Use ngrok or similar to get the full upload flow

        console.log('blob upload completed', blob, tokenPayload)

        try {
          // Run any logic after the file upload completed
          // const { userId } = JSON.parse(tokenPayload);
          // await db.update({ avatar: blob.url, userId });
        } catch (error) {
          throw new Error('Could not update user')
        }
      },
    })

    return res.status(200).json(jsonResponse)
  } catch (error) {
    // The webhook will retry 5 times waiting for a 200
    return res.status(400).json({ error: (error as Error).message })
  }
}
