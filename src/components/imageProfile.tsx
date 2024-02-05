import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import Image from 'next/image'

interface ImageProfileProps {
  image: StaticImport
}

export function ImageProfile({ image }: ImageProfileProps) {
  return (
    <Image
      src={image}
      alt=""
      className="h-16 w-16 rounded-full border-2 border-red-400"
    />
  )
}
