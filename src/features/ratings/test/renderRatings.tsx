import { render } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import ChatPage from '../../chat/pages/ChatPage'
import PublicProfilePage from '../../profile/pages/PublicProfilePage'
import RatePage from '../pages/RatePage'
import { EXCHANGE_ID } from '../../chat/test/chatFixtures'

export function renderRatings(path = `/valorar/${EXCHANGE_ID}`) {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  })
  render(
    <QueryClientProvider client={client}>
      <MemoryRouter initialEntries={[path]}>
        <Routes>
          <Route path="/chat/:exchangeId" element={<ChatPage />} />
          <Route path="/valorar/:exchangeId" element={<RatePage />} />
          <Route path="/perfil/:userId" element={<PublicProfilePage />} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>
  )
  return client
}