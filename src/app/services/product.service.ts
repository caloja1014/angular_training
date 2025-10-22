import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Product } from '../models/products.model';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private relativeUrl = '/products';
  private baseUrl;
  constructor(
    private http: HttpClient
  ) {
    this.baseUrl = environment.apiUrl;
  }

  getProducts() {
    return firstValueFrom(this.http.get<Product[]>(this.baseUrl + this.relativeUrl));
  }

}
