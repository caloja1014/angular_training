import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ProductCardComponent } from './product-card.component';
import { CartService } from '../../services/cart.service';
import { provideRouter, Router } from '@angular/router';
import { Product } from '../../models/products.model';

class MockCartService {
  addToCart = jasmine.createSpy('addToCart');
}

describe('ProductCardComponent', () => {
  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;
  let mockCart: MockCartService;
  let router: Router;

  beforeEach(async () => {
    mockCart = new MockCartService();
    await TestBed.configureTestingModule({
      imports: [ProductCardComponent],
      providers: [
        { provide: CartService, useValue: mockCart },
        provideRouter([]),
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProductCardComponent);
    router = TestBed.inject(Router);

    const mockProduct: Product = {
      id: 123,
      name: 'Cool Widget',
      description: 'Does cool things',
      price: 49.99,
      imageUrl: 'https://example.com/widget.png',
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
      Inventory: {
        id: 1,
        stock: 3,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
        ProductId: 123,
      },
    };
    fixture.componentRef.setInput('product',mockProduct);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders name, price and image', () => {
    const nameEl = fixture.debugElement.query(By.css('.product-title'));
    const priceEl = fixture.debugElement.query(By.css('.product-price'));
    const imgEl = fixture.debugElement.query(By.css('.product-image img'));
    expect(nameEl.nativeElement.textContent.trim()).toBe('Cool Widget');
    expect(priceEl.nativeElement.textContent.trim()).toBe('$49.99');
    expect(imgEl.nativeElement.getAttribute('src')).toBe('https://example.com/widget.png');
  });

});
