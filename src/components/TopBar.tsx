import { Link } from 'react-router-dom'
import { MessageCircle } from 'lucide-react'

export default function TopBar() {
  return (
    <header className="md:hidden top-0 left-0 right-0 z-50 bg-canvas px-4 py-3 flex items-center justify-between">
      <span className="font-display font-bold text-ink text-h4">barrio.</span>
      <Link
        to="/chats"
        aria-label="Chats"
        className="-mr-2 flex size-12 items-center justify-center rounded-full text-ink hover:bg-surface-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        <MessageCircle size={22} />
      </Link>
    </header>
  )
}