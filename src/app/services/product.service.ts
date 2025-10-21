import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

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
    this.http.get(this.baseUrl + this.relativeUrl);
  }

}
