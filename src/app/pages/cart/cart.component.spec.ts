import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { signal } from '@angular/core';
import { CartComponent } from './cart.component';
import { CartService } from '../../services/cart.service';
import { ProductCart } from '../../models/product-cart.model';

class MockCartService {
  cart = signal<ProductCart | undefined>(undefined);
}

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let mockCartService: MockCartService;

  beforeEach(async () => {
    mockCartService = new MockCartService();
    await TestBed.configureTestingModule({
      imports: [CartComponent],
      providers: [{ provide: CartService, useValue: mockCartService }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Component Tests (Logic, at class level)

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  // Render Tests (Template, at DOM level)

  it('shows empty message when cart has no items', () => {
    mockCartService.cart.set({
      id: 1,
      userName: 'user',
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
      CartItems: [],
      total: 0,
    });
    fixture.detectChanges();
    const emptyMsg = fixture.debugElement.query(By.css('p'));
    expect(emptyMsg.nativeElement.textContent.trim()).toBe('Your cart is empty.');
    const items = fixture.debugElement.queryAll(By.css('app-product-cart'));
    expect(items.length).toBe(0);
  });

  it('renders product-cart items when cart has entries', () => {
    mockCartService.cart.set({
      id: 1,
      userName: 'user',
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
      total: 39.98,
      CartItems: [
        {
          id: 10,
          quantity: 2,
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-01T00:00:00Z',
          CartId: 1,
          ProductId: 100,
          Product: {
            id: 100,
            name: 'Test Product',
            description: 'desc',
            price: 19.99,
            imageUrl: 'img.png',
            createdAt: '2024-01-01T00:00:00Z',
            updatedAt: '2024-01-01T00:00:00Z',
            CategoryId: 1,
          }
        }
      ]
    });
    fixture.detectChanges();
    const items = fixture.debugElement.queryAll(By.css('app-product-cart'));
    expect(items.length).toBe(1);
  });
});
