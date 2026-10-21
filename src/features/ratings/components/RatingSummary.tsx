import type { ChatRating } from '../../chat/types/chat.types'

interface RatingSummaryProps {
  rating: ChatRating
}

export default function RatingSummary({ rating }: RatingSummaryProps) {
  return (
    <section className="flex flex-col gap-2 rounded-card border border-line bg-surface p-4">      <h2 className="font-display font-bold text-ink">Tu valoración</h2>
      <p className="font-display tabular-nums text-sm text-ink">{rating.score} de 5</p>
      {rating.comment && <p className="font-body text-sm text-ink/80">{rating.comment}</p>}
    </section>
  )
}