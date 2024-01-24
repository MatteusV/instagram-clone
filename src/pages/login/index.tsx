import { Facebook } from '@/components/icons/facebook'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Dancing_Script as DancingScript } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'

import phoneImage from '@/assets/screenshot3.png'
import phoneImageSecondary from '@/assets/mobile2.png'
import { signIn } from 'next-auth/react'

const dancingScript = DancingScript({
  style: ['normal'],
  subsets: ['latin'],
  weight: ['700', '400'],
})

export default function Login() {
  async function handleConnectWithFacebook() {
    await signIn('facebook')
  }

  return (
    <div className="w-screen h-screen flex md:justify-center md:items-center md:gap-16">
      <div className="flex max-md:hidden">
        <Image
          src={phoneImageSecondary}
          alt=""
          className="h-max w-max absolute"
        />
        <Image
          src={phoneImage}
          alt=""
          className="h-max w-max ml-16 z-10 mt-20"
        />
      </div>
      <div className="max-md:w-full max-md:h-full flex flex-col max-md:items-center max-md:justify-center gap-8 p-4 text-center md:gap-16 md:border md:p-10 md:py-14">
        <h1
          className={`text-5xl ${dancingScript.className} ${dancingScript.style} font-bold mb-20`}
        >
          Instagram
        </h1>

        <form action="" className="space-y-4 w-full px-8">
          <Input placeholder="Telefone, nome de usuário ou email" />
          <Input placeholder="Senha" />

          <Button type="submit" className="w-full bg-blue-500">
            Entrar
          </Button>

          <div className="flex justify-center gap-4 items-center md:hidden">
            <Separator className="bg-stone-800/50 w-[30%]" />
            <span className="text-stone-600">OU</span>
            <Separator className="bg-stone-800/50 w-[30%]" />
          </div>
        </form>

        <nav className="flex flex-col items-center justify-between">
          <Button
            onClick={handleConnectWithFacebook}
            className="flex gap-1 mb-3 border-none bg-transparent text-blue-700 font-bold focus:bg-transparent focus:border-none"
          >
            <Facebook />
            Entrar com o Facebook
          </Button>
          <Link href="/" className="text-blue-700 text-sm">
            Esqueceu a senha?
          </Link>

          <div className="flex mt-6 gap-1">
            <p>Não tem uma conta?</p>
            <Link href="/" className="text-blue-500 font-bold">
              Cadastre-se
            </Link>
          </div>
        </nav>
      </div>
    </div>
  )
}
