import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetLiabilityReviewedBranchComponent } from './asset-liability-reviewed-branch.component';

describe('AssetLiabilityReviewedBranchComponent', () => {
  let component: AssetLiabilityReviewedBranchComponent;
  let fixture: ComponentFixture<AssetLiabilityReviewedBranchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetLiabilityReviewedBranchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetLiabilityReviewedBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
