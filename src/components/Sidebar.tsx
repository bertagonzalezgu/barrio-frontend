import { NavLink } from 'react-router-dom'
import { Home, Map, Calendar, BarChart2, User } from 'lucide-react'

const links = [
  { to: '/home', label: 'Inicio', icon: Home },
  { to: '/mapa', label: 'Mapa', icon: Map },
  { to: '/calendario', label: 'Calendario', icon: Calendar },
  { to: '/actividad', label: 'Actividad', icon: BarChart2 },
  { to: '/perfil', label: 'Perfil', icon: User },
]

export default function Sidebar() {
  return (
    <aside className="flex flex-col w-56 h-full border-r border-teal-soft bg-paper px-4 pt-6">      
    <p className="text-xl font-body mb-2">barrio.</p>
    <span className="text-sm font-body text-ink/70 pb-6">tiempo que nos conecta, en tu barrio</span>
      <nav className="flex flex-col gap-1 flex-1">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer text-sm transition-colors ${
                isActive
                    ? 'bg-teal text-paper'
                    : 'text-ink hover:bg-teal-soft'
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