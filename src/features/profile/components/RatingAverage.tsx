import { Star } from 'lucide-react'

interface RatingAverageProps {
  average: number | null
}

export default function RatingAverage({ average }: RatingAverageProps) {
  if (average === null) return <span>Sin valoraciones</span>

  return (
    <span className="inline-flex items-center gap-1">
      <Star size={14} aria-hidden="true" className="fill-hours text-hours-ink" />
      <span>
        {average.toFixed(1)}
        <span className="sr-only"> de 5</span>
      </span>
    </span>
  )
}