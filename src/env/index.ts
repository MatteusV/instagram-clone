import { z } from 'zod'

const envSchema = z.object({
  FACEBOOK_CLIENT_ID: z.string(),
  FACEBOOK_CLIENT_SECRET: z.string(),
  NEXT_AUTH_SECRET: z.string(),
  NEXTAUTH_URL: z.string(),
  NEXT_URL: z.string(),
  JWT_SECRET: z.string(),
  DATABASE_URL: z.string(),
  FIREBASE_API_KEY: z.string(),
  FIREBASE_AUTH_DOMAIN: z.string(),
  FIREBASE_PROJETC_ID: z.string(),
  FIREBASE_STORAGE_BUCKET: z.string(),
  FIREBASE_MESSAGING_SENDER_ID: z.string(),
  FIREBASE_APP_ID: z.string(),
  FIREBASE_MEASUREMENT_ID: z.string(),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('Invalid environment variables', _env.error.format())

  throw new Error(`Invalid environment variables ${_env.error}`)
}

export const env = _env.data
