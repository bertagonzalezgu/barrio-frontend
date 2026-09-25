import '@testing-library/jest-dom/vitest'
import { expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { loadFeature, defineFeature } from 'jest-cucumber'
import path from 'path'
import { fileURLToPath } from 'url'

import OnboardingPage from './OnboardingPage'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const mockNavigate = vi.fn()

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router-dom')>()
  return { ...actual, useNavigate: () => mockNavigate }
})

const feature = loadFeature(path.resolve(__dirname, '../../docs/onboarding.feature'))

defineFeature(feature, (test) => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.clear()
  })

  test('Ver la pantalla de bienvenida antes de iniciar sesión', ({ given, then }) => {
    given('que abro la app por primera vez sin sesión iniciada', () => {
      render(
        <MemoryRouter>
          <OnboardingPage />
        </MemoryRouter>
      )
    })

    then('veo la pantalla de onboarding con el nombre, el lema y una breve explicación del sistema de horas', () => {
      expect(screen.getByText(/barrio\./i)).toBeInTheDocument()
      expect(screen.getByText(/tiempo que nos conecta/i)).toBeInTheDocument()
      expect(screen.getByText(/intercambia tiempo/i)).toBeInTheDocument()
    })
  })

  test('Empezar desde el onboarding', ({ given, when, then }) => {
    given('que estoy en la pantalla de onboarding', () => {
      render(
        <MemoryRouter>
          <OnboardingPage />
        </MemoryRouter>
      )
    })

    when('pulso "Empezar ahora"', () => {
      fireEvent.click(screen.getByRole('button', { name: /empezar ahora/i }))
    })

    then('se me lleva al flujo de registro', () => {
      expect(mockNavigate).toHaveBeenCalledWith('/register')
    })
  })

  test('Ya tener cuenta desde el onboarding', ({ given, when, then }) => {
    given('que estoy en la pantalla de onboarding', () => {
      render(
        <MemoryRouter>
          <OnboardingPage />
        </MemoryRouter>
      )
    })

    when('pulso "Ya tengo cuenta"', () => {
      fireEvent.click(screen.getByRole('button', { name: /ya tengo cuenta/i }))
    })

    then('se me lleva al flujo de inicio de sesión', () => {
      expect(mockNavigate).toHaveBeenCalledWith('/login')
    })
  })
})