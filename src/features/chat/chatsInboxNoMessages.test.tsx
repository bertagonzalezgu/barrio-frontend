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

describe('chats list row without messages', () => {
  it('shows the proposal date when the conversation has no messages', async () => {
    server.use(http.get(`${API}/exchanges`, () => HttpResponse.json([baseSummary])))
    renderChatList()

    expect(await screen.findByText('Lucía')).toBeInTheDocument()
    expect(document.querySelector('time')).toHaveAttribute('datetime', baseSummary.proposedAt)
  })
})