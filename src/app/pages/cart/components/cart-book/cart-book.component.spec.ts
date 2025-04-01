import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartBookComponent } from './cart-book.component';

describe('CartBookComponent', () => {
  let component: CartBookComponent;
  let fixture: ComponentFixture<CartBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartBookComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
