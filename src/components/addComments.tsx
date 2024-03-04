'use client'
import { ChangeEvent, useState } from 'react'

import { api } from '@/lib/axios'

import { Button } from './ui/button'
import { Input } from './ui/input'

interface AddCommentsProps {
  postId: string
  showContainerInput: boolean
}

export function AddComments({ postId, showContainerInput }: AddCommentsProps) {
  const [showButtonComment, setShowButtonComment] = useState(false)
  const [commentText, setCommentText] = useState('')

  function handleShowButtonComment(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.value.length > 0) {
      setShowButtonComment(true)
      setCommentText(e.target.value)
    }
    if (e.target.value.length === 0) {
      setShowButtonComment(false)
    }
  }

  async function handleSubmitComment() {
    const data = { content: commentText, postId }
    await api.post('/comment/create', data)
    window.location.href = '/'
  }

  return (
    <div
      data-showcontainer={showContainerInput}
      className="flex items-center mt-4 data-[showcontainer=false]:max-md:hidden data-[showcontainer=true]:max-md:w-full"
    >
      <Input
        id="inputComment"
        onChange={handleShowButtonComment}
        placeholder="Adicione um comentario...."
        className="md:border-none max-md:border max-md:border-stone-100"
      />
      {showButtonComment ? (
        <Button
          onClick={handleSubmitComment}
          className="bg-transparent hover:bg-transparent text-sky-500"
        >
          Publicar
        </Button>
      ) : null}
    </div>
  )
}
