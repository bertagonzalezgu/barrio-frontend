import { loadFeature, defineFeature } from 'jest-cucumber'
import { render, screen } from '@testing-library/react'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import { vi, afterEach, beforeAll, afterAll } from 'vitest'
import WalletBalance from './components/WalletBalance'
import { useWalletStore } from './store/walletStore'

vi.mock('../../../services/firebase', () => ({ auth: {} }))

vi.mock('firebase/auth', () => ({
  getAuth: vi.fn(() => ({})),
  onAuthStateChanged: (_auth: unknown, cb: (user: unknown) => void) => {
    cb({ getIdToken: () => Promise.resolve('fake-token') })
    return () => {}
  },
}))

const server = setupServer()
beforeAll(() => server.listen())
afterEach(() => {
  server.resetHandlers()
  useWalletStore.setState({ balance: 0, impact: 0 })
})
afterAll(() => server.close())

const feature = loadFeature('./docs/wallet.feature')

defineFeature(feature, (test) => {
  test('Recibir horas de regalo al completar el registro', ({ given, when, then, and }) => {
    given('que soy una usuaria nueva y no tengo cuenta todavía', () => {
      server.use(
        http.get('http://localhost:3001/api/wallet/balance', () =>
          HttpResponse.json({ balance: 2, reserved: 0, available: 2 })
        )
      )
    })

    when('completo el registro con email y contraseña (o proveedor de Firebase)', () => {
      render(<WalletBalance />)
    })

    then('mi cuenta se crea con un saldo inicial de 2 horas', async () => {
        expect(await screen.findByText('2')).toBeInTheDocument()
    })

    and('puedo ver ese saldo en la pantalla de Inicio', () => {
        expect(screen.getByText('horas')).toBeInTheDocument()
    })
  })

  test('Usar las horas de regalo para pedir la primera ayuda', ({ given, when, then, and }) => {
    given('que tengo un saldo de 2 horas de regalo y no he ofrecido nada todavía', () => {})
    when('propongo un intercambio que cuesta 1 hora', () => {})
    then('la propuesta se acepta sin bloquearse por falta de saldo', () => {
      throw new Error('pendiente: implementar en feature/propose-exchange')
    })
    and('al confirmarse el intercambio mi saldo se actualiza a 1 hora', () => {})
  })

  test('Saldo insuficiente para un intercambio', ({ given, when, then, and }) => {
    given('que tengo un saldo de 1 hora', () => {})
    when('intento proponer un intercambio que cuesta 3 horas', () => {})
    then('veo un aviso de que no tengo saldo suficiente', () => {
      throw new Error('pendiente: implementar en feature/propose-exchange')
    })
    and('no se crea la propuesta de intercambio', () => {})
  })

  test('Las horas de regalo no se duplican', ({ given, when, then }) => {
    given('que ya recibí mis 2 horas de regalo al registrarme', () => {
      server.use(
        http.get('http://localhost:3001/api/wallet/balance', () =>
          HttpResponse.json({ balance: 2, reserved: 0, available: 2 })
        )
      )
    })

    when('cierro sesión y vuelvo a iniciar sesión más tarde', () => {
      render(<WalletBalance />)
    })

    then('no se añaden horas de regalo adicionales a mi saldo', async () => {
        expect(await screen.findByText('2')).toBeInTheDocument()
        expect(screen.queryByText('4')).not.toBeInTheDocument()
    })
  })
})