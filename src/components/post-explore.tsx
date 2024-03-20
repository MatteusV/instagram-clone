import Image from 'next/image'

import { Reels } from './icons/reels'

interface PostExploreProps {
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
export function PostExplore({ post }: PostExploreProps) {
  return (
    <button
      onClick={() => {
        window.location.href = `/post/${post.id}`
      }}
      className="w-32 h-36 "
    >
      {post.reels ? (
        <div className="absolute ml-[105px]">
          <Reels />
        </div>
      ) : null}
      <Image
        src={post.content}
        width={100}
        height={100}
        alt=""
        className="w-full h-full z-0"
      />
    </button>
  )
}
