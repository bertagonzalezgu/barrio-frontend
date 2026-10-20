import type { ChatDetail } from '../../chat/types/chat.types'
import type { RatingViewState } from '../types/rating.types'

export function getRatingViewState(chat: ChatDetail): RatingViewState {
  if (chat.myRating) return 'already-rated'
  if (chat.actions.includes('rate')) return 'can-rate'
  return 'not-available'
}