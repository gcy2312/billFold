import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserUpdateNameComponent } from './user-update-name.component';

describe('UserUpdateNameComponent', () => {
  let component: UserUpdateNameComponent;
  let fixture: ComponentFixture<UserUpdateNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserUpdateNameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserUpdateNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
