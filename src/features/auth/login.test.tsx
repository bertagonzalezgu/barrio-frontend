import '@testing-library/jest-dom/vitest'
import { expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { loadFeature, defineFeature } from 'jest-cucumber'

import ProtectedRoute from '../../components/ProtectedRoute'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'

vi.mock('./services/auth.service', () => ({
  loginWithEmail: vi.fn(),
  registerWithEmail: vi.fn(),
}))

vi.mock('../../hooks/useAuth', () => ({
  useAuth: vi.fn(),
}))

import { loginWithEmail, registerWithEmail } from './services/auth.service'
import { useAuth } from '../../hooks/useAuth'
import type { UserCredential } from 'firebase/auth'

const feature = loadFeature('./docs/login.feature')

defineFeature(feature, (test) => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('Registro con datos válidos', ({ given, when, then }) => {
    given('que no tengo cuenta', () => {
      render(
        <MemoryRouter>
          <RegisterForm />
        </MemoryRouter>
      )
    })

    when('me registro con un email y contraseña válidos', async () => {
      vi.mocked(registerWithEmail).mockResolvedValueOnce({} as UserCredential)

      const emailInput = screen.getByLabelText(/correo electrónico/i)
      const passwordInputs = screen.getAllByPlaceholderText(/••••••••••••|Mín./i)

      fireEvent.change(emailInput, { target: { value: 'nuevo@vecina.com' } })
      fireEvent.change(passwordInputs[0], { target: { value: 'Password123!' } })
      fireEvent.change(passwordInputs[1], { target: { value: 'Password123!' } })

      const submitBtn = screen.getByRole('button', { name: /crear cuenta/i })
      fireEvent.click(submitBtn)
    })

    then('mi cuenta se crea y accedo directamente a la pantalla de Inicio', async () => {
      await waitFor(() => {
        expect(registerWithEmail).toHaveBeenCalledWith('nuevo@vecina.com', 'Password123!')
      })
    })
  })

test('Login con credenciales incorrectas', ({ given, when, then }) => {
  given('que ya tengo cuenta', () => {
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    )
  })

  when('intento iniciar sesión con una contraseña incorrecta', async () => {
    vi.mocked(loginWithEmail).mockRejectedValueOnce(new Error('auth/invalid-credential'))

    const emailInput = screen.getByLabelText(/Tu correo electrónico/i)
    const passwordInput = screen.getByLabelText(/^Contraseña$/i)

    fireEvent.change(emailInput, { target: { value: 'usuario@vecina.com' } })
    fireEvent.change(passwordInput, { target: { value: 'claveerronea' } })

    const submitBtn = screen.getByRole('button', { name: /iniciar sesión/i })
    fireEvent.click(submitBtn)
  })

  then('veo un mensaje de error y no accedo a la app', async () => {
    const alert = await screen.findByRole('alert')
    expect(alert).toBeInTheDocument()
  })
})

  test('Acceso a una ruta protegida sin sesión iniciada', ({ given, when, then }) => {
    given('que no he iniciado sesión', () => {
      vi.mocked(useAuth).mockReturnValue({
        currentUser: null,
        loading: false,
      } as ReturnType<typeof useAuth>)
    })

    when('intento acceder directamente a una URL de una pantalla protegida (por ejemplo, "Perfil")', () => {
      render(
        <MemoryRouter initialEntries={['/perfil']}>
          <Routes>
            <Route path="/login" element={<div>Pantalla de login</div>} />
            <Route
              path="/perfil"
              element={
                <ProtectedRoute>
                  <div>Pantalla de perfil</div>
                </ProtectedRoute>
              }
            />
          </Routes>
        </MemoryRouter>
      )
    })

    then('se me redirige a la pantalla de login', () => {
      expect(screen.getByText('Pantalla de login')).toBeInTheDocument()
      expect(screen.queryByText('Pantalla de perfil')).not.toBeInTheDocument()
    })
  })
})