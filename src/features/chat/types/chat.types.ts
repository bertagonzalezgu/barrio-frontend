import type { ExchangeStatus } from '../../exchanges/types/exchange.types'

export type ChatAction = 'accept' | 'reject' | 'cancel' | 'confirm'

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

export interface ChatDetail {
  id: string
  status: ExchangeStatus
  hours: number
  card: ChatCard
  other: ChatParticipant
  myConfirmed: boolean
  otherConfirmed: boolean
  actions: ChatAction[]
}

export interface ChatMessage {
  id: string
  text: string
  sentAt: string
  mine: boolean
}

export type ConfirmViewState = 'can-confirm' | 'waiting-other' | 'confirmed' | 'hidden'