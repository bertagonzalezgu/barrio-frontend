import { Routes, Route } from 'react-router-dom'
import AppLayout from './layouts/Layout'
import ProtectedRoute from './components/ProtectedRoute'
import OnboardingGuard from './components/OnboardingGuard'
import OnboardingPage from './pages/OnboardingPage'
import LoginPage from './features/auth/pages/LoginPage'
import RegisterPage from './features/auth/pages/RegisterPage'
import HomePage from './pages/HomePage'
import CreateCardPage from './features/cards/pages/CreateCardPage'
import CardDetailPage from './features/cards/pages/CardDetailPage'
import ChatPage from './features/chat/pages/ChatPage'
import ChatListPage from './features/chat/pages/ChatListPage'
import RatePage from './features/ratings/pages/RatePage'
import PublicProfilePage from './features/profile/pages/PublicProfilePage'
import MyProfilePage from './features/profile/pages/MyProfilePage'
import EditProfilePage from './features/profile/pages/EditProfilePage'
import MapPage from './features/map/pages/MapPage'
import CalendarPage from './features/calendar/pages/CalendarPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<OnboardingGuard>
                                <OnboardingPage />
                              </OnboardingGuard>} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route element={<ProtectedRoute>
                        <AppLayout />
                      </ProtectedRoute>}>
        <Route path="/home" element={<HomePage />} />
        <Route path="/cards/crear" element={<CreateCardPage />} />
        <Route path="/cards/:id" element={<CardDetailPage />} />
        <Route path="/chats" element={<ChatListPage />} />
        <Route path="/chat/:exchangeId" element={<ChatPage />} />
        <Route path="/valorar/:exchangeId" element={<RatePage />} />
        <Route path="/mapa" element={<MapPage />} />
        <Route path="/calendario" element={<CalendarPage />} />
        <Route path="/perfil" element={<MyProfilePage />} />
        <Route path="/perfil/editar" element={<EditProfilePage />} />
        <Route path="/perfil/:userId" element={<PublicProfilePage />} />
      </Route>
    </Routes>
  )
}