import { computed, Injectable, signal } from '@angular/core';
import { Product } from '../models/products.model';
import { ProductCart } from '../models/product-cart.model';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { v4 as uuidv4 } from 'uuid';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart = signal<ProductCart | undefined>(undefined);
  private relativeUrl = '/cart';
  private baseUrl;

  getQuantity = computed(() => {
    console.log('Getting quantity 2', this.cart());
    if (this.cart() && this.cart()?.CartItems) {
      return this.cart()?.CartItems?.reduce((total, item) => total + item.quantity, 0);
    }
    return 0;
  });
  constructor(
    private http: HttpClient
  ) {
    this.baseUrl = environment.apiUrl;
  }

  async addToCart(product: Product) {
    let currentCart = this.cart();
    if (!currentCart) {
      currentCart = await this.createCart();
      console.log('Created cart', currentCart);
      this.cart.set(currentCart);
    }
    const itemAdded = await firstValueFrom(this.http.post<any>(`${this.baseUrl}${this.relativeUrl}/${currentCart?.id}/items`, {
      productId: product.id,
      quantity: 1,
    }));

    if (!!itemAdded) {
      const updatedCart = await this.getCart();
      console.log('Updated cart', updatedCart);
      this.cart.set(updatedCart);
    }

  }
  async removeFromCart(itemId: number) {
    try {
      const res = await firstValueFrom(this.http.post(`${this.baseUrl}${this.relativeUrl}/${this.cart()?.id}/items/${itemId}`, {}));

      const updatedCart = await this.getCart();
      console.log('Updated cart after removal', updatedCart);
      this.cart.set(updatedCart);
    } catch (error) {
      console.error('Error removing item from cart', error);
    }
  }
  getTotal() {
    if (this.cart() && this.cart()?.CartItems) {
      return this.cart()?.CartItems?.reduce((total, item) => total + (item.Product.price * item.quantity), 0);
    }
    return 0;
  }



  async getCart() {

    return firstValueFrom(this.http.get<ProductCart>(`${this.baseUrl}${this.relativeUrl}/${this.cart()?.id}`));
  }

  createCart() {
    return firstValueFrom(this.http.post<ProductCart>(`${this.baseUrl}${this.relativeUrl}`, {
      userName: uuidv4(),
    }));
  }
}
