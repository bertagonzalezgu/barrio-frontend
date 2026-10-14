import { useNavigate } from 'react-router-dom'
import { useUser } from '../features/auth/hooks/useUser'
import { useUserStore } from '../features/auth/store/userStore'
import WalletBalance from '../features/wallet/components/WalletBalance'
import CardList from '../features/cards/components/CardList'
import SwipeView from '../features/cards/components/SwipeView'
import { useCards } from '../features/cards/hooks/useCards'
import CategoryPickerTrigger from '../features/cards/components/CategoryPickerTrigger'
import { useHomeFilters } from '../hooks/useHomeFilters'
import type { TypeFilter } from '../hooks/useHomeFilters'

const TYPE_FILTERS: { value: TypeFilter; label: string }[] = [
  { value: 'all', label: 'Todas' },
  { value: 'request', label: 'Busco' },
  { value: 'offer', label: 'Ofrezco' },
]

export default function HomePage() {
  useUser()
  const name = useUserStore((s) => s.name)
  const userName = name.charAt(0).toUpperCase() + name.slice(1)
  const navigate = useNavigate()

  const { activeType, activeView, activeCategory, filters, setType, setView, setCategory } =
    useHomeFilters()

  const { data: cards = [], isLoading } = useCards(filters)

  return (
    <main className="flex flex-col gap-6 px-4 pt-6 pb-24">

      <section>
        <h1 className="text-2xl font-display font-bold text-ink">
          Hola, {userName}
        </h1>
        <p className="text-base font-body text-ink/80 mt-1">
          ¿Qué podemos hacer por ti hoy? Cada hora que das vuelve a tu comunidad.
        </p>
      </section>

      <WalletBalance />

      <div role="group" aria-label="Filtrar por tipo" className="flex gap-2">
        {TYPE_FILTERS.map(({ value, label }) => (
          <button
            key={value}
            type="button"
            aria-pressed={activeType === value}
            onClick={() => setType(value)}
            className={`px-4 py-2 rounded-full text-sm font-body font-medium border transition-colors ${
              activeType === value
                ? 'bg-teal text-paper border-teal'
                : 'border-teal/30 text-teal'
            }`}
          >
            {label}
          </button>
        ))}
        <CategoryPickerTrigger value={activeCategory} onChange={setCategory} />
      </div>   

      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigate('/cards/crear')}
          className="bg-ink text-paper font-body font-medium px-4 py-2 rounded-full text-sm cursor-pointer"
        >
          + Crear tarjeta
        </button>

        <div role="group" aria-label="Cambiar vista" className="flex bg-ink/5 rounded-full p-1 gap-1">
          <button
            type="button"
            aria-pressed={activeView === 'swipe'}
            onClick={() => setView('swipe')}
            className={`px-3 py-1 rounded-full text-xs font-body font-medium transition-colors ${
              activeView === 'swipe' ? 'bg-ink text-paper' : 'text-ink/50'
            }`}
          >
            Swipe
          </button>
          <button
            type="button"
            aria-pressed={activeView === 'list'}
            onClick={() => setView('list')}
            className={`px-3 py-1 rounded-full text-xs font-body font-medium transition-colors ${
              activeView === 'list' ? 'bg-ink text-paper' : 'text-ink/50'
            }`}
          >
            Lista
          </button>
        </div>
      </div>

      {activeView === 'swipe' &&
        (isLoading ? (
          <p className="text-xs font-body text-ink/40 text-center mt-8">Cargando...</p>
        ) : (
          <SwipeView key={`${activeType}-${activeCategory ?? 'all'}`} cards={cards} />
        ))}

      {activeView === 'list' && <CardList filters={filters} />}

    </main>
  )
}