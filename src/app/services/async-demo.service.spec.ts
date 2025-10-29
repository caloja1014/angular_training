import { TestBed, fakeAsync, tick } from '@angular/core/testing';

import { AsyncDemoService } from './async-demo.service';

describe('AsyncDemoService', () => {
  let service: AsyncDemoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AsyncDemoService);
  });

  it('delivers the welcome message without waiting for real time', fakeAsync(() => {
    let received: string | undefined;

    service.loadWelcomeMessage().subscribe((message) => (received = message));

    expect(received).toBeUndefined();

    tick(service.twoSecondDelay);

    expect(received).toBe('Welcome back! Data loaded.');
  }));

  it('allows fine-grained control over virtual time progression', fakeAsync(() => {
    let total: number | undefined;

    service.calculateTotalWithDelay([1, 2, 3]).subscribe((value) => (total = value));

    tick(service.twoSecondDelay - 1);
    expect(total).toBeUndefined();

    tick(1);
    expect(total).toBe(6);
  }));
});
