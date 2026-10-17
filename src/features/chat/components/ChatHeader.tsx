import type { ChatDetail } from '../types/chat.types'

interface ChatHeaderProps {
  chat: ChatDetail
}

export default function ChatHeader({ chat }: ChatHeaderProps) {
  return (
    <header>
      <h1>{chat.card.title}</h1>
      <p>
        {chat.other.name} · {chat.hours} {chat.hours === 1 ? 'hora' : 'horas'}
      </p>
    </header>
  )
}