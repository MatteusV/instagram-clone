import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import profileNotImage from '@/assets/profileNotImage.jpg'
import { Aside } from '@/components/aside'
import { Favorite } from '@/components/icons/favorite'
import { Grid } from '@/components/icons/grid'
import { Marked } from '@/components/icons/marked'
import { MoreUser } from '@/components/icons/moreUser'
import { Settings } from '@/components/icons/settings'
import { ProfileHighlight } from '@/components/profileHighlight'
import { Button } from '@/components/ui/button'
import { api } from '@/lib/axios'

interface UserProps {
  id: string
  username: string
  name: string
  bio: string | null
  email: string | null
  avatar_url: string | null
  created_at: Date
}
export default function ProfilePage() {
  const { query } = useRouter()
  const [user, setUser] = useState<UserProps>()
  const [countPost, setCountPost] = useState(0)
  const [activeGrid, setActiveGrid] = useState(false)
  const [activeFavorite, setActiveFavorite] = useState(false)
  const [activeMarked, setActiveMarked] = useState(false)

  useEffect(() => {
    async function getDataUser() {
      if (query.username) {
        const response = await api.get(`/user/${query.username}`)
        if (response.status === 200) {
          setUser(response.data.user)
          setCountPost(response.data.countPosts)
        } else if (response.status === 404) {
          alert(
            `Não foi possível achar o usuario com este username: ${query.username}`,
          )
        }
      } else {
        return null
      }
    }

    if (!user || countPost === 0) {
      getDataUser()
    }
  }, [user, countPost, query])

  const dataHighlightProfile = [
    {
      content:
        'https://firebasestorage.googleapis.com/v0/b/instagram-clone-cd459.appspot.com/o/content-post%2F4ef7316716afc295ed65a360d50948249f7b176514543773a5277e364a7a8b9af4161c783bc1132b8fa9c03415afb556395dc929e780444d2fd1381732a5e7e1.jpg?alt=media&token=0cb815c0-0d3b-4f8d-b44f-b0cf93b39097',
      title: 'Teste',
    },
  ]

  if (typeof window !== 'undefined') {
    const container = document.getElementById('teste')
    if (dataHighlightProfile.length <= 5) {
      container?.setAttribute('data-scroll', 'true')
    }

    if (dataHighlightProfile.length > 5) {
      container?.setAttribute('data-scroll', 'false')
    }
  }

  if (user) {
    return (
      <div className="max-md:flex max-md:flex-col max-md:justify-between w-full h-[calc(100vh-2rem)] bg-black text-white">
        <div className="max-md:hidden">
          <Aside />
        </div>
        <header className="w-full px-4 py-2 border-b border-stone-600 flex justify-between md:hidden">
          <Settings />
          <p className="font-bold">{user.username}</p>
          <MoreUser />
        </header>
        <main className="md:ml-80 flex-1 ">
          <div className="border-b border-stone-600 max-md:p-4 ">
            <div className="w-full flex max-md:w-full max-md:gap-8">
              {user?.avatar_url ? (
                <Image
                  src={user.avatar_url}
                  width={100}
                  height={100}
                  alt=""
                  className="size-16 rounded-full"
                />
              ) : (
                <Image
                  src={profileNotImage}
                  alt=""
                  className="size-16 rounded-full"
                />
              )}

              <div>
                <p>{user.username}</p>
                <div className="flex gap-4">
                  <Button className="bg-stone-700">Editar perfil</Button>
                  <Button className="bg-stone-700">Itens arquivados</Button>
                </div>
              </div>
            </div>

            <div className="max-md:w-full max-md:mt-8">
              <p className="font-semibold">{user.username}</p>
              {user.bio ? <p className="font-semibold">{user.bio}</p> : null}

              <div
                id="teste"
                data-scroll="false"
                className="max-md:w-full flex gap-4 overflow-y-hidden overflow-x-scroll mt-8 data-[scroll=true]:overflow-hidden"
              >
                {dataHighlightProfile.map((data) => {
                  return (
                    <ProfileHighlight
                      key={data.title}
                      data={data}
                      newHighlight={false}
                    />
                  )
                })}
                <ProfileHighlight newHighlight />
              </div>
            </div>
          </div>

          <div className="max-md:w-full flex justify-around py-2 border-b border-stone-600 ">
            <div className="flex flex-col items-center justify-center">
              <p>{countPost}</p>
              <p className="text-sm text-zinc-400">publicação</p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <p>200</p>
              <p className="text-sm text-zinc-400">seguidores</p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <p>200</p>
              <p className="text-sm text-zinc-400">seguindo</p>
            </div>
          </div>
          <div className="max-md:w-full flex justify-around py-2">
            <button
              onClick={() => {
                if (activeGrid === false) {
                  setActiveGrid(!activeGrid)
                  setActiveFavorite(false)
                  setActiveMarked(false)
                }
              }}
            >
              <Grid active={activeGrid} />
            </button>
            <button
              onClick={() => {
                if (activeFavorite === false) {
                  setActiveFavorite(!activeFavorite)
                  setActiveGrid(false)
                  setActiveMarked(false)
                }
              }}
            >
              <Favorite active={activeFavorite} />
            </button>
            <button
              onClick={() => {
                if (activeMarked === false) {
                  setActiveMarked(!activeMarked)
                  setActiveFavorite(false)
                  setActiveGrid(false)
                }
              }}
            >
              <Marked active={activeMarked} />
            </button>
          </div>
        </main>
        <div className="md:hidden">
          <Aside />
        </div>
      </div>
    )
  }
}
