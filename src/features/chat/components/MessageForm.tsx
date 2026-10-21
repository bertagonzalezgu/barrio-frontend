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
    <form onSubmit={handleSubmit} className="sticky bottom-18 md:bottom-0 flex flex-col gap-2 bg-canvas pt-2">
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
          className="field flex-1 resize-none"
        />
        <button
          type="submit"
          disabled={isPending || !text.trim()}
          className="btn-primary"
        >
          Enviar
        </button>
      </div>
      {isError && (
        <p role="alert" className="alert-error">
          {ERROR_MESSAGE}
        </p>
      )}
    </form>
  )
}