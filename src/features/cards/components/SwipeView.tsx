import useSwipe from '../hooks/useSwipe'
import SwipeStack from './SwipeStack'
import type { Card } from '../types/card.types'
import { useNavigate } from 'react-router-dom'

export default function SwipeView({ cards }: { cards: Card[] }) {
  const { swipe, passed, hasMore } = useSwipe(cards)
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-80 max-w-sm h-110">
        <SwipeStack
          cards={cards}
          currentIndex={passed.length}
          onSwipe={swipe}
          onOpen={(id) => navigate(`/cards/${id}`)}
        />
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