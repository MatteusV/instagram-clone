import Image from 'next/image'

import { FavoritesProps } from '@/pages/profile/[username].page'

interface GridFavoriteProps {
  favorites: FavoritesProps[]
}

interface ComponentFavoriteProps {
  post: {
    id: string
    content: string
    subtitle: string | null
    userId: string
    city: string | null
    state: string | null
  }
}

export function GridFavorite({ favorites }: GridFavoriteProps) {
  if (!favorites) {
    return (
      <h1 className="text-sky-500 mt-16 text-center">
        Você não favoritou nenhum post
      </h1>
    )
  }

  return (
    <div className="max-md:w-full grid grid-cols-3 gap-1 justify-items-center">
      {favorites.map((favorite) => {
        return (
          <ComponentFavoritePosts key={favorite.post.id} post={favorite.post} />
        )
      })}
    </div>
  )
}

function ComponentFavoritePosts({ post }: ComponentFavoriteProps) {
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
