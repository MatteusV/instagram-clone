import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import profileNotImage from '@/assets/profileNotImage.jpg'
import { Aside } from '@/components/aside'
import { GridFavorite } from '@/components/gridFavorite'
import { GridMarked } from '@/components/gridMarked'
import { GridPosts } from '@/components/gridPosts'
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

interface PostsProps {
  id: string
  content: string
  subtitle: string | null
  userId: string
  reels: boolean
  city: string | null
  state: string | null
  comment: {
    id: string
    content: string
    userId: string
    postId: string
  }[]
}

export interface FavoritesProps {
  id: string
  userId: string
  user: {
    id: string
    username: string
    name: string
    bio: string | null
    email: string | null
    avatar_url: string | null
    created_at: Date
  }
  post: {
    id: string
    content: string
    subtitle: string | null
    userId: string
    reels: boolean
    city: string | null
    state: string | null
  }
}

export default function ProfilePage() {
  const { query } = useRouter()
  const [states, setStates] = useState({
    user: undefined as UserProps | undefined,
    posts: undefined as PostsProps[] | undefined,
    countPost: 0,
    favorites: undefined as FavoritesProps[] | undefined,
  })
  const [activeGrid, setActiveGrid] = useState(true)
  const [activeFavorite, setActiveFavorite] = useState(false)
  const [activeMarked, setActiveMarked] = useState(false)

  useEffect(() => {
    async function getDataUser() {
      if (query.username) {
        const response = await api.get(`/user/${query.username}`)
        if (response.status === 200) {
          setStates({
            countPost: response.data.countPosts,
            posts: response.data.posts,
            user: response.data.user,
            favorites: response.data.favorites,
          })
        } else if (response.status === 404) {
          alert(
            `Não foi possível achar o usuario com este username: ${query.username}`,
          )
        }
      } else {
        return null
      }
    }

    if (!states.user) {
      getDataUser()
    }
  }, [query, states])

  const dataHighlightProfile = [
    {
      content:
        'https://firebasestorage.googleapis.com/v0/b/instagram-clone-cd459.appspot.com/o/content-post%2F4ef7316716afc295ed65a360d50948249f7b176514543773a5277e364a7a8b9af4161c783bc1132b8fa9c03415afb556395dc929e780444d2fd1381732a5e7e1.jpg?alt=media&token=0cb815c0-0d3b-4f8d-b44f-b0cf93b39097',
      title: 'Teste',
    },
  ]

  updateScrollState(dataHighlightProfile)

  const { user, countPost, posts, favorites } = states
  if (!user) return

  return (
    <div className="max-md:flex max-md:flex-col max-md:justify-between w-full md:h-screen max-md:h-[calc(100vh-2rem)] bg-black text-white">
      <div className="max-md:hidden">
        <Aside />
      </div>
      <header className="w-full px-4 py-2 border-b border-stone-600 flex justify-between md:hidden">
        <Settings />
        <p className="font-bold">{user.username}</p>
        <MoreUser />
      </header>
      <main className="md:ml-40 lg:ml-60 xl:ml-72 2xl:ml-80 md:px-32 md:py-10  flex-1 ">
        <div className="max-md:border-b border-stone-600 max-md:p-4">
          <ProfileInformationMobile
            user={user}
            dataHighlightProfile={dataHighlightProfile}
          />
          <ProfileInformationDesktop
            user={user}
            dataHighlightProfile={dataHighlightProfile}
          />
        </div>

        <div className="max-md:w-full flex justify-around py-2 border-b border-stone-600 md:hidden">
          <div className="flex flex-col items-center justify-center">
            <p>{countPost}</p>
            <p className="">publicação</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <p>200</p>
            <p className="">seguidores</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <p>200</p>
            <p className="">seguindo</p>
          </div>
        </div>

        <div className="max-md:w-full flex justify-around py-2 lg:mt-8 lg:mb-4">
          <button
            className="flex gap-2"
            onClick={() => {
              if (activeGrid === false) {
                setActiveGrid(!activeGrid)
                setActiveFavorite(false)
                setActiveMarked(false)
              }
            }}
          >
            <Grid active={activeGrid} />
            <span
              data-active={activeGrid}
              className="max-md:hidden data-[active=true]:text-blue-500"
            >
              Publicação
            </span>
          </button>
          <button
            className="flex gap-2"
            onClick={() => {
              if (activeFavorite === false) {
                setActiveFavorite(!activeFavorite)
                setActiveGrid(false)
                setActiveMarked(false)
              }
            }}
          >
            <Favorite active={activeFavorite} />
            <span
              data-active={activeFavorite}
              className="max-md:hidden data-[active=true]:text-blue-500"
            >
              Salvos
            </span>
          </button>
          <button
            className="flex gap-2"
            onClick={() => {
              if (activeMarked === false) {
                setActiveMarked(!activeMarked)
                setActiveFavorite(false)
                setActiveGrid(false)
              }
            }}
          >
            <Marked active={activeMarked} />
            <span
              data-active={activeMarked}
              className="max-md:hidden data-[active=true]:text-blue-500"
            >
              Marcados
            </span>
          </button>
        </div>

        {activeGrid === true ? <GridPosts posts={posts!} /> : null}
        {activeFavorite === true ? (
          <GridFavorite favorites={favorites!} />
        ) : null}
        {activeMarked === true ? <GridMarked posts={posts!} /> : null}
      </main>
      <div className="md:hidden">
        <Aside />
      </div>
    </div>
  )
}

