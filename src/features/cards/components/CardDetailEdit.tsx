import axios from 'axios'
import { useState } from 'react'
import type { FormEvent } from 'react'
import ModerationBanner from '../../../components/ModerationBanner'
import type { Card, CardCategory } from '../types/card.types'
import { CARD_CATEGORIES } from '../types/card.types'
import type { CardIconType } from '../types/card-icon.types'
import { useUpdateCard } from '../hooks/useUpdateCard'
import IconPickerTrigger from './IconPickerTrigger'

interface Props {
  card: Card
  onCancel: () => void
  onSaved: () => void
}

export default function CardDetailEdit({ card, onCancel, onSaved }: Props) {
  const { mutate: update, isPending } = useUpdateCard()

  const [title, setTitle] = useState(card.title)
  const [description, setDescription] = useState(card.description)
  const [category, setCategory] = useState<CardCategory>(card.category)
  const [hours, setHours] = useState(String(card.hours))
  const [icon, setIcon] = useState<CardIconType | ''>(card.icon)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [moderationError, setModerationError] = useState<string | null>(null)

  function validate() {
    const next: Record<string, string> = {}
    if (!title.trim()) next.title = 'El título no puede estar vacío'
    if (!description.trim()) next.description = 'La descripción es obligatoria'
    if (!Number(hours) || Number(hours) < 1) next.hours = 'Las horas deben ser más que 0'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!validate()) return
    setModerationError(null)
    update(
      {
        id: card.id,
        data: {
          title: title.trim(),
          description: description.trim(),
          category,
          hours: Number(hours),
          icon: icon as CardIconType,
        },
      },
      { onSuccess: onSaved,
        onError: (error) => {
          if (axios.isAxiosError(error) && error.response?.status === 422) {
            setModerationError(
              error.response.data?.message ?? 'Este contenido no cumple las normas de la comunidad. Revísalo antes de guardar.'
            )
          }
        },
      }
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="flex items-center gap-3">
        <div className="w-16 h-16 shrink-0 flex items-center justify-center p-2">
          <IconPickerTrigger value={icon} onChange={setIcon} />
        </div>
        <div className="flex flex-col gap-1 flex-1">
          <label htmlFor="edit-title" className="text-xs font-body text-ink-muted">Título</label>
          <input
            id="edit-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            aria-invalid={Boolean(errors.title)}
            className="font-display font-bold text-ink text-h4 bg-transparent border-b border-line focus:outline-none"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="edit-description" className="text-xs font-body text-ink-muted">Descripción</label>
        <textarea
          id="edit-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          aria-invalid={Boolean(errors.description)}
          className="field resize-none"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="edit-category" className="text-xs font-body text-ink-muted">Categoría</label>
        <select
          id="edit-category"
          value={category}
          onChange={(e) => setCategory(e.target.value as CardCategory)}
          className="field"
        >
          {CARD_CATEGORIES.map(({ value, label }) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="edit-hours" className="text-xs font-body text-ink-muted">Horas</label>
        <input
          id="edit-hours"
          type="number"
          inputMode="numeric"
          min={1}
          value={hours}
          onChange={(e) => setHours(e.target.value)}
          aria-invalid={Boolean(errors.hours)}
          className="field w-24"
        />
      </div>

      {moderationError && <ModerationBanner message={moderationError} />}

      {Object.keys(errors).length > 0 && (
        <div role="alert" className="flex flex-col gap-1">
          {Object.values(errors).map((message) => (
            <p key={message} className="text-sm text-danger-ink">{message}</p>
          ))}
        </div>
      )}

      <div className="flex flex-col gap-2 mt-auto">
        <button
          type="submit"
          disabled={isPending}
          className="btn-primary w-full"
        >
          {isPending ? 'Guardando...' : 'Guardar cambios'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="btn-secondary w-full"
        >
          Cancelar
        </button>
      </div>
    </form>
  )
}