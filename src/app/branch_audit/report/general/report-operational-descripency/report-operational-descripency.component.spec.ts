import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportOperationalDescripencyComponent } from './report-operational-descripency.component';

describe('ReportOperationalDescripencyComponent', () => {
  let component: ReportOperationalDescripencyComponent;
  let fixture: ComponentFixture<ReportOperationalDescripencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportOperationalDescripencyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportOperationalDescripencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
