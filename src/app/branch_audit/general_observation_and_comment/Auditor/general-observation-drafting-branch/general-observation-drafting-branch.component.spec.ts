import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralObservationDraftingBranchComponent } from './general-observation-drafting-branch.component';

describe('GeneralObservationDraftingBranchComponent', () => {
  let component: GeneralObservationDraftingBranchComponent;
  let fixture: ComponentFixture<GeneralObservationDraftingBranchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralObservationDraftingBranchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneralObservationDraftingBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
