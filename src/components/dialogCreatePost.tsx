'use client'
import { MapPin, PlusCircle } from '@phosphor-icons/react'
import { randomBytes } from 'crypto'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import Image from 'next/image'
import { ChangeEvent, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import imageProfile from '@/assets/imageProfile.jpg'
import { api } from '@/lib/axios'
import { storage } from '@/lib/firebase'

import { Button } from './ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from './ui/dialog'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'

const formCreatePostSchema = z.object({
  subtitle: z.string().max(300),
  location: z
    .string()
    .transform((value) => value.toLowerCase())
    .nullable(),
})

type FormCreatePostSchema = z.infer<typeof formCreatePostSchema>

export function DialogCreatePost() {
  const [imageBLob, setImageBlob] = useState('')
  const [image, setImage] = useState<File>()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormCreatePostSchema>()

  function handleSetImageBlob(e: ChangeEvent<HTMLInputElement>) {
    if (e.target!.files![0] !== null) {
      setImageBlob(URL.createObjectURL(e.target!.files![0]))
      setImage(e.target!.files![0])
    }
  }

  function handleCreatePost(formData: FormCreatePostSchema) {
    if (image) {
      const ext = image.name.split('.')[1]
      const newImageName = randomBytes(64).toString('hex')
      const imageName = `${newImageName}.${ext}`
      const storageRef = ref(storage, `content-post/${imageName}`)
      const uploadTask = uploadBytesResumable(storageRef, image)

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          console.log(`Upload is ${progress}% done`)

          if (snapshot.state === 'paused' || snapshot.state === 'error') {
            alert(`Upload is ${snapshot.state}`)
          }
        },
        (error) => {
          if (error) {
            alert(error)
          }
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            const data = { formData, imageUrl: downloadURL }
            await api.post('/post/create', data)
            location.reload()
          })
        },
      )
    }
  }

  function removeImage() {
    setImageBlob('')
  }

  return (
    <Dialog>
      <DialogTrigger
        onClick={removeImage}
        className="flex gap-4 items-center justify-center"
      >
        <PlusCircle fill="#ffff" className="size-6" />
        <strong>Criar</strong>
      </DialogTrigger>
      <DialogContent className="bg-zinc-800 text-white border-none min-w-[720px]">
        <DialogHeader className="mb-4">
          <h1 className="font-bold text-center">Criar nova publicação</h1>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(handleCreatePost)}
          id="createPost"
          name="createPost"
          className="flex gap-4"
        >
          {imageBLob ? (
            <>
              <Image
                src={imageBLob}
                width={400}
                height={400}
                alt=""
                className="flex-1 rounded-sm"
              />

              {imageBLob ? (
                <div className="flex flex-col gap-8 min-w-72 h-full pb-4">
                  <header className="flex items-center gap-2">
                    <Image
                      src={imageProfile}
                      alt="foto de perfil"
                      width={25}
                      height={25}
                      className="rounded-full"
                    />
                    <p className="text-xs font-bold">matteus_varlesse</p>
                  </header>
                  <div className="space-y-4">
                    <Textarea
                      {...register('subtitle')}
                      form="createPost"
                      placeholder="Escreva uma legenda..."
                      className="border-black mt-4 focus-visible:ring-0"
                    />
                    <div className="flex justify-between items-center w-full">
                      <label
                        htmlFor="location"
                        className="flex w-full items-center justify-between border border-black px-2 py-1 text-sm rounded-md"
                      >
                        <Input
                          id="location"
                          placeholder="Sâo José dos Campos - SP"
                          className="border-none focus-visible:ring-0 "
                          form="createPost"
                          {...register('location')}
                        />
                        <MapPin fill="#ffff" />
                      </label>
                    </div>
                  </div>

                  <Button
                    form="createPost"
                    type="submit"
                    className="bg-sky-500 hover:bg-sky-600 disabled:bg-transparent mt-auto"
                    disabled={isSubmitting}
                  >
                    Compartilhar
                  </Button>
                </div>
              ) : null}
            </>
          ) : (
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-64 border-2  border-dashed rounded-lg cursor-pointer hover:bg-bray-800 bg-gray-700  border-gray-600 hover:border-gray-500 hover:bg-gray-600"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">
                      Clique ou arraste a imagem
                    </span>
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    PNG, JPG
                  </p>
                </div>
                <Input
                  id="dropzone-file"
                  onChange={handleSetImageBlob}
                  type="file"
                  className="hidden"
                />
              </label>
            </div>
          )}
        </form>
      </DialogContent>
    </Dialog>
  )
}
