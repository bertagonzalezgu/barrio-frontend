import CategoryPickerTrigger from '../../cards/components/CategoryPickerTrigger'
import CardsMap from '../components/CardsMap'
import MapEmptyState from '../components/MapEmptyState'
import { useMapCards } from '../hooks/useMapCards'
import { useMapFilters } from '../hooks/useMapFilters'

export default function MapPage() {
  const { activeCategory, filters, setCategory } = useMapFilters()
  const { data: cards = [], isLoading, isError } = useMapCards(filters)

  return (
    <section className="flex flex-col gap-4 px-4 pt-2">
      <h1 className="text-h2 font-display font-bold text-ink">Mapa</h1>

      <CategoryPickerTrigger value={activeCategory} onChange={setCategory} />

      {isLoading && (
        <p className="text-xs font-body text-ink-muted text-center">Cargando mapa...</p>
      )}
      {isError && (
        <p className="text-xs font-body text-danger-ink text-center">Error al cargar el mapa</p>
      )}
      {!isLoading && !isError && cards.length === 0 && <MapEmptyState />}

      <div className="isolate h-[60dvh] overflow-hidden rounded-card border border-line">
        <CardsMap cards={cards} />
      </div>
    </section>
  )
}