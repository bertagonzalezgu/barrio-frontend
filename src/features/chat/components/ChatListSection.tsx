import { useId } from 'react'
import type { ChatSummary } from '../types/chat.types'
import ChatListItem from './ChatListItem'

interface ChatListSectionProps {
  title: string
  chats: ChatSummary[]
}

export default function ChatListSection({ title, chats }: ChatListSectionProps) {
  const headingId = useId()

  return (
    <section aria-labelledby={headingId} className="flex flex-col gap-2">
      <h2 id={headingId} className="font-body text-xs font-medium uppercase tracking-widest text-ink-muted">
        {title}
      </h2>
      <ul className="flex flex-col gap-2">
        {chats.map((chat) => (
          <ChatListItem key={chat.id} chat={chat} />
        ))}
      </ul>
    </section>
  )
}