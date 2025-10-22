import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Product } from '../../models/products.model';
import { ProductCart } from '../../models/product-cart.model';

export const cartFeatureKey = 'cart';

export const CartActions = createActionGroup({
  source: 'Cart',
  events: {
    'Restore Cart': props<{ cart: ProductCart }>(),
    'Load Cart': props<{ cartId: number }>(),
    'Load Cart Success': props<{ cart: ProductCart }>(),
    'Load Cart Failure': props<{ error: string }>(),
    'Add Item': props<{ product: Product; quantity?: number }>(),
    'Add Item Success': props<{ cart: ProductCart }>(),
    'Add Item Failure': props<{ error: string }>(),
    'Remove Item': props<{ itemId: number }>(),
    'Remove Item Success': props<{ cart: ProductCart }>(),
    'Remove Item Failure': props<{ error: string }>(),
    'Create Cart': emptyProps(),
    'Create Cart Success': props<{ cart: ProductCart }>(),
    'Create Cart Failure': props<{ error: string }>(),
    'Clear Cart': emptyProps(),
    'Clear Errors': emptyProps()
  }
});
