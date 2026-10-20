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
      <h1 className="font-display font-bold text-ink text-xl leading-snug">{chat.card.title}</h1>
      <p className="font-body text-sm text-ink/70">
        <Link
          to={`/perfil/${chat.other.id}`}
          className="underline underline-offset-2 hover:text-ink focus-visible:outline-2 focus-visible:outline-teal"
        >
          {chat.other.name}
        </Link>{' '}
        ·{' '}
        <span className="font-data">
          {chat.hours} {chat.hours === 1 ? 'hora' : 'horas'}
        </span>
      </p>
    </header>
  )
}