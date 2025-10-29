import { TestBed } from '@angular/core/testing';

import { ProductService } from './product.service';
import { HttpClient, provideHttpClient, withFetch } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Product } from '../models/products.model';

describe('ProductService', () => {
  let service: ProductService;
  const mockProducts: Product[] = [{ "id": 1, "name": "Wireless Mouse", "description": "Ergonomic wireless mouse with USB receiver.", "price": 19.99, "imageUrl": null, "createdAt": "2025-10-29T04:37:13.329Z", "updatedAt": "2025-10-29T04:37:13.329Z", "CategoryId": 1, "Category": { "id": 1, "name": "Electronics", "createdAt": "2025-10-29T04:37:13.325Z", "updatedAt": "2025-10-29T04:37:13.325Z" }, "Inventory": { "id": 1, "stock": 10, "createdAt": "2025-10-29T04:37:13.330Z", "updatedAt": "2025-10-29T04:37:13.330Z", "ProductId": 1 } }, { "id": 2, "name": "Mechanical Keyboard", "description": "RGB backlit mechanical keyboard.", "price": 59.99, "imageUrl": null, "createdAt": "2025-10-29T04:37:13.331Z", "updatedAt": "2025-10-29T04:37:13.331Z", "CategoryId": 1, "Category": { "id": 1, "name": "Electronics", "createdAt": "2025-10-29T04:37:13.325Z", "updatedAt": "2025-10-29T04:37:13.325Z" }, "Inventory": { "id": 2, "stock": 5, "createdAt": "2025-10-29T04:37:13.332Z", "updatedAt": "2025-10-29T04:37:13.332Z", "ProductId": 2 } }, { "id": 3, "name": "Coffee Maker", "description": "Automatic drip coffee maker with timer.", "price": 49.5, "imageUrl": null, "createdAt": "2025-10-29T04:37:13.333Z", "updatedAt": "2025-10-29T04:37:13.333Z", "CategoryId": 2, "Category": { "id": 2, "name": "Home & Kitchen", "createdAt": "2025-10-29T04:37:13.327Z", "updatedAt": "2025-10-29T04:37:13.327Z" }, "Inventory": { "id": 3, "stock": 3, "createdAt": "2025-10-29T04:37:13.333Z", "updatedAt": "2025-10-29T04:37:13.333Z", "ProductId": 3 } }, { "id": 4, "name": "Cookbook", "description": "100 easy and delicious recipes.", "price": 15, "imageUrl": null, "createdAt": "2025-10-29T04:37:13.334Z", "updatedAt": "2025-10-29T04:37:13.334Z", "CategoryId": 3, "Category": { "id": 3, "name": "Books", "createdAt": "2025-10-29T04:37:13.328Z", "updatedAt": "2025-10-29T04:37:13.328Z" }, "Inventory": { "id": 4, "stock": 20, "createdAt": "2025-10-29T04:37:13.335Z", "updatedAt": "2025-10-29T04:37:13.335Z", "ProductId": 4 } }];
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(
          withFetch()
        )
      ]
    });

    service = TestBed.inject(ProductService);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Initial state
  it('should initialize store with default values', () => {
    expect(service['productsSubject'].value).toEqual([]);
    expect(service['loadingSubject'].value).toBeFalse();
    expect(service['errorSubject'].value).toBeNull();
  });

  // Successful store update
  it('should update products$ and reset error on successful load', (done) => {

    service.loadProducts().subscribe((data) => {
      expect(data).toEqual(mockProducts);
      expect(service['productsSubject'].value).toEqual(mockProducts);
      expect(service['errorSubject'].value).toBeNull();
      expect(service['loadingSubject'].value).toBeFalse();

      done();
    });
  });

  it('should load products', (done) => {
    service.loadProducts().subscribe((products) => {
      expect(products.length).toBeGreaterThan(0);
      done();
    });
  });
});
