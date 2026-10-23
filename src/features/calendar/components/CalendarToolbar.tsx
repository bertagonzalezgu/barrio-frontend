import { ChevronLeft, ChevronRight } from 'lucide-react'

interface Props {
  label: string
  onNavigate: (action: 'PREV' | 'NEXT' | 'TODAY') => void
}

export default function CalendarToolbar({ label, onNavigate }: Props) {
  return (
    <div className="mb-3 flex shrink-0 items-center justify-between gap-2">
      <h2 aria-live="polite" className="font-display font-bold text-ink text-h3 capitalize">
        {label}
      </h2>
      <div className="flex items-center gap-1">
        <button type="button" onClick={() => onNavigate('TODAY')} className="btn-secondary">
          Hoy
        </button>
        <button
          type="button"
          onClick={() => onNavigate('PREV')}
          aria-label="Mes anterior"
          className="flex size-12 items-center justify-center rounded-full text-ink transition-colors hover:bg-surface-2"
        >
          <ChevronLeft aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => onNavigate('NEXT')}
          aria-label="Mes siguiente"
          className="flex size-12 items-center justify-center rounded-full text-ink transition-colors hover:bg-surface-2"
        >
          <ChevronRight aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}