import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevieweredCashManagementComponent } from './reviewered-cash-management.component';

describe('RevieweredCashManagementComponent', () => {
  let component: RevieweredCashManagementComponent;
  let fixture: ComponentFixture<RevieweredCashManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevieweredCashManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RevieweredCashManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
