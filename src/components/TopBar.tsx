import { Link } from 'react-router-dom'
import { MessageCircle } from 'lucide-react'
import ThemeToggle from '../features/theme/components/ThemeToggle'

export default function TopBar() {
  return (
    <header className="md:hidden top-0 left-0 right-0 z-50 px-4 py-3 flex items-center justify-between">
      <span className="font-display font-bold text-ink text-h4">barrio.</span>
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <Link
          to="/chats"
          aria-label="Chats"
          className="flex size-12 items-center justify-center rounded-full border border-line bg-surface/80 text-ink shadow-soft backdrop-blur-sm transition-colors hover:bg-surface-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <MessageCircle size={22} />
        </Link>
      </div>
    </header>
  )
}