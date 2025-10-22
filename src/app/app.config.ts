import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideEffects } from '@ngrx/effects';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { CartEffects } from './store/cart/cart.effects';
import { cartFeatureName, cartReducer } from './store/cart/cart.reducer';
import { ProductsEffects } from './store/products/products.effects';
import { productsFeatureName, productsReducer } from './store/products/products.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),
    provideStore(),
    provideState(cartFeatureName, cartReducer),
    provideState(productsFeatureName, productsReducer),
    provideEffects(CartEffects, ProductsEffects),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: environment.production
    })
  ]
};
