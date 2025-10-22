import { Injectable, inject } from '@angular/core';
import { Product } from '../models/products.model';
import { Store } from '@ngrx/store';
import { CartActions } from '../store/cart/cart.actions';
import {
  selectCartData,
  selectCartItems,
  selectCartLoadingState,
  selectCartQuantity,
  selectCartTotal
} from '../store/cart/cart.selectors';
import { ProductCart } from '../models/product-cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly store = inject(Store);

  readonly cart = this.store.selectSignal(selectCartData);
  readonly items = this.store.selectSignal(selectCartItems);
  readonly loading = this.store.selectSignal(selectCartLoadingState);
  readonly getQuantity = this.store.selectSignal(selectCartQuantity);
  private readonly totalSignal = this.store.selectSignal(selectCartTotal);

  addToCart(product: Product, quantity = 1) {
    this.store.dispatch(CartActions.addItem({ product, quantity }));
  }

  removeFromCart(itemId: number) {
    this.store.dispatch(CartActions.removeItem({ itemId }));
  }

  restoreCart(cart: ProductCart) {
    this.store.dispatch(CartActions.restoreCart({ cart }));
  }

  clearCart() {
    this.store.dispatch(CartActions.clearCart());
  }

  getTotal() {
    return this.totalSignal();
  }
}
