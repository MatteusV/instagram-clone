interface FavoriteProps {
  active: boolean
}
export function Favorite({ active }: FavoriteProps) {
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
