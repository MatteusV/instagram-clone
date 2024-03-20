import { MagnifyingGlass } from '@phosphor-icons/react'
import { ChangeEvent, useEffect, useState } from 'react'

import { PostExplore } from '@/components/post-explore'
import { SearchProfileComponent } from '@/components/searchProfileComponent'
import { api } from '@/lib/axios'

interface Posts {
  id: string
  content: string
  subtitle: string | null
  userId: string
  reels: boolean
  city: string | null
  state: string | null
}

interface Users {
  id: string
  username: string
  name: string
  avatar_url: string | null
}

export default function Explore() {
  const [showButtonCancel, setShowButtonCancel] = useState(false)
  const [posts, setPosts] = useState<Posts[]>()
  const [users, setUsers] = useState<Users[]>()
  const [usersFilteds, setUsersFilteds] = useState<Users[] | null>()

  useEffect(() => {
    async function fetchPosts() {
      const { data } = await api.get('/fetch/all')
      setPosts(data.posts)
      setUsers(data.users)
    }
    if (!posts) {
      fetchPosts()
    }
  }, [posts])

  function handleChangeSearch(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.value.length > 0) {
      setShowButtonCancel(true)
    }

    if (e.target.value.length <= 0) {
      setShowButtonCancel(false)
      setUsersFilteds(null)
      return
    }

    const usersFilteds = users?.filter((user) =>
      user.username.includes(e.target.value),
    )

    if (usersFilteds !== undefined && usersFilteds.length > 0) {
      setUsersFilteds(usersFilteds)
    } else {
      setUsersFilteds(null)
    }
  }
  return (
    <div className="w-screen max-md:min-h-screen max-md:max-h-max bg-black text-white">
      <header className="max-md:w-full py-2 px-4 flex gap-2">
        <label
          htmlFor="search"
          className="w-full flex items-center gap-2 border rounded-md p-1"
        >
          <MagnifyingGlass size={14} />
          <input
            id="search"
            type="text"
            onChange={handleChangeSearch}
            placeholder="Pesquisar"
            className="bg-transparent outline-none active:border-none focus:border-none placeholder:text-sm"
          />
        </label>
        {showButtonCancel ? (
          <button
            onClick={() => {
              setUsersFilteds(null)
              setShowButtonCancel(false)
            }}
            className="font-bold text-sm leading-tight"
          >
            Cancelar
          </button>
        ) : null}
      </header>

      <main className="max-md:w-full max-md:h-full grid grid-cols-3 content-start max-md:mt-4 gap-2">
        {usersFilteds ? (
          <div className="max-md:w-screen border">
            {usersFilteds?.map((user) => (
              <SearchProfileComponent key={user.id} user={user} />
            ))}
          </div>
        ) : (
          <>{posts?.map((post) => <PostExplore post={post} key={post.id} />)}</>
        )}
      </main>
    </div>
  )
}
