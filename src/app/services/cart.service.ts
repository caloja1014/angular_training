import { computed, Injectable, signal } from '@angular/core';
import { Product } from '../models/products.model';
import { ProductCart } from '../models/product-cart.model';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { v4 as uuidv4 } from 'uuid';
import { BehaviorSubject, catchError, finalize, firstValueFrom, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart = signal<ProductCart | undefined>(undefined);
  private readonly cartSubject = new BehaviorSubject<ProductCart | undefined>(undefined);
  private readonly loadingSubject = new BehaviorSubject<boolean>(false);
  private readonly errorSubject = new BehaviorSubject<string | null>(null);

  private relativeUrl = '/cart';
  private baseUrl;

  getQuantity = computed(() => {
    if (this.cart() && this.cart()?.CartItems) {
      return this.cart()?.CartItems?.reduce((total, item) => total + item.quantity, 0);
    }
    return 0;
  });

  // Observables (store selectors)
  readonly cart$ = this.cartSubject.asObservable();
  readonly loading$ = this.loadingSubject.asObservable();
  readonly error$ = this.errorSubject.asObservable();
  readonly quantity$ = this.cart$.pipe(
    map((c) => (c?.CartItems ?? []).reduce((t, i) => t + i.quantity, 0))
  );
  readonly total$ = this.cart$.pipe(
    map((c) => (c?.CartItems ?? []).reduce((t, i) => t + i.Product.price * i.quantity, 0))
  );
  constructor(
    private http: HttpClient
  ) {
    this.baseUrl = environment.apiUrl;
  }

  async addToCart(product: Product) {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);
    let currentCart = this.cart();
    if (!currentCart) {
      try {
        currentCart = await this.createCart();
        this.cart.set(currentCart);
        this.cartSubject.next(currentCart);
      } catch (err: any) {
        this.errorSubject.next(err?.message ?? 'Failed to create cart');
        this.loadingSubject.next(false);
        return;
      }
    }
    try {
      const itemAdded = await firstValueFrom(this.http.post<any>(`${this.baseUrl}${this.relativeUrl}/${currentCart?.id}/items`, {
        productId: product.id,
        quantity: 1,
      }));

      if (!!itemAdded) {
        const updatedCart = await this.getCart();
        this.cart.set(updatedCart);
        this.cartSubject.next(updatedCart);
      }
    } catch (err: any) {
      this.errorSubject.next(err?.message ?? 'Failed to add to cart');
    } finally {
      this.loadingSubject.next(false);
    }

  }
  async removeFromCart(itemId: number) {
    try {
      this.loadingSubject.next(true);
      this.errorSubject.next(null);
      const res = await firstValueFrom(this.http.post(`${this.baseUrl}${this.relativeUrl}/${this.cart()?.id}/items/${itemId}`, {}));

      const updatedCart = await this.getCart();
      this.cart.set(updatedCart);
      this.cartSubject.next(updatedCart);
    } catch (error) {
      console.error('Error removing item from cart', error);
      this.errorSubject.next('Failed to remove item from cart');
    } finally {
      this.loadingSubject.next(false);
    }
  }
  getTotal() {
    if (this.cart() && this.cart()?.CartItems) {
      return this.cart()?.CartItems?.reduce((total, item) => total + (item.Product.price * item.quantity), 0);
    }
    return 0;
  }



  async getCart() {
    const result = await firstValueFrom(this.http.get<ProductCart>(`${this.baseUrl}${this.relativeUrl}/${this.cart()?.id}`));
    return result;
  }

  createCart() {
    return firstValueFrom(this.http.post<ProductCart>(`${this.baseUrl}${this.relativeUrl}`, {
      userName: uuidv4(),
    }));
  }

  async loadCart() {
    try {
      this.loadingSubject.next(true);
      this.errorSubject.next(null);
      const updatedCart = await this.getCart();
      this.cart.set(updatedCart);
      this.cartSubject.next(updatedCart);
    } catch (err: any) {
      this.errorSubject.next(err?.message ?? 'Failed to load cart');
    } finally {
      this.loadingSubject.next(false);
    }
  }
}
