import { ArrowLeft } from '@phosphor-icons/react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import profileNotImage from '@/assets/profileNotImage.jpg'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { api } from '@/lib/axios'

interface UserProps {
  id: string
  username: string
  name: string
  bio: string | null
  email: string | null
  avatar_url: string | null
  created_at: Date
}
const formSchema = z.object({
  bio: z.string().max(150).nullable(),
  site: z.string().nullable(),
  gender: z.enum(['masculine', 'feminine']),
})

type FormSchema = z.infer<typeof formSchema>
export default function Edit() {
  const [user, setUser] = useState<UserProps>()
  const [isMobile, setIsMobile] = useState(false)

  const { register, handleSubmit } = useForm<FormSchema>()

  useEffect(() => {
    async function getUser() {
      const response = await api.get('/user/find')
      setUser(response.data)
    }
    if (typeof window !== 'undefined') {
      const displayWidth = window.innerWidth

      if (displayWidth <= 600) {
        setIsMobile(true)
      }
    }
    if (!user || typeof user === 'string') {
      getUser()
    }
  }, [user])

  async function handleEditProfile(formData: FormSchema) {
    const { bio, gender, site } = formData
    if (site === '') {
      const data = { bio, gender, site: null }
      const { status } = await api.put('/user/edit-profile', data)
      if (status !== 200) {
        alert('Falha ao atualizar o perfil')
        window.location.reload()
      }
      if (typeof user !== 'string') {
        window.location.href = `/profile/${user?.username}`
      }
    }

    const data = { bio, gender, site }
    await api.put('/user/edit-profile', data)
  }

  if (user !== null && user !== undefined) {
    return (
      <div className="w-screen h-screen bg-black text-white">
        <header className="md:hidden flex justify-between items-center p-4 border-b border-stone-700">
          <button
            onClick={() => {
              window.location.href = `/profile/${user.username}`
            }}
          >
            <ArrowLeft size={24} />
          </button>
          <p className="font-bold">Editar perfil</p>
          <div />
        </header>

        <main className="p-4">
          <div className="bg-zinc-900 rounded-3xl flex items-center gap-4 p-4">
            {user.avatar_url ? (
              <Image src={user.avatar_url} width={400} height={400} alt="" />
            ) : (
              <Image
                src={profileNotImage}
                alt=""
                width={400}
                height={400}
                className="rounded-full size-16"
              />
            )}

            <div>
              <p className="font-bold">{user.username}</p>
              <p className="font-semibold text-sky-500 text-sm">Alterar foto</p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit(handleEditProfile)}
            className="mt-8 space-y-8"
          >
            <div>
              <h3>Site</h3>
              <Input
                {...register('site')}
                disabled={!isMobile}
                type="url"
                className="bg-zinc-900 border-none mt-2"
                placeholder="Site"
              />
              {isMobile ? null : (
                <p className="text-xs text-stone-400 mt-4 pl-1">
                  Somente é possível editar os links no celular. Acesse o app do
                  Instagram e edite seu perfil para alterar os sites na sua bio.
                </p>
              )}
            </div>

            <div>
              <h3>Bio</h3>
              {user.bio ? (
                <Textarea {...register('bio')} defaultValue={user.bio} />
              ) : (
                <Textarea {...register('bio')} />
              )}
            </div>

            <div>
              <h3>Gênero</h3>
              <select
                {...register('gender')}
                className="w-full text-start pl-8 mt-4 bg-black border border-stone-700 rounded-lg py-2"
                id=""
              >
                <option selected value="masculine">
                  Masculino
                </option>
                <option value="feminine">Femenino</option>
              </select>
            </div>

            <Button className="w-full bg-sky-500 font-bold hover:bg-sky-600">
              Enviar
            </Button>
          </form>
        </main>
      </div>
    )
  }
}
