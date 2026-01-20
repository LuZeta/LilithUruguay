export type ProductKey = "clasica" | "tiroAlto" | "pack"

export type ProductDefinition = {
  id: number
  name: string
  price: number
}

export const PRICE_UNIT = 2790
export const PRICE_PACK = 4490

export const PRODUCTS: Record<ProductKey, ProductDefinition> = {
  clasica: { id: 1, name: "Lilith Clásica", price: PRICE_UNIT },
  tiroAlto: { id: 2, name: "Lilith Tiro Alto", price: PRICE_UNIT },
  pack: { id: 3, name: "Pack x2 Lilith", price: PRICE_PACK },
}

const PRODUCTS_BY_ID = Object.values(PRODUCTS).reduce<Record<number, ProductDefinition>>((acc, product) => {
  acc[product.id] = product
  return acc
}, {})

export function getProductById(id: number) {
  return PRODUCTS_BY_ID[id]
}
