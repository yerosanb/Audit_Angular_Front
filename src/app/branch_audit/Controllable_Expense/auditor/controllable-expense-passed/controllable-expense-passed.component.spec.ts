import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControllableExpensePassedComponent } from './controllable-expense-passed.component';

describe('ControllableExpensePassedComponent', () => {
  let component: ControllableExpensePassedComponent;
  let fixture: ComponentFixture<ControllableExpensePassedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControllableExpensePassedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControllableExpensePassedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
