import { Link } from 'react-router-dom'
import type { ChatSummary } from '../types/chat.types'
import { getExchangeStatusLabel } from '../utils/getExchangeStatusLabel'
import { formatChatTime } from '../utils/formatChatTime'

interface ChatListItemProps {
  chat: ChatSummary
}

export default function ChatListItem({ chat }: ChatListItemProps) {
  const { lastMessage } = chat
  const previewDate = lastMessage?.sentAt ?? chat.proposedAt

  return (
    <li>
      <Link to={`/chat/${chat.id}`}>
        <p>{chat.other.name}</p>
        <p>{chat.card.title}</p>
        <p>{chat.hours}h</p>
        <p>{getExchangeStatusLabel(chat.status)}</p>
        {lastMessage && <p>{lastMessage.text}</p>}
        <time dateTime={previewDate}>{formatChatTime(previewDate)}</time>
      </Link>
    </li>
  )
}