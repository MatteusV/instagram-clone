import { NextApiRequest, NextApiResponse } from 'next'
import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import FacebookProvider from 'next-auth/providers/facebook'
import { env } from 'process'

import { api } from '@/lib/axios'
import { PrismaAdapter } from '@/lib/nextauth/prisma-adapter'

export function buildNextAuthOptions(): NextAuthOptions {
  return {
    adapter: PrismaAdapter(),
    providers: [
      FacebookProvider({
        clientId: env.FACEBOOK_CLIENT_ID!,
        clientSecret: env.FACEBOOK_CLIENT_SECRET!,
      }),
      CredentialsProvider({
        name: 'credentials',
        credentials: {
          email: {
            label: 'Email',
            type: 'email',
            placeholder: 'Email: exemplo@exemplo.com',
          },
          fullName: { label: 'Nome completo', type: 'text' },
        },
        authorize: async (credentials) => {
          const response = await api.post('/users/authenticate', {
            email: credentials!.email,
            fullName: credentials!.fullName,
          })

          const { userId } = response.data

          if (userId) {
            return userId
          } else {
            return null
          }
        },
      }),
    ],
    secret: env.NEXT_AUTH_SECRET!,
    pages: {
      signIn: '/login',
      error: '/',
    },
    jwt: {
      secret: env.JWT_SECRET!,
    },
  }
}

export default async function Auth(req: NextApiRequest, res: NextApiResponse) {
  return await NextAuth(req, res, buildNextAuthOptions())
}
