import { render } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import EditProfilePage from './pages/EditProfilePage'
import MyProfilePage from './pages/MyProfilePage'

export function renderEditProfile() {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  })
  render(
    <QueryClientProvider client={client}>
      <MemoryRouter initialEntries={['/perfil/editar']}>
        <Routes>
          <Route path="/perfil" element={<MyProfilePage />} />
          <Route path="/perfil/editar" element={<EditProfilePage />} />
          <Route path="/login" element={<p>Pantalla de login</p>} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>
  )
  return client
}