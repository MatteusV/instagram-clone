'use client'

import Image from 'next/image'
import { useSession } from 'next-auth/react'

import { Aside } from '@/components/aside'
import { MoreUser } from '@/components/icons/moreUser'
import { Settings } from '@/components/icons/settings'
export default function ProfilePage() {
  const { data } = useSession()
  return (
    <div className="max-md:flex max-md:flex-col max-md:justify-between w-full h-[calc(100vh-2rem)] bg-black text-white">
      <div className="max-md:hidden">
        <Aside />
      </div>
      <header className="w-full px-4 py-2 border-b border-stone-600 flex justify-between md:hidden">
        <Settings />
        <p className="font-bold">{data?.user.name}</p>
        <MoreUser />
      </header>
      <main className="md:ml-80 flex-1">
        <div className="w-full flex">
          <Image src={data!.user.avatar_url} alt="" />
        </div>
      </main>
      <div className="md:hidden">
        <Aside />
      </div>
    </div>
  )
}
