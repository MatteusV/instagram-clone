'use client'
import {
  BookmarkSimple,
  ChatCircle,
  DotsThree,
  Heart,
  Share,
} from '@phosphor-icons/react'
import Image, { StaticImageData } from 'next/image'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

import { CommentsPost } from './comments-post'

interface PostProps {
  dataPost: {
    id: string
    username: string
    imageProfile: StaticImageData
    content: StaticImageData
    subtitle: string
    comments: {
      id: string
      username: string
      content: string
    }[]
  }
}

export function Post({ dataPost }: PostProps) {
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
    <div className="max-md:w-full  max-md:p-2 text-white">
      <div className="w-full flex items-center justify-between">
        <div className="flex gap-2 items-center">
          <Image
            src={dataPost.imageProfile}
            alt=""
            className="h-10 w-10 rounded-full border-2 border-red-400"
          />
          <div>
            <p className="font-bold">{dataPost.username}</p>
            <p className="text-xs">
              Áudio <span className="text-stone-500">original</span>
            </p>
          </div>
        </div>
        <button>
          <DotsThree fill="#ffff" size={24} />
        </button>
      </div>

      <main className="w-full  mt-2">
        <Image src={dataPost.content} alt="" className="max-sm:w-full" />
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
          {subtitle.length >= 100 ? (
            ''
          ) : (
            <span onClick={handleShowMoreSubtitle}>...</span>
          )}
        </p>
      </div>

      <CommentsPost comments={comments} />
    </div>
  )
}
