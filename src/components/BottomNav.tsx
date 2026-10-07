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
        <nav className="fixed bottom-0 left-0 right-0 bg-paper border-t border-teal-soft flex justify-around py-2 z-50">
          {links.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 text-xs px-3 py-1 transition-colors ${
            isActive ? 'text-teal' : 'text-ink/40'
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