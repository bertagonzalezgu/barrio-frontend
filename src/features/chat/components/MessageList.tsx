import type { ChatMessage } from '../types/chat.types'

interface MessageListProps {
  messages: ChatMessage[]
  otherName: string
}

function formatTime(isoDate: string): string {
  return new Date(isoDate).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
}

export default function MessageList({ messages, otherName }: MessageListProps) {
  return (
    <div role="log" aria-live="polite" aria-label="Mensajes">
      {messages.length === 0 ? (
        <p>Todavía no hay mensajes.</p>
      ) : (
        <ul>
          {messages.map((message) => (
            <li key={message.id}>
              <span className="sr-only">{message.mine ? 'Tú' : otherName}:</span>
              <p>{message.text}</p>
              <time dateTime={message.sentAt}>{formatTime(message.sentAt)}</time>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}