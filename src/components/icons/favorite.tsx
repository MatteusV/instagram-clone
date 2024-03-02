interface FavoriteProps {
  active: boolean
  favoritePost?: boolean
}
export function Favorite({ active, favoritePost }: FavoriteProps) {
  if (favoritePost) {
    return (
      <svg
        aria-label="Remover"
        className="x1lliihq x1n2onr6 x5n08af"
        fill="currentColor"
        height="24"
        role="img"
        viewBox="0 0 24 24"
        width="24"
      >
        <title>Remover</title>
        <path d="M20 22a.999.999 0 0 1-.687-.273L12 14.815l-7.313 6.912A1 1 0 0 1 3 21V3a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1Z"></path>
      </svg>
    )
  }
  if (active) {
    return (
      <svg
        aria-label="Salvos"
        className="text-sky-500"
        fill="currentColor"
        height="24"
        role="img"
        viewBox="0 0 24 24"
        width="24"
      >
        <title>Salvos</title>
        <polygon
          fill="none"
          points="20 21 12 13.44 4 21 4 3 20 3 20 21"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        ></polygon>
      </svg>
    )
  } else {
    return (
      <svg
        aria-label="Salvos"
        className="x1lliihq x1n2onr6 x173jzuc"
        fill="currentColor"
        height="24"
        role="img"
        viewBox="0 0 24 24"
        width="24"
      >
        <title>Salvos</title>
        <polygon
          fill="none"
          points="20 21 12 13.44 4 21 4 3 20 3 20 21"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        ></polygon>
      </svg>
    )
  }
}
