import type { ChatDetail, ConfirmViewState } from '../types/chat.types'

export function getConfirmViewState(chat: ChatDetail): ConfirmViewState {
  if (chat.myConfirmed && chat.otherConfirmed) return 'confirmed'
  if (chat.myConfirmed) return 'waiting-other'
  if (chat.actions.includes('confirm')) return 'can-confirm'
  return 'hidden'
}