import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralObservationPendingBranchManagerComponent } from './general-observation-pending-branch-manager.component';

describe('GeneralObservationPendingBranchManagerComponent', () => {
  let component: GeneralObservationPendingBranchManagerComponent;
  let fixture: ComponentFixture<GeneralObservationPendingBranchManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralObservationPendingBranchManagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneralObservationPendingBranchManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
