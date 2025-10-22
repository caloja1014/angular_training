import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { environment } from '../../environments/environment';
import { ProductCart } from '../models/product-cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartApiService {
  private readonly relativeUrl = '/cart';
  private readonly baseUrl = environment.apiUrl;

  constructor(private readonly http: HttpClient) {}

  createCart() {
    return this.http.post<ProductCart>(`${this.baseUrl}${this.relativeUrl}`, {
      userName: uuidv4()
    });
  }

  getCart(cartId: number) {
    return this.http.get<ProductCart>(`${this.baseUrl}${this.relativeUrl}/${cartId}`);
  }

  addItem(cartId: number, productId: number, quantity = 1) {
    return this.http.post<void>(`${this.baseUrl}${this.relativeUrl}/${cartId}/items`, {
      productId,
      quantity
    });
  }

  removeItem(cartId: number, itemId: number) {
    return this.http.post<void>(`${this.baseUrl}${this.relativeUrl}/${cartId}/items/${itemId}`, {});
  }
}
