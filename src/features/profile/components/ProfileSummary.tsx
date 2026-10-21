import { BadgeCheck } from 'lucide-react'
import Avatar from '../../../components/ui/Avatar'
import type { PublicProfile } from '../types/profile.types'
import RatingAverage from './RatingAverage'

interface ProfileSummaryProps {
  profile: PublicProfile
}

export default function ProfileSummary({ profile }: ProfileSummaryProps) {
  const exchanges = `${profile.exchangeCount} ${profile.exchangeCount === 1 ? 'intercambio' : 'intercambios'}`

  return (
    <section className="flex flex-col items-center gap-3 text-center">
      <Avatar name={profile.name} avatar={profile.avatar} size="lg" />
      <h1 className="font-display text-h4 font-bold text-ink">{profile.name}</h1>
      <p className="flex items-center gap-2 font-display tabular-nums text-xs text-ink-muted">
        <RatingAverage average={profile.ratingAverage} />
        <span aria-hidden="true">·</span>
        <span>{exchanges}</span>
      </p>
      {profile.verified && (
        <p className="flex items-center gap-1 rounded-full bg-primary-tint px-3 py-1 font-body text-xs text-primary">
          <BadgeCheck size={14} aria-hidden="true" />
          Identidad verificada
        </p>
      )}
    </section>
  )
}