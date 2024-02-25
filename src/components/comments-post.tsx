interface CommentsPostProps {
  comments: {
    id: string
    userId: string
    content: string
    postId: string
    user: {
      name: string
      avatar_url: string
      id: string
    }
  }[]
}

export function CommentsPost({ comments }: CommentsPostProps) {
  if (comments.length <= 0) {
    return null
  }

  return (
    <footer className="w-full space-y-3 max-md:max-h-20 md:max-h-40 mt-4 md:h- overflow-y-scroll no-scrollbar">
      {comments.map((comment) => {
        return (
          <div key={comment.content} className="flex gap-1">
            <strong className="text-white font-medium">
              {comment.user.name}
            </strong>
            <p className="text-slate-200 ">{comment.content}</p>
          </div>
        )
      })}
    </footer>
  )
}
