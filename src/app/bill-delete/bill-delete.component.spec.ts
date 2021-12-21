import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillDeleteComponent } from './bill-delete.component';

describe('BillDeleteComponent', () => {
  let component: BillDeleteComponent;
  let fixture: ComponentFixture<BillDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BillDeleteComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
