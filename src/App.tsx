import { Routes, Route } from 'react-router-dom'
import AppLayout from './layouts/Layout'
import ProtectedRoute from './components/ProtectedRoute'
import OnboardingGuard from './components/OnboardingGuard'
import OnboardingPage from './pages/OnboardingPage'
import LoginPage from './features/auth/pages/LoginPage'
import RegisterPage from './features/auth/pages/RegisterPage'
import HomePage from './pages/HomePage'
import CreateCardPage from './features/cards/pages/CreateCardPage'

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
      </Route>
    </Routes>
  )
}