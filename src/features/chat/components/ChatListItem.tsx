import { Link } from 'react-router-dom'
import type { ChatSummary } from '../types/chat.types'
import { getExchangeStatusLabel } from '../utils/getExchangeStatusLabel'
import { formatChatTime } from '../utils/formatChatTime'
import ChatAvatar from './ChatAvatar'
import CardTypeChip from './CardTypeChip'

interface ChatListItemProps {
  chat: ChatSummary
}

export default function ChatListItem({ chat }: ChatListItemProps) {
  const { lastMessage } = chat
  const previewDate = lastMessage?.sentAt ?? chat.proposedAt

  return (
    <li>
      <Link
        to={`/chat/${chat.id}`}
        className="flex min-h-11 items-start gap-3 rounded-2xl border border-teal-soft bg-white px-3 py-3 hover:bg-teal-soft/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal"
      >
        <ChatAvatar name={chat.other.name} avatar={chat.other.avatar} />
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <div className="flex items-baseline justify-between gap-2">
            <p className="truncate font-body text-sm font-medium text-ink">{chat.other.name}</p>
            <time dateTime={previewDate} className="shrink-0 font-data text-xs text-ink/70">
              {formatChatTime(previewDate)}
            </time>
          </div>
          <div className="flex min-w-0 items-center gap-2">
            <CardTypeChip type={chat.card.type} />
            <p className="truncate font-body text-sm text-ink">{chat.card.title}</p>
          </div>
          {lastMessage && <p className="truncate font-body text-sm text-ink/70">{lastMessage.text}</p>}
          <div className="flex items-center gap-2 font-body text-xs text-ink/70">
            <span className="font-data">{chat.hours}h</span>
            <span aria-hidden="true">·</span>
            <span className="font-medium text-teal">{getExchangeStatusLabel(chat.status)}</span>
          </div>
        </div>
      </Link>
    </li>
  )
}