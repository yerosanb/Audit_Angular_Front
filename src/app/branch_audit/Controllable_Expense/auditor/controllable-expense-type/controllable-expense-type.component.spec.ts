import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControllableExpenseTypeComponent } from './controllable-expense-type.component';

describe('ControllableExpenseTypeComponent', () => {
  let component: ControllableExpenseTypeComponent;
  let fixture: ComponentFixture<ControllableExpenseTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControllableExpenseTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControllableExpenseTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
