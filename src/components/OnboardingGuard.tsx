import type { ReactNode } from "react"
import { Navigate } from "react-router-dom"

interface OnboardingGuardProps{
  children: ReactNode
}

export default function OnboardingGuard({ children }: OnboardingGuardProps){

  if (localStorage.getItem('onboarding_seen')){
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}