export type Theme = 'light' | 'dark'

// Misma clave que lee el script inline de index.html antes de que React pinte
export const THEME_STORAGE_KEY = 'barrio-theme'

const DARK_QUERY = '(prefers-color-scheme: dark)'

function isTheme(value: unknown): value is Theme {
  return value === 'light' || value === 'dark'
}

export function readStoredTheme(): Theme | null {
  try {
    const value = localStorage.getItem(THEME_STORAGE_KEY)
    return isTheme(value) ? value : null
  } catch {
    return null
  }
}

export function storeTheme(theme: Theme) {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme)
  } catch {
    // Sin almacenamiento disponible el tema solo dura esta sesión
  }
}

export function getSystemTheme(): Theme {
  return window.matchMedia?.(DARK_QUERY)?.matches ? 'dark' : 'light'
}

export function watchSystemTheme(onChange: (theme: Theme) => void) {
  window.matchMedia?.(DARK_QUERY)?.addEventListener('change', (event) => {
    onChange(event.matches ? 'dark' : 'light')
  })
}

// color-scheme lo pone globals.css según data-theme
export function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme
}
