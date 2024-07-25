import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralObservationReviewedBranchComponent } from './general-observation-reviewed-branch.component';

describe('GeneralObservationReviewedBranchComponent', () => {
  let component: GeneralObservationReviewedBranchComponent;
  let fixture: ComponentFixture<GeneralObservationReviewedBranchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralObservationReviewedBranchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneralObservationReviewedBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
