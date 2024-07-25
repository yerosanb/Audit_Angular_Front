import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetLiabilityPendingForReviewBranchComponent } from './asset-liability-pending-for-review-branch.component';

describe('AssetLiabilityPendingForReviewBranchComponent', () => {
  let component: AssetLiabilityPendingForReviewBranchComponent;
  let fixture: ComponentFixture<AssetLiabilityPendingForReviewBranchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetLiabilityPendingForReviewBranchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetLiabilityPendingForReviewBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
