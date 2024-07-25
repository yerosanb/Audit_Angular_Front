import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompiledLoanAdvanceDivisionReviewedComponent } from './compiled-loan-advance-division-reviewed.component';

describe('CompiledLoanAdvanceDivisionReviewedComponent', () => {
  let component: CompiledLoanAdvanceDivisionReviewedComponent;
  let fixture: ComponentFixture<CompiledLoanAdvanceDivisionReviewedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompiledLoanAdvanceDivisionReviewedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompiledLoanAdvanceDivisionReviewedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
