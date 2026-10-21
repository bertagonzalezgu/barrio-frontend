import { Moon, Sun } from 'lucide-react'
import { useThemeStore } from '../store/themeStore'

export default function ThemeToggle() {
  const theme = useThemeStore((s) => s.theme)
  const toggleTheme = useThemeStore((s) => s.toggleTheme)
  const isDark = theme === 'dark'
  const Icon = isDark ? Sun : Moon

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      className="flex size-12 shrink-0 cursor-pointer items-center justify-center rounded-full border border-line bg-surface/80 text-ink shadow-soft backdrop-blur-sm transition-colors hover:bg-surface-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
    >
      <Icon size={22} strokeWidth={1.75} aria-hidden="true" />
    </button>
  )
}
