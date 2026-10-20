import { BadgeCheck } from 'lucide-react'
import Avatar from '../../../components/ui/Avatar'
import type { PublicProfile } from '../types/profile.types'

interface ProfileSummaryProps {
  profile: PublicProfile
}

export default function ProfileSummary({ profile }: ProfileSummaryProps) {
  return (
    <section className="flex flex-col items-center gap-3">
      <Avatar name={profile.name} avatar={profile.avatar} />
      <h1 className="font-display font-bold text-ink text-xl">{profile.name}</h1>
      {profile.verified && (
        <p className="flex items-center gap-1 font-body text-sm text-teal">
          <BadgeCheck size={16} aria-hidden="true" />
          Identidad verificada
        </p>
      )}
      <dl className="grid w-full grid-cols-2 gap-3">
        <div className="rounded-2xl bg-teal-soft p-4">
          <dt className="font-body text-xs text-ink/70">Valoración media</dt>
          <dd className="font-data text-ink">
            {profile.ratingAverage === null ? 'Sin valoraciones' : `${profile.ratingAverage.toFixed(1)} de 5`}
          </dd>
        </div>
        <div className="rounded-2xl bg-teal-soft p-4">
          <dt className="font-body text-xs text-ink/70">Intercambios</dt>
          <dd className="font-data text-ink">{profile.exchangeCount}</dd>
        </div>
      </dl>
    </section>
  )
}