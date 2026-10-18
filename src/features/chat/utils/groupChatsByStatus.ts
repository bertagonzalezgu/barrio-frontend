import type { ChatSummary } from '../types/chat.types'
import { OPEN_STATUSES } from './constants'

export function groupChatsByStatus(chats: ChatSummary[]) {
  return {
    open: chats.filter((chat) => OPEN_STATUSES.includes(chat.status)),
    closed: chats.filter((chat) => !OPEN_STATUSES.includes(chat.status)),
  }
}