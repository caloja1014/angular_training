import { createFeature, createReducer, on } from '@ngrx/store';
import { Product } from '../../models/products.model';
import { ProductsActions, productsFeatureKey } from './products.actions';

export interface ProductsState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

export const initialState: ProductsState = {
  products: [],
  loading: false,
  error: null
};

const productsReducerInternal = createReducer(
  initialState,
  on(ProductsActions.loadProducts, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(ProductsActions.loadProductsSuccess, (state, { products }) => ({
    ...state,
    products,
    loading: false
  })),
  on(ProductsActions.loadProductsFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),
  on(ProductsActions.clearProducts, state => ({
    ...state,
    products: []
  })),
  on(ProductsActions.clearErrors, state => ({
    ...state,
    error: null
  }))
);

export const productsFeature = createFeature({
  name: productsFeatureKey,
  reducer: productsReducerInternal
});

export const {
  name: productsFeatureName,
  reducer: productsReducer,
  selectProductsState,
  selectProducts,
  selectLoading: selectProductsLoading,
  selectError: selectProductsError
} = productsFeature;
