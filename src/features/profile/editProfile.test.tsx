import { screen, fireEvent, waitFor } from '@testing-library/react'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import { describe, it, expect, vi, beforeAll, beforeEach, afterEach, afterAll } from 'vitest'
import { API } from '../chat/test/chatFixtures'
import { publicProfile } from '../ratings/test/ratingFixtures'
import { useUserStore } from '../auth/store/userStore'
import { renderEditProfile } from './renderEditProfile'

vi.mock('../../services/firebase', () => ({ auth: {} }))

const myProfile = { ...publicProfile, id: 'user-a', name: 'Berta' }

const server = setupServer()

let current: typeof myProfile
let patchBody: unknown
let patchCalls: number

beforeAll(() => server.listen())
beforeEach(() => {
  current = myProfile
  patchBody = undefined
  patchCalls = 0
  useUserStore.getState().setName('Berta')
  server.use(
    http.get(`${API}/users/me`, () => HttpResponse.json(current)),
    http.get(`${API}/wallet/balance`, () => HttpResponse.json({ balance: 2, reserved: 0, available: 2 })),
    http.get(`${API}/wallet/transactions`, () => HttpResponse.json({ items: [] })),
    http.patch(`${API}/users/me`, async ({ request }) => {
      patchCalls += 1
      patchBody = await request.json()
      current = { ...current, ...(patchBody as object) }
      return HttpResponse.json(current)
    })
  )
})
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

async function submitName(value: string) {
  const input = await screen.findByLabelText('Tu nombre')
  fireEvent.change(input, { target: { value } })
  fireEvent.click(screen.getByRole('button', { name: 'Guardar' }))
}

describe('Editar nombre', () => {
  it('muestra el formulario con mi nombre actual', async () => {
    renderEditProfile()

    expect(await screen.findByLabelText('Tu nombre')).toHaveValue('Berta')
  })

  it('guarda el nombre sin espacios sobrantes, vuelve al perfil y lo muestra', async () => {
    renderEditProfile()
    await submitName('  Berta G  ')

    expect(await screen.findByRole('heading', { name: 'Berta G' })).toBeInTheDocument()
    expect(patchBody).toEqual({ name: 'Berta G' })
    expect(useUserStore.getState().name).toBe('Berta G')
  })

  it('invalida perfil, tarjetas y chats para que muestren el nombre nuevo', async () => {
    const client = renderEditProfile()
    const spy = vi.spyOn(client, 'invalidateQueries')
    await submitName('Berta G')
    await screen.findByRole('heading', { name: 'Berta G' })

    for (const key of ['profile', 'cards', 'chats', 'chat']) {
      expect(spy).toHaveBeenCalledWith({ queryKey: [key] })
    }
  })

  it('no deja guardar un nombre vacío y no llama al servidor', async () => {
    renderEditProfile()
    await submitName('   ')

    expect(await screen.findByRole('alert')).toHaveTextContent('Escribe tu nombre')
    expect(patchCalls).toBe(0)
  })

  it('no deja guardar un nombre de más de 80 caracteres', async () => {
    renderEditProfile()
    await submitName('a'.repeat(81))

    expect(await screen.findByRole('alert')).toHaveTextContent('Máximo 80 caracteres')
    expect(patchCalls).toBe(0)
  })

  it('si el nombre no cambia vuelve al perfil sin llamar al servidor', async () => {
    renderEditProfile()
    await submitName('Berta')

    expect(await screen.findByRole('heading', { name: 'Berta' })).toBeInTheDocument()
    expect(patchCalls).toBe(0)
  })

  it('con 422 avisa de que el nombre no está permitido y se queda en el formulario', async () => {
    server.use(http.patch(`${API}/users/me`, () => HttpResponse.json({ error: 'content_rejected' }, { status: 422 })))
    renderEditProfile()
    await submitName('Nombre raro')

    expect(await screen.findByRole('alert')).toHaveTextContent(/no está permitido/i)
    expect(screen.getByLabelText('Tu nombre')).toBeInTheDocument()
    expect(useUserStore.getState().name).toBe('Berta')
  })

  it('con 500 pide intentarlo de nuevo', async () => {
    server.use(http.patch(`${API}/users/me`, () => HttpResponse.json({ error: 'moderation_failed' }, { status: 500 })))
    renderEditProfile()
    await submitName('Berta G')

    expect(await screen.findByRole('alert')).toHaveTextContent(/inténtalo de nuevo/i)
  })
})

describe('Elegir avatar', () => {
  it('muestra "Mi inicial" y los 12 avatares, con el actual marcado', async () => {
    current = { ...myProfile, avatar: 'avatar-03' }
    renderEditProfile()

    expect(await screen.findAllByRole('radio')).toHaveLength(13)
    expect(screen.getByRole('radio', { name: 'Avatar 3' })).toBeChecked()
    expect(screen.getByRole('radio', { name: 'Mi inicial' })).not.toBeChecked()
  })

  it('sin avatar elegido está marcada "Mi inicial"', async () => {
    renderEditProfile()

    expect(await screen.findByRole('radio', { name: 'Mi inicial' })).toBeChecked()
  })

  it.each(Array.from({ length: 12 }, (_, i) => i + 1))(
    'al elegir el avatar %i guarda su clave',
    async (n) => {
      const key = `avatar-${String(n).padStart(2, '0')}`
      renderEditProfile()

      fireEvent.click(await screen.findByRole('radio', { name: `Avatar ${n}` }))

      await waitFor(() => expect(patchBody).toEqual({ avatar: key }))
      await waitFor(() => expect(screen.getByRole('radio', { name: `Avatar ${n}` })).toBeChecked())
    }
  )

  it('"Mi inicial" quita el avatar enviando una cadena vacía', async () => {
    current = { ...myProfile, avatar: 'avatar-03' }
    renderEditProfile()

    fireEvent.click(await screen.findByRole('radio', { name: 'Mi inicial' }))

    await waitFor(() => expect(patchBody).toEqual({ avatar: '' }))
    await waitFor(() => expect(screen.getByRole('radio', { name: 'Mi inicial' })).toBeChecked())
  })

  it('si falla el guardado avisa y mantiene la selección anterior', async () => {
    server.use(http.patch(`${API}/users/me`, () => HttpResponse.json({ error: 'x' }, { status: 500 })))
    renderEditProfile()

    fireEvent.click(await screen.findByRole('radio', { name: 'Avatar 5' }))

    expect(await screen.findByRole('alert')).toHaveTextContent('No se ha podido cambiar el avatar.')
    expect(screen.getByRole('radio', { name: 'Mi inicial' })).toBeChecked()
  })
})