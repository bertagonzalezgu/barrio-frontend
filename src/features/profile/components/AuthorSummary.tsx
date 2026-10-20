import { Link } from 'react-router-dom'
import Avatar from '../../../components/ui/Avatar'
import { useUserProfile } from '../hooks/useUserProfile'
import { formatMemberSince } from '../utils/formatMemberSince'
import type { PublicProfile } from '../types/profile.types'
import RatingAverage from './RatingAverage'

interface AuthorSummaryProps {
  author: Pick<PublicProfile, 'id' | 'name' | 'avatar'>
}

export default function AuthorSummary({ author }: AuthorSummaryProps) {
  const { data: profile } = useUserProfile(author.id)

  return (
    <section
      aria-label="Publicado por"
      className="flex items-center gap-3 rounded-2xl border border-ink/10 bg-white px-4 py-3"
    >
      <Avatar name={author.name} avatar={author.avatar} />
      <div className="flex min-w-0 flex-col gap-1">
        <div className="flex flex-wrap items-center gap-2">
          <Link
            to={`/perfil/${author.id}`}
            className="font-display font-bold text-ink hover:underline focus-visible:outline-2 focus-visible:outline-teal"
          >
            {author.name}
          </Link>
          {profile?.verified && (
            <span className="rounded-md border border-teal px-1.5 py-0.5 font-body text-[10px] font-medium uppercase tracking-widest text-teal">
              Identidad verificada
            </span>
          )}
        </div>
        {profile && (
          <>
            <p className="font-data text-xs text-ink/70">
              <RatingAverage average={profile.ratingAverage} />
            </p>
            <p className="font-body text-xs text-ink/70">
              {`En la plataforma ${formatMemberSince(profile.createdAt)} · ${profile.exchangeCount} ${
                profile.exchangeCount === 1 ? 'intercambio' : 'intercambios'
              }`}
            </p>
          </>
        )}
      </div>
    </section>
  )
}