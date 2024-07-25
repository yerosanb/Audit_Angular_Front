import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControllableExpensePendingComponent } from './controllable-expense-pending.component';

describe('ControllableExpensePendingComponent', () => {
  let component: ControllableExpensePendingComponent;
  let fixture: ComponentFixture<ControllableExpensePendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControllableExpensePendingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControllableExpensePendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
