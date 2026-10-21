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
    <nav className="fixed inset-x-3 bottom-[calc(0.75rem+env(safe-area-inset-bottom))] z-50 flex justify-around rounded-full border border-line bg-surface/85 px-2 py-1.5 shadow-soft backdrop-blur-md">
      {links.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `flex min-h-12 flex-1 flex-col items-center justify-center gap-0.5 rounded-full text-xs transition-colors ${
              isActive ? 'font-semibold text-primary-ink' : 'text-ink-muted hover:text-ink'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <span
                className={`flex h-8 w-14 items-center justify-center rounded-full transition-colors ${
                  isActive ? 'bg-primary-tint' : ''
                }`}
              >
                <Icon size={22} aria-hidden="true" />
              </span>
              {label}
            </>
          )}
        </NavLink>
      ))}
    </nav>
  )
}
