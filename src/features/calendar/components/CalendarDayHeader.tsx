import { format, isToday } from 'date-fns'
import { es } from 'date-fns/locale'
import { useCalendarDays } from '../hooks/useCalendarDays'
import DayMarkers from './DayMarkers'

interface Props {
  date: Date
  label: string
  isOffRange?: boolean
}

function getNumberClasses(isSelected: boolean, isOffRange: boolean, today: boolean) {
  if (isSelected) return 'bg-primary text-on-primary font-semibold'
  if (today) return 'text-primary-ink font-semibold ring-1 ring-primary hover:bg-primary-tint'
  if (isOffRange) return 'text-ink-muted hover:bg-surface-2'
  return 'text-ink hover:bg-surface-2'
}

export default function CalendarDayHeader({ date, label, isOffRange = false }: Props) {
  const { cardsByDay, selectedDate, onSelectDate } = useCalendarDays()
  const dayKey = format(date, 'yyyy-MM-dd')
  const types = new Set((cardsByDay.get(dayKey) ?? []).map((card) => card.type))
  const isSelected = dayKey === selectedDate

  return (
    <div
      data-testid={`day-${dayKey}`}
      className={`m-0.5 flex flex-col items-center gap-0.5 rounded-2xl py-1 transition-colors ${
        isSelected ? 'bg-primary-tint' : ''
      }`}
    >
      <button
        type="button"
        aria-pressed={isSelected}
        aria-label={format(date, 'PPPP', { locale: es })}
        onClick={() => onSelectDate(dayKey)}
        className={`flex size-9 items-center justify-center rounded-full font-body text-sm transition-colors ${getNumberClasses(
          isSelected,
          isOffRange,
          isToday(date),
        )}`}
      >
        {label}
      </button>
      <DayMarkers types={types} />
    </div>
  )
}