import { signIn } from 'next-auth/react'

export async function handleConnectWithFacebook() {
  await signIn('facebook')
}
