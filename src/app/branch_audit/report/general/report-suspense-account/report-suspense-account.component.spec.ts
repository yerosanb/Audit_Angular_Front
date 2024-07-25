import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportSuspenseAccountComponent } from './report-suspense-account.component';

describe('ReportSuspenseAccountComponent', () => {
  let component: ReportSuspenseAccountComponent;
  let fixture: ComponentFixture<ReportSuspenseAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportSuspenseAccountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportSuspenseAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
