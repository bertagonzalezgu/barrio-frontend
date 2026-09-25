import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./features/auth/pages/LoginPage";
import RegisterPage from "./features/auth/pages/RegisterPage";
import ProtectedRoute from "./components/ProtectedRoute";
import OnboardingPage from "./pages/OnboardingPage";
import OnboardingGuard from "./components/OnboardingGuard";

export default function App(){
  return (
    <Routes>
      <Route path="/" element={<OnboardingGuard>
                                <OnboardingPage/>
                              </OnboardingGuard>} />
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/register" element={<RegisterPage/>} />
      <Route path="/home" element={<ProtectedRoute>
                                <HomePage/>
                              </ProtectedRoute>} />
    </Routes>
  )
}
