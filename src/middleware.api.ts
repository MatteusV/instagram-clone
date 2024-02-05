import multer from 'multer'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

import { verifyToken } from './utils/jwt'

export const config = {
  matcher: ['/', '/create/style'],
}

export async function middleware(request: NextRequest) {
  const token = cookies().get('@instagram:token')
  const sessionToken = cookies().get('next-auth.session-token')

  if (sessionToken?.value) {
    return null
  } else if (token?.value) {
    const userId = verifyToken(token.value)
    if (userId !== null) {
      return null
    }
  } else {
    return NextResponse.redirect(new URL('/login', request.url))
  }
}
