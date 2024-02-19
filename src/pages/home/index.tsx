import { Heart, PlusCircle } from '@phosphor-icons/react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu'
import Link from 'next/link'

import profileImage from '@/assets/imageProfile.jpg'
import messiPost from '@/assets/messiPost.jpg'
import { Aside } from '@/components/aside'
import { CarouselStory } from '@/components/carouselStory'
import { Post } from '@/components/post'

import { satisfy } from '../login/index.page'

export default function Home() {
  const dataPost = [
    {
      imageProfile: profileImage,
      id: 'asjfoajhfaijfqwijf qfjq-w9f q',
      text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. A atque tempora, nemo minima quae quis ea veniam hic dolorum est autem excepturi similique? Consectetur repellendus ea mollitia totam autem eveniet!',
      username: 'Matteus_varlesse',
      content: messiPost,
      subtitle:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. A atque tempora, nemo minima quae quis ea veniam hic dolorum est autem excepturi similique? Consectetur repellendus ea mollitia totam autem eveniet!',
      comments: [
        {
          id: '1',
          username: 'Matteus Varlesse',
          content: 'spfijasofpiajhfoi qnifasjhfpiqwj0fjqwpfjqp fjqwpif',
        },
        {
          id: '1',
          username: 'Matteus Varlesse',
          content: 'spfijasofpiajhfoi qnifasjhfpiqwj0fjqwpfjqp fjqwpif',
        },
      ],
    },
    {
      imageProfile: profileImage,
      id: 'gfsouahogahojfahsf qfjq-w9f q',
      text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. A atque tempora, nemo minima quae quis ea veniam hic dolorum est autem excepturi similique? Consectetur repellendus ea mollitia totam autem eveniet!',
      username: 'Matteus_varlesse',
      content: messiPost,
      subtitle:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. A atque tempora, nemo minima quae quis ea veniam hic dolorum est autem excepturi similique? Consectetur repellendus ea mollitia totam autem eveniet!',
      comments: [
        {
          id: '1',
          username: 'Matteus Varlesse',
          content: 'spfijasofpiajhfoi qnifasjhfpiqwj0fjqwpfjqp fjqwpif',
        },
      ],
    },
    {
      imageProfile: profileImage,
      id: 'asjfoajhfaijfqwijf qfjq-w9f q',
      text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. A atque tempora, nemo minima quae quis ea veniam hic dolorum est autem excepturi similique? Consectetur repellendus ea mollitia totam autem eveniet!',
      username: 'Matteus_varlesse',
      content: messiPost,
      subtitle:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. A atque tempora, nemo minima quae quis ea veniam hic dolorum est autem excepturi similique? Consectetur repellendus ea mollitia totam autem eveniet!',
      comments: [
        {
          id: '1',
          username: 'Matteus Varlesse',
          content: 'spfijasofpiajhfoi qnifasjhfpiqwj0fjqwpfjqp fjqwpif',
        },
        {
          id: '2',
          username: 'Guilherme Varlesse',
          content: 'spfijasofpiajhfoi qnifasjhfpiqwj0fjqwpfjqp fjqwpif',
        },
      ],
    },
    {
      imageProfile: profileImage,
      id: 'asjfoajhfaijfqwijf qfjq-w9f q',
      text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. A atque tempora, nemo minima quae quis ea veniam hic dolorum est autem excepturi similique? Consectetur repellendus ea mollitia totam autem eveniet!',
      username: 'Matteus_varlesse',
      content: messiPost,
      subtitle:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. A atque tempora, nemo minima quae quis ea veniam hic dolorum est autem excepturi similique? Consectetur repellendus ea mollitia totam autem eveniet!',
      comments: [
        {
          id: '1',
          username: 'Matteus Varlesse',
          content: 'spfijasofpiajhfoi qnifasjhfpiqwj0fjqwpfjqp fjqwpif',
        },
        {
          id: '2',
          username: 'Guilherme Varlesse',
          content: 'spfijasofpiajhfoi qnifasjhfpiqwj0fjqwpfjqp fjqwpif',
        },
      ],
    },
  ]

  return (
    <div className="flex max-md:flex-col-reverse max-md:justify-between bg-black">
      <Aside />
      <main className="md:px-80 h-screen overflow-y-scroll">
        <div className="flex justify-between items-center text-white py-1 px-4 md:mt-8">
          <h1 className={`${satisfy.className} font-bold text-2xl md:hidden`}>
            Instagram
          </h1>

          <div className="flex gap-4 md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <PlusCircle fill="#ffff" className="h-7 w-7" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-zinc-900 z-10 w-32 p-2 rounded-md">
                <DropdownMenuItem className="text-white text-lg font-medium">
                  <Link href="/create/style">Publicação</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-white text-lg font-medium">
                  <Link href="/">Story</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Heart fill="#ffff" className="h-7 w-7" />
          </div>
        </div>

        <div className="space-y-14 md:flex md:flex-col md:items-center">
          <CarouselStory />
          {dataPost.map((post) => {
            return <Post key={post.id} dataPost={post} />
          })}
        </div>
      </main>
    </div>
  )
}
