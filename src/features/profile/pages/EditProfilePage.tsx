import BackButton from '../../../components/ui/BackButton'
import { useMyProfile } from '../hooks/useMyProfile'
import EditNameForm from '../components/EditNameForm'

export default function EditProfilePage() {
  const { data: profile, isPending, isError } = useMyProfile()

  return (
    <main className="mx-auto flex max-w-lg flex-col gap-6 px-4 pt-6 pb-8">
      <BackButton to="/perfil" />
      <h1 className="font-display text-xl font-bold text-ink">Editar perfil</h1>
      {isPending && (
        <p role="status" className="font-body text-xs text-ink/40">
          Cargando tu perfil...
        </p>
      )}
      {isError && (
        <p role="alert" className="font-body text-xs text-coral">
          No se ha podido cargar tu perfil.
        </p>
      )}
      {profile && <EditNameForm currentName={profile.name} />}
    </main>
  )
}