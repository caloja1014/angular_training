import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimaryButtonComponent } from './primary-button.component';

describe('PrimaryButtonComponent', () => {
  let component: PrimaryButtonComponent;
  let fixture: ComponentFixture<PrimaryButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrimaryButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrimaryButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Component Tests (Logic, at class level)

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have the default values', () => {
    expect(component.label()).toBe('');
    expect(component.disabled()).toBe(false);
  });

});
