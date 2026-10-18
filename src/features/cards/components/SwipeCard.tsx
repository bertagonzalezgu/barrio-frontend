import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import type { Card } from '../types/card.types'
import type { SwipeDirection } from '../hooks/useSwipe'
import { getCategoryLabel } from '../utils/getCategoryLabel'
import CardIcon from './CardIcon'

interface Props {
  card: Card
  onSwipe: (direction: SwipeDirection) => void
  onOpen: () => void
}

const SWIPE_THRESHOLD = 100

export default function SwipeCard({ card, onSwipe, onOpen }: Props) {
  const x = useMotionValue(0)
  const rotate = useTransform(x, [-200, 200], [-15, 15])
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0])

  const categoryLabel = getCategoryLabel(card.category)
  const isRequest = card.type === 'request'

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

  function handleClick() {
    if (Math.abs(x.get()) > 5) return
    onOpen()
  }

  return (
    <motion.div
      style={{ x, rotate, opacity }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      onClick={handleClick}
      className="absolute inset-0 rounded-3xl cursor-grab active:cursor-grabbing select-none shadow-xl flex flex-col p-6 bg-white"
    >
      <div className="flex items-center justify-between">
        <span className="text-[9px] font-body font-medium tracking-widest uppercase px-2 py-1 rounded-full bg-ink/10 text-ink/70">
          {categoryLabel}
        </span>
        <span className={`text-[9px] font-body font-medium tracking-widest uppercase px-2 py-1 rounded-full ${
          isRequest ? 'bg-teal text-paper' : 'bg-gold text-ink'
        }`}>
          {isRequest ? 'Busco' : 'Ofrezco'}
        </span>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <div className="w-30 h-30 drop-shadow-lg shadow-black">
          {card.icon && <CardIcon name={card.icon} className="w-full h-35 object-contain" />}
        </div>
      </div>

      <div className='w-full text-center pb-5'>
        <h2 className="font-body font-bold text-ink text-2xl leading-tight mb-4">
        {card.title}
        </h2>
      </div>
      
      <div className="border-t border-ink/10 pt-3 flex items-center justify-between">
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onOpen() }}
          className="text-xs font-body text-ink/70"
        >
          Ver detalle
        </button>
        <div className="w-11 h-11 rounded-full bg-ink flex items-center justify-center">
          <span className="font-data font-bold text-paper text-sm">{card.hours}h</span>
        </div>
      </div>
    </motion.div>
  )
}