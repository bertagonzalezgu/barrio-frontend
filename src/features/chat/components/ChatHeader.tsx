import type { ChatDetail } from '../types/chat.types'

interface ChatHeaderProps {
  chat: ChatDetail
}

export default function ChatHeader({ chat }: ChatHeaderProps) {
  const isRequest = chat.card.type === 'request'

  return (
    <header className="flex flex-col gap-2">
      <span
        className={`self-start text-[9px] font-body font-medium tracking-widest uppercase rounded-md px-2 py-0.5 ${
          isRequest ? 'bg-teal-soft text-teal' : 'bg-gold-soft text-ink'
        }`}
      >
        {isRequest ? 'Busco' : 'Ofrezco'}
      </span>
      <h1 className="font-display font-bold text-ink text-xl leading-snug">{chat.card.title}</h1>
      <p className="font-body text-sm text-ink/70">
        {chat.other.name} ·{' '}
        <span className="font-data">
          {chat.hours} {chat.hours === 1 ? 'hora' : 'horas'}
        </span>
      </p>
    </header>
  )
}