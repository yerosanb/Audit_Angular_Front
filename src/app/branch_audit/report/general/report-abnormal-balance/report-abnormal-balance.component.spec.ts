import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportAbnormalBalanceComponent } from './report-abnormal-balance.component';

describe('ReportAbnormalBalanceComponent', () => {
  let component: ReportAbnormalBalanceComponent;
  let fixture: ComponentFixture<ReportAbnormalBalanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportAbnormalBalanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportAbnormalBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
