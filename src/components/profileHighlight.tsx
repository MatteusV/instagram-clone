import { Plus } from '@phosphor-icons/react'
import Image from 'next/image'

interface ProfileHighlightProps {
  newHighlight: boolean
  data?: {
    content: string
    title: string
  }
}

export function ProfileHighlight({
  newHighlight,
  data,
}: ProfileHighlightProps) {
  if (newHighlight) {
    return (
      <div className="flex flex-col justify-center items-center gap-1">
        <div className="size-14 lg:size-20 border border-stone-600 rounded-full bg-stone-900 flex justify-center items-center">
          <Plus className="size-8 text-stone-00" />
        </div>
        <p className="text-xs">Novo</p>
      </div>
    )
  }
  if (data) {
    return (
      <div className="flex flex-col justify-center items-center gap-1">
        <div className="size-14 lg:size-20 border border-stone-600 rounded-full bg-stone-900 flex justify-center items-center">
          <Image
            src={data.content}
            width={100}
            height={100}
            className="size-full rounded-full border border-black"
            alt=""
          />
        </div>
        <p className="text-xs">{data.title}</p>
      </div>
    )
  }
}
