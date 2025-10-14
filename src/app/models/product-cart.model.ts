import { Product } from "./products.model";

export interface ProductCart {
  product: Product;
  quantity: number;
}

