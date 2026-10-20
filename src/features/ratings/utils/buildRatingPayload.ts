import type { RatingInput } from '../types/rating.types'

export function buildRatingPayload(score: number, comment: string): RatingInput {
  const trimmed = comment.trim()
  return trimmed ? { score, comment: trimmed } : { score }
}