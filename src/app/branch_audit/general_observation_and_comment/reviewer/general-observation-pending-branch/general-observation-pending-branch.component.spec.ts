import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralObservationPendingBranchComponent } from './general-observation-pending-branch.component';

describe('GeneralObservationPendingBranchComponent', () => {
  let component: GeneralObservationPendingBranchComponent;
  let fixture: ComponentFixture<GeneralObservationPendingBranchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralObservationPendingBranchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneralObservationPendingBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
