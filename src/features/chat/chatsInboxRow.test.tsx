import { screen } from '@testing-library/react'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import { vi, describe, it, expect, beforeAll, afterEach, afterAll } from 'vitest'
import { API } from './test/chatFixtures'
import { baseSummary } from './test/chatsInboxFixtures'
import { renderChatList } from './test/renderChatList'

vi.mock('../../services/firebase', () => ({ auth: {} }))

const server = setupServer()
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('chats list row', () => {
  it('shows Busco for a request and Ofrezco for an offer', async () => {
    const offer = {
      ...baseSummary,
      id: 'exchange-2',
      card: { ...baseSummary.card, id: 'card-2', type: 'offer' },
      other: { id: 'user-c', name: 'Marta', avatar: '' },
    }
    server.use(http.get(`${API}/exchanges`, () => HttpResponse.json([baseSummary, offer])))
    renderChatList()

    expect(await screen.findByText('Busco')).toBeInTheDocument()
    expect(screen.getByText('Ofrezco')).toBeInTheDocument()
  })

  it('shows the initial of the name when the person has no avatar', async () => {
    server.use(http.get(`${API}/exchanges`, () => HttpResponse.json([baseSummary])))
    renderChatList()

    expect(await screen.findByText('L')).toBeInTheDocument()
    expect(document.querySelector('img')).toBeNull()
  })

  it('shows the avatar image when the person has one', async () => {
    const withAvatar = { ...baseSummary, other: { ...baseSummary.other, avatar: 'https://example.com/lucia.png' } }
    server.use(http.get(`${API}/exchanges`, () => HttpResponse.json([withAvatar])))
    renderChatList()

    expect(await screen.findByText('Lucía')).toBeInTheDocument()
    expect(document.querySelector('img')).toHaveAttribute('src', 'https://example.com/lucia.png')
  })
})