import Image from 'next/image'

interface GridPostsProps {
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

export function GridPosts({ posts }: GridPostsProps) {
  return (
    <div className="max-md:w-full grid grid-cols-3 gap-1 justify-items-center">
      {posts.map((post) => {
        return <ComponentPost key={post.id} post={post} />
      })}
    </div>
  )
}

function ComponentPost({ post }: ComponentPostsProps) {
  return (
    <button
      onClick={() => {
        window.location.href = `post/${post.id}`
      }}
      className="max-md:w-full lg:w-full 2xl:w-72"
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
