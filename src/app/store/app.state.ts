import { cartFeatureName, CartState } from './cart/cart.reducer';
import { productsFeatureName, ProductsState } from './products/products.reducer';

export interface AppState {
  [cartFeatureName]: CartState;
  [productsFeatureName]: ProductsState;
}
