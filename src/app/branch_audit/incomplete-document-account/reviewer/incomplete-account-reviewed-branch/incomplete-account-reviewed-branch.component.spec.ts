import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncompleteAccountReviewedBranchComponent } from './incomplete-account-reviewed-branch.component';

describe('IncompleteAccountReviewedBranchComponent', () => {
  let component: IncompleteAccountReviewedBranchComponent;
  let fixture: ComponentFixture<IncompleteAccountReviewedBranchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncompleteAccountReviewedBranchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncompleteAccountReviewedBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
