'use client'
import {
  BookmarkSimple,
  ChatCircle,
  DotsThree,
  Heart,
  Share,
} from '@phosphor-icons/react'
import Image from 'next/image'
import { useEffect, useState } from 'react'

import profileNotImage from '@/assets/profileNotImage.jpg'

import { CommentsPost } from './comments-post'

interface Posts {
  dataPost: {
    id: string
    content: string
    subtitle: string
    userId: string
    user: {
      name: string
      avatar_url: string
    }
    comments?: {
      id: string
      username: string
      content: string
    }[]
  }
}

export function Post({ dataPost }: Posts) {
  const [subtitle, setSubtitle] = useState('')
  const { comments } = dataPost
  function handleShowMoreSubtitle() {
    setSubtitle(dataPost.subtitle)
  }

  useEffect(() => {
    if (dataPost.subtitle.length >= 100) {
      setSubtitle(dataPost.subtitle.substring(0, 99))
    } else {
      setSubtitle(dataPost.subtitle)
    }
  }, [dataPost.subtitle])
  return (
    <div className="max-md:w-full  max-md:p-2 text-white  md:w-[40%]">
      <div className="w-full flex items-center justify-between">
        <div className="flex gap-2 items-center">
          {dataPost.user.avatar_url ? (
            <Image
              src={dataPost.user.avatar_url}
              width={500}
              height={500}
              alt=""
              className="h-10 w-10 rounded-full border-2 border-transparent data-[story=true]:border-red-400"
            />
          ) : (
            <Image
              src={profileNotImage}
              className="h-10 w-10 rounded-full border-2 border-transparent data-[story=true]:border-red-400"
              alt=""
            />
          )}
          <div>
            <p className="font-bold">{dataPost.user.name}</p>
            <p className="text-xs">
              Áudio <span className="text-stone-500">original</span>
            </p>
          </div>
        </div>
        <button>
          <DotsThree fill="#ffff" size={24} />
        </button>
      </div>

      <main className="w-full mt-2 md:border md:border-stone-800 md:flex md:justify-center rounded-md">
        <Image
          src={dataPost.content}
          width={500}
          height={500}
          alt=""
          className="max-sm:w-full"
        />
      </main>

      <div className="w-full mt-8 flex justify-between mb-4">
        <div className="flex gap-4">
          <button>
            <Heart fill="#ffff" size={28} />
          </button>
          <button>
            <ChatCircle fill="#ffff" size={28} />
          </button>
          <button>
            <Share fill="#ffff" size={28} />
          </button>
        </div>

        <button>
          <BookmarkSimple fill="#ffff" size={28} />
        </button>
      </div>

      <div className="max-sm:mt-4 max-sm:mb-4 max-sm:w-full">
        <p>
          {subtitle}{' '}
          {subtitle.length <= 100 ? (
            ''
          ) : (
            <span
              onClick={handleShowMoreSubtitle}
              className="text-stone-500 hover:cursor-pointer"
            >
              ... mais
            </span>
          )}
        </p>
      </div>

      {comments ? (
        <CommentsPost comments={comments} />
      ) : (
        <div className="max-sm:mt-4 max-sm:mb-4 max-sm:w-full">
          <p>Sem comentários</p>
        </div>
      )}
    </div>
  )
}
