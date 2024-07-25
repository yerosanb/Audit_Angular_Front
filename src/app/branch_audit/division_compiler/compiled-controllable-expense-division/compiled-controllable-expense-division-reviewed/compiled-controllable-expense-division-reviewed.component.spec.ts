import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompiledControllableExpenseDivisionReviewedComponent } from './compiled-controllable-expense-division-reviewed.component';

describe('CompiledControllableExpenseDivisionReviewedComponent', () => {
  let component: CompiledControllableExpenseDivisionReviewedComponent;
  let fixture: ComponentFixture<CompiledControllableExpenseDivisionReviewedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompiledControllableExpenseDivisionReviewedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompiledControllableExpenseDivisionReviewedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
