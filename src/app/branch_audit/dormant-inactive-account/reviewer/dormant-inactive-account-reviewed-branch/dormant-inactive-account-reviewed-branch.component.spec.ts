import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DormantInactiveAccountReviewedBranchComponent } from './dormant-inactive-account-reviewed-branch.component';

describe('DormantInactiveAccountReviewedBranchComponent', () => {
  let component: DormantInactiveAccountReviewedBranchComponent;
  let fixture: ComponentFixture<DormantInactiveAccountReviewedBranchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DormantInactiveAccountReviewedBranchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DormantInactiveAccountReviewedBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
