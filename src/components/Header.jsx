import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart } from 'lucide-react'
import useCartStore, { selectItemCount } from '../store/cartStore'

export default function Header() {
  const itemCount  = useCartStore(selectItemCount)
  const toggleCart = useCartStore((s) => s.toggleCart)

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800/60">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-2"
        >
          <span className="text-2xl">🍔</span>
          <span className="text-xl font-black tracking-tight">
            <span className="text-amber-500">MY</span>
            <span className="text-zinc-100"> BURGER</span>
          </span>
        </motion.div>

        {/* Cart button */}
        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          onClick={toggleCart}
          className="relative p-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 active:scale-95 transition-all duration-150 border border-zinc-800"
          aria-label={`Panier — ${itemCount} article${itemCount > 1 ? 's' : ''}`}
        >
          <ShoppingCart className="w-5 h-5 text-zinc-300" />

          <AnimatePresence>
            {itemCount > 0 && (
              <motion.span
                key={itemCount}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 600, damping: 20 }}
                className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 flex items-center justify-center rounded-full bg-amber-500 text-zinc-950 text-[10px] font-bold leading-none"
              >
                {itemCount > 99 ? '99+' : itemCount}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </header>
  )
}
