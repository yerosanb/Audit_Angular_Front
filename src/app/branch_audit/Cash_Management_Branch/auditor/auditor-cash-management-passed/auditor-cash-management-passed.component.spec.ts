import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditorCashManagementPassedComponent } from './auditor-cash-management-passed.component';

describe('AuditorCashManagementPassedComponent', () => {
  let component: AuditorCashManagementPassedComponent;
  let fixture: ComponentFixture<AuditorCashManagementPassedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuditorCashManagementPassedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuditorCashManagementPassedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
