import SwipeCard from './SwipeCard'
import type { Card } from '../types/card.types'
import type { SwipeDirection } from '../hooks/useSwipe'

interface Props {
  cards: Card[]
  currentIndex: number
  onSwipe: (direction: SwipeDirection) => void
  onOpen: (id: string) => void
}

export default function SwipeStack({ cards, currentIndex, onSwipe, onOpen }: Props) {
  const visible = cards.slice(currentIndex, currentIndex + 3)

  if (!visible.length) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="font-body text-ink-muted text-sm">No hay más tarjetas por ahora</p>
      </div>
    )
  }

  return (
    <div className="relative w-full h-full">
      {[...visible].reverse().map((card, i) => (
        <div
          key={card.id}
          className="absolute inset-0 transition-transform"
          style={{ transform: `scale(${1 - (visible.length - 1 - i) * 0.04}) translateY(${(visible.length - 1 - i) * -10}px)`, zIndex: i }}
        >
          {i === visible.length - 1 ? (
            <SwipeCard card={card} onSwipe={onSwipe} onOpen={() => onOpen(card.id)} />
          ) : (
            <div className="absolute inset-0 border border-line bg-surface-2 rounded-card" />
          )}
        </div>
      ))}
    </div>
  )
}