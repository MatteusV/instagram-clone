import NextAuth, { NextAuthOptions } from 'next-auth'
import FacebookProvider from 'next-auth/providers/facebook'
import { NextApiRequest, NextApiResponse, NextPageContext } from 'next'
import { PrismaAdapter } from '@/lib/nextAuth/prisma-adapter'
import { env } from '@/env'

export function buildNextAuthOptions(
  req: NextApiRequest | NextPageContext['req'],
  res: NextApiResponse | NextPageContext['res'],
): NextAuthOptions {
  return {
    adapter: PrismaAdapter(req, res),
    providers: [
      FacebookProvider({
        clientId: env.FACEBOOK_CLIENT_ID,
        clientSecret: env.FACEBOOK_CLIENT_SECRET ?? '',
      }),
      // ...add more providers here
    ],

    secret: env.NEXT_AUTH_SECRET,
    callbacks: {
      async signIn({ account }) {
        if (!account) {
          return `/?error=failedAuth`
        }

        return true
      },

      async session({ session, user }) {
        return {
          ...session,
          user,
        }
      },
    },
    logger: {
      error(code, ...message) {
        console.error(code, message)
      },
      warn(code, ...message) {
        console.warn(code, message)
      },
      debug(code, ...message) {
        console.debug(code, message)
      },
    },
  }
}

export default async function Auth(req: NextApiRequest, res: NextApiResponse) {
  return await NextAuth(req, res, buildNextAuthOptions(req, res))
}
