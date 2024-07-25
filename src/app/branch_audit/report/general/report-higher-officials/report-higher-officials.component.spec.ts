import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportHigherOfficialsComponent } from './report-higher-officials.component';

describe('ReportHigherOfficialsComponent', () => {
  let component: ReportHigherOfficialsComponent;
  let fixture: ComponentFixture<ReportHigherOfficialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportHigherOfficialsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportHigherOfficialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
