import type { ExchangeStatus } from '../../exchanges/types/exchange.types'

export type ChatAction = 'accept' | 'reject' | 'cancel' | 'confirm' | 'rate'

export interface ChatCard {
  id: string
  title: string
  type: 'offer' | 'request'
}

export interface ChatParticipant {
  id: string
  name: string
  avatar: string
}

export interface ChatRating {
  score: number
  comment: string | null
}
export interface ChatDetail {
  id: string
  status: ExchangeStatus
  hours: number
  card: ChatCard
  other: ChatParticipant
  myConfirmed: boolean
  otherConfirmed: boolean
  actions: ChatAction[]
  myRating: ChatRating | null
}

export interface ChatMessage {
  id: string
  text: string
  sentAt: string
  mine: boolean
}
export interface ChatSummary {
  id: string
  status: ExchangeStatus
  hours: number
  proposedAt: string
  card: ChatCard
  other: ChatParticipant
  lastMessage: Omit<ChatMessage, 'id'> | null
  lastActivityAt: string
}

export type ConfirmViewState = 'can-confirm' | 'waiting-other' | 'confirmed' | 'hidden'

export type TransitionAction = Exclude<ChatAction, 'confirm' | 'rate'>