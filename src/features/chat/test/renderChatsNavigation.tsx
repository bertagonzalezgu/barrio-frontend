import type { ReactElement } from 'react'
import { render } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import ChatListPage from '../pages/ChatListPage'

export function renderChatsNavigation(navigation: ReactElement) {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  })
  render(
    <QueryClientProvider client={client}>
      <MemoryRouter initialEntries={['/home']}>
        {navigation}
        <Routes>
          <Route path="/home" element={<p>Inicio</p>} />
          <Route path="/chats" element={<ChatListPage />} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>
  )
}