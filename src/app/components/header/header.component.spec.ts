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
  // Component Tests (Logic, at class level)

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct title', () => {
    expect(component.title()).toBe('Angular ECommerce App');
  });

  // Render Tests (Template, at DOM level)

  it('should pass correct label to primary button', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const button = compiled.querySelector('button');
    expect(button?.textContent).toContain('Cart (3)');
  });

  it('should render title in a h1 tag', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const span = compiled.querySelector('span');
    expect(span?.textContent).toContain('Angular ECommerce App');
  });
});
