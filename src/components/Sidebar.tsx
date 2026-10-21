import { NavLink } from 'react-router-dom'
import { Home, Map, Calendar, BarChart2, MessageCircle, User } from 'lucide-react'

const links = [
  { to: '/home', label: 'Inicio', icon: Home },
  { to: '/mapa', label: 'Mapa', icon: Map },
  { to: '/calendario', label: 'Calendario', icon: Calendar },
  { to: '/actividad', label: 'Actividad', icon: BarChart2 },
  { to: '/chats', label: 'Chats', icon: MessageCircle },
  { to: '/perfil', label: 'Perfil', icon: User },
]

export default function Sidebar() {
  return (
    <aside className="flex flex-col w-56 h-full border-r border-line bg-canvas px-4 pt-6">      
    <p className="text-h4 font-display font-bold mb-2">barrio.</p>
    <span className="text-sm font-body text-ink-muted pb-6">tiempo que nos conecta, en tu barrio</span>
      <nav className="flex flex-col gap-1 flex-1">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 min-h-12 px-4 py-2 rounded-full cursor-pointer text-sm transition-colors ${
                isActive
                    ? 'bg-primary text-on-primary shadow-primary'
                    : 'text-ink hover:bg-surface-2'
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}