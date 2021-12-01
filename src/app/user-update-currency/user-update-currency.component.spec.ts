import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserUpdateCurrencyComponent } from './user-update-currency.component';

describe('UserUpdateCurrencyComponent', () => {
  let component: UserUpdateCurrencyComponent;
  let fixture: ComponentFixture<UserUpdateCurrencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserUpdateCurrencyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserUpdateCurrencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
