import useSwipe from '../hooks/useSwipe'
import SwipeStack from './SwipeStack'
import type { Card } from '../types/card.types'

export default function SwipeView({ cards }: { cards: Card[] }) {
  const { swipe, passed, hasMore } = useSwipe(cards)

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-full max-w-sm h-120">
        <SwipeStack cards={cards} currentIndex={passed.length} onSwipe={swipe} />
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => swipe('left')}
          disabled={!hasMore}
          className="px-5 py-2 rounded-full border border-ink/20 text-sm font-body text-ink/60 disabled:opacity-40"
        >
          Paso
        </button>
        <button
          type="button"
          onClick={() => swipe('right')}
          disabled={!hasMore}
          className="px-5 py-2 rounded-full bg-teal text-paper text-sm font-body font-medium disabled:opacity-40"
        >
          Me interesa
        </button>
      </div>
    </div>
  )
}