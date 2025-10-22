import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, concatMap, map, of, switchMap, withLatestFrom } from 'rxjs';
import { CartApiService } from '../../services/cart-api.service';
import { CartActions } from './cart.actions';
import { selectCartData, selectCartId } from './cart.selectors';
import { ProductCart } from '../../models/product-cart.model';

@Injectable()
export class CartEffects {
  private readonly actions$ = inject(Actions);
  private readonly cartApi = inject(CartApiService);
  private readonly store = inject(Store);

  loadCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.loadCart),
      concatMap(({ cartId }) =>
        this.cartApi.getCart(cartId).pipe(
          map(cart => CartActions.loadCartSuccess({ cart })),
          catchError(error => of(CartActions.loadCartFailure({ error: this.formatError(error) })))
        )
      )
    )
  );

  createCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.createCart),
      concatMap(() =>
        this.cartApi.createCart().pipe(
          map(cart => CartActions.createCartSuccess({ cart })),
          catchError(error => of(CartActions.createCartFailure({ error: this.formatError(error) })))
        )
      )
    )
  );

  addItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.addItem),
      withLatestFrom(this.store.select(selectCartData)),
      concatMap(([{ product, quantity }, cart]) =>
        this.ensureCart(cart).pipe(
          switchMap(activeCart =>
            this.cartApi
              .addItem(activeCart.id, product.id, quantity ?? 1)
              .pipe(
                switchMap(() => this.cartApi.getCart(activeCart.id)),
                map(updatedCart => CartActions.addItemSuccess({ cart: updatedCart })),
                catchError(error => of(CartActions.addItemFailure({ error: this.formatError(error) })))
              )
          ),
          catchError(error => of(CartActions.addItemFailure({ error: this.formatError(error) })))
        )
      )
    )
  );

  removeItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.removeItem),
      withLatestFrom(this.store.select(selectCartId)),
      concatMap(([{ itemId }, cartId]) => {
        if (!cartId) {
          return of(CartActions.removeItemFailure({ error: 'No cart available' }));
        }

        return this.cartApi.removeItem(cartId, itemId).pipe(
          switchMap(() => this.cartApi.getCart(cartId)),
          map(cart => CartActions.removeItemSuccess({ cart })),
          catchError(error => of(CartActions.removeItemFailure({ error: this.formatError(error) })))
        );
      })
    )
  );

  private ensureCart(cart: ProductCart | null) {
    if (cart) {
      return of(cart);
    }

    return this.cartApi.createCart();
  }

  private formatError(error: unknown): string {
    if (error instanceof Error) {
      return error.message;
    }
    return 'Unexpected error';
  }
}
