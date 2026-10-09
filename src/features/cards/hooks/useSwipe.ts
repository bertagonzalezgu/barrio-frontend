import { useState } from 'react'
import type { Card } from '../types/card.types'

export type SwipeDirection = 'left' | 'right'

export default function useSwipe(cards: Card[]) {
  const [index, setIndex] = useState(0)
  const [passed, setPassed] = useState<{ card: Card; direction: SwipeDirection }[]>([])

  const current = cards[index] ?? null
  const hasMore = index < cards.length

  function swipe(direction: SwipeDirection) {
    if (!current) return
    setPassed(prev => [...prev, { card: current, direction }])
    setIndex(i => i + 1)
  }

  return { current, hasMore, swipe, passed }
}