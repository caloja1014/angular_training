import { TestBed } from '@angular/core/testing';
import { provideState, provideStore } from '@ngrx/store';
import { CartService } from './cart.service';
import { cartFeatureName, cartReducer } from '../store/cart/cart.reducer';

describe('CartService', () => {
  let service: CartService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideStore(),
        provideState(cartFeatureName, cartReducer)
      ]
    });
    service = TestBed.inject(CartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
