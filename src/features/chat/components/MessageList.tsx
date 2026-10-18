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
    <div role="log" aria-live="polite" aria-label="Mensajes" className="flex-1">
      {messages.length === 0 ? (
        <p className="py-10 text-center font-body text-sm text-ink/70">Todavía no hay mensajes.</p>
      ) : (
        <ul className="flex flex-col gap-2">
          {messages.map((message) => (
            <li key={message.id} className={`flex ${message.mine ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                  message.mine
                    ? 'rounded-br-md bg-teal text-paper'
                    : 'rounded-bl-md border border-ink/10 bg-white text-ink'
                }`}
              >
                <span className="sr-only">{message.mine ? 'Tú' : otherName}:</span>
                <p className="font-body text-sm leading-relaxed whitespace-pre-wrap wrap-break-word">{message.text}</p>
                <time dateTime={message.sentAt} className="mt-1 block font-data text-[10px] opacity-70">
                  {formatTime(message.sentAt)}
                </time>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}