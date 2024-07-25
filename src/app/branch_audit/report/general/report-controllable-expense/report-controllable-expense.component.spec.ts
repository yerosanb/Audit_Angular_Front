import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportControllableExpenseComponent } from './report-controllable-expense.component';

describe('ReportControllableExpenseComponent', () => {
  let component: ReportControllableExpenseComponent;
  let fixture: ComponentFixture<ReportControllableExpenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportControllableExpenseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportControllableExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
