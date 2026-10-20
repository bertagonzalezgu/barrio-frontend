import { Link } from 'react-router-dom'
import { Star } from 'lucide-react'
import type { ChatDetail } from '../types/chat.types'

interface RatePromptProps {
  chat: ChatDetail
}

export default function RatePrompt({ chat }: RatePromptProps) {
  if (!chat.actions.includes('rate')) return null

  return (
    <Link
      to={`/valorar/${chat.id}`}
      className="flex items-center justify-center gap-2 rounded-2xl bg-gold-soft px-4 py-3 font-body text-sm font-medium text-ink focus-visible:outline-2 focus-visible:outline-teal"
    >
      <Star size={16} aria-hidden="true" />
      Valorar a {chat.other.name}
    </Link>
  )
}