import { Injectable, signal } from '@angular/core';
import { Product } from '../models/products.model';
import { ProductCart } from '../models/product-cart.model';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart = signal<ProductCart[]>([]);
  private relativeUrl = '/cart';
  private baseUrl;
  constructor(
    private http: HttpClient
  ) {
    this.baseUrl = environment.apiUrl;
  }

  addToCart(product: Product) {
    const productInCart = this.cart().find(p => p.product.id === product.id);
    if (productInCart) {
      productInCart.quantity += 1;
      this.cart.update((currentCart) => [...currentCart]);
    }
    else {
      this.cart.update((currentCart) => [...currentCart, { product, quantity: 1 }]);
    }
  }
  removeFromCart(productId: number) {
    this.cart.update((currentCart) => currentCart.filter(p => p.product.id !== productId));
  }
  getTotal() {
    return this.cart().reduce((total, item) => total + (item.product.price * item.quantity), 0);
  }
  getQuantity() {
    return this.cart().reduce((total, item) => total + item.quantity, 0);
  }
}
