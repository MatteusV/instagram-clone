interface CommentsPostProps {
  comments: {
    username: string
    content: string
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
          <div key={comment.username}>
            <strong className="text-white font-medium">
              {comment.username}:
            </strong>
            <p className="text-slate-200 ">{comment.content}</p>
          </div>
        )
      })}
    </footer>
  )
}
