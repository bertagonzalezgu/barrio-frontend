import type { ChatDetail } from '../types/chat.types'
import CardTypeChip from './CardTypeChip'
import { Link } from 'react-router-dom'
interface ChatHeaderProps {
  chat: ChatDetail
}

export default function ChatHeader({ chat }: ChatHeaderProps) {

  return (
    <header className="flex flex-col gap-2">
      <CardTypeChip type={chat.card.type} />
      <h1 className="font-display font-bold text-ink text-h4 leading-snug">{chat.card.title}</h1>
      <p className="font-body text-sm text-ink-muted">
        <Link
          to={`/perfil/${chat.other.id}`}
          className="underline underline-offset-2 hover:text-ink focus-visible:outline-2 focus-visible:outline-primary"
        >
          {chat.other.name}
        </Link>{' '}
        ·{' '}
        <span className="font-display tabular-nums">
          {chat.hours} {chat.hours === 1 ? 'hora' : 'horas'}
        </span>
      </p>
    </header>
  )
}