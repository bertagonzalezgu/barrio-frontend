import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import type { Card } from '../types/card.types'
import type { SwipeDirection } from '../hooks/useSwipe'
import { CARD_CATEGORIES } from '../types/card.types'
import CardIcon from './CardIcon'

interface Props {
  card: Card
  onSwipe: (direction: SwipeDirection) => void
}

const SWIPE_THRESHOLD = 100

export default function SwipeCard({ card, onSwipe }: Props) {
  const x = useMotionValue(0)
  const rotate = useTransform(x, [-200, 200], [-15, 15])
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0])

  const categoryLabel = CARD_CATEGORIES.find(c => c.value === card.category)?.label ?? card.category

  async function handleDragEnd() {
    const xVal = x.get()
    if (Math.abs(xVal) > SWIPE_THRESHOLD) {
      const direction = xVal > 0 ? 'right' : 'left'
      await animate(x, xVal > 0 ? 500 : -500, { duration: 0.2 })
      onSwipe(direction)
    } else {
      animate(x, 0, { type: 'spring', stiffness: 300 })
    }
  }

  return (
    <motion.div
      style={{ x, rotate, opacity }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      className="absolute inset-0 bg-teal-soft rounded-3xl border border-ink/10 shadow-sm cursor-grab active:cursor-grabbing select-none flex flex-col p-6"
    >
      {/* Categoría arriba */}
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-body font-medium tracking-wide uppercase text-teal bg-teal-soft px-2 py-1 rounded-full">
          {categoryLabel}
        </span>
        <span className="text-[10px] font-body font-normal tracking-wide uppercase text-white bg-teal px-2 py-1 rounded-full">
          {card.type === 'request' ? 'Busco' : 'Ofrezco'}
        </span>
      </div>

      {/* Icono central */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-40 h-40 rounded-full bg-teal-soft flex items-center justify-center p-8">
        {card.icon && <CardIcon name={card.icon} />}
        </div>
      </div>

      {/* Título + descripción + horas abajo */}
      <div className="flex flex-col gap-2">
        <h2 className="font-display font-bold text-ink text-2xl leading-tight">{card.title}</h2>
        <p className="font-body text-ink/60 text-sm leading-relaxed line-clamp-3">{card.description}</p>
        <div className="flex items-center justify-end mt-2 pt-3">
          <span className="font-data font-bold text-teal text-xl">{card.hours}h</span>
        </div>
      </div>
    </motion.div>
  )
}