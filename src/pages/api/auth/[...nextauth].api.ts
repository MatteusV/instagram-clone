import { PrismaAdapter } from '@auth/prisma-adapter'
import NextAuth from 'next-auth'
import FacebookProvider from 'next-auth/providers/facebook'

import { env } from '@/env'
import { prisma } from '@/lib/prisma'

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    FacebookProvider({
      clientId: env.FACEBOOK_CLIENT_ID,
      clientSecret: env.FACEBOOK_CLIENT_SECRET,
    }),
  ],
  secret: env.NEXT_AUTH_SECRET,
})
