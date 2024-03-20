import Image from 'next/image'

import profileNotImage from '@/assets/profileNotImage.jpg'

interface SearchProfileComponentProps {
  user: {
    id: string
    username: string
    name: string
    avatar_url: string | null
  }
}

export function SearchProfileComponent({ user }: SearchProfileComponentProps) {
  return (
    <button
      onClick={() => {
        window.location.href = `/`
      }}
      key={user.id}
      className="bg-zinc-900  flex items-center gap-2 px-4 py-1"
    >
      {user.avatar_url ? (
        <Image
          src={user.avatar_url}
          width={100}
          height={100}
          className="size-10 rounded-full"
          alt=""
        />
      ) : (
        <Image src={profileNotImage} alt="" className="size-10 rounded-full" />
      )}

      <div>
        <p className="font-bold lowercase">{user.username}</p>
        <p className="text-xs text-zinc-400">{user.name}</p>
      </div>
    </button>
  )
}
