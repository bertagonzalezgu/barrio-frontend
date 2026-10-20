import { useParams } from 'react-router-dom'
import { useUserProfile } from '../hooks/useUserProfile'
import ProfileSummary from '../components/ProfileSummary'

export default function PublicProfilePage() {
  const { userId = '' } = useParams()
  const { data: profile, isPending, isError } = useUserProfile(userId)

  if (isPending) return <p className="text-xs font-body text-ink/40 text-center mt-8">Cargando perfil...</p>
  if (isError) {
    return (
      <p role="alert" className="text-xs font-body text-coral text-center mt-8">
        No se ha podido cargar este perfil.
      </p>
    )
  }

  return (
    <div className="px-4 pt-6 pb-4 max-w-lg mx-auto">
      <ProfileSummary profile={profile} />
    </div>
  )
}