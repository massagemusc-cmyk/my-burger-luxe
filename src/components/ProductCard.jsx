import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'

export default function ProductCard({ product, onClick }) {
  const isSmash = product.category === 'smashs'

  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClick}
      className="group relative bg-zinc-900 rounded-2xl overflow-hidden cursor-pointer border border-zinc-800 hover:border-zinc-700 active:scale-[0.98] transition-all duration-200 shadow-sm hover:shadow-amber-500/5 hover:shadow-lg"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-zinc-800">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          onError={(e) => {
            e.currentTarget.style.display = 'none'
            e.currentTarget.parentElement.classList.add('flex', 'items-center', 'justify-center')
            const emoji = document.createElement('span')
            emoji.textContent = '🍔'
            emoji.style.fontSize = '3rem'
            e.currentTarget.parentElement.appendChild(emoji)
          }}
        />

        {/* Category badge — top left */}
        <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-zinc-950/80 text-zinc-400 text-[10px] font-semibold uppercase tracking-wider backdrop-blur-sm">
          {isSmash ? 'Smash' : 'Signature'}
        </span>

        {/* NOUVEAUTÉ badge — top right */}
        {product.badge === 'new' && (
          <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-amber-500 text-zinc-950 text-[10px] font-black uppercase tracking-wider">
            Nouveauté
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-3.5 flex items-end justify-between gap-2">
        <div className="min-w-0">
          <h3 className="text-zinc-100 font-semibold text-sm leading-tight truncate">
            {product.name}
          </h3>
          <p className="text-amber-500 font-bold text-base mt-0.5">
            {isSmash ? `dès ${product.price.toFixed(2)}€` : `${product.price.toFixed(2)}€`}
          </p>
        </div>

        <div className="flex-shrink-0 w-8 h-8 rounded-xl bg-amber-500 group-hover:bg-amber-400 flex items-center justify-center transition-colors duration-150 shadow-md shadow-amber-500/30">
          <Plus className="w-4 h-4 text-zinc-950" strokeWidth={2.5} />
        </div>
      </div>
    </motion.article>
  )
}
