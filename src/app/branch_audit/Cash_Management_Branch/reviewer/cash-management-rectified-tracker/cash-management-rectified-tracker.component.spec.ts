import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashManagementRectifiedTrackerComponent } from './cash-management-rectified-tracker.component';

describe('CashManagementRectifiedTrackerComponent', () => {
  let component: CashManagementRectifiedTrackerComponent;
  let fixture: ComponentFixture<CashManagementRectifiedTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashManagementRectifiedTrackerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CashManagementRectifiedTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
