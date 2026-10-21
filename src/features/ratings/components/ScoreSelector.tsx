import { Star } from 'lucide-react'
import { SCORES } from '../utils/constants'

interface ScoreSelectorProps {
  value: number | null
  onChange: (score: number) => void
}

export default function ScoreSelector({ value, onChange }: ScoreSelectorProps) {
  return (
    <fieldset className="flex flex-col gap-2">
      <legend className="font-body text-sm font-medium text-ink">Puntuación</legend>
      <div className="flex justify-center gap-1">
        {SCORES.map((score) => (
          <label key={score} className="cursor-pointer p-1.5">
            <input
              type="radio"
              name="score"
              value={score}
              checked={value === score}
              onChange={() => onChange(score)}
              className="peer sr-only"
            />
            <Star
              size={36}
              aria-hidden="true"
              className={`peer-focus-visible:outline-2 peer-focus-visible:outline-primary ${
                value !== null && score <= value ? 'fill-hours text-hours' : 'text-ink-muted'
              }`}
            />
            <span className="sr-only">{score} de 5</span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}