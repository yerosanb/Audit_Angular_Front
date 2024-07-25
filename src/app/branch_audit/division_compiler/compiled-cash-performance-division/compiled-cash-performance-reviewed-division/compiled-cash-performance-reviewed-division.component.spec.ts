import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompiledCashPerformanceReviewedDivisionComponent } from './compiled-cash-performance-reviewed-division.component';

describe('CompiledCashPerformanceReviewedDivisionComponent', () => {
  let component: CompiledCashPerformanceReviewedDivisionComponent;
  let fixture: ComponentFixture<CompiledCashPerformanceReviewedDivisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompiledCashPerformanceReviewedDivisionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompiledCashPerformanceReviewedDivisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
