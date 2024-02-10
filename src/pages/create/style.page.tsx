'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { X } from '@phosphor-icons/react'
import Image from 'next/image'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { api } from '@/lib/axios'

const formPostSchema = z.object({
  subtitle: z.string().max(200),
  location: z.string().transform((value) => value.toLowerCase()),
})

type FormPostSchema = z.infer<typeof formPostSchema>

export default function Style() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormPostSchema>({
    resolver: zodResolver(formPostSchema),
  })
  const [image, setImage] = useState('')

  const handleImageChange = (e: any) => {
    setImage(URL.createObjectURL(e.target.files[0]))
  }

  async function handleSubmitPost(formData: FormPostSchema) {
    const data = { formData, image }
    const res = await api.post('/post/create', data)

    if (res.status === 201) {
      alert('Post cadastrado')
      window.location.href = '/'
    }
  }

  return (
    <div className="bg-black text-white w-screen h-screen">
      <header className="flex justify-between items-center p-2 font-bold">
        <Link href={'/'}>
          <X fill="#ffff" size={32} />
        </Link>
        <h1>Nova publicação de foto</h1>
        <Button
          type="submit"
          form="post"
          className="text-blue-500 bg-transparent hover:bg-transparent border-none disabled:text-gray-500"
          disabled={isSubmitting}
        >
          Avançar
        </Button>
      </header>

      <form
        onSubmit={handleSubmit(handleSubmitPost)}
        encType="multipart/form-data"
        id="post"
        name="post"
        action=""
        className="flex flex-col justify-center  h-full -mt-24  px-4 space-y-8"
      >
        {image ? (
          ''
        ) : (
          <h1 className="text-center mt-8 text-xl font-bold">
            Formulario da publicação
          </h1>
        )}

        <div className="space-y-1">
          <div className="">
            {image ? (
              <Image
                src={image}
                alt=""
                width={0}
                height={0}
                className="w-max h-max m-auto mb-8 max-md:w-[calc(100%-10%)] "
              />
            ) : (
              ''
            )}
          </div>

          <label htmlFor="image" className="text-lg">
            Escolha uma imagem ou video para upload
          </label>

          <Input
            type="file"
            id="image"
            accept=".jpg,.jpeg,.png,.mp4"
            onChange={handleImageChange}
            required
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="subtitle" className="text-lg">
            legenda da publicação{' '}
            <span className="text-xs text-zinc-400">max:200</span>
          </label>
          <Textarea
            id="subtitle"
            maxLength={200}
            {...register('subtitle')}
            required
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="location" className="text-lg">
            Adicionar localização
          </label>
          <Input
            type="text"
            id="location"
            list="locations"
            autoComplete="off"
            placeholder="São josé dos campos - SP"
            {...register('location')}
            required
          />

          <datalist id="locations">
            {/* {locations.map((location: locationProps) => {
              return (
                <option
                  key={location.city}
                  value={`${location.city}-${location.state}`}
                >{`${location.city}-${location.state}`}</option>
              )
            })} */}
            <option value="oi">oi</option>
          </datalist>
        </div>
      </form>
    </div>
  )
}
