import { sign, verify } from 'jsonwebtoken'
import { env } from 'process'

// import { env } from '@/env'

export const generateToken = (userData: string): string => {
  const token = sign(userData, env.JWT_SECRET!)
  return token
}

export const verifyToken = (token: string): string | null => {
  try {
    const decoded = verify(token, env.JWT_SECRET!) as string
    return decoded
  } catch (error) {
    return null
  }
}
