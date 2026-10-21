import { isAxiosError } from 'axios'
import { useLogout } from '../../auth/hooks/useLogout'
import { useMyProfile } from '../hooks/useMyProfile'
import ProfileSummary from '../components/ProfileSummary'
import WalletSummary from '../../wallet/components/WalletSummary'
import TransactionList from '../../wallet/components/TransactionList'
import { Link } from 'react-router-dom'

export default function MyProfilePage() {
  const { data: profile, isPending, isError, error, refetch } = useMyProfile()
  const logout = useLogout()
  const notRegistered = isAxiosError(error) && error.response?.status === 404

  return (
    <main className="mx-auto flex max-w-lg flex-col gap-6 px-4 pt-6 pb-8">
      {isPending && (
        <p role="status" className="text-center font-body text-xs text-ink-muted">
          Cargando tu perfil...
        </p>
      )}
      {isError && (
        <div role="alert" className="flex flex-col items-center gap-2 text-center font-body text-xs text-danger-ink">
          <p>{notRegistered ? 'Tu cuenta no está registrada en barrio.' : 'No se ha podido cargar tu perfil.'}</p>
          {!notRegistered && (
            <button type="button" onClick={() => refetch()} className="underline">
              Reintentar
            </button>
          )}
        </div>
      )}
      {profile && (
        <>
            <ProfileSummary profile={profile} />
            <Link
              to="/perfil/editar"
              className="self-center font-body text-sm text-primary underline focus-visible:outline-2 focus-visible:outline-primary"
            >
              Ajustes de cuenta
            </Link>
            <WalletSummary />
            <TransactionList />
        </>
        )}
      <button
        type="button"
        onClick={logout}
        className="btn-secondary mx-auto"
      >
        Cerrar sesión
      </button>
    </main>
  )
}