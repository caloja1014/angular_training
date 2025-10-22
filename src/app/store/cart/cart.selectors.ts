import { createSelector } from '@ngrx/store';
import { ProductCart } from '../../models/product-cart.model';
import { selectCart, selectCartLoading, selectCartError } from './cart.reducer';

export const selectCartData = selectCart;
export const selectCartLoadingState = selectCartLoading;
export const selectCartErrorState = selectCartError;

export const selectCartItems = createSelector(selectCartData, cart => cart?.CartItems ?? []);

export const selectCartId = createSelector(selectCartData, cart => cart?.id ?? null);

export const selectCartQuantity = createSelector(selectCartItems, items =>
  items.reduce((total, item) => total + item.quantity, 0)
);

export const selectCartTotal = createSelector(selectCartItems, items =>
  items.reduce((total, item) => total + item.Product.price * item.quantity, 0)
);

export const selectHasCart = createSelector(selectCartData, (cart): cart is ProductCart => !!cart);
