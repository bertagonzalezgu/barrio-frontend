import { loadFeature, defineFeature } from 'jest-cucumber'
import { screen, within } from '@testing-library/react'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import { vi, beforeAll, afterEach, afterAll } from 'vitest'
import { API } from './test/chatFixtures'
import { baseSummary } from './test/chatsInboxFixtures'
import { renderChatList } from './test/renderChatList'

vi.mock('../../services/firebase', () => ({ auth: {} }))

const server = setupServer()
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

const feature = loadFeature('./docs/chats.feature')
const LAST_MESSAGE = 'El sábado me va bien'
const LAST_MESSAGE_AT = '2026-10-18T09:00:00.000Z'

defineFeature(feature, (test) => {
  test('Acceder a la lista desde la navegación', ({ given, when, then }) => {
    given('que he iniciado sesión', () => {})
    when('pulso "Chats" en la navegación', () => {})
    then('veo la pantalla con la lista de mis conversaciones', () => {})
  })

  test('Ver los datos de cada conversación', ({ given, when, then }) => {
    given('que tengo un intercambio con otra persona sobre una tarjeta', () => {
      server.use(http.get(`${API}/exchanges`, () => HttpResponse.json([baseSummary])))
    })

    when('abro la lista de chats', () => {
      renderChatList()
    })

    then(
      'veo el nombre de la otra persona, el título de la tarjeta, las horas y el estado del intercambio',
      async () => {
        expect(await screen.findByText('Lucía')).toBeInTheDocument()
        expect(screen.getByText('Ayuda con una mudanza')).toBeInTheDocument()
        expect(screen.getByText(/\b2\s?h\b/)).toBeInTheDocument()
        expect(screen.getByText('Aceptado')).toBeInTheDocument()
      }
    )
  })

  test('Ver el último mensaje de cada conversación', ({ given, when, then }) => {
  given('que tengo una conversación con mensajes', () => {
    server.use(
      http.get(`${API}/exchanges`, () =>
        HttpResponse.json([
          { ...baseSummary, lastMessage: { text: LAST_MESSAGE, sentAt: LAST_MESSAGE_AT, mine: false } },
        ])
      )
    )
  })

  when('abro la lista de chats', () => {
    renderChatList()
  })

  then('veo un adelanto del último mensaje y su hora', async () => {
    expect(await screen.findByText(LAST_MESSAGE)).toBeInTheDocument()
    expect(document.querySelector('time')).toHaveAttribute('datetime', LAST_MESSAGE_AT)
  })
})

  test('Las conversaciones en curso aparecen antes que las cerradas', ({ given, when, then, and }) => {
  given('que tengo un intercambio aceptado y otro ya confirmado', () => {
    server.use(
      http.get(`${API}/exchanges`, () =>
        HttpResponse.json([
          { ...baseSummary, id: 'exchange-open', status: 'accepted' },
          {
            ...baseSummary,
            id: 'exchange-closed',
            status: 'confirmed',
            other: { id: 'user-c', name: 'Marta', avatar: '' },
          },
        ])
      )
    )
  })

  when('abro la lista de chats', () => {
    renderChatList()
  })

  then('el intercambio aceptado aparece en "En curso"', async () => {
    const openGroup = await screen.findByRole('region', { name: 'En curso' })
    expect(within(openGroup).getByText('Lucía')).toBeInTheDocument()
  })

  and('el intercambio confirmado aparece en "Cerrados"', () => {
    const openGroup = screen.getByRole('region', { name: 'En curso' })
    const closedGroup = screen.getByRole('region', { name: 'Cerrados' })
    expect(within(closedGroup).getByText('Marta')).toBeInTheDocument()
    expect(within(closedGroup).queryByText('Lucía')).not.toBeInTheDocument()
    expect(openGroup.compareDocumentPosition(closedGroup) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
  })
})

  test.skip('Llegar a una propuesta recibida', ({ given, when, then, and }) => {
    given('que otra persona ha propuesto un intercambio sobre una tarjeta mía', () => {})
    when('abro la lista de chats', () => {})
    then('veo esa conversación con el estado "Propuesta"', () => {})
    and('al abrirla puedo aceptar o rechazar la propuesta', () => {})
  })

  test.skip('Abrir una conversación desde la lista', ({ given, when, then }) => {
    given('que veo una conversación en la lista', () => {})
    when('pulso sobre ella', () => {})
    then('se abre el chat de ese intercambio', () => {})
  })

  test.skip('Todavía no tengo conversaciones', ({ given, when, then }) => {
    given('que no tengo ningún intercambio', () => {})
    when('abro la lista de chats', () => {})
    then('veo un mensaje indicando que todavía no tengo conversaciones', () => {})
  })
})