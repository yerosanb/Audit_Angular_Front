import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditorCashManagementPendingComponent } from './auditor-cash-management-pending.component';

describe('AuditorCashManagementPendingComponent', () => {
  let component: AuditorCashManagementPendingComponent;
  let fixture: ComponentFixture<AuditorCashManagementPendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuditorCashManagementPendingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuditorCashManagementPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
