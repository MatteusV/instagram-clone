import {
  BookmarkSimple,
  ChatCircle,
  DotsThree,
  Heart,
  Share,
} from '@phosphor-icons/react'
import Image from 'next/image'

import profileImage from '@/assets/imageProfile.jpg'
import messiPost from '@/assets/messiPost.jpg'

export function Post() {
  return (
    <div className="max-md:w-full  border border-white max-md:p-2 text-white">
      <header className="w-full flex items-center justify-between">
        <div className="flex gap-2 items-center">
          <Image
            src={profileImage}
            alt=""
            className="h-10 w-10 rounded-full border-2 border-red-400"
          />
          <div>
            <p className="font-bold">matteus_varlesse</p>
            <p className="text-xs">
              Áudio <span className="text-stone-500">original</span>
            </p>
          </div>
        </div>
        <button>
          <DotsThree fill="#ffff" size={24} />
        </button>
      </header>

      <main className="w-full h-full mt-2">
        <Image src={messiPost} alt="" className="w-full " />
      </main>

      <div className="w-full mt-8 flex justify-between">
        <div className="flex gap-4">
          <button>
            <Heart fill="#ffff" size={28} />
          </button>
          <button>
            <ChatCircle fill="#ffff" size={28} />
          </button>
          <button>
            <Share fill="#ffff" size={28} />
          </button>
        </div>

        <button>
          <BookmarkSimple fill="#ffff" size={28} />
        </button>
      </div>

      <footer></footer>
    </div>
  )
}
