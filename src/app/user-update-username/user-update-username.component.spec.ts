import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserUpdateUsernameComponent } from './user-update-username.component';

describe('UserUpdateUsernameComponent', () => {
  let component: UserUpdateUsernameComponent;
  let fixture: ComponentFixture<UserUpdateUsernameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserUpdateUsernameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserUpdateUsernameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
