import type { ChatSummary } from '../types/chat.types'
import { getExchangeStatusLabel } from '../utils/getExchangeStatusLabel'

interface ChatListItemProps {
  chat: ChatSummary
}

export default function ChatListItem({ chat }: ChatListItemProps) {
  return (
    <li>
      <p>{chat.other.name}</p>
      <p>{chat.card.title}</p>
      <p>{chat.hours}h</p>
      <p>{getExchangeStatusLabel(chat.status)}</p>
    </li>
  )
}