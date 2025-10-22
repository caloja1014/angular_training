import { createFeature, createReducer, on } from '@ngrx/store';
import { ProductCart } from '../../models/product-cart.model';
import { CartActions, cartFeatureKey } from './cart.actions';

export interface CartState {
  cart: ProductCart | null;
  loading: boolean;
  error: string | null;
}

export const initialState: CartState = {
  cart: null,
  loading: false,
  error: null
};

const cartReducerInternal = createReducer(
  initialState,
  on(CartActions.restoreCart, (state, { cart }) => ({
    ...state,
    cart
  })),
  on(
    CartActions.loadCart,
    CartActions.addItem,
    CartActions.removeItem,
    CartActions.createCart,
    state => ({
      ...state,
      loading: true,
      error: null
    })
  ),
  on(
    CartActions.loadCartSuccess,
    CartActions.addItemSuccess,
    CartActions.removeItemSuccess,
    CartActions.createCartSuccess,
    (state, { cart }) => ({
      ...state,
      cart,
      loading: false
    })
  ),
  on(
    CartActions.loadCartFailure,
    CartActions.addItemFailure,
    CartActions.removeItemFailure,
    CartActions.createCartFailure,
    (state, { error }) => ({
      ...state,
      error,
      loading: false
    })
  ),
  on(CartActions.clearCart, state => ({
    ...state,
    cart: null
  })),
  on(CartActions.clearErrors, state => ({
    ...state,
    error: null
  }))
);

export const cartFeature = createFeature({
  name: cartFeatureKey,
  reducer: cartReducerInternal
});

export const {
  name: cartFeatureName,
  reducer: cartReducer,
  selectCartState,
  selectCart,
  selectError: selectCartError,
  selectLoading: selectCartLoading
} = cartFeature;
