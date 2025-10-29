import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Product } from '../models/products.model';
import { BehaviorSubject, Observable, catchError, finalize, map, of, shareReplay, tap, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private relativeUrl = '/products';
  private baseUrl;
  // Store state
  private readonly productsSubject = new BehaviorSubject<Product[]>([]);
  private readonly loadingSubject = new BehaviorSubject<boolean>(false);
  private readonly errorSubject = new BehaviorSubject<string | null>(null);

  // Public selectors
  readonly products$ = this.productsSubject.asObservable();
  readonly loading$ = this.loadingSubject.asObservable();
  readonly error$ = this.errorSubject.asObservable();

  constructor(
    private http: HttpClient
  ) {
    this.baseUrl = environment.apiUrl;

  }

  // Effect: fetch and update store
  loadProducts(): Observable<Product[]> {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);
    return this.http.get<Product[]>(this.baseUrl + this.relativeUrl).pipe(
      tap((products) => this.productsSubject.next(products)),
      catchError((err) => {
        const message = err?.message ?? 'Failed to load products';
        this.errorSubject.next(message);
        this.productsSubject.next([]);
        return of([] as Product[]);
      }),
      finalize(() => this.loadingSubject.next(false)),
      shareReplay(1)
    );
  }


  getById(id: number): Observable<Product | undefined> {
    return this.products$.pipe(map((list) => list.find((p) => p.id === id)));
  }

}
