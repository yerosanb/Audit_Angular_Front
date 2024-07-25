import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncompleteAccountOnProgressForReviewerBranchComponent } from './incomplete-account-on-progress-for-reviewer-branch.component';

describe('IncompleteAccountOnProgressForReviewerBranchComponent', () => {
  let component: IncompleteAccountOnProgressForReviewerBranchComponent;
  let fixture: ComponentFixture<IncompleteAccountOnProgressForReviewerBranchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncompleteAccountOnProgressForReviewerBranchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncompleteAccountOnProgressForReviewerBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
