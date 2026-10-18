import { render } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import ChatListPage from '../pages/ChatListPage'
import ChatStub from './ChatStub'

export function renderChatList() {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  })
  render(
    <QueryClientProvider client={client}>
      <MemoryRouter initialEntries={['/chats']}>
        <Routes>
          <Route path="/chats" element={<ChatListPage />} />
          <Route path="/chat/:exchangeId" element={<ChatStub />} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>
  )
}