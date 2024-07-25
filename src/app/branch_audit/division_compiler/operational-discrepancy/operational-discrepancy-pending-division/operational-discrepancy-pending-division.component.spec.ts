import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationalDiscrepancyPendingDivisionComponent } from './operational-discrepancy-pending-division.component';

describe('OperationalDiscrepancyPendingDivisionComponent', () => {
  let component: OperationalDiscrepancyPendingDivisionComponent;
  let fixture: ComponentFixture<OperationalDiscrepancyPendingDivisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperationalDiscrepancyPendingDivisionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperationalDiscrepancyPendingDivisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
