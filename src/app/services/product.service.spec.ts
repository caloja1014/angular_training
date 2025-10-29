import { TestBed } from '@angular/core/testing';

import { ProductService } from './product.service';
import { HttpClient, provideHttpClient, withFetch } from '@angular/common/http';
import { environment } from '../../environments/environment';

describe('ProductService', () => {
  let service: ProductService;
  // let httpClientSpy: jasmine.SpyObj<HttpClient>;

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

  it('should load products', (done) => {
    service.loadProducts().subscribe((products) => {
      expect(products.length).toBeGreaterThan(0);
      done();
    });
  });

});
