import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompiledCashManagementDivisionReviewedComponent } from './compiled-cash-management-division-reviewed.component';

describe('CompiledCashManagementDivisionReviewedComponent', () => {
  let component: CompiledCashManagementDivisionReviewedComponent;
  let fixture: ComponentFixture<CompiledCashManagementDivisionReviewedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompiledCashManagementDivisionReviewedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompiledCashManagementDivisionReviewedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
