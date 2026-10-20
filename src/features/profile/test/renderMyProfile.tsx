import { render } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import MyProfilePage from '../pages/MyProfilePage'

export function renderMyProfile() {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  })
  render(
    <QueryClientProvider client={client}>
      <MemoryRouter initialEntries={['/perfil']}>
        <Routes>
          <Route path="/perfil" element={<MyProfilePage />} />
          <Route path="/login" element={<p>Pantalla de login</p>} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>
  )
  return client
}