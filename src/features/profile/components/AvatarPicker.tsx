import Avatar from '../../../components/ui/Avatar'
import { avatarKeys } from '../../../components/ui/avatarImages'

const NO_AVATAR = ''

interface AvatarPickerProps {
  name: string
  selected: string
  disabled?: boolean
  onSelect: (avatar: string) => void
}

export default function AvatarPicker({ name, selected, disabled = false, onSelect }: AvatarPickerProps) {
  const options = [
    { value: NO_AVATAR, label: 'Mi inicial' },
    ...avatarKeys.map((key, index) => ({ value: key, label: `Avatar ${index + 1}` })),
  ]

  return (
    <fieldset disabled={disabled} className="flex flex-col gap-3">
      <legend className="font-body text-sm font-medium text-ink">Tu avatar</legend>
      <div className="grid grid-cols-5 gap-3">
        {options.map(({ value, label }) => (
          <label key={value || 'none'} className="cursor-pointer">
            <input
              type="radio"
              name="avatar"
              value={value}
              checked={selected === value}
              onChange={() => onSelect(value)}
              className="peer sr-only"
            />
            <span className="flex size-12 items-center justify-center rounded-full ring-offset-2 peer-checked:ring-2 peer-checked:ring-primary peer-focus-visible:ring-2 peer-focus-visible:ring-ink">
              <Avatar name={name} avatar={value} size="md" />
            </span>
            <span className="sr-only">{label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}