import Image from 'next/image'
import Link from 'next/link'

import imageProfile from '@/assets/imageProfile.jpg'

import { Carousel, CarouselContent, CarouselItem } from './ui/carousel'

const users = [
  {
    id: '1',
    name: 'Usuário 1',
    image: imageProfile,
    story: false,
  },
  {
    id: '2',
    name: 'Usuário 2',
    image: imageProfile,
    story: true,
  },
  {
    id: '3',
    name: 'Usuário 3',
    image: imageProfile,
    story: true,
  },
  {
    id: '4',
    name: 'Usuário 4',
    image: imageProfile,
    story: true,
  },
  {
    id: '5',
    name: 'Usuário 5',
    image: imageProfile,
    story: true,
  },
  {
    id: '6',
    name: 'Usuário 6',
    image: imageProfile,
    story: true,
  },
  {
    id: '7',
    name: 'Usuário 7',
    image: imageProfile,
    story: true,
  },
  {
    id: '8',
    name: 'Usuário 8',
    image: imageProfile,
    story: true,
  },
  {
    id: '9',
    name: 'Usuário 9',
    image: imageProfile,
    story: true,
  },
  {
    id: '10',
    name: 'Usuário 10',
    image: imageProfile,
    story: true,
  },
  {
    id: '11',
    name: 'Usuário 11',
    image: imageProfile,
    story: true,
  },
  {
    id: '12',
    name: 'Usuário 12',
    image: imageProfile,
    story: true,
  },
  {
    id: '13',
    name: 'Usuário 13',
    image: imageProfile,
    story: true,
  },
  {
    id: '14',
    name: 'Usuário 14',
    image: imageProfile,
    story: true,
  },
  {
    id: '15',
    name: 'Usuário 15',
    image: imageProfile,
    story: true,
  },
  {
    id: '16',
    name: 'Usuário 16',
    image: imageProfile,
    story: true,
  },
  {
    id: '17',
    name: 'Usuário 17',
    image: imageProfile,
    story: true,
  },
  {
    id: '18',
    name: 'Usuário 18',
    image: imageProfile,
    story: true,
  },
  {
    id: '19',
    name: 'Usuário 19',
    image: imageProfile,
    story: true,
  },
  {
    id: '20',
    name: 'Usuário 20',
    image: imageProfile,
    story: true,
  },
]

export function CarouselStory() {
  return (
    <Carousel className="text-white max-md:h-24 max-md:bg-stone-900/60 md:w-[80%] max-md:p-2 max-sm:pl-3">
      <CarouselContent className="flex items-center  w-max">
        {users.map((user) => (
          <CarouselItem
            key={user.id}
            className="basis-1/7 mx-4  flex flex-col justify-center items-center gap-1"
          >
            <Link href="/">
              <Image
                priority
                data-story={user.story}
                src={user.image}
                alt=""
                width={500}
                height={500}
                className="h-16 w-16 rounded-full border-2 data-[story=false]:border-none data-[story=true]:border-red-400"
              />
            </Link>

            <p className="text-xs ">{user.name}</p>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}
