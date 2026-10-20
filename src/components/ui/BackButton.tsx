import { Link } from 'react-router-dom'

interface BackButtonProps {
  to?: string
  onClick?: () => void
  label?: string
}

const STYLES =
  'self-start font-data text-xs lowercase text-ink/60 hover:text-ink transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-teal'

export default function BackButton({ to, onClick, label = 'Volver' }: BackButtonProps) {
  const content = (
    <>
      <span aria-hidden="true">← </span>
      {label}
    </>
  )

  if (to) {
    return (
      <Link to={to} className={STYLES}>
        {content}
      </Link>
    )
  }

  return (
    <button type="button" onClick={onClick} className={STYLES}>
      {content}
    </button>
  )
}