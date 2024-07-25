import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportCashManagementComponent } from './report-cash-management.component';

describe('ReportCashManagementComponent', () => {
  let component: ReportCashManagementComponent;
  let fixture: ComponentFixture<ReportCashManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportCashManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportCashManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
