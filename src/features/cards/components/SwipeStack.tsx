import SwipeCard from './SwipeCard'
import type { Card } from '../types/card.types'
import type { SwipeDirection } from '../hooks/useSwipe'

interface Props {
  cards: Card[]
  currentIndex: number
  onSwipe: (direction: SwipeDirection) => void
}

export default function SwipeStack({ cards, currentIndex, onSwipe }: Props) {
  const visible = cards.slice(currentIndex, currentIndex + 3)

  if (!visible.length) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="font-body text-ink/40 text-sm">No hay más tarjetas por ahora</p>
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
            <SwipeCard card={card} onSwipe={onSwipe} />
          ) : (
            <div className="absolute inset-0 bg-paper rounded-3xl border border-ink/10 shadow-sm" />
          )}
        </div>
      ))}
    </div>
  )
}