import { Button } from '@/components/ui/button'
import { satisfy } from '../login'
import { Facebook } from '@/components/icons/facebook'
import { handleConnectWithFacebook } from '@/utils/handleConnectWithFacebook'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import Image from 'next/image'
import apple from '@/assets/buttonApple.png'
import google from '@/assets/buttonGoogle.png'
import { Separator } from '@/components/ui/separator'

export default function Register() {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center gap-4">
      <div className="md:w-80 max-md:h-screen lg:w-96 2xl:h-max border border-black/30 shadow-xl max-md:p-8 p-16 pb-4">
        <h1 className={`${satisfy.className} font-normal text-6xl text-center`}>
          Instagram
        </h1>
        <p className="text-center font-bold text-zinc-800/50 mt-4">
          Cadastre-se para ver fotos e vídeos dos seus amigos.
        </p>

        <Button
          onClick={handleConnectWithFacebook}
          className="flex justify-center items-center gap-2 bg-sky-600  font-bold px-8 m-auto mt-4 hover:bg-sky-500 hover:cursor-pointer"
        >
          <Facebook />
          Entrar com Facebook
        </Button>

        <div className="flex justify-center gap-2 items-center mt-4">
          <Separator className="bg-stone-500/50 flex-1" />
          <span className="text-stone-600 text-xs">OU</span>
          <Separator className="bg-stone-500/50 flex-1" />
        </div>

        <form className="space-y-2 mt-8">
          <Input
            type="email"
            className="rounded-none shadow-md placeholder:text-xs"
            placeholder="Número de telofone ou email"
          />
          <Input
            type="text"
            className="rounded-none shadow-md placeholder:text-xs"
            placeholder="Nome completo"
          />
          <Input
            type="text"
            className="rounded-none shadow-md placeholder:text-xs"
            placeholder="Nome de usuário"
          />
          <Input
            type="password"
            className="rounded-none shadow-md placeholder:text-xs"
            placeholder="Senha"
          />
        </form>

        <p className="text-xs text-zinc-600 mt-4 text-center">
          As pessoas que usam nosso serviço podem ter enviado suas informações
          de contato para o Instagram.{' '}
          <Link href="/" className="text-blue-900 hover:cursor-pointer">
            Saiba mais
          </Link>
          <br />
          <br />
          Ao se cadastrar, você concorda com nossos{' '}
          <Link href="/" className="text-blue-900 hover:cursor-pointer">
            Termos
          </Link>
          ,{' '}
          <Link href="/" className="text-blue-900 hover:cursor-pointer">
            Política de Privacidade
          </Link>
          {' e '}
          <Link href="/" className="text-blue-900 hover:cursor-pointer">
            Política de Cookies
          </Link>
        </p>

        <Button
          onClick={handleConnectWithFacebook}
          className="flex justify-center items-center gap-2 w-full  bg-sky-500  font-bold px-8 m-auto mt-4 hover:bg-sky-400 hover:cursor-pointer"
        >
          Cadastra-se
        </Button>
      </div>

      <div className="border border-black/30 shadow-2xl md:w-80  lg:w-96 flex justify-center items-center p-20 py-8">
        <p>
          Tem um conta?{' '}
          <Link href="/login" className="text-sky-500 font-bold">
            Conecte-se
          </Link>
        </p>
      </div>

      <div className="text-center space-y-4">
        <p>Obtenha o aplicativo.</p>
        <div className="flex gap-4">
          <Button className="p-0 bg-transparent hover:bg-transparent">
            <Image src={apple} alt="" className="w-max h-10" />
          </Button>
          <Button className="p-0 bg-transparent hover:bg-transparent">
            <Image src={google} alt="" className="w-max h-10" />
          </Button>
        </div>
      </div>
    </div>
  )
}
