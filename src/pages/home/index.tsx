'use client'
import { Heart, PlusCircle } from '@phosphor-icons/react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

import { Aside } from '@/components/aside'
import { CarouselStory } from '@/components/carouselStory'
import { Post } from '@/components/post'
import { api } from '@/lib/axios'

import { satisfy } from '../login/index.page'

interface Posts {
  content: string
  id: string
  userId: string
  subtitle: string
  user: {
    name: string
    avatar_url: string
  }
}

interface Comments {
  id: string
  content: string
  userId: string
  postId: string
  user: {
    id: string
    name: string
    avatar_url: string
  }
}

export default function Home() {
  const { data } = useSession()
  const [post, setPost] = useState<Posts[]>([])
  const [comments, setComments] = useState<Comments[]>([])

  useEffect(() => {
    async function getDataPost() {
      const response = await api.get('/fetch/posts')
      setPost(response.data.posts)
      setComments(response.data.comments)
    }

    getDataPost()
  }, [setPost, setComments])

  const dataPosts = post.map((post) => {
    const postComments =
      comments?.filter((comment) => comment.postId === post.id) || []

    const posts = {
      id: post.id,
      content: post.content,
      subtitle: post.subtitle,
      userId: post.userId,
      user: {
        name: post.user.name,
        avatar_url: post.user.avatar_url,
      },
      comments: postComments,
    }
    return posts
  })

  return (
    <div className="flex max-md:flex-col-reverse max-md:justify-between bg-black">
      <Aside />
      <main className="md:px-80 h-screen overflow-y-scroll">
        <div className="flex justify-between items-center text-white py-1 px-4 md:mt-8">
          <h1 className={`${satisfy.className} font-bold text-2xl md:hidden`}>
            Instagram
          </h1>

          <div className="flex gap-4 md:hidden">
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

        <div className="space-y-14 md:flex md:flex-col md:items-center md:pb-10">
          <CarouselStory />
          {dataPosts.map((post) => {
            return <Post key={post.id} userId={data!.user.id} dataPost={post} />
          })}
        </div>
      </main>
    </div>
  )
}
