import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { CartService } from '../../services/cart.service';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

class MockCartService {
  getQuantity() {
    return 3;
  }
}
describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent,],
      providers: [provideHttpClient(), provideRouter([]), { provide: CartService, useClass: MockCartService }]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct title', () => {
    expect(component.title()).toBe('Angular ECommerce App');
  });

  it('should pass correct label to primary button', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const button = compiled.querySelector('button');
    expect(button?.textContent).toContain('Cart (3)');
  });
});
