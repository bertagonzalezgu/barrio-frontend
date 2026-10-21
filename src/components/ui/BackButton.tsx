import { Link } from 'react-router-dom'

interface BackButtonProps {
  to?: string
  onClick?: () => void
  label?: string
}

const STYLES =
  'self-start inline-flex min-h-12 items-center font-body text-sm lowercase text-ink-muted hover:text-ink transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-primary'

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