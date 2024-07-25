import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportStatusOfAuditComponent } from './report-status-of-audit.component';

describe('ReportStatusOfAuditComponent', () => {
  let component: ReportStatusOfAuditComponent;
  let fixture: ComponentFixture<ReportStatusOfAuditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportStatusOfAuditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportStatusOfAuditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
