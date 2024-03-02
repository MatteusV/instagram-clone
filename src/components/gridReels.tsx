import Image from 'next/image'

interface ReelsProps {
  reels?: {
    id: string
    content: string
    subtitle: string | null
    userId: string
    city: string | null
    state: string | null
    comment: {
      id: string
      content: string
      userId: string
      postId: string
    }[]
  }[]
}

interface ComponentReelsProps {
  reel: {
    id: string
    content: string
    subtitle: string | null
    userId: string
    city: string | null
    state: string | null
    comment: {
      id: string
      content: string
      userId: string
      postId: string
    }[]
  }
}

export function GridReels({ reels }: ReelsProps) {
  if (!reels) {
    return <h1 className="text-sky-500">Você não temm nenhum REELS</h1>
  }

  return (
    <div className="max-md:w-full grid grid-cols-3 gap-1 justify-items-center">
      {reels.map((reel) => {
        return <ComponentPosts key={reel.id} reel={reel} />
      })}
    </div>
  )
}

function ComponentPosts({ reel }: ComponentReelsProps) {
  return (
    <button
      onClick={() => {
        window.location.href = `post/${reel.id}`
      }}
      className="w-full"
    >
      <Image
        src={reel.content}
        width={400}
        height={400}
        className="size-full"
        alt=""
      />
    </button>
  )
}
