import { z } from 'zod'

const envSchema = z.object({
  FACEBOOK_CLIENT_ID: z.string(),
  FACEBOOK_CLIENT_SECRET: z.string(),
  NEXT_AUTH_SECRET: z.string(),
  NEXTAUTH_URL: z.string(),
  JWT_SECRET: z.string(),
  PULSE_API_KEY: z.string(),
  NEXT_URL: z.string(),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('Invalid environment variables', _env.error.format())

  throw new Error('Invalid environment variables')
}

export const env = _env.data
