import { createSelector } from '@ngrx/store';
import {
  selectProducts,
  selectProductsLoading,
  selectProductsError
} from './products.reducer';

export const selectAllProducts = selectProducts;
export const selectProductsLoadingState = selectProductsLoading;
export const selectProductsErrorState = selectProductsError;

export const selectProductsCount = createSelector(selectAllProducts, products => products.length);
