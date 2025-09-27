"use client"

import { createContext, useContext, useEffect, useMemo, useState } from "react"

export type CartItem = {
  id: number
  name: string
  price: number
  image?: string
  selectedSize: string
  selectedColor: string
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
  keyFor: (item: Pick<CartItem, "id" | "selectedSize" | "selectedColor">) => string
}

const CartContext = createContext<CartContextType | null>(null)

const STORAGE_KEY = "lilith_cart_v1"

function useLocalStorageCart() {
  const [items, setItems] = useState<CartItem[]>([])

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setItems(JSON.parse(raw))
    } catch {
      // ignore parse/storage errors
    }
  }, [])

  // Persist on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      // ignore storage errors
    }
  }, [items])

  const keyFor = (item: Pick<CartItem, "id" | "selectedSize" | "selectedColor">) =>
    `${item.id}__${item.selectedSize}__${item.selectedColor}`

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

  const subtotal = useMemo(() => items.reduce((sum, i) => sum + i.price * i.quantity, 0), [items])
  const count = useMemo(() => items.reduce((sum, i) => sum + i.quantity, 0), [items])

  return { items, addItem, updateQuantity, removeItem, clear, subtotal, count, keyFor }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const value = useLocalStorageCart()
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used within CartProvider")
  return ctx
}

