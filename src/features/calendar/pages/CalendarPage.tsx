import { useState } from 'react'
import { Plus } from 'lucide-react'
import CategoryPickerTrigger from '../../cards/components/CategoryPickerTrigger'
import AvailabilityForm from '../components/AvailabilityForm'
import CalendarGrid from '../components/CalendarGrid'
import CalendarLegend from '../components/CalendarLegend'
import DayCardsList from '../components/DayCardsList'
import CalendarDaysProvider from '../context/CalendarDaysProvider'
import { useAvailabilityForm } from '../hooks/useAvailabilityForm'
import { useCalendarCards } from '../hooks/useCalendarCards'
import { useCalendarFilters } from '../hooks/useCalendarFilters'

export default function CalendarPage() {
  const { activeCategory, filters, selectedDate, setCategory, setSelectedDate } = useCalendarFilters()
  const { data: cards = [], isLoading, isError } = useCalendarCards(filters)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const form = useAvailabilityForm(() => setIsFormOpen(false))

  return (
    <section className="flex flex-col gap-4 px-4 pt-2">
      <h1 className="text-h2 font-display font-bold text-ink">Calendario</h1>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <CategoryPickerTrigger value={activeCategory} onChange={setCategory} />
        <button
          type="button"
          aria-expanded={isFormOpen}
          onClick={() => setIsFormOpen((open) => !open)}
          className="btn-primary"
        >
          <Plus size={18} aria-hidden="true" />
          Añadir disponibilidad
        </button>
      </div>

      {isFormOpen && <AvailabilityForm {...form} onCancel={() => setIsFormOpen(false)} />}

      {isLoading && (
        <p role="status" className="text-xs font-body text-ink-muted text-center">Cargando calendario...</p>
      )}
      {isError && (
        <p role="alert" className="text-xs font-body text-danger-ink text-center">Error al cargar el calendario</p>
      )}

      <CalendarDaysProvider cards={cards} selectedDate={selectedDate} onSelectDate={setSelectedDate}>
        <div className="flex flex-col gap-4 rounded-card border border-line bg-surface p-3 shadow-soft md:p-5">
          <CalendarGrid />
          <CalendarLegend />
        </div>
        <DayCardsList />
      </CalendarDaysProvider>
    </section>
  )
}