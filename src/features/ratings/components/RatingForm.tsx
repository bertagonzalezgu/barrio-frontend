import { useState, type FormEvent } from 'react'
import type { ChatDetail } from '../../chat/types/chat.types'
import { useSubmitRating } from '../hooks/useSubmitRating'
import { buildRatingPayload } from '../utils/buildRatingPayload'
import { getRatingErrorMessage } from '../utils/getRatingErrorMessage'
import { COMMENT_MAX_LENGTH } from '../utils/constants'
import ScoreSelector from './ScoreSelector'

interface RatingFormProps {
  chat: ChatDetail
}

export default function RatingForm({ chat }: RatingFormProps) {
  const [score, setScore] = useState<number | null>(null)
  const [comment, setComment] = useState('')
  const [attempted, setAttempted] = useState(false)
  const { mutate, isPending, isError, error } = useSubmitRating(chat.id, chat.other.id)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setAttempted(true)
    if (score === null) return
    mutate(buildRatingPayload(score, comment))
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <ScoreSelector value={score} onChange={setScore} />
      {attempted && score === null && (
        <p role="alert" className="rounded-xl border-l-4 border-coral bg-coral-soft px-3 py-2 font-body text-sm text-ink">
          Elige una puntuación de 1 a 5.
        </p>
      )}
      <div className="flex flex-col gap-2">
        <label htmlFor="rating-comment" className="font-body text-sm font-medium text-ink">
          Comentario (opcional)
        </label>
        <textarea
          id="rating-comment"
          value={comment}
          maxLength={COMMENT_MAX_LENGTH}
          onChange={(event) => setComment(event.target.value)}
          rows={4}
          className="w-full rounded-2xl border border-ink/20 bg-paper px-4 py-3 font-body text-sm text-ink"
        />
      </div>
      <button
        type="submit"
        disabled={isPending}
        aria-busy={isPending}
        className="w-full rounded-2xl bg-teal py-3 font-body text-sm font-medium text-paper cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
      >
        Enviar valoración
      </button>
      {isError && (
        <p role="alert" className="rounded-xl border-l-4 border-coral bg-coral-soft px-3 py-2 font-body text-sm text-ink">
          {getRatingErrorMessage(error)}
        </p>
      )}
    </form>
  )
}