"use client"

import { createContext, useContext, useMemo, useState } from "react"

export type CartItem = {
  id: number
  name: string
  price: number
  image?: string
  selectedSize: string
  selectedColor: string
  selectedRise?: "alto" | "bajo"
  quantity: number
}

type CartContextType = {
  items: CartItem[]
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void
  updateQuantity: (key: string, quantity: number) => void
  removeItem: (key: string) => void
  clear: () => void
  count: number
  subtotal: number
  keyFor: (item: CartItemKeyParts) => string
}

const CartContext = createContext<CartContextType | null>(null)

type CartItemKeyParts = Pick<CartItem, "id" | "selectedSize" | "selectedColor"> & Partial<Pick<CartItem, "selectedRise">>

function useCartState() {
  const [items, setItems] = useState<CartItem[]>([])

  const keyFor = (item: CartItemKeyParts) =>
    `${item.id}__${item.selectedSize}__${item.selectedColor}__${item.selectedRise ?? ""}`

  const addItem = (item: Omit<CartItem, "quantity">, quantity = 1) => {
    const key = keyFor(item)
    setItems((prev) => {
      const idx = prev.findIndex((i) => keyFor(i) === key)
      if (idx >= 0) {
        const next = [...prev]
        next[idx] = { ...next[idx], quantity: next[idx].quantity + quantity }
        return next
      }
      return [...prev, { ...item, quantity }]
    })
  }

  const updateQuantity = (key: string, quantity: number) => {
    setItems((prev) => {
      const idx = prev.findIndex((i) => keyFor(i) === key)
      if (idx < 0) return prev
      const next = [...prev]
      if (quantity <= 0) {
        next.splice(idx, 1)
      } else {
        next[idx] = { ...next[idx], quantity }
      }
      return next
    })
  }

  const removeItem = (key: string) => {
    setItems((prev) => prev.filter((i) => keyFor(i) !== key))
  }

  const clear = () => setItems([])

  const subtotal = useMemo(() => items.reduce((sum, item) => sum + item.price * item.quantity, 0), [items])
  const count = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items])

  return { items, addItem, updateQuantity, removeItem, clear, subtotal, count, keyFor }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const value = useCartState()
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used within CartProvider")
  return ctx
}
