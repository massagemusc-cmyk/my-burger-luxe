import { motion } from 'framer-motion'
import { clsx } from 'clsx'
import { categories } from '../data/menu'

export default function FilterBar({ active, onChange }) {
  return (
    <div className="sticky top-14 z-30 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800/60 px-4 py-3">
      <div className="max-w-5xl mx-auto flex gap-2 overflow-x-auto scrollbar-hide">
        {categories.map((cat) => {
          const isActive = active === cat.id
          return (
            <button
              key={cat.id}
              onClick={() => onChange(cat.id)}
              className={clsx(
                'relative flex-shrink-0 px-5 py-2 rounded-xl text-sm font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500',
                isActive
                  ? 'text-zinc-950'
                  : 'text-zinc-400 hover:text-zinc-200 bg-zinc-900 hover:bg-zinc-800',
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="filter-pill"
                  className="absolute inset-0 rounded-xl bg-amber-500"
                  style={{ zIndex: -1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              {cat.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
