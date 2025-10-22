import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Product } from '../../models/products.model';

export const productsFeatureKey = 'products';

export const ProductsActions = createActionGroup({
  source: 'Products',
  events: {
    'Load Products': emptyProps(),
    'Load Products Success': props<{ products: Product[] }>(),
    'Load Products Failure': props<{ error: string }>(),
    'Clear Products': emptyProps(),
    'Clear Errors': emptyProps()
  }
});
