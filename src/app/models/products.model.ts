export interface Product {
  id: number
  name: string
  description: string
  price: number
  imageUrl?: string
  createdAt: string
  updatedAt: string
  CategoryId?: number
  Category?: Category
  Inventory?: Inventory
}

export interface Category {
  id: number
  name: string
  createdAt: string
  updatedAt: string
}

export interface Inventory {
  id: number
  stock: number
  createdAt: string
  updatedAt: string
  ProductId: number
}
