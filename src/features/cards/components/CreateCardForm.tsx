import { CARD_CATEGORIES } from '../types/card.types'
import type { CreateCardFormProps } from '../types/card.types'
import CardIcon from './CardIcon'

export default function CreateCardForm({
  type, setType,
  category, setCategory,
  prompt, setPrompt,
  title, setTitle,
  description, setDescription,
  hours, setHours,
  icon,
  errors,
  onGenerate,
  onSubmit,
  isGenerating,
  isSubmitting,
}: CreateCardFormProps) {
  const hasSuggestion = title !== '' || description !== ''

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); onSubmit() }}
      className="flex flex-col gap-6"
    >
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setType('request')}
          className={`flex-1 rounded-full py-2 font-body font-medium cursor-pointer transition-colors ${
            type === 'request'
              ? 'bg-teal text-paper'
              : 'bg-paper text-ink/60 border border-ink/20'
          }`}
        >
          Busco
        </button>
        <button
          type="button"
          onClick={() => setType('offer')}
          className={`flex-1 rounded-full py-2 font-body font-medium cursor-pointer transition-colors ${
            type === 'offer'
              ? 'bg-teal text-paper'
              : 'bg-paper text-ink/60 border border-ink/20'
          }`}
        >
          Ofrezco
        </button>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="category" className="text-sm font-body text-ink/60">
          Categoría
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value as typeof category)}
          className="border border-ink/20 rounded-xl px-3 py-2 text-ink bg-paper"
        >
          {CARD_CATEGORIES.map(({ value, label }) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
        {errors?.category && (
          <p className="text-sm text-coral">{errors.category}</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="prompt" className="text-sm font-body text-ink/60">
          Cuéntalo con tus palabras
        </label>
        <textarea
          id="prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="tengo un gato y me voy 4 días..."
          rows={4}
          className="border border-ink/20 rounded-xl px-3 py-2 text-ink bg-paper resize-none"
        />
        {errors?.description && (
          <p className="text-sm text-coral">{errors.description}</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="hours" className="text-sm font-body text-ink/60">
          Horas estimadas
        </label>
        <input
          id="hours"
          type="number"
          min={1}
          value={hours}
          onChange={(e) => setHours(Number(e.target.value))}
          className="border border-ink/20 rounded-xl px-3 py-2 text-ink bg-paper w-24"
        />
        {errors?.hours && (
          <p className="text-sm text-coral">{errors.hours}</p>
        )}
      </div>

      <button
        type="button"
        onClick={onGenerate}
        disabled={isGenerating || prompt.trim() === ''}
        className="w-full bg-teal text-paper rounded-xl py-3 font-body font-medium disabled:opacity-50"
      >
        {isGenerating ? 'Generando...' : '✨ Generar con IA'}
      </button>

      {hasSuggestion && (
        <div className="border border-ink/10 rounded-xl p-4 flex flex-col gap-3 bg-paper">
          <p className="text-xs font-body text-ink/40">Sugerido por IA</p>
          <div className="flex items-center gap-2">
            {icon && <CardIcon name={icon} />}
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="flex-1 font-body font-semibold text-ink bg-transparent border-b border-ink/20 focus:outline-none"
            />
          </div>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
            className="text-sm font-body text-ink/70 bg-transparent border border-ink/10 rounded px-2 py-1 resize-none"
          />
        </div>
      )}

      {hasSuggestion && (
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-teal text-paper rounded-xl py-3 font-body font-medium disabled:opacity-50"
        >
          {isSubmitting ? 'Publicando...' : 'Publicar tarjeta'}
        </button>
      )}
    </form>
  )
}