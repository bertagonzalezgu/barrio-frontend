import { useId, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUpdateProfile } from '../hooks/useUpdateProfile'
import { validateName } from '../utils/validateName'
import { getUpdateProfileErrorMessage } from '../utils/updateProfileErrors'

interface EditNameFormProps {
  currentName: string
}

export default function EditNameForm({ currentName }: EditNameFormProps) {
  const navigate = useNavigate()
  const inputId = useId()
  const errorId = useId()
  const [name, setName] = useState(currentName)
  const [error, setError] = useState<string | null>(null)
  const { mutate, isPending } = useUpdateProfile()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    const validationError = validateName(name)
    if (validationError) {
      setError(validationError)
      return
    }

    const trimmed = name.trim()
    if (trimmed === currentName) {
      navigate('/perfil')
      return
    }

    mutate(
      { name: trimmed },
      {
        onSuccess: () => navigate('/perfil'),
        onError: (err) => setError(getUpdateProfileErrorMessage(err)),
      }
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label htmlFor={inputId} className="font-body text-sm font-medium text-ink">
          Tu nombre
        </label>
        <input
          id={inputId}
          type="text"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className="w-full rounded-xl border border-teal-soft bg-white px-4 py-3 font-body text-sm text-ink focus:outline-none focus:ring-2 focus:ring-teal"
        />
      </div>

      {error && (
        <p id={errorId} role="alert" className="font-body text-sm text-coral">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-xl bg-ink py-4 font-body font-medium text-paper transition-colors hover:bg-ink/90 disabled:opacity-60"
      >
        {isPending ? 'Guardando...' : 'Guardar'}
      </button>
    </form>
  )
}