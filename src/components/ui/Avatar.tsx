import { avatarImages } from './avatarImages'

type AvatarProps = {
  name: string
  avatar?: string | null
  size?: 'md' | 'lg'
}

const SIZE = {
  md: 'size-10',
  lg: 'size-24',
}

const INITIAL_STYLE = {
  md: 'bg-primary-tint text-primary-ink',
  lg: 'bg-hours text-on-hours text-4xl',
}

export default function Avatar({ name, avatar, size = 'md' }: AvatarProps) {
  if (avatar && Object.hasOwn(avatarImages, avatar)) {
    return (
      <img
        src={avatarImages[avatar]}
        alt=""
        className={`${SIZE[size]} shrink-0 rounded-full border border-line object-cover`}
      />
    )
  }

  return (
    <span
      aria-hidden="true"
      className={`${SIZE[size]} ${INITIAL_STYLE[size]} flex shrink-0 items-center justify-center rounded-full border border-line font-display font-bold`}
    >
      {name.charAt(0).toUpperCase()}
    </span>
  )
}