import Image from 'next/image'

interface GridFavoriteProps {
  posts: {
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

interface ComponentPostsProps {
  post: {
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

export function GridFavorite({ posts }: GridFavoriteProps) {
  return (
    <div className="max-md:w-full grid grid-cols-3 gap-1 justify-items-center">
      {posts.map((reel) => {
        return <ComponentPosts key={reel.id} post={reel} />
      })}
    </div>
  )
}

function ComponentPosts({ post }: ComponentPostsProps) {
  return (
    <button
      onClick={() => {
        window.location.href = `post/${post.id}`
      }}
      className="w-full"
    >
      <Image
        src={post.content}
        width={400}
        height={400}
        className="size-full"
        alt=""
      />
    </button>
  )
}
