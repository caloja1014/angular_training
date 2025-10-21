
export interface ProductCart {
  id: number
  userName: string
  createdAt: string
  updatedAt: string
  CartItems: CartItem[]
  total: number
}

export interface CartItem {
  id: number
  quantity: number
  createdAt: string
  updatedAt: string
  CartId: number
  ProductId: number
  Product: Product
}

export interface Product {
  id: number
  name: string
  description: string
  price: number
  imageUrl: any
  createdAt: string
  updatedAt: string
  CategoryId: number
}
