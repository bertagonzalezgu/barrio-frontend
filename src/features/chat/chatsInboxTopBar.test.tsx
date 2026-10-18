import { screen, fireEvent } from '@testing-library/react'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import { vi, describe, it, expect, beforeAll, afterEach, afterAll } from 'vitest'
import TopBar from '../../components/TopBar'
import { API } from './test/chatFixtures'
import { renderChatsNavigation } from './test/renderChatsNavigation'

vi.mock('../../services/firebase', () => ({ auth: {} }))

const server = setupServer()
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('mobile top bar', () => {
  it('links to the chats list', async () => {
    server.use(http.get(`${API}/exchanges`, () => HttpResponse.json([])))
    renderChatsNavigation(<TopBar />)

    fireEvent.click(screen.getByRole('link', { name: 'Chats' }))

    expect(await screen.findByRole('heading', { name: 'Chats' })).toBeInTheDocument()
  })
})