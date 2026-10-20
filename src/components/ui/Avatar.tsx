interface AvatarProps {
  name: string
  avatar: string
  size?: 'md' | 'lg'
}

const IMAGE_SIZE = { md: 'size-10', lg: 'size-24' }
const INITIAL_STYLE = {
  md: 'size-10 bg-teal-soft text-teal',
  lg: 'size-24 bg-gold text-ink text-4xl',
}

export default function Avatar({ name, avatar, size = 'md' }: AvatarProps) {
  if (avatar) {
    return <img src={avatar} alt="" className={`${IMAGE_SIZE[size]} shrink-0 rounded-full object-cover`} />
  }

  return (
    <span
      aria-hidden="true"
      className={`${INITIAL_STYLE[size]} flex shrink-0 items-center justify-center rounded-full font-display font-bold`}
    >
      {name.charAt(0).toUpperCase()}
    </span>
  )
}