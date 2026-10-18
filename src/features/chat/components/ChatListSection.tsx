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
    <section aria-labelledby={headingId}>
      <h2 id={headingId}>{title}</h2>
      <ul>
        {chats.map((chat) => (
          <ChatListItem key={chat.id} chat={chat} />
        ))}
      </ul>
    </section>
  )
}