interface ChatAvatarProps {
  name: string
  avatar: string
}

export default function ChatAvatar({ name, avatar }: ChatAvatarProps) {
  if (avatar) {
    return <img src={avatar} alt="" className="size-10 shrink-0 rounded-full object-cover" />
  }

  return (
    <span
      aria-hidden="true"
      className="flex size-10 shrink-0 items-center justify-center rounded-full bg-teal-soft font-display font-bold text-teal"
    >
      {name.charAt(0).toUpperCase()}
    </span>
  )
}