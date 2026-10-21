interface ModerationBannerProps {
  message: string
}

export default function ModerationBanner({ message }: ModerationBannerProps) {
  return (
    <div role="alert" className="alert-error">
      {message}
    </div>
  )
}