import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ShoppingCart, ChefHat, Utensils } from 'lucide-react'
import toast from 'react-hot-toast'
import { clsx } from 'clsx'
import useCartStore from '../store/cartStore'
import { FORMULA_PRICE } from '../data/menu'

const backdropVariants = {
  hidden: { opacity: 0 },
  show:   { opacity: 1 },
}

const sheetVariants = {
  hidden: { y: '100%', opacity: 0.8 },
  show:   { y: 0,      opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 32 } },
  exit:   { y: '100%', opacity: 0, transition: { duration: 0.25, ease: [0.4, 0, 1, 1] } },
}

export default function ProductModal({ product, onClose }) {
  const [size,    setSize]    = useState('simple') // smashs only
  const [formula, setFormula] = useState('solo')   // 'solo' | 'menu'

  const addItem = useCartStore((s) => s.addItem)

  // Reset choices whenever a different product is opened
  useEffect(() => {
    setSize('simple')
    setFormula('solo')
  }, [product?.id])

  const isSmash   = product?.category === 'smashs'
  const basePrice = isSmash && size === 'double'
    ? (product?.priceDouble ?? product?.price)
    : (product?.price ?? 0)
  const finalPrice = formula === 'menu' ? basePrice + FORMULA_PRICE : basePrice

  // Human-readable variant label stored in cart
  const variantParts = []
  if (isSmash && size === 'double') variantParts.push('Double')
  if (formula === 'menu')           variantParts.push('Menu Complet')
  const variantLabel = variantParts.join(' · ')

  const handleAdd = () => {
    addItem(product, { price: finalPrice, variantLabel })
    toast.success(
      `${product.name} ajouté${variantLabel ? ` (${variantLabel})` : ''} !`,
      { icon: '🍔' },
    )
    onClose()
  }

  return (
    <AnimatePresence>
      {product && (
        <>
          {/* Backdrop */}
          <motion.div
            key="modal-backdrop"
            variants={backdropVariants}
            initial="hidden"
            animate="show"
            exit="hidden"
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-zinc-950/80 backdrop-blur-sm"
          />

          {/* Bottom sheet */}
          <motion.div
            key={`modal-sheet-${product.id}`}
            variants={sheetVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            className="fixed bottom-0 left-0 right-0 z-50 max-h-[92svh] flex flex-col bg-zinc-900 rounded-t-3xl overflow-hidden shadow-2xl md:max-w-lg md:mx-auto md:left-0 md:right-0"
          >
            {/* Drag handle */}
            <div className="flex justify-center pt-3 pb-1 flex-shrink-0">
              <div className="w-10 h-1 rounded-full bg-zinc-700" />
            </div>

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-zinc-800/90 hover:bg-zinc-700 active:scale-90 transition-all duration-150"
              aria-label="Fermer"
            >
              <X className="w-4 h-4 text-zinc-300" />
            </button>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto overscroll-contain">

              {/* Hero image */}
              <div className="relative w-full aspect-[16/9] bg-zinc-800 flex-shrink-0">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                    e.currentTarget.parentElement.classList.add('flex', 'items-center', 'justify-center')
                    const emoji = document.createElement('span')
                    emoji.textContent = '🍔'
                    emoji.style.fontSize = '4rem'
                    e.currentTarget.parentElement.appendChild(emoji)
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 via-transparent to-transparent" />
                {product.badge === 'new' && (
                  <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-amber-500 text-zinc-950 text-[10px] font-black uppercase tracking-wider">
                    Nouveauté
                  </span>
                )}
              </div>

              {/* Body */}
              <div className="px-5 pt-4 pb-2">

                {/* Name */}
                <h2 className="text-zinc-100 text-2xl font-black leading-tight mb-5">
                  {product.name}
                </h2>

                {/* ── TAILLE (Smashs only) ───────────────────────── */}
                {isSmash && (
                  <div className="mb-5">
                    <p className="text-zinc-500 text-xs font-semibold uppercase tracking-widest mb-2.5">
                      Taille
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { id: 'simple', label: 'Simple',  price: product.price },
                        { id: 'double', label: 'Double',  price: product.priceDouble },
                      ].map(({ id, label, price }) => (
                        <button
                          key={id}
                          onClick={() => setSize(id)}
                          className={clsx(
                            'flex flex-col items-center py-3.5 rounded-2xl border-2 transition-all duration-150',
                            size === id
                              ? 'border-amber-500 bg-amber-500/10'
                              : 'border-zinc-700 bg-zinc-800/60 hover:border-zinc-600',
                          )}
                        >
                          <span className={clsx('font-bold text-sm', size === id ? 'text-amber-400' : 'text-zinc-300')}>
                            {label}
                          </span>
                          <span className={clsx('font-black text-lg mt-0.5', size === id ? 'text-amber-500' : 'text-zinc-400')}>
                            {price?.toFixed(2)}€
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* ── FORMULE (Solo / Menu) ───────────────────────── */}
                <div className="mb-5">
                  <p className="text-zinc-500 text-xs font-semibold uppercase tracking-widest mb-2.5">
                    Formule
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {/* SOLO */}
                    <button
                      onClick={() => setFormula('solo')}
                      className={clsx(
                        'flex flex-col items-center py-3.5 rounded-2xl border-2 transition-all duration-150',
                        formula === 'solo'
                          ? 'border-amber-500 bg-amber-500/10'
                          : 'border-zinc-700 bg-zinc-800/60 hover:border-zinc-600',
                      )}
                    >
                      <span className={clsx('font-black text-sm uppercase tracking-wide', formula === 'solo' ? 'text-amber-400' : 'text-zinc-300')}>
                        Solo
                      </span>
                      <span className={clsx('text-xs mt-1', formula === 'solo' ? 'text-amber-500/70' : 'text-zinc-500')}>
                        Burger seul
                      </span>
                    </button>

                    {/* MENU BEST-SELLER */}
                    <button
                      onClick={() => setFormula('menu')}
                      className={clsx(
                        'flex flex-col items-center py-3.5 rounded-2xl border-2 transition-all duration-150',
                        formula === 'menu'
                          ? 'border-amber-500 bg-amber-500/10'
                          : 'border-zinc-700 bg-zinc-800/60 hover:border-zinc-600',
                      )}
                    >
                      <span className={clsx('font-black text-sm uppercase tracking-wide', formula === 'menu' ? 'text-amber-400' : 'text-zinc-300')}>
                        Menu
                      </span>
                      <span className={clsx('text-xs font-semibold mt-0.5', formula === 'menu' ? 'text-amber-500' : 'text-zinc-500')}>
                        +{FORMULA_PRICE.toFixed(2)}€
                      </span>
                    </button>
                  </div>

                  {/* Menu detail line */}
                  <AnimatePresence>
                    {formula === 'menu' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-2.5 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-amber-500/8 border border-amber-500/20">
                          <Utensils className="w-3.5 h-3.5 text-amber-500/80 flex-shrink-0" />
                          <p className="text-amber-400/90 text-xs font-medium text-center">
                            Inclus : Frites Maison + Sauce + Boisson 33cl
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* ── INGRÉDIENTS ──────────────────────────────────── */}
                <div className="mb-5">
                  <div className="flex items-center gap-2 mb-3">
                    <ChefHat className="w-4 h-4 text-amber-500" />
                    <span className="text-zinc-300 text-sm font-semibold uppercase tracking-wider">
                      Ingrédients
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.ingredients.map((ing, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 rounded-xl bg-zinc-800 text-zinc-300 text-sm border border-zinc-700/50"
                      >
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            </div>

            {/* CTA — sticky at bottom */}
            <div className="px-5 pt-3 pb-safe border-t border-zinc-800/80 bg-zinc-900 flex-shrink-0">
              <button
                onClick={handleAdd}
                className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-amber-500 hover:bg-amber-400 active:scale-[0.98] transition-all duration-150 shadow-lg shadow-amber-500/30"
              >
                <ShoppingCart className="w-5 h-5 text-zinc-950" />
                <span className="text-zinc-950 font-bold text-base">
                  Ajouter au panier —{' '}
                  <motion.span
                    key={finalPrice}
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.18 }}
                    className="inline-block"
                  >
                    {finalPrice.toFixed(2)}€
                  </motion.span>
                </span>
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
