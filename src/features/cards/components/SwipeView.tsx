import useSwipe from '../hooks/useSwipe'
import SwipeStack from './SwipeStack'
import type { Card } from '../types/card.types'

export default function SwipeView({ cards }: { cards: Card[] }) {
  const { swipe, passed } = useSwipe(cards)

  return (
    <div className="flex justify-center">
      <div className="relative w-full max-w-sm h-120">
        <SwipeStack cards={cards} currentIndex={passed.length} onSwipe={swipe} />
      </div>
    </div>
  )
}