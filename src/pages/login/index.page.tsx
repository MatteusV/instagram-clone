import { zodResolver } from '@hookform/resolvers/zod'
import { Satisfy } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import phoneImageSecondary from '@/assets/mobile2.png'
import phoneImage from '@/assets/screenshot3.png'
import { Facebook } from '@/components/icons/facebook'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { handleConnectWithFacebook } from '@/utils/handleConnectWithFacebook'

export const satisfy = Satisfy({
  subsets: ['latin'],
  weight: ['400'],
})

const formLoginSchema = z.object({
  fullName: z.string(),
  email: z.string().transform((val) => val.toLowerCase()),
})

type FormLoginSchema = z.infer<typeof formLoginSchema>

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormLoginSchema>({
    resolver: zodResolver(formLoginSchema),
  })

  async function handleLoginUser(data: FormLoginSchema) {
    alert(
      `Estamos trabalhando nessa funcionalidade ainda, por favor ${data.fullName.split(' ')[0]} faça login com o FACEBOOK. `,
    )
    // const { status } = await api.post('/user/authenticate', data)
    // if (status === 200) {
    //   window.location.href = '/home'
    // }
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
          className={`text-5xl ${satisfy.className} ${satisfy.style} font-bold mb-20`}
        >
          Instagram
        </h1>

        <form
          onSubmit={handleSubmit(handleLoginUser)}
          className="space-y-4 w-full px-8"
        >
          <Input
            type="text"
            placeholder="Nome completo"
            {...register('fullName')}
          />
          <Input type="email" placeholder="email" {...register('email')} />

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-500 hover:bg-blue-500"
          >
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
            className="flex gap-1 mb-3 border-none bg-transparent text-blue-700 font-bold hover:bg-transparent"
          >
            <Facebook />
            Entrar com o Facebook
          </Button>
          <Link href="/" className="text-blue-700 text-sm">
            Esqueceu a senha?
          </Link>

          <div className="flex mt-6 gap-1">
            <p>Não tem uma conta?</p>
            <Link href="/register" className="text-blue-500 font-bold">
              Cadastre-se
            </Link>
          </div>
        </nav>
      </div>
    </div>
  )
}
