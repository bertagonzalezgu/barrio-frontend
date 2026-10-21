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
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4 rounded-card border border-line bg-surface p-4">      <ScoreSelector value={score} onChange={setScore} />
      {attempted && score === null && (
        <p role="alert" className="alert-error">
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
          className="field w-full"
        />
      </div>
      <button
        type="submit"
        disabled={isPending}
        aria-busy={isPending}
        className="btn-primary w-full"
      >
        Enviar valoración
      </button>
      {isError && (
        <p role="alert" className="alert-error">
          {getRatingErrorMessage(error)}
        </p>
      )}
    </form>
  )
}