import { motion, AnimatePresence } from 'framer-motion'
import { X, Trash2, ShoppingBag, Plus, Minus } from 'lucide-react'
import toast from 'react-hot-toast'
import useCartStore, { selectTotal } from '../store/cartStore'

const drawerVariants = {
  hidden: { x: '100%', opacity: 0 },
  show:   { x: 0,      opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 32 } },
  exit:   { x: '100%', opacity: 0, transition: { duration: 0.25, ease: [0.4, 0, 1, 1] } },
}

function CartItem({ item, onIncrease, onDecrease, onRemove }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20, transition: { duration: 0.2 } }}
      className="flex items-center gap-3 py-4 border-b border-zinc-800/80 last:border-0"
    >
      {/* Thumbnail */}
      <div className="w-14 h-14 rounded-xl overflow-hidden bg-zinc-800 flex-shrink-0">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.style.display = 'none'
            e.currentTarget.parentElement.classList.add('flex','items-center','justify-center')
            e.currentTarget.parentElement.textContent = '🍔'
          }}
        />
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <p className="text-zinc-100 font-semibold text-sm truncate">{item.name}</p>
        {item.variantLabel && (
          <p className="text-amber-500/70 text-xs font-medium">{item.variantLabel}</p>
        )}
        <p className="text-amber-500 font-bold text-sm mt-0.5">
          {(item.price * item.quantity).toFixed(2)}€
        </p>
      </div>

      {/* Quantity controls */}
      <div className="flex items-center gap-1.5 flex-shrink-0">
        <button
          onClick={onDecrease}
          className="w-7 h-7 rounded-lg bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center active:scale-90 transition-all duration-150"
          aria-label="Diminuer"
        >
          <Minus className="w-3 h-3 text-zinc-300" />
        </button>
        <span className="w-5 text-center text-zinc-100 font-semibold text-sm">
          {item.quantity}
        </span>
        <button
          onClick={onIncrease}
          className="w-7 h-7 rounded-lg bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center active:scale-90 transition-all duration-150"
          aria-label="Augmenter"
        >
          <Plus className="w-3 h-3 text-zinc-300" />
        </button>

        <button
          onClick={onRemove}
          className="w-7 h-7 rounded-lg bg-red-500/10 hover:bg-red-500/20 flex items-center justify-center active:scale-90 transition-all duration-150 ml-1"
          aria-label="Supprimer"
        >
          <Trash2 className="w-3 h-3 text-red-400" />
        </button>
      </div>
    </motion.div>
  )
}

export default function CartDrawer() {
  const isOpen        = useCartStore((s) => s.isOpen)
  const items         = useCartStore((s) => s.items)
  const total         = useCartStore(selectTotal)
  const closeCart     = useCartStore((s) => s.closeCart)
  const updateQuantity = useCartStore((s) => s.updateQuantity)
  const removeItem    = useCartStore((s) => s.removeItem)
  const clearCart     = useCartStore((s) => s.clearCart)

  const handleOrder = () => {
    toast.success('Commande envoyée ! On prépare ça. 🍔', { duration: 3500 })
    clearCart()
    closeCart()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="cart-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeCart}
            className="fixed inset-0 z-50 bg-zinc-950/80 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            key="cart-drawer"
            variants={drawerVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-sm flex flex-col bg-zinc-900 shadow-2xl border-l border-zinc-800"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-800 flex-shrink-0">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-amber-500" />
                <h2 className="text-zinc-100 font-bold text-lg">Mon Panier</h2>
                {items.length > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-500 text-xs font-bold">
                    {items.reduce((s, i) => s + i.quantity, 0)}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                {items.length > 0 && (
                  <button
                    onClick={clearCart}
                    className="text-xs text-zinc-500 hover:text-red-400 transition-colors font-medium px-2 py-1 rounded-lg hover:bg-red-500/10"
                  >
                    Vider
                  </button>
                )}
                <button
                  onClick={closeCart}
                  className="w-9 h-9 flex items-center justify-center rounded-xl bg-zinc-800 hover:bg-zinc-700 active:scale-90 transition-all duration-150"
                  aria-label="Fermer le panier"
                >
                  <X className="w-4 h-4 text-zinc-300" />
                </button>
              </div>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto overscroll-contain px-5">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <div className="text-5xl mb-4">🛒</div>
                  <p className="text-zinc-400 font-medium">Votre panier est vide</p>
                  <p className="text-zinc-600 text-sm mt-1">
                    Ajoutez des burgers depuis le menu
                  </p>
                  <button
                    onClick={closeCart}
                    className="mt-6 px-5 py-2.5 rounded-xl bg-amber-500/15 text-amber-500 font-semibold text-sm hover:bg-amber-500/25 transition-colors"
                  >
                    Voir le menu
                  </button>
                </div>
              ) : (
                <AnimatePresence initial={false}>
                  {items.map((item) => (
                    <CartItem
                      key={item.cartId}
                      item={item}
                      onIncrease={() => updateQuantity(item.cartId, item.quantity + 1)}
                      onDecrease={() => updateQuantity(item.cartId, item.quantity - 1)}
                      onRemove={() => removeItem(item.cartId)}
                    />
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-5 pt-4 pb-safe border-t border-zinc-800 bg-zinc-900 flex-shrink-0">
                {/* Subtotals info */}
                <div className="flex justify-between items-center mb-1">
                  <span className="text-zinc-400 text-sm">
                    {items.reduce((s, i) => s + i.quantity, 0)} article
                    {items.reduce((s, i) => s + i.quantity, 0) > 1 ? 's' : ''}
                  </span>
                  <span className="text-zinc-400 text-sm">
                    Sous-total: {total.toFixed(2)}€
                  </span>
                </div>

                {/* Total */}
                <div className="flex justify-between items-center mb-4">
                  <span className="text-zinc-100 font-bold text-lg">Total</span>
                  <span className="text-amber-500 font-black text-2xl">
                    {total.toFixed(2)}€
                  </span>
                </div>

                <button
                  onClick={handleOrder}
                  className="w-full py-4 rounded-2xl bg-amber-500 hover:bg-amber-400 active:scale-[0.98] transition-all duration-150 text-zinc-950 font-bold text-base shadow-lg shadow-amber-500/30"
                >
                  Commander maintenant
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
