'use client'
import { ChangeEvent, useState } from 'react'

import { api } from '@/lib/axios'

import { Button } from './ui/button'
import { Input } from './ui/input'

interface AddCommentsProps {
  postId: string
  userId: string
}

export function AddComments({ postId, userId }: AddCommentsProps) {
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
    const data = { content: commentText, postId, userId }
    await api.post('/comment/create', data)
    window.location.href = '/'
  }

  return (
    <div className="flex items-center mt-4 max-md:hidden">
      <Input
        onChange={handleShowButtonComment}
        placeholder="Adicione um comentario...."
        className="border-none"
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
