import { useNavigate, useParams } from 'react-router-dom'
import BackButton from '../../../components/ui/BackButton'
import { useUserProfile } from '../hooks/useUserProfile'
import ProfileSummary from '../components/ProfileSummary'

export default function PublicProfilePage() {
  const { userId = '' } = useParams()
  const navigate = useNavigate()
  const { data: profile, isPending, isError } = useUserProfile(userId)

  return (
    <main className="mx-auto flex max-w-lg flex-col gap-6 px-4 pt-6 pb-8">
      <BackButton onClick={() => navigate(-1)} />
      {isPending && <p className="text-center font-body text-xs text-ink/40">Cargando perfil...</p>}
      {isError && (
        <p role="alert" className="text-center font-body text-xs text-coral">
          No se ha podido cargar este perfil.
        </p>
      )}
      {profile && <ProfileSummary profile={profile} />}
    </main>
  )
}