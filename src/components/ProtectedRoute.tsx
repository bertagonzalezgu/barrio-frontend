import type { ReactNode } from "react"
import { Navigate, useLocation } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"

interface ProtectedRouteProps{
  children: ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps){
  const { currentUser, loading } = useAuth()
  const location = useLocation()

  if (loading){
    return <div>Cargando...</div>
  }

  if (!currentUser){
    return <Navigate to="/login" state={{ from: location.pathname }} replace />
  }

  return <>{children}</>
}