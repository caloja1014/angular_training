import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ProductCartComponent } from './product-cart.component';
import { CartItem } from '../../models/product-cart.model';

describe('ProductCartComponent', () => {
  let component: ProductCartComponent;
  let fixture: ComponentFixture<ProductCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCartComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProductCartComponent);
    const mockItem: CartItem = {
      id: 42,
      quantity: 2,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
      CartId: 1,
      ProductId: 100,
      Product: {
        id: 100,
        name: 'Test Product',
        description: 'A product for testing',
        price: 19.99,
        imageUrl: 'https://example.com/image.png',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
        CategoryId: 5,
      },
    };
    fixture.componentRef.setInput('cartItem', mockItem);
    fixture.autoDetectChanges();
    component = fixture.componentInstance;
    await fixture.whenStable();
  });


  // Component Tests (Logic, at class level)

  it('should create', () => {
    component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should have cartItem input defined', () => {
    expect(component.cartItem).toBeDefined();
    expect(component.cartItem().id).toBe(42);
    expect(component.cartItem().Product.name).toBe('Test Product');
  });

  it('should emit onRemove with item id', () => {
    let removedItemId: number | null = 0;
    component.onRemove.subscribe((id: number) => {
      removedItemId = id;
    });
    component.onRemove.emit(42);
    expect(removedItemId).toBe(42);
  });


  // Render Tests (Template, at DOM level)

  it('renders product name, price and image', () => {
    const nameEl = fixture.debugElement.query(By.css('.product-cart-title'));
    const priceEl = fixture.debugElement.query(By.css('.product-cart-price'));
    const imgEl = fixture.debugElement.query(By.css('.product-cart-image img'));

    expect(nameEl.nativeElement.textContent.trim()).toBe('Test Product');
    expect(priceEl.nativeElement.textContent.trim()).toBe('$19.99');
    expect(imgEl.nativeElement.getAttribute('src')).toBe('https://example.com/image.png');
  });

  it('emits onRemove with item id when clicking Remove', () => {
    let removedItemId: number | null = 0;
    component.onRemove.subscribe((id: number) => {
      removedItemId = id;
    });

    const buttonEl = fixture.debugElement.query(By.css('button'));
    buttonEl.triggerEventHandler('click', null);

    expect(removedItemId).toBe(42);
  });
});
