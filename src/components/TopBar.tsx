import { Link } from 'react-router-dom'
import { MessageCircle } from 'lucide-react'

export default function TopBar() {
  return (
    <header className="md:hidden top-0 left-0 right-0 z-50 bg-paper px-4 py-3 flex items-center justify-between">
      <span className="font-display font-bold text-ink text-xl">barrio.</span>
      <Link to="/chats" aria-label="Chats">
        <MessageCircle size={22} />
      </Link>
    </header>
  )
}