interface ModerationBannerProps {
  message: string
}

export default function ModerationBanner({ message }: ModerationBannerProps) {
  return (
    <div role="alert" className="rounded-lg bg-coral-soft text-coral px-4 py-3 text-sm">
      {message}
    </div>
  )
}