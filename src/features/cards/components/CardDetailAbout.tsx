interface CardDetailAboutProps {
  description: string
}

export default function CardDetailAbout({ description }: CardDetailAboutProps) {
  return (
    <section className="flex flex-col gap-2">
      <h2 className="font-display text-lg font-bold text-ink">Sobre este favor</h2>
      <p className="font-body text-sm leading-relaxed text-ink/70">{description}</p>
    </section>
  )
}