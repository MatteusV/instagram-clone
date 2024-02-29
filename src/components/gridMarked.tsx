import Image from 'next/image'

interface GridMarkedProps {
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

interface ComponentMarkedProps {
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

export function GridMarked({ posts }: GridMarkedProps) {
  return (
    <div className="max-md:w-full grid grid-cols-3 gap-1 justify-items-center">
      {posts.map((post) => {
        return <ComponentMarked key={post.id} post={post} />
      })}
    </div>
  )
}

function ComponentMarked({ post }: ComponentMarkedProps) {
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
