import type { ChatDetail } from '../types/chat.types'
import CardTypeChip from './CardTypeChip'
interface ChatHeaderProps {
  chat: ChatDetail
}

export default function ChatHeader({ chat }: ChatHeaderProps) {

  return (
    <header className="flex flex-col gap-2">
      <CardTypeChip type={chat.card.type} />
      <h1 className="font-display font-bold text-ink text-xl leading-snug">{chat.card.title}</h1>
      <p className="font-body text-sm text-ink/70">
        {chat.other.name} ·{' '}
        <span className="font-data">
          {chat.hours} {chat.hours === 1 ? 'hora' : 'horas'}
        </span>
      </p>
    </header>
  )
}