import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportDormantInactiveAccountComponent } from './report-dormant-inactive-account.component';

describe('ReportDormantInactiveAccountComponent', () => {
  let component: ReportDormantInactiveAccountComponent;
  let fixture: ComponentFixture<ReportDormantInactiveAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportDormantInactiveAccountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportDormantInactiveAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
