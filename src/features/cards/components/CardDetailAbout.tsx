interface CardDetailAboutProps {
  description: string
}

export default function CardDetailAbout({ description }: CardDetailAboutProps) {
  return (
    <section className="flex flex-col gap-2 border-t border-line pt-5">
      <h2 className="font-body text-xs font-medium uppercase tracking-widest text-ink-muted">Sobre este favor</h2>
      <p className="font-body text-base leading-relaxed text-ink">{description}</p>
    </section>
  )
}