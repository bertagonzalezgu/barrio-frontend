import { CARD_CATEGORIES } from '../../cards/types/card.types'
import type { CardCategory } from '../../cards/types/card.types'
import type { AvailabilityFormProps } from '../types/calendar.types'

export default function AvailabilityForm({
  category, setCategory,
  hours, setHours,
  date, setDate,
  minDate,
  errors,
  submitError,
  isSubmitting,
  onSubmit,
  onCancel,
}: AvailabilityFormProps) {
  return (
    <form
      onSubmit={(e) => { e.preventDefault(); onSubmit() }}
      className="flex flex-col gap-4 rounded-card border border-line bg-surface p-4"
    >
      <h2 className="font-display font-bold text-ink text-h4">Nueva disponibilidad</h2>

      <div className="flex flex-col gap-1">
        <label htmlFor="availability-category" className="text-sm font-body text-ink-muted">
          Categoría
        </label>
        <select
          id="availability-category"
          value={category}
          onChange={(e) => setCategory(e.target.value as CardCategory | '')}
          aria-invalid={Boolean(errors.category)}
          aria-describedby={errors.category ? 'availability-category-error' : undefined}
          className="field"
        >
          <option value="">Selecciona una categoría</option>
          {CARD_CATEGORIES.map(({ value, label }) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
        {errors.category && (
          <p id="availability-category-error" className="text-sm text-danger-ink">{errors.category}</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="availability-hours" className="text-sm font-body text-ink-muted">
          Horas
        </label>
        <input
          id="availability-hours"
          type="number"
          min={1}
          step={1}
          value={hours}
          onChange={(e) => setHours(e.target.value)}
          aria-invalid={Boolean(errors.hours)}
          aria-describedby={errors.hours ? 'availability-hours-error' : undefined}
          className="field w-24"
        />
        {errors.hours && (
          <p id="availability-hours-error" className="text-sm text-danger-ink">{errors.hours}</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="availability-date" className="text-sm font-body text-ink-muted">
          Fecha
        </label>
        <input
          id="availability-date"
          type="date"
          min={minDate}
          value={date}
          onChange={(e) => setDate(e.target.value)}
          aria-invalid={Boolean(errors.date)}
          aria-describedby={errors.date ? 'availability-date-error' : undefined}
          className="field w-fit"
        />
        {errors.date && (
          <p id="availability-date-error" className="text-sm text-danger-ink">{errors.date}</p>
        )}
      </div>

      {submitError && <p role="alert" className="alert-error">{submitError}</p>}

      <div className="flex gap-2">
        <button type="submit" disabled={isSubmitting} className="btn-primary">
          {isSubmitting ? 'Guardando...' : 'Guardar'}
        </button>
        <button type="button" onClick={onCancel} className="btn-secondary">
          Cancelar
        </button>
      </div>
    </form>
  )
}