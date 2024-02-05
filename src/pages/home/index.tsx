import {
  Compass,
  FilmSlate,
  Heart,
  House,
  MessengerLogo,
  PlusCircle,
  UserCircle,
} from '@phosphor-icons/react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu'
import Link from 'next/link'

import { Header } from '@/components/header'
import { Post } from '@/components/post'

import { satisfy } from '../login/index.page'

export default function Home() {
  return (
    <div className="flex max-md:flex-col-reverse max-md:justify-between h-screen bg-black">
      <aside className="max-md:h-8 max-md:w-screen max-md:py-4 max-md:px-6 max-md:border-t flex  max-md:items-center border-stone-600">
        <nav className="flex md:flex-col gap-6 w-full justify-between">
          <Link href="/">
            <House fill="#ffff" className="w-5 h-5" />
          </Link>
          <Link href="/">
            <Compass fill="#ffff" className="w-5 h-5" />
          </Link>
          <Link href="/">
            <FilmSlate fill="#ffff" className="w-5 h-5" />
          </Link>
          <Link href="/">
            <MessengerLogo fill="#ffff" className="w-5 h-5" />
          </Link>
          <Link href="/">
            <UserCircle fill="#ffff" className="w-5 h-5" />
          </Link>
        </nav>
      </aside>
      <main>
        <div className="flex justify-between items-center text-white py-1 px-4">
          <h1 className={`${satisfy.className} font-bold text-2xl`}>
            Instagram
          </h1>

          <div className="flex gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <PlusCircle fill="#ffff" className="h-7 w-7" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-zinc-900 z-10 w-32 p-2 rounded-md">
                <DropdownMenuItem className="text-white text-lg font-medium">
                  <Link href="/create/style">Publicação</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-white text-lg font-medium">
                  <Link href="/">Story</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Heart fill="#ffff" className="h-7 w-7" />
          </div>
        </div>
        <Header />

        <Post />
      </main>
    </div>
  )
}
