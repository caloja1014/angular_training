import { Injectable } from '@angular/core';
import { delay, map, Observable, of } from 'rxjs';

/**
 * Service purposely delayed to showcase fakeAsync/tick testing patterns.
 */
@Injectable({
  providedIn: 'root',
})
export class AsyncDemoService {
  readonly twoSecondDelay = 2000;

  /**
   * Simulates a slow API call that returns a welcome message after two seconds.
   */
  loadWelcomeMessage(): Observable<string> {
    return of('Welcome back! Data loaded.').pipe(delay(this.twoSecondDelay));
  }

  /**
   * Simulates processing work by delaying and then returning a computed value.
   */
  calculateTotalWithDelay(values: number[]): Observable<number> {
    return of(values).pipe(
      delay(this.twoSecondDelay),
      map((nums) => nums.reduce((sum, value) => sum + value, 0))
    );
  }
}
