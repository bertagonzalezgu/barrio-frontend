import '@testing-library/jest-dom/vitest'
import { expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { loadFeature, defineFeature } from 'jest-cucumber'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const feature = loadFeature(path.resolve(__dirname, '../../../docs/modo-oscuro.feature'))

// Reimportar el store simula abrir la app: vuelve a leer la preferencia guardada
async function openApp() {
  vi.resetModules()
  const { default: ThemeToggle } = await import('./components/ThemeToggle')
  render(<ThemeToggle />)
}

function currentTheme() {
  return document.documentElement.dataset.theme
}

defineFeature(feature, (test) => {
  beforeEach(() => {
    localStorage.clear()
    delete document.documentElement.dataset.theme
  })

  test('Cambiar de tema con el interruptor', ({ given, when, then }) => {
    given('que la app está en modo claro', async () => {
      await openApp()
      expect(currentTheme()).toBe('light')
    })

    when('pulso el interruptor de tema', () => {
      fireEvent.click(screen.getByRole('button', { name: 'Cambiar a modo oscuro' }))
    })

    then('la interfaz cambia a la paleta de modo oscuro', () => {
      expect(currentTheme()).toBe('dark')
      expect(screen.getByRole('button', { name: 'Cambiar a modo claro' })).toBeInTheDocument()
    })
  })

  test('El tema elegido persiste', ({ given, when, then }) => {
    given('que he cambiado a modo oscuro', async () => {
      await openApp()
      fireEvent.click(screen.getByRole('button', { name: 'Cambiar a modo oscuro' }))
      expect(currentTheme()).toBe('dark')
    })

    when('cierro y vuelvo a abrir la app', async () => {
      cleanup()
      delete document.documentElement.dataset.theme
      await openApp()
    })

    then('la app se muestra en modo oscuro sin que tenga que volver a cambiarlo', () => {
      expect(currentTheme()).toBe('dark')
      expect(screen.getByRole('button', { name: 'Cambiar a modo claro' })).toBeInTheDocument()
    })
  })
})
