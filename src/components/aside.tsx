import {
  Compass,
  FilmSlate,
  Heart,
  House,
  MagnifyingGlass,
  MessengerLogo,
  UserCircle,
} from '@phosphor-icons/react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

import { satisfy } from '@/pages/login/index.page'

import { DialogCreatePost } from './dialogCreatePost'

export function Aside() {
  const { data } = useSession()
  return (
    <>
      <aside className="max-md:h-8 max-md:w-screen max-md:py-4 max-md:px-6 max-md:border-t flex  max-md:items-center border-stone-600 md:border-r md:pt-8 -mr-40 fixed bg-black">
        <nav className="flex gap-6 w-full flex-col h-screen justify-start items-start p-4 px-8 text-white max-sm:hidden">
          <h1
            className={`${satisfy.className} font-bold text-5xl max-md:hidden text-center text-white mb-8`}
          >
            Instagram
          </h1>
          <Link href="/" className="flex gap-4 items-center justify-center">
            <House fill="#ffff" className="size-6" />
            <strong>Página Inicial</strong>
          </Link>
          <Link href="/" className="flex gap-4 items-center justify-center">
            <MagnifyingGlass fill="#ffff" className="size-6" />
            <strong>Pesquisa</strong>
          </Link>
          <Link href="/" className="flex gap-4 items-center justify-center">
            <Compass fill="#ffff" className="size-6" />
            <strong>Explorar</strong>
          </Link>
          <Link href="/" className="flex gap-4 items-center justify-center">
            <FilmSlate fill="#ffff" className="size-6" />
            <strong>Reels</strong>
          </Link>
          <Link href="/" className="flex gap-4 items-center justify-center">
            <MessengerLogo fill="#ffff" className="size-6" />
            <strong>Menssagem</strong>
          </Link>
          <Link href="/" className="flex gap-4 items-center justify-center">
            <Heart fill="#ffff" className="size-6" />
            <strong>Notificações</strong>
          </Link>

          <DialogCreatePost />

          <Link href="/" className="flex gap-4 items-center justify-center">
            <UserCircle fill="#ffff" className="size-6" />
            <strong>Perfil</strong>
          </Link>
        </nav>

        <nav className="flex gap-6 w-full  justify-between border-r md:flex-col  md:h-screen md:w-[15vw] md:justify-start md:p-4 md:hidden">
          <Link href="/">
            <House fill="#ffff" className="size-6" />
          </Link>
          <Link href="/">
            <Compass fill="#ffff" className="size-6" />
          </Link>
          <Link href="/">
            <FilmSlate fill="#ffff" className="size-6" />
          </Link>
          <Link href="/">
            <MessengerLogo fill="#ffff" className="size-6" />
          </Link>
          <Link href={`/profile/${data?.user.name}`}>
            <UserCircle fill="#ffff" className="size-6" />
          </Link>
        </nav>
      </aside>
    </>
  )
}
