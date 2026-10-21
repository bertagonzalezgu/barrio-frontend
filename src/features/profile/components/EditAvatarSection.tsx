import { useState } from 'react'
import { useUpdateProfile } from '../hooks/useUpdateProfile'
import AvatarPicker from './AvatarPicker'

interface EditAvatarSectionProps {
  name: string
  currentAvatar: string
}

export default function EditAvatarSection({ name, currentAvatar }: EditAvatarSectionProps) {
  const [error, setError] = useState<string | null>(null)
  const { mutate, isPending } = useUpdateProfile()

  function handleSelect(avatar: string) {
    setError(null)
    mutate(
      { avatar },
      { onError: () => setError('No se ha podido cambiar el avatar.') }
    )
  }

  return (
    <div className="flex flex-col gap-2">
      <AvatarPicker name={name} selected={currentAvatar} disabled={isPending} onSelect={handleSelect} />
      {error && (
        <p role="alert" className="font-body text-sm text-coral">
          {error}
        </p>
      )}
    </div>
  )
}