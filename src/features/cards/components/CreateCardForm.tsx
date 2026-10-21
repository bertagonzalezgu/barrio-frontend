import { CARD_CATEGORIES } from '../types/card.types'
import type { CreateCardFormProps } from '../types/card.types'
import IconPickerTrigger from './IconPickerTrigger';
import ModerationBanner from '../../../components/ModerationBanner';

export default function CreateCardForm({
  type, setType,
  category, setCategory,
  prompt, setPrompt,
  title, setTitle,
  description, setDescription,
  hours, setHours,
  icon, setIcon,
  errors,
  hasSuggestion,
  hasGenerated,
  onGenerate,
  onSubmit,
  isGenerating,
  isSubmitting,
  moderationError
}: CreateCardFormProps) {
  return (
    <form
      onSubmit={(e) => { e.preventDefault(); onSubmit() }}
      className="flex flex-col gap-6"
    >
      <div className="flex gap-2">
        <button
          type="button"
          aria-pressed={type === 'request'}
          onClick={() => setType('request')}
          className={`flex-1 min-h-12 rounded-full py-2 font-body font-medium cursor-pointer transition-colors ${
            type === 'request'
              ? 'bg-busco text-on-busco'
              : 'bg-surface text-ink-muted border border-line'
          }`}
        >
          Busco
        </button>
        <button
          type="button"
          aria-pressed={type === 'offer'}
          onClick={() => setType('offer')}
          className={`flex-1 min-h-12 rounded-full py-2 font-body font-medium cursor-pointer transition-colors ${
            type === 'offer'
              ? 'bg-primary text-on-primary'
              : 'bg-surface text-ink-muted border border-line'
          }`}
        >
          Ofrezco
        </button>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="category" className="text-sm font-body text-ink-muted">
          Categoría
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value as typeof category)}
          aria-invalid={Boolean(errors?.category)}
          className="field"
        >
          <option value="">Selecciona una categoría</option>
          {CARD_CATEGORIES.map(({ value, label }) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
        {errors?.category && (
          <p className="text-sm text-danger-ink">{errors.category}</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="prompt" className="text-sm font-body text-ink-muted">
          Cuéntalo con tus palabras
        </label>
        <textarea
          id="prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="tengo un gato y me voy 4 días..."
          rows={4}
          className="field resize-none"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="hours" className="text-sm font-body text-ink-muted">
          Horas estimadas
        </label>
        <input
          id="hours"
          type="number"
          min={1}
          max={99}
          defaultValue={hours}
          onChange={(e) => {
            if (e.target.value.length > 2) e.target.value = e.target.value.slice(0, 2)
            setHours(Number(e.target.value))
          }}
          aria-invalid={Boolean(errors?.hours)}
          className="field w-24"
        />
        {errors?.hours && (
          <p className="text-sm text-danger-ink">{errors.hours}</p>
        )}
      </div>

      {moderationError && <ModerationBanner message={moderationError} />}

      <button
        type="button"
        onClick={onGenerate}
        disabled={isGenerating || prompt.trim() === ''}
        className="btn-primary w-full"
      >
        {isGenerating ? 'Generando...' : '✨ Generar con IA'}
      </button>

      {hasSuggestion && (
        <div className="border border-line rounded-card p-4 flex flex-col gap-3 bg-surface">
          <p className="text-xs font-body text-ink-muted">Sugerido por IA</p>

          <div className="flex items-center gap-2">
              <div className="w-10 h-10 shrink-0 flex items-center justify-center p-1.5">
                <IconPickerTrigger value={icon} onChange={setIcon} />
              </div>
            <div className="flex flex-col gap-1 flex-1">
              <label htmlFor="title" className="text-xs font-body text-ink-muted">
                Título
              </label>
              <input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                aria-invalid={Boolean(errors?.title)}
                className="font-body font-semibold text-ink bg-transparent focus:outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="description" className="text-xs font-body text-ink-muted">
              Descripción
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              aria-invalid={Boolean(errors?.description)}
              className="field resize-none"
            />
          </div>
        </div>
      )}

      {(errors?.title || errors?.description) && (
        <div role="alert" className="flex flex-col gap-1">
          {errors?.title && (
            <p className="text-sm text-danger-ink">{errors.title}</p>
          )}
          {errors?.description && (
            <p className="text-sm text-danger-ink">{errors.description}</p>
          )}
        </div>
      )}

      {!hasGenerated && (
        <p id="publish-hint" className="text-xs font-body text-ink-muted text-center">
          Genera la propuesta con IA para poder publicar
        </p>
      )}

      <button
        type="submit"
        disabled={!hasGenerated || isSubmitting}
        aria-describedby={!hasGenerated ? 'publish-hint' : undefined}
        className={`w-full disabled:opacity-50 ${
          hasGenerated
            ? 'btn-primary'
            : 'btn-secondary border-primary text-primary-ink'
        }`}
      >
        {isSubmitting ? 'Publicando...' : 'Publicar tarjeta'}
      </button>
    </form>
  )
}