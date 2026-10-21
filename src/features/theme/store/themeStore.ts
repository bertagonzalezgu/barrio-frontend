import { create } from 'zustand'
import {
  applyTheme,
  getSystemTheme,
  readStoredTheme,
  storeTheme,
  watchSystemTheme,
  type Theme,
} from '../utils/themePreference'

interface ThemeStore {
  theme: Theme
  toggleTheme: () => void
}

const initialTheme = readStoredTheme() ?? getSystemTheme()
applyTheme(initialTheme)

export const useThemeStore = create<ThemeStore>()((set, get) => ({
  theme: initialTheme,
  toggleTheme: () => {
    const next = get().theme === 'dark' ? 'light' : 'dark'
    storeTheme(next)
    applyTheme(next)
    set({ theme: next })
  },
}))

// Mientras la persona no elija, el tema sigue al del sistema
watchSystemTheme((theme) => {
  if (readStoredTheme()) return
  applyTheme(theme)
  useThemeStore.setState({ theme })
})
