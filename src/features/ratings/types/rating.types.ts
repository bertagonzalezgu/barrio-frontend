export interface RatingInput {
  score: number
  comment?: string
}

export type RatingViewState = 'can-rate' | 'already-rated' | 'not-available'