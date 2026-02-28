import { create } from 'zustand'

const useCartStore = create((set, get) => ({
  items: [],
  isOpen: false,

  // ── Actions ──────────────────────────────────────────────────────────────

  /**
   * @param {object} product
   * @param {{ price?: number, variantLabel?: string }} options
   *   price        – pre-computed final price (size + formula)
   *   variantLabel – human-readable variant shown in cart (e.g. "Double · Menu Complet")
   */
  addItem: (product, { price, variantLabel = '' } = {}) => {
    const finalPrice = price ?? product.price
    const cartId     = `${product.id}-${variantLabel || 'base'}`

    set((state) => {
      const existing = state.items.find((i) => i.cartId === cartId)
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.cartId === cartId ? { ...i, quantity: i.quantity + 1 } : i,
          ),
        }
      }
      return {
        items: [
          ...state.items,
          { ...product, price: finalPrice, variantLabel, quantity: 1, cartId },
        ],
      }
    })
  },

  removeItem: (cartId) =>
    set((state) => ({
      items: state.items.filter((i) => i.cartId !== cartId),
    })),

  updateQuantity: (cartId, quantity) => {
    if (quantity <= 0) {
      get().removeItem(cartId)
      return
    }
    set((state) => ({
      items: state.items.map((i) =>
        i.cartId === cartId ? { ...i, quantity } : i,
      ),
    }))
  },

  clearCart: () => set({ items: [] }),

  openCart:   () => set({ isOpen: true }),
  closeCart:  () => set({ isOpen: false }),
  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
}))

// ── Selectors ────────────────────────────────────────────────────────────────

export const selectItemCount = (state) =>
  state.items.reduce((sum, i) => sum + i.quantity, 0)

export const selectTotal = (state) =>
  state.items.reduce((sum, i) => sum + i.price * i.quantity, 0)

export default useCartStore
