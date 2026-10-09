import { useState } from 'react'
import { useCards } from '../../cards/hooks/useCards'
import useSwipe from '../../cards/hooks/useSwipe'
import SwipeStack from '../../cards/components/SwipeStack'
import CardList from '../../cards/components/CardList'
import { Link } from 'react-router-dom'

type ViewMode = 'swipe' | 'list'

export default function SearchPage() {
  const [mode, setMode] = useState<ViewMode>('swipe')
  const { data: cards = [], isLoading } = useCards()
  const { swipe, passed } = useSwipe(cards)

  return (
    <main className="flex flex-col h-[calc(100dvh-4rem)] px-4 pt-6 pb-4">
      <div className="flex items-center justify-between mb-4">
        <Link to="/home" className="text-sm font-body text-ink/60">← volver</Link>
        <h1 className="font-display font-bold text-ink text-2xl">Buscar</h1>
        <div className="flex bg-ink/5 rounded-full p-1 gap-1">
          <button
            onClick={() => setMode('swipe')}
            className={`px-3 py-1 rounded-full text-xs font-body font-medium transition-colors ${mode === 'swipe' ? 'bg-ink text-paper' : 'text-ink/50'}`}
          >
            Swipe
          </button>
          <button
            onClick={() => setMode('list')}
            className={`px-3 py-1 rounded-full text-xs font-body font-medium transition-colors ${mode === 'list' ? 'bg-ink text-paper' : 'text-ink/50'}`}
          >
            Lista
          </button>
        </div>
      </div>

      {isLoading && <p className="text-xs font-body text-ink/40 text-center mt-8">Cargando...</p>}

      {!isLoading && mode === 'swipe' && (
        <div className="flex-1 flex justify-center items-start">
            <div className="relative w-full max-w-sm h-full">
            <SwipeStack cards={cards} currentIndex={passed.length} onSwipe={swipe} />
            </div>
        </div>
      )}

      {!isLoading && mode === 'list' && <CardList />}
    </main>
  )
}