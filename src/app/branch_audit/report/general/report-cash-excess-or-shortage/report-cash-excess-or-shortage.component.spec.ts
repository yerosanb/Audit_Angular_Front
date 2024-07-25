import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportCashExcessOrShortageComponent } from './report-cash-excess-or-shortage.component';

describe('ReportCashExcessOrShartageComponent', () => {
  let component: ReportCashExcessOrShortageComponent;
  let fixture: ComponentFixture<ReportCashExcessOrShortageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportCashExcessOrShortageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportCashExcessOrShortageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
