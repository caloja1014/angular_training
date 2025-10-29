import { TestBed } from '@angular/core/testing';
import { CartService } from './cart.service';
import { Product as CartProduct } from '../models/product-cart.model';
import { ProductCart } from '../models/product-cart.model';
import { provideHttpClient } from '@angular/common/http';


describe('CartService', () => {
  let service: CartService;
  const mockProduct: CartProduct = {
    id: 1, name: 'Laptop', price: 1000,
    description: '',
    imageUrl: '',
    createdAt: '',
    updatedAt: '',
    CategoryId: 0
  };
  const mockCart: ProductCart = {
    id: 123,
    userName: 'abc-123',
    CartItems: [
      {
        id: 1, quantity: 1, Product: mockProduct,
        createdAt: '',
        updatedAt: '',
        CartId: 0,
        ProductId: 0
      }
    ],
    createdAt: '',
    updatedAt: '',
    total: 0
  };
  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [provideHttpClient()]
    });
    service = TestBed.inject(CartService);
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  // Store tests — computed & signals
  it('should compute total and quantity correctly from signal', () => {
    service.cart.set(mockCart);
    expect(service.getQuantity()).toBe(1);
    expect(service.getTotal()).toBe(1000);
  });

  it('should emit quantity$ and total$ values correctly', (done) => {
    service['cartSubject'].next(mockCart);

    service.quantity$.subscribe((qty) => {
      expect(qty).toBe(1);
    });

    service.total$.subscribe((total) => {
      expect(total).toBe(1000);
      done();
    });
  });


  it('should create a new cart', async () => {
    const cart = await service.createCart();
    expect(cart).toBeDefined();
    expect(cart.id).toBeDefined();
  });
  it('should handle error when addToCart fails', async () => {
    spyOn(service['http'], 'post').and.throwError('Network error');
    await service.addToCart(mockProduct);
    service.error$.subscribe((error) => {
      expect(error).toBe('Network error');
    });
  }
  );
});
