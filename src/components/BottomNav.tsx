import { NavLink } from 'react-router-dom'
import { Home, Map, Calendar, BarChart2, User } from 'lucide-react'

const links = [
  { to: '/home', label: 'Inicio', icon: Home },
  { to: '/mapa', label: 'Mapa', icon: Map },
  { to: '/calendario', label: 'Calendario', icon: Calendar },
  { to: '/actividad', label: 'Actividad', icon: BarChart2 },
  { to: '/perfil', label: 'Perfil', icon: User },
]

export default function BottomNav() {
  return (
        <nav className="fixed bottom-0 left-0 right-0 bg-canvas/90 backdrop-blur-md border-t border-line flex justify-around py-2 z-50">
          {links.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `flex min-h-12 min-w-12 flex-col items-center justify-center gap-1 rounded-full px-3 py-1 text-xs transition-colors ${
            isActive ? 'font-semibold text-primary' : 'text-ink-muted'
            }`
          }
        >
          <Icon size={22} />
          {label}
        </NavLink>
      ))}
    </nav>
  )
}