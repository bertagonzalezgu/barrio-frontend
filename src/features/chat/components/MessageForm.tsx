import { useState, type FormEvent } from 'react'
import { useSendMessage } from '../hooks/useSendMessage'

interface MessageFormProps {
  exchangeId: string
}

export default function MessageForm({ exchangeId }: MessageFormProps) {
  const [text, setText] = useState('')
  const { mutate, isPending } = useSendMessage(exchangeId)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    mutate(text.trim(), { onSuccess: () => setText('') })
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="message-text">Mensaje</label>
      <textarea
        id="message-text"
        value={text}
        maxLength={2000}
        onChange={(event) => setText(event.target.value)}
      />
      <button type="submit" disabled={isPending || !text.trim()}>
        Enviar
      </button>
    </form>
  )
}