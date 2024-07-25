import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationalDiscrepancyReviewedDivisionComponent } from './operational-discrepancy-reviewed-division.component';

describe('OperationalDiscrepancyReviewedDivisionComponent', () => {
  let component: OperationalDiscrepancyReviewedDivisionComponent;
  let fixture: ComponentFixture<OperationalDiscrepancyReviewedDivisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperationalDiscrepancyReviewedDivisionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperationalDiscrepancyReviewedDivisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