interface ProfileInformationProps {
  user: {
    id: string
    username: string
    name: string
    bio: string | null
    email: string | null
    avatar_url: string | null
    created_at: Date
  }
  dataHighlightProfile: {
    content: string
    title: string
  }[]
}

function ProfileInformationMobile({
  user,
  dataHighlightProfile,
}: ProfileInformationProps) {
  return (
    <div className="md:hidden">
      <div className="w-full  flex max-md:w-full max-md:gap-8">
        {user.avatar_url ? (
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

      <div className="max-md:w-full max-md:mt-8 ">
        <p className="font-semibold">{user.username}</p>
        {user.bio ? <p className="font-semibold">{user.bio}</p> : null}

        <div
          id="containerOverflowScrollMobile"
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
  )
}

function ProfileInformationDesktop({
  dataHighlightProfile,
  user,
}: ProfileInformationProps) {
  return (
    <div className="max-sm:hidden max-md:hidden lg:visible 2xl:pl-[10vw]">
      <div className="w-full flex gap-8 lg:gap-16">
        {user.avatar_url ? (
          <Image
            src={user.avatar_url}
            width={500}
            height={500}
            alt=""
            className="size-32 rounded-full"
          />
        ) : (
          <Image
            src={profileNotImage}
            alt=""
            className="size-32 rounded-full"
          />
        )}

        <div className="max-lg:flex-1">
          <div className="flex justify-center items-center gap-4 max-lg:flex-col">
            <p className="min-w-max">{user.username}</p>
            <div className="flex gap-4">
              <Button className="bg-stone-800 font-bold">Editar perfil</Button>
              <Button className="bg-stone-800 font-bold">
                Itens arquivados
              </Button>
              <Button className="bg-transparent w-max hover:bg-transparent">
                <Settings />
              </Button>
            </div>
          </div>
          <div className="flex gap-8 mt-4">
            <div className="flex gap-1 items-center justify-center">
              <p className="font-bold">{10}</p>
              <p className="">publicação</p>
            </div>
            <div className="flex gap-1 items-center justify-center">
              <p className="font-bold">{10}</p>
              <p className="">seguidores</p>
            </div>
            <div className="flex gap-1 items-center justify-center">
              <p className="font-bold">{10}</p>
              <p className="">seguindo</p>
            </div>
          </div>

          <div className="max-w-[50%] mt-4">
            <p className="text-sm font-semibold">{user.username}</p>
            {user.bio ? <p className="font-semibold">{user.bio}</p> : null}
          </div>
        </div>
      </div>
      <div id="containerOverflowScrollDesktop" className="mt-8 flex gap-8">
        {dataHighlightProfile.map((data) => (
          <ProfileHighlight key={data.title} data={data} newHighlight={false} />
        ))}
        <ProfileHighlight newHighlight />
      </div>
    </div>
  )
}

function updateScrollState(
  dataHighlightProfile: {
    content: string
    title: string
  }[],
) {
  if (typeof window !== 'undefined') {
    const containerMobile = document.getElementById(
      'containerOverflowScrollMobile',
    )
    const containerDesktop = document.getElementById(
      'containerOverflowScrollDesktop',
    )
    if (dataHighlightProfile.length <= 5) {
      containerMobile?.setAttribute('data-scroll', 'true')
      containerDesktop?.setAttribute('data-scroll', 'true')
    }

    if (dataHighlightProfile.length > 5) {
      containerMobile?.setAttribute('data-scroll', 'false')
      containerMobile?.setAttribute('data-scroll', 'false')
    }
  }
}
