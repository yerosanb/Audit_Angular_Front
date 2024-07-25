import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanAndAdvanceCreateEditComponent } from './loan-and-advance-create-edit.component';

describe('LoanAndAdvanceCreateEditComponent', () => {
  let component: LoanAndAdvanceCreateEditComponent;
  let fixture: ComponentFixture<LoanAndAdvanceCreateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoanAndAdvanceCreateEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoanAndAdvanceCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
