import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { useCalendarDays } from '../hooks/useCalendarDays'
import DayMarkers from './DayMarkers'

interface Props {
  date: Date
  label: string
  isOffRange?: boolean
}

export default function CalendarDayHeader({ date, label, isOffRange }: Props) {
  const { cardsByDay, selectedDate, onSelectDate } = useCalendarDays()
  const dayKey = format(date, 'yyyy-MM-dd')
  const types = new Set((cardsByDay.get(dayKey) ?? []).map((card) => card.type))
  const isSelected = dayKey === selectedDate

  return (
    <div data-testid={`day-${dayKey}`} className="flex flex-col items-center gap-1 py-1">
      <button
        type="button"
        aria-pressed={isSelected}
        aria-label={format(date, 'PPPP', { locale: es })}
        onClick={() => onSelectDate(dayKey)}
        className={`flex size-8 items-center justify-center rounded-full text-sm font-body ${
          isSelected
            ? 'bg-primary-tint text-primary-ink ring-2 ring-primary'
            : isOffRange
              ? 'text-ink-muted hover:bg-surface-2'
              : 'text-ink hover:bg-surface-2'
        }`}
      >
        {label}
      </button>
      <DayMarkers types={types} />
    </div>
  )
}