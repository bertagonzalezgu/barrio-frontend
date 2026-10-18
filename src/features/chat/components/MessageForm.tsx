import { useState, type FormEvent } from 'react'
import { useSendMessage } from '../hooks/useSendMessage'

interface MessageFormProps {
  exchangeId: string
}

const ERROR_MESSAGE = 'No se ha podido enviar el mensaje. Inténtalo de nuevo.'

export default function MessageForm({ exchangeId }: MessageFormProps) {
  const [text, setText] = useState('')
  const { mutate, isPending, isError } = useSendMessage(exchangeId)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    mutate(text.trim(), { onSuccess: () => setText('') })
  }

  return (
    <form onSubmit={handleSubmit} className="sticky bottom-18 md:bottom-0 flex flex-col gap-2 bg-paper pt-2">
      <div className="flex items-end gap-2">
        <label htmlFor="message-text" className="sr-only">
          Mensaje
        </label>
        <textarea
          id="message-text"
          rows={1}
          value={text}
          maxLength={2000}
          placeholder="Escribe un mensaje..."
          onChange={(event) => setText(event.target.value)}
          className="flex-1 resize-none rounded-2xl border border-ink/15 bg-white px-4 py-3 font-body text-sm text-ink placeholder:text-ink/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal"
        />
        <button
          type="submit"
          disabled={isPending || !text.trim()}
          className="rounded-2xl bg-teal px-5 py-3 font-body text-sm font-medium text-paper cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2"
        >
          Enviar
        </button>
      </div>
      {isError && (
        <p role="alert" className="rounded-xl border-l-4 border-coral bg-coral-soft px-3 py-2 font-body text-sm text-ink">
          {ERROR_MESSAGE}
        </p>
      )}
    </form>
  )
}