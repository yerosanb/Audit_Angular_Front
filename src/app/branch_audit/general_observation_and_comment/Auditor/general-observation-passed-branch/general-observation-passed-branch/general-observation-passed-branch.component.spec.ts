import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralObservationPassedBranchComponent } from './general-observation-passed-branch.component';

describe('GeneralObservationPassedBranchComponent', () => {
  let component: GeneralObservationPassedBranchComponent;
  let fixture: ComponentFixture<GeneralObservationPassedBranchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralObservationPassedBranchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneralObservationPassedBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
